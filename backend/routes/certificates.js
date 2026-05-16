const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const upload = require('../middleware/upload');
const sendEmail = require('../utils/sendEmail');
const sendWhatsApp = require('../utils/sendWhatsApp');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const ScanLog = require('../models/ScanLog');
const AuditLog = require('../models/AuditLog');
const fs = require('fs');

const logAction = async (user, action, targetType, targetId, details, req = null) => {
  if (!user) return;
  try {
    await AuditLog.create({
      adminId: user._id || user.id,
      adminName: user.name || user.email || 'System Admin',
      adminRole: user.role || '',
      action,
      targetType,
      targetId,
      details,
      ipAddress: req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') : ''
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

// PUBLIC: GET all certificates for the careers page
router.get('/all', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching public records' });
  }
});

// GET Scan Logs (New Audit Feature) — MUST be before /:id
router.get('/logs', protect, adminOnly, async (req, res) => {
    try {
        const logs = await ScanLog.find().sort({ scannedAt: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching logs' });
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

// GET single certificate — MUST be after all static routes (/all, /logs, /public/*)
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certificate' });
  }
});

// POST create certificate
router.post('/', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    const { name, type, issueDate, certificateId, details, recipientEmail, recipientPhone, themeId, designation, department, issuedBy, status, validUntil } = req.body;
    
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
      recipientPhone,
      themeId,
      designation,
      department,
      issuedBy: issuedBy || req.user?.name || 'The Contractum',
      status: status || 'Issued',
      approvedBy: req.user?.name || '',
      validUntil
    });

    const savedCertificate = await certificate.save();
    await logAction(req.user, 'Create', 'Certificate', savedCertificate.certificateId, `Created new certificate: ${savedCertificate.name}`, req);
    
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

    // WhatsApp notification on issuance
    if (savedCertificate.status === 'Issued' && savedCertificate.recipientPhone) {
      const verifyUrlWA = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify/${savedCertificate.certificateId}`;
      await sendWhatsApp({
        phone: savedCertificate.recipientPhone,
        message: `🎓 Congratulations ${savedCertificate.name}! Your official certificate (ID: ${savedCertificate.certificateId}) from The Contractum has been issued. View & download: ${verifyUrlWA}`
      }).catch(e => console.error("WhatsApp send failed:", e));
    }
    
    res.status(201).json(savedCertificate);
  } catch (err) {
    res.status(400).json({ message: 'Error creating certificate', error: err.message });
  }
});

// PUT update certificate
router.put('/:id', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    const { name, type, issueDate, certificateId, details, recipientEmail, recipientPhone, themeId, designation, department, issuedBy, status, validUntil } = req.body;
    const updateData = { name, type, issueDate, certificateId, details, recipientEmail, recipientPhone, themeId, designation, department, issuedBy, status, validUntil };

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
    
    await logAction(req.user, status && req.body.status !== oldCertificate?.status ? 'Status Change' : 'Update', 'Certificate', updatedCertificate.certificateId, `Updated certificate details. Status: ${updatedCertificate.status}`, req);
    
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

    // WhatsApp notification on status change to Issued
    if (updatedCertificate.status === 'Issued' && oldCertificate.status !== 'Issued' && updatedCertificate.recipientPhone) {
      const verifyUrlWA = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify/${updatedCertificate.certificateId}`;
      await sendWhatsApp({
        phone: updatedCertificate.recipientPhone,
        message: `🎓 Congratulations ${updatedCertificate.name}! Your official certificate (ID: ${updatedCertificate.certificateId}) from The Contractum has been issued. View & download: ${verifyUrlWA}`
      }).catch(e => console.error("WhatsApp send failed:", e));
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
    await logAction(req.user, 'Delete', 'Certificate', certificate.certificateId, `Deleted certificate for ${certificate.name}`, req);
    
    res.json({ message: 'Certificate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting certificate' });
  }
});

// POST Notify single certificate (Email & WhatsApp)
router.post('/:id/notify', protect, adminOnly, async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verifyUrl = `${frontendUrl}/verify/${cert.certificateId}`;
    
    let emailSent = false;
    let waSent = false;

    if (cert.recipientEmail) {
      await sendEmail({
        email: cert.recipientEmail,
        subject: 'Your Digital Certificate - The Contractum',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #1e5cdc;">Hello ${cert.name},</h2>
            <p>Your official digital certificate for <strong>${cert.designation}</strong> is ready for access.</p>
            <p>You can verify, view, and download your certificate using the secure portal below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verifyUrl}" style="background-color: #1e5cdc; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Verified Certificate</a>
            </div>
            <p style="font-size: 13px; color: #666;">Certificate ID: <strong>${cert.certificateId}</strong></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 12px; color: #999;">This is an automated notification. Please do not reply directly to this email.</p>
          </div>
        `
      }).then(() => { emailSent = true; }).catch(e => console.error("Notify Email failed:", e));
    }

    if (cert.recipientPhone) {
      await sendWhatsApp({
        phone: cert.recipientPhone,
        message: `🎓 Hello ${cert.name}! Your official certificate (ID: ${cert.certificateId}) is ready. You can view it here: ${verifyUrl}`
      }).then(() => { waSent = true; }).catch(e => console.error("Notify WhatsApp failed:", e));
    }

    await logAction(req.user, 'Notification Sent', 'Certificate', cert.certificateId, `Manual notification triggered (Email: ${emailSent}, WA: ${waSent})`, req);
    res.json({ message: 'Notifications processed', emailSent, waSent });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST Bulk Notify
router.post('/bulk-notify', protect, adminOnly, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ message: "No IDs provided" });

    const certs = await Certificate.find({ _id: { $in: ids } });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    let count = 0;
    for (const cert of certs) {
      const verifyUrl = `${frontendUrl}/verify/${cert.certificateId}`;
      
      if (cert.recipientEmail) {
        await sendEmail({
          email: cert.recipientEmail,
          subject: 'Your Digital Certificate - The Contractum',
          html: `<p>Hello ${cert.name}, your certificate for ${cert.designation} is ready: <a href="${verifyUrl}">${verifyUrl}</a></p>`
        }).catch(() => {});
      }

      if (cert.recipientPhone) {
        await sendWhatsApp({
          phone: cert.recipientPhone,
          message: `🎓 Hello ${cert.name}! Your certificate is ready: ${verifyUrl}`
        }).catch(() => {});
      }
      count++;
    }

    await logAction(req.user, 'Bulk Notification', 'Certificate', 'MULTIPLE', `Sent notifications to ${count} recipients.`, req);
    res.json({ message: `Sent notifications to ${count} recipients.` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

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
    await logAction(req.user, 'Bulk Import', 'Certificate', 'MULTIPLE', `Bulk imported ${newCerts.length} certificates.`, req);
    
    res.status(201).json({ message: `Successfully onboarded ${newCerts.length} records.`, count: newCerts.length });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
