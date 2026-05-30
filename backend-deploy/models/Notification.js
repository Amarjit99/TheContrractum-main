const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g. 'Contact Form', 'Job Application'
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String }, // Admin dashboard link to view the details
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
