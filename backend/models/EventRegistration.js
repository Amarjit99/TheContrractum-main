const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "MiniEvent" },
    eventName: { type: String, required: true, trim: true },
    eventDate: { type: String, required: true, trim: true },
    eventTime: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    status: { type: String, default: "Pending" },
    amountPaid: { type: String, default: "Free" },
    paymentMethod: { type: String, default: "N/A" },
    paymentStatus: { type: String, default: "N/A" },
    paymentDetails: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);
