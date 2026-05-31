const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Technology', 'Enterprise', 'Reseller', 'Channel'], default: 'Technology' },
  tier: { type: String, enum: ['Associate', 'Premier', 'Elite'], default: 'Associate' },
  pointOfContact: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Pending Review', 'Inactive'], default: 'Pending Review' },
  joined: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);
