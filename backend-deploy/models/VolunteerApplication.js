const mongoose = require('mongoose');

const volunteerApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  skills: [String],
  interests: String,
  availability: String,
  status: { type: String, enum: ['pending', 'reviewed', 'contacted', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('VolunteerApplication', volunteerApplicationSchema);
