const express = require('express');
const router = express.Router();
const Founder = require('../models/Founder');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const fs = require('fs');

// GET all founders (public)
router.get('/', async (req, res) => {
  try {
    const founders = await Founder.find().sort({ createdAt: 1 });
    res.json(founders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching founders' });
  }
});

// POST create founder (protected)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, background, focusArea, contribution, type, bio, expertise, achievements } = req.body;
    const imagePath = req.file ? `/uploads/founders/${req.file.filename}` : '';

    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const founderData = {
      name,
      role,
      type: type || 'director',
      image: imagePath,
      // For Directors
      background,
      focusArea,
      contribution,
      // For Founders
      bio,
      expertise: expertise ? expertise.split(',').map(e => e.trim()) : [],
      achievements: achievements ? achievements.split(',').map(a => a.trim()) : []
    };

    const founder = new Founder(founderData);
    const savedFounder = await founder.save();
    res.status(201).json(savedFounder);
  } catch (err) {
    res.status(400).json({ message: 'Error creating founder', error: err.message });
  }
});

// PUT update founder (protected)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, background, focusArea, contribution, type, bio, expertise, achievements } = req.body;
    const updateData = { 
      name, 
      role, 
      type, 
      background, 
      focusArea, 
      contribution,
      bio,
      expertise: expertise ? (Array.isArray(expertise) ? expertise : expertise.split(',').map(e => e.trim())) : [],
      achievements: achievements ? (Array.isArray(achievements) ? achievements : achievements.split(',').map(a => a.trim())) : []
    };

    if (req.file) {
      // Delete old photo
      const oldCol = await Founder.findById(req.params.id);
      if (oldCol && oldCol.image) {
        const fullOldPath = `.${oldCol.image}`;
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
      updateData.image = `/uploads/founders/${req.file.filename}`;
    }

    const updatedFounder = await Founder.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedFounder) return res.status(404).json({ message: 'Founder not found' });
    res.json(updatedFounder);
  } catch (err) {
    res.status(400).json({ message: 'Error updating founder', error: err.message });
  }
});

// DELETE founder (protected)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const founder = await Founder.findById(req.params.id);
    if (!founder) return res.status(404).json({ message: 'Founder not found' });

    if (founder.image) {
      const fullPath = `.${founder.image}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Founder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Founder deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting founder' });
  }
});

module.exports = router;
