import { useState, useEffect } from "react";

// Events Data
const eventsData = [
  {
    id: 1,
    title: "AI & Machine Learning Summit 2026",
    date: "2026-03-15",
    time: "9:00 AM - 6:00 PM",
    location: "Tech Convention Center, San Francisco",
    category: "Conference",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    description: "Join industry leaders and AI experts for a full-day summit exploring the latest advancements in artificial intelligence, machine learning, and deep learning. Network with 500+ professionals and attend hands-on workshops.",
    speaker: "Dr. Andrew Chen, Chief AI Scientist",
    seatsAvailable: 150,
    totalSeats: 500,
    price: "Free",
    registrationLink: "#",
    featured: true,
    tags: ["AI", "Machine Learning", "Technology"]
  },
  {
    id: 2,
    title: "Cloud Computing Workshop: AWS & Azure",
    date: "2026-03-22",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual (Online)",
    category: "Workshop",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    description: "Hands-on workshop covering cloud architecture, deployment strategies, and best practices for AWS and Azure. Learn from certified cloud architects and get practical experience with real-world scenarios.",
    speaker: "Sarah Johnson, Senior Cloud Architect",
    seatsAvailable: 75,
    totalSeats: 100,
    price: "$49",
    registrationLink: "#",
    featured: true,
    tags: ["Cloud Computing", "AWS", "Azure"]
  },
  {
    id: 3,
    title: "Cybersecurity Awareness Training",
    date: "2026-03-28",
    time: "10:00 AM - 1:00 PM",
    location: "TheContractum Headquarters, Building A",
    category: "Training",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    description: "Essential cybersecurity training for businesses covering threat detection, data protection, and incident response. Learn how to protect your organization from modern cyber threats.",
    speaker: "Michael Zhang, Cybersecurity Expert",
    seatsAvailable: 40,
    totalSeats: 50,
    price: "Free for Members",
    registrationLink: "#",
    featured: false,
    tags: ["Cybersecurity", "Security", "Training"]
  },
  {
    id: 4,
    title: "Startup Pitch Night & Networking",
    date: "2026-04-05",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Hub, Downtown",
    category: "Networking",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop",
    description: "Watch innovative startups pitch their ideas to investors and industry experts. Network with entrepreneurs, investors, and tech enthusiasts. Light refreshments provided.",
    speaker: "Multiple Startup Founders",
    seatsAvailable: 200,
    totalSeats: 250,
    price: "Free",
    registrationLink: "#",
    featured: true,
    tags: ["Startup", "Networking", "Investment"]
  },
  {
    id: 5,
    title: "Blockchain & Web3 Developer Bootcamp",
    date: "2026-04-12",
    time: "9:00 AM - 5:00 PM",
    location: "Virtual (Online)",
    category: "Bootcamp",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    description: "Intensive bootcamp for developers wanting to build on blockchain. Learn Solidity, smart contracts, DApp development, and Web3 integration. Includes certification upon completion.",
    speaker: "Dr. Priya Sharma, Blockchain Architect",
    seatsAvailable: 30,
    totalSeats: 50,
    price: "$299",
    registrationLink: "#",
    featured: false,
    tags: ["Blockchain", "Web3", "Development"]
  },
  {
    id: 6,
    title: "Digital Transformation Panel Discussion",
    date: "2026-04-18",
    time: "3:00 PM - 5:00 PM",
    location: "Business Center, Room 301",
    category: "Webinar",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=600&fit=crop",
    description: "Industry leaders discuss digital transformation strategies, challenges, and success stories. Q&A session with panel experts from Fortune 500 companies.",
    speaker: "Panel of 5 Industry Leaders",
    seatsAvailable: 120,
    totalSeats: 150,
    price: "Free",
    registrationLink: "#",
    featured: false,
    tags: ["Digital Transformation", "Business", "Strategy"]
  },
  {
    id: 7,
    title: "Data Science & Analytics Masterclass",
    date: "2026-02-10",
    time: "10:00 AM - 4:00 PM",
    location: "Data Science Institute, Boston",
    category: "Masterclass",
    type: "past",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    description: "Comprehensive masterclass covering data analysis, visualization, predictive modeling, and machine learning algorithms. Hands-on projects with real datasets.",
    speaker: "Dr. Robert Taylor, Data Scientist",
    attendees: 180,
    totalSeats: 200,
    price: "$199",
    registrationLink: "#",
    featured: false,
    tags: ["Data Science", "Analytics", "Machine Learning"],
    highlights: ["180 attendees", "4.9/5 rating", "98% would recommend"]
  },
  {
    id: 8,
    title: "Tech Innovation Expo 2025",
    date: "2025-12-08",
    time: "9:00 AM - 7:00 PM",
    location: "Convention Center, Las Vegas",
    category: "Conference",
    type: "past",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
    description: "The largest tech expo of 2025 showcasing cutting-edge innovations in AI, robotics, IoT, and quantum computing. Featured 50+ exhibitors and 20+ speakers.",
    speaker: "Multiple Industry Experts",
    attendees: 2500,
    totalSeats: 3000,
    price: "$99",
    registrationLink: "#",
    featured: false,
    tags: ["Innovation", "Technology", "Expo"],
    highlights: ["2500+ attendees", "50+ exhibitors", "20+ speakers", "Best Tech Event 2025"]
  },
  {
    id: 9,
    title: "DevOps Best Practices Workshop",
    date: "2026-01-25",
    time: "1:00 PM - 5:00 PM",
    location: "Virtual (Online)",
    category: "Workshop",
    type: "past",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=600&fit=crop",
    description: "Learn CI/CD pipelines, containerization with Docker, Kubernetes orchestration, and infrastructure as code. Practical workshop with live demos.",
    speaker: "James Wilson, DevOps Lead",
    attendees: 95,
    totalSeats: 100,
    price: "$79",
    registrationLink: "#",
    featured: false,
    tags: ["DevOps", "CI/CD", "Docker", "Kubernetes"],
    highlights: ["95 participants", "Hands-on labs", "Certificate awarded"]
  },
  {
    id: 10,
    title: "UX/UI Design Sprint Challenge",
    date: "2026-04-25",
    time: "9:00 AM - 6:00 PM",
    location: "Design Studio, New York",
    category: "Workshop",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    description: "Intensive one-day design sprint where teams compete to solve real-world UX challenges. Win prizes and get feedback from top designers. Portfolio-worthy projects guaranteed.",
    speaker: "Emma Davis, Lead UX Designer",
    seatsAvailable: 60,
    totalSeats: 80,
    price: "$149",
    registrationLink: "#",
    featured: false,
    tags: ["UX", "UI", "Design", "Challenge"]
  },
  {
    id: 11,
    title: "IoT & Smart Cities Conference",
    date: "2026-05-08",
    time: "9:00 AM - 5:00 PM",
    location: "Smart City Center, Singapore",
    category: "Conference",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
    description: "Explore the future of smart cities with IoT sensors, 5G connectivity, and AI-powered urban management. Case studies from leading smart city projects worldwide.",
    speaker: "Multiple IoT Experts",
    seatsAvailable: 300,
    totalSeats: 400,
    price: "$199",
    registrationLink: "#",
    featured: true,
    tags: ["IoT", "Smart Cities", "5G"]
  },
  {
    id: 12,
    title: "Women in Tech Leadership Forum",
    date: "2026-05-15",
    time: "2:00 PM - 6:00 PM",
    location: "Leadership Center, Seattle",
    category: "Networking",
    type: "upcoming",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop",
    description: "Empowering women in technology through leadership development, mentorship, and networking. Hear from successful women leaders and build valuable connections.",
    speaker: "Panel of Women Tech Leaders",
    seatsAvailable: 100,
    totalSeats: 150,
    price: "Free",
    registrationLink: "#",
    featured: false,
    tags: ["Leadership", "Diversity", "Networking"]
  }
];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("upcoming");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState(6);

  const categories = ["All", "Conference", "Workshop", "Training", "Networking", "Bootcamp", "Webinar", "Masterclass"];

  // Smart Navbar Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Filter events
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesType = event.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const upcomingEvents = eventsData.filter(e => e.type === "upcoming");
  const pastEvents = eventsData.filter(e => e.type === "past");
  const featuredEvents = filteredEvents.filter(e => e.featured && e.type === "upcoming");
  const displayedEvents = filteredEvents.slice(0, visibleEvents);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-primary-light">

      {/* Smart Navbar */}
      <div className={`fixed top-0 left-0 right-0 bg-white shadow-md z-40 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold text-slate-900">Events & Activities</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 hidden md:inline">
                {upcomingEvents.length} Upcoming · {pastEvents.length} Past
              </span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop&q=80" 
            alt="Events & Activities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/85 via-primary/75 to-primary/85"></div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Connect • Learn • Grow
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Events & Activities
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Join our community events, workshops, and conferences to stay ahead in technology
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{upcomingEvents.length}</p>
            <p className="text-sm text-slate-600 mt-1">Upcoming Events</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">5000+</p>
            <p className="text-sm text-slate-600 mt-1">Total Attendees</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">50+</p>
            <p className="text-sm text-slate-600 mt-1">Partner Venues</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">4.8/5</p>
            <p className="text-sm text-slate-600 mt-1">Avg Rating</p>
          </div>
        </div>

        {/* Event Type Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedType("upcoming")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedType === "upcoming"
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upcoming Events ({upcomingEvents.length})
            </span>
          </button>
          <button
            onClick={() => setSelectedType("past")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedType === "past"
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Past Events ({pastEvents.length})
            </span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Events
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, location, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-slate-50 font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredEvents.length}</span> {selectedType} events
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && selectedType === "upcoming" && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Events</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <span className="absolute top-4 left-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-500 shadow-lg">
                      ⭐ Featured
                    </span>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-purple-100 text-primary-dark px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                        {event.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                      <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>

                    <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm text-slate-600">{event.speaker}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg mb-4">
                      <span className="text-sm font-semibold text-slate-700">
                        {event.seatsAvailable} / {event.totalSeats} seats available
                      </span>
                      <span className="text-lg font-bold text-primary">{event.price}</span>
                    </div>

                    <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg">
                      Register Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Events Grid */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {selectedType === "upcoming" ? "All Upcoming Events" : "Past Events Archive"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4 grow line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-primary/10 text-primary-dark text-xs px-2 py-1 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {event.type === "upcoming" ? (
                    <>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-slate-600">
                          {event.seatsAvailable} seats left
                        </span>
                        <span className="font-bold text-primary">{event.price}</span>
                      </div>
                      <button className="w-full bg-red-600 text-white py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300">
                        Register Now
                      </button>
                    </>
                  ) : (
                    <div className="bg-slate-100 rounded-lg p-3">
                      <p className="text-xs font-bold text-slate-700 mb-2">Event Highlights:</p>
                      <div className="space-y-1">
                        {event.highlights?.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                            <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleEvents < filteredEvents.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleEvents(prev => prev + 6)}
                className="bg-primary text-black px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Load More Events ({filteredEvents.length - visibleEvents} remaining)
              </button>
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No events found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Never Miss an Event!
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Subscribe to our newsletter and get notified about upcoming events, exclusive workshops, and early bird discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-slate-900 font-medium focus:ring-4 focus:ring-white/30 outline-none"
              />
              <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Subscribe Now
              </button>
            </div>
            <p className="text-gray-100 text-sm mt-4">
              Join 10,000+ professionals already subscribed
            </p>
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
