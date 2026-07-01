const mongoose = require('mongoose');

const contractTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, default: 'Employment Agreement' },
  category: { type: String, default: 'Employment & HR Contracts' },
  content: { type: String, required: true }, // Template body with placeholders like {{employee_name}}
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ContractTemplate', contractTemplateSchema);
