const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const CSRInitiative = require("../models/CSRInitiative");

const csrInitiatives = [
  {
    title: "Digital Education for Underprivileged Children",
    category: "Education",
    status: "Active",
    startDate: "2024-01",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
    description: "Providing free computer education, coding classes, and digital literacy programs to 5,000+ underprivileged children across 50 schools. Includes laptops, internet connectivity, and trained instructors.",
    impact: {
      beneficiaries: "5,000+ children",
      locations: "50 schools in 10 states",
      investment: "$1.2M",
      outcomes: "85% students now digitally literate"
    },
    goals: [
      "Reach 10,000 children by 2027",
      "Establish 100 digital learning centers",
      "Train 500+ teachers in digital education",
      "Provide 2,000 laptops annually"
    ],
    featured: true,
    sdgGoals: ["Quality Education", "Reduced Inequalities"],
    partnerOrganizations: ["Digital India Foundation", "National Education Board"]
  },
  {
    title: "Green Technology & Environmental Sustainability",
    category: "Environment",
    status: "Active",
    startDate: "2023-06",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
    description: "Carbon-neutral operations initiative including renewable energy adoption, tree plantation drives, e-waste recycling programs, and sustainable office practices. Committed to planting 50,000 trees annually.",
    impact: {
      beneficiaries: "Entire ecosystem",
      locations: "Pan-India + Global offices",
      investment: "$2.5M",
      outcomes: "60% reduction in carbon footprint"
    },
    goals: [
      "Achieve 100% carbon neutrality by 2027",
      "Plant 100,000 trees by 2026",
      "Zero e-waste to landfills",
      "100% renewable energy in all facilities"
    ],
    featured: true,
    sdgGoals: ["Climate Action", "Responsible Consumption"],
    partnerOrganizations: ["Green Earth Initiative", "Climate Action Network"]
  },
  {
    title: "Healthcare Access in Rural Areas",
    category: "Healthcare",
    status: "Active",
    startDate: "2024-03",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    description: "Mobile health clinics providing free medical checkups, medicines, and telemedicine consultations to remote villages. Focus on maternal health, child vaccination, and preventive care.",
    impact: {
      beneficiaries: "25,000+ patients treated",
      locations: "150 villages",
      investment: "$800K",
      outcomes: "90% improvement in healthcare access"
    },
    goals: [
      "Reach 500 villages by 2027",
      "Conduct 100,000 health screenings annually",
      "Provide free medicines to 50,000 patients",
      "Train 200 community health workers"
    ],
    featured: true,
    sdgGoals: ["Good Health and Well-being", "Zero Hunger"],
    partnerOrganizations: ["National Health Mission", "Doctors Without Borders"]
  },
  {
    title: "Women in Technology Empowerment Program",
    category: "Social",
    status: "Active",
    startDate: "2023-09",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop",
    description: "Free technology training, mentorship, and job placement support for women from economically disadvantaged backgrounds. Includes coding bootcamps, soft skills training, and entrepreneurship programs.",
    impact: {
      beneficiaries: "2,500+ women trained",
      locations: "15 training centers",
      investment: "$950K",
      outcomes: "70% job placement rate"
    },
    goals: [
      "Train 5,000 women in tech by 2027",
      "Achieve 80% job placement rate",
      "Support 500 women entrepreneurs",
      "Launch 25 training centers"
    ],
    featured: false,
    sdgGoals: ["Gender Equality", "Decent Work"],
    partnerOrganizations: ["Women in Tech Foundation", "Skill India Mission"]
  },
  {
    title: "Clean Water & Sanitation Projects",
    category: "Infrastructure",
    status: "Active",
    startDate: "2024-05",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    description: "Installing water purification systems, building toilets, and creating sanitation awareness in water-scarce regions. Focus on schools and community centers for maximum impact.",
    impact: {
      beneficiaries: "35,000+ people",
      locations: "80 villages",
      investment: "$650K",
      outcomes: "100% access to clean water in target areas"
    },
    goals: [
      "Provide clean water to 100,000 people by 2027",
      "Build 500 toilets in rural areas",
      "Install 200 water purification units",
      "Conduct sanitation awareness for 50,000 families"
    ],
    featured: false,
    sdgGoals: ["Clean Water and Sanitation", "Good Health"],
    partnerOrganizations: ["Water.org", "Swachh Bharat Mission"]
  },
  {
    title: "Skill Development for Youth Employment",
    category: "Education",
    status: "Active",
    startDate: "2023-03",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    description: "Vocational training programs in IT, digital marketing, data analytics, and emerging technologies for unemployed youth. Includes internship opportunities and job fair participation.",
    impact: {
      beneficiaries: "8,000+ youth trained",
      locations: "20 cities",
      investment: "$1.5M",
      outcomes: "65% employment within 6 months"
    },
    goals: [
      "Train 20,000 youth by 2027",
      "Achieve 75% employment rate",
      "Partner with 500 companies for placements",
      "Launch 50 skill development centers"
    ],
    featured: true,
    sdgGoals: ["Decent Work", "Quality Education"],
    partnerOrganizations: ["National Skill Development Corporation", "Industry Associations"]
  },
  {
    title: "Disaster Relief & Emergency Response",
    category: "Emergency",
    status: "Active",
    startDate: "2022-01",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=600&fit=crop",
    description: "Rapid response team providing immediate relief during natural disasters including food, shelter, medical aid, and technology support for affected communities. 24/7 emergency helpline operational.",
    impact: {
      beneficiaries: "15,000+ disaster victims",
      locations: "Disaster-affected regions",
      investment: "$1.8M",
      outcomes: "Response time under 24 hours"
    },
    goals: [
      "Build 10 disaster response centers",
      "Train 1,000 volunteers in emergency response",
      "Stock emergency supplies for 50,000 people",
      "Establish satellite communication systems"
    ],
    featured: false,
    sdgGoals: ["Sustainable Cities", "Climate Action"],
    partnerOrganizations: ["Red Cross", "National Disaster Response Force"]
  },
  {
    title: "Elderly Care & Digital Inclusion",
    category: "Social",
    status: "Active",
    startDate: "2024-08",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&h=600&fit=crop",
    description: "Teaching senior citizens to use smartphones, online banking, telemedicine, and social media to stay connected. Includes free tablets and personalized training sessions.",
    impact: {
      beneficiaries: "3,000+ elderly people",
      locations: "12 cities",
      investment: "$400K",
      outcomes: "90% now use digital services independently"
    },
    goals: [
      "Train 10,000 senior citizens by 2027",
      "Distribute 5,000 tablets with simplified interfaces",
      "Launch 30 elderly-friendly tech centers",
      "Create multilingual digital literacy content"
    ],
    featured: false,
    sdgGoals: ["Reduced Inequalities", "Quality Education"],
    partnerOrganizations: ["HelpAge India", "Senior Citizens Welfare Association"]
  }
];

async function seedData() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("No MONGO_URI in .env");
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    // Delete existing
    await CSRInitiative.deleteMany({});
    console.log("Cleared existing CSR Initiatives.");

    // Insert new
    await CSRInitiative.insertMany(csrInitiatives);
    console.log(`Successfully seeded ${csrInitiatives.length} CSR Initiatives!`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
