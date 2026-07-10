const mongoose = require('mongoose');
require('dotenv').config();

const MediaItem = require('./models/MediaItem');
const PressRelease = require('./models/PressRelease');
const MediaCoverage = require('./models/MediaCoverage');

const mediaItems = [
  {
    title: "Annual Innovation Summit 2025",
    type: "Photo",
    category: "Events",
    date: "2025-12-15",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
    description: "Our flagship innovation summit brought together 500+ technology leaders to discuss the future of digital transformation and emerging technologies.",
    tags: ["Summit", "Innovation", "Technology"],
    featured: true,
    views: 12500
  },
  {
    title: "New Office Campus Opening Ceremony",
    type: "Photo",
    category: "Corporate",
    date: "2026-01-20",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    description: "Grand opening of our state-of-the-art technology campus in Bangalore, featuring modern workspaces, innovation labs, and collaborative zones.",
    tags: ["Office", "Campus", "Expansion"],
    featured: true,
    views: 9800
  },
  {
    title: "CEO Keynote at Tech Summit",
    type: "Video",
    category: "Leadership",
    date: "2026-02-05",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop",
    description: "Our CEO delivered an inspiring keynote on 'The Future of Work in the AI Era' at the Global Technology Summit 2026.",
    duration: "25:30",
    tags: ["CEO", "Keynote", "Leadership"],
    featured: true,
    views: 18200
  },
  {
    title: "Team Building & Outdoor Activities",
    type: "Photo",
    category: "Culture",
    date: "2025-11-10",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=1200&h=800&fit=crop",
    description: "Annual team building retreat where our employees engaged in outdoor activities, workshops, and bonding sessions.",
    tags: ["Team Building", "Culture", "Activities"],
    featured: false,
    views: 5600
  },
  {
    title: "AI Product Launch Event",
    type: "Video",
    category: "Products",
    date: "2025-10-20",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=800&fit=crop",
    description: "Launch event for our revolutionary AI-powered analytics platform that transforms how businesses make data-driven decisions.",
    duration: "18:45",
    tags: ["Product Launch", "AI", "Innovation"],
    featured: false,
    views: 14300
  },
  {
    title: "Hackathon Winners Announcement",
    type: "Photo",
    category: "Events",
    date: "2025-09-15",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
    description: "Annual hackathon concluded with 150+ participants showcasing innovative solutions. Winners received prizes and incubation support.",
    tags: ["Hackathon", "Innovation", "Competition"],
    featured: false,
    views: 7400
  },
  {
    title: "Community CSR Initiative",
    type: "Photo",
    category: "CSR",
    date: "2025-08-25",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop",
    description: "Our team volunteering at a rural digital literacy program, teaching computer skills to underprivileged students.",
    tags: ["CSR", "Community", "Education"],
    featured: false,
    views: 4200
  },
  {
    title: "Behind the Scenes: Innovation Lab",
    type: "Video",
    category: "Technology",
    date: "2026-01-10",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop",
    description: "Exclusive behind-the-scenes tour of our cutting-edge innovation lab where breakthrough technologies are developed.",
    duration: "12:20",
    tags: ["Innovation Lab", "Technology", "Research"],
    featured: true,
    views: 11800
  },
  {
    title: "Client Success Stories Interview",
    type: "Video",
    category: "Client Stories",
    date: "2025-12-05",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
    description: "Clients share their transformation journey and success achieved through our technology solutions.",
    duration: "22:15",
    tags: ["Clients", "Success Stories", "Testimonials"],
    featured: false,
    views: 8900
  },
  {
    title: "Industry Awards Ceremony",
    type: "Photo",
    category: "Achievements",
    date: "2025-11-30",
    image: "https://images.unsplash.com/photo-1464639351491-a172c2aa2911?w=1200&h=800&fit=crop",
    description: "TheContractum wins 'Best Technology Company of the Year' and 'Innovation Excellence Award' at the National Tech Awards.",
    tags: ["Awards", "Recognition", "Achievement"],
    featured: true,
    views: 10500
  },
  {
    title: "Women in Tech Workshop",
    type: "Photo",
    category: "Culture",
    date: "2025-10-08",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop",
    description: "Empowering women in technology through skill development workshops, mentorship programs, and career guidance sessions.",
    tags: ["Women in Tech", "Workshop", "Empowerment"],
    featured: false,
    views: 6700
  },
  {
    title: "Smart City Project Showcase",
    type: "Video",
    category: "Projects",
    date: "2025-09-20",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
    description: "Documentary showcasing our smart city implementation that transformed urban infrastructure with IoT and AI technologies.",
    duration: "28:40",
    tags: ["Smart City", "IoT", "Infrastructure"],
    featured: false,
    views: 13200
  }
];

const pressReleases = [
  {
    title: "TheContractum Announces Strategic Partnership with Global Tech Giant",
    date: "2026-02-15",
    excerpt: "TheContractum has entered into a strategic partnership with a Fortune 500 technology company to accelerate digital transformation initiatives across Asia-Pacific markets."
  },
  {
    title: "Record Q4 2025 Results: 40% YoY Growth",
    date: "2026-01-30",
    excerpt: "TheContractum reports exceptional Q4 2025 financial results with $45M revenue, marking 40% year-over-year growth and strongest quarter in company history."
  },
  {
    title: "TheContractum Launches AI-Powered Analytics Platform",
    date: "2025-10-20",
    excerpt: "Revolutionary AI platform enables enterprises to unlock insights from massive datasets with 10x faster processing and predictive analytics capabilities."
  }
];

const mediaCoverage = [
  {
    title: "TheContractum Named 'Best Technology Company of the Year'",
    publication: "Tech Business Magazine",
    date: "2026-02-10",
    link: "#"
  },
  {
    title: "How TheContractum is Revolutionizing Digital Transformation",
    publication: "Forbes Technology",
    date: "2026-01-25",
    link: "#"
  },
  {
    title: "TheContractum CEO on the Future of AI in Enterprise",
    publication: "Business Today",
    date: "2026-01-15",
    link: "#"
  }
];

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is not defined in env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  // Clear existing
  await MediaItem.deleteMany({});
  await PressRelease.deleteMany({});
  await MediaCoverage.deleteMany({});
  console.log('Cleared old media collections');

  // Insert
  const seededItems = await MediaItem.insertMany(mediaItems);
  console.log(`Seeded ${seededItems.length} media items`);

  const seededPress = await PressRelease.insertMany(pressReleases);
  console.log(`Seeded ${seededPress.length} press releases`);

  const seededCoverage = await MediaCoverage.insertMany(mediaCoverage);
  console.log(`Seeded ${seededCoverage.length} media coverage items`);

  await mongoose.disconnect();
  console.log('Database disconnected successfully');
}

seed().catch(err => {
  console.error('Media seeding failed:', err);
  process.exit(1);
});
