import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [email, setEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lead capture states
  const [selectedReportForAccess, setSelectedReportForAccess] = useState(null);
  const [leadData, setLeadData] = useState({ fullName: "", email: "", company: "", jobTitle: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const types = ["All", "Annual Report", "Quarterly Report", "Industry Report", "Technical Report", "Market Report", "Sustainability Report", "Research Report", "HR Report"];
  const years = ["All", "2026", "2025"];

  // Fetch reports on mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${API}/api/reports`);
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          toast.error("Failed to load reports from server.");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        toast.error("An error occurred while loading reports.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API}/api/subscription/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Reports" }),
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

  // Handle Lead Form Submission & Dynamic PDF Download
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.fullName || !leadData.email || !leadData.company) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmittingLead(true);
    try {
      const response = await fetch(`${API}/api/reports/${selectedReportForAccess._id}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(leadData)
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Lead verified! Starting download...");
        
        // Update downloads count in local state
        setReports(prev => prev.map(r => r._id === selectedReportForAccess._id ? { ...r, downloads: data.downloads } : r));

        // Open PDF in new tab
        window.open(data.pdfUrl, "_blank");

        // Close modal & reset fields
        setLeadData({ fullName: "", email: "", company: "", jobTitle: "" });
        setSelectedReportForAccess(null);
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to request access.");
      }
    } catch (err) {
      console.error("Report request error:", err);
      toast.error("An error occurred while downloading report.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || report.type === selectedType;
    const matchesYear = selectedYear === "All" || report.year === selectedYear;
    return matchesSearch && matchesType && matchesYear;
  });

  const featuredReports = filteredReports.filter(r => r.featured);
  const regularReports = filteredReports.filter(r => !r.featured);

  // Calculate total statistics from database reports
  const totalDownloads = reports.reduce((sum, report) => sum + report.downloads, 0);
  const totalPages = reports.reduce((sum, report) => sum + report.pages, 0);
  const totalFeatured = reports.filter(r => r.featured).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold">Loading Publications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=600&fit=crop&q=80" 
            alt="Reports & Publications"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-amber-900/75 to-red-900/85"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"60\\" height=\\"60\\" viewBox=\\"0 0 60 60\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"none\\" fill-rule=\\"evenodd\\"%3E%3Cg fill=\\"%23ffffff\\" fill-opacity=\\"1\\"%3E%3Cpath d=\\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-orange-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Official Documentation
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Reports & Publications
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Access our comprehensive collection of annual reports, financial statements, industry insights, and research publications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{reports.length}</p>
            <p className="text-sm text-slate-600 mt-1">Total Reports</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{(totalDownloads / 1000).toFixed(1)}K+</p>
            <p className="text-sm text-slate-600 mt-1">Total Downloads</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPages}+</p>
            <p className="text-sm text-slate-600 mt-1">Pages Published</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalFeatured}</p>
            <p className="text-sm text-slate-600 mt-1">Featured Reports</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Reports
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, type, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-slate-50 text-slate-800"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Report Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-slate-50 font-medium text-slate-800"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-slate-50 font-medium text-slate-800"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredReports.length}</span> of <span className="font-bold text-slate-900">{reports.length}</span> reports
          </div>
        </div>

        {/* Featured Reports */}
        {featuredReports.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-[#007BFF] to-blue-400 rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Reports</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredReports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={report.image} 
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-300">
                        {report.type}
                      </span>
                      <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-500">
                        ⭐ Featured
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                        {report.publicationDate}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">
                        {report.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{report.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{(report.downloads || 0).toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>{report.fileSize}</span>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                      {report.description}
                    </p>

                    <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
                      <p className="text-xs font-bold text-orange-800 mb-2">Key Highlights:</p>
                      <ul className="space-y-1">
                        {report.highlights.slice(0, 3).map((highlight, index) => (
                          <li key={index} className="text-xs text-slate-700 flex items-start gap-2">
                            <svg className="w-3 h-3 text-[#007BFF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => setSelectedReportForAccess(report)}
                      style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                      className="w-full py-3 rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span style={{ color: '#ffffff' }}>Download Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Reports */}
        {regularReports.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-blue-400 to-[#007BFF] rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All Reports</h2>
            </div>
            <div className="space-y-6">
              {regularReports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                      <img 
                        src={report.image} 
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      
                      <span className="absolute top-4 left-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-300">
                        {report.type}
                      </span>
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200 inline-block mb-3">
                            {report.publicationDate}
                          </span>
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-[#007BFF] transition-colors">
                            {report.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        {report.description}
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Pages</p>
                          <p className="font-bold text-slate-900 text-sm">{report.pages}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Downloads</p>
                          <p className="font-bold text-slate-900 text-sm">{(report.downloads || 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">File Size</p>
                          <p className="font-bold text-slate-900 text-sm">{report.fileSize}</p>
                        </div>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-3 mb-4 border border-orange-200">
                        <p className="text-xs font-bold text-orange-800 mb-2">Highlights:</p>
                        <div className="flex flex-wrap gap-2">
                          {report.highlights.map((highlight, index) => (
                            <span key={index} className="bg-white text-orange-700 text-xs px-2 py-1 rounded-md font-semibold border border-orange-200">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold">Format:</span> {report.format} • <span className="font-semibold">Category:</span> {report.category}
                        </div>
                        <button 
                          onClick={() => setSelectedReportForAccess(report)}
                          style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                          className="px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span style={{ color: '#ffffff' }}>Download</span>
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
        {filteredReports.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No reports found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Email Subscription CTA */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Get Reports Delivered to Your Inbox
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Subscribe to receive automatic notifications when new reports are published
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
                  style={{ backgroundColor: '#ffffff', color: '#1e3a8a' }}
                  className="px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <p className="text-gray-100 text-sm mt-4">
                Join 5,000+ subscribers staying updated on our latest publications
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Lead Capture Modal */}
      {selectedReportForAccess && (
        <div className="fixed inset-0 flex items-center justify-center z-[90] px-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedReportForAccess(null)}
          ></div>
          
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full border-t-4 border-[#007BFF] transform transition-all z-10">
            <button 
              onClick={() => setSelectedReportForAccess(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Access Technical Report</h3>
              <p className="text-sm text-slate-500 mt-1">Please provide your details below to download the PDF report.</p>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={leadData.fullName}
                  onChange={(e) => setLeadData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@company.com"
                  value={leadData.email}
                  onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  value={leadData.company}
                  onChange={(e) => setLeadData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Operations Director"
                  value={leadData.jobTitle}
                  onChange={(e) => setLeadData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 text-sm font-medium"
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center transform transition-all animate-bounce-in animate-duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Subscribed Successfully!</h3>
            <p className="text-gray-600 mb-6">Thank you for joining our newsletter. You'll be notified as soon as new reports and publications are available.</p>
            <button 
              onClick={() => setShowSuccessPopup(false)}
              style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
              className="w-full py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
            >
              Great!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
