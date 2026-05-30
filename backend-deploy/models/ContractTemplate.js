const mongoose = require('mongoose');

const contractTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, enum: ['Employee', 'Intern', 'Freelancer', 'Vendor'], default: 'Employee' },
  content: { type: String, required: true }, // Template body with placeholders like {{employee_name}}
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ContractTemplate', contractTemplateSchema);
