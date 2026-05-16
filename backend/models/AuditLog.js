const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adminName: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ['Create', 'Update', 'Delete', 'Status Change', 'Bulk Import'],
    required: true
  },
  targetType: {
    type: String,
    enum: ['Certificate', 'ID Card', 'User'],
    required: true
  },
  targetId: {
    type: String, // String to handle external IDs like TC-2026-EMP-001 or MongoDB IDs
    required: true
  },
  details: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
