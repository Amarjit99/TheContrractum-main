const mongoose = require("mongoose");

const demoRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, trim: true },
    productInterested: { type: String, trim: true },
    preferredDate: { type: Date },
    company: { type: String, trim: true },
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
