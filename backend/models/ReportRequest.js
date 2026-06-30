const mongoose = require('mongoose');

const reportRequestSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ReportRequest', reportRequestSchema);
