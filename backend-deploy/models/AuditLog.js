const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminName: {
    type: String,
    default: 'System'
  },
  adminRole: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    enum: ['Create', 'Update', 'Delete', 'Status Change', 'Bulk Import', 'Login', 'Logout', 'Export', 'Notification Sent', 'Bulk Notification'],
    required: true
  },
  entity: {
    type: String,
    default: ''
  },
  // Keep backward compat with old targetType/targetId fields
  targetType: {
    type: String,
    default: ''
  },
  targetId: {
    type: String,
    default: ''
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

module.exports = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);

