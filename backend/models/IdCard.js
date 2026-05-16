const mongoose = require("mongoose");

const idCardSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Student", "Employee", "Intern", "Consultant", "Trainer", 
      "Volunteer", "Research Associate", "Project Associate", "HR", 
      "Management", "Guest", "Vendor", "Visitor", "Contractor", 
      "Others"
    ],
    default: "Employee",
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Base64 or URL
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Generated"],
    default: "Pending",
  },
  validUntil: {
    type: Date,
    required: true,
  },
  cardColor: {
    type: String,
    default: "#1e5cdc",
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  issuedBy: {
    type: String,
    default: 'The Contractum',
  },
});

module.exports = mongoose.models.IdCard || mongoose.model("IdCard", idCardSchema);
