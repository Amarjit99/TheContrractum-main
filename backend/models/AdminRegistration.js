const mongoose = require('mongoose');

const adminRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  employeeId: { type: String, trim: true },
  role: { type: String, trim: true },
  department: { type: String, trim: true },
  mobile: { type: String, trim: true },
  adminSubRole: { type: String, trim: true },
  adminPermissions: { type: String, enum: ['view', 'view-delete', 'view-delete-edit'], default: 'view' },
  joiningDate: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

// NOTE: We do NOT hash the password here. 
// It will be hashed by the User model's pre-save hook when the Super Admin approves the account.

module.exports = mongoose.model('AdminRegistration', adminRegistrationSchema);
