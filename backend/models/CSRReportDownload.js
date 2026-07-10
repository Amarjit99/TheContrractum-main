const mongoose = require('mongoose');

const csrReportDownloadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  country: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CSRReportDownload', csrReportDownloadSchema);
