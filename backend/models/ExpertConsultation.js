const mongoose = require("mongoose");

const expertConsultationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    company: { type: String, trim: true, default: '' },
    
    // Technical Assistance Form fields
    systemProductName: { type: String, trim: true, default: '' },
    technicalIssue: { type: String, trim: true, default: '' },
    errorScreenshot: { type: String, default: '' },
    deviceInformation: { type: String, trim: true, default: '' },
    contactDetails: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },

    // Expert Consultation Form fields (ConnectExperts.jsx)
    consultationTopic: { type: String, trim: true, default: '' },
    preferredSchedule: { type: String, trim: true, default: '' },

    // Business Consultation Form fields
    country: { type: String, trim: true, default: '' },
    industry: { type: String, trim: true, default: '' },
    serviceRequired: { type: String, trim: true, default: '' },
    inquiryType: { type: String, trim: true, default: '' },
    companySize: { type: String, trim: true, default: '' },
    preferredContactMethod: { type: String, trim: true, default: '' },
    projectTimeline: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },

    status: { type: String, enum: ['New', 'Reviewed', 'Followed Up', 'Completed', 'Resolved'], default: 'New' },
    notes: { type: String, default: '' },
    assignedStaff: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpertConsultation", expertConsultationSchema);
