import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Users, Clock, CheckCircle, Target, TrendingUp } from "lucide-react";

// Ongoing Projects Data (same as in Ongoing.jsx)
const projectsData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the project by ID
  const project = projectsData.find(p => p.id === parseInt(id));

  // If project not found, show error
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects/ongoing")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-primary";
  };

  const getPriorityColor = (priority) => {
    if (priority === "Critical") return "bg-red-100 text-red-700 border-red-300";
    if (priority === "High") return "bg-orange-100 text-orange-700 border-orange-300";
    return "bg-blue-100 text-blue-700 border-blue-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section with Project Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-indigo-900/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/projects/ongoing")}
              className="mb-6 flex items-center gap-2 text-white hover:text-blue-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Projects</span>
            </button>

            {/* Title and Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getPriorityColor(project.priority)}`}>
                {project.priority} Priority
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className="bg-green-500/20 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full text-sm font-semibold">
                {project.status}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
              {project.title}
            </h1>
            
            <p className="text-xl text-blue-200 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {project.client}
            </p>

            {/* Progress Bar */}
            <div className="max-w-md">
              <div className="flex justify-between text-sm font-semibold text-white mb-2">
                <span>Project Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className={`${getProgressColor(project.progress)} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Calendar className="w-10 h-10 text-blue-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Start Date</p>
            <p className="text-xl font-bold text-slate-900">{project.startDate}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Clock className="w-10 h-10 text-primary mb-3" />
            <p className="text-sm text-slate-600 mb-1">Expected Completion</p>
            <p className="text-xl font-bold text-slate-900">{project.expectedCompletion}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Users className="w-10 h-10 text-primary mb-3" />
            <p className="text-sm text-slate-600 mb-1">Team Size</p>
            <p className="text-xl font-bold text-slate-900">{project.teamSize} Members</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <DollarSign className="w-10 h-10 text-green-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Budget</p>
            <p className="text-xl font-bold text-slate-900">{project.budget}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                Project Overview
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Objectives */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                Project Objectives
              </h2>
              <div className="space-y-3">
                {project.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                Key Challenges
              </h2>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Milestones */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                Project Milestones
              </h2>
              <div className="space-y-4">
                {project.milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-8 pb-4 border-l-2 border-slate-300 last:border-l-0 last:pb-0">
                    <div className={`absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                      milestone.status === "Completed" ? "bg-green-500 border-green-500" :
                      milestone.status === "In Progress" ? "bg-blue-500 border-blue-500 animate-pulse" :
                      "bg-white border-slate-300"
                    }`}></div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900">{milestone.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          milestone.status === "Completed" ? "bg-green-100 text-green-700" :
                          milestone.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {milestone.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Interested in Similar Projects?</h3>
              <p className="text-blue-100 mb-6">
                Get in touch with us to discuss how we can help with your project needs.
              </p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
