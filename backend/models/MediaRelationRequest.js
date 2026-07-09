const mongoose = require('mongoose');

const mediaRelationRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  outlet: { type: String },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  requestedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MediaRelationRequest', mediaRelationRequestSchema);
