const mongoose = require('mongoose');
require('dotenv').config();

const Partner = require('./models/Partner');

const partners = [
  { name: "TechCorp Global", type: "Enterprise", tier: "Elite", pointOfContact: "Sarah Jenkins", joined: "Jan 2025", status: "Active" },
  { name: "Innovate Solutions", type: "Technology", tier: "Premier", pointOfContact: "Michael Chang", joined: "Mar 2025", status: "Active" },
  { name: "Global Systems Inc.", type: "Reseller", tier: "Associate", pointOfContact: "David Smith", joined: "Apr 2025", status: "Pending Review" },
  { name: "CloudWorks Consulting", type: "Channel", tier: "Premier", pointOfContact: "Emma Watson", joined: "Nov 2024", status: "Active" },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Remove test data
  await Partner.deleteMany({});
  console.log('Cleared old partners');

  // Insert real partners
  const result = await Partner.insertMany(partners);
  console.log(`Seeded ${result.length} partners`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(err => { console.error(err); process.exit(1); });
