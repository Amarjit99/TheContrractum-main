const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'The Contractum' },
  companyLogo: { type: String, default: '' },
  companySeal: { type: String, default: '' },
  authorizedSignature: { type: String, default: '' },
  signatoryDesignation: { type: String, default: 'Authorized Authority' },
  updatedBy: { type: String, default: 'System' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
