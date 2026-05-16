const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// GET all audit logs (protected, admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('performedBy', 'name email')
      .populate('adminId', 'name email')
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    // Normalize data: ensure 'entity' is always populated (fallback to targetType)
    const normalizedLogs = logs.map(log => ({
      ...log,
      entity: log.entity || log.targetType || 'Unknown',
      performedBy: log.performedBy || log.adminId || null
    }));

    res.json(normalizedLogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching audit logs', error: err.message });
  }
});

module.exports = router;

