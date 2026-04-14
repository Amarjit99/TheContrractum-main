const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'reviewed', 'archived'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
