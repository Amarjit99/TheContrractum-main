const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Legacy Name (for compatibility)
  name: { type: String, trim: true },
  
  // Personal Information (from ERP Form)
  firstName: { type: String, required: [true, 'First Name is required'], trim: true },
  lastName: { type: String, required: [true, 'Last Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 4 },
  mobile: { type: String, required: [true, 'Mobile number is required'], trim: true },
  alternateMobile: { type: String, trim: true, default: '' },
  whatsapp: { type: String, trim: true, default: '' },
  gender: { type: String, enum: ['Select', 'Male', 'Female', 'Other'], default: 'Select' },
  dob: { type: String, default: '' }, // Preferred as String for dd-mm-yyyy

  // Address (from ERP Form)
  street: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  state: { type: String, trim: true, default: '' },
  country: { type: String, trim: true, default: 'India' },
  pincode: { type: String, trim: true, default: '' },

  role: { type: String, enum: ['user', 'admin', 'super-admin'], default: 'user' },
  isApproved: { type: Boolean, default: false },
  adminSubRole: { type: String, enum: ['', 'HR', 'Finance', 'TR', 'Support Manager', 'Manager', 'Legal'], default: '' },
  adminPermissions: { type: String, enum: ['view', 'view-delete', 'view-delete-edit'], default: 'view' },
  joiningDate: { type: String, default: '' },

  // Avatar — stored as base64 data URI
  avatar: { type: String, default: '' },

  // Profile Extras
  phone: { type: String, default: '' }, // Keep legacy phone field
  dateOfBirth: { type: String, default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '', maxlength: 600 },

  // Professional
  jobTitle: { type: String, default: '' },
  department: { type: String, default: '' },
  company: { type: String, default: '' },
  industry: { type: String, default: '' },
  experience: { type: String, default: '' }, 
  skills: { type: [String], default: [] },

  // Social / Online
  website: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  github: { type: String, default: '' },

  joinedDate: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // Sync legacy name field
  if (this.isModified('firstName') || this.isModified('lastName')) {
    this.name = `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  if (!this.isModified('password')) return next();
  
  // Check if password is already a valid bcrypt hash
  const isBcrypt = /^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(this.password);
  if (!isBcrypt) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
