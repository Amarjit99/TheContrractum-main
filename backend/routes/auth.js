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
    const { fullName, email, password, employeeId, role, department, mobile } = req.body;
    
    if (!fullName || !email || !password || !mobile) {
      return res.status(400).json({ message: 'Full Name, Email, Password, and Mobile Number are required' });
    }

    const existingUser = await User.findOne({ email });
    const existingRegistration = await AdminRegistration.findOne({ email });

    if (existingUser || existingRegistration) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const adminSubRoles = [
      'System Administrator', 'HR Administrator', 'Operations Administrator', 'Website Administrator', 'CRM Administrator', 'Support Administrator', 'Marketing Administrator', 'Event Administrator', 'Content Administrator', 'Finance Administrator', 'Compliance Administrator', 'User Access Administrator', 'Database Administrator'
    ];
    const managerSubRoles = [
      'HR Manager', 'Operations Manager', 'Project Manager', 'Sales Manager', 'Marketing Manager', 'Business Development Manager', 'Support Manager', 'Technical Manager', 'Content Manager', 'Event Manager', 'CRM & Lead Manager', 'Finance Manager', 'Compliance Manager', 'Training & Development Manager'
    ];
    const employeeSubRoles = [
      'HR Executive', 'Operations Executive', 'Project Coordinator', 'Sales Executive', 'Marketing Executive', 'Business Development Executive', 'Customer Support Executive', 'Technical Support Executive', 'Content Executive', 'Event Coordinator', 'CRM Executive', 'Finance Executive', 'Compliance Executive', 'Training Coordinator', 'Data Entry & Documentation Executive'
    ];

    const allOfficialRoles = [...adminSubRoles, ...managerSubRoles, ...employeeSubRoles];

    let subRole = role || 'System Administrator';
    const cleanKey = subRole.toLowerCase().trim();

    // 1. Check for exact case-insensitive match in all 42 official roles
    const exactMatch = allOfficialRoles.find(r => r.toLowerCase() === cleanKey);
    if (exactMatch) {
      subRole = exactMatch;
    } else {
      // 2. Mappings for legacy shorthands and abbreviations
      const legacyRoleMap = {
        'system': 'System Administrator',
        'system admin': 'System Administrator',
        'sysadmin': 'System Administrator',
        'hr': 'HR Administrator',
        'hr admin': 'HR Administrator',
        'operations': 'Operations Administrator',
        'operations admin': 'Operations Administrator',
        'ops': 'Operations Administrator',
        'ops admin': 'Operations Administrator',
        'website': 'Website Administrator',
        'website admin': 'Website Administrator',
        'web': 'Website Administrator',
        'web admin': 'Website Administrator',
        'crm': 'CRM Administrator',
        'crm admin': 'CRM Administrator',
        'support': 'Support Administrator',
        'support admin': 'Support Administrator',
        'marketing': 'Marketing Administrator',
        'marketing admin': 'Marketing Administrator',
        'event': 'Event Administrator',
        'event admin': 'Event Administrator',
        'content': 'Content Administrator',
        'content admin': 'Content Administrator',
        'finance': 'Finance Administrator',
        'finance admin': 'Finance Administrator',
        'compliance': 'Compliance Administrator',
        'compliance admin': 'Compliance Administrator',
        'user access': 'User Access Administrator',
        'user access admin': 'User Access Administrator',
        'database': 'Database Administrator',
        'database admin': 'Database Administrator',
        'db': 'Database Administrator',
        'db admin': 'Database Administrator',
        'dba': 'Database Administrator',
        'tr': 'Training Coordinator'
      };

      if (legacyRoleMap[cleanKey]) {
        subRole = legacyRoleMap[cleanKey];
      } else {
        // 3. Fallback partial matching
        if (cleanKey.includes('system') || cleanKey.includes('sys')) subRole = 'System Administrator';
        else if (cleanKey.includes('ops') || cleanKey.includes('operation')) subRole = 'Operations Administrator';
        else if (cleanKey.includes('web') || cleanKey.includes('site')) subRole = 'Website Administrator';
        else if (cleanKey.includes('crm')) subRole = 'CRM Administrator';
        else if (cleanKey.includes('support')) subRole = 'Support Administrator';
        else if (cleanKey.includes('marketing') || cleanKey.includes('mkt')) subRole = 'Marketing Administrator';
        else if (cleanKey.includes('event')) subRole = 'Event Administrator';
        else if (cleanKey.includes('content')) subRole = 'Content Administrator';
        else if (cleanKey.includes('finance') || cleanKey.includes('fin')) subRole = 'Finance Administrator';
        else if (cleanKey.includes('compliance') || cleanKey.includes('legal')) subRole = 'Compliance Administrator';
        else if (cleanKey.includes('access') || cleanKey.includes('perm')) subRole = 'User Access Administrator';
        else if (cleanKey.includes('database') || cleanKey.includes('db')) subRole = 'Database Administrator';
        else if (cleanKey.includes('hr') || cleanKey.includes('recruitment')) subRole = 'HR Administrator';
        else {
          subRole = 'System Administrator';
        }
      }
    }

    const registration = await AdminRegistration.create({
      fullName,
      email,
      password,
      employeeId,
      role: subRole,
      department,
      mobile,
      adminSubRole: subRole,
      joiningDate: new Date().toISOString()
    });

    res.status(201).json({ message: 'Registration submitted. Awaiting Super Admin approval.' });
  } catch (err) {
    console.error('Admin Register error:', err);
    res.status(500).json({ message: 'Server error during admin registration', error: err.message });
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
