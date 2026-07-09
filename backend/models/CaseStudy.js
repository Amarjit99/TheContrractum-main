const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  industry: { type: String, required: true },
  duration: { type: String, required: true },
  teamSize: { type: Number, required: true },
  image: { type: String, required: true },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  fullDescription: { type: String },
  results: [{ type: String }],
  technologies: [{ type: String }],
  testimonial: { type: String },
  testimonialAuthor: { type: String },
  impact: { type: String },
  featured: { type: Boolean, default: false },
  keyObjectives: [{ type: String }],
  challenges_detailed: [{ type: String }],
  implementation: [{
    phase: String,
    duration: String,
    description: String
  }],
  businessValue: {
    roi: String,
    costSavings: String,
    revenueImpact: String,
    efficiency: String
  },
  metrics: [{
    label: String,
    value: String,
    icon: String
  }],
  awards: [{ type: String }]
}, { collection: 'caseStudies' });

module.exports = mongoose.model('CaseStudy', caseStudySchema);
