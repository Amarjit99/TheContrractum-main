import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Completed Projects Data
const completedProjectsData = [
  {
    id: 1,
    title: "National Healthcare Management System",
    client: "Ministry of Health",
    category: "Healthcare",
    completedDate: "December 2025",
    duration: "12 months",
    teamSize: 18,
    budget: "$850,000",
    rating: 5,
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Redis"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    description: "Successfully delivered a comprehensive healthcare management system serving 500+ hospitals nationwide with patient records, appointment scheduling, and emergency response integration.",
    achievements: ["500+ Hospitals", "2M+ Patients", "99.9% Uptime", "Zero Data Loss"],
    impact: "Reduced patient wait times by 60% and improved healthcare accessibility across the nation."
  },
  {
    id: 2,
    title: "Smart Banking Mobile Application",
    client: "Global Bank Corp.",
    category: "Finance",
    completedDate: "January 2026",
    duration: "10 months",
    teamSize: 14,
    budget: "$620,000",
    rating: 5,
    technologies: ["React Native", "Java", "Oracle", "Microservices", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    description: "Delivered a feature-rich mobile banking application with biometric authentication, real-time transactions, and AI-powered financial insights for 5 million users.",
    achievements: ["5M+ Users", "50K Daily Transactions", "4.8★ App Rating", "Bank-Grade Security"],
    impact: "Increased digital banking adoption by 85% and reduced operational costs by 40%."
  },
  {
    id: 3,
    title: "E-Commerce Platform for Retail Chain",
    client: "MegaMart Retail",
    category: "E-Commerce",
    completedDate: "November 2025",
    duration: "8 months",
    teamSize: 12,
    budget: "$450,000",
    rating: 4,
    technologies: ["React", "Node.js", "MongoDB", "Elasticsearch", "AWS"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop",
    description: "Built a scalable e-commerce platform handling 100K+ products with advanced search, personalized recommendations, and integrated payment processing.",
    achievements: ["100K+ Products", "250K Orders/Month", "15M Page Views", "35% Conversion Rate"],
    impact: "Generated $12M in online revenue within first 3 months of launch."
  },
  {
    id: 4,
    title: "Educational Management System",
    client: "State Education Board",
    category: "Education",
    completedDate: "October 2025",
    duration: "14 months",
    teamSize: 16,
    budget: "$720,000",
    rating: 5,
    technologies: ["React", "Python", "MySQL", "WebRTC", "Docker"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    description: "Developed comprehensive education management system serving 2000+ schools with online classes, assessments, attendance tracking, and parent-teacher communication.",
    achievements: ["2000+ Schools", "500K Students", "25K Teachers", "98% Satisfaction"],
    impact: "Enabled seamless digital education during pandemic, maintaining 95% student engagement."
  },
  {
    id: 5,
    title: "Supply Chain Logistics Platform",
    client: "TransLog International",
    category: "Logistics",
    completedDate: "September 2025",
    duration: "11 months",
    teamSize: 13,
    budget: "$580,000",
    rating: 5,
    technologies: ["React", "Java", "PostgreSQL", "Kafka", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    description: "Created an intelligent supply chain platform with real-time tracking, route optimization, and predictive analytics for 1000+ delivery vehicles.",
    achievements: ["1000+ Vehicles", "50K Deliveries/Day", "30% Cost Reduction", "Real-time Tracking"],
    impact: "Optimized delivery routes saving $2M annually in fuel and operational costs."
  },
  {
    id: 6,
    title: "Smart City Infrastructure Dashboard",
    client: "City Municipal Corporation",
    category: "Government",
    completedDate: "August 2025",
    duration: "15 months",
    teamSize: 20,
    budget: "$950,000",
    rating: 5,
    technologies: ["React", "Python", "PostgreSQL", "IoT", "GIS", "AWS"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
    description: "Implemented smart city dashboard monitoring traffic, utilities, waste management, and emergency services across the metropolitan area.",
    achievements: ["500+ IoT Sensors", "24/7 Monitoring", "40% Response Time", "Smart Integration"],
    impact: "Improved city services efficiency by 55% and enhanced citizen satisfaction scores."
  },
  {
    id: 7,
    title: "Corporate HR Management Suite",
    client: "MegaCorp Enterprises",
    category: "Enterprise",
    completedDate: "July 2025",
    duration: "9 months",
    teamSize: 11,
    budget: "$420,000",
    rating: 4,
    technologies: ["React", "Node.js", "MongoDB", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop",
    description: "Delivered complete HR management solution with recruitment, payroll, performance management, and employee self-service portal for 10,000+ employees.",
    achievements: ["10K+ Employees", "Automated Payroll", "50% Time Saved", "Cloud-Based"],
    impact: "Reduced HR administrative workload by 65% and improved employee satisfaction."
  },
  {
    id: 8,
    title: "Telemedicine Consultation Platform",
    client: "HealthConnect Inc.",
    category: "Healthcare",
    completedDate: "June 2025",
    duration: "7 months",
    teamSize: 10,
    budget: "$380,000",
    rating: 5,
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    description: "Built secure telemedicine platform enabling video consultations, e-prescriptions, and digital health records for 200+ doctors and 50K+ patients.",
    achievements: ["200+ Doctors", "50K Patients", "15K Consultations", "HIPAA Compliant"],
    impact: "Provided healthcare access to rural areas, serving 30K+ patients remotely."
  }
];

export default function Completed() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = ["All", "Healthcare", "Finance", "E-Commerce", "Education", "Logistics", "Government", "Enterprise"];
  const ratings = ["All", "5 Stars", "4 Stars"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort projects
  const filteredProjects = completedProjectsData
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesRating = selectedRating === "All" || 
                           (selectedRating === "5 Stars" && project.rating === 5) ||
                           (selectedRating === "4 Stars" && project.rating === 4);
      return matchesSearch && matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.completedDate) - new Date(a.completedDate);
      if (sortBy === "budget") return parseFloat(b.budget.replace(/[$,]/g, '')) - parseFloat(a.budget.replace(/[$,]/g, ''));
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  // Calculate statistics
  const totalProjects = completedProjectsData.length;
  const avgRating = (completedProjectsData.reduce((sum, p) => sum + p.rating, 0) / totalProjects).toFixed(1);
  const totalBudget = completedProjectsData.reduce((sum, p) => sum + parseFloat(p.budget.replace(/[$,]/g, '')), 0);
  const fiveStarProjects = completedProjectsData.filter(p => p.rating === 5).length;

  const getRatingStars = (rating) => {
    return "⭐".repeat(rating);
  };

  const getRatingColor = (rating) => {
    if (rating === 5) return "bg-green-100 text-green-700 border-green-300";
    if (rating === 4) return "bg-blue-100 text-blue-700 border-blue-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=600&fit=crop&q=80" 
            alt="Completed Projects"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-emerald-900/60 to-primary-light/70"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-green-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Successfully Delivered
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Completed Projects
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Celebrating our successful deliveries and client satisfaction across diverse industries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalProjects}</p>
            <p className="text-sm text-slate-600 mt-1">Completed Projects</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{avgRating}</p>
            <p className="text-sm text-slate-600 mt-1">Average Rating</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">${(totalBudget / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-slate-600 mt-1">Total Value</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{fiveStarProjects}</p>
            <p className="text-sm text-slate-600 mt-1">5-Star Projects</p>
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
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-slate-50 font-medium"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-slate-50 font-medium"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
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
                  onClick={() => setSortBy("date")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    sortBy === "date" ? "bg-green-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Date
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    sortBy === "rating" ? "bg-green-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Rating
                </button>
                <button
                  onClick={() => setSortBy("budget")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    sortBy === "budget" ? "bg-green-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Value
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
                  
                  {/* Success Badge */}
                  <span className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Completed
                  </span>

                  {/* Category */}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-lg px-3 py-2 border ${getRatingColor(project.rating)}`}>
                      <span className="text-sm font-bold">{getRatingStars(project.rating)}</span>
                      <span className="text-xs font-semibold">{project.rating}/5</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-primary font-semibold mb-3 flex items-center gap-2">
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
                      <p className="text-xs text-slate-500">Completed</p>
                      <p className="text-sm font-semibold text-slate-800">{project.completedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-sm font-semibold text-slate-800">{project.duration}</p>
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

                  {/* Achievements */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2 font-semibold">Key Achievements:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {project.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-slate-700 font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate(`/projects/completed/${project.id}`)}
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

        {/* Success Metrics Section */}
        <div className="mt-16 bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Proven Track Record of Excellence
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Our completed projects demonstrate our commitment to quality, innovation, and client satisfaction. We deliver solutions that create lasting impact.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-gray-100 text-sm">On-Time Delivery</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">98%</p>
                <p className="text-gray-100 text-sm">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">50M+</p>
                <p className="text-gray-100 text-sm">Users Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-gray-100 text-sm">Support Provided</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 z-50 hover:scale-110"
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
