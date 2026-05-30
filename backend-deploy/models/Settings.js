const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, default: 'The Contractum' },
  companyLogo: { type: String, default: '' },
  companySeal: { type: String, default: '' },
  authorizedSignature: { type: String, default: '' },
  signatoryDesignation: { type: String, default: 'Authorized Authority' },
  socialLinks: {
    linkedin: { type: String, default: 'https://www.linkedin.com/company/contractum-integral-solution-pvt-ltd/posts/?feedView=all' },
    twitter: { type: String, default: 'https://twitter.com/thecontractum' },
    facebook: { type: String, default: 'https://facebook.com/thecontractum' },
    youtube: { type: String, default: 'https://youtube.com/@thecontractum' }
  },
  contactDetails: {
    email: { type: String, default: 'info@thecontractum.com' },
    phone: { type: String, default: '+91 96805-34740' },
    address: { type: String, default: 'Plot No 169, Ground Floor, Rangbari Road, Kota, Rajasthan 324005' }
  },
  updatedBy: { type: String, default: 'System' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
