const mongoose = require('mongoose');

const partnerApplicationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  businessType: { type: String, required: true },
  website: { type: String },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  partnershipCategory: { type: String, required: true },
  businessProposal: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PartnerApplication', partnerApplicationSchema);
