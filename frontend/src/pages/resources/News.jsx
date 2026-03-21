import { useState, useEffect } from "react";

// NEWS DATA STRUCTURE
const newsData = [
  {
    id: 1,
    title: "Exploring the Connection Between Gut Health and Mental Well-being",
    category: "Health",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200",
    date: "2026-02-18",
    featured: true,
    description: "Recent studies reveal surprising links between gut microbiome and mental health, opening new treatment possibilities."
  },
  {
    id: 2,
    title: "Olympics 2026: The Athletes to Watch",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800",
    date: "2026-02-17",
    featured: false,
    description: "Meet the rising stars who are expected to dominate the upcoming Olympic games."
  },
  {
    id: 3,
    title: "New Breakthrough in Cancer Research",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
    date: "2026-02-16",
    featured: false,
    description: "Scientists discover innovative treatment method showing promising results in clinical trials."
  },
  {
    id: 4,
    title: "Global Climate Summit 2026 Outcomes",
    category: "World",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b4?q=80&w=800",
    date: "2026-02-15",
    featured: false,
    description: "World leaders reach historic agreement on carbon emission targets."
  },
  {
    id: 5,
    title: "Tech Giants Announce AI Collaboration",
    category: "Business",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    date: "2026-02-14",
    featured: false,
    description: "Major technology companies form alliance to develop ethical AI standards."
  },
  {
    id: 6,
    title: "Election Results: Government Changes Course",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800",
    date: "2026-02-13",
    featured: false,
    description: "Historic election brings new leadership and policy shifts across the nation."
  },
  {
    id: 7,
    title: "Understanding the Human Brain: New Insights",
    category: "Health",
    image: "https://images.unsplash.com/photo-1581090700227-1e8d44f11d9e?q=80&w=1200",
    date: "2026-02-12",
    featured: false,
    description: "Neuroscience breakthrough reveals how memories are formed and retrieved."
  },
  {
    id: 8,
    title: "Stock Market Hits Record High",
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    date: "2026-02-11",
    featured: false,
    description: "Markets surge as tech sector leads unprecedented growth rally."
  },
  {
    id: 9,
    title: "World Cup Qualifiers: Surprising Upsets",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800",
    date: "2026-02-10",
    featured: false,
    description: "Underdog teams shock favorites in dramatic qualification matches."
  },
  {
    id: 10,
    title: "Mental Health Awareness Campaign Launched",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
    date: "2026-02-09",
    featured: false,
    description: "Global initiative aims to reduce stigma and improve access to mental health services."
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [visibleNews, setVisibleNews] = useState(8);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = ["All", "Health", "Sport", "Politics", "Business", "World"];

  // Scroll detection for smart navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top
      if (currentScrollY < 10) {
        setShowNavbar(true);
      }
      // Hide navbar on scroll down, show on scroll up
      else if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Filter news based on category and search
  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.find(news => news.featured);
  const sideNews = filteredNews.filter(news => !news.featured && news.category === "Sport").slice(0, 2);
  const categoryNews = filteredNews.filter(news => !news.featured).slice(0, visibleNews);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Health: "bg-primary",
      Sport: "bg-blue-600",
      Politics: "bg-primary",
      Business: "bg-green-600",
      World: "bg-orange-600"
    };
    return colors[category] || "bg-gray-600";
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen">

      {/* HEADER - Smart Navbar */}
      <header 
        className={`bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide">
            NEXUS <span className="text-primary">NEWS</span>
          </h1>

          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium text-gray-600">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`hover:text-blue-600 transition-colors ${
                  selectedCategory === category ? "text-blue-600 font-bold" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-primary transition-colors"
          >
            Subscribe
          </button>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search news by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* FEATURED SECTION */}
        {featuredNews && (
          <div className="grid md:grid-cols-3 gap-6 mb-14">

            {/* Big Featured News */}
            <div className="md:col-span-2 relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className={`${getCategoryColor(featuredNews.category)} px-3 py-1 text-xs rounded-full font-semibold`}>
                  {featuredNews.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-2">
                  {featuredNews.title}
                </h2>
                <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                  {featuredNews.description}
                </p>
                <p className="text-xs text-gray-300">
                  {formatDate(featuredNews.date)}
                </p>
              </div>
            </div>

            {/* Side News */}
            <div className="flex flex-col gap-6">
              {sideNews.length > 0 ? sideNews.map((news) => (
                <div key={news.id} className="flex gap-4 cursor-pointer group bg-white rounded-lg p-3 shadow hover:shadow-lg transition-shadow">
                  <img
                    src={news.image}
                    className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    alt={news.title}
                  />
                  <div>
                    <span className={`text-xs font-semibold ${getCategoryColor(news.category)} text-white px-2 py-1 rounded`}>
                      {news.category}
                    </span>
                    <h3 className="text-sm font-bold mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(news.date)}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p className="text-sm">No sport news available</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* RESULTS INFO */}
        {searchTerm && (
          <div className="mb-6 text-sm text-gray-600 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200">
            Found <span className="font-bold text-blue-600">{filteredNews.length}</span> results for "{searchTerm}"
          </div>
        )}

        {/* CATEGORY GRID */}
        {categoryNews.length > 0 ? (
          <div className="mt-14">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-black">
                {selectedCategory === "All" ? "Latest News" : selectedCategory}
              </h2>
              <span className="text-gray-500 text-sm">
                {categoryNews.length} {categoryNews.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryNews.map((news) => (
                <div key={news.id} className="cursor-pointer group bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative overflow-hidden">
                    <img
                      src={news.image}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={news.title}
                    />
                    <span className={`absolute top-3 left-3 ${getCategoryColor(news.category)} text-white px-3 py-1 text-xs rounded-full font-semibold shadow-lg`}>
                      {news.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-2">
                      {formatDate(news.date)}
                    </p>
                    <h3 className="font-bold text-sm mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {news.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {visibleNews < filteredNews.filter(n => !n.featured).length && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleNews(prev => prev + 4)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Load More News
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-xl font-semibold">No news found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        )}

        {/* NEWSLETTER SECTION */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">

          <div className="md:col-span-2 relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200"
              alt="Newsletter"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm font-semibold">
                Newsletter
              </span>
              <h2 className="text-xl md:text-2xl font-bold mt-3">
                Stay Updated with Breaking News & Exclusive Stories
              </h2>
              <p className="text-sm text-gray-200 mt-2">
                Get daily updates delivered to your inbox
              </p>
            </div>
          </div>

          <div className="bg-blue-900 text-white rounded-xl p-8 flex flex-col justify-center shadow-lg">
            <svg className="w-12 h-12 mb-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-100 mb-4">
              Get daily updates and exclusive content
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded text-black focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button 
                type="submit"
                className="w-full bg-white text-blue-900 px-5 py-2 rounded font-semibold hover:bg-gray-100 transition-colors shadow"
              >
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* FOOTER */}
      <footer className="bg-primary text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                NEXUS <span className="text-primary">NEWS</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Your trusted source for breaking news and in-depth analysis.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories.filter(c => c !== "All").map(category => (
                  <li key={category}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(category);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advertise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Nexus News. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
