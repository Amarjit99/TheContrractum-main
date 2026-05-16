import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, LogOut, Calendar, MapPin, Users, Edit, Trash2, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';


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
              <Link to="/projects/ongoing" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 block">
                Start Your Project
              </Link>
              <Link to="/projects/schedule-consultation" className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white block">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Project Demonstration: Mini Event Platform */}
      <section className="mt-24 mb-16 max-w-7xl mx-auto px-6 lg:px-8 border-t border-slate-200 pt-24">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Interactive Project Demo</h2>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                Experience the "Mini Event Platform" in real-time. This interactive module demonstrates the RSVP flow, concurrency management, and secure event lifecycle.
            </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
            <MiniEventDemo />
        </div>
      </section>

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

// INTERACTIVE DEMO COMPONENT
function MiniEventDemo() {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('demoUser')) || null);
    const [loading, setLoading] = useState(true);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const [authData, setAuthData] = useState({ firstName: '', lastName: '', email: '', password: '', mobile: '1234567890' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '' });
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/mini-events`);
            const data = await res.json();
            setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setProcessing(true);
        try {
            const path = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
            const res = await fetch(`${API}${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(authData)
            });
            const data = await res.json();
            if (res.ok) {
                const userData = { ...data.user, token: data.token };
                setUser(userData);
                localStorage.setItem('demoUser', JSON.stringify(userData));
                setAuthData({ firstName: '', lastName: '', email: '', password: '', mobile: '1234567890' });
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Connection error');
        }
        setProcessing(false);
    };

    const handleCreateOrEdit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const url = editingEvent ? `${API}/api/mini-events/${editingEvent._id}` : `${API}/api/mini-events`;
            const method = editingEvent ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                await fetchEvents();
                setIsModalOpen(false);
                setFormData({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '' });
                setEditingEvent(null);
            }
        } catch (err) {
            console.error(err);
        }
        setProcessing(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this event?')) return;
        try {
            const res = await fetch(`${API}/api/mini-events/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (res.ok) fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const handleRSVP = async (id) => {
        if (!user) { toast.error('Please login to RSVP'); return; }
        try {
            const res = await fetch(`${API}/api/mini-events/${id}/rsvp`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                fetchEvents();
            } else {
                toast.success(data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('demoUser');
    };

    if (!user) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-black text-slate-800 mb-2">Mini Event Platform</h3>
                            <p className="text-slate-500 text-sm">Experience the events management flow</p>
                        </div>

                        <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg">
                            <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${authMode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Login</button>
                            <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${authMode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Register</button>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-4">
                            {authMode === 'register' && (
                                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                                    <input required placeholder="First Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={authData.firstName} onChange={e => setAuthData({...authData, firstName: e.target.value})} />
                                    <input required placeholder="Last Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={authData.lastName} onChange={e => setAuthData({...authData, lastName: e.target.value})} />
                                </div>
                            )}
                            <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={authData.email} onChange={e => setAuthData({...authData, email: e.target.value})} />
                            <input required type="password" placeholder="Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" value={authData.password} onChange={e => setAuthData({...authData, password: e.target.value})} />
                            
                            {error && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg flex items-center gap-2"><AlertCircle size={14}/>{error}</div>}
                            
                            <button disabled={processing} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                                {processing ? <Loader2 className="animate-spin" size={20}/> : authMode === 'login' ? 'LOGIN' : 'REGISTER'}
                            </button>
                        </form>
                    </div>
                    <div className="bg-slate-50 px-8 py-4 text-center border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Demo Credentials: test@example.com / 12345</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Demo Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                        {user.firstName?.[0] || 'U'}
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Signed in as</p>
                        <p className="text-sm font-black text-slate-800">{user.firstName} {user.lastName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition-all"><LogOut size={20}/></button>
                </div>
            </div>

            {/* Event List */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[600px] no-scrollbar">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="animate-spin mb-4" size={32}/>
                        <p className="font-bold uppercase text-[10px] tracking-widest">Loading Events Data...</p>
                    </div>
                ) : events.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                            <Calendar size={40}/>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">No Events Found</h4>
                        <p className="text-sm text-slate-500 max-w-xs">Stay tuned for upcoming events curated by our administration team.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {events.map(event => {
                            const isAttending = event.attendees.includes(user._id);
                            return (
                                <div key={event._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                                    <div className="h-32 bg-slate-200 relative overflow-hidden">
                                        {event.imageUrl ? (
                                            <img src={event.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={event.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                                <Calendar size={32} opacity={0.2}/>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2">
                                            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-black text-slate-800 shadow-sm border border-white/50">
                                                {event.attendees.length} / {event.capacity}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h4 className="font-black text-slate-800 leading-tight mb-2 truncate" title={event.title}>{event.title}</h4>
                                        <div className="space-y-1.5 mb-4">
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                                                <MapPin size={12} className="text-indigo-400"/>
                                                {event.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                                                <Calendar size={12} className="text-indigo-400"/>
                                                {new Date(event.dateTime).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div className="mt-auto space-y-2">
                                            <button 
                                                onClick={() => isAttending ? toast.success('RSVP is confirmed and locked') : handleRSVP(event._id)}
                                                className={`w-full py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-2 ${isAttending ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'}`}
                                            >
                                                {isAttending ? <><CheckCircle size={14}/> RSVP CONFIRMED</> : 'RSVP NOW'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="text-xl font-black text-slate-800">{editingEvent ? 'Edit Event' : 'Create New Event'}</h4>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24}/></button>
                        </div>
                        <form onSubmit={handleCreateOrEdit} className="p-8 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-bold" placeholder="Give your event a name" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date & Time</label>
                                    <input required type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-bold" value={formData.dateTime} onChange={e => setFormData({...formData, dateTime: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
                                    <input required type="number" min="1" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-bold" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-bold" placeholder="Physical location or link" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL (Unsplash)</label>
                                <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-mono" placeholder="https://images.unsplash.com/..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea required rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 text-sm resize-none" placeholder="What is this event about?" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>

                            <button disabled={processing} type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mt-4">
                                {processing ? <Loader2 className="animate-spin" size={20}/> : editingEvent ? 'UPDATE EVENT' : 'CREATE EVENT'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

