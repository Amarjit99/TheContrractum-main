const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  features: { type: [String], default: [] },
  image: { type: String, default: '' },
  category: { type: String, enum: ['Digital Solutions', 'Business Solutions', 'Connectivity'], default: 'Digital Solutions' },
  subCategory: { type: String, default: '' },
  inquiries: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
