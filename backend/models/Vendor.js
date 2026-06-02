const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: { type: String },
  contactNumber: { type: String },
  email: { type: String }
});

const vendorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  vendorName: { type: String }, // Added Vendor Name
  vendorContact: { type: String }, // Added Vendor Contact Number
  gstNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  contactPerson: { type: String, required: true },
  businessAddress: { type: String, required: true },
  servicesOffered: { type: String, required: true },
  companyType: { type: String, default: 'Single Proprietor' }, // 'Single Proprietor' or 'Private Limited'
  directors: [directorSchema],
  authorizedDirectorName: { type: String },
  authorizationDetails: { type: String },
  bankDetails: {
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String }
  },
  documents: {
    gstCertificate: { type: String },
    panCard: { type: String },
    cancelledCheque: { type: String },
    authorizationLetter: { type: String }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
