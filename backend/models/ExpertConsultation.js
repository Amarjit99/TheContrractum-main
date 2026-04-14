const mongoose = require("mongoose");

const expertConsultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpertConsultation", expertConsultationSchema);
