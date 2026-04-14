const mongoose = require('mongoose');
const User = require('./backend/models/User');
require('dotenv').config({ path: './backend/.env' });

const findAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/thecontractum');
    console.log('Connected to DB');
    const admin = await User.findOne({ role: { $in: ['admin', 'super-admin'] } });
    if (admin) {
      console.log('Found Admin:', admin.email);
    } else {
      console.log('No admin found. Creating one...');
      // Note: You might need to add matchPassword/hash logic if you were to create one here, 
      // but let's just see if one exists first.
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

findAdmin();
