const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect: auth } = require('../middleware/auth');

const seedData = [
  {
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

// GET: Fetch all testimonials (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let items = await Testimonial.find().sort({ _id: -1 });

    if (items.length === 0) {
      await Testimonial.insertMany(seedData);
      items = await Testimonial.find().sort({ _id: -1 });
    }

    const mapped = items.map(item => ({
      ...item._doc,
      id: item._id.toString()
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET: Fetch a single testimonial
router.get('/:id', async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json({
      ...item._doc,
      id: item._id.toString()
    });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST: Add a new testimonial
router.post('/', auth, async (req, res) => {
  try {
    const item = new Testimonial(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT: Update testimonial
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json(item);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE: Remove testimonial
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Testimonial not found" });
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
