import { useState, useEffect } from "react";

// Reports Data
const reports = [
  {
    id: 1,
    title: "Annual Report 2025: Digital Transformation Success Stories",
    type: "Annual Report",
    publicationDate: "2026-01-15",
    year: "2025",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    description: "Comprehensive overview of TheContractum's achievements in 2025, including financial performance, major project completions, client testimonials, innovation initiatives, and strategic roadmap for 2026. Highlights include 250+ successful projects, 40% YoY growth, and expansion into 15 new markets.",
    pages: 124,
    fileSize: "12.5 MB",
    format: "PDF",
    highlights: [
      "250+ Projects Completed",
      "40% Revenue Growth",
      "15 New Market Entries",
      "98% Client Satisfaction",
      "50+ Innovation Patents"
    ],
    downloads: 8920,
    featured: true,
    category: "Corporate"
  },
  {
    id: 2,
    title: "Q4 2025 Financial Report: Record-Breaking Quarter",
    type: "Quarterly Report",
    publicationDate: "2026-01-30",
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    description: "Detailed financial analysis for Q4 2025 showcasing exceptional growth metrics, revenue breakdown by service lines, regional performance, investment activities, and forward-looking statements. Record revenue of $45M with 35% profit margin and strategic acquisitions.",
    pages: 48,
    fileSize: "4.2 MB",
    format: "PDF",
    highlights: [
      "$45M Quarterly Revenue",
      "35% Profit Margin",
      "80+ New Clients Acquired",
      "3 Strategic Acquisitions",
      "Strong Cash Position"
    ],
    downloads: 5420,
    featured: true,
    category: "Financial"
  },
  {
    id: 3,
    title: "Healthcare Technology Industry Report 2026",
    type: "Industry Report",
    publicationDate: "2026-02-10",
    year: "2026",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    description: "In-depth analysis of healthcare technology trends, digital health innovations, telemedicine adoption, AI in diagnostics, patient data management, regulatory compliance, and market forecasts for 2026-2030. Includes case studies from 20+ healthcare implementations.",
    pages: 86,
    fileSize: "8.7 MB",
    format: "PDF",
    highlights: [
      "20+ Healthcare Case Studies",
      "5-Year Market Forecast",
      "AI & Telemedicine Trends",
      "Regulatory Compliance Guide",
      "ROI Analysis"
    ],
    downloads: 12340,
    featured: true,
    category: "Industry Analysis"
  },
  {
    id: 4,
    title: "Sustainability Report 2025: Our Environmental Impact",
    type: "Sustainability Report",
    publicationDate: "2025-12-20",
    year: "2025",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
    description: "Comprehensive sustainability report detailing TheContractum's environmental initiatives, carbon footprint reduction achievements, renewable energy adoption, waste management, CSR activities, and alignment with UN Sustainable Development Goals. Achieved 60% carbon reduction.",
    pages: 64,
    fileSize: "6.8 MB",
    format: "PDF",
    highlights: [
      "60% Carbon Reduction",
      "100% Renewable Energy",
      "Zero Waste to Landfill",
      "50,000 Trees Planted",
      "UN SDG Alignment"
    ],
    downloads: 6780,
    featured: false,
    category: "Corporate"
  },
  {
    id: 5,
    title: "AI & Machine Learning Technical Report 2025",
    type: "Technical Report",
    publicationDate: "2025-11-15",
    year: "2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    description: "Technical deep-dive into TheContractum's AI/ML implementations, including natural language processing systems, computer vision applications, predictive analytics models, recommendation engines, and performance benchmarks. Features 30+ real-world AI deployments.",
    pages: 92,
    fileSize: "9.4 MB",
    format: "PDF",
    highlights: [
      "30+ AI Deployments",
      "95% Model Accuracy",
      "NLP & Computer Vision",
      "Performance Benchmarks",
      "Open Source Contributions"
    ],
    downloads: 9850,
    featured: true,
    category: "Technology"
  },
  {
    id: 6,
    title: "Global Market Expansion Report 2025",
    type: "Market Report",
    publicationDate: "2025-10-05",
    year: "2025",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
    description: "Strategic analysis of TheContractum's international expansion journey, covering market entry strategies, regional partnerships, cultural adaptation, competitive positioning, and growth opportunities in Asia-Pacific, Europe, and Latin America markets.",
    pages: 76,
    fileSize: "7.2 MB",
    format: "PDF",
    highlights: [
      "15 New Geographic Markets",
      "40+ Strategic Partnerships",
      "Regional Success Stories",
      "Market Entry Strategies",
      "5-Year Expansion Roadmap"
    ],
    downloads: 4520,
    featured: false,
    category: "Market Analysis"
  },
  {
    id: 7,
    title: "Cybersecurity Assessment Report 2025",
    type: "Technical Report",
    publicationDate: "2025-09-20",
    year: "2025",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    description: "Comprehensive cybersecurity review covering threat landscape analysis, security architecture improvements, penetration testing results, incident response protocols, compliance certifications (ISO 27001, SOC 2), and recommendations for enhanced security posture.",
    pages: 58,
    fileSize: "5.6 MB",
    format: "PDF",
    highlights: [
      "ISO 27001 Certified",
      "SOC 2 Type II Compliant",
      "Zero Security Breaches",
      "24/7 Threat Monitoring",
      "Advanced Threat Defense"
    ],
    downloads: 7230,
    featured: false,
    category: "Technology"
  },
  {
    id: 8,
    title: "Employee Satisfaction & Culture Report 2025",
    type: "HR Report",
    publicationDate: "2025-08-10",
    year: "2025",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    description: "Annual employee engagement survey results, workplace culture initiatives, diversity & inclusion metrics, professional development programs, employee benefits analysis, retention strategies, and action plans based on feedback from 1,500+ employees.",
    pages: 52,
    fileSize: "4.8 MB",
    format: "PDF",
    highlights: [
      "92% Employee Satisfaction",
      "40% Female Leadership",
      "500+ Training Programs",
      "15% Attrition Rate",
      "Award-Winning Culture"
    ],
    downloads: 3890,
    featured: false,
    category: "Corporate"
  },
  {
    id: 9,
    title: "Q3 2025 Performance Report",
    type: "Quarterly Report",
    publicationDate: "2025-10-31",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    description: "Comprehensive Q3 2025 business performance review featuring revenue analysis, project milestones, client acquisition metrics, operational efficiency improvements, market positioning, and strategic initiatives completed during the quarter.",
    pages: 44,
    fileSize: "4.0 MB",
    format: "PDF",
    highlights: [
      "$38M Quarterly Revenue",
      "32% Profit Margin",
      "65+ New Clients",
      "95% On-Time Delivery",
      "Strategic Partnerships"
    ],
    downloads: 4120,
    featured: false,
    category: "Financial"
  },
  {
    id: 10,
    title: "Research & Innovation Report 2025",
    type: "Research Report",
    publicationDate: "2025-07-15",
    year: "2025",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=600&fit=crop",
    description: "Comprehensive overview of TheContractum's R&D activities, breakthrough innovations, patent filings, research collaborations with universities, open-source contributions, technology incubation programs, and future research roadmap for emerging technologies.",
    pages: 98,
    fileSize: "10.2 MB",
    format: "PDF",
    highlights: [
      "25 Patents Filed",
      "50+ Research Projects",
      "10 University Partnerships",
      "Innovation Labs Launched",
      "Open Source Leadership"
    ],
    downloads: 6540,
    featured: false,
    category: "Technology"
  }
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  const types = ["All", "Annual Report", "Quarterly Report", "Industry Report", "Technical Report", "Market Report", "Sustainability Report", "Research Report", "HR Report"];
  const years = ["All", "2026", "2025"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Calculate total statistics
  const totalDownloads = reports.reduce((sum, report) => sum + report.downloads, 0);
  const totalPages = reports.reduce((sum, report) => sum + report.pages, 0);

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
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-orange-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p className="text-3xl font-bold text-slate-900">4</p>
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
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-slate-50 font-medium"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-slate-50 font-medium"
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
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Reports</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredReports.map((report) => (
                <div
                  key={report.id}
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
                        <span>{(report.downloads / 1000).toFixed(1)}K downloads</span>
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
                            <svg className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download Report</span>
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
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary-light to-primary rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All Reports</h2>
            </div>
            <div className="space-y-6">
              {regularReports.map((report) => (
                <div
                  key={report.id}
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
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
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
                          <p className="font-bold text-slate-900 text-sm">{(report.downloads / 1000).toFixed(1)}K</p>
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
                        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Download</span>
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
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-white/50 font-medium"
                />
                <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
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

    </div>
  );
}
