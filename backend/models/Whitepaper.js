const mongoose = require('mongoose');

const whitepaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  publicationDate: { type: String, required: true },
  authors: [{ type: String }],
  pages: { type: Number, required: true },
  fileSize: { type: String, required: true },
  image: { type: String, required: true },
  abstract: { type: String, required: true },
  keyTopics: [{ type: String }],
  downloadCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  year: { type: String, required: true },
  pdfUrl: { type: String, default: '/pdf/Telecom.pdf' }
}, { timestamps: true });

module.exports = mongoose.model('Whitepaper', whitepaperSchema);
