const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const upload = require('../middleware/upload');
const sendEmail = require('../utils/sendEmail');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const ScanLog = require('../models/ScanLog');
const AuditLog = require('../models/AuditLog');
const fs = require('fs');

const logAction = async (user, action, targetType, targetId, details) => {
  if (!user) return;
  try {
    await AuditLog.create({
      adminId: user._id || user.id,
      adminName: user.name || user.email || 'System Admin',
      action,
      targetType,
      targetId,
      details
    });
  } catch (err) {
    console.error('Failed to save audit log:', err);
  }
};

// GET all certificates (protected)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const certificates = await Certificate.find(query).sort({ issueDate: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certificates' });
  }
});

// GET single certificate
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certificate' });
  }
});

// PUBLIC: GET all certificates for the careers page
router.get('/all', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching public records' });
  }
});

// PUBLIC: GET single certificate for verification
router.get('/public/verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let certificate;
    
    // Check if valid MongoDB ID
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        certificate = await Certificate.findById(id);
    }
    
    // If not found or not MongoDB ID, search by custom certificateId
    if (!certificate) {
        certificate = await Certificate.findOne({ certificateId: id });
    }

    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });

    // LOG THE SCAN (New Audit Feature)
    try {
        await ScanLog.create({
            employeeId: certificate.certificateId,
            employeeName: certificate.name,
            scannedAt: new Date(),
            ipAddress: req.ip || req.headers['x-forwarded-for'],
            userAgent: req.headers['user-agent']
        });
    } catch (logErr) {
        console.error('Failed to log certificate scan:', logErr);
    }

    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Error during verification' });
  }
});

// GET Scan Logs (New Audit Feature)
router.get('/logs', protect, adminOnly, async (req, res) => {
    try {
        // We filter for logs where employeeId starts with TC- (or matches certificate patterns)
        // For now, we'll fetch all and the frontend can filter or we can use a separate model
        const logs = await ScanLog.find().sort({ scannedAt: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching logs' });
    }
});

// POST create certificate
router.post('/', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    const { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation, department, issuedBy, status, validUntil } = req.body;
    
    // Check if ID already exists
    const existing = await Certificate.findOne({ certificateId });
    if (existing) {
        return res.status(400).json({ message: 'Certificate ID already exists' });
    }

    const fileUrl = req.file ? `/uploads/certificates/${req.file.filename}` : '';
    if (!fileUrl && !req.body.photo) {
      return res.status(400).json({ message: 'Certificate data/file is required' });
    }

    const certificate = new Certificate({
      name,
      type,
      issueDate,
      certificateId,
      fileUrl: fileUrl || req.body.photo,
      details,
      recipientEmail,
      themeId,
      designation,
      department,
      issuedBy: issuedBy || req.user?.name || 'The Contractum',
      status: status || 'Issued',
      approvedBy: req.user?.name || '',
      validUntil
    });

    const savedCertificate = await certificate.save();
    await logAction(req.user, 'Create', 'Certificate', savedCertificate.certificateId, `Created new certificate: ${savedCertificate.name}`);
    
    if (savedCertificate.status === 'Issued' && savedCertificate.recipientEmail) {
      const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify/${savedCertificate.certificateId}`;
      await sendEmail({
        email: savedCertificate.recipientEmail,
        subject: 'Your Certificate from The Contractum is Ready',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Congratulations ${savedCertificate.name}!</h2>
            <p>Your official certificate for the <strong>${savedCertificate.designation}</strong> track has been successfully issued.</p>
            <p>You can view, download, and share your verified digital certificate using the link below:</p>
            <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1e5cdc; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0;">View My Certificate</a>
            <p>Certificate ID: <strong>${savedCertificate.certificateId}</strong></p>
            <p>Best regards,<br/>The Contractum Team</p>
          </div>
        `
      }).catch(e => console.error("Email send failed:", e));
    }
    
    res.status(201).json(savedCertificate);
  } catch (err) {
    res.status(400).json({ message: 'Error creating certificate', error: err.message });
  }
});

// PUT update certificate
router.put('/:id', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    const { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation, department, issuedBy, status, validUntil } = req.body;
    const updateData = { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation, department, issuedBy, status, validUntil };

    const oldCertificate = await Certificate.findById(req.params.id);
    if (!oldCertificate) return res.status(404).json({ message: 'Certificate not found' });

    if (req.file) {
      if (oldCertificate.fileUrl) {
        const fullOldPath = `.${oldCertificate.fileUrl}`;
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
      updateData.fileUrl = `/uploads/certificates/${req.file.filename}`;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedCertificate) return res.status(404).json({ message: 'Certificate not found' });
    
    await logAction(req.user, status && req.body.status !== oldCertificate?.status ? 'Status Change' : 'Update', 'Certificate', updatedCertificate.certificateId, `Updated certificate details. Status: ${updatedCertificate.status}`);
    
    if (updatedCertificate.status === 'Issued' && oldCertificate.status !== 'Issued' && updatedCertificate.recipientEmail) {
      const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify/${updatedCertificate.certificateId}`;
      await sendEmail({
        email: updatedCertificate.recipientEmail,
        subject: 'Your Certificate from The Contractum is Ready',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Congratulations ${updatedCertificate.name}!</h2>
            <p>Your official certificate for the <strong>${updatedCertificate.designation}</strong> track has been successfully issued.</p>
            <p>You can view, download, and share your verified digital certificate using the link below:</p>
            <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1e5cdc; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 15px 0;">View My Certificate</a>
            <p>Certificate ID: <strong>${updatedCertificate.certificateId}</strong></p>
            <p>Best regards,<br/>The Contractum Team</p>
          </div>
        `
      }).catch(e => console.error("Email send failed:", e));
    }
    
    res.json(updatedCertificate);
  } catch (err) {
    res.status(400).json({ message: 'Error updating certificate', error: err.message });
  }
});

// DELETE certificate
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });

    if (certificate.fileUrl) {
      const fullPath = `.${certificate.fileUrl}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Certificate.findByIdAndDelete(req.params.id);
    await logAction(req.user, 'Delete', 'Certificate', certificate.certificateId, `Deleted certificate for ${certificate.name}`);
    
    res.json({ message: 'Certificate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting certificate' });
  }
});

// Batch upload Certificates (To match ID Card system logic)
router.post('/bulk', protect, adminOnly, async (req, res) => {
  try {
    const certificates = req.body;
    if (!Array.isArray(certificates)) return res.status(400).json({ message: "Invalid data format." });

    // Filter out duplicates (based on certificateId)
    const existingIds = await Certificate.find({ certificateId: { $in: certificates.map(c => c.certificateId) } }).select('certificateId');
    const existingSet = new Set(existingIds.map(c => c.certificateId));
    
    const newCerts = certificates.filter(c => !existingSet.has(c.certificateId));
    
    if (newCerts.length === 0) {
      return res.status(400).json({ message: "All records in this file already exist." });
    }

    // Note: For bulk, we might not have 'fileUrl' yet if they are being batch-onboarded without images.
    // We'll set a default or allow it to be empty if the model allows (ID card reference).
    // However, the model requires fileUrl. We'll use a placeholder or handle it.
    const recordsToSave = newCerts.map(c => ({
        ...c,
        fileUrl: c.fileUrl || '/uploads/certificates/placeholder.png'
    }));

    await Certificate.insertMany(recordsToSave);
    await logAction(req.user, 'Bulk Import', 'Certificate', 'MULTIPLE', `Bulk imported ${newCerts.length} certificates.`);
    
    res.status(201).json({ message: `Successfully onboarded ${newCerts.length} records.`, count: newCerts.length });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
