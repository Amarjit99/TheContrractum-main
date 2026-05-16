const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// GET all audit logs (protected, admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching audit logs', error: err.message });
  }
});

module.exports = router;
