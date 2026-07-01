const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: String },
  completionDate: { type: String },
  team: [{ type: String }],
  collaborators: [{ type: String }],
  image: { type: String, required: true },
  description: { type: String, required: true },
  keyFindings: [{ type: String }],
  publications: [{ type: String }],
  patents: [{ type: String }],
  technologies: [{ type: String }],
  impact: { type: String },
  citation: { type: String },
  featured: { type: Boolean, default: false },
  fundingAmount: { type: String }
}, { collection: 'research' });

module.exports = mongoose.model('Research', researchSchema);
