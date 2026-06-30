const mongoose = require('mongoose');

const pressReleaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  type: { type: String, default: 'Press Release' }
}, { timestamps: true });

module.exports = mongoose.model('PressRelease', pressReleaseSchema);
