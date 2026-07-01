const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const { protect: auth } = require('../middleware/auth');

const seedData = [
  {
    title: "Transforming Healthcare with AI-Powered Diagnostics",
    client: "National Health Institute",
    industry: "Healthcare",
    duration: "14 months",
    teamSize: 22,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    challenge: "The healthcare system was facing delays in disease diagnosis, leading to late treatments and increased mortality rates. Manual analysis of medical reports took 3-5 days, creating bottlenecks in patient care.",
    solution: "We developed an AI-powered diagnostic platform using machine learning algorithms to analyze medical images, lab reports, and patient history. The system provides real-time diagnostic suggestions with 95% accuracy, integrated seamlessly with existing hospital management systems.",
    fullDescription: "The National Health Institute approached us with a critical challenge: their manual diagnostic processes were taking 3-5 days, causing treatment delays and affecting patient outcomes. We designed and deployed a comprehensive AI-powered diagnostic platform that revolutionized their operations. The system uses advanced machine learning algorithms trained on millions of medical records to analyze X-rays, CT scans, MRIs, and lab reports in real-time. Integration with existing hospital systems ensures seamless workflow, while the intuitive interface enables doctors to review AI suggestions alongside patient history. The platform supports multiple specializations including cardiology, oncology, neurology, and radiology.",
    results: [
      "95% diagnostic accuracy",
      "Reduced diagnosis time from 5 days to 2 hours",
      "Served 2M+ patients",
      "40% reduction in treatment delays",
      "Saved 15,000+ lives"
    ],
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "AWS", "Docker"],
    testimonial: "This AI system has revolutionized our diagnostic process. We're now able to save more lives than ever before.",
    testimonialAuthor: "Dr. Sarah Johnson, Chief Medical Officer",
    impact: "The platform is now deployed across 500+ hospitals nationwide, processing 50,000+ diagnostic cases daily and contributing to a 35% improvement in patient outcomes.",
    featured: true,
    keyObjectives: [
      "Reduce diagnostic time from days to hours",
      "Achieve 90%+ accuracy in AI-powered diagnostics",
      "Integrate seamlessly with existing hospital systems",
      "Scale to serve 500+ hospitals nationwide",
      "Maintain HIPAA compliance and data security"
    ],
    challenges_detailed: [
      "Training AI models with diverse medical data across multiple specializations",
      "Ensuring 95%+ accuracy to gain doctor confidence and regulatory approval",
      "Integrating with legacy hospital management systems",
      "Building scalable infrastructure to handle 50K+ daily diagnoses",
      "Maintaining strict HIPAA compliance and data security protocols"
    ],
    implementation: [
      { phase: "Discovery & Planning", duration: "2 months", description: "Conducted extensive research with medical professionals, analyzed existing workflows, and designed the AI architecture. Created comprehensive data collection and annotation protocols." },
      { phase: "AI Model Development", duration: "5 months", description: "Trained machine learning models on millions of anonymized medical records. Developed specialized models for different medical specializations and achieved 95% accuracy through iterative testing." },
      { phase: "Platform Development", duration: "4 months", description: "Built the web platform with intuitive UI for doctors, integrated with hospital systems, and implemented real-time processing capabilities with robust security measures." },
      { phase: "Testing & Validation", duration: "2 months", description: "Conducted extensive testing with medical professionals, validated AI accuracy across thousands of cases, and obtained necessary certifications and regulatory approvals." },
      { phase: "Deployment & Training", duration: "1 month", description: "Rolled out to 500+ hospitals in phases, trained medical staff, established 24/7 support, and monitored performance metrics closely." }
    ],
    businessValue: {
      roi: "450% ROI achieved within 18 months",
      costSavings: "$85M annual savings in operational costs",
      revenueImpact: "Enabled treatment of 30% more patients",
      efficiency: "98% reduction in diagnostic time"
    },
    metrics: [
      { label: "Diagnostic Accuracy", value: "95%", icon: "🎯" },
      { label: "Time Reduction", value: "98%", icon: "⚡" },
      { label: "Patients Served", value: "2M+", icon: "👥" },
      { label: "Lives Saved", value: "15K+", icon: "❤️" }
    ],
    awards: [
      "Healthcare Innovation Award 2025",
      "Best AI Solution - Medical Tech Summit",
      "Digital Health Excellence Award"
    ]
  },
  {
    title: "Banking Revolution: Digital Transformation at Scale",
    client: "Global Banking Corporation",
    industry: "Finance",
    duration: "18 months",
    teamSize: 28,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    challenge: "Legacy banking systems were causing frequent downtime, security vulnerabilities, and poor customer experience. The bank was losing customers to digital-first competitors and facing compliance issues.",
    solution: "We architected and implemented a complete digital banking platform with microservices architecture, real-time transaction processing, biometric security, and AI-powered fraud detection. The solution included mobile apps, web platform, and API integration with third-party services.",
    fullDescription: "Global Banking Corporation was facing existential threats from digital-first competitors and suffering from legacy technology debt. Their systems experienced frequent downtimes, security vulnerabilities were discovered monthly, and customer satisfaction was at an all-time low. We designed and executed a complete digital transformation, rebuilding their entire tech stack from the ground up. The new platform features a microservices architecture for scalability, real-time transaction processing handling millions of daily transactions, advanced biometric security, and AI-powered fraud detection that has reduced fraud by 85%. The solution includes native mobile apps for iOS and Android, a responsive web platform, and comprehensive API integration with payment gateways, investment platforms, and third-party financial services.",
    results: [
      "Zero downtime in 12 months",
      "10M+ active users",
      "99.99% uptime",
      "85% reduction in fraud",
      "$500M in digital transactions/day"
    ],
    technologies: ["React Native", "Java", "Spring Boot", "Oracle", "Kubernetes", "AWS"],
    testimonial: "The transformation exceeded our expectations. We've become a leader in digital banking innovation.",
    testimonialAuthor: "James Wilson, CTO",
    impact: "The bank saw a 200% increase in digital adoption, reduced operational costs by $50M annually, and improved customer satisfaction scores from 3.2 to 4.8/5.",
    featured: true,
    keyObjectives: [
      "Achieve zero downtime with 99.99% uptime SLA",
      "Migrate 10M+ users to new platform without disruption",
      "Reduce fraud incidents by 70%+",
      "Improve customer satisfaction from 3.2 to 4.5+",
      "Enable real-time processing of millions of daily transactions"
    ],
    challenges_detailed: [
      "Migrating critical banking systems without service disruption",
      "Ensuring zero data loss during migration of 10M+ accounts",
      "Building fraud detection AI trained on banking patterns",
      "Meeting strict financial regulatory compliance requirements",
      "Scaling infrastructure to handle 500M+ daily transactions"
    ],
    implementation: [
      { phase: "Architecture Design", duration: "3 months", description: "Designed microservices architecture, selected technology stack, established security protocols, and created migration strategy for zero-downtime transition." },
      { phase: "Core Banking System", duration: "6 months", description: "Built transaction processing engine, account management system, payment gateway integration, and real-time settlement capabilities with comprehensive audit trails." },
      { phase: "Security & Fraud Detection", duration: "4 months", description: "Implemented biometric authentication, AI-powered fraud detection, encryption protocols, and multi-factor authentication meeting banking security standards." },
      { phase: "Mobile & Web Apps", duration: "3 months", description: "Developed native mobile apps for iOS/Android and responsive web platform with intuitive UX, accessibility features, and offline capabilities." },
      { phase: "Migration & Launch", duration: "2 months", description: "Executed phased migration of 10M users with zero downtime, conducted extensive testing, trained staff, and established 24/7 monitoring and support." }
    ],
    businessValue: {
      roi: "625% ROI within 2 years",
      costSavings: "$50M annual operational cost reduction",
      revenueImpact: "200% increase in digital banking revenue",
      efficiency: "75% reduction in customer service calls"
    },
    metrics: [
      { label: "Active Users", value: "10M+", icon: "👥" },
      { label: "Uptime", value: "99.99%", icon: "⚡" },
      { label: "Fraud Reduction", value: "85%", icon: "🔒" },
      { label: "Daily Volume", value: "$500M", icon: "💰" }
    ],
    awards: [
      "Best Digital Banking Platform 2026",
      "Fintech Innovation Excellence Award",
      "Security & Trust Award - Banking Tech"
    ]
  },
  {
    title: "E-Learning Platform: Reaching 1 Million Students",
    client: "National Education Board",
    industry: "Education",
    duration: "16 months",
    teamSize: 20,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=600&fit=crop",
    challenge: "During the pandemic, 2000+ schools lacked infrastructure for remote learning. Students from rural areas had no access to quality education, widening the educational gap. Traditional systems couldn't scale.",
    solution: "Built a comprehensive e-learning platform with live classes, interactive content, AI-powered personalized learning paths, offline mode for low-bandwidth areas, and multi-language support. Integrated assessment tools and parent-teacher communication.",
    fullDescription: "When the pandemic struck, the National Education Board faced an unprecedented crisis: 2,000+ schools had no infrastructure for remote learning, potentially leaving 1M+ students without education. We developed a comprehensive e-learning ecosystem that democratized education access. The platform features HD video streaming optimized for low-bandwidth areas, interactive learning modules with gamification, AI-powered personalized learning paths adapting to each student's pace, comprehensive assessment and grading tools, parent-teacher communication portals, and support for 15 regional languages. The offline mode allows students in rural areas to download content and sync progress when connectivity is available.",
    results: [
      "1M+ students enrolled",
      "2000+ schools connected",
      "98% student engagement",
      "30% improvement in test scores",
      "Accessible in 15 languages"
    ],
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "Redis", "CDN"],
    testimonial: "This platform bridged the digital divide and ensured no student was left behind during the pandemic.",
    testimonialAuthor: "Prof. Michael Chen, Education Secretary",
    impact: "The platform enabled uninterrupted education for 1M+ students during lockdowns, with 95% attendance rates and significantly improved learning outcomes across all demographics.",
    featured: false,
    keyObjectives: [
      "Connect 2000+ schools within 6 months",
      "Enroll and serve 1M+ students",
      "Achieve 90%+ engagement rates",
      "Support low-bandwidth rural areas",
      "Improve learning outcomes measurably"
    ],
    challenges_detailed: [
      "Building reliable video streaming for areas with poor internet connectivity",
      "Creating engaging content for diverse age groups and subjects",
      "Training 25K+ teachers on digital teaching methods",
      "Supporting 15 regional languages with localized content",
      "Ensuring security and privacy for minor students"
    ],
    implementation: [
      { phase: "Platform Foundation", duration: "3 months", description: "Built scalable infrastructure with CDN for content delivery, developed adaptive video streaming technology, and created multi-language support framework." },
      { phase: "Content Development", duration: "5 months", description: "Created interactive learning modules for 50+ subjects, developed assessment tools, and produced video content in 15 languages with local educators." },
      { phase: "Live Class System", duration: "4 months", description: "Implemented WebRTC-based live classes, interactive whiteboard, breakout rooms, recording capabilities, and real-time engagement tools." },
      { phase: "Teacher & Student Apps", duration: "2 months", description: "Developed mobile and web apps for teachers and students with offline mode, progress tracking, assignment submission, and parent communication features." },
      { phase: "Rollout & Training", duration: "2 months", description: "Conducted massive training program for 25K teachers, onboarded 1M students, established support helpdesk, and monitored platform performance." }
    ],
    businessValue: {
      roi: "380% social ROI in education continuity",
      costSavings: "$120M saved vs traditional infrastructure",
      revenueImpact: "Enabled continuous education for 1M students",
      efficiency: "95% attendance rate maintained during pandemic"
    },
    metrics: [
      { label: "Students", value: "1M+", icon: "🎓" },
      { label: "Engagement", value: "98%", icon: "📊" },
      { label: "Languages", value: "15", icon: "🌍" },
      { label: "Test Score Gain", value: "+30%", icon: "📈" }
    ],
    awards: [
      "Education Technology Excellence Award 2025",
      "Social Impact Award - Digital Learning",
      "Innovation in Remote Education Award"
    ]
  },
  {
    title: "Smart City Infrastructure: IoT at Urban Scale",
    client: "Metropolitan City Council",
    industry: "Government",
    duration: "20 months",
    teamSize: 32,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
    challenge: "The city faced traffic congestion, waste management inefficiencies, frequent power outages, and poor emergency response times. Manual monitoring of 500+ city services was unsustainable.",
    solution: "Deployed an integrated IoT smart city platform with 10,000+ sensors monitoring traffic, utilities, air quality, waste levels, and emergency services. Real-time analytics dashboard with predictive maintenance and automated alerts. AI-powered traffic optimization.",
    fullDescription: "The Metropolitan City Council sought to transform urban management through technology. Their city of 5M+ residents faced chronic traffic congestion, waste management inefficiencies, frequent utility outages, and slow emergency responses. We deployed a comprehensive smart city ecosystem with 10,000+ IoT sensors across the city monitoring traffic flow, air quality, water supply, electrical grid, waste collection points, street lighting, and emergency services. The central command center features real-time dashboards, predictive analytics for maintenance, automated alert systems, and AI-powered optimization for traffic lights and resource allocation. Citizens can report issues through a mobile app, and emergency services receive instant alerts with optimal routing.",
    results: [
      "50% reduction in traffic congestion",
      "35% energy savings",
      "60% faster emergency response",
      "40% waste management efficiency",
      "10,000+ IoT devices deployed"
    ],
    technologies: ["React", "Python", "IoT", "PostgreSQL", "Kafka", "GIS", "AWS"],
    testimonial: "Our city has become a model for smart urban development. The ROI exceeded projections by 180%.",
    testimonialAuthor: "Mayor Robert Martinez",
    impact: "The smart city implementation saved $75M in operational costs, improved citizen satisfaction by 65%, and positioned the city as a technology leader attracting $2B in investments.",
    featured: true,
    keyObjectives: [
      "Deploy 10,000+ IoT sensors across city",
      "Reduce traffic congestion by 40%+",
      "Improve emergency response times by 50%+",
      "Achieve 30%+ energy savings",
      "Create unified city operations dashboard"
    ],
    challenges_detailed: [
      "Deploying and maintaining 10,000+ IoT devices across city",
      "Integrating diverse systems (traffic, utilities, waste, emergency)",
      "Processing real-time data from multiple sources at scale",
      "Building predictive maintenance for aging infrastructure",
      "Ensuring 24/7 reliability for critical city services"
    ],
    implementation: [
      { phase: "Infrastructure Planning", duration: "4 months", description: "Conducted city-wide assessment, identified sensor placement locations, designed network architecture, and established data governance framework." },
      { phase: "Sensor Deployment", duration: "8 months", description: "Installed 10,000+ IoT sensors for traffic, utilities, air quality, waste, and lighting. Built redundant connectivity networks and established monitoring protocols." },
      { phase: "Platform Development", duration: "5 months", description: "Created central command dashboard, implemented real-time analytics, built predictive maintenance algorithms, and integrated with existing city systems." },
      { phase: "AI & Optimization", duration: "2 months", description: "Developed AI for traffic light optimization, waste collection routing, energy distribution, and emergency response coordination." },
      { phase: "Launch & Training", duration: "1 month", description: "Trained city staff on platform usage, launched citizen mobile app, established 24/7 operations center, and initiated continuous monitoring." }
    ],
    businessValue: {
      roi: "480% ROI over 3 years",
      costSavings: "$75M annual operational savings",
      revenueImpact: "Attracted $2B in smart city investments",
      efficiency: "50% improvement in city services efficiency"
    },
    metrics: [
      { label: "IoT Sensors", value: "10K+", icon: "📡" },
      { label: "Traffic Reduction", value: "50%", icon: "🚦" },
      { label: "Energy Savings", value: "35%", icon: "⚡" },
      { label: "Response Time", value: "-60%", icon: "🚨" }
    ],
    awards: [
      "Smart City Excellence Award 2025",
      "IoT Innovation in Government Award",
      "Urban Technology Leadership Award"
    ]
  },
  {
    title: "Supply Chain Optimization: Real-Time Global Logistics",
    client: "TransGlobal Logistics",
    industry: "Logistics",
    duration: "12 months",
    teamSize: 18,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop",
    challenge: "Managing 5000+ delivery vehicles across 50 countries with poor visibility, route inefficiencies, and high fuel costs. Average delivery delays of 48 hours and 20% of shipments lost or damaged.",
    solution: "Created an intelligent supply chain platform with real-time GPS tracking, AI-powered route optimization, predictive maintenance, automated warehouse management, and blockchain-based shipment verification. Integration with global customs systems.",
    fullDescription: "TransGlobal Logistics faced mounting challenges in managing their global operations spanning 50 countries with 5,000+ vehicles. Poor visibility into shipment status caused customer complaints, inefficient routes resulted in excessive fuel costs, and 20% of shipments were experiencing delays or damage. We built an end-to-end supply chain platform featuring real-time GPS tracking of every vehicle and package, AI-powered route optimization considering traffic, weather, and delivery windows, predictive maintenance alerts to prevent breakdowns, automated warehouse management with robotics integration, and blockchain-based shipment verification for transparency. The platform integrates with global customs systems, payment gateways, and customer notification services.",
    results: [
      "5000+ vehicles tracked 24/7",
      "35% fuel cost reduction",
      "90% on-time delivery rate",
      "50% reduction in damages",
      "$120M annual savings"
    ],
    technologies: ["React", "Java", "Blockchain", "PostgreSQL", "AWS", "ML"],
    testimonial: "This system transformed our operations. We're now the most efficient logistics company in our sector.",
    testimonialAuthor: "Linda Thompson, COO",
    impact: "The platform processes 100K+ shipments daily across 50 countries, reduced carbon footprint by 30%, and increased customer retention from 70% to 95%.",
    featured: false,
    keyObjectives: [
      "Achieve real-time visibility of 5000+ vehicles",
      "Reduce fuel costs by 30%+",
      "Improve on-time delivery to 90%+",
      "Reduce shipment damage by 40%+",
      "Decrease carbon footprint by 25%+"
    ],
    challenges_detailed: [
      "Tracking 5000+ vehicles across 50 countries in real-time",
      "Optimizing routes considering multiple variables (traffic, weather, customs)",
      "Integrating with diverse warehouse management systems",
      "Building blockchain verification for supply chain transparency",
      "Ensuring reliability for time-critical shipments"
    ],
    implementation: [
      { phase: "Discovery & Design", duration: "2 months", description: "Analyzed existing logistics operations, identified bottlenecks, designed system architecture, and selected technology stack including blockchain." },
      { phase: "Tracking & Analytics", duration: "3 months", description: "Implemented real-time GPS tracking, developed analytics dashboard, built route optimization AI, and created predictive maintenance system." },
      { phase: "Warehouse Integration", duration: "3 months", description: "Integrated with warehouse systems, automated inventory management, implemented robotics coordination, and built shipment verification using blockchain." },
      { phase: "Global Rollout", duration: "3 months", description: "Deployed across 50 countries, integrated with customs systems, trained logistics staff, and established 24/7 monitoring center." },
      { phase: "Optimization", duration: "1 month", description: "Fine-tuned AI algorithms based on real data, optimized performance, and implemented continuous improvement processes." }
    ],
    businessValue: {
      roi: "520% ROI within 18 months",
      costSavings: "$120M annual savings (fuel + damages)",
      revenueImpact: "25% increase in customer base",
      efficiency: "35% improvement in fleet utilization"
    },
    metrics: [
      { label: "Daily Shipments", value: "100K+", icon: "📦" },
      { label: "On-Time Rate", value: "90%", icon: "⏱️" },
      { label: "Fuel Savings", value: "35%", icon: "⛽" },
      { label: "Cost Reduction", value: "$120M", icon: "💰" }
    ],
    awards: [
      "Logistics Innovation Award 2025",
      "Supply Chain Excellence Award",
      "Sustainability in Logistics Award"
    ]
  },
  {
    title: "Retail Analytics: Personalization at Scale",
    client: "MegaMart Retail Chain",
    industry: "Retail",
    duration: "10 months",
    teamSize: 15,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    challenge: "Low conversion rates, poor inventory management leading to stockouts and overstocking, and inability to personalize customer experience across 500+ stores. Lost $50M annually in missed opportunities.",
    solution: "Implemented an AI-powered retail analytics platform with real-time customer behavior tracking, predictive inventory management, personalized recommendations, dynamic pricing, and omnichannel integration. Mobile app with AR try-on features.",
    fullDescription: "MegaMart operated 500+ stores but struggled with low conversion rates (2.3%), poor inventory management causing $50M in lost opportunities through stockouts and overstocking, and inability to provide personalized experiences. We developed a comprehensive retail analytics platform using AI and machine learning. The system tracks customer behavior in real-time both online and in-store, provides personalized product recommendations, manages inventory using predictive analytics, implements dynamic pricing based on demand and competition, and offers seamless omnichannel shopping experience. The mobile app features AR try-on capabilities for clothing and furniture, allowing customers to visualize products before purchase.",
    results: [
      "45% increase in conversion rate",
      "60% reduction in stockouts",
      "30% boost in average order value",
      "2M+ app downloads",
      "80M additional revenue"
    ],
    technologies: ["React Native", "Python", "MongoDB", "Elasticsearch", "AWS", "AR"],
    testimonial: "The personalization engine understands our customers better than we do. Sales have skyrocketed.",
    testimonialAuthor: "David Park, VP of Operations",
    impact: "The platform now serves 5M+ customers monthly, increased online sales by 200%, and provided actionable insights that optimized procurement by $30M annually.",
    featured: false,
    keyObjectives: [
      "Increase conversion rate from 2.3% to 3.5%+",
      "Reduce stockouts by 50%+",
      "Boost average order value by 25%+",
      "Launch mobile app with 1M+ downloads",
      "Create unified omnichannel experience"
    ],
    challenges_detailed: [
      "Tracking customer behavior across 500+ physical stores and online",
      "Building AI for accurate demand forecasting and inventory optimization",
      "Creating personalized recommendations for millions of products",
      "Implementing AR try-on features in mobile app",
      "Integrating online and offline data for unified customer view"
    ],
    implementation: [
      { phase: "Analytics Foundation", duration: "2 months", description: "Deployed tracking infrastructure in stores, integrated point-of-sale systems, collected historical data, and built analytics data warehouse." },
      { phase: "AI & Personalization", duration: "3 months", description: "Developed recommendation engine, built predictive inventory models, created dynamic pricing algorithms, and trained AI on customer behavior patterns." },
      { phase: "Mobile App Development", duration: "3 months", description: "Built native iOS/Android apps with AR try-on features, personalized shopping experience, seamless checkout, and loyalty program integration." },
      { phase: "Omnichannel Integration", duration: "1 month", description: "Connected online and offline systems, enabled buy-online-pickup-in-store, implemented unified inventory, and created single customer view." },
      { phase: "Launch & Optimization", duration: "1 month", description: "Launched app with marketing campaign, trained staff on new systems, monitored performance metrics, and optimized AI models based on real data." }
    ],
    businessValue: {
      roi: "580% ROI in first year",
      costSavings: "$50M from inventory optimization",
      revenueImpact: "$80M additional revenue",
      efficiency: "45% improvement in conversion rate"
    },
    metrics: [
      { label: "Conversion Rate", value: "+45%", icon: "📈" },
      { label: "App Users", value: "2M+", icon: "📱" },
      { label: "Revenue Gain", value: "$80M", icon: "💰" },
      { label: "Stockout Reduction", value: "60%", icon: "📦" }
    ],
    awards: [
      "Retail Innovation Award 2025",
      "Best Use of AI in Retail",
      "Customer Experience Excellence Award"
    ]
  }
];

// GET: Fetch all case studies (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let studies = await CaseStudy.find().sort({ _id: -1 });

    if (studies.length === 0) {
      await CaseStudy.insertMany(seedData);
      studies = await CaseStudy.find().sort({ _id: -1 });
    }

    const mapped = studies.map(s => ({
      ...s._doc,
      id: s._id.toString()
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error fetching case studies:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET: Fetch single case study by ID
router.get('/:id', async (req, res) => {
  try {
    const study = await CaseStudy.findById(req.params.id);
    if (!study) return res.status(404).json({ message: "Case study not found" });
    res.json({
      ...study._doc,
      id: study._id.toString()
    });
  } catch (error) {
    console.error("Error fetching case study:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST: Add new case study
router.post('/', auth, async (req, res) => {
  try {
    const study = new CaseStudy(req.body);
    await study.save();
    res.status(201).json(study);
  } catch (error) {
    console.error("Error adding case study:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT: Update case study
router.put('/:id', auth, async (req, res) => {
  try {
    const study = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!study) return res.status(404).json({ message: "Case study not found" });
    res.json(study);
  } catch (error) {
    console.error("Error updating case study:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE: Remove case study
router.delete('/:id', auth, async (req, res) => {
  try {
    const study = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!study) return res.status(404).json({ message: "Case study not found" });
    res.json({ message: "Case study deleted successfully" });
  } catch (error) {
    console.error("Error deleting case study:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
