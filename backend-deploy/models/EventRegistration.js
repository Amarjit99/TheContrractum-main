const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventDate: { type: String, required: true, trim: true },
    eventTime: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);
