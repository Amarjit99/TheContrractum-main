const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
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
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: 'Error during verification' });
  }
});

// POST create certificate
router.post('/', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    const { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation } = req.body;
    
    // Check if ID already exists
    const existing = await Certificate.findOne({ certificateId });
    if (existing) {
        return res.status(400).json({ message: 'Certificate ID already exists' });
    }

    const fileUrl = req.file ? `/uploads/certificates/${req.file.filename}` : '';
    if (!fileUrl) {
      return res.status(400).json({ message: 'Certificate file is required' });
    }

    const certificate = new Certificate({
      name,
      type,
      issueDate,
      certificateId,
      fileUrl,
      details,
      recipientEmail,
      themeId,
      designation
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
    const { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation } = req.body;
    const updateData = { name, type, issueDate, certificateId, details, recipientEmail, themeId, designation };

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

module.exports = router;
