const mongoose = require('mongoose');

const volunteerStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  image: { type: String, required: true },
  batchYear: { type: String, default: () => new Date().getFullYear().toString() }
}, { timestamps: true });

module.exports = mongoose.model('VolunteerStory', volunteerStorySchema);
