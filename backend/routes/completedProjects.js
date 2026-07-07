const express = require('express');
const router = express.Router();
const CompletedProject = require('../models/CompletedProject');
const { protect: auth } = require('../middleware/auth');

const seedData = [
  {
    title: "National Healthcare Management System",
    client: "Ministry of Health",
    category: "Healthcare",
    completedDate: "31-12-25",
    duration: "12 months",
    teamSize: 18,
    budget: "850,000",
    rating: 5,
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Redis"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    description: "Successfully delivered a comprehensive healthcare management system serving 500+ hospitals nationwide with patient records, appointment scheduling, and emergency response integration.",
    fullDescription: "The National Healthcare Management System is a revolutionary platform that digitizes and streamlines healthcare operations across the entire nation. This comprehensive solution integrates with 500+ hospitals, managing over 2 million patient records with real-time appointment scheduling, emergency response coordination, and complete medical history tracking. The system features advanced security protocols, HIPAA compliance, and seamless interoperability between different healthcare providers.",
    achievements: ["500+ Hospitals", "2M+ Patients", "99.9% Uptime", "Zero Data Loss"],
    impact: "Reduced patient wait times by 60% and improved healthcare accessibility across the nation.",
    challenges: [
      "Integrating legacy hospital systems from 500+ different facilities",
      "Ensuring HIPAA compliance and data security for millions of patient records",
      "Building a scalable architecture to handle peak loads during emergencies",
      "Training medical staff across multiple hospitals simultaneously"
    ],
    results: [
      "60% reduction in patient wait times",
      "99.9% system uptime achieved",
      "Zero data breaches or security incidents",
      "2M+ patients successfully onboarded",
      "40% improvement in emergency response times"
    ],
    clientTestimonial: {
      quote: "This system has transformed how we deliver healthcare services nationwide. The reduction in wait times and improved coordination between hospitals has saved countless lives.",
      author: "Dr. Sarah Johnson",
      position: "Director of Digital Health, Ministry of Health"
    },
    roi: "300% ROI within first year through operational efficiency and cost reduction",
    keyMetrics: [
      { label: "Daily Transactions", value: "500K+", icon: "📊" },
      { label: "Response Time", value: "<200ms", icon: "⚡" },
      { label: "User Satisfaction", value: "98%", icon: "😊" },
      { label: "Cost Savings", value: "$12M/year", icon: "💰" }
    ]
  },
  {
    title: "Smart Banking Mobile Application",
    client: "Global Bank Corp.",
    category: "Finance",
    completedDate: "31-01-26",
    duration: "10 months",
    teamSize: 14,
    budget: "620,000",
    rating: 5,
    technologies: ["React Native", "Java", "Oracle", "Microservices", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    description: "Delivered a feature-rich mobile banking application with biometric authentication, real-time transactions, and AI-powered financial insights for 5 million users.",
    fullDescription: "The Smart Banking Mobile Application revolutionizes digital banking with cutting-edge features including biometric authentication, real-time transaction processing, AI-powered financial insights, and personalized banking recommendations. The app supports 50,000+ daily transactions, offers instant loan approvals, investment tracking, and bill payment automation. Built with bank-grade security featuring multi-factor authentication, end-to-end encryption, and fraud detection algorithms.",
    achievements: ["5M+ Users", "50K Daily Transactions", "4.8★ App Rating", "Bank-Grade Security"],
    impact: "Increased digital banking adoption by 85% and reduced operational costs by 40%.",
    challenges: [
      "Implementing bank-grade security for mobile platform",
      "Handling 50,000+ concurrent transactions during peak hours",
      "Integrating with legacy banking systems",
      "Meeting strict regulatory compliance requirements"
    ],
    results: [
      "5M+ active users within 6 months",
      "85% increase in digital banking adoption",
      "40% reduction in operational costs",
      "4.8/5 app store rating with 200K+ reviews",
      "Zero security breaches in production"
    ],
    clientTestimonial: {
      quote: "This app has exceeded our expectations. The user experience is outstanding, and the security features give us complete peace of mind. Our customer satisfaction scores have skyrocketed.",
      author: "Michael Chen",
      position: "CTO, Global Bank Corp."
    },
    roi: "425% ROI through cost savings and increased customer engagement",
    keyMetrics: [
      { label: "Active Users", value: "5M+", icon: "👥" },
      { label: "Daily Transactions", value: "50K", icon: "💳" },
      { label: "App Rating", value: "4.8/5", icon: "⭐" },
      { label: "Security Score", value: "A+", icon: "🔒" }
    ]
  },
  {
    title: "E-Commerce Platform for Retail Chain",
    client: "MegaMart Retail",
    category: "E-Commerce",
    completedDate: "30-11-25",
    duration: "8 months",
    teamSize: 12,
    budget: "450,000",
    rating: 4,
    technologies: ["React", "Node.js", "MongoDB", "Elasticsearch", "AWS"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop",
    description: "Built a scalable e-commerce platform handling 100K+ products with advanced search, personalized recommendations, and integrated payment processing.",
    fullDescription: "A comprehensive e-commerce solution featuring 100,000+ products, intelligent search powered by Elasticsearch, AI-driven personalized recommendations, real-time inventory management, and seamless checkout experience. The platform handles 15 million page views monthly with advanced analytics, customer behavior tracking, and automated marketing campaigns. Integrated with multiple payment gateways, shipping providers, and warehouse management systems.",
    achievements: ["100K+ Products", "250K Orders/Month", "15M Page Views", "35% Conversion Rate"],
    impact: "Generated $12M in online revenue within first 3 months of launch.",
    challenges: [
      "Migrating 100K+ products from legacy system",
      "Building high-performance search across massive catalog",
      "Handling Black Friday traffic spikes (10x normal load)",
      "Integrating with multiple payment and shipping providers"
    ],
    results: [
      "$12M revenue in first 3 months",
      "35% conversion rate (industry avg: 2-3%)",
      "250K orders processed monthly",
      "99.95% uptime during peak shopping seasons",
      "70% reduction in cart abandonment rate"
    ],
    clientTestimonial: {
      quote: "The platform transformation has been incredible. Our online sales have exceeded all projections, and customer feedback has been overwhelmingly positive. This investment paid for itself in just 3 months.",
      author: "Jennifer Martinez",
      position: "VP of E-Commerce, MegaMart Retail"
    },
    roi: "550% ROI in first year through increased online sales",
    keyMetrics: [
      { label: "Monthly Orders", value: "250K", icon: "📦" },
      { label: "Conversion Rate", value: "35%", icon: "📈" },
      { label: "Page Load Time", value: "1.2s", icon: "⚡" },
      { label: "Customer Rating", value: "4.7/5", icon: "⭐" }
    ]
  },
  {
    title: "Educational Management System",
    client: "State Education Board",
    category: "Education",
    completedDate: "31-10-25",
    duration: "14 months",
    teamSize: 16,
    budget: "720,000",
    rating: 5,
    technologies: ["React", "Python", "MySQL", "WebRTC", "Docker"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    description: "Developed comprehensive education management system serving 2000+ schools with online classes, assessments, attendance tracking, and parent-teacher communication.",
    fullDescription: "A complete digital education ecosystem serving 2,000+ schools, 500,000 students, and 25,000 teachers. Features include live online classes with HD video streaming, interactive assessments, automated attendance tracking, gradebook management, parent-teacher communication, assignment submission, and progress analytics. The system revolutionized education delivery during the pandemic, ensuring continuity of learning with 95% student engagement rates.",
    achievements: ["2000+ Schools", "500K Students", "25K Teachers", "98% Satisfaction"],
    impact: "Enabled seamless digital education during pandemic, maintaining 95% student engagement.",
    challenges: [
      "Building reliable video streaming for 10,000+ concurrent users",
      "Ensuring accessibility in low-bandwidth areas",
      "Training 25,000+ teachers on new platform",
      "Creating engaging interactive content for different age groups"
    ],
    results: [
      "95% student engagement rate maintained",
      "98% satisfaction score from teachers and parents",
      "Zero learning disruption during pandemic",
      "40% improvement in student performance tracking",
      "80% reduction in administrative workload"
    ],
    clientTestimonial: {
      quote: "This platform saved our education system during the most challenging times. The ease of use and reliability made it possible for us to continue serving our students without interruption.",
      author: "Dr. Robert Williams",
      position: "Commissioner, State Education Board"
    },
    roi: "280% ROI through cost savings and improved learning outcomes",
    keyMetrics: [
      { label: "Students Served", value: "500K", icon: "🎓" },
      { label: "Live Classes/Day", value: "5000+", icon: "📹" },
      { label: "Engagement Rate", value: "95%", icon: "💯" },
      { label: "Satisfaction", value: "98%", icon: "😊" }
    ]
  },
  {
    title: "Supply Chain Logistics Platform",
    client: "TransLog International",
    category: "Logistics",
    completedDate: "30-09-25",
    duration: "11 months",
    teamSize: 13,
    budget: "580,000",
    rating: 5,
    technologies: ["React", "Java", "PostgreSQL", "Kafka", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    description: "Created an intelligent supply chain platform with real-time tracking, route optimization, and predictive analytics for 1000+ delivery vehicles.",
    fullDescription: "An advanced supply chain logistics platform featuring GPS-based real-time tracking of 1,000+ vehicles, AI-powered route optimization, predictive maintenance alerts, automated dispatch, and comprehensive analytics dashboard. The system processes 50,000+ deliveries daily, reduces fuel consumption through intelligent routing, and provides complete visibility into the supply chain from warehouse to customer doorstep.",
    achievements: ["1000+ Vehicles", "50K Deliveries/Day", "30% Cost Reduction", "Real-time Tracking"],
    impact: "Optimized delivery routes saving $2M annually in fuel and operational costs.",
    challenges: [
      "Integrating GPS tracking across diverse vehicle types",
      "Building real-time route optimization for 1000+ vehicles",
      "Handling high-volume data from multiple sources",
      "Ensuring system reliability for time-critical deliveries"
    ],
    results: [
      "$2M annual savings in fuel costs",
      "30% reduction in delivery times",
      "95% on-time delivery rate achieved",
      "40% improvement in fleet utilization",
      "50,000+ successful deliveries daily"
    ],
    clientTestimonial: {
      quote: "The platform has transformed our logistics operations. The route optimization alone saves us millions per year, and our customers love the real-time tracking feature.",
      author: "David Thompson",
      position: "COO, TransLog International"
    },
    roi: "380% ROI through operational efficiency and cost reduction",
    keyMetrics: [
      { label: "Daily Deliveries", value: "50K+", icon: "🚚" },
      { label: "On-Time Rate", value: "95%", icon: "⏱️" },
      { label: "Cost Savings", value: "$2M/yr", icon: "💰" },
      { label: "Fleet Utilization", value: "+40%", icon: "📊" }
    ]
  },
  {
    title: "Smart City Infrastructure Dashboard",
    client: "City Municipal Corporation",
    category: "Government",
    completedDate: "31-08-25",
    duration: "15 months",
    teamSize: 20,
    budget: "950,000",
    rating: 5,
    technologies: ["React", "Python", "PostgreSQL", "IoT", "GIS", "AWS"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
    description: "Implemented smart city dashboard monitoring traffic, utilities, waste management, and emergency services across the metropolitan area.",
    fullDescription: "A comprehensive smart city platform integrating 500+ IoT sensors monitoring traffic flow, air quality, water supply, waste management, street lighting, and emergency services. Features real-time dashboards, predictive analytics, automated alerts, citizen reporting portal, and integrated emergency response system. The platform provides city administrators with complete visibility and control over municipal operations.",
    achievements: ["500+ IoT Sensors", "24/7 Monitoring", "40% Response Time", "Smart Integration"],
    impact: "Improved city services efficiency by 55% and enhanced citizen satisfaction scores.",
    challenges: [
      "Integrating diverse IoT sensors and legacy systems",
      "Building reliable 24/7 monitoring infrastructure",
      "Processing massive real-time data streams",
      "Coordinating multiple city departments"
    ],
    results: [
      "55% improvement in service efficiency",
      "40% faster emergency response times",
      "30% reduction in energy consumption",
      "85% citizen satisfaction score",
      "24/7 continuous monitoring achieved"
    ],
    clientTestimonial: {
      quote: "This smart city platform has revolutionized how we manage our city. We can now respond to issues proactively and make data-driven decisions that benefit our citizens.",
      author: "Mayor Patricia Anderson",
      position: "Mayor, City Municipal Corporation"
    },
    roi: "320% ROI through operational savings and improved services",
    keyMetrics: [
      { label: "IoT Sensors", value: "500+", icon: "📡" },
      { label: "Uptime", value: "99.9%", icon: "🔧" },
      { label: "Response Time", value: "-40%", icon: "⚡" },
      { label: "Satisfaction", value: "85%", icon: "😊" }
    ]
  },
  {
    title: "Corporate HR Management Suite",
    client: "MegaCorp Enterprises",
    category: "Enterprise",
    completedDate: "31-07-25",
    duration: "9 months",
    teamSize: 11,
    budget: "420,000",
    rating: 4,
    technologies: ["React", "Node.js", "MongoDB", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop",
    description: "Delivered complete HR management solution with recruitment, payroll, performance management, and employee self-service portal for 10,000+ employees.",
    fullDescription: "A comprehensive HR management suite serving 10,000+ employees with modules for recruitment, onboarding, payroll processing, performance management, leave management, benefits administration, and employee self-service portal. Features automated workflows, AI-powered candidate matching, integrated payroll processing, and advanced analytics for workforce planning and talent management.",
    achievements: ["10K+ Employees", "Automated Payroll", "50% Time Saved", "Cloud-Based"],
    impact: "Reduced HR administrative workload by 65% and improved employee satisfaction.",
    challenges: [
      "Migrating data for 10,000+ employees",
      "Automating complex payroll calculations",
      "Ensuring data privacy and compliance",
      "Training HR staff and employees on new system"
    ],
    results: [
      "65% reduction in HR administrative time",
      "50% faster recruitment process",
      "99.9% payroll accuracy achieved",
      "80% employee self-service adoption",
      "40% improvement in performance review completion"
    ],
    clientTestimonial: {
      quote: "This HR suite has streamlined our entire people management process. The time saved on administrative tasks allows our HR team to focus on strategic initiatives.",
      author: "Lisa Brown",
      position: "CHRO, MegaCorp Enterprises"
    },
    roi: "340% ROI through productivity gains and cost savings",
    keyMetrics: [
      { label: "Employees", value: "10K+", icon: "👥" },
      { label: "Time Saved", value: "65%", icon: "⏱️" },
      { label: "Accuracy", value: "99.9%", icon: "✅" },
      { label: "Adoption", value: "80%", icon: "📈" }
    ]
  },
  {
    title: "Telemedicine Consultation Platform",
    client: "HealthConnect Inc.",
    category: "Healthcare",
    completedDate: "30-06-25",
    duration: "7 months",
    teamSize: 10,
    budget: "380,000",
    rating: 5,
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    description: "Built secure telemedicine platform enabling video consultations, e-prescriptions, and digital health records for 200+ doctors and 50K+ patients.",
    fullDescription: "A HIPAA-compliant telemedicine platform enabling secure video consultations, e-prescriptions, digital health records, appointment scheduling, and patient monitoring. The platform connects 200+ doctors with 50,000+ patients, supports multi-specialty consultations, integrated payment processing, and provides complete medical history tracking. Features HD video calls, secure messaging, and automated follow-up reminders.",
    achievements: ["200+ Doctors", "50K Patients", "15K Consultations", "HIPAA Compliant"],
    impact: "Provided healthcare access to rural areas, serving 30K+ patients remotely.",
    challenges: [
      "Ensuring HIPAA compliance for video consultations",
      "Building reliable video streaming for healthcare",
      "Integrating with pharmacy systems for e-prescriptions",
      "Securing sensitive medical information"
    ],
    results: [
      "30K+ rural patients served",
      "15,000 consultations completed",
      "95% patient satisfaction rate",
      "60% reduction in wait times",
      "Zero security incidents or HIPAA violations"
    ],
    clientTestimonial: {
      quote: "This platform has democratized healthcare access. Patients in remote areas can now consult with specialists without traveling hundreds of miles. It's truly life-changing.",
      author: "Dr. Emily Rodriguez",
      position: "Medical Director, HealthConnect Inc."
    },
    roi: "290% ROI through increased patient reach and operational efficiency",
    keyMetrics: [
      { label: "Consultations", value: "15K", icon: "👨‍⚕️" },
      { label: "Patients Served", value: "50K+", icon: "🏥" },
      { label: "Satisfaction", value: "95%", icon: "⭐" },
      { label: "Compliance", value: "100%", icon: "🔒" }
    ]
  }
];

// GET: Fetch all completed projects with auto-seed capability
router.get('/', async (req, res) => {
  try {
    let projects = await CompletedProject.find().sort({ _id: -1 });

    // Auto-seed or Reseed if data lacks fullDescription
    if (projects.length === 0 || !projects[0].fullDescription) {
      await CompletedProject.deleteMany({});
      await CompletedProject.insertMany(seedData);
      projects = await CompletedProject.find().sort({ _id: -1 });
    }

    const mapped = projects.map(p => ({
      ...p._doc,
      id: p._id.toString()
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error fetching completed projects:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET: Fetch a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await CompletedProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({
      ...project._doc,
      id: project._id.toString()
    });
  } catch (error) {
    console.error("Error fetching completed project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST: Add new completed project
router.post('/', auth, async (req, res) => {
  try {
    const project = new CompletedProject(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error adding completed project:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT: Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await CompletedProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Error updating completed project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE: Remove project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await CompletedProject.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Completed Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting completed project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
