const mongoose = require('mongoose');

const communicationLogSchema = new mongoose.Schema({
  type: { type: String, enum: ['Email', 'WhatsApp', 'SMS'], required: true },
  message: { type: String, required: true },
  sender: { type: String, default: 'System / HR' },
  sentAt: { type: Date, default: Date.now }
});

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  jobTitle: { type: String },
  positionApplied: { type: String },
  resume: { type: String }, // Store as URL or path
  experience: { type: String },
  skills: { type: String },
  linkedInProfile: { type: String },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ['New', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'HR Discussion', 'Selected', 'Rejected', 'On Hold'],
    default: 'New'
  },
  category: { type: String, default: 'Technology' },
  subcategory: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  assignedHR: { type: String, default: '' },
  hrNotes: { type: String, default: '' },
  interviewDate: { type: String, default: '' },
  interviewTime: { type: String, default: '' },
  interviewStatus: {
    type: String,
    enum: ['Pending', 'Scheduled', 'Completed', 'Rescheduled', 'Cancelled'],
    default: 'Pending'
  },
  documentVerificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending'
  },
  offerLetterStatus: {
    type: String,
    enum: ['Not Sent', 'Sent', 'Accepted', 'Declined'],
    default: 'Not Sent'
  },
  communicationLogs: { type: [communicationLogSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);

