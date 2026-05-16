const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'The Contractum' },
  companyLogo: { type: String, default: '' },
  companySeal: { type: String, default: '' },
  updatedBy: { type: String, default: 'System' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
