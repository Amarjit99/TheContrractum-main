const mongoose = require('mongoose');

const whitepaperRequestSchema = new mongoose.Schema({
  whitepaperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Whitepaper', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('WhitepaperRequest', whitepaperRequestSchema);
