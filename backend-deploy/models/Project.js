const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: String, required: true },
  expectedCompletion: { type: String, required: true },
  status: { type: String, default: 'In Progress' },
  progress: { type: Number, required: true },
  teamSize: { type: Number, required: true },
  budget: { type: String, required: true },
  technologies: [{ type: String }],
  image: { type: String, required: true }, // URL or Base64
  description: { type: String, required: true },
  keyFeatures: [{ type: String }],
  priority: { type: String, required: true },
  challenges: [{ type: String }],
  milestones: [{
    name: String,
    status: String,
    date: String
  }],
  objectives: [{ type: String }]
}, { collection: 'projects' });

module.exports = mongoose.model('Project', projectSchema);
