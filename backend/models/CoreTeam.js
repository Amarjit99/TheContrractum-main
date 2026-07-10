const mongoose = require('mongoose');

const coreTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, default: 'coreTeam' },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  linkedin: { type: String },
  twitter: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CoreTeam', coreTeamSchema);
