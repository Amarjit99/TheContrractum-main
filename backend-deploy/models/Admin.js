const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adminSubRole: { type: String, enum: ['HR', 'Finance', 'TR', 'Support Manager'], required: true },
  adminPermissions: { type: String, enum: ['view', 'view-delete', 'view-delete-edit'], default: 'view' },
  joiningDate: { type: String, required: true },
  registrationId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminRegistration' },
}, { timestamps: true, collection: 'admindb' });

module.exports = mongoose.model('AdminDetail', adminSchema);
