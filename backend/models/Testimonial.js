const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  industry: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 5 },
  project: { type: String, required: true },
  testimonial: { type: String, required: true },
  beforeContext: { type: String },
  afterResults: { type: String },
  projectDuration: { type: String },
  videoTestimonial: { type: Boolean, default: false },
  videoUrl: { type: String },
  featured: { type: Boolean, default: false },
  date: { type: String }
}, { collection: 'testimonials' });

module.exports = mongoose.model('Testimonial', testimonialSchema);
