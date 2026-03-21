import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Ongoing Projects Data
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
    priority: "High"
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
    priority: "High"
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
    priority: "Critical"
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
    priority: "Medium"
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
    priority: "High"
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
    priority: "Medium"
  }
];

export default function OngoingProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [sortBy, setSortBy] = useState("progress");
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = ["All", "Government", "Healthcare", "Enterprise", "E-Commerce", "Finance", "Education"];
  const priorities = ["All", "Critical", "High", "Medium"];

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort projects
  const filteredProjects = projectsData
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesPriority = selectedPriority === "All" || project.priority === selectedPriority;
      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "date") return new Date(b.startDate) - new Date(a.startDate);
      if (sortBy === "budget") return parseFloat(b.budget.replace(/[$,]/g, '')) - parseFloat(a.budget.replace(/[$,]/g, ''));
      return 0;
    });

  // Calculate statistics
  const totalProjects = projectsData.length;
  const avgProgress = Math.round(projectsData.reduce((sum, p) => sum + p.progress, 0) / totalProjects);
  const totalTeamMembers = projectsData.reduce((sum, p) => sum + p.teamSize, 0);
  const criticalProjects = projectsData.filter(p => p.priority === "Critical").length;

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-primary";
  };

  const getPriorityColor = (priority) => {
    if (priority === "Critical") return "bg-red-100 text-primary-dark border-red-300";
    if (priority === "High") return "bg-orange-100 text-orange-700 border-orange-300";
    return "bg-blue-100 text-blue-700 border-blue-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Hero Header */}
      <div className="relative text-white py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop&q=80" 
            alt="Ongoing Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-blue-900/60 to-indigo-900/70"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-blue-200 text-sm font-semibold tracking-wide uppercase">In Development</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Ongoing Projects
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Track our active projects delivering cutting-edge solutions across industries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalProjects}</p>
            <p className="text-sm text-slate-600 mt-1">Active Projects</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{avgProgress}%</p>
            <p className="text-sm text-slate-600 mt-1">Avg Progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalTeamMembers}</p>
            <p className="text-sm text-slate-600 mt-1">Team Members</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{criticalProjects}</p>
            <p className="text-sm text-slate-600 mt-1">Critical Priority</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Projects
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, client, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 font-medium"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 font-medium"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort and Results */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">Sort by:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("progress")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    sortBy === "progress" ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Progress
                </button>
                <button
                  onClick={() => setSortBy("date")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    sortBy === "date" ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Date
                </button>
                <button
                  onClick={() => setSortBy("budget")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    sortBy === "budget" ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Budget
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Showing <span className="font-bold text-slate-900">{filteredProjects.length}</span> of <span className="font-bold text-slate-900">{totalProjects}</span> projects
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Priority Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
                    {project.priority} Priority
                  </span>

                  {/* Category */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>

                  {/* Progress Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`${getProgressColor(project.progress)} h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-blue-600 font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {project.client}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4 grow">
                    {project.description.substring(0, 120)}...
                  </p>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500">Start Date</p>
                      <p className="text-sm font-semibold text-slate-800">{project.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Completion</p>
                      <p className="text-sm font-semibold text-slate-800">{project.expectedCompletion}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Team Size</p>
                      <p className="text-sm font-semibold text-slate-800">{project.teamSize} Members</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Budget</p>
                      <p className="text-sm font-semibold text-slate-800">{project.budget}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2 font-semibold">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>View Case Study</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No projects found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

    </div>
  );
}
