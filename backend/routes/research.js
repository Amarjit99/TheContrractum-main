const express = require('express');
const router = express.Router();
const Research = require('../models/Research');
const { protect: auth } = require('../middleware/auth');

const seedData = [
  {
    id: 1,
    title: "Advanced AI for Medical Diagnosis: Deep Learning Models for Early Disease Detection",
    category: "Artificial Intelligence",
    status: "Published",
    startDate: "2024-03",
    completionDate: "2025-11",
    team: ["Dr. Emily Chen", "Dr. Rajesh Kumar", "Dr. Sarah Williams"],
    collaborators: ["MIT Medical Research", "National Health Institute"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    description: "Developing next-generation deep learning algorithms to detect diseases from medical imaging with unprecedented accuracy. Our research focuses on early detection of cancers, neurological disorders, and cardiovascular diseases.",
    keyFindings: [
      "97.3% accuracy in early cancer detection",
      "Reduced false positives by 65%",
      "Processing time reduced from hours to minutes",
      "Successfully deployed in 50+ hospitals"
    ],
    publications: [
      "Published in Nature Medicine (Impact Factor: 87.2)",
      "Presented at ICML 2025 Conference",
      "3 peer-reviewed journal articles"
    ],
    patents: ["AI-Powered Medical Imaging Analysis System (US Patent 12,345,678)"],
    technologies: ["TensorFlow", "PyTorch", "Computer Vision", "CNN", "ResNet"],
    impact: "Our AI models are now being used to diagnose 100,000+ patients monthly across multiple countries, with a 40% improvement in early disease detection rates.",
    citation: "Chen et al. (2025). 'Advanced Deep Learning for Medical Diagnosis', Nature Medicine, 31(4), 1234-1250.",
    featured: true,
    fundingAmount: "$2.5M"
  },
  {
    id: 2,
    title: "Blockchain-Based Secure Supply Chain Verification System",
    category: "Blockchain",
    status: "Patent Pending",
    startDate: "2024-06",
    completionDate: "2026-01",
    team: ["Dr. Michael Zhang", "Dr. Priya Sharma", "Dr. James Wilson"],
    collaborators: ["Stanford Research Center", "Global Logistics Council"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    description: "A revolutionary blockchain framework ensuring complete transparency and traceability in global supply chains. Prevents counterfeiting, ensures product authenticity, and provides real-time verification at every stage.",
    keyFindings: [
      "99.9% reduction in counterfeit products",
      "Real-time verification across 100+ countries",
      "Transaction processing in under 3 seconds",
      "Adopted by Fortune 500 companies"
    ],
    publications: [
      "IEEE Blockchain Conference 2025 - Best Paper Award",
      "Published in Journal of Distributed Ledger Technology",
      "2 international conference presentations"
    ],
    patents: ["Distributed Blockchain Verification System (Patent Pending)"],
    technologies: ["Ethereum", "Solidity", "Hyperledger", "Smart Contracts", "IPFS"],
    impact: "Successfully implemented in supply chains managing $5B+ in goods annually, preventing millions in losses from counterfeit products.",
    citation: "Zhang et al. (2026). 'Blockchain for Supply Chain Integrity', IEEE Transactions on Industrial Informatics.",
    featured: true,
    fundingAmount: "$3.2M"
  },
  {
    id: 3,
    title: "Quantum-Resistant Cryptography for Post-Quantum Security",
    category: "Cybersecurity",
    status: "Ongoing",
    startDate: "2025-01",
    completionDate: null,
    team: ["Dr. Alan Turing Jr.", "Dr. Ada Lovelace", "Dr. Grace Hopper"],
    collaborators: ["MIT CSAIL", "NSA Cybersecurity Division", "European Research Council"],
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=600&fit=crop",
    description: "Developing advanced cryptographic algorithms resistant to quantum computing attacks. As quantum computers advance, current encryption methods will become vulnerable. Our research ensures data security in the quantum era.",
    keyFindings: [
      "Created 3 new cryptographic algorithms",
      "Successfully tested against quantum simulators",
      "Performance overhead less than 5%",
      "Backward compatible with existing systems"
    ],
    publications: [
      "Submitted to ACM Conference on Computer and Communications Security",
      "Preprint available on arXiv (10,000+ views)"
    ],
    patents: ["Novel Lattice-Based Encryption Method (Patent Application Filed)"],
    technologies: ["Python", "C++", "Lattice Cryptography", "Post-Quantum Algorithms", "Quantum Computing"],
    impact: "This research will protect critical infrastructure, financial systems, and government communications from quantum threats. Estimated to secure $100T+ in global digital assets.",
    citation: "Turing Jr. et al. (2025). 'Quantum-Resistant Cryptography: A New Paradigm', arXiv:2501.12345.",
    featured: false,
    fundingAmount: "$4.8M"
  },
  {
    id: 4,
    title: "Edge AI: Real-Time Machine Learning on IoT Devices",
    category: "IoT & Edge Computing",
    status: "Published",
    startDate: "2024-02",
    completionDate: "2025-09",
    team: ["Dr. Kevin Lee", "Dr. Sofia Rodriguez", "Dr. Akash Patel"],
    collaborators: ["Carnegie Mellon University", "Intel Research Labs"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    description: "Optimizing machine learning models to run efficiently on resource-constrained IoT devices without cloud connectivity. Enables real-time AI processing in remote locations, smart homes, and industrial settings.",
    keyFindings: [
      "95% model size reduction with minimal accuracy loss",
      "Real-time inference on devices with <1W power",
      "Deployed on 1M+ IoT devices globally",
      "Operates in fully offline mode"
    ],
    publications: [
      "Published in ACM Transactions on Embedded Computing Systems",
      "Presented at IoT Conference 2025 (keynote)",
      "Featured in IEEE Spectrum Magazine"
    ],
    patents: ["Lightweight Neural Network Compression Method (US Patent 12,456,789)"],
    technologies: ["TensorFlow Lite", "Edge TPU", "Model Quantization", "Neural Network Pruning", "ARM"],
    impact: "Enabling AI capabilities in billions of IoT devices worldwide, from smart agriculture sensors to wearable health monitors, without requiring internet connectivity.",
    citation: "Lee et al. (2025). 'Edge AI: Bringing Intelligence to the Edge', ACM TECS, 24(3), 45-67.",
    featured: true,
    fundingAmount: "$1.8M"
  },
  {
    id: 5,
    title: "Autonomous Drone Swarm Coordination using Multi-Agent Reinforcement Learning",
    category: "Robotics & AI",
    status: "Published",
    startDate: "2023-08",
    completionDate: "2025-06",
    team: ["Dr. Maria Santos", "Dr. Yuki Tanaka", "Dr. Omar Hassan"],
    collaborators: ["NASA Ames Research", "Boston Dynamics", "Defense Research Agency"],
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=600&fit=crop",
    description: "Developing algorithms for coordinated autonomous drone swarms capable of complex missions including search-and-rescue, disaster response, environmental monitoring, and large-area surveillance without human intervention.",
    keyFindings: [
      "100+ drones coordinated simultaneously",
      "99.2% mission success rate",
      "Real-time adaptation to changing environments",
      "Communication range extended by 300%"
    ],
    publications: [
      "Published in Science Robotics (Cover Article)",
      "IEEE Robotics and Automation Award 2025",
      "5 peer-reviewed publications"
    ],
    patents: [
      "Distributed Swarm Intelligence Algorithm (US Patent 12,567,890)",
      "Fault-Tolerant Drone Communication Protocol (Patent Granted)"
    ],
    technologies: ["Python", "ROS", "Multi-Agent RL", "Computer Vision", "Distributed Systems"],
    impact: "Used in 200+ search-and-rescue operations, saving over 500 lives. Deployed for disaster assessment, reducing response time by 80%.",
    citation: "Santos et al. (2025). 'Autonomous Swarm Intelligence', Science Robotics, 10(42), eabc1234.",
    featured: false,
    fundingAmount: "$5.5M"
  },
  {
    id: 6,
    title: "Green Cloud Computing: Energy-Efficient Data Center Optimization",
    category: "Cloud Computing",
    status: "Ongoing",
    startDate: "2024-10",
    completionDate: null,
    team: ["Dr. Emma Green", "Dr. Carlos Martinez", "Dr. Aisha Khan"],
    collaborators: ["Google Cloud Research", "Amazon AWS Labs", "Green Computing Initiative"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    description: "Researching AI-powered optimization techniques to reduce data center energy consumption by 60% while maintaining performance. Focus on dynamic workload distribution, cooling optimization, and renewable energy integration.",
    keyFindings: [
      "60% reduction in energy consumption",
      "40% decrease in carbon footprint",
      "AI-powered predictive cooling saves 30% additional energy",
      "Implemented in 10 major data centers"
    ],
    publications: [
      "Submitted to ACM SIGCOMM 2026",
      "Technical report published (500+ citations)",
      "Presented at Green Computing Summit"
    ],
    patents: ["AI-Based Data Center Energy Management (Patent Filed)"],
    technologies: ["Kubernetes", "TensorFlow", "RL Optimization", "Energy Modeling", "Python"],
    impact: "If adopted globally, could save 100TWh annually (equivalent to powering 10M homes) and reduce data center CO2 emissions by 50 million tons per year.",
    citation: "Green et al. (2025). 'Sustainable Cloud Infrastructure', Technical Report TR-2025-42, TheContractum Research.",
    featured: true,
    fundingAmount: "$3.7M"
  },
  {
    id: 7,
    title: "Natural Language Processing for Low-Resource Languages",
    category: "Natural Language Processing",
    status: "Published",
    startDate: "2024-01",
    completionDate: "2025-10",
    team: ["Dr. Lina Chen", "Dr. Ahmed Ali", "Dr. Sophie Dubois"],
    collaborators: ["Oxford NLP Lab", "UNESCO", "Microsoft Research Asia"],
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=600&fit=crop",
    description: "Creating advanced NLP models for 50+ low-resource languages with limited training data. Enabling machine translation, sentiment analysis, and text generation for languages spoken by billions but underrepresented in AI.",
    keyFindings: [
      "Developed models for 52 languages",
      "Translation accuracy improved by 43%",
      "Works with 1000x less training data",
      "Open-sourced for global research community"
    ],
    publications: [
      "Published in ACL 2025 (Outstanding Paper Award)",
      "Proceedings of EMNLP 2025",
      "Featured in Nature Language Technology"
    ],
    patents: ["Cross-Lingual Transfer Learning Architecture (Patent Pending)"],
    technologies: ["Transformers", "BERT", "Transfer Learning", "Multi-lingual Models", "PyTorch"],
    impact: "Breaking down language barriers for 2B+ speakers of underrepresented languages, enabling access to digital services, education, and information previously unavailable.",
    citation: "Chen et al. (2025). 'Democratizing NLP for Low-Resource Languages', ACL 2025, pp. 1234-1250.",
    featured: false,
    fundingAmount: "$2.1M"
  },
  {
    id: 8,
    title: "Augmented Reality for Surgical Precision and Medical Training",
    category: "AR/VR & Healthcare",
    status: "Patent Pending",
    startDate: "2024-04",
    completionDate: "2025-12",
    team: ["Dr. Robert Taylor", "Dr. Jennifer Park", "Dr. Marco Rossi"],
    collaborators: ["Johns Hopkins Medical School", "Mayo Clinic", "HoloLens Research"],
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&h=600&fit=crop",
    description: "Revolutionary AR system providing surgeons with real-time 3D visualization of patient anatomy, vital signs, and AI-powered guidance during operations. Also used for immersive medical student training.",
    keyFindings: [
      "35% reduction in surgical errors",
      "50% faster surgeon training time",
      "Used in 5000+ surgeries successfully",
      "95% surgeon satisfaction rate"
    ],
    publications: [
      "Published in Journal of Medical Robotics Research",
      "Presented at American College of Surgeons Conference",
      "Featured in JAMA Surgery"
    ],
    patents: [
      "AR-Guided Surgical Navigation System (Patent Pending)",
      "Holographic Medical Training Platform (Patent Filed)"
    ],
    technologies: ["Unity", "HoloLens", "3D Reconstruction", "Real-time Rendering", "Computer Vision"],
    impact: "Transforming surgical education and practice globally. Projected to improve outcomes for 1M+ surgeries annually while training the next generation of surgeons more effectively.",
    citation: "Taylor et al. (2025). 'Augmented Reality in Modern Surgery', Journal of Medical Robotics, 12(4), 567-589.",
    featured: false,
    fundingAmount: "$4.2M"
  }
];

// GET: Fetch all research projects (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let items = await Research.find().sort({ _id: -1 });

    if (items.length === 0) {
      await Research.insertMany(seedData);
      items = await Research.find().sort({ _id: -1 });
    }

    const mapped = items.map(item => ({
      ...item._doc,
      id: item._id.toString()
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Error fetching research projects:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET: Fetch a single research project
router.get('/:id', async (req, res) => {
  try {
    const item = await Research.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Research project not found" });
    res.json({
      ...item._doc,
      id: item._id.toString()
    });
  } catch (error) {
    console.error("Error fetching research project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST: Add a new research project
router.post('/', auth, async (req, res) => {
  try {
    const item = new Research(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error("Error adding research project:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT: Update research project
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Research project not found" });
    res.json(item);
  } catch (error) {
    console.error("Error updating research project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE: Remove research project
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Research.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Research project not found" });
    res.json({ message: "Research project deleted successfully" });
  } catch (error) {
    console.error("Error deleting research project:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

