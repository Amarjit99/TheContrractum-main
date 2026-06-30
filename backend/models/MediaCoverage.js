const mongoose = require('mongoose');

const mediaCoverageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publication: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, default: 'Media Coverage' },
  link: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('MediaCoverage', mediaCoverageSchema);
