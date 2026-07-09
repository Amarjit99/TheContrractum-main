import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function Media() {
  const navigate = useNavigate();
  
  // Dynamic States for data fetched from database
  const [mediaItems, setMediaItems] = useState([]);
  const [pressReleases, setPressReleases] = useState([]);
  const [mediaCoverage, setMediaCoverage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  // Modal interactive player states
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);

  // Media Kit Lead Capture States
  const [showMediaKitModal, setShowMediaKitModal] = useState(false);
  const [mediaKitLead, setMediaKitLead] = useState({ fullName: "", email: "", company: "" });
  const [isSubmittingKit, setIsSubmittingKit] = useState(false);

  const tabs = ["All", "Photos", "Videos", "Press Releases", "Media Coverage"];
  const categories = ["All", "Events", "Corporate", "Leadership", "Culture", "Products", "Technology", "CSR", "Achievements", "Projects", "Client Stories"];

  // Fetch all media databases on mount
  useEffect(() => {
    const fetchMediaData = async () => {
      setIsLoading(true);
      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
        
        const [resItems, resPress, resCoverage] = await Promise.all([
          fetch(`${API}/api/media/items`),
          fetch(`${API}/api/media/press-releases`),
          fetch(`${API}/api/media/coverage`)
        ]);

        if (resItems.ok && resPress.ok && resCoverage.ok) {
          const itemsData = await resItems.json();
          const pressData = await resPress.json();
          const coverageData = await resCoverage.json();

          setMediaItems(itemsData);
          setPressReleases(pressData);
          setMediaCoverage(coverageData);
        } else {
          toast.error("Failed to load some media gallery resources.");
        }
      } catch (err) {
        console.error("Error fetching media from backend:", err);
        toast.error("Network error: Failed to connect to media service.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaData();
  }, []);

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
                           (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesTab = activeTab === "All" || item.type === activeTab.slice(0, -1); // Remove 's' from Photos/Videos
      return matchesSearch && matchesCategory && matchesTab;
    });

    return filtered;
  };

  const filteredItems = getFilteredItems();
  const featuredItems = mediaItems.filter(item => item.featured);

  // Calculate statistics dynamically
  const totalPhotos = mediaItems.filter(item => item.type === "Photo").length;
  const totalVideos = mediaItems.filter(item => item.type === "Video").length;
  const totalViews = mediaItems.reduce((sum, item) => sum + (item.views || 0), 0);

  // Submit media kit lead
  const handleMediaKitSubmit = async (e) => {
    e.preventDefault();
    if (!mediaKitLead.fullName || !mediaKitLead.email || !mediaKitLead.company) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!mediaKitLead.email.toLowerCase().endsWith('@gmail.com')) {
      toast.error("Please provide a valid @gmail.com email address.");
      return;
    }

    setIsSubmittingKit(true);
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API}/api/media/kit-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(mediaKitLead)
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Lead verified! Starting download...");

        // Download generated PDF in new tab
        window.open(data.pdfUrl, "_blank");

        // Close and reset
        setMediaKitLead({ fullName: "", email: "", company: "" });
        setShowMediaKitModal(false);
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error("Media kit request error:", err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmittingKit(false);
    }
  };

  // Render dynamic loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center flex-col gap-4 text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold tracking-wider animate-pulse text-lg">LOADING DYNAMIC MEDIA GALLERY...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1920&h=600&fit=crop&q=80" 
            alt="Media Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-slate-900/75 to-blue-900/85"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-blue-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-10 h-10 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalPhotos}</p>
            <p className="text-sm text-slate-600 mt-1">Photos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalVideos}</p>
            <p className="text-sm text-slate-600 mt-1">Videos</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{(totalViews / 1000).toFixed(1)}K+</p>
            <p className="text-sm text-slate-600 mt-1">Total Views</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                style={
                  activeTab === tab
                    ? { backgroundColor: '#007BFF', color: '#ffffff' }
                    : { backgroundColor: '#f1f5f9', color: '#0f172a' }
                }
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:opacity-90"
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 text-slate-800"
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
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 font-medium text-slate-800"
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
        {activeTab === "All" && featuredItems.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-[#007BFF] to-blue-400 rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Media</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <div
                  key={item._id || item.id}
                  onClick={() => setSelectedMediaItem(item)}
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
                      <span className={`${item.type === 'Photo' ? 'bg-purple-100 text-blue-900 border-purple-300' : 'bg-pink-100 text-red-700 border-pink-300'} px-3 py-1 rounded-full text-xs font-bold border`}>
                        {item.type === 'Video' && (
                          <svg className="w-3 h-3 inline mr-1 text-red-700" fill="currentColor" viewBox="0 0 20 20">
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
                        <span>{item.views ? (item.views / 1000).toFixed(1) + "K" : "0"} views</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags && item.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-50 text-blue-900 text-xs px-2 py-1 rounded-md font-semibold border border-blue-100">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMediaItem(item);
                      }}
                      style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                      className="w-full py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-md"
                    >
                      {item.type === 'Video' ? 'Watch Featured Video' : 'View Featured Gallery'}
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
                <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-blue-400 to-[#007BFF] rounded-full mr-4"></span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{activeTab === "All" ? "More Media" : activeTab}</h2>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === "All" ? mediaItems.filter(item => !item.featured) : filteredItems).map((item) => (
                <div
                  key={item._id || item.id}
                  onClick={() => setSelectedMediaItem(item)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    <span className={`absolute top-3 left-3 ${item.type === 'Photo' ? 'bg-purple-100 text-blue-900 border-purple-300' : 'bg-pink-100 text-red-700 border-pink-300'} px-2 py-1 rounded-full text-xs font-bold border`}>
                      {item.type === 'Video' && (
                        <svg className="w-3 h-3 inline mr-1 text-red-700" fill="currentColor" viewBox="0 0 20 20">
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
                        {item.views ? (item.views / 1000).toFixed(1) + "K" : "0"}
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
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-[#007BFF] to-blue-400 rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Press Releases</h2>
            </div>
            <div className="space-y-6">
              {pressReleases.map((item) => (
                <div
                  key={item._id || item.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <span className="bg-purple-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold border border-purple-300 inline-block mb-3">
                        Press Release
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 hover:text-[#007BFF] transition-colors cursor-pointer">
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
                  <button 
                    style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                    className="font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 px-4 py-2 rounded shadow"
                  >
                    <span>Read Full Release</span>
                    <svg className="w-4 h-4" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-blue-400 to-[#007BFF] rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Media Coverage</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mediaCoverage.map((item) => (
                <div
                  key={item._id || item.id}
                  className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                >
                  <span className="bg-pink-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-pink-300 inline-block mb-4">
                    Media Coverage
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#007BFF] transition-colors">
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
                  <button 
                    style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                    className="font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 px-4 py-2 rounded shadow"
                  >
                    <span>Read Article</span>
                    <svg className="w-4 h-4" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <button 
                onClick={() => navigate('/resources/media-relations')}
                style={{ backgroundColor: '#ffffff', color: '#1e3a8a' }}
                className="px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Contact Media Relations
              </button>
              <button 
                onClick={() => setShowMediaKitModal(true)}
                style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: '#ffffff' }}
                className="px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl border-2 cursor-pointer"
              >
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
          className="fixed bottom-8 right-8 bg-[#007BFF] text-white p-4 rounded-full shadow-2xl hover:opacity-90 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Lightbox / Media Player Modal */}
      {selectedMediaItem && (
        <div className="fixed inset-0 flex items-center justify-center z-[90] px-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMediaItem(null)}
          ></div>
          
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full border-t-4 border-[#007BFF] transform transition-all z-10">
            {/* Close button */}
            <button 
              onClick={() => setSelectedMediaItem(null)}
              className="absolute top-4 right-4 bg-black/60 text-white hover:bg-black/80 p-2 rounded-full z-20 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media Player Frame */}
            <div className="relative bg-slate-950 aspect-video flex items-center justify-center">
              {selectedMediaItem.type === "Photo" ? (
                <img 
                  src={selectedMediaItem.image} 
                  alt={selectedMediaItem.title} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <video 
                  src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34281-large.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Media details */}
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-300">
                  {selectedMediaItem.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{selectedMediaItem.date}</span>
                {selectedMediaItem.duration && (
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-bold">
                    {selectedMediaItem.duration}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedMediaItem.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{selectedMediaItem.description}</p>
              
              <div className="flex flex-wrap gap-1.5">
                {selectedMediaItem.tags && selectedMediaItem.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Kit Lead Capture Modal */}
      {showMediaKitModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[90] px-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMediaKitModal(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full border-t-4 border-[#007BFF] z-10">
            <button 
              onClick={() => setShowMediaKitModal(false)}
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
              <h3 className="text-xl font-bold text-slate-900">Download Media Kit</h3>
              <p className="text-sm text-slate-500 mt-1">Please provide your details below to download the official brand kit PDF.</p>
            </div>

            <form onSubmit={handleMediaKitSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={mediaKitLead.fullName}
                  onChange={(e) => setMediaKitLead(prev => ({ ...prev, fullName: e.target.value }))}
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
                  value={mediaKitLead.email}
                  onChange={(e) => setMediaKitLead(prev => ({ ...prev, email: e.target.value }))}
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
                  value={mediaKitLead.company}
                  onChange={(e) => setMediaKitLead(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-800 text-sm font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingKit}
                  style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                  className="w-full disabled:opacity-75 disabled:cursor-not-allowed py-3 rounded-xl font-extrabold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmittingKit ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span style={{ color: '#ffffff' }}>Verifying & Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" style={{ color: '#ffffff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span style={{ color: '#ffffff' }}>Submit & Download Media Kit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
