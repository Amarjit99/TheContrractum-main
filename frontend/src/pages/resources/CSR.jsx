import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CSR() {
  const [csrInitiatives, setCsrInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [expandedCards, setExpandedCards] = useState(new Set());

  useEffect(() => {
    const fetchCsr = async () => {
      try {
        const res = await fetch(`${API}/api/csr`);
        const data = await res.json();
        setCsrInitiatives(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch CSR Initiatives:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCsr();
  }, []);

  const toggleCard = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const categories = ["All", "Education", "Environment", "Healthcare", "Social", "Infrastructure", "Emergency"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter initiatives
  const filteredInitiatives = csrInitiatives.filter(initiative => {
    const matchesSearch = initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (initiative.description && initiative.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (initiative.category && initiative.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || initiative.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredInitiatives = filteredInitiatives.filter(i => i.featured);
  const regularInitiatives = filteredInitiatives.filter(i => !i.featured);

  // Calculate total impact
  const totalBeneficiaries = "95,000+";
  const totalInvestment = "₹9.8M";
  const activeInitiatives = csrInitiatives.filter(i => i.status === "Active").length;
  const sdgGoalsCount = [...new Set(csrInitiatives.flatMap(i => i.sdgGoals || []))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=600&fit=crop&q=80" 
            alt="CSR Initiatives"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-emerald-900/75 to-[#1e5cdc]/85"></div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Making a Difference Together
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Corporate Social Responsibility
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Committed to creating positive social impact through sustainable and meaningful initiatives
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-[#1e5cdc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalBeneficiaries}</p>
            <p className="text-sm text-slate-600 mt-1">Lives Impacted</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalInvestment}</p>
            <p className="text-sm text-slate-600 mt-1">Total Investment</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{activeInitiatives}</p>
            <p className="text-sm text-slate-600 mt-1">Active Initiatives</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{sdgGoalsCount}</p>
            <p className="text-sm text-slate-600 mt-1">UN SDG Goals</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search CSR Initiatives
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, or category..."
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredInitiatives.length}</span> of <span className="font-bold text-slate-900">{csrInitiatives.length}</span> initiatives
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <Loader2 size={40} className="animate-spin text-[#1e5cdc] mb-4" />
            <p className="font-semibold">Loading Initiatives...</p>
          </div>
        ) : (
          <>
            {/* Featured Initiatives */}
            {featuredInitiatives.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full mr-4"></span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Flagship Initiatives</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredInitiatives.map((initiative) => (
                    <div
                      key={initiative._id || initiative.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                    >
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        {initiative.image && (
                          <img 
                            src={initiative.image} 
                            alt={initiative.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                            {initiative.status}
                          </span>
                          <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-500">
                            ⭐ Featured
                          </span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                            {initiative.category}
                          </span>
                          <h3 className="text-2xl font-bold text-white leading-tight">
                            {initiative.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                          {initiative.description}
                        </p>

                        <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                          <p className="text-xs font-bold text-green-800 mb-3">Impact Metrics:</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-slate-600">Beneficiaries</p>
                              <p className="font-bold text-slate-900">{initiative.impact?.beneficiaries || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600">Investment</p>
                              <p className="font-bold text-slate-900">{initiative.impact?.investment || 'N/A'}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-xs text-slate-600">Key Outcome</p>
                              <p className="font-semibold text-green-700 text-sm">{initiative.impact?.outcomes || 'N/A'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs font-bold text-slate-700 mb-2">UN SDG Goals:</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {initiative.sdgGoals && initiative.sdgGoals.map((goal, index) => (
                              <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold border border-blue-200">
                                {goal}
                              </span>
                            ))}
                          </div>
                          
                          {expandedCards.has(initiative._id || initiative.id) && initiative.goals && (
                            <div className="space-y-3 mt-4 animate-fadeIn">
                              <p className="text-xs font-bold text-emerald-800 border-t border-emerald-100 pt-3">Strategic Objectives:</p>
                              <ul className="space-y-2">
                                {initiative.goals.slice(0, 2).map((goal, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                    <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {goal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={() => toggleCard(initiative._id || initiative.id)}
                          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <span>{expandedCards.has(initiative._id || initiative.id) ? "Show Less" : "Learn More"}</span>
                          <svg className={`w-5 h-5 transition-transform duration-300 ${expandedCards.has(initiative._id || initiative.id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Initiatives */}
            {regularInitiatives.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-[#1e5cdc] to-blue-400 rounded-full mr-4"></span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All CSR Initiatives</h2>
                </div>
                <div className="space-y-6">
                  {regularInitiatives.map((initiative) => (
                    <div
                      key={initiative._id || initiative.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden bg-slate-100">
                          {initiative.image && (
                            <img 
                              src={initiative.image} 
                              alt={initiative.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                          
                          <span className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                            {initiative.status}
                          </span>
                        </div>

                        <div className="md:w-2/3 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200 inline-block mb-3">
                                {initiative.category}
                              </span>
                              <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-[#1e5cdc] transition-colors">
                                {initiative.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-slate-700 text-sm leading-relaxed mb-4">
                            {initiative.description}
                          </p>

                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-slate-50 p-3 rounded-lg">
                              <p className="text-xs text-slate-600 mb-1">Beneficiaries</p>
                              <p className="font-bold text-slate-900 text-sm">{initiative.impact?.beneficiaries || 'N/A'}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg">
                              <p className="text-xs text-slate-600 mb-1">Locations</p>
                              <p className="font-bold text-slate-900 text-sm">{initiative.impact?.locations || 'N/A'}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg">
                              <p className="text-xs text-slate-600 mb-1">Investment</p>
                              <p className="font-bold text-slate-900 text-sm">{initiative.impact?.investment || 'N/A'}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {initiative.sdgGoals && initiative.sdgGoals.map((goal, index) => (
                              <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-semibold">
                                {goal}
                              </span>
                            ))}
                          </div>

                          {expandedCards.has(initiative._id || initiative.id) && initiative.goals && (
                            <div className="mb-4 mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100 animate-fadeIn">
                              <p className="text-xs font-bold text-emerald-800 mb-2">Project Milestones:</p>
                              <ul className="space-y-2">
                                {initiative.goals.slice(2, 4).map((goal, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                    {goal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                            <div className="text-xs text-slate-600">
                              <span className="font-semibold">Partners:</span> {initiative.partnerOrganizations && initiative.partnerOrganizations.slice(0, 2).join(", ")}
                            </div>
                            <button 
                              onClick={() => toggleCard(initiative._id || initiative.id)}
                              className="bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 flex items-center gap-1 px-4 py-2 rounded transition-colors shadow-sm"
                            >
                              <span>{expandedCards.has(initiative._id || initiative.id) ? "Close" : "View Details"}</span>
                              <svg className={`w-4 h-4 transition-transform duration-300 ${expandedCards.has(initiative._id || initiative.id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredInitiatives.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-slate-600 text-xl font-semibold">No initiatives found</p>
                <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}

        {/* Get Involved CTA */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white mt-12">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Partner with us, volunteer your time, or contribute to our CSR initiatives. Together, we can create lasting positive change in communities across the nation.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="font-bold mb-1">Corporate Partnership</p>
                <p className="text-gray-100 text-sm">Join our CSR coalition</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="font-bold mb-1">Volunteer Programs</p>
                <p className="text-gray-100 text-sm">Give your time & skills</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold mb-1">Donate & Support</p>
                <p className="text-gray-100 text-sm">Fund our initiatives</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link 
                 to="/join/become-partner"
                 className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block text-center whitespace-nowrap"
               >
                 Get Involved
               </Link>
              <Link to="/resources/csr-report" className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white inline-block text-center whitespace-nowrap">
                Download CSR Report
              </Link>
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
