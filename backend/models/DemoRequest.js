const mongoose = require("mongoose");

const demoRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    productInterested: { type: String, required: true, trim: true },
    preferredDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoRequest", demoRequestSchema);
