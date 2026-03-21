import React from 'react';
import network from "../../../assets/network.png";
import { Building2, Link, Settings, Radio, Shield, RefreshCw, Building, Cloud, Heart, Landmark, Gamepad2, Network, Server, SwitchCamera, Wifi, Lock as LockIcon, Activity, Eye, MonitorCheck, CheckCircle, Zap, DollarSign, Users, TrendingUp, Target } from 'lucide-react';

export default function NetworkInfrastructure() {
  const infraServices = [
    { icon: Building2, title: "Infrastructure Design", desc: "Custom architecture tailored to your needs" },
    { icon: Link, title: "Network Topology", desc: "Optimized mesh and redundant configurations" },
    { icon: Settings, title: "Installation & Deployment", desc: "Expert setup with zero downtime migration" },
    { icon: Radio, title: "Fiber Optic Networks", desc: "High-speed backbone connectivity" },
    { icon: Shield, title: "Edge Security", desc: "Distributed security across all nodes" },
    { icon: RefreshCw, title: "Load Balancing", desc: "Intelligent traffic distribution systems" },
  ];

  const components = [
    { icon: Server, name: "Core Routers", specs: "BGP, MPLS, QoS enabled", performance: "400+ Tbps" },
    { icon: SwitchCamera, name: "Switches", specs: "Layer 2/3, PoE capable", performance: "100 Gbps+" },
    { icon: Wifi, name: "Wireless Access Points", specs: "Wi-Fi 6E, Mesh capable", performance: "High-density deployment" },
    { icon: Shield, name: "Network Security Appliances", specs: "Firewall, IDS/IPS, DDoS protection", performance: "Multi-layer defense" },
    { icon: Activity, name: "Monitoring Systems", specs: "AI-powered analytics", performance: "Real-time insights" },
    { icon: LockIcon, name: "VPN & Encryption", specs: "Military-grade encryption", performance: "Zero-trust architecture" },
  ];

  const architectureModels = [
    { model: "Hub & Spoke", latency: "5-10ms", scalability: "Good", cost: "$", availability: "99.5%", highlight: false },
    { model: "Full Mesh", latency: "1-2ms", scalability: "Limited", cost: "$$$", availability: "99.99%", highlight: true },
    { model: "Hybrid Mesh", latency: "2-5ms", scalability: "Excellent", cost: "$$", availability: "99.95%", highlight: false },
    { model: "SD-WAN", latency: "3-8ms", scalability: "Super", cost: "$", availability: "99.9%", highlight: false },
  ];

  const benefits = [
    { icon: Zap, title: "Enhanced Performance", desc: "Reduced latency, increased bandwidth utilization" },
    { icon: DollarSign, title: "Cost Optimization", desc: "60% reduction in operational expenses" },
    { icon: MonitorCheck, title: "Improved Accessibility", desc: "24/7 network availability and uptime" },
    { icon: Shield, title: "Enterprise Security", desc: "Multi-layer protection and threat prevention" },
    { icon: TrendingUp, title: "Scalable Architecture", desc: "Grow your network without disruption" },
    { icon: Target, title: "Better User Experience", desc: "Consistent performance across locations" },
  ];

  const useCases = [
    { icon: Building, title: "Enterprise Networks", desc: "Multi-site connectivity for corporations" },
    { icon: Cloud, title: "Cloud Integration", desc: "Seamless hybrid cloud connectivity" },
    { icon: Heart, title: "Healthcare Systems", desc: "HIPAA-compliant secure networks" },
    { icon: Landmark, title: "Financial Services", desc: "High-security transaction networks" },
    { icon: Gamepad2, title: "Content Delivery", desc: "Low-latency streaming infrastructure" },
    { icon: Network, title: "IoT Networks", desc: "Massive sensor network management" },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${network})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div>
            {/* <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
              Network Infrastructure
            </span> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              Enterprise Network Infrastructure
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
              Build scalable, secure, and high-performance networks that power your digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold px-10 py-4 rounded-xl hover:from-cyan-700 hover:to-teal-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                Schedule Assessment
              </button>
              <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-cyan-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                View Architecture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Infrastructure Services Grid ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Comprehensive Infrastructure Services
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Complete solutions for modern network requirements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {infraServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition border-l-4 border-cyan-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Network Components Section ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
              Technology Stack
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Network Components & Technology Stack
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Enterprise-grade equipment and solutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div key={idx} className="group bg-white rounded-2xl p-6 border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-400/20 transition">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transform transition">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">{comp.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{comp.specs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-600 font-semibold group-hover:text-cyan-700">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition"></span>
                    {comp.performance}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Architecture Comparison ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Network Architecture Models
            </h2>
            <p className="text-xl text-gray-300">Choose the right topology for your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {architectureModels.map((arch, idx) => (
              <div
                key={idx}
                className={`group rounded-xl p-6 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  arch.highlight
                    ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-2xl shadow-cyan-500/50 scale-105"
                    : "bg-gray-800 border border-gray-700 text-gray-100 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20"
                }`}
              >
                <h3 className="font-bold text-lg mb-4 group-hover:text-cyan-200 transition-colors">
                  {arch.model}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Latency:</span>
                    <span className="font-semibold">{arch.latency}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Scalability:</span>
                    <span className="font-semibold group-hover:scale-110 transition-transform inline-block">{arch.scalability}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Cost:</span>
                    <span className="font-semibold">{arch.cost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Availability:</span>
                    <span className="font-semibold">{arch.availability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Business Benefits ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
              Key Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Business Benefits & ROI
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Proven results from enterprise infrastructure optimization</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:border-cyan-400 border-2 border-transparent transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Industry Use Cases ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
              Industry Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Tailored infrastructure for every vertical</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition border border-cyan-200 hover:border-cyan-400">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-600">
                      {useCase.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Implementation Process ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-teal-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Implementation Process
            </h2>
            <p className="text-xl text-cyan-100">Four-phase approach to network deployment</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Assessment", desc: "Current infrastructure analysis", color: "from-cyan-400 to-blue-400" },
              { step: "2", title: "Design", desc: "Custom architecture planning", color: "from-blue-400 to-teal-400" },
              { step: "3", title: "Deployment", desc: "Zero-downtime installation", color: "from-teal-400 to-cyan-400" },
              { step: "4", title: "Optimization", desc: "Monitoring & continuous improvement", color: "from-cyan-400 to-blue-500" },
            ].map((phase, idx) => (
              <div key={idx} className="group relative">
                <div className={`bg-gradient-to-br ${phase.color} rounded-xl p-8 text-white shadow-lg hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2`}>
                  <div className="text-5xl font-bold opacity-20 mb-4">{phase.step}</div>
                  <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-opacity-90">{phase.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Security Features ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔐 Security & Compliance
            </h2>
            <p className="text-xl text-gray-600">Enterprise-grade protection for your network</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                "Military-grade AES 256-bit encryption",
                "DDoS protection & threat intelligence",
                "Zero-trust architecture implementation",
                "Real-time intrusion detection systems",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                  <span className="text-gray-700 group-hover:text-cyan-600 font-medium transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                "ISO 27001 & SOC 2 Type II certified",
                "GDPR, HIPAA & FedRAMP compliance",
                "24/7 security operations center",
                "Annual penetration testing & audits",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                  <span className="text-gray-700 group-hover:text-cyan-600 font-medium transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Support & SLA ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              24/7 Support & SLA Guarantees
            </h2>
            <p className="text-xl text-gray-600">Round-the-clock monitoring and expert assistance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "99.99% Uptime SLA", desc: "Guaranteed network availability", icon: "✓" },
              { title: "15-minute Response", desc: "Critical issue resolution time", icon: "⚡" },
              { title: "Expert Support Team", desc: "Certified network engineers", icon: "👨‍💼" },
            ].map((support, idx) => (
              <div key={idx} className="group text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 cursor-pointer">
                <div className="text-5xl mb-4 inline-block group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {support.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {support.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700">
                  {support.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Success Stories ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Enterprise Success Stories
            </h2>
            <p className="text-xl text-gray-300">Real results from infrastructure transformation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "Global Tech Corporation",
                challenge: "Multi-region network latency issues",
                result: "48% latency reduction, 99.99% uptime",
                metric: "3 continents",
              },
              {
                company: "Financial Services Group",
                challenge: "Legacy infrastructure bottlenecks",
                result: "10x throughput increase, $2.5M savings",
                metric: "45+ branches",
              },
              {
                company: "Healthcare Network",
                challenge: "HIPAA compliance & security requirements",
                result: "Zero breaches, 100% audit pass rate",
                metric: "200+ hospitals",
              },
            ].map((story, idx) => (
              <div key={idx} className="group bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 group-hover:scale-110 transition-all duration-300"></div>
                  <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {story.company}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  <span className="text-gray-500">Challenge:</span> {story.challenge}
                </p>
                <p className="text-cyan-300 font-semibold mb-4">
                  ✓ {story.result}
                </p>
                <div className="pt-4 border-t border-gray-700">
                  <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
                    {story.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-900 via-teal-900 to-cyan-800 text-white overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            Ready to Transform Your Network?
          </h2>
          <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Let our infrastructure experts design the perfect solution for your enterprise needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-cyan-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Request Free Consultation
            </button>
            <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-cyan-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Download Checklist
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/30 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">5000+</p>
              <p className="text-cyan-100 text-sm">Networks Deployed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">150+</p>
              <p className="text-cyan-100 text-sm">Countries Served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">99.98%</p>
              <p className="text-cyan-100 text-sm">Avg Uptime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}