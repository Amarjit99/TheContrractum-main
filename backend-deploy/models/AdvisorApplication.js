const mongoose = require("mongoose");

const advisorApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    linkedin: { type: String, trim: true },
    domain: { type: String, required: true },
    experience: { type: String, required: true },
    currentOrg: { type: String, required: true, trim: true },
    achievements: { type: String, trim: true },
    interestStatement: { type: String, required: true, trim: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdvisorApplication", advisorApplicationSchema);
