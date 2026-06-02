const mongoose = require('mongoose');

const NewsletterSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  fullName: {
    type: String,
    trim: true,
    default: ''
  },
  industryPreference: {
    type: String,
    trim: true,
    default: ''
  },
  source: {
    type: String,
    required: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NewsletterSubscription', NewsletterSubscriptionSchema);
