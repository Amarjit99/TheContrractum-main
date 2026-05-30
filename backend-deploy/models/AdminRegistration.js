const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminRegistrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, trim: true },
  adminSubRole: { type: String, enum: ['HR', 'Finance', 'TR', 'Support Manager', 'Manager', 'Legal'], required: true },
  adminPermissions: { type: String, enum: ['view', 'view-delete', 'view-delete-edit'], default: 'view' },
  joiningDate: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

adminRegistrationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('AdminRegistration', adminRegistrationSchema);
