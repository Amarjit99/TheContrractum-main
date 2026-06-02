const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { 
      type: String, 
      default: 'New', 
      enum: ['New', 'Under Review', 'In Progress', 'Follow-Up Pending', 'Resolved'] 
    },
    priority: { 
      type: String, 
      default: 'Low', 
      enum: ['Low', 'Medium', 'High'] 
    },
    assignedTo: { 
      type: String, 
      default: 'Unassigned' 
    },
    notes: { type: String, default: '' },
    assignedStaff: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
