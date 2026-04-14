const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['internship', 'hackathon', 'other'],
    required: true
  },
  issueDate: { type: Date, required: true },
  certificateId: { type: String, unique: true, required: true },
  fileUrl: { type: String, required: true },
  themeId: { type: String, default: 'classic' },
  designation: { type: String },
  details: { type: String },
  recipientEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
