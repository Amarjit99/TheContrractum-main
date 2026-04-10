const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, default: '' },
  author: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
  readTime: { type: String, default: '5 min read' },
  category: { type: String, default: 'Technology' },
  image: { type: String, default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800' },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  content: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
