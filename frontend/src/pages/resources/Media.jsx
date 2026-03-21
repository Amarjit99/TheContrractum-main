import { useState, useEffect } from "react";

// Media Gallery Data
const mediaItems = [
  // Photos
  {
    id: 1,
    title: "Annual Innovation Summit 2025",
    type: "Photo",
    category: "Events",
    date: "2025-12-15",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
    description: "Our flagship innovation summit brought together 500+ technology leaders to discuss the future of digital transformation and emerging technologies.",
    tags: ["Summit", "Innovation", "Technology"],
    featured: true,
    views: 12500
  },
  {
    id: 2,
    title: "New Office Campus Opening Ceremony",
    type: "Photo",
    category: "Corporate",
    date: "2026-01-20",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    description: "Grand opening of our state-of-the-art technology campus in Bangalore, featuring modern workspaces, innovation labs, and collaborative zones.",
    tags: ["Office", "Campus", "Expansion"],
    featured: true,
    views: 9800
  },
  {
    id: 3,
    title: "CEO Keynote at Tech Summit",
    type: "Video",
    category: "Leadership",
    date: "2026-02-05",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop",
    description: "Our CEO delivered an inspiring keynote on 'The Future of Work in the AI Era' at the Global Technology Summit 2026.",
    duration: "25:30",
    tags: ["CEO", "Keynote", "Leadership"],
    featured: true,
    views: 18200
  },
  {
    id: 4,
    title: "Team Building & Outdoor Activities",
    type: "Photo",
    category: "Culture",
    date: "2025-11-10",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=1200&h=800&fit=crop",
    description: "Annual team building retreat where our employees engaged in outdoor activities, workshops, and bonding sessions.",
    tags: ["Team Building", "Culture", "Activities"],
    featured: false,
    views: 5600
  },
  {
    id: 5,
    title: "AI Product Launch Event",
    type: "Video",
    category: "Products",
    date: "2025-10-20",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=800&fit=crop",
    description: "Launch event for our revolutionary AI-powered analytics platform that transforms how businesses make data-driven decisions.",
    duration: "18:45",
    tags: ["Product Launch", "AI", "Innovation"],
    featured: false,
    views: 14300
  },
  {
    id: 6,
    title: "Hackathon Winners Announcement",
    type: "Photo",
    category: "Events",
    date: "2025-09-15",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
    description: "Annual hackathon concluded with 150+ participants showcasing innovative solutions. Winners received prizes and incubation support.",
    tags: ["Hackathon", "Innovation", "Competition"],
    featured: false,
    views: 7400
  },
  {
    id: 7,
    title: "Community CSR Initiative",
    type: "Photo",
    category: "CSR",
    date: "2025-08-25",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop",
    description: "Our team volunteering at a rural digital literacy program, teaching computer skills to underprivileged students.",
    tags: ["CSR", "Community", "Education"],
    featured: false,
    views: 4200
  },
  {
    id: 8,
    title: "Behind the Scenes: Innovation Lab",
    type: "Video",
    category: "Technology",
    date: "2026-01-10",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop",
    description: "Exclusive behind-the-scenes tour of our cutting-edge innovation lab where breakthrough technologies are developed.",
    duration: "12:20",
    tags: ["Innovation Lab", "Technology", "Research"],
    featured: true,
    views: 11800
  },
  {
    id: 9,
    title: "Client Success Stories Interview",
    type: "Video",
    category: "Client Stories",
    date: "2025-12-05",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop",
    description: "Clients share their transformation journey and success achieved through our technology solutions.",
    duration: "22:15",
    tags: ["Clients", "Success Stories", "Testimonials"],
    featured: false,
    views: 8900
  },
  {
    id: 10,
    title: "Industry Awards Ceremony",
    type: "Photo",
    category: "Achievements",
    date: "2025-11-30",
    image: "https://images.unsplash.com/photo-1464639351491-a172c2aa2911?w=1200&h=800&fit=crop",
    description: "TheContractum wins 'Best Technology Company of the Year' and 'Innovation Excellence Award' at the National Tech Awards.",
    tags: ["Awards", "Recognition", "Achievement"],
    featured: true,
    views: 10500
  },
  {
    id: 11,
    title: "Women in Tech Workshop",
    type: "Photo",
    category: "Culture",
    date: "2025-10-08",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop",
    description: "Empowering women in technology through skill development workshops, mentorship programs, and career guidance sessions.",
    tags: ["Women in Tech", "Workshop", "Empowerment"],
    featured: false,
    views: 6700
  },
  {
    id: 12,
    title: "Smart City Project Showcase",
    type: "Video",
    category: "Projects",
    date: "2025-09-20",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop",
    description: "Documentary showcasing our smart city implementation that transformed urban infrastructure with IoT and AI technologies.",
    duration: "28:40",
    tags: ["Smart City", "IoT", "Infrastructure"],
    featured: false,
    views: 13200
  }
];

// Press Releases
const pressReleases = [
  {
    id: 101,
    title: "TheContractum Announces Strategic Partnership with Global Tech Giant",
    date: "2026-02-15",
    excerpt: "TheContractum has entered into a strategic partnership with a Fortune 500 technology company to accelerate digital transformation initiatives across Asia-Pacific markets.",
    type: "Press Release"
  },
  {
    id: 102,
    title: "Record Q4 2025 Results: 40% YoY Growth",
    date: "2026-01-30",
    excerpt: "TheContractum reports exceptional Q4 2025 financial results with $45M revenue, marking 40% year-over-year growth and strongest quarter in company history.",
    type: "Press Release"
  },
  {
    id: 103,
    title: "TheContractum Launches AI-Powered Analytics Platform",
    date: "2025-10-20",
    excerpt: "Revolutionary AI platform enables enterprises to unlock insights from massive datasets with 10x faster processing and predictive analytics capabilities.",
    type: "Press Release"
  }
];

// Media Coverage
const mediaCoverage = [
  {
    id: 201,
    title: "TheContractum Named 'Best Technology Company of the Year'",
    publication: "Tech Business Magazine",
    date: "2026-02-10",
    type: "Media Coverage",
    link: "#"
  },
  {
    id: 202,
    title: "How TheContractum is Revolutionizing Digital Transformation",
    publication: "Forbes Technology",
    date: "2026-01-25",
    type: "Media Coverage",
    link: "#"
  },
  {
    id: 203,
    title: "TheContractum CEO on the Future of AI in Enterprise",
    publication: "Business Today",
    date: "2026-01-15",
    type: "Media Coverage",
    link: "#"
  }
];

export default function Media() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  const tabs = ["All", "Photos", "Videos", "Press Releases", "Media Coverage"];
  const categories = ["All", "Events", "Corporate", "Leadership", "Culture", "Products", "Technology", "CSR", "Achievements", "Projects", "Client Stories"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter media items
  const getFilteredItems = () => {
    if (activeTab === "Press Releases") return pressReleases;
    if (activeTab === "Media Coverage") return mediaCoverage;

    let filtered = mediaItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesTab = activeTab === "All" || item.type === activeTab.slice(0, -1); // Remove 's' from Photos/Videos
      return matchesSearch && matchesCategory && matchesTab;
    });

    return filtered;
  };

  const filteredItems = getFilteredItems();
  const featuredItems = mediaItems.filter(item => item.featured);

  // Calculate statistics
  const totalPhotos = mediaItems.filter(item => item.type === "Photo").length;
  const totalVideos = mediaItems.filter(item => item.type === "Video").length;
  const totalViews = mediaItems.reduce((sum, item) => sum + item.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-primary-light">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&h=600&fit=crop&q=80" 
            alt="Media Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/85 via-primary/75 to-primary-light/85"></div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Visual Stories
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Media Gallery
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Explore our collection of photos, videos, press releases, and media coverage showcasing our journey and achievements
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPhotos}</p>
            <p className="text-sm text-slate-600 mt-1">Photos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalVideos}</p>
            <p className="text-sm text-slate-600 mt-1">Videos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{(totalViews / 1000).toFixed(1)}K+</p>
            <p className="text-sm text-slate-600 mt-1">Total Views</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{pressReleases.length + mediaCoverage.length}</p>
            <p className="text-sm text-slate-600 mt-1">Press & Coverage</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 border border-slate-200 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters (Only for photos/videos) */}
        {activeTab !== "Press Releases" && activeTab !== "Media Coverage" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Search Media
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, description, or tags..."
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
              Showing <span className="font-bold text-slate-900">{filteredItems.length}</span> items
            </div>
          </div>
        )}

        {/* Featured Media Section */}
        {activeTab === "All" && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Media</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`${item.type === 'Photo' ? 'bg-purple-100 text-primary-dark border-purple-300' : 'bg-pink-100 text-primary border-pink-300'} px-3 py-1 rounded-full text-xs font-bold border`}>
                        {item.type === 'Video' && (
                          <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        )}
                        {item.type}
                      </span>
                      <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-500">
                        ⭐ Featured
                      </span>
                    </div>

                    {item.duration && (
                      <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold">
                        {item.duration}
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-slate-700 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{(item.views / 1000).toFixed(1)}K views</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="bg-primary/10 text-primary-dark text-xs px-2 py-1 rounded-md font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-2 rounded-lg font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg">
                      {item.type === 'Video' ? 'Watch Video' : 'View Photo'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos & Videos Grid */}
        {(activeTab === "All" || activeTab === "Photos" || activeTab === "Videos") && (
          <div className="mb-16">
            {activeTab !== "All" && (
              <div className="flex items-center mb-8">
                <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary-light to-primary rounded-full mr-4"></span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{activeTab === "All" ? "More Media" : activeTab}</h2>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === "All" ? mediaItems.filter(item => !item.featured) : filteredItems).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    <span className={`absolute top-3 left-3 ${item.type === 'Photo' ? 'bg-purple-100 text-primary-dark border-purple-300' : 'bg-pink-100 text-primary border-pink-300'} px-2 py-1 rounded-full text-xs font-bold border`}>
                      {item.type === 'Video' && (
                        <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      )}
                      {item.type}
                    </span>

                    {item.duration && (
                      <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold">
                        {item.duration}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-white/80 backdrop-blur-sm text-slate-800 px-2 py-1 rounded-full text-xs font-semibold inline-block mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-slate-600 text-xs mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>{item.date}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {(item.views / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Press Releases */}
        {activeTab === "Press Releases" && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-dark rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Press Releases</h2>
            </div>
            <div className="space-y-6">
              {pressReleases.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="bg-purple-100 text-primary-dark px-3 py-1 rounded-full text-xs font-bold border border-purple-300 inline-block mb-3">
                        Press Release
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <button className="bg-primary text-white font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 px-4 py-2 rounded">
                    <span>Read Full Release</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Coverage */}
        {activeTab === "Media Coverage" && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary-light to-primary rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Media Coverage</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaCoverage.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                >
                  <span className="bg-pink-100 text-primary px-3 py-1 rounded-full text-xs font-bold border border-pink-300 inline-block mb-4">
                    Media Coverage
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-light transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                    <span className="font-semibold">{item.publication}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.date}
                    </span>
                  </div>
                  <button className="bg-primary text-white font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2 px-4 py-2 rounded">
                    <span>Read Article</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && activeTab !== "Press Releases" && activeTab !== "Media Coverage" && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No media found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white overflow-hidden relative">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              For Media Inquiries
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Press releases, interview requests, and media kit downloads
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Contact Media Relations
              </button>
              <button className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white">
                Download Media Kit
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
