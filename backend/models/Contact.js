const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    fullName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    companyName: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    preferredContactMethod: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
