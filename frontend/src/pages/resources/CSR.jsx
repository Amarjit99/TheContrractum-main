import { useState, useEffect } from "react";

// CSR Initiatives Data
const csrInitiatives = [
  {
    id: 1,
    title: "Digital Education for Underprivileged Children",
    category: "Education",
    status: "Active",
    startDate: "2024-01",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
    description: "Providing free computer education, coding classes, and digital literacy programs to 5,000+ underprivileged children across 50 schools. Includes laptops, internet connectivity, and trained instructors.",
    impact: {
      beneficiaries: "5,000+ children",
      locations: "50 schools in 10 states",
      investment: "$1.2M",
      outcomes: "85% students now digitally literate"
    },
    goals: [
      "Reach 10,000 children by 2027",
      "Establish 100 digital learning centers",
      "Train 500+ teachers in digital education",
      "Provide 2,000 laptops annually"
    ],
    featured: true,
    sdgGoals: ["Quality Education", "Reduced Inequalities"],
    partnerOrganizations: ["Digital India Foundation", "National Education Board"]
  },
  {
    id: 2,
    title: "Green Technology & Environmental Sustainability",
    category: "Environment",
    status: "Active",
    startDate: "2023-06",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
    description: "Carbon-neutral operations initiative including renewable energy adoption, tree plantation drives, e-waste recycling programs, and sustainable office practices. Committed to planting 50,000 trees annually.",
    impact: {
      beneficiaries: "Entire ecosystem",
      locations: "Pan-India + Global offices",
      investment: "$2.5M",
      outcomes: "60% reduction in carbon footprint"
    },
    goals: [
      "Achieve 100% carbon neutrality by 2027",
      "Plant 100,000 trees by 2026",
      "Zero e-waste to landfills",
      "100% renewable energy in all facilities"
    ],
    featured: true,
    sdgGoals: ["Climate Action", "Responsible Consumption"],
    partnerOrganizations: ["Green Earth Initiative", "Climate Action Network"]
  },
  {
    id: 3,
    title: "Healthcare Access in Rural Areas",
    category: "Healthcare",
    status: "Active",
    startDate: "2024-03",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    description: "Mobile health clinics providing free medical checkups, medicines, and telemedicine consultations to remote villages. Focus on maternal health, child vaccination, and preventive care.",
    impact: {
      beneficiaries: "25,000+ patients treated",
      locations: "150 villages",
      investment: "$800K",
      outcomes: "90% improvement in healthcare access"
    },
    goals: [
      "Reach 500 villages by 2027",
      "Conduct 100,000 health screenings annually",
      "Provide free medicines to 50,000 patients",
      "Train 200 community health workers"
    ],
    featured: true,
    sdgGoals: ["Good Health and Well-being", "Zero Hunger"],
    partnerOrganizations: ["National Health Mission", "Doctors Without Borders"]
  },
  {
    id: 4,
    title: "Women in Technology Empowerment Program",
    category: "Social",
    status: "Active",
    startDate: "2023-09",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop",
    description: "Free technology training, mentorship, and job placement support for women from economically disadvantaged backgrounds. Includes coding bootcamps, soft skills training, and entrepreneurship programs.",
    impact: {
      beneficiaries: "2,500+ women trained",
      locations: "15 training centers",
      investment: "$950K",
      outcomes: "70% job placement rate"
    },
    goals: [
      "Train 5,000 women in tech by 2027",
      "Achieve 80% job placement rate",
      "Support 500 women entrepreneurs",
      "Launch 25 training centers"
    ],
    featured: false,
    sdgGoals: ["Gender Equality", "Decent Work"],
    partnerOrganizations: ["Women in Tech Foundation", "Skill India Mission"]
  },
  {
    id: 5,
    title: "Clean Water & Sanitation Projects",
    category: "Infrastructure",
    status: "Active",
    startDate: "2024-05",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
    description: "Installing water purification systems, building toilets, and creating sanitation awareness in water-scarce regions. Focus on schools and community centers for maximum impact.",
    impact: {
      beneficiaries: "35,000+ people",
      locations: "80 villages",
      investment: "$650K",
      outcomes: "100% access to clean water in target areas"
    },
    goals: [
      "Provide clean water to 100,000 people by 2027",
      "Build 500 toilets in rural areas",
      "Install 200 water purification units",
      "Conduct sanitation awareness for 50,000 families"
    ],
    featured: false,
    sdgGoals: ["Clean Water and Sanitation", "Good Health"],
    partnerOrganizations: ["Water.org", "Swachh Bharat Mission"]
  },
  {
    id: 6,
    title: "Skill Development for Youth Employment",
    category: "Education",
    status: "Active",
    startDate: "2023-03",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
    description: "Vocational training programs in IT, digital marketing, data analytics, and emerging technologies for unemployed youth. Includes internship opportunities and job fair participation.",
    impact: {
      beneficiaries: "8,000+ youth trained",
      locations: "20 cities",
      investment: "$1.5M",
      outcomes: "65% employment within 6 months"
    },
    goals: [
      "Train 20,000 youth by 2027",
      "Achieve 75% employment rate",
      "Partner with 500 companies for placements",
      "Launch 50 skill development centers"
    ],
    featured: true,
    sdgGoals: ["Decent Work", "Quality Education"],
    partnerOrganizations: ["National Skill Development Corporation", "Industry Associations"]
  },
  {
    id: 7,
    title: "Disaster Relief & Emergency Response",
    category: "Emergency",
    status: "Active",
    startDate: "2022-01",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=600&fit=crop",
    description: "Rapid response team providing immediate relief during natural disasters including food, shelter, medical aid, and technology support for affected communities. 24/7 emergency helpline operational.",
    impact: {
      beneficiaries: "15,000+ disaster victims",
      locations: "Disaster-affected regions",
      investment: "$1.8M",
      outcomes: "Response time under 24 hours"
    },
    goals: [
      "Build 10 disaster response centers",
      "Train 1,000 volunteers in emergency response",
      "Stock emergency supplies for 50,000 people",
      "Establish satellite communication systems"
    ],
    featured: false,
    sdgGoals: ["Sustainable Cities", "Climate Action"],
    partnerOrganizations: ["Red Cross", "National Disaster Response Force"]
  },
  {
    id: 8,
    title: "Elderly Care & Digital Inclusion",
    category: "Social",
    status: "Active",
    startDate: "2024-08",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&h=600&fit=crop",
    description: "Teaching senior citizens to use smartphones, online banking, telemedicine, and social media to stay connected. Includes free tablets and personalized training sessions.",
    impact: {
      beneficiaries: "3,000+ elderly people",
      locations: "12 cities",
      investment: "$400K",
      outcomes: "90% now use digital services independently"
    },
    goals: [
      "Train 10,000 senior citizens by 2027",
      "Distribute 5,000 tablets with simplified interfaces",
      "Launch 30 elderly-friendly tech centers",
      "Create multilingual digital literacy content"
    ],
    featured: false,
    sdgGoals: ["Reduced Inequalities", "Quality Education"],
    partnerOrganizations: ["HelpAge India", "Senior Citizens Welfare Association"]
  }
];

export default function CSR() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = ["All", "Education", "Environment", "Healthcare", "Social", "Infrastructure", "Emergency"];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter initiatives
  const filteredInitiatives = csrInitiatives.filter(initiative => {
    const matchesSearch = initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || initiative.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredInitiatives = filteredInitiatives.filter(i => i.featured);
  const regularInitiatives = filteredInitiatives.filter(i => !i.featured);

  // Calculate total impact
  const totalBeneficiaries = "95,000+";
  const totalInvestment = "$9.8M";
  const activeInitiatives = csrInitiatives.filter(i => i.status === "Active").length;
  const sdgGoalsCount = [...new Set(csrInitiatives.flatMap(i => i.sdgGoals))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">

      {/* Hero Header with Background Image */}
      <div className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=600&fit=crop&q=80" 
            alt="CSR Initiatives"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-emerald-900/75 to-primary-light/85"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <span className="text-green-200 text-sm font-semibold tracking-wide uppercase flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Making a Difference Together
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl text-white">
            Corporate Social Responsibility
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed">
            Committed to creating positive social impact through sustainable and meaningful initiatives
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalBeneficiaries}</p>
            <p className="text-sm text-slate-600 mt-1">Lives Impacted</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalInvestment}</p>
            <p className="text-sm text-slate-600 mt-1">Total Investment</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{activeInitiatives}</p>
            <p className="text-sm text-slate-600 mt-1">Active Initiatives</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-slate-900">{sdgGoalsCount}</p>
            <p className="text-sm text-slate-600 mt-1">UN SDG Goals</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search CSR Initiatives
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-slate-50"
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
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-slate-50 font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredInitiatives.length}</span> of <span className="font-bold text-slate-900">{csrInitiatives.length}</span> initiatives
          </div>
        </div>

        {/* Featured Initiatives */}
        {featuredInitiatives.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Flagship Initiatives</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredInitiatives.map((initiative) => (
                <div
                  key={initiative.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={initiative.image} 
                      alt={initiative.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                        {initiative.status}
                      </span>
                      <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-500">
                        ⭐ Featured
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                        {initiative.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {initiative.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
                      {initiative.description}
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                      <p className="text-xs font-bold text-green-800 mb-3">Impact Metrics:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-slate-600">Beneficiaries</p>
                          <p className="font-bold text-slate-900">{initiative.impact.beneficiaries}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Investment</p>
                          <p className="font-bold text-slate-900">{initiative.impact.investment}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-slate-600">Key Outcome</p>
                          <p className="font-semibold text-green-700 text-sm">{initiative.impact.outcomes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-bold text-slate-700 mb-2">UN SDG Goals:</p>
                      <div className="flex flex-wrap gap-2">
                        {initiative.sdgGoals.map((goal, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold border border-blue-200">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                      <span>Learn More</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Initiatives */}
        {regularInitiatives.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <span className="inline-block w-1.5 h-10 bg-gradient-to-b from-primary to-primary-light rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">All CSR Initiatives</h2>
            </div>
            <div className="space-y-6">
              {regularInitiatives.map((initiative) => (
                <div
                  key={initiative.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                      <img 
                        src={initiative.image} 
                        alt={initiative.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                      
                      <span className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                        {initiative.status}
                      </span>
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200 inline-block mb-3">
                            {initiative.category}
                          </span>
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                            {initiative.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        {initiative.description}
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Beneficiaries</p>
                          <p className="font-bold text-slate-900 text-sm">{initiative.impact.beneficiaries}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Locations</p>
                          <p className="font-bold text-slate-900 text-sm">{initiative.impact.locations}</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Investment</p>
                          <p className="font-bold text-slate-900 text-sm">{initiative.impact.investment}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {initiative.sdgGoals.map((goal, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-semibold">
                            {goal}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold">Partners:</span> {initiative.partnerOrganizations.slice(0, 2).join(", ")}
                        </div>
                        <button className="bg-primary text-white font-semibold text-sm hover:bg-primary-dark flex items-center gap-1 px-4 py-2 rounded">
                          <span>View Details</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
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
        {filteredInitiatives.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-slate-600 text-xl font-semibold">No initiatives found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Get Involved CTA */}
        <div className="bg-blue-900 rounded-2xl shadow-2xl p-12 text-center text-white">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Partner with us, volunteer your time, or contribute to our CSR initiatives. Together, we can create lasting positive change in communities across the nation.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="font-bold mb-1">Corporate Partnership</p>
                <p className="text-gray-100 text-sm">Join our CSR coalition</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="font-bold mb-1">Volunteer Programs</p>
                <p className="text-gray-100 text-sm">Give your time & skills</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <svg className="w-8 h-8 text-white mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold mb-1">Donate & Support</p>
                <p className="text-gray-100 text-sm">Fund our initiatives</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Involved
              </button>
              <button className="bg-transparent text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white">
                Download CSR Report
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll to Top Button */}
      {lastScrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 z-50 hover:scale-110"
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
