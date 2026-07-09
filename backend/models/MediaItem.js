const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Photo', 'Video'], required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, default: '' },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('MediaItem', mediaItemSchema);
