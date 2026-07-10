const express = require('express');
const router = express.Router();
const CoreTeam = require('../models/CoreTeam');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');
const fs = require('fs');

// Get all core team members
router.get('/', async (req, res) => {
  try {
    const team = await CoreTeam.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new member
router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, bio, linkedin, twitter, email } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newMember = new CoreTeam({
      name,
      role,
      bio,
      linkedin,
      twitter,
      email,
      type: 'coreTeam',
      image: `/uploads/founders/${req.file.filename}`
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update member
router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, role, bio, linkedin, twitter, email } = req.body;
    const member = await CoreTeam.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.name = name || member.name;
    member.role = role || member.role;
    member.bio = bio || member.bio;
    member.linkedin = linkedin !== undefined ? linkedin : member.linkedin;
    member.twitter = twitter !== undefined ? twitter : member.twitter;
    member.email = email !== undefined ? email : member.email;

    if (req.file) {
      // Delete old photo if exists
      if (member.image) {
        const fullPath = `.${member.image}`;
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
      member.image = `/uploads/founders/${req.file.filename}`;
    }

    await member.save();
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete member
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const member = await CoreTeam.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    
    if (member.image) {
      const fullPath = `.${member.image}`;
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await member.deleteOne();
    res.json({ message: 'Member removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
