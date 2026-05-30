const mongoose = require("mongoose");

const CookieSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  acceptedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Cookie", CookieSchema);
