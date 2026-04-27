const express = require('express');
const router = express.Router();
const Intern = require('../models/Intern');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const fs = require('fs');

// GET all interns (public)
router.get('/', async (req, res) => {
  try {
    const interns = await Intern.find().sort({ createdAt: -1 });
    res.json(interns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching interns' });
  }
});

// GET single intern (public)
router.get('/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.json(intern);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching intern' });
  }
});

// POST create intern (protected)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, collegeName, description, tags } = req.body;
    const imagePath = req.file ? `/uploads/interns/${req.file.filename}` : '';

    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const intern = new Intern({
      name,
      role,
      collegeName,
      description,
      image: imagePath,
      tags: typeof tags === 'string' ? JSON.parse(tags) : tags
    });

    const savedIntern = await intern.save();
    res.status(201).json(savedIntern);
  } catch (err) {
    res.status(400).json({ message: 'Error creating intern', error: err.message });
  }
});

// PUT update intern (protected)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, collegeName, description, tags } = req.body;
    const updateData = { name, role, collegeName, description };
    
    if (tags) {
      updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    if (req.file) {
      // Find old intern to delete old image
      const oldIntern = await Intern.findById(req.params.id);
      if (oldIntern && oldIntern.image) {
        const fullOldPath = `.${oldIntern.image}`;
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
      updateData.image = `/uploads/interns/${req.file.filename}`;
    }

    const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedIntern) return res.status(404).json({ message: 'Intern not found' });
    res.json(updatedIntern);
  } catch (err) {
    res.status(400).json({ message: 'Error updating intern', error: err.message });
  }
});

// DELETE intern (protected)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });

    // Delete image file
    if (intern.image) {
      const fullPath = `.${intern.image}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Intern.findByIdAndDelete(req.params.id);
    res.json({ message: 'Intern deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting intern' });
  }
});

module.exports = router;
