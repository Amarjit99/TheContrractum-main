const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer — memory storage (store as base64 in DB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  },
});

// GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const fields = [
      'name','phone','dateOfBirth','gender','location','bio',
      'jobTitle','department','company','industry','experience',
      'website','linkedin','twitter','github',
    ];
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    fields.forEach(f => { if (req.body[f] !== undefined) user[f] = req.body[f]; });

    // Skills: accept comma-separated string or array
    if (req.body.skills !== undefined) {
      user.skills = typeof req.body.skills === 'string'
        ? req.body.skills.split(',').map(s => s.trim()).filter(Boolean)
        : req.body.skills;
    }

    const updated = await user.save();
    res.json(sanitize(updated));
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// POST /api/users/avatar — Upload profile picture
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const user = await User.findById(req.user._id);
    user.avatar = base64;
    await user.save();
    res.json({ avatar: base64 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
});

// PUT /api/users/change-password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    if (newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters' });
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch {
    res.status(500).json({ message: 'Failed to change password' });
  }
});

function sanitize(u) {
  return {
    _id: u._id, name: u.name, email: u.email, avatar: u.avatar,
    phone: u.phone, dateOfBirth: u.dateOfBirth, gender: u.gender,
    location: u.location, bio: u.bio,
    jobTitle: u.jobTitle, department: u.department, company: u.company,
    industry: u.industry, experience: u.experience, skills: u.skills,
    website: u.website, linkedin: u.linkedin, twitter: u.twitter, github: u.github,
    joinedDate: u.joinedDate,
  };
}

module.exports = router;
