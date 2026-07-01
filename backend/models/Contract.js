const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  recipientType: { type: String, enum: ['employee', 'external'], default: 'employee' },
  customRecipient: {
    name: { type: String },
    email: { type: String },
    jobTitle: { type: String },
    department: { type: String },
    salary: { type: String },
    address: { type: String }
  },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, default: 'Employment Agreement' },
  category: { type: String, default: 'Employment & HR Contracts' },
  content: { type: String, required: true }, // Contract body content (HTML or plain text)
  
  status: { 
    type: String, 
    enum: [
      'Draft', 
      'Pending_Manager', 
      'Pending_HR', 
      'Pending_Legal', 
      'Pending_Final', 
      'Pending_Signature', 
      'Active', 
      'Expired', 
      'Rejected'
    ], 
    default: 'Draft' 
  },

  approvals: [{
    role: { type: String, enum: ['Manager', 'HR', 'Legal', 'SuperAdmin'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Approved', 'Rejected'] },
    comments: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],

  signature: {
    isSigned: { type: Boolean, default: false },
    signedAt: { type: Date },
    signatureName: { type: String }, // Digital signature (typed name)
    signatureImage: { type: String }, // Drawn signature image (base64)
    signatureIp: { type: String }
  },

  clauses: {
    scopeOfWork: { type: String, default: '' },
    paymentTerms: { type: String, default: '' },
    deliverables: { type: String, default: '' },
    timelineMilestones: { type: String, default: '' },
    confidentiality: { type: String, default: '' },
    ipRights: { type: String, default: '' },
    termination: { type: String, default: '' },
    penalty: { type: String, default: '' },
    disputeResolution: { type: String, default: '' },
    governingLaw: { type: String, default: '' },
    liability: { type: String, default: '' },
    forceMajeure: { type: String, default: '' },
    renewal: { type: String, default: '' }
  },

  validFrom: { type: Date },
  validUntil: { type: Date },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
