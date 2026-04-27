const mongoose = require('mongoose');
const User = require('./backend/models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './backend/.env' });

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/thecontractum');
    console.log('Connected to DB');
    
    // Check if user exists
    let user = await User.findOne({ email: 'admin@thecontractum.com' });
    if (!user) {
        console.log('User not found. Creating admin user...');
        user = await User.create({
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@thecontractum.com',
            password: 'admin123',
            mobile: '1234567890',
            gender: 'Male',
            role: 'super-admin',
            isApproved: true
        });
        console.log('Admin created with password: admin123');
    } else {
        console.log('User found. Updating password and fields...');
        user.password = 'admin123';
        user.firstName = user.firstName || 'Super';
        user.lastName = user.lastName || 'Admin';
        user.mobile = user.mobile || '1234567890';
        user.gender = (user.gender && user.gender !== '') ? user.gender : 'Male';
        user.role = 'super-admin';
        user.isApproved = true;
        await user.save();
        console.log('Password reset to: admin123 and fields updated');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetPassword();
