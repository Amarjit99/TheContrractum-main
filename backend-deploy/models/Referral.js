const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrerName: {
    type: String,
    required: true,
  },
  candidateName: {
    type: String,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
  },
  candidatePhone: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Hired', 'Declined'],
    default: 'Applied',
  },
  rewardAmount: {
    type: Number,
    default: 70, // Default reward value as shown in dummy
  },
  rewardStatus: {
    type: String,
    enum: ['Pending', 'Rewarded'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'referraldb' });

module.exports = mongoose.model('Referral', referralSchema);
