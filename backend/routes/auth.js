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
    const { fullName, email, password, employeeId, role, department } = req.body;
    
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full Name, Email, and Password are required' });
    }

    const existingUser = await User.findOne({ email });
    const existingRegistration = await AdminRegistration.findOne({ email });

    if (existingUser || existingRegistration) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const registration = await AdminRegistration.create({
      fullName,
      email,
      password,
      employeeId,
      role,
      department,
      adminSubRole: role || 'HR', // fallback map for legacy compatibility
      joiningDate: new Date().toISOString() // default mapping
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

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
