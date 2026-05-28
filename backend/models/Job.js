const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, default: 'Engineering' },
  location: { type: String, default: 'Remote' },
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'], default: 'Full-Time' },
  posted: { type: String, default: 'Today' },
  tags: { type: [String], default: [] },
  applications: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
  // Bio / Job Detail Fields
  roles: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  qualification: { type: String, default: '' },
  experience: { type: String, default: '' },
  salary: { type: String, default: '' },
  benefits: { type: [String], default: [] },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  jobId: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
