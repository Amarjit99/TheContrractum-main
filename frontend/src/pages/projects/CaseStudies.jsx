import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Case Studies Data
const caseStudiesData = [
  {
    id: 1,
    title: "Transforming Healthcare with AI-Powered Diagnostics",
    client: "National Health Institute",
    industry: "Healthcare",
    duration: "14 months",
    teamSize: 22,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    challenge: "The healthcare system was facing delays in disease diagnosis, leading to late treatments and increased mortality rates. Manual analysis of medical reports took 3-5 days, creating bottlenecks in patient care.",
    solution: "We developed an AI-powered diagnostic platform using machine learning algorithms to analyze medical images, lab reports, and patient history. The system provides real-time diagnostic suggestions with 95% accuracy, integrated seamlessly with existing hospital management systems.",
    results: [
      "95% diagnostic accuracy",
      "Reduced diagnosis time from 5 days to 2 hours",
      "Served 2M+ patients",
      "40% reduction in treatment delays",
      "Saved 15,000+ lives"
    ],
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "AWS", "Docker"],
    testimonial: "This AI system has revolutionized our diagnostic process. We're now able to save more lives than ever before.",
    testimonialAuthor: "Dr. Sarah Johnson, Chief Medical Officer",
    impact: "The platform is now deployed across 500+ hospitals nationwide, processing 50,000+ diagnostic cases daily and contributing to a 35% improvement in patient outcomes.",
    featured: true
  },
  {
    id: 2,
    title: "Banking Revolution: Digital Transformation at Scale",
    client: "Global Banking Corporation",
    industry: "Finance",
    duration: "18 months",
    teamSize: 28,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    challenge: "Legacy banking systems were causing frequent downtime, security vulnerabilities, and poor customer experience. The bank was losing customers to digital-first competitors and facing compliance issues.",
    solution: "We architected and implemented a complete digital banking platform with microservices architecture, real-time transaction processing, biometric security, and AI-powered fraud detection. The solution included mobile apps, web platform, and API integration with third-party services.",
    results: [
      "Zero downtime in 12 months",
      "10M+ active users",
      "99.99% uptime",
      "85% reduction in fraud",
      "$500M in digital transactions/day"
    ],
    technologies: ["React Native", "Java", "Spring Boot", "Oracle", "Kubernetes", "AWS"],
    testimonial: "The transformation exceeded our expectations. We've become a leader in digital banking innovation.",
    testimonialAuthor: "James Wilson, CTO",
    impact: "The bank saw a 200% increase in digital adoption, reduced operational costs by $50M annually, and improved customer satisfaction scores from 3.2 to 4.8/5.",
    featured: true
  },
  {
    id: 3,
    title: "E-Learning Platform: Reaching 1 Million Students",
    client: "National Education Board",
    industry: "Education",
    duration: "16 months",
    teamSize: 20,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=600&fit=crop",
    challenge: "During the pandemic, 2000+ schools lacked infrastructure for remote learning. Students from rural areas had no access to quality education, widening the educational gap. Traditional systems couldn't scale.",
    solution: "Built a comprehensive e-learning platform with live classes, interactive content, AI-powered personalized learning paths, offline mode for low-bandwidth areas, and multi-language support. Integrated assessment tools and parent-teacher communication.",
    results: [
      "1M+ students enrolled",
      "2000+ schools connected",
      "98% student engagement",
      "30% improvement in test scores",
      "Accessible in 15 languages"
    ],
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "Redis", "CDN"],
    testimonial: "This platform bridged the digital divide and ensured no student was left behind during the pandemic.",
    testimonialAuthor: "Prof. Michael Chen, Education Secretary",
    impact: "The platform enabled uninterrupted education for 1M+ students during lockdowns, with 95% attendance rates and significantly improved learning outcomes across all demographics.",
    featured: false
  },
  {
    id: 4,
    title: "Smart City Infrastructure: IoT at Urban Scale",
    client: "Metropolitan City Council",
    industry: "Government",
    duration: "20 months",
    teamSize: 32,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
    challenge: "The city faced traffic congestion, waste management inefficiencies, frequent power outages, and poor emergency response times. Manual monitoring of 500+ city services was unsustainable.",
    solution: "Deployed an integrated IoT smart city platform with 10,000+ sensors monitoring traffic, utilities, air quality, waste levels, and emergency services. Real-time analytics dashboard with predictive maintenance and automated alerts. AI-powered traffic optimization.",
    results: [
      "50% reduction in traffic congestion",
      "35% energy savings",
      "60% faster emergency response",
      "40% waste management efficiency",
      "10,000+ IoT devices deployed"
    ],
    technologies: ["React", "Python", "IoT", "PostgreSQL", "Kafka", "GIS", "AWS"],
    testimonial: "Our city has become a model for smart urban development. The ROI exceeded projections by 180%.",
    testimonialAuthor: "Mayor Robert Martinez",
    impact: "The smart city implementation saved $75M in operational costs, improved citizen satisfaction by 65%, and positioned the city as a technology leader attracting $2B in investments.",
    featured: true
  },
  {
    id: 5,
    title: "Supply Chain Optimization: Real-Time Global Logistics",
    client: "TransGlobal Logistics",
    industry: "Logistics",
    duration: "12 months",
    teamSize: 18,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop",
    challenge: "Managing 5000+ delivery vehicles across 50 countries with poor visibility, route inefficiencies, and high fuel costs. Average delivery delays of 48 hours and 20% of shipments lost or damaged.",
    solution: "Created an intelligent supply chain platform with real-time GPS tracking, AI-powered route optimization, predictive maintenance, automated warehouse management, and blockchain-based shipment verification. Integration with global customs systems.",
    results: [
      "5000+ vehicles tracked 24/7",
      "35% fuel cost reduction",
      "90% on-time delivery rate",
      "50% reduction in damages",
      "$120M annual savings"
    ],
    technologies: ["React", "Java", "Blockchain", "PostgreSQL", "AWS", "ML"],
    testimonial: "This system transformed our operations. We're now the most efficient logistics company in our sector.",
    testimonialAuthor: "Linda Thompson, COO",
    impact: "The platform processes 100K+ shipments daily across 50 countries, reduced carbon footprint by 30%, and increased customer retention from 70% to 95%.",
    featured: false
  },
  {
    id: 6,
    title: "Retail Analytics: Personalization at Scale",
    client: "MegaMart Retail Chain",
    industry: "Retail",
    duration: "10 months",
    teamSize: 15,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    challenge: "Low conversion rates, poor inventory management leading to stockouts and overstocking, and inability to personalize customer experience across 500+ stores. Lost $50M annually in missed opportunities.",
    solution: "Implemented an AI-powered retail analytics platform with real-time customer behavior tracking, predictive inventory management, personalized recommendations, dynamic pricing, and omnichannel integration. Mobile app with AR try-on features.",
    results: [
      "45% increase in conversion rate",
      "60% reduction in stockouts",
      "30% boost in average order value",
      "2M+ app downloads",
      "$80M additional revenue"
    ],
    technologies: ["React Native", "Python", "MongoDB", "Elasticsearch", "AWS", "AR"],
    testimonial: "The personalization engine understands our customers better than we do. Sales have skyrocketed.",
    testimonialAuthor: "David Park, VP of Operations",
    impact: "The platform now serves 5M+ customers monthly, increased online sales by 200%, and provided actionable insights that optimized procurement by $30M annually.",
    featured: false
  }
];

export default function CaseStudies() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  const industries = ["All", "Healthcare", "Finance", "Education", "Government", "Logistics", "Retail"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter case studies
  const filteredCaseStudies = caseStudiesData.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || study.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const featuredCases = filteredCaseStudies.filter(study => study.featured);
  const regularCases = filteredCaseStudies.filter(study => !study.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=600&fit=crop&q=80" 
            alt="Case Studies"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/75 via-purple-900/65 to-primary-light/75"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-purple-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Success Stories
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Case Studies
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Real-world challenges solved with innovative technology solutions and measurable impact
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{caseStudiesData.length}</p>
            <p className="text-sm text-slate-600 mt-1">Case Studies</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">7</p>
            <p className="text-sm text-slate-600 mt-1">Industries</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">18M+</p>
            <p className="text-sm text-slate-600 mt-1">Users Impacted</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">350%</p>
            <p className="text-sm text-slate-600 mt-1">Avg ROI</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Case Studies
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, challenge, or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-slate-50"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-slate-50 font-medium"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredCaseStudies.length}</span> of <span className="font-bold text-slate-900">{caseStudiesData.length}</span> case studies
          </div>
        </div>

        {/* Featured Case Studies */}
        {featuredCases.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Case Studies</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredCases.map((study) => (
                <div
                  key={study.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                  onClick={() => navigate(`/projects/case-studies/${study.id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    <span className="absolute top-4 left-4 bg-purple-100 text-primary-dark px-3 py-1 rounded-full text-xs font-bold border border-purple-300">
                      Featured
                    </span>

                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {study.industry}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                        {study.title}
                      </h3>
                      <p className="text-white/90 text-sm font-semibold">{study.client}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {study.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {study.teamSize} members
                      </span>
                    </div>

                    <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                      <span className="font-bold text-slate-900">Challenge:</span> {study.challenge.substring(0, 150)}...
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.results.slice(0, 3).map((result, index) => (
                        <span key={index} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-semibold border border-green-200">
                          ✓ {result}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Read Full Case Study</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Case Studies */}
        {regularCases.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">More Case Studies</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCases.map((study) => (
                <div
                  key={study.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group cursor-pointer"
                  onClick={() => navigate(`/projects/case-studies/${study.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                      {study.industry}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>

                    <p className="text-sm text-primary font-semibold mb-3">
                      {study.client}
                    </p>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4 grow">
                      {study.challenge.substring(0, 120)}...
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.results.slice(0, 2).map((result, index) => (
                        <span key={index} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold">
                          ✓ {result}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No case studies found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white overflow-hidden relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Let's discuss how we can solve your business challenges with innovative technology solutions that deliver measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Your Project
              </button>
              <button className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white">
                Schedule Consultation
              </button>
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

    </div>
  );
}
