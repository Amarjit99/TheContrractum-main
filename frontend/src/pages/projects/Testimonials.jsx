import { useState, useEffect } from "react";

// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    position: "Chief Medical Officer",
    company: "National Health Institute",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 5,
    project: "AI-Powered Diagnostic Platform",
    testimonial: "TheContractum transformed our diagnostic process completely. The AI system they developed has 95% accuracy and reduced our diagnosis time from 5 days to just 2 hours. We've been able to save over 15,000 lives since implementation. Their team's expertise in healthcare AI is unmatched.",
    beforeContext: "We were facing critical delays in disease diagnosis, leading to late treatments and increased mortality rates.",
    afterResults: "Within 6 months, we saw a 40% reduction in treatment delays and significantly improved patient outcomes across 500+ hospitals.",
    projectDuration: "14 months",
    videoTestimonial: true,
    featured: true,
    date: "2025-11"
  },
  {
    id: 2,
    name: "James Wilson",
    position: "Chief Technology Officer",
    company: "Global Banking Corporation",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    rating: 5,
    project: "Digital Banking Transformation",
    testimonial: "The digital transformation exceeded all our expectations. TheContractum delivered a world-class banking platform that now serves 10 million active users with 99.99% uptime. We've become an industry leader in digital innovation, and our customer satisfaction scores jumped from 3.2 to 4.8 out of 5.",
    beforeContext: "Our legacy systems were causing frequent downtime, security vulnerabilities, and we were losing customers to digital-first competitors.",
    afterResults: "200% increase in digital adoption, $50M annual cost reduction, and 85% reduction in fraud incidents.",
    projectDuration: "18 months",
    videoTestimonial: false,
    featured: true,
    date: "2026-01"
  },
  {
    id: 3,
    name: "Prof. Michael Chen",
    position: "Education Secretary",
    company: "National Education Board",
    industry: "Education",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5,
    project: "E-Learning Platform",
    testimonial: "This platform bridged the digital divide during the pandemic. Over 1 million students across 2000+ schools had access to quality education through their solution. The 98% engagement rate and 30% improvement in test scores speak volumes about the platform's effectiveness and user-friendly design.",
    beforeContext: "During the pandemic, thousands of schools lacked infrastructure for remote learning, widening the educational gap.",
    afterResults: "Uninterrupted education for 1M+ students with 95% attendance rates and improved learning outcomes across all demographics.",
    projectDuration: "16 months",
    videoTestimonial: true,
    featured: false,
    date: "2026-01"
  },
  {
    id: 4,
    name: "Mayor Robert Martinez",
    position: "City Mayor",
    company: "Metropolitan City Council",
    industry: "Government",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    project: "Smart City IoT Infrastructure",
    testimonial: "Our city has become a model for smart urban development thanks to TheContractum. The IoT platform with 10,000+ sensors reduced traffic congestion by 50%, saved 35% in energy costs, and improved emergency response times by 60%. The ROI exceeded our projections by 180%. Incredible work!",
    beforeContext: "We faced severe traffic congestion, waste management inefficiencies, and poor emergency response times.",
    afterResults: "$75M in operational savings, 65% improvement in citizen satisfaction, and attracted $2B in tech investments.",
    projectDuration: "20 months",
    videoTestimonial: false,
    featured: true,
    date: "2026-01"
  },
  {
    id: 5,
    name: "Linda Thompson",
    position: "Chief Operations Officer",
    company: "TransGlobal Logistics",
    industry: "Logistics",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    project: "Supply Chain Optimization Platform",
    testimonial: "This system transformed our global operations. We now track 5,000+ vehicles in real-time across 50 countries, achieved 90% on-time delivery, and saved $120M annually. TheContractum's blockchain integration ensures complete transparency and eliminated 50% of shipment damages. Best investment we've made.",
    beforeContext: "Managing our fleet was chaotic with poor visibility, 48-hour delivery delays, and 20% of shipments lost or damaged.",
    afterResults: "Industry-leading efficiency, 95% customer retention, and 30% reduction in carbon footprint.",
    projectDuration: "12 months",
    videoTestimonial: false,
    featured: false,
    date: "2025-09"
  },
  {
    id: 6,
    name: "David Park",
    position: "VP of Operations",
    company: "MegaMart Retail Chain",
    industry: "Retail",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    rating: 5,
    project: "AI Retail Analytics Platform",
    testimonial: "The personalization engine understands our customers better than we ever could. Sales skyrocketed with a 45% increase in conversion rates and 30% boost in average order value. The platform generated $80M in additional revenue in the first year alone. TheContractum's team is exceptional!",
    beforeContext: "Low conversion rates and poor inventory management were costing us $50M annually in missed opportunities.",
    afterResults: "5M+ monthly active users, 200% increase in online sales, and $30M in procurement optimization savings.",
    projectDuration: "10 months",
    videoTestimonial: true,
    featured: false,
    date: "2025-10"
  },
  {
    id: 7,
    name: "Dr. Emily Rodriguez",
    position: "Director of Research",
    company: "Quantum Technologies Inc.",
    industry: "Technology",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    rating: 5,
    project: "Quantum-Safe Encryption System",
    testimonial: "TheContractum's cutting-edge cryptography research is protecting our multi-billion dollar infrastructure from quantum threats. Their team demonstrated deep expertise in post-quantum algorithms and delivered a solution that's both secure and performant. The 5% overhead is remarkable for this level of security.",
    beforeContext: "We needed future-proof encryption as quantum computers threatened our current security protocols.",
    afterResults: "Successfully secured $100B+ in digital assets with quantum-resistant protection and full backward compatibility.",
    projectDuration: "15 months",
    videoTestimonial: false,
    featured: false,
    date: "2025-12"
  },
  {
    id: 8,
    name: "Alexandra Singh",
    position: "CEO",
    company: "EcoEnergy Solutions",
    industry: "Energy",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    rating: 5,
    project: "Green Data Center Optimization",
    testimonial: "Working with TheContractum was transformative for our sustainability goals. Their AI-powered optimization reduced our energy consumption by 60% while maintaining peak performance. This translated to millions in savings and positioned us as industry leaders in green computing. Outstanding results!",
    beforeContext: "Our data centers were energy-intensive with high operational costs and significant carbon footprint.",
    afterResults: "60% energy reduction, 40% decrease in carbon emissions, and became a certified carbon-neutral operation.",
    projectDuration: "11 months",
    videoTestimonial: true,
    featured: true,
    date: "2025-11"
  },
  {
    id: 9,
    name: "Marcus Johnson",
    position: "Head of Innovation",
    company: "AutoDrive Systems",
    industry: "Automotive",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 5,
    project: "Autonomous Vehicle AI",
    testimonial: "TheContractum's expertise in machine learning and computer vision accelerated our autonomous driving program by 2 years. The safety improvements are remarkable—99.8% accuracy in object detection and decision-making. They're true pioneers in AI technology and wonderful partners to work with.",
    beforeContext: "Our autonomous driving system needed significant improvements in real-time decision making and safety.",
    afterResults: "Achieved Level 4 autonomy certification, reduced testing incidents by 85%, and launched commercial pilots in 5 cities.",
    projectDuration: "22 months",
    videoTestimonial: false,
    featured: false,
    date: "2025-08"
  },
  {
    id: 10,
    name: "Dr. Priya Sharma",
    position: "VP of Product",
    company: "HealthTech Innovations",
    industry: "Healthcare",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    rating: 5,
    project: "Telemedicine Platform",
    testimonial: "The telemedicine platform TheContractum built handles 50,000+ consultations daily with exceptional reliability. The HIPAA-compliant architecture, seamless video streaming, and AI-powered triage system exceeded all our requirements. Patient satisfaction is at an all-time high of 4.9/5. Phenomenal execution!",
    beforeContext: "We needed a scalable, secure platform to handle the surge in remote healthcare demand post-pandemic.",
    afterResults: "Served 5M+ patients, 98% uptime, reduced wait times by 70%, and expanded access to underserved rural areas.",
    projectDuration: "13 months",
    videoTestimonial: true,
    featured: false,
    date: "2025-09"
  },
  {
    id: 11,
    name: "Thomas Anderson",
    position: "CIO",
    company: "SecureBank International",
    industry: "Finance",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    rating: 5,
    project: "Cybersecurity Infrastructure",
    testimonial: "After experiencing security breaches, we needed enterprise-grade protection. TheContractum implemented a comprehensive cybersecurity solution with AI threat detection that stopped 10,000+ attacks in the first month. Zero breaches since implementation. Their expertise saved our reputation and millions in potential losses.",
    beforeContext: "Facing increasing cyber threats and regulatory pressure after security incidents compromised customer data.",
    afterResults: "100% threat detection rate, passed all regulatory audits with excellence, and restored customer trust completely.",
    projectDuration: "9 months",
    videoTestimonial: false,
    featured: true,
    date: "2025-10"
  },
  {
    id: 12,
    name: "Sofia Martinez",
    position: "Chief Digital Officer",
    company: "TravelWorld Group",
    industry: "Travel & Tourism",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    rating: 5,
    project: "AI Travel Recommendation Engine",
    testimonial: "The personalized travel recommendation system is pure magic! Our customers love it—booking conversions increased by 65%, customer lifetime value grew by 40%, and we're processing 1M+ recommendations daily. TheContractum combined technical excellence with deep understanding of our business needs. 10/10!",
    beforeContext: "Generic recommendations led to low engagement and our conversion rates were significantly below industry standards.",
    afterResults: "Became the #1 rated travel platform with 4.8/5 customer reviews and doubled annual revenue within 18 months.",
    projectDuration: "14 months",
    videoTestimonial: true,
    featured: false,
    date: "2025-12"
  }
];

export default function Testimonials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  const industries = ["All", "Healthcare", "Finance", "Education", "Government", "Logistics", "Retail", "Technology", "Energy", "Automotive", "Travel & Tourism"];
  const ratings = ["All", "5 Stars"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter testimonials
  const filteredTestimonials = testimonialsData.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || testimonial.industry === selectedIndustry;
    const matchesRating = selectedRating === "All" || testimonial.rating === 5;
    return matchesSearch && matchesIndustry && matchesRating;
  });

  const featuredTestimonials = filteredTestimonials.filter(t => t.featured);
  const regularTestimonials = filteredTestimonials.filter(t => !t.featured);
  const videoTestimonials = filteredTestimonials.filter(t => t.videoTestimonial);

  // Calculate statistics
  const avgRating = (testimonialsData.reduce((sum, t) => sum + t.rating, 0) / testimonialsData.length).toFixed(1);
  const totalClients = testimonialsData.length;
  const satisfactionRate = Math.round((testimonialsData.filter(t => t.rating === 5).length / testimonialsData.length) * 100);
  const industriesServed = [...new Set(testimonialsData.map(t => t.industry))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=600&fit=crop&q=80" 
            alt="Client Testimonials"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-amber-900/75 to-yellow-900/85"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%23ffffff\" fill-opacity=\"1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-amber-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Client Success Stories
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Client Testimonials
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Hear directly from our clients about their transformative experiences and measurable success
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{avgRating}/5</p>
            <p className="text-sm text-slate-600 mt-1">Average Rating</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalClients}</p>
            <p className="text-sm text-slate-600 mt-1">Happy Clients</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{satisfactionRate}%</p>
            <p className="text-sm text-slate-600 mt-1">Satisfaction Rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{industriesServed}</p>
            <p className="text-sm text-slate-600 mt-1">Industries Served</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Testimonials
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, company, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-slate-50 font-medium"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all bg-slate-50 font-medium"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredTestimonials.length}</span> of <span className="font-bold text-slate-900">{testimonialsData.length}</span> testimonials
          </div>
        </div>

        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary-light to-primary rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Success Stories</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8">
                      <svg className="w-48 h-48 text-white opacity-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-amber-100 text-sm font-semibold">{testimonial.position}</p>
                        <p className="text-amber-50 text-sm">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mt-4 relative z-10">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
                        {testimonial.industry}
                      </span>
                      <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                        ⭐ Featured
                      </span>
                      {testimonial.videoTestimonial && (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          Video
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-bold text-slate-700 mb-2">Project: {testimonial.project}</p>

                    <div className="relative mb-4">
                      <svg className="absolute -left-2 -top-2 w-8 h-8 text-amber-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-slate-700 leading-relaxed pl-8 italic">
                        "{testimonial.testimonial}"
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-2">📊 Results Impact:</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{testimonial.afterResults}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration: {testimonial.projectDuration}
                      </span>
                      <span className="text-amber-600 font-semibold">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Testimonials Grid */}
        {regularTestimonials.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All Client Testimonials</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col group"
                >
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-amber-200 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{testimonial.name}</h3>
                        <p className="text-xs text-slate-600 font-semibold">{testimonial.position}</p>
                        <p className="text-xs text-slate-500">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-slate-600 ml-1 font-semibold">{testimonial.rating}.0</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {testimonial.industry}
                      </span>
                      {testimonial.videoTestimonial && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          Video
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-bold text-slate-700 mb-2">{testimonial.project}</p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4 grow line-clamp-4">
                      "{testimonial.testimonial}"
                    </p>

                    <div className="border-t border-slate-200 pt-3 text-xs text-slate-500">
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No testimonials found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Video Testimonials Section */}
        {videoTestimonials.length > 0 && (
          <div className="mb-16 bg-blue-900 rounded-2xl p-12 text-white">
            <div className="text-center mb-8">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
                <span className="text-white text-sm font-semibold flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Video Testimonials
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">Hear From Our Clients Directly</h2>
              <p className="text-gray-100 mt-2">{videoTestimonials.length} video testimonials available</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {videoTestimonials.slice(0, 6).map((testimonial) => (
                <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-100">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-100 leading-relaxed line-clamp-3">"{testimonial.testimonial.substring(0, 100)}..."</p>
                  <button className="mt-3 w-full bg-white text-blue-900 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    Watch Video
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white overflow-hidden relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Experience the same transformative results. Let's create your success story together with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Your Project
              </button>
              <button className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-amber-600 text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 transition-all duration-300 z-50 hover:scale-110"
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
