const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, default: 'Engineering' },
  location: { type: String, default: 'Remote' },
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], default: 'Full-Time' },
  posted: { type: String, default: 'Today' },
  tags: { type: [String], default: [] },
  applications: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
