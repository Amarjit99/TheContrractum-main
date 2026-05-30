const mongoose = require('mongoose');

const completedProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, required: true },
  category: { type: String, required: true },
  completedDate: { type: String, required: true },
  duration: { type: String, required: true },
  teamSize: { type: Number, required: true },
  budget: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  technologies: [{ type: String }],
  image: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: { type: String },
  achievements: [{ type: String }],
  impact: { type: String, required: false },
  challenges: [{ type: String }],
  results: [{ type: String }],
  clientTestimonial: {
      quote: String,
      author: String,
      position: String
  },
  roi: String,
  keyMetrics: [{ label: String, value: String, icon: String }]
}, { collection: 'completedData' });

module.exports = mongoose.model('CompletedProject', completedProjectSchema);
