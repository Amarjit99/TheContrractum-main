const mongoose = require('mongoose');

const quoteApplicationSchema = new mongoose.Schema({
  fullName: { type: String },
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  service: { type: String },
  serviceRequired: { type: String },
  budget: { type: String },
  budgetEstimate: { type: String },
  description: { type: String },
  projectScope: { type: String },
  timeline: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('QuoteApplication', quoteApplicationSchema);
