const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, minlength: 2 },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password is required'], minlength: 6 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

  // Avatar — stored as base64 data URI
  avatar: { type: String, default: '' },

  // Personal
  phone: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  gender: { type: String, enum: ['', 'Male', 'Female', 'Non-binary', 'Prefer not to say'], default: '' },
  location: { type: String, default: '' },
  bio: { type: String, default: '', maxlength: 600 },

  // Professional
  jobTitle: { type: String, default: '' },
  department: { type: String, default: '' },
  company: { type: String, default: '' },
  industry: { type: String, default: '' },
  experience: { type: String, default: '' }, // e.g. "3 years"
  skills: { type: [String], default: [] },

  // Social / Online
  website: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  github: { type: String, default: '' },

  joinedDate: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
