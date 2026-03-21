import React, { useState } from 'react';
import { Cpu, Cloud, Link, Wifi, Shield, Rocket, Brain, Package, Database, MessageSquare, Code, ChevronRight, ArrowRight, Sparkles, TrendingUp, Users, Target, FileCode, Anchor } from 'lucide-react';
import invo from '../../assets/invo.jpg';
const Innovation = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  const innovationPillars = [
    {
      id: 1,
      icon: 'cpu',
      title: 'Artificial Intelligence',
      description: 'Leveraging AI and machine learning to create intelligent solutions that learn, adapt, and improve continuously.',
      features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics']
    },
    {
      id: 2,
      icon: 'cloud',
      title: 'Cloud Computing',
      description: 'Building scalable, secure, and cost-effective cloud-native applications on AWS, Azure, and GCP.',
      features: ['Microservices', 'Serverless Architecture', 'Multi-cloud Strategy', 'Infrastructure as Code']
    },
    {
      id: 3,
      icon: 'link',
      title: 'Blockchain',
      description: 'Developing secure, transparent, and decentralized solutions using blockchain technology.',
      features: ['Smart Contracts', 'Distributed Ledgers', 'Cryptocurrency Integration', 'Web3 Solutions']
    },
    {
      id: 4,
      icon: 'wifi',
      title: 'IoT & Edge Computing',
      description: 'Connecting devices and processing data at the edge for real-time insights and intelligent automation.',
      features: ['Smart Devices', 'Real-time Data Processing', 'Edge AI', 'Sensor Integration']
    },
    {
      id: 5,
      icon: 'shield',
      title: 'Cybersecurity',
      description: 'Implementing advanced security measures to protect data and systems from evolving threats.',
      features: ['Zero Trust Architecture', 'Threat Detection', 'Data Encryption', 'Compliance Management']
    },
    {
      id: 6,
      icon: 'rocket',
      title: 'Quantum Computing',
      description: 'Exploring quantum computing capabilities for solving complex computational problems.',
      features: ['Quantum Algorithms', 'Quantum Simulation', 'Future-Ready Architecture', 'R&D Partnership']
    }
  ];

  const technologies = [
    { name: 'TensorFlow', category: 'AI/ML', icon: 'brain', color: 'from-orange-400 to-red-500' },
    { name: 'Kubernetes', category: 'Cloud', icon: 'cloud', color: 'from-blue-400 to-blue-600' },
    { name: 'Ethereum', category: 'Blockchain', icon: 'link', color: 'from-purple-400 to-purple-600' },
    { name: 'Python', category: 'Language', icon: 'code', color: 'from-blue-400 to-yellow-400' },
    { name: 'React', category: 'Frontend', icon: 'cpu', color: 'from-cyan-400 to-blue-500' },
    { name: 'Docker', category: 'DevOps', icon: 'package', color: 'from-blue-400 to-cyan-500' },
    { name: 'AWS', category: 'Cloud', icon: 'cloud', color: 'from-yellow-400 to-orange-500' },
    { name: 'GraphQL', category: 'API', icon: 'database', color: 'from-pink-400 to-purple-500' },
    { name: 'MongoDB', category: 'Database', icon: 'database', color: 'from-green-400 to-emerald-600' },
    { name: 'RabbitMQ', category: 'Messaging', icon: 'messageSquare', color: 'from-orange-400 to-red-500' },
    { name: 'Solidity', category: 'Blockchain', icon: 'fileCode', color: 'from-gray-600 to-gray-800' },
    { name: 'Rust', category: 'Language', icon: 'anchor', color: 'from-orange-600 to-red-600' }
  ];

  const innovationProjects = [
    {
      id: 1,
      title: 'AI-Powered Healthcare Diagnosis',
      description: 'Developed an AI system that analyzes medical imaging to detect diseases with 99% accuracy, helping radiologists make better decisions.',
      technologies: ['TensorFlow', 'Python', 'Deep Learning'],
      impact: 'Helped 50,000+ patients worldwide',
      status: 'Live'
    },
    {
      id: 2,
      title: 'Blockchain Supply Chain',
      description: 'Created a transparent supply chain tracking system using blockchain, ensuring product authenticity and reducing counterfeits by 95%.',
      technologies: ['Ethereum', 'Solidity', 'Web3'],
      impact: '$50M+ in counterfeit goods prevented',
      status: 'Live'
    },
    {
      id: 3,
      title: 'IoT Smart City Platform',
      description: 'Built an intelligent city platform connecting millions of IoT devices for traffic management, energy optimization, and public safety.',
      technologies: ['IoT', 'Edge Computing', 'AWS'],
      impact: '30% reduction in traffic congestion',
      status: 'Live'
    },
    {
      id: 4,
      title: 'Quantum Machine Learning',
      description: 'Pioneering research in quantum machine learning algorithms for optimization problems that classical computers cannot solve efficiently.',
      technologies: ['Quantum Computing', 'Python', 'QML Frameworks'],
      impact: '1000x faster computation for specific problems',
      status: 'In Development'
    },
    {
      id: 5,
      title: 'Real-time Cybersecurity AI',
      description: 'Developed an AI-powered cybersecurity system that detects and responds to threats in real-time, reducing response time from hours to seconds.',
      technologies: ['AI/ML', 'Cloud Security', 'Threat Detection'],
      impact: '99.8% threat detection rate',
      status: 'Live'
    },
    {
      id: 6,
      title: 'Autonomous Robotics System',
      description: 'Created an autonomous robotics system with computer vision and AI for warehouse automation and industrial applications.',
      technologies: ['Computer Vision', 'Robotics', 'Deep Learning'],
      impact: '80% increase in warehouse efficiency',
      status: 'Live'
    }
  ];

  const innovationProcess = [
    {
      step: '01',
      title: 'Ideation',
      description: 'We brainstorm and research emerging technologies to identify opportunities for innovation and solve real-world problems.'
    },
    {
      step: '02',
      title: 'Prototyping',
      description: 'Rapid prototyping and experimentation to validate ideas and test feasibility of innovative solutions.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Building robust, scalable solutions using cutting-edge technologies and best practices in software engineering.'
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Rigorous testing and quality assurance to ensure reliability, performance, and security of innovative products.'
    },
    {
      step: '05',
      title: 'Deployment',
      description: 'Launching solutions to production with continuous monitoring and optimization for maximum impact.'
    },
    {
      step: '06',
      title: 'Evolution',
      description: 'Continuously improving and evolving solutions based on user feedback and emerging technologies.'
    }
  ];

  const innovationStats = [
    { number: '50+', label: 'Patent Applications', color: 'from-blue-500 to-cyan-500' },
    { number: '30+', label: 'Innovation Labs', color: 'from-purple-500 to-pink-500' },
    { number: '200+', label: 'R&D Engineers', color: 'from-green-500 to-emerald-500' },
    { number: '$50M+', label: 'Annual R&D Budget', color: 'from-orange-500 to-red-500' },
    { number: '100+', label: 'Active Projects', color: 'from-indigo-500 to-blue-500' },
    { number: '15+', label: 'Technology Partners', color: 'from-rose-500 to-pink-500' }
  ];

  const innovationTeam = [
    { role: 'Chief Innovation Officer', experience: '20+ years in Tech Innovation', focus: 'Strategy & Direction' },
    { role: 'AI/ML Research Lead', experience: '15+ years in AI/ML', focus: 'Artificial Intelligence' },
    { role: 'Cloud Architecture Lead', experience: '18+ years in Cloud Tech', focus: 'Cloud Solutions' },
    { role: 'Blockchain Specialist', experience: '8+ years in Blockchain', focus: 'Distributed Systems' }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden mb-16 md:mb-20" style={{ backgroundImage: `url(${invo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-5xl mx-auto">
          {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Innovation Hub</span> */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 md:mb-6 drop-shadow-2xl tracking-wide">Innovation at Our Core</h1>
          <p className="text-xl md:text-2xl font-light mb-8 drop-shadow-lg tracking-wide">Pioneering Tomorrow's Solutions Today</p>
          <div className="flex gap-3 md:gap-5 justify-center flex-wrap">
            <button className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span>Explore Innovations</span>
              <Rocket className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-3 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wide rounded-lg shadow-lg hover:bg-white hover:text-blue-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <span>Join Innovation Lab</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Innovation Pillars Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">Innovation Pillars</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-4 drop-shadow-lg">Our Innovation Pillars</h2>
            <p className="text-gray-600 text-lg mt-6">Six core technology areas driving our innovation forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovationPillars.map((pillar) => {
              const IconComponent = pillar.icon === 'cpu' ? Cpu : pillar.icon === 'cloud' ? Cloud : pillar.icon === 'link' ? Link : pillar.icon === 'wifi' ? Wifi : pillar.icon === 'shield' ? Shield : Rocket;
              return (
                <div
                  key={pillar.id}
                  onMouseEnter={() => setHoveredCard('pillar-' + pillar.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-3 border-l-4 border-blue-600 group"
                >
                  <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-3 transition-colors duration-300 group-hover:text-cyan-500">{pillar.title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-4">{pillar.description}</p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600 space-y-1">
                      {pillar.features.map((feature, idx) => (
                        <p key={idx} className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">Tech Stack</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-4 drop-shadow-lg">Technologies We Use</h2>
            <p className="text-gray-600 text-lg mt-6">Leveraging the best tools and frameworks for innovation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon === 'brain' ? Brain : tech.icon === 'cloud' ? Cloud : tech.icon === 'link' ? Link : tech.icon === 'code' ? Code : tech.icon === 'cpu' ? Cpu : tech.icon === 'package' ? Package : tech.icon === 'database' ? Database : tech.icon === 'messageSquare' ? MessageSquare : tech.icon === 'fileCode' ? FileCode : Anchor;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="group cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${tech.color} rounded-2xl p-8 text-center transition-all duration-400 hover:-translate-y-4 hover:shadow-2xl`}>
                    <div className="flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-125">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg transition-all duration-300">{tech.name}</h3>
                    <p className="text-white text-opacity-75 text-xs mt-2 transition-all duration-300 opacity-0 group-hover:opacity-100">{tech.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Projects Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">Our Projects</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-4 drop-shadow-lg">Our Innovation Projects</h2>
            <p className="text-gray-600 text-lg mt-6">Real projects transforming industries and solving global challenges</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {innovationProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setExpandedProject(project.id)}
                onMouseLeave={() => setExpandedProject(null)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-3 border-t-4 border-blue-600 group"
              >
                <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500 transform group-hover:h-2 transition-all duration-300" />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-blue-600 flex-1">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${project.status === 'Live' ? 'bg-green-500' : 'bg-orange-500'}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full hover:bg-blue-200 transition-colors duration-300 cursor-pointer">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Impact:</p>
                      <p className="text-lg font-bold text-cyan-500">{project.impact}</p>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Process Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">Our Process</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-4 drop-shadow-lg">Our Innovation Process</h2>
            <p className="text-gray-600 text-lg mt-6">A structured approach to bringing innovative ideas to life</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovationProcess.map((process, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur" />
                <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 group-hover:border-blue-600 transition-all duration-400">
                  <div className="text-5xl font-black text-blue-600 mb-4 group-hover:text-cyan-500 transition-colors duration-300">{process.step}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{process.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Flow Arrow */}
          <div className="mt-8 hidden lg:flex justify-between items-center text-3xl text-blue-600 opacity-30">
            <div>→</div>
            <div>→</div>
            <div>→</div>
            <div>→</div>
            <div>→</div>
          </div>
        </div>
      </section>

      {/* Innovation Stats Section */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-108"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop')`,
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-blue-900 opacity-75 transition-all duration-400 hover:opacity-85 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">Impact Metrics</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-2xl">Our Innovation Impact</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {innovationStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-3 group`}
              >
                <div className="text-4xl md:text-5xl font-black text-white transition-transform duration-300 group-hover:scale-125 mb-2">{stat.number}</div>
                <p className="text-white font-bold text-sm md:text-base transition-all duration-300 group-hover:tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Team Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-bold uppercase tracking-wider mb-4">Our Team</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-4 drop-shadow-lg">Innovation Team</h2>
            <p className="text-gray-600 text-lg mt-6">World-class leaders driving innovation across different technological domains</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovationTeam.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-4 border-t-4 border-blue-600 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-600 mb-2 group-hover:text-cyan-500 transition-colors duration-300">{member.role}</h3>
                <p className="text-gray-700 text-sm mb-3">{member.experience}</p>
                <div className="flex-1">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">{member.focus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">Future Vision</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 mb-4 drop-shadow-lg">Our Vision for Innovation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">1</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Quantum Computing Breakthrough</h3>
                  <p className="text-gray-700">Developing quantum algorithms that solve problems currently unsolvable by classical computers.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">2</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">AI for Social Good</h3>
                  <p className="text-gray-700">Creating AI solutions to address climate change, healthcare access, and poverty.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">3</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Decentralized Web (Web3)</h3>
                  <p className="text-gray-700">Building the infrastructure for a decentralized, user-centric internet.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">4</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Autonomous Systems</h3>
                  <p className="text-gray-700">Advancing autonomous robotics and vehicles for safer, smarter transportation.</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop" 
                alt="Future Innovation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-108"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop')`,
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 opacity-75 transition-all duration-400 hover:opacity-85 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wide drop-shadow-lg">Join Our Innovation Journey</h2>
          <p className="text-lg md:text-xl text-white text-opacity-95 mb-10 tracking-wide">Be part of a team that's shaping the future of technology and solving global challenges</p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold uppercase tracking-widest rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span>Explore Opportunities</span>
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent border-3 border-white text-white font-bold uppercase tracking-widest rounded-lg shadow-lg hover:bg-white hover:text-blue-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <span>Contact Innovation Lab</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Innovation;