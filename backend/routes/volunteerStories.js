const express = require('express');
const router = express.Router();
const VolunteerStory = require('../models/VolunteerStory');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const fs = require('fs');

// GET all volunteer stories (public)
router.get('/', async (req, res) => {
  try {
    const stories = await VolunteerStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching volunteer stories' });
  }
});

// GET single volunteer story (public)
router.get('/:id', async (req, res) => {
  try {
    const story = await VolunteerStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching story' });
  }
});

// POST create volunteer story (protected)
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, quote, batchYear } = req.body;
    const imagePath = req.file ? `/uploads/volunteers/${req.file.filename}` : '';

    if (!imagePath) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const story = new VolunteerStory({
      name,
      role,
      quote,
      batchYear: batchYear || new Date().getFullYear().toString(),
      image: imagePath
    });

    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ message: 'Error creating story', error: err.message });
  }
});

// PUT update volunteer story (protected)
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, quote, batchYear } = req.body;
    const updateData = { name, role, quote };
    if (batchYear) updateData.batchYear = batchYear;

    if (req.file) {
      const oldStory = await VolunteerStory.findById(req.params.id);
      if (oldStory && oldStory.image) {
        const fullOldPath = `.${oldStory.image}`;
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
        }
      }
      updateData.image = `/uploads/volunteers/${req.file.filename}`;
    }

    const updatedStory = await VolunteerStory.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedStory) return res.status(404).json({ message: 'Story not found' });
    res.json(updatedStory);
  } catch (err) {
    res.status(400).json({ message: 'Error updating story', error: err.message });
  }
});

// DELETE volunteer story (protected)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const story = await VolunteerStory.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    if (story.image) {
      const fullPath = `.${story.image}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await VolunteerStory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting story' });
  }
});

module.exports = router;
