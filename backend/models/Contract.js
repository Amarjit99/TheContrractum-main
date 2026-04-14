const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['Employee', 'Intern', 'Freelancer', 'Vendor'], default: 'Employee' },
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
    signatureIp: { type: String }
  },

  validFrom: { type: Date },
  validUntil: { type: Date },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
