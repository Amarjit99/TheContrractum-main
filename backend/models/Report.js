const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  publicationDate: { type: String, required: true },
  year: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  fileSize: { type: String, required: true },
  format: { type: String, default: 'PDF' },
  highlights: [{ type: String }],
  downloads: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
