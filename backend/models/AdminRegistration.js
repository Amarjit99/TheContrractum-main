const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  employeeId: { type: String, trim: true },
  role: { type: String, trim: true },
  department: { type: String, trim: true },
  mobile: { type: String, required: true, trim: true },
  adminSubRole: { type: String, enum: [
    'System Administrator', 'HR Administrator', 'Operations Administrator', 'Website Administrator', 'CRM Administrator', 'Support Administrator', 'Marketing Administrator', 'Event Administrator', 'Content Administrator', 'Finance Administrator', 'Compliance Administrator', 'User Access Administrator', 'Database Administrator',
    'HR Manager', 'Operations Manager', 'Project Manager', 'Sales Manager', 'Marketing Manager', 'Business Development Manager', 'Support Manager', 'Technical Manager', 'Content Manager', 'Event Manager', 'CRM & Lead Manager', 'Finance Manager', 'Compliance Manager', 'Training & Development Manager',
    'HR Executive', 'Operations Executive', 'Project Coordinator', 'Sales Executive', 'Marketing Executive', 'Business Development Executive', 'Customer Support Executive', 'Technical Support Executive', 'Content Executive', 'Event Coordinator', 'CRM Executive', 'Finance Executive', 'Compliance Executive', 'Training Coordinator', 'Data Entry & Documentation Executive'
  ], required: true },
  adminPermissions: { type: String, enum: ['view', 'view-delete', 'view-delete-edit'], default: 'view' },
  joiningDate: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

adminRegistrationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('AdminRegistration', adminRegistrationSchema);
