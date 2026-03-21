import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Users, Clock, CheckCircle, Target, Award, TrendingUp, Star } from "lucide-react";

// Completed Projects Data
const completedProjectsData = [
  {
    id: 1,
    title: "National Healthcare Management System",
    client: "Ministry of Health",
    category: "Healthcare",
    completedDate: "December 2025",
    duration: "12 months",
    teamSize: 18,
    budget: "$850,000",
    rating: 5,
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Redis"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    description: "Successfully delivered a comprehensive healthcare management system serving 500+ hospitals nationwide with patient records, appointment scheduling, and emergency response integration.",
    fullDescription: "The National Healthcare Management System is a revolutionary platform that digitizes and streamlines healthcare operations across the entire nation. This comprehensive solution integrates with 500+ hospitals, managing over 2 million patient records with real-time appointment scheduling, emergency response coordination, and complete medical history tracking. The system features advanced security protocols, HIPAA compliance, and seamless interoperability between different healthcare providers.",
    achievements: ["500+ Hospitals", "2M+ Patients", "99.9% Uptime", "Zero Data Loss"],
    impact: "Reduced patient wait times by 60% and improved healthcare accessibility across the nation.",
    challenges: [
      "Integrating legacy hospital systems from 500+ different facilities",
      "Ensuring HIPAA compliance and data security for millions of patient records",
      "Building a scalable architecture to handle peak loads during emergencies",
      "Training medical staff across multiple hospitals simultaneously"
    ],
    results: [
      "60% reduction in patient wait times",
      "99.9% system uptime achieved",
      "Zero data breaches or security incidents",
      "2M+ patients successfully onboarded",
      "40% improvement in emergency response times"
    ],
    clientTestimonial: {
      quote: "This system has transformed how we deliver healthcare services nationwide. The reduction in wait times and improved coordination between hospitals has saved countless lives.",
      author: "Dr. Sarah Johnson",
      position: "Director of Digital Health, Ministry of Health"
    },
    roi: "300% ROI within first year through operational efficiency and cost reduction",
    keyMetrics: [
      { label: "Daily Transactions", value: "500K+", icon: "📊" },
      { label: "Response Time", value: "<200ms", icon: "⚡" },
      { label: "User Satisfaction", value: "98%", icon: "😊" },
      { label: "Cost Savings", value: "$12M/year", icon: "💰" }
    ]
  },
  {
    id: 2,
    title: "Smart Banking Mobile Application",
    client: "Global Bank Corp.",
    category: "Finance",
    completedDate: "January 2026",
    duration: "10 months",
    teamSize: 14,
    budget: "$620,000",
    rating: 5,
    technologies: ["React Native", "Java", "Oracle", "Microservices", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    description: "Delivered a feature-rich mobile banking application with biometric authentication, real-time transactions, and AI-powered financial insights for 5 million users.",
    fullDescription: "The Smart Banking Mobile Application revolutionizes digital banking with cutting-edge features including biometric authentication, real-time transaction processing, AI-powered financial insights, and personalized banking recommendations. The app supports 50,000+ daily transactions, offers instant loan approvals, investment tracking, and bill payment automation. Built with bank-grade security featuring multi-factor authentication, end-to-end encryption, and fraud detection algorithms.",
    achievements: ["5M+ Users", "50K Daily Transactions", "4.8★ App Rating", "Bank-Grade Security"],
    impact: "Increased digital banking adoption by 85% and reduced operational costs by 40%.",
    challenges: [
      "Implementing bank-grade security for mobile platform",
      "Handling 50,000+ concurrent transactions during peak hours",
      "Integrating with legacy banking systems",
      "Meeting strict regulatory compliance requirements"
    ],
    results: [
      "5M+ active users within 6 months",
      "85% increase in digital banking adoption",
      "40% reduction in operational costs",
      "4.8/5 app store rating with 200K+ reviews",
      "Zero security breaches in production"
    ],
    clientTestimonial: {
      quote: "This app has exceeded our expectations. The user experience is outstanding, and the security features give us complete peace of mind. Our customer satisfaction scores have skyrocketed.",
      author: "Michael Chen",
      position: "CTO, Global Bank Corp."
    },
    roi: "425% ROI through cost savings and increased customer engagement",
    keyMetrics: [
      { label: "Active Users", value: "5M+", icon: "👥" },
      { label: "Daily Transactions", value: "50K", icon: "💳" },
      { label: "App Rating", value: "4.8/5", icon: "⭐" },
      { label: "Security Score", value: "A+", icon: "🔒" }
    ]
  },
  {
    id: 3,
    title: "E-Commerce Platform for Retail Chain",
    client: "MegaMart Retail",
    category: "E-Commerce",
    completedDate: "November 2025",
    duration: "8 months",
    teamSize: 12,
    budget: "$450,000",
    rating: 4,
    technologies: ["React", "Node.js", "MongoDB", "Elasticsearch", "AWS"],
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=500&fit=crop",
    description: "Built a scalable e-commerce platform handling 100K+ products with advanced search, personalized recommendations, and integrated payment processing.",
    fullDescription: "A comprehensive e-commerce solution featuring 100,000+ products, intelligent search powered by Elasticsearch, AI-driven personalized recommendations, real-time inventory management, and seamless checkout experience. The platform handles 15 million page views monthly with advanced analytics, customer behavior tracking, and automated marketing campaigns. Integrated with multiple payment gateways, shipping providers, and warehouse management systems.",
    achievements: ["100K+ Products", "250K Orders/Month", "15M Page Views", "35% Conversion Rate"],
    impact: "Generated $12M in online revenue within first 3 months of launch.",
    challenges: [
      "Migrating 100K+ products from legacy system",
      "Building high-performance search across massive catalog",
      "Handling Black Friday traffic spikes (10x normal load)",
      "Integrating with multiple payment and shipping providers"
    ],
    results: [
      "$12M revenue in first 3 months",
      "35% conversion rate (industry avg: 2-3%)",
      "250K orders processed monthly",
      "99.95% uptime during peak shopping seasons",
      "70% reduction in cart abandonment rate"
    ],
    clientTestimonial: {
      quote: "The platform transformation has been incredible. Our online sales have exceeded all projections, and customer feedback has been overwhelmingly positive. This investment paid for itself in just 3 months.",
      author: "Jennifer Martinez",
      position: "VP of E-Commerce, MegaMart Retail"
    },
    roi: "550% ROI in first year through increased online sales",
    keyMetrics: [
      { label: "Monthly Orders", value: "250K", icon: "📦" },
      { label: "Conversion Rate", value: "35%", icon: "📈" },
      { label: "Page Load Time", value: "1.2s", icon: "⚡" },
      { label: "Customer Rating", value: "4.7/5", icon: "⭐" }
    ]
  },
  {
    id: 4,
    title: "Educational Management System",
    client: "State Education Board",
    category: "Education",
    completedDate: "October 2025",
    duration: "14 months",
    teamSize: 16,
    budget: "$720,000",
    rating: 5,
    technologies: ["React", "Python", "MySQL", "WebRTC", "Docker"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop",
    description: "Developed comprehensive education management system serving 2000+ schools with online classes, assessments, attendance tracking, and parent-teacher communication.",
    fullDescription: "A complete digital education ecosystem serving 2,000+ schools, 500,000 students, and 25,000 teachers. Features include live online classes with HD video streaming, interactive assessments, automated attendance tracking, gradebook management, parent-teacher communication, assignment submission, and progress analytics. The system revolutionized education delivery during the pandemic, ensuring continuity of learning with 95% student engagement rates.",
    achievements: ["2000+ Schools", "500K Students", "25K Teachers", "98% Satisfaction"],
    impact: "Enabled seamless digital education during pandemic, maintaining 95% student engagement.",
    challenges: [
      "Building reliable video streaming for 10,000+ concurrent users",
      "Ensuring accessibility in low-bandwidth areas",
      "Training 25,000+ teachers on new platform",
      "Creating engaging interactive content for different age groups"
    ],
    results: [
      "95% student engagement rate maintained",
      "98% satisfaction score from teachers and parents",
      "Zero learning disruption during pandemic",
      "40% improvement in student performance tracking",
      "80% reduction in administrative workload"
    ],
    clientTestimonial: {
      quote: "This platform saved our education system during the most challenging times. The ease of use and reliability made it possible for us to continue serving our students without interruption.",
      author: "Dr. Robert Williams",
      position: "Commissioner, State Education Board"
    },
    roi: "280% ROI through cost savings and improved learning outcomes",
    keyMetrics: [
      { label: "Students Served", value: "500K", icon: "🎓" },
      { label: "Live Classes/Day", value: "5000+", icon: "📹" },
      { label: "Engagement Rate", value: "95%", icon: "💯" },
      { label: "Satisfaction", value: "98%", icon: "😊" }
    ]
  },
  {
    id: 5,
    title: "Supply Chain Logistics Platform",
    client: "TransLog International",
    category: "Logistics",
    completedDate: "September 2025",
    duration: "11 months",
    teamSize: 13,
    budget: "$580,000",
    rating: 5,
    technologies: ["React", "Java", "PostgreSQL", "Kafka", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    description: "Created an intelligent supply chain platform with real-time tracking, route optimization, and predictive analytics for 1000+ delivery vehicles.",
    fullDescription: "An advanced supply chain logistics platform featuring GPS-based real-time tracking of 1,000+ vehicles, AI-powered route optimization, predictive maintenance alerts, automated dispatch, and comprehensive analytics dashboard. The system processes 50,000+ deliveries daily, reduces fuel consumption through intelligent routing, and provides complete visibility into the supply chain from warehouse to customer doorstep.",
    achievements: ["1000+ Vehicles", "50K Deliveries/Day", "30% Cost Reduction", "Real-time Tracking"],
    impact: "Optimized delivery routes saving $2M annually in fuel and operational costs.",
    challenges: [
      "Integrating GPS tracking across diverse vehicle types",
      "Building real-time route optimization for 1000+ vehicles",
      "Handling high-volume data from multiple sources",
      "Ensuring system reliability for time-critical deliveries"
    ],
    results: [
      "$2M annual savings in fuel costs",
      "30% reduction in delivery times",
      "95% on-time delivery rate achieved",
      "40% improvement in fleet utilization",
      "50,000+ successful deliveries daily"
    ],
    clientTestimonial: {
      quote: "The platform has transformed our logistics operations. The route optimization alone saves us millions per year, and our customers love the real-time tracking feature.",
      author: "David Thompson",
      position: "COO, TransLog International"
    },
    roi: "380% ROI through operational efficiency and cost reduction",
    keyMetrics: [
      { label: "Daily Deliveries", value: "50K+", icon: "🚚" },
      { label: "On-Time Rate", value: "95%", icon: "⏱️" },
      { label: "Cost Savings", value: "$2M/yr", icon: "💰" },
      { label: "Fleet Utilization", value: "+40%", icon: "📊" }
    ]
  },
  {
    id: 6,
    title: "Smart City Infrastructure Dashboard",
    client: "City Municipal Corporation",
    category: "Government",
    completedDate: "August 2025",
    duration: "15 months",
    teamSize: 20,
    budget: "$950,000",
    rating: 5,
    technologies: ["React", "Python", "PostgreSQL", "IoT", "GIS", "AWS"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
    description: "Implemented smart city dashboard monitoring traffic, utilities, waste management, and emergency services across the metropolitan area.",
    fullDescription: "A comprehensive smart city platform integrating 500+ IoT sensors monitoring traffic flow, air quality, water supply, waste management, street lighting, and emergency services. Features real-time dashboards, predictive analytics, automated alerts, citizen reporting portal, and integrated emergency response system. The platform provides city administrators with complete visibility and control over municipal operations.",
    achievements: ["500+ IoT Sensors", "24/7 Monitoring", "40% Response Time", "Smart Integration"],
    impact: "Improved city services efficiency by 55% and enhanced citizen satisfaction scores.",
    challenges: [
      "Integrating diverse IoT sensors and legacy systems",
      "Building reliable 24/7 monitoring infrastructure",
      "Processing massive real-time data streams",
      "Coordinating multiple city departments"
    ],
    results: [
      "55% improvement in service efficiency",
      "40% faster emergency response times",
      "30% reduction in energy consumption",
      "85% citizen satisfaction score",
      "24/7 continuous monitoring achieved"
    ],
    clientTestimonial: {
      quote: "This smart city platform has revolutionized how we manage our city. We can now respond to issues proactively and make data-driven decisions that benefit our citizens.",
      author: "Mayor Patricia Anderson",
      position: "Mayor, City Municipal Corporation"
    },
    roi: "320% ROI through operational savings and improved services",
    keyMetrics: [
      { label: "IoT Sensors", value: "500+", icon: "📡" },
      { label: "Uptime", value: "99.9%", icon: "🔧" },
      { label: "Response Time", value: "-40%", icon: "⚡" },
      { label: "Satisfaction", value: "85%", icon: "😊" }
    ]
  },
  {
    id: 7,
    title: "Corporate HR Management Suite",
    client: "MegaCorp Enterprises",
    category: "Enterprise",
    completedDate: "July 2025",
    duration: "9 months",
    teamSize: 11,
    budget: "$420,000",
    rating: 4,
    technologies: ["React", "Node.js", "MongoDB", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop",
    description: "Delivered complete HR management solution with recruitment, payroll, performance management, and employee self-service portal for 10,000+ employees.",
    fullDescription: "A comprehensive HR management suite serving 10,000+ employees with modules for recruitment, onboarding, payroll processing, performance management, leave management, benefits administration, and employee self-service portal. Features automated workflows, AI-powered candidate matching, integrated payroll processing, and advanced analytics for workforce planning and talent management.",
    achievements: ["10K+ Employees", "Automated Payroll", "50% Time Saved", "Cloud-Based"],
    impact: "Reduced HR administrative workload by 65% and improved employee satisfaction.",
    challenges: [
      "Migrating data for 10,000+ employees",
      "Automating complex payroll calculations",
      "Ensuring data privacy and compliance",
      "Training HR staff and employees on new system"
    ],
    results: [
      "65% reduction in HR administrative time",
      "50% faster recruitment process",
      "99.9% payroll accuracy achieved",
      "80% employee self-service adoption",
      "40% improvement in performance review completion"
    ],
    clientTestimonial: {
      quote: "This HR suite has streamlined our entire people management process. The time saved on administrative tasks allows our HR team to focus on strategic initiatives.",
      author: "Lisa Brown",
      position: "CHRO, MegaCorp Enterprises"
    },
    roi: "340% ROI through productivity gains and cost savings",
    keyMetrics: [
      { label: "Employees", value: "10K+", icon: "👥" },
      { label: "Time Saved", value: "65%", icon: "⏱️" },
      { label: "Accuracy", value: "99.9%", icon: "✅" },
      { label: "Adoption", value: "80%", icon: "📈" }
    ]
  },
  {
    id: 8,
    title: "Telemedicine Consultation Platform",
    client: "HealthConnect Inc.",
    category: "Healthcare",
    completedDate: "June 2025",
    duration: "7 months",
    teamSize: 10,
    budget: "$380,000",
    rating: 5,
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    description: "Built secure telemedicine platform enabling video consultations, e-prescriptions, and digital health records for 200+ doctors and 50K+ patients.",
    fullDescription: "A HIPAA-compliant telemedicine platform enabling secure video consultations, e-prescriptions, digital health records, appointment scheduling, and patient monitoring. The platform connects 200+ doctors with 50,000+ patients, supports multi-specialty consultations, integrated payment processing, and provides complete medical history tracking. Features HD video calls, secure messaging, and automated follow-up reminders.",
    achievements: ["200+ Doctors", "50K Patients", "15K Consultations", "HIPAA Compliant"],
    impact: "Provided healthcare access to rural areas, serving 30K+ patients remotely.",
    challenges: [
      "Ensuring HIPAA compliance for video consultations",
      "Building reliable video streaming for healthcare",
      "Integrating with pharmacy systems for e-prescriptions",
      "Securing sensitive medical information"
    ],
    results: [
      "30K+ rural patients served",
      "15,000 consultations completed",
      "95% patient satisfaction rate",
      "60% reduction in wait times",
      "Zero security incidents or HIPAA violations"
    ],
    clientTestimonial: {
      quote: "This platform has democratized healthcare access. Patients in remote areas can now consult with specialists without traveling hundreds of miles. It's truly life-changing.",
      author: "Dr. Emily Rodriguez",
      position: "Medical Director, HealthConnect Inc."
    },
    roi: "290% ROI through increased patient reach and operational efficiency",
    keyMetrics: [
      { label: "Consultations", value: "15K", icon: "👨‍⚕️" },
      { label: "Patients Served", value: "50K+", icon: "🏥" },
      { label: "Satisfaction", value: "95%", icon: "⭐" },
      { label: "Compliance", value: "100%", icon: "🔒" }
    ]
  }
];

export default function CompletedProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the project by ID
  const project = completedProjectsData.find(p => p.id === parseInt(id));

  // If project not found, show error
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects/completed")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Back to Completed Projects
          </button>
        </div>
      </div>
    );
  }

  const getRatingStars = (rating) => {
    return Array(rating).fill("⭐").join("");
  };

  const getRatingColor = (rating) => {
    if (rating === 5) return "bg-green-100 text-green-700 border-green-300";
    if (rating === 4) return "bg-blue-100 text-blue-700 border-blue-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section with Project Image */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-green-900/80 to-emerald-900/90"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            {/* Back Button */}
            <button
              onClick={() => navigate("/projects/completed")}
              className="mb-6 flex items-center gap-2 text-white hover:text-green-300 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Completed Projects</span>
            </button>

            {/* Title and Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-green-500/20 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full text-sm font-bold border border-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border backdrop-blur-sm ${getRatingColor(project.rating)}`}>
                {getRatingStars(project.rating)} {project.rating}/5
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
              {project.title}
            </h1>
            
            <p className="text-xl text-green-200 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {project.client}
            </p>

            {/* Success Badge */}
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <p className="text-green-300 font-bold text-lg">{project.impact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Calendar className="w-10 h-10 text-green-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Completed</p>
            <p className="text-xl font-bold text-slate-900">{project.completedDate}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Clock className="w-10 h-10 text-blue-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Duration</p>
            <p className="text-xl font-bold text-slate-900">{project.duration}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <Users className="w-10 h-10 text-primary mb-3" />
            <p className="text-sm text-slate-600 mb-1">Team Size</p>
            <p className="text-xl font-bold text-slate-900">{project.teamSize} Members</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <DollarSign className="w-10 h-10 text-emerald-600 mb-3" />
            <p className="text-sm text-slate-600 mb-1">Budget</p>
            <p className="text-xl font-bold text-slate-900">{project.budget}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Project Overview
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg mb-4">
                {project.fullDescription}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-800 font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Key Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-bold text-lg">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges Overcome */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Challenges Overcome
              </h2>
              <div className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Achieved */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                Measurable Results
              </h2>
              <div className="space-y-3">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
              <p className="text-blue-100 text-lg italic mb-6 leading-relaxed">
                "{project.clientTestimonial.quote}"
              </p>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-lg">{project.clientTestimonial.author}</p>
                <p className="text-blue-200">{project.clientTestimonial.position}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            
            {/* Key Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Metrics</h3>
              <div className="space-y-4">
                {project.keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{metric.icon}</span>
                      <span className="text-2xl font-bold text-green-600">{metric.value}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* ROI */}
              <div className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
                <h4 className="text-lg font-bold mb-2">Return on Investment</h4>
                <p className="text-3xl font-black">{project.roi}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Ready for Your Project?</h3>
              <p className="text-purple-100 mb-6">
                Let's discuss how we can deliver similar results for your organization.
              </p>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all shadow-lg">
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
