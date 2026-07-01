import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Research & Innovation Data
export default function Research() {
  const navigate = useNavigate();
  const [researchData, setResearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/research`);
        if (res.ok) {
          const data = await res.json();
          setResearchData(data);
        }
      } catch (err) {
        console.error("Error fetching research:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

  const categories = [
    "All", 
    "Artificial Intelligence", 
    "Blockchain", 
    "Cybersecurity", 
    "IoT & Edge Computing", 
    "Robotics & AI",
    "Cloud Computing",
    "Natural Language Processing",
    "AR/VR & Healthcare"
  ];
  const statuses = ["All", "Published", "Ongoing", "Patent Pending"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter research projects
  const filteredResearch = researchData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.team || []).some(member => member.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const featuredResearch = filteredResearch.filter(project => project.featured);
  const regularResearch = filteredResearch.filter(project => !project.featured);

  // Calculate statistics
  const totalFunding = researchData.reduce((sum, project) => {
    const amount = parseFloat((project.fundingAmount || "").replace(/[$M]/g, '')) || 0;
    return sum + amount;
  }, 0);

  const totalPublications = researchData.filter(p => p.status === "Published").length;
  const totalPatents = researchData.reduce((sum, p) => sum + (p.patents || []).length, 0);
  const ongoingProjects = researchData.filter(p => p.status === "Ongoing").length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=600&fit=crop&q=80" 
            alt="Research & Innovation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 via-blue-900/70 to-indigo-900/80"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-cyan-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Innovation & Discovery
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Research & Innovation
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Pioneering breakthrough technologies and pushing the boundaries of what's possible in science and engineering
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPublications}</p>
            <p className="text-sm text-slate-600 mt-1">Published Papers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPatents}</p>
            <p className="text-sm text-slate-600 mt-1">Patents Granted/Pending</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{ongoingProjects}</p>
            <p className="text-sm text-slate-600 mt-1">Active Projects</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalFunding.toFixed(1)}M</p>
            <p className="text-sm text-slate-600 mt-1">Research Funding</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Research Projects
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, or researcher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-slate-50 font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-slate-50 font-medium"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredResearch.length}</span> of <span className="font-bold text-slate-900">{researchData.length}</span> research projects
          </div>
        </div>

        {/* Featured Research */}
        {featuredResearch.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-cyan-600 to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Research</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredResearch.map((project) => (
                <div
                  key={project.id || project._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div onClick={() => navigate(`/projects/research/${project.id || project._id}`)} className="relative h-64 overflow-hidden cursor-pointer">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.status === 'Published' ? 'bg-green-100 text-green-700 border border-green-300' :
                        project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                      <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold border border-cyan-300">
                        Featured
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-semibold">Funding: {project.fundingAmount}</span>
                    </div>

                    <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-2">Key Findings:</p>
                      <div className="space-y-1">
                        {(project.keyFindings || []).slice(0, 3).map((finding, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs">
                            <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-slate-600">{finding}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies || []).slice(0, 4).map((tech, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-xs text-slate-600 mb-2">
                        <span className="font-semibold">Research Team:</span> {(project.team || []).join(", ")}
                      </p>
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold">Collaborators:</span> {(project.collaborators || []).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Research Projects */}
        {regularResearch.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All Research Projects</h2>
            </div>
            <div className="space-y-6">
              {regularResearch.map((project) => (
                <div
                  key={project.id || project._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="md:flex">
                    <div onClick={() => navigate(`/projects/research/${project.id || project._id}`)} className="md:w-1/3 relative h-64 md:h-auto overflow-hidden cursor-pointer">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                        project.status === 'Published' ? 'bg-green-100 text-green-700 border border-green-300' :
                        project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-200 inline-block mb-3">
                            {project.category}
                          </span>
                          <h3 onClick={() => navigate(`/projects/research/${project.id || project._id}`)} className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-cyan-600 transition-colors cursor-pointer">
                            {project.title}
                          </h3>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-bold">
                          {project.fundingAmount}
                        </span>
                      </div>

                      <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs font-bold text-slate-700 mb-2">Key Findings:</p>
                          <div className="space-y-1">
                            {(project.keyFindings || []).slice(0, 2).map((finding, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs">
                                <svg className="w-3 h-3 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-slate-600">{finding}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-700 mb-2">Publications:</p>
                          <div className="space-y-1">
                            {(project.publications || []).slice(0, 2).map((pub, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs">
                                <svg className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                <span className="text-slate-600 line-clamp-1">{pub}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(project.technologies || []).slice(0, 5).map((tech, index) => (
                          <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-lg font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-slate-200 pt-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-slate-600">
                            <span className="font-semibold">Team:</span> {(project.team || []).slice(0, 2).join(", ")}
                            {(project.team || []).length > 2 && ` +${(project.team || []).length - 2} more`}
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); navigate(`/projects/research/${project.id || project._id}`); }} className="text-white font-semibold bg-primary hover:bg-primary-dark flex items-center gap-1 px-4 py-2 rounded-lg transition-colors cursor-pointer">
                            <span>View Details</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredResearch.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No research projects found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Innovation Impact Section */}
        <div className="mt-16 bg-blue-900 rounded-2xl shadow-2xl p-12 text-white">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join Our Research Community
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Collaborate with world-class researchers, access cutting-edge facilities, and contribute to breakthrough innovations that shape the future.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-4xl font-bold mb-2">250+</p>
                <p className="text-gray-100">Global Collaborations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-4xl font-bold mb-2">150+</p>
                <p className="text-gray-100">Research Scientists</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-4xl font-bold mb-2">$27M+</p>
                <p className="text-gray-100">Total Funding Secured</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join/collaborate" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 block ring-1 ring-inset ring-slate-200">
                Collaborate With Us
              </Link>
              <Link to="/careers/jobs" className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white block">
                View Open Positions
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-cyan-600 text-white p-4 rounded-full shadow-2xl hover:bg-cyan-700 transition-all duration-300 z-50 hover:scale-110"
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
