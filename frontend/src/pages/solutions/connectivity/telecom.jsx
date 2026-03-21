import React from 'react';
import telecom from "../../../assets/telecom.jpeg";
import teleImg from "../../../assets/tele.jfif";
import { Smartphone, Phone, BarChart3, Link, Globe, Radio, Headphones, Shield, Antenna, Wrench, Satellite, MapPin, Users, GraduationCap, Zap, Lock, TrendingUp, DollarSign, Rocket } from 'lucide-react';

export default function TelecomSolutions() {
  const telecomServices = [
    { icon: Smartphone, title: "Mobile Services", desc: "Advanced mobile networks with 4G/5G coverage" },
    { icon: Phone, title: "Voice Solutions", desc: "Crystal-clear voice communication systems" },
    { icon: BarChart3, title: "Data Services", desc: "High-speed data connectivity and management" },
    { icon: Link, title: "Leased Lines", desc: "Dedicated private network connections" },
    { icon: Globe, title: "Internet Services", desc: "Fiber optic broadband and wireless internet" },
    { icon: Radio, title: "Network Infrastructure", desc: "Towers, switches, and routing systems" },
    { icon: Headphones, title: "Business Communications", desc: "Unified communications and collaboration" },
    { icon: Shield, title: "Security Services", desc: "Advanced telecom security and protection" },
  ];

  const networkTiers = [
    { tier: "4G LTE", speed: "100 Mbps", coverage: "99.5%", highlight: false },
    { tier: "5G Standard", speed: "1 Gbps", coverage: "95%", highlight: true },
    { tier: "5G Premium", speed: "10 Gbps", coverage: "98%", highlight: false },
    { tier: "Enterprise 5G", speed: "50 Gbps", coverage: "99.9%", highlight: false },
  ];

  const infrastructure = [
    { icon: Antenna, title: "Base Stations", count: "50K+" },
    { icon: Wrench, title: "Equipment", count: "100K+" },
    { icon: Satellite, title: "Satellites", count: "200+" },
    { icon: MapPin, title: "Global Coverage", count: "195 Countries" },
    { icon: Users, title: "Engineers", count: "5000+" },
    { icon: GraduationCap, title: "Training Centers", count: "150+" },
  ];

  const features = [
    { icon: Zap, title: "Ultra-Fast Speed", benefit: "Up to 50 Gbps connectivity" },
    { icon: Lock, title: "Security First", benefit: "Military-grade encryption" },
    { icon: Globe, title: "Global Network", benefit: "Coverage in 195+ countries" },
    { icon: TrendingUp, title: "High Reliability", benefit: "99.99% uptime SLA" },
    { icon: DollarSign, title: "Cost-Effective", benefit: "Competitive pricing & flexible plans" },
    { icon: Rocket, title: "Future-Ready", benefit: "6G research & development" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${telecom})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div>
            {/* <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
              Telecommunication Services
            </span> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              Telecommunication Solutions
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
              Next-generation telecom services delivering lightning-fast connectivity, crystal-clear communication, and comprehensive business solutions worldwide.
            </p>
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-10 py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Discover Services
            </button>
          </div>
        </div>
      </div>

      {/* Telecom Services Grid */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Core Telecom Services</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Complete telecommunications solutions for individual and enterprise needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {telecomServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition border-b-4 border-orange-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-base group-hover:text-orange-600 transition">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Network Speed Tiers */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Network Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Network Speed Tiers</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Choose the network tier that matches your connectivity needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {networkTiers.map((net, i) => (
              <div key={i} className={`rounded-2xl p-8 text-center transition hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden group ${
                net.highlight 
                  ? "bg-gradient-to-br from-orange-600 to-red-600 text-white ring-4 ring-orange-300" 
                  : "bg-white text-slate-900"
              }`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition ${net.highlight ? "bg-white" : "bg-orange-600"}`}></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-3">{net.tier}</h3>
                  <p className="text-xl font-bold mb-2">Speed: {net.speed}</p>
                  <p className={`text-sm mb-6 leading-relaxed ${net.highlight ? "text-orange-100" : "text-slate-600"}`}>Coverage: {net.coverage}</p>
                  <button className={`px-8 py-3 rounded-xl font-bold transition transform hover:scale-110 shadow-lg ${
                    net.highlight 
                      ? "bg-white text-orange-600 hover:bg-gray-100" 
                      : "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
                  }`}>
                    Subscribe Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure Stats */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Global Reach
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Our Global Infrastructure</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Industry-leading capabilities powering billions of connections</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {infrastructure.map((infra, i) => {
              const Icon = infra.icon;
              return (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition border-l-4 border-orange-500 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-xl group-hover:text-orange-600 transition">{infra.title}</h3>
                  <p className="text-3xl font-black text-orange-600">{infra.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Key Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Why Choose Our Telecom Services</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Industry-leading features and benefits for your communication needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition border-l-4 border-orange-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-xl group-hover:text-orange-600 transition">{feat.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed">{feat.benefit}</p>
                    <div className="mt-4 flex items-center text-orange-600 font-semibold group-hover:gap-3 gap-2 transition">
                      <span>Learn More</span> <span className="group-hover:translate-x-2 transition">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5G & Advanced Technology */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <img src={teleImg} alt="5G Technology" className="w-full h-auto rounded-2xl shadow-2xl" />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
                Next Generation Technology
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">5G & Beyond</h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                Experience revolutionary connectivity with our advanced 5G infrastructure, offering unprecedented speed, ultra-low latency, and massive device capacity for the connected future.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Up to 10 Gbps download speeds</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Sub-1 millisecond latency</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Support for 1 million+ devices/km²</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Enhanced mobile broadband (eMBB)</span>
                </li>
                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                  <span className="text-orange-600 font-bold text-xl">✓</span>
                  <span className="font-semibold">Mission-critical communications</span>
                </li>
              </ul>
              <button className="mt-8 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-10 py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition transform hover:scale-105 shadow-2xl">
                Explore 5G Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Success */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Customer Success Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { customer: "Fortune 500 Corp", metric: "99.99% uptime", story: "Transformed business operations with enterprise 5G connectivity and achieved zero downtime." },
              { customer: "Startup Tech", metric: "10x faster growth", story: "Scaled from 100 to 10,000 connected devices with our global IoT solutions." },
              { customer: "Media Company", metric: "4K streaming", story: "Delivered HD/4K content to 50M+ users with our optimized mobile network." }
            ].map((client, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition border-l-4 border-orange-500 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center font-bold text-xl group-hover:scale-110 transition">
                    {client.customer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition">{client.customer}</h3>
                    <p className="text-orange-600 text-sm font-semibold">{client.metric}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed">"{client.story}"</p>
                <div className="mt-4 flex items-center text-orange-600 font-semibold text-sm group-hover:gap-3 gap-2 transition">
                  <span>Read Case Study</span> <span className="group-hover:translate-x-2 transition">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative bg-gradient-to-br from-orange-900 via-red-900 to-orange-800 text-white overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">Ready for Next-Gen Connectivity?</h2>
          <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Join millions of satisfied customers experiencing the future of telecommunications. Get connected with our reliable, fast, and secure network solutions today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button className="bg-white text-orange-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-orange-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              View Plans & Pricing
            </button>
          </div>
          <p className="text-gray-100 text-base">Free activation • 24/7 customer support • 30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
}