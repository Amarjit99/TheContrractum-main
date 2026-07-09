const mongoose = require("mongoose");

const csrInitiativeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "Social" },
    status: { type: String, default: "Active" },
    startDate: { type: String },
    image: { type: String },
    description: { type: String },
    impact: {
      beneficiaries: { type: String },
      locations: { type: String },
      investment: { type: String },
      outcomes: { type: String },
    },
    goals: [{ type: String }],
    featured: { type: Boolean, default: true },
    sdgGoals: [{ type: String }],
    partnerOrganizations: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CSRInitiative", csrInitiativeSchema);
