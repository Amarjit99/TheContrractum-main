const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['Employee', 'Student', 'Intern', 'Consultant', 'Trainer', 'Volunteer', 'Research Associate', 'Project Associate', 'HR', 'Management', 'Guest', 'Vendor', 'Visitor', 'Contractor', 'Others'],
    required: true
  },
  issueDate: { type: Date, required: true },
  certificateId: { type: String, unique: true, required: true },
  fileUrl: { type: String, default: '' },
  themeId: { type: String, default: 'classic' },
  designation: { type: String },
  department: { type: String },
  details: { type: String },
  recipientEmail: { type: String },
  recipientPhone: { type: String },
  location: { type: String, default: 'India' },
  issuedBy: { type: String, default: 'The Contractum' },
  // ── Approval Workflow Fields ──
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Issued', 'Revoked', 'Expired'],
    default: 'Issued'
  },
  approvedBy: { type: String, default: '' },
  rejectedBy: { type: String, default: '' },
  rejectionReason: { type: String, default: '' },
  validUntil: { type: Date }
}, { timestamps: true });

module.exports = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
