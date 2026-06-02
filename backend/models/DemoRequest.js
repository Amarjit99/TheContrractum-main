const mongoose = require("mongoose");

const demoRequestSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    jobTitle: { type: String, trim: true },
    employeeCount: { type: String, trim: true },
    interestArea: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['New', 'Reviewed', 'Demo Scheduled', 'Completed', 'Rejected'], default: 'New' },
    notes: { type: String, default: '' },
    assignedStaff: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoRequest", demoRequestSchema);
