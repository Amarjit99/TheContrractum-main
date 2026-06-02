const mongoose = require('mongoose');

const quoteApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  budget: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('QuoteApplication', quoteApplicationSchema);
