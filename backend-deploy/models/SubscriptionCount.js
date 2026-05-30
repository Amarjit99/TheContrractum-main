const mongoose = require('mongoose');

const SubscriptionCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('SubscriptionCount', SubscriptionCountSchema);
