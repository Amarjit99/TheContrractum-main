const mongoose = require('mongoose');

const founderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, enum: ['founder', 'director'], default: 'director' },
  
  // common
  image: { type: String, required: true },

  // For Directors
  background: { type: String },
  focusArea: { type: String },
  contribution: { type: String },

  // For Founders
  bio: { type: String },
  expertise: { type: [String] },
  achievements: { type: [String] }

}, { timestamps: true });

module.exports = mongoose.model('Founder', founderSchema);
