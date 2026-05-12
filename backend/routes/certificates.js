const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const ScanLog = require('../models/ScanLog');
const fs = require('fs');

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
    const { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation, department } = req.body;
    
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
      fileUrl: fileUrl || req.body.photo, // Support both file and base64 (ID card reference)
      details,
      recipientEmail,
      themeId,
      designation,
      department
    });

    const savedCertificate = await certificate.save();
    res.status(201).json(savedCertificate);
  } catch (err) {
    res.status(400).json({ message: 'Error creating certificate', error: err.message });
  }
});

// PUT update certificate
router.put('/:id', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    const { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation, department } = req.body;
    const updateData = { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation, department };

    if (req.file) {
      const oldCertificate = await Certificate.findById(req.params.id);
      if (oldCertificate && oldCertificate.fileUrl) {
        const fullOldPath = `.${oldCertificate.fileUrl}`;
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
      updateData.fileUrl = `/uploads/certificates/${req.file.filename}`;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedCertificate) return res.status(404).json({ message: 'Certificate not found' });
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
    res.status(201).json({ message: `Successfully onboarded ${newCerts.length} records.`, count: newCerts.length });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
