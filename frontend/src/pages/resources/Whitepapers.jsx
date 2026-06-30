import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// Whitepapers Backend Data Integration
export default function Whitepapers() {
  const [whitepapers, setWhitepapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals state
  const [selectedPaperForAccess, setSelectedPaperForAccess] = useState(null);
  const [leadData, setLeadData] = useState({ fullName: "", email: "", company: "", jobTitle: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const [selectedPaperForDetails, setSelectedPaperForDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailedPaper, setDetailedPaper] = useState(null);

  const categories = ["All", "AI & Machine Learning", "Blockchain", "Cloud Computing", "Cybersecurity", "Data Analytics", "Networking", "Emerging Technology", "Sustainability", "Digital Strategy", "Robotics"];
  const years = ["All", "2026", "2025"];

  // Fetch whitepapers on mount
  useEffect(() => {
    const fetchWhitepapers = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API}/api/whitepapers`);
        if (response.ok) {
          const data = await response.json();
          setWhitepapers(data);
        } else {
          toast.error("Failed to load whitepapers from server.");
        }
      } catch (err) {
        console.error("Error fetching whitepapers:", err);
        toast.error("An error occurred while loading whitepapers.");
      } finally {
        setLoading(false);
      }
    };
    fetchWhitepapers();
  }, []);

  // Fetch individual whitepaper details
  const handleOpenDetails = async (id) => {
    setDetailsLoading(true);
    // Find the item first to open the modal immediately with cached state
    const placeholder = whitepapers.find(p => p._id === id);
    setDetailedPaper(placeholder);
    setSelectedPaperForDetails(id);
    
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API}/api/whitepapers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setDetailedPaper(data);
      } else {
        toast.error("Failed to fetch detailed whitepaper information.");
      }
    } catch (err) {
      console.error("Error fetching details:", err);
      toast.error("Error loading whitepaper details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Submit request / Lead capture form
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.fullName || !leadData.email || !leadData.company) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmittingLead(true);
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API}/api/whitepapers/${selectedPaperForAccess._id}/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Access request approved!");
        
        // Update local state download count
        setWhitepapers(prev => prev.map(p => p._id === selectedPaperForAccess._id ? { ...p, downloadCount: data.downloadCount } : p));
        
        // Open PDF in a new tab / start download
        window.open(data.pdfUrl, '_blank');
        
        // Reset lead form and close access modal
        setLeadData({ fullName: "", email: "", company: "", jobTitle: "" });
        setSelectedPaperForAccess(null);
        setSelectedPaperForDetails(null); // close details modal if it was open
      } else {
        const errData = await response.json();
        toast.error(errData.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error("Error submitting lead:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API}/api/subscription/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Whitepapers" }),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setEmail("");
        setTimeout(() => setShowSuccessPopup(false), 5000);
      } else {
        const data = await response.json();
        toast.error(data.message || "Subscription failed");
      }
    } catch (err) {
      console.error("Error subscribing:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter whitepapers
  const filteredWhitepapers = whitepapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || paper.category === selectedCategory;
    const matchesYear = selectedYear === "All" || paper.year === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const featuredPapers = filteredWhitepapers.filter(p => p.featured);
  const regularPapers = filteredWhitepapers.filter(p => !p.featured);

  // Calculate total statistics
  const totalDownloads = whitepapers.reduce((sum, paper) => sum + paper.downloadCount, 0);
  const totalPages = whitepapers.reduce((sum, paper) => sum + paper.pages, 0);
  const totalAuthors = [...new Set(whitepapers.flatMap(p => p.authors))].length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-primary-light flex items-center justify-center py-20">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-slate-100">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-800 font-black tracking-wide text-lg animate-pulse">Loading Research Library...</p>
          <p className="text-slate-500 text-sm mt-2">Fetching latest reports from the backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-primary-light">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1920&h=600&fit=crop&q=80" 
            alt="Whitepapers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-blue-900/75 to-purple-900/85"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-indigo-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Knowledge Repository
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Research Whitepapers
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            In-depth technical insights and research from industry experts on emerging technologies and digital transformation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{whitepapers.length}</p>
            <p className="text-sm text-slate-600 mt-1">Whitepapers</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{(totalDownloads / 1000).toFixed(1)}K+</p>
            <p className="text-sm text-slate-600 mt-1">Total Downloads</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPages}+</p>
            <p className="text-sm text-slate-600 mt-1">Pages of Research</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalAuthors}+</p>
            <p className="text-sm text-slate-600 mt-1">Expert Authors</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Whitepapers
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, author, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-primary transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-primary transition-all bg-slate-50 font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-primary transition-all bg-slate-50 font-medium"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredWhitepapers.length}</span> of <span className="font-bold text-slate-900">{whitepapers.length}</span> whitepapers
          </div>
        </div>

        {/* Featured Whitepapers */}
        {featuredPapers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Whitepapers</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPapers.map((paper) => (
                <div
                  key={paper._id || paper.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={paper.image} 
                      alt={paper.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full text-xs font-bold border border-indigo-300">
                        {paper.publicationDate}
                      </span>
                      <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-500">
                        ⭐ Featured
                      </span>
                    </div>
 
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                        {paper.category}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">
                        {paper.title}
                      </h3>
                    </div>
                  </div>
 
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{paper.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{(paper.downloadCount / 1000).toFixed(1)}K downloads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>{paper.fileSize}</span>
                      </div>
                    </div>
 
                    <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                      {paper.abstract}
                    </p>
 
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-2">Authors:</p>
                      <p className="text-sm text-slate-600">{paper.authors.join(", ")}</p>
                    </div>
 
                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-2">Key Topics:</p>
                      <div className="flex flex-wrap gap-2">
                        {paper.keyTopics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-lg font-semibold">
                            {topic}
                          </span>
                        ))}
                        {paper.keyTopics.length > 3 && (
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-lg font-semibold">
                            +{paper.keyTopics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
 
                    <button 
                      onClick={() => setSelectedPaperForAccess(paper)}
                      className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-3 rounded-lg font-bold hover:from-blue-800 hover:to-indigo-900 transition-all duration-300 shadow-lg hover:shadow-blue-200/50 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Access Full Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Whitepapers */}
        {regularPapers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-cyan-600 rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All Whitepapers</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {regularPapers.map((paper) => (
                <div
                  key={paper._id || paper.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={paper.image} 
                      alt={paper.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    <span className="absolute top-4 left-4 bg-indigo-100 text-primary px-3 py-1 rounded-full text-xs font-bold border border-indigo-300">
                      {paper.publicationDate}
                    </span>
 
                    <span className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {paper.category}
                    </span>
                  </div>
 
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {paper.title}
                    </h3>
 
                    <div className="flex items-center gap-3 mb-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{paper.pages}p</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{(paper.downloadCount / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>{paper.fileSize}</span>
                      </div>
                    </div>
 
                    <p className="text-slate-600 text-xs mb-4 leading-relaxed line-clamp-3">
                      {paper.abstract}
                    </p>
 
                    <div className="flex flex-wrap gap-1 mb-4">
                      {paper.keyTopics.slice(0, 2).map((topic, index) => (
                        <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md font-semibold">
                          {topic}
                        </span>
                      ))}
                    </div>
 
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenDetails(paper._id)}
                        className="flex-1 bg-slate-100 text-slate-800 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setSelectedPaperForAccess(paper)}
                        style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                        className="flex-1 py-2 rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1 text-sm shadow-sm hover:shadow-md"
                      >
                        <svg className="w-4 h-4" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span style={{ color: '#ffffff' }}>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredWhitepapers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No whitepapers found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Newsletter Subscription CTA */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Get Notified of New Whitepapers
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Subscribe to receive our latest research and technical insights directly in your inbox
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/50 font-medium"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <p className="text-gray-100 text-sm mt-4">
                Join 10,000+ professionals staying updated on technology trends
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-primary-dark transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center transform transition-all animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscribed Successfully!</h3>
            <p className="text-gray-600 mb-6">Thank you for joining our newsletter. You'll be the first to know when we publish new research and whitepapers.</p>
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
            >
              Great!
            </button>
          </div>
          <style>{`
            @keyframes bounce-in {
              0% { opacity: 0; transform: scale(0.3); }
              50% { opacity: 1; transform: scale(1.05); }
              70% { transform: scale(0.9); }
              100% { transform: scale(1); }
            }
            .animate-bounce-in {
              animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
          `}</style>
        </div>
      )}

      {/* Access / Lead Capture Modal */}
      {selectedPaperForAccess && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div 
            onClick={() => setSelectedPaperForAccess(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
          ></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full transform transition-all border border-slate-100 overflow-hidden animate-slide-up">
            
            {/* Header background gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-primary-light"></div>
            
            <button 
              onClick={() => setSelectedPaperForAccess(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Access Technical Report</h3>
              <p className="text-slate-500 text-sm mt-1 leading-snug">
                Please complete the form below to download <strong>{selectedPaperForAccess.title}</strong>
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={leadData.fullName}
                  onChange={(e) => setLeadData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@company.com"
                  value={leadData.email}
                  onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={leadData.company}
                  onChange={(e) => setLeadData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Research Director"
                  value={leadData.jobTitle}
                  onChange={(e) => setLeadData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                  className="w-full disabled:opacity-75 disabled:cursor-not-allowed py-3 rounded-xl font-extrabold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmittingLead ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span style={{ color: '#ffffff' }}>Verifying & Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span style={{ color: '#ffffff' }}>Submit & Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Whitepaper Details Modal */}
      {selectedPaperForDetails && detailedPaper && (
        <div className="fixed inset-0 flex items-center justify-center z-[90] px-4 overflow-y-auto py-8">
          <div 
            onClick={() => {
              setSelectedPaperForDetails(null);
              setDetailedPaper(null);
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full transform transition-all border border-slate-100 overflow-hidden z-10 my-auto animate-scale-up">
            
            {/* Cover Image & Category Header */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                src={detailedPaper.image} 
                alt={detailedPaper.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              <button 
                onClick={() => {
                  setSelectedPaperForDetails(null);
                  setDetailedPaper(null);
                }}
                className="absolute top-6 right-6 bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-3 inline-block">
                  {detailedPaper.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight drop-shadow-md">
                  {detailedPaper.title}
                </h3>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8">
              {detailsLoading ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-500 font-bold text-sm">Fetching updated resource details...</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  
                  {/* Left Column: Abstract, Topics, Authors */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Abstract</h4>
                      <p className="text-slate-700 text-sm leading-relaxed font-normal whitespace-pre-line">
                        {detailedPaper.abstract}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Topics Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailedPaper.keyTopics?.map((topic, index) => (
                          <span key={index} className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-xl font-semibold border border-slate-200">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Research Authors</h4>
                      <p className="text-slate-800 text-sm font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{detailedPaper.authors?.join(", ")}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Metadata Cards & CTA */}
                  <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Report Details</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-500 font-semibold">Published</span>
                        <span className="text-xs text-slate-800 font-bold">{detailedPaper.publicationDate}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-500 font-semibold">Length</span>
                        <span className="text-xs text-slate-800 font-bold">{detailedPaper.pages} pages</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs text-slate-500 font-semibold">File Size</span>
                        <span className="text-xs text-slate-800 font-bold">{detailedPaper.fileSize}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-xs text-slate-500 font-semibold">Downloads</span>
                        <span className="text-xs text-slate-800 font-bold">{(detailedPaper.downloadCount || 0).toLocaleString()}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedPaperForAccess(detailedPaper)}
                      style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                      className="w-full hover:opacity-90 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <svg className="w-5 h-5" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span style={{ color: '#ffffff' }}>Access Full Report</span>
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-up {
          animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
