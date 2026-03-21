import React, { useState } from 'react';
import { Zap, Globe, Shield, TrendingUp, RotateCw, DollarSign, Building2, Package, Database, Eye, FileText, Target, Settings, CheckCircle, BarChart, Layers, Server, ArrowRight, Star, Plus, ArrowLeftRight, Palette, Grid3x3 } from 'lucide-react';
import ScalabilityBg from '../../assets/success.webp';

const Scalability = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedTab, setSelectedTab] = useState('infrastructure');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Data structures
  const scalabilityFeatures = [
    { id: 1, icon: 'zap', title: 'Lightning Fast', desc: 'Sub-100ms response times', detail: 'Optimized database queries and distributed caching' },
    { id: 2, icon: 'globe', title: 'Global Reach', desc: 'Deploy worldwide', detail: 'Multi-region cloud infrastructure' },
    { id: 3, icon: 'shield', title: 'Enterprise Secure', desc: 'Bank-level security', detail: 'End-to-end encryption and compliance' },
    { id: 4, icon: 'barChart', title: 'Real-time Analytics', desc: 'Instant insights', detail: 'Live dashboards and predictive analytics' },
    { id: 5, icon: 'rotateCw', title: 'Auto-Scaling', desc: 'Elastic capacity', detail: 'Automatic resource adjustment based on demand' },
    { id: 6, icon: 'dollarSign', title: 'Cost Optimized', desc: '70% cost savings', detail: 'Pay-as-you-grow pricing model' }
  ];

  const pillars = [
    { id: 1, icon: 'building2', title: 'Infrastructure', color: 'from-blue-500 to-cyan-500', points: ['Cloud Native', 'Containerized', 'Serverless', 'Microservices'] },
    { id: 2, icon: 'package', title: 'Application', color: 'from-purple-500 to-pink-500', points: ['Load Balancing', 'API Gateway', 'Service Mesh', 'Circuit Breaker'] },
    { id: 3, icon: 'database', title: 'Data', color: 'from-orange-500 to-red-500', points: ['Sharding', 'Replication', 'Partitioning', 'Caching'] },
    { id: 4, icon: 'eye', title: 'Monitoring', color: 'from-green-500 to-emerald-500', points: ['Observability', 'Metrics', 'Alerts', 'Dashboards'] },
  ];

  const implementationSteps = [
    { step: '01', title: 'Assessment', desc: 'Analyze current architecture and identify bottlenecks', icon: 'fileText' },
    { step: '02', title: 'Planning', desc: 'Design scalable architecture with best practices', icon: 'target' },
    { step: '03', title: 'Implementation', desc: 'Build and deploy microservices infrastructure', icon: 'settings' },
    { step: '04', title: 'Testing', desc: 'Load testing and performance optimization', icon: 'checkCircle' },
    { step: '05', title: 'Monitoring', desc: 'Deploy monitoring and alerting systems', icon: 'barChart' },
    { step: '06', title: 'Optimization', desc: 'Continuous improvement and scaling', icon: 'trendingUp' }
  ];

  const successMetrics = [
    { metric: '5B+', label: 'API Calls/Day', color: 'from-red-400 to-pink-500' },
    { metric: '99.99%', label: 'Uptime SLA', color: 'from-green-400 to-emerald-500' },
    { metric: '<50ms', label: 'Avg Latency', color: 'from-blue-400 to-cyan-500' },
    { metric: '1M+', label: 'Concurrent Users', color: 'from-purple-400 to-indigo-500' },
    { metric: '500TB', label: 'Data Processed', color: 'from-yellow-400 to-orange-500' },
    { metric: '10x', label: 'Performance Gain', color: 'from-indigo-400 to-blue-500' }
  ];

  const architectureLayers = [
    { layer: 'Presentation', icon: 'palette', desc: 'CDN, Static Assets, Web Servers', color: 'bg-blue-100 border-blue-600' },
    { layer: 'API Gateway', icon: 'layers', desc: 'Load Balancing, Rate Limiting, Auth', color: 'bg-purple-100 border-purple-600' },
    { layer: 'Microservices', icon: 'grid3x3', desc: 'Independent Services, Service Discovery', color: 'bg-green-100 border-green-600' },
    { layer: 'Data', icon: 'server', desc: 'Databases, Cache, Message Queues', color: 'bg-orange-100 border-orange-600' }
  ];

  const scalingStrategies = [
    { strategy: 'Horizontal', icon: 'arrowLeftRight', desc: 'Add more servers', benefit: 'Linear scalability', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300' },
    { strategy: 'Vertical', icon: 'trendingUp', desc: 'Upgrade existing servers', benefit: 'Immediate power', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300' },
    { strategy: 'Database', icon: 'barChart', desc: 'Partition & replicate data', benefit: 'Data distribution', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300' }
  ];

  const testimonials = [
    { name: 'Alex Chen', role: 'CTO, Tech Startup', quote: 'Scaled from 1M to 100M users without infrastructure redesign', rating: 5 },
    { name: 'Sarah Williams', role: 'Engineering Lead, Fortune 500', quote: 'Reduced infrastructure costs by 60% while improving performance', rating: 5 },
    { name: 'Marcus Johnson', role: 'DevOps Manager, SaaS Company', quote: 'Zero downtime deployments across all services', rating: 5 }
  ];

  const faqItems = [
    { q: 'What makes your scalability solution unique?', a: 'Our solution combines proven architectural patterns, cloud-native technologies, and automated scaling mechanisms.' },
    { q: 'How quickly can we see results?', a: 'Most clients see 5-10x performance improvement within 2-4 weeks of implementation.' },
    { q: 'Will scaling affect our current operations?', a: 'No, we implement zero-downtime migrations with blue-green deployment strategies.' },
    { q: 'What is the cost of scaling infrastructure?', a: 'Costs depend on current load, with 40-70% savings typically achieved through optimization.' }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white">
      {/* Hero with Background Image */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${ScalabilityBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          {/* <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">Scalability</span> */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
            Build Systems That <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Never Break</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Scale from thousands to millions of users with zero downtime. Enterprise-grade infrastructure meets affordability.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold uppercase tracking-widest rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 hover:from-green-600 hover:to-emerald-600">
              <span>Start Scaling</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="inline-flex items-center gap-3 px-10 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-widest rounded-lg shadow-xl hover:bg-white hover:text-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span>View Architecture</span>
              <Layers className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { num: '100M+', text: 'Users Handled' },
              { num: '99.99%', text: 'Uptime' },
              { num: '<50ms', text: 'Response Time' },
              { num: '$0', text: 'Setup Cost' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl p-4 border border-green-400 border-opacity-20 hover:border-opacity-100 hover:bg-opacity-10 transition-all duration-300 group">
                <p className="text-2xl md:text-3xl font-black text-green-400 group-hover:scale-110 transition-transform">{stat.num}</p>
                <p className="text-xs md:text-sm text-gray-300 mt-1">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="w-full py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Core Features</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Why Choose Our Scalability Solution</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Six core capabilities that make scaling effortless</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scalabilityFeatures.map((feature) => {
              const IconComponent = feature.icon === 'zap' ? Zap : feature.icon === 'globe' ? Globe : feature.icon === 'shield' ? Shield : feature.icon === 'barChart' ? BarChart : feature.icon === 'rotateCw' ? RotateCw : DollarSign;
              return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-green-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="w-16 h-16 mb-4 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 font-semibold mb-3">{feature.desc}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.detail}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-green-500 font-bold text-sm hover:text-green-600 transition-colors">Learn More →</button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">Architecture</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Four Pillars of Scalability</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Complete approach to building scalable systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon === 'building2' ? Building2 : pillar.icon === 'package' ? Package : pillar.icon === 'database' ? Database : Eye;
              return (
              <div
                key={pillar.id}
                onMouseEnter={() => setHoveredCard(pillar.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group h-full"
              >
                <div className={`bg-gradient-to-br ${pillar.color} rounded-2xl p-8 text-white h-full transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                  <div className="w-16 h-16 mb-4 bg-white bg-opacity-20 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6">{pillar.title}</h3>
                  <ul className="space-y-3">
                    {pillar.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className="w-2 h-2 bg-white rounded-full" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Steps */}
      <section className="w-full py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">Implementation</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Our Implementation Roadmap</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Six phases to enterprise-grade scalability</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {implementationSteps.map((step, idx) => {
              const IconComponent = step.icon === 'fileText' ? FileText : step.icon === 'target' ? Target : step.icon === 'settings' ? Settings : step.icon === 'checkCircle' ? CheckCircle : step.icon === 'barChart' ? BarChart : TrendingUp;
              return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(step.step)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Connection line */}
                {idx < implementationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent opacity-50" />
                )}

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 h-full">
                  <div className="w-16 h-16 mb-4 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-700 font-bold rounded-full text-sm mb-4">Step {step.step}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">Metrics</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 drop-shadow-lg">Proven Success Metrics</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Real results from our implementations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {successMetrics.map((metric, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-gradient-to-br ${metric.color} rounded-2xl p-8 text-white text-center shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-300 group`}
              >
                <p className="text-4xl md:text-5xl font-black group-hover:scale-110 transition-transform">{metric.metric}</p>
                <p className="text-sm md:text-base font-semibold mt-3 opacity-90">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Layers */}
      <section className="w-full py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">Architecture</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Layered Architecture</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Professional infrastructure from top to bottom</p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {architectureLayers.map((layer, idx) => {
              const IconComponent = layer.icon === 'palette' ? Palette : layer.icon === 'layers' ? Layers : layer.icon === 'grid3x3' ? Grid3x3 : Server;
              return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`${layer.color} border-l-8 rounded-xl p-8 hover:shadow-2xl hover:-translate-x-2 transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{layer.layer}</h3>
                </div>
                <p className="text-gray-700 ml-16">{layer.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scaling Strategies */}
      <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">Strategies</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Scaling Strategies</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose the approach that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scalingStrategies.map((strat, idx) => {
              const IconComponent = strat.icon === 'arrowLeftRight' ? ArrowLeftRight : strat.icon === 'trendingUp' ? TrendingUp : BarChart;
              return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-4"
              >
                <div className="h-48 overflow-hidden bg-gray-300 relative">
                  <img 
                    src={strat.image} 
                    alt={strat.strategy}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />
                </div>
                <div className="bg-white p-8">
                  <div className="w-12 h-12 mb-3 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{strat.strategy} Scaling</h3>
                  <p className="text-gray-600 mb-3">{strat.desc}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-green-600">✓ {strat.benefit}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold uppercase tracking-wider mb-4">Success Stories</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Client Testimonials</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">What our clients achieved with scalability</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-400 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-125 transition-transform" style={{transitionDelay: `${i * 50}ms`}} />
                  ))}
                </div>
                <p className="text-gray-700 text-lg font-semibold mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-green-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">FAQ</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 drop-shadow-lg">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Everything you need to know about scaling</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setExpandedFAQ(idx)}
                onMouseLeave={() => setExpandedFAQ(null)}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                  className="w-full bg-white border-2 border-gray-200 hover:border-green-400 px-8 py-6 rounded-xl font-bold text-lg text-left flex items-center justify-between hover:shadow-xl transition-all duration-300 group"
                >
                  <span className="text-slate-900">{item.q}</span>
                  <Plus className={`w-6 h-6 text-green-500 transform transition-transform duration-300 ${expandedFAQ === idx ? 'rotate-45' : ''}`} />
                </button>
                {expandedFAQ === idx && (
                  <div className="bg-green-50 border-2 border-t-0 border-green-200 px-8 py-6 rounded-b-xl text-gray-700 leading-relaxed animate-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-green-900 to-slate-900 opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">Get Started</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">Ready to Scale?</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-lg">Transform your infrastructure into an enterprise-grade system</p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black uppercase tracking-widest rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg">
              <span>Schedule Demo</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-green-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
              <span>Get Whitepaper</span>
              <FileText className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scalability;