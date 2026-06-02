const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminRegistration = require('../models/AdminRegistration');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_change_me', {
    expiresIn: '7d',
  });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { 
      firstName, lastName, email, password, 
      mobile, alternateMobile, whatsapp, gender, dob,
      street, city, state, country, pincode
    } = req.body;

    if (!firstName || !lastName || !email || !password || !mobile) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Construct legacy name
    const name = `${firstName} ${lastName}`;

    const user = await User.create({ 
      name, firstName, lastName, email, password, 
      mobile, alternateMobile, whatsapp, gender, dob,
      street, city, state, country, pincode 
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/admin-register
router.post('/admin-register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile, adminSubRole, joiningDate } = req.body;
    
    if (!firstName || !lastName || !email || !password || !mobile || !adminSubRole || !joiningDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    const existingRegistration = await AdminRegistration.findOne({ email });

    if (existingUser || existingRegistration) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const registration = await AdminRegistration.create({
      firstName, lastName, email, password, mobile, adminSubRole, joiningDate
    });

    res.status(201).json({ message: 'Registration submitted. Awaiting Super Admin approval.' });
  } catch (err) {
    console.error('Admin Register error:', err);
    res.status(500).json({ message: 'Server error during admin registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if account is on hold
    if (user.isHeld) {
      if (user.holdUntil && new Date() >= new Date(user.holdUntil)) {
        user.isHeld = false;
        user.holdUntil = null;
        user.holdReason = '';
        await user.save();
      } else {
        const formattedDate = user.holdUntil 
          ? `until ${new Date(user.holdUntil).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`
          : 'indefinitely';
        return res.status(403).json({
          message: `Your account is currently on hold ${formattedDate}. Reason: ${user.holdReason || 'No reason specified'}`
        });
      }
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      adminSubRole: user.adminSubRole,
      adminPermissions: user.adminPermissions,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
