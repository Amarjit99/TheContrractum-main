const mongoose = require('mongoose');

const partnerApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  domain: { type: String, required: true },
  sector: { type: String, required: true },
  organizationDetails: { type: String, required: true },
  achievements: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PartnerApplication', partnerApplicationSchema);
