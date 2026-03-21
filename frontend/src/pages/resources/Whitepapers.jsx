import { useState, useEffect } from "react";

// Whitepapers Data
const whitepapers = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence: Trends, Challenges, and Opportunities",
    category: "AI & Machine Learning",
    publicationDate: "2025-12",
    authors: ["Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Priya Sharma"],
    pages: 48,
    fileSize: "3.2 MB",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    abstract: "This comprehensive whitepaper explores the evolving landscape of artificial intelligence, examining breakthrough developments in deep learning, neural networks, and cognitive computing. We analyze emerging trends, address critical challenges in AI ethics and governance, and identify transformative opportunities across industries.",
    keyTopics: [
      "Deep Learning Architectures",
      "AI Ethics & Responsible AI",
      "Natural Language Processing",
      "Computer Vision Applications",
      "AI in Healthcare & Finance"
    ],
    downloadCount: 15420,
    featured: true,
    year: "2025"
  },
  {
    id: 2,
    title: "Blockchain Beyond Cryptocurrency: Enterprise Use Cases and Implementation Strategies",
    category: "Blockchain",
    publicationDate: "2026-01",
    authors: ["James Martinez", "Dr. Lisa Wang"],
    pages: 56,
    fileSize: "4.1 MB",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    abstract: "An in-depth analysis of blockchain technology applications beyond digital currencies. This paper examines real-world enterprise implementations, smart contract frameworks, supply chain transparency, decentralized identity management, and practical strategies for blockchain adoption in organizations.",
    keyTopics: [
      "Smart Contract Development",
      "Supply Chain Transparency",
      "Decentralized Finance (DeFi)",
      "Blockchain Security",
      "Enterprise Adoption Roadmap"
    ],
    downloadCount: 12850,
    featured: true,
    year: "2026"
  },
  {
    id: 3,
    title: "Cloud-Native Architecture: Building Scalable and Resilient Applications",
    category: "Cloud Computing",
    publicationDate: "2025-11",
    authors: ["Alex Thompson", "Dr. Robert Kim", "Jennifer Lopez"],
    pages: 64,
    fileSize: "5.3 MB",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    abstract: "A comprehensive guide to cloud-native application development, covering microservices architecture, containerization with Docker and Kubernetes, serverless computing, DevOps practices, and strategies for building highly scalable, resilient applications in multi-cloud environments.",
    keyTopics: [
      "Microservices Architecture",
      "Kubernetes Orchestration",
      "Serverless Computing",
      "DevOps & CI/CD Pipelines",
      "Multi-Cloud Strategies"
    ],
    downloadCount: 18920,
    featured: true,
    year: "2025"
  },
  {
    id: 4,
    title: "Cybersecurity in the Age of IoT: Protecting Connected Ecosystems",
    category: "Cybersecurity",
    publicationDate: "2025-10",
    authors: ["Dr. Emily Rodriguez", "Mark Stevens"],
    pages: 52,
    fileSize: "3.8 MB",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    abstract: "This whitepaper addresses the critical security challenges presented by the Internet of Things, examining vulnerabilities in connected devices, network security protocols, threat detection mechanisms, and comprehensive frameworks for securing IoT ecosystems across industrial and consumer applications.",
    keyTopics: [
      "IoT Security Frameworks",
      "Zero Trust Architecture",
      "Threat Intelligence & Detection",
      "Encryption & Authentication",
      "Compliance & Regulations"
    ],
    downloadCount: 14200,
    featured: false,
    year: "2025"
  },
  {
    id: 5,
    title: "Data Analytics & Business Intelligence: Driving Data-Driven Decision Making",
    category: "Data Analytics",
    publicationDate: "2025-09",
    authors: ["Dr. Andrew Wilson", "Sarah Parker", "Dr. Raj Patel"],
    pages: 72,
    fileSize: "6.1 MB",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    abstract: "An extensive exploration of modern data analytics practices, covering big data processing, predictive analytics, real-time dashboards, machine learning integration, and strategies for transforming raw data into actionable business insights that drive competitive advantage.",
    keyTopics: [
      "Big Data Processing",
      "Predictive Analytics Models",
      "Data Visualization Techniques",
      "Real-Time Analytics",
      "Business Intelligence Tools"
    ],
    downloadCount: 11750,
    featured: false,
    year: "2025"
  },
  {
    id: 6,
    title: "5G Networks and Edge Computing: Transforming Connectivity",
    category: "Networking",
    publicationDate: "2026-02",
    authors: ["Dr. Maria Gonzalez", "Thomas Anderson"],
    pages: 44,
    fileSize: "3.5 MB",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    abstract: "A detailed examination of 5G technology and edge computing architectures, analyzing how ultra-low latency networks and distributed computing are enabling new use cases in autonomous vehicles, smart cities, industrial automation, and immersive extended reality experiences.",
    keyTopics: [
      "5G Network Architecture",
      "Edge Computing Infrastructure",
      "Latency Optimization",
      "Smart City Applications",
      "Industrial IoT Integration"
    ],
    downloadCount: 9340,
    featured: true,
    year: "2026"
  },
  {
    id: 7,
    title: "Quantum Computing: Preparing for the Next Computing Revolution",
    category: "Emerging Technology",
    publicationDate: "2025-08",
    authors: ["Prof. David Lee", "Dr. Amanda Brown"],
    pages: 68,
    fileSize: "5.8 MB",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop",
    abstract: "This forward-looking whitepaper introduces quantum computing fundamentals, explores current quantum algorithms and applications, examines quantum supremacy achievements, and provides guidance for organizations to prepare for the quantum era, including post-quantum cryptography strategies.",
    keyTopics: [
      "Quantum Computing Fundamentals",
      "Quantum Algorithms",
      "Quantum Cryptography",
      "Industry Applications",
      "Post-Quantum Security"
    ],
    downloadCount: 7520,
    featured: false,
    year: "2025"
  },
  {
    id: 8,
    title: "Sustainable Technology: Green IT and Environmental Responsibility",
    category: "Sustainability",
    publicationDate: "2025-07",
    authors: ["Dr. Catherine White", "John Miller", "Dr. Anita Kumar"],
    pages: 58,
    fileSize: "4.4 MB",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
    abstract: "A comprehensive analysis of sustainable technology practices, covering energy-efficient data center design, e-waste management, carbon-neutral cloud computing, renewable energy integration, and strategies for organizations to reduce their environmental footprint while maintaining technological innovation.",
    keyTopics: [
      "Green Data Centers",
      "Carbon-Neutral Computing",
      "E-Waste Management",
      "Renewable Energy Integration",
      "Sustainability Metrics"
    ],
    downloadCount: 10280,
    featured: false,
    year: "2025"
  },
  {
    id: 9,
    title: "Digital Transformation: Strategic Framework for Modern Enterprises",
    category: "Digital Strategy",
    publicationDate: "2025-06",
    authors: ["Richard Davis", "Dr. Nicole Taylor"],
    pages: 76,
    fileSize: "6.7 MB",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    abstract: "This strategic whitepaper provides a comprehensive framework for digital transformation, addressing organizational change management, technology adoption strategies, customer experience optimization, agile methodologies, and measurement frameworks for successful digital initiatives.",
    keyTopics: [
      "Digital Maturity Assessment",
      "Change Management Strategies",
      "Customer Experience Design",
      "Agile Transformation",
      "ROI Measurement Frameworks"
    ],
    downloadCount: 13670,
    featured: false,
    year: "2025"
  },
  {
    id: 10,
    title: "Robotics & Automation: The Future of Work and Industry 4.0",
    category: "Robotics",
    publicationDate: "2025-05",
    authors: ["Dr. Kevin Zhang", "Laura Martinez", "Prof. Samuel Harris"],
    pages: 62,
    fileSize: "5.2 MB",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
    abstract: "An in-depth exploration of robotics and intelligent automation systems, examining collaborative robots, autonomous systems, AI-powered automation, workforce implications, and implementation strategies for Industry 4.0 transformation in manufacturing and service sectors.",
    keyTopics: [
      "Collaborative Robotics",
      "Intelligent Automation",
      "Industry 4.0 Standards",
      "Workforce Transformation",
      "ROI & Implementation"
    ],
    downloadCount: 8940,
    featured: false,
    year: "2025"
  }
];

export default function Whitepapers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = ["All", "AI & Machine Learning", "Blockchain", "Cloud Computing", "Cybersecurity", "Data Analytics", "Networking", "Emerging Technology", "Sustainability", "Digital Strategy", "Robotics"];
  const years = ["All", "2026", "2025"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                  key={paper.id}
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

                    <button className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download PDF</span>
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
                  key={paper.id}
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

                    <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
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

    </div>
  );
}
