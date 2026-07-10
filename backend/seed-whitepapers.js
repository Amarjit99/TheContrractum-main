const mongoose = require('mongoose');
require('dotenv').config();

const Whitepaper = require('./models/Whitepaper');

const whitepapers = [
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2026",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2026",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  },
  {
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
    year: "2025",
    pdfUrl: "/pdf/Telecom.pdf"
  }
];

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is not defined in env');
    process.exit(1);
  }
  
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  // Clear existing whitepapers
  await Whitepaper.deleteMany({});
  console.log('Cleared old whitepapers');

  // Seed whitepapers
  const result = await Whitepaper.insertMany(whitepapers);
  console.log(`Seeded ${result.length} whitepapers successfully!`);

  await mongoose.disconnect();
  console.log('Database disconnected');
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
