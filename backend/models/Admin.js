const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adminSubRole: { type: String, enum: [
    'System Administrator', 'HR Administrator', 'Operations Administrator', 'Website Administrator', 'CRM Administrator', 'Support Administrator', 'Marketing Administrator', 'Event Administrator', 'Content Administrator', 'Finance Administrator', 'Compliance Administrator', 'User Access Administrator', 'Database Administrator',
    'HR Manager', 'Operations Manager', 'Project Manager', 'Sales Manager', 'Marketing Manager', 'Business Development Manager', 'Support Manager', 'Technical Manager', 'Content Manager', 'Event Manager', 'CRM & Lead Manager', 'Finance Manager', 'Compliance Manager', 'Training & Development Manager',
    'HR Executive', 'Operations Executive', 'Project Coordinator', 'Sales Executive', 'Marketing Executive', 'Business Development Executive', 'Customer Support Executive', 'Technical Support Executive', 'Content Executive', 'Event Coordinator', 'CRM Executive', 'Finance Executive', 'Compliance Executive', 'Training Coordinator', 'Data Entry & Documentation Executive'
  ], required: true },
  adminPermissions: { type: String, enum: ['view', 'view-delete', 'view-delete-edit'], default: 'view' },
  joiningDate: { type: String, required: true },
  registrationId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminRegistration' },
}, { timestamps: true, collection: 'admindb' });

module.exports = mongoose.model('AdminDetail', adminSchema);
