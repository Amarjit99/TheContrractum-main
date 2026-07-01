const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  collegeName: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  batchYear: { type: String, required: true, default: new Date().getFullYear().toString() }
}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema);
