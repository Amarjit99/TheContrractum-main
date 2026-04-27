const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect: auth } = require('../middleware/auth');

// Seed data based on original static data from OngoingProjects.jsx
const seedData = [
  {
    title: "Smart City GIS Mapping System",
    client: "Government Infrastructure Department",
    category: "Government",
    startDate: "January 2026",
    expectedCompletion: "June 2026",
    status: "In Progress",
    progress: 70,
    teamSize: 12,
    budget: "$450,000",
    technologies: ["React", "Node.js", "PostgreSQL", "GIS", "AWS"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
    description: "Development of an advanced GIS-based smart city monitoring platform to track infrastructure assets, road networks, utilities, and urban planning data in real-time with predictive analytics.",
    keyFeatures: ["Real-time Tracking", "Predictive Analytics", "3D Mapping", "Mobile Access"],
    priority: "High",
    challenges: [
      "Integration with legacy systems",
      "Real-time data synchronization across multiple sources",
      "Scalability to handle city-wide infrastructure data"
    ],
    milestones: [
      { name: "Requirements Analysis", status: "Completed", date: "January 2026" },
      { name: "System Design", status: "Completed", date: "February 2026" },
      { name: "Development Phase 1", status: "In Progress", date: "March 2026" },
      { name: "Testing & QA", status: "Pending", date: "May 2026" },
      { name: "Deployment", status: "Pending", date: "June 2026" }
    ],
    objectives: [
      "Develop comprehensive GIS mapping infrastructure",
      "Implement real-time monitoring dashboards",
      "Create predictive analytics models for city planning",
      "Enable mobile access for field workers"
    ]
  },
  {
    title: "AI-Based Healthcare Analytics Platform",
    client: "MedTech Solutions Inc.",
    category: "Healthcare",
    startDate: "December 2025",
    expectedCompletion: "May 2026",
    status: "In Progress",
    progress: 55,
    teamSize: 8,
    budget: "$320,000",
    technologies: ["Python", "TensorFlow", "React", "MongoDB", "Docker"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    description: "Building a predictive analytics system to assist doctors in early disease detection using AI models and real-time patient data processing with HIPAA compliance.",
    keyFeatures: ["AI Diagnostics", "Patient Dashboard", "Secure Data", "Report Generation"],
    priority: "High",
    challenges: [
      "HIPAA compliance and data security",
      "Training AI models with diverse medical data",
      "Integration with existing hospital systems"
    ],
    milestones: [
      { name: "Data Collection & Preparation", status: "Completed", date: "December 2025" },
      { name: "AI Model Development", status: "In Progress", date: "February 2026" },
      { name: "Dashboard Development", status: "In Progress", date: "March 2026" },
      { name: "Security Audit", status: "Pending", date: "April 2026" },
      { name: "Launch", status: "Pending", date: "May 2026" }
    ],
    objectives: [
      "Develop accurate AI diagnostic models",
      "Create intuitive patient dashboards",
      "Ensure HIPAA compliance throughout",
      "Enable real-time data processing"
    ]
  },
  {
    title: "Enterprise Resource Planning (ERP) System",
    client: "Global Manufacturing Corp.",
    category: "Enterprise",
    startDate: "November 2025",
    expectedCompletion: "April 2026",
    status: "In Progress",
    progress: 80,
    teamSize: 15,
    budget: "$580,000",
    technologies: ["React", "Java", "Oracle", "Spring Boot", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    description: "Designing and implementing a full-scale ERP solution to manage finance, HR, inventory, supply chain, and production operations efficiently across multiple locations.",
    keyFeatures: ["Multi-Module", "Cloud-Based", "Analytics", "Mobile App"],
    priority: "Critical",
    challenges: [
      "Complex integration across multiple departments",
      "Data migration from legacy systems",
      "Multi-location synchronization"
    ],
    milestones: [
      { name: "Requirements Gathering", status: "Completed", date: "November 2025" },
      { name: "Core Module Development", status: "Completed", date: "January 2026" },
      { name: "Integration & Testing", status: "In Progress", date: "March 2026" },
      { name: "User Training", status: "Pending", date: "April 2026" },
      { name: "Go-Live", status: "Pending", date: "April 2026" }
    ],
    objectives: [
      "Unify all business operations in single platform",
      "Enable real-time reporting and analytics",
      "Improve operational efficiency by 40%",
      "Facilitate multi-location management"
    ]
  },
  {
    title: "E-Commerce Marketplace Platform",
    client: "RetailHub Ventures",
    category: "E-Commerce",
    startDate: "January 2026",
    expectedCompletion: "July 2026",
    status: "In Progress",
    progress: 45,
    teamSize: 10,
    budget: "$280,000",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop",
    description: "Creating a scalable multi-vendor e-commerce platform with advanced search, real-time inventory management, and integrated payment processing.",
    keyFeatures: ["Multi-Vendor", "Payment Gateway", "Inventory Sync", "Analytics"],
    priority: "Medium",
    challenges: [
      "Managing multi-vendor operations",
      "Real-time inventory synchronization",
      "High-traffic scalability"
    ],
    milestones: [
      { name: "Platform Architecture", status: "Completed", date: "January 2026" },
      { name: "Vendor Portal Development", status: "In Progress", date: "March 2026" },
      { name: "Payment Integration", status: "In Progress", date: "April 2026" },
      { name: "Load Testing", status: "Pending", date: "June 2026" },
      { name: "Launch", status: "Pending", date: "July 2026" }
    ],
    objectives: [
      "Create seamless multi-vendor marketplace",
      "Implement secure payment processing",
      "Enable real-time inventory management",
      "Support 10,000+ concurrent users"
    ]
  },
  {
    title: "Financial Management & Trading Platform",
    client: "FinTech Innovations Ltd.",
    category: "Finance",
    startDate: "October 2025",
    expectedCompletion: "March 2026",
    status: "In Progress",
    progress: 65,
    teamSize: 9,
    budget: "$410,000",
    technologies: ["React", "Python", "PostgreSQL", "WebSocket", "AWS"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
    description: "Building a comprehensive financial management system with real-time trading capabilities, portfolio management, and risk assessment tools.",
    keyFeatures: ["Real-Time Trading", "Portfolio Analytics", "Risk Management", "Compliance"],
    priority: "High",
    challenges: [
      "Real-time data processing at scale",
      "Financial compliance and regulations",
      "High-frequency trading requirements"
    ],
    milestones: [
      { name: "System Design", status: "Completed", date: "October 2025" },
      { name: "Trading Engine Development", status: "Completed", date: "December 2025" },
      { name: "Portfolio Management Module", status: "In Progress", date: "February 2026" },
      { name: "Compliance Testing", status: "Pending", date: "March 2026" },
      { name: "Launch", status: "Pending", date: "March 2026" }
    ],
    objectives: [
      "Enable real-time trading capabilities",
      "Provide comprehensive portfolio analytics",
      "Implement advanced risk management",
      "Ensure regulatory compliance"
    ]
  },
  {
    title: "Online Education & Learning Management System",
    client: "EduTech Global",
    category: "Education",
    startDate: "December 2025",
    expectedCompletion: "June 2026",
    status: "In Progress",
    progress: 50,
    teamSize: 7,
    budget: "$195,000",
    technologies: ["React", "Node.js", "MySQL", "WebRTC", "S3"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    description: "Developing a feature-rich LMS with live classes, interactive content, assessments, progress tracking, and certification management.",
    keyFeatures: ["Live Classes", "Interactive Content", "Progress Tracking", "Certifications"],
    priority: "Medium",
    challenges: [
      "Reliable video streaming for live classes",
      "Interactive content engagement",
      "Scalable assessment system"
    ],
    milestones: [
      { name: "Platform Setup", status: "Completed", date: "December 2025" },
      { name: "Live Class Integration", status: "In Progress", date: "February 2026" },
      { name: "Content Management", status: "In Progress", date: "March 2026" },
      { name: "Assessment System", status: "Pending", date: "May 2026" },
      { name: "Launch", status: "Pending", date: "June 2026" }
    ],
    objectives: [
      "Create engaging online learning experience",
      "Enable live interactive classes",
      "Implement comprehensive assessment system",
      "Provide certification management"
    ]
  }
];

// GET: Fetch all projects with auto-seed capability
router.get('/', async (req, res) => {
  try {
    let projects = await Project.find();
    
    // Auto-seed if db completely empty
    if (projects.length === 0) {
      await Project.insertMany(seedData);
      projects = await Project.find();
    }
    
    // Convert _id to id for seamless frontend integration with existing map code
    const mapped = projects.map(p => ({
        ...p._doc,
        id: p._id.toString()
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET: Fetch a single project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({
        ...project._doc,
        id: project._id.toString()
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST: Add new project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT: Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE: Remove project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
