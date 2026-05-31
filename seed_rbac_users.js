const mongoose = require('mongoose');
const User = require('./backend/models/User');
const AdminDetail = require('./backend/models/Admin');
require('dotenv').config({ path: './backend/.env' });

const subRoles = ['HR', 'Finance', 'TR', 'Support Manager', 'Manager', 'Legal'];

const seedAdmins = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/thecontractum');
    console.log('Connected to DB');

    for (const subRole of subRoles) {
      const emailPrefix = subRole.toLowerCase().replace(' ', '');
      const email = `${emailPrefix}@thecontractum.com`;
      const name = `${subRole} Admin`;
      const firstName = subRole.split(' ')[0];
      const lastName = 'Admin';

      let user = await User.findOne({ email });
      if (user) {
        console.log(`User ${email} already exists. Updating role and fields...`);
        user.role = 'admin';
        user.adminSubRole = subRole;
        user.adminPermissions = 'view-delete-edit';
        user.isApproved = true;
        user.password = 'admin123';
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();
      } else {
        console.log(`Creating user for ${email}...`);
        user = await User.create({
          firstName,
          lastName,
          email,
          password: 'admin123',
          mobile: '1234567890',
          role: 'admin',
          adminSubRole: subRole,
          adminPermissions: 'view-delete-edit',
          isApproved: true,
          joiningDate: new Date().toISOString().split('T')[0]
        });
      }

      // Sync AdminDetail
      let detail = await AdminDetail.findOne({ email });
      if (detail) {
        detail.userId = user._id;
        detail.name = name;
        detail.adminSubRole = subRole;
        detail.adminPermissions = 'view-delete-edit';
        await detail.save();
      } else {
        await AdminDetail.create({
          userId: user._id,
          name,
          email,
          adminSubRole: subRole,
          adminPermissions: 'view-delete-edit',
          joiningDate: new Date().toISOString().split('T')[0]
        });
      }
      console.log(`Successfully seeded/updated admin account for ${subRole}: ${email} / admin123`);
    }

    console.log('Done seeding test admin accounts!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding test admin accounts:', err);
    process.exit(1);
  }
};

seedAdmins();
