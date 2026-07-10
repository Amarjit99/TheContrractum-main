const mongoose = require('mongoose');
require('dotenv').config();

const Report = require('./models/Report');

const reports = [
  {
    title: "Annual Report 2025: Digital Transformation Success Stories",
    type: "Annual Report",
    publicationDate: "2026-01-15",
    year: "2025",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    description: "Comprehensive overview of TheContractum's achievements in 2025, including financial performance, major project completions, client testimonials, innovation initiatives, and strategic roadmap for 2026. Highlights include 250+ successful projects, 40% YoY growth, and expansion into 15 new markets.",
    pages: 124,
    fileSize: "12.5 MB",
    format: "PDF",
    highlights: [
      "250+ Projects Completed",
      "40% Revenue Growth",
      "15 New Market Entries",
      "98% Client Satisfaction",
      "50+ Innovation Patents"
    ],
    downloads: 8920,
    featured: true,
    category: "Corporate"
  },
  {
    title: "Q4 2025 Financial Report: Record-Breaking Quarter",
    type: "Quarterly Report",
    publicationDate: "2026-01-30",
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    description: "Detailed financial analysis for Q4 2025 showcasing exceptional growth metrics, revenue breakdown by service lines, regional performance, investment activities, and forward-looking statements. Record revenue of $45M with 35% profit margin and strategic acquisitions.",
    pages: 48,
    fileSize: "4.2 MB",
    format: "PDF",
    highlights: [
      "$45M Quarterly Revenue",
      "35% Profit Margin",
      "80+ New Clients Acquired",
      "3 Strategic Acquisitions",
      "Strong Cash Position"
    ],
    downloads: 5420,
    featured: true,
    category: "Financial"
  },
  {
    title: "Healthcare Technology Industry Report 2026",
    type: "Industry Report",
    publicationDate: "2026-02-10",
    year: "2026",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    description: "In-depth analysis of healthcare technology trends, digital health innovations, telemedicine adoption, AI in diagnostics, patient data management, regulatory compliance, and market forecasts for 2026-2030. Includes case studies from 20+ healthcare implementations.",
    pages: 86,
    fileSize: "8.7 MB",
    format: "PDF",
    highlights: [
      "20+ Healthcare Case Studies",
      "5-Year Market Forecast",
      "AI & Telemedicine Trends",
      "Regulatory Compliance Guide",
      "ROI Analysis"
    ],
    downloads: 12340,
    featured: true,
    category: "Industry Analysis"
  },
  {
    title: "Sustainability Report 2025: Our Environmental Impact",
    type: "Sustainability Report",
    publicationDate: "2025-12-20",
    year: "2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
    description: "Comprehensive sustainability report detailing TheContractum's environmental initiatives, carbon footprint reduction achievements, renewable energy adoption, waste management, CSR activities, and alignment with UN Sustainable Development Goals. Achieved 60% carbon reduction.",
    pages: 64,
    fileSize: "6.8 MB",
    format: "PDF",
    highlights: [
      "60% Carbon Reduction",
      "100% Renewable Energy",
      "Zero Waste to Landfill",
      "50,000 Trees Planted",
      "UN SDG Alignment"
    ],
    downloads: 6780,
    featured: false,
    category: "Corporate"
  },
  {
    title: "AI & Machine Learning Technical Report 2025",
    type: "Technical Report",
    publicationDate: "2025-11-15",
    year: "2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    description: "Technical deep-dive into TheContractum's AI/ML implementations, including natural language processing systems, computer vision applications, predictive analytics models, recommendation engines, and performance benchmarks. Features 30+ real-world AI deployments.",
    pages: 92,
    fileSize: "9.4 MB",
    format: "PDF",
    highlights: [
      "30+ AI Deployments",
      "95% Model Accuracy",
      "NLP & Computer Vision",
      "Performance Benchmarks",
      "Open Source Contributions"
    ],
    downloads: 9850,
    featured: true,
    category: "Technology"
  },
  {
    title: "Global Market Expansion Report 2025",
    type: "Market Report",
    publicationDate: "2025-10-05",
    year: "2025",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
    description: "Strategic analysis of TheContractum's international expansion journey, covering market entry strategies, regional partnerships, cultural adaptation, competitive positioning, and growth opportunities in Asia-Pacific, Europe, and Latin America markets.",
    pages: 76,
    fileSize: "7.2 MB",
    format: "PDF",
    highlights: [
      "15 New Geographic Markets",
      "40+ Strategic Partnerships",
      "Regional Success Stories",
      "Market Entry Strategies",
      "5-Year Expansion Roadmap"
    ],
    downloads: 4520,
    featured: false,
    category: "Market Analysis"
  },
  {
    title: "Cybersecurity Assessment Report 2025",
    type: "Technical Report",
    publicationDate: "2025-09-20",
    year: "2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    description: "Comprehensive cybersecurity review covering threat landscape analysis, security architecture improvements, penetration testing results, incident response protocols, compliance certifications (ISO 27001, SOC 2), and recommendations for enhanced security posture.",
    pages: 58,
    fileSize: "5.6 MB",
    format: "PDF",
    highlights: [
      "ISO 27001 Certified",
      "SOC 2 Type II Compliant",
      "Zero Security Breaches",
      "24/7 Threat Monitoring",
      "Advanced Threat Defense"
    ],
    downloads: 7230,
    featured: false,
    category: "Technology"
  },
  {
    title: "Employee Satisfaction & Culture Report 2025",
    type: "HR Report",
    publicationDate: "2025-08-10",
    year: "2025",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    description: "Annual employee engagement survey results, workplace culture initiatives, diversity & inclusion metrics, professional development programs, employee benefits analysis, retention strategies, and action plans based on feedback from 1,500+ employees.",
    pages: 52,
    fileSize: "4.8 MB",
    format: "PDF",
    highlights: [
      "92% Employee Satisfaction",
      "40% Female Leadership",
      "500+ Training Programs",
      "15% Attrition Rate",
      "Award-Winning Culture"
    ],
    downloads: 3890,
    featured: false,
    category: "Corporate"
  },
  {
    title: "Q3 2025 Performance Report",
    type: "Quarterly Report",
    publicationDate: "2025-10-31",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    description: "Comprehensive Q3 2025 business performance review featuring revenue analysis, project milestones, client acquisition metrics, operational efficiency improvements, market positioning, and strategic initiatives completed during the quarter.",
    pages: 44,
    fileSize: "4.0 MB",
    format: "PDF",
    highlights: [
      "$38M Quarterly Revenue",
      "32% Profit Margin",
      "65+ New Clients",
      "95% On-Time Delivery",
      "Strategic Partnerships"
    ],
    downloads: 4120,
    featured: false,
    category: "Financial"
  },
  {
    title: "Research & Innovation Report 2025",
    type: "Research Report",
    publicationDate: "2025-07-15",
    year: "2025",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=600&fit=crop",
    description: "Comprehensive overview of TheContractum's R&D activities, breakthrough innovations, patent filings, research collaborations with universities, open-source contributions, technology incubation programs, and future research roadmap for emerging technologies.",
    pages: 98,
    fileSize: "10.2 MB",
    format: "PDF",
    highlights: [
      "25 Patents Filed",
      "50+ Research Projects",
      "10 University Partnerships",
      "Innovation Labs Launched",
      "Open Source Leadership"
    ],
    downloads: 6540,
    featured: false,
    category: "Technology"
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

  // Clear existing reports
  await Report.deleteMany({});
  console.log('Cleared old reports');

  // Seed reports
  const result = await Report.insertMany(reports);
  console.log(`Seeded ${result.length} reports successfully!`);

  await mongoose.disconnect();
  console.log('Database disconnected');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
