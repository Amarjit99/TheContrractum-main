const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  jobTitle: { type: String },
  resume: { type: String }, // Store as URL or base64 (simplified for now)
  coverLetter: { type: String },
  status: { type: String, enum: ['New', 'Reviewed', 'Interviewing', 'Rejected'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
