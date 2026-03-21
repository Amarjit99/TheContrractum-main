import React from 'react';
import cloud from "../../../assets/cloud.webp";
import { Cloud as CloudIcon, Settings, RefreshCw, BarChart3, Rocket, DollarSign, Shield, TrendingUp, Globe, Link, Zap, Unlock, Lightbulb, Target, Lock, Building, Smartphone, Bot, Database, Gamepad2, Code, Gift, UserCheck } from 'lucide-react';

export default function Cloud() {
  const cloudServices = [
    { icon: CloudIcon, title: "AWS Integration", desc: "Seamless AWS cloud migration and management" },
    { icon: CloudIcon, title: "Azure Cloud", desc: "Microsoft Azure enterprise integration" },
    { icon: CloudIcon, title: "Google Cloud", desc: "GCP infrastructure and services setup" },
    { icon: Settings, title: "Hybrid Cloud", desc: "Multi-cloud orchestration and control" },
    { icon: RefreshCw, title: "Cloud Migration", desc: "Secure data and workload migration" },
    { icon: BarChart3, title: "Cloud Analytics", desc: "Real-time insights and monitoring" },
  ];

  const cloudPlatforms = [
    { name: "AWS", services: "EC2, S3, Lambda, RDS", market: "Market Leader", users: "Millions+", icon: CloudIcon },
    { name: "Microsoft Azure", services: "VMs, App Service, SQL, AI", market: "Enterprise Focus", users: "Millions+", icon: CloudIcon },
    { name: "Google Cloud", services: "Compute, BigQuery, Kubernetes, AI", market: "Data & AI", users: "100K+", icon: CloudIcon },
    { name: "IBM Cloud", services: "Watson, Kubernetes, Databases", market: "Enterprise/Hybrid", users: "50K+", icon: CloudIcon },
  ];

  const integrationModels = [
    { model: "IaaS", desc: "Infrastructure as a Service", examples: "EC2, Azure VMs, GCP Compute", latency: "Minimal", cost: "$", highlight: false },
    { model: "PaaS", desc: "Platform as a Service", examples: "Lambda, App Engine, Cloud Functions", latency: "Low", cost: "$$", highlight: true },
    { model: "SaaS", desc: "Software as a Service", examples: "Office 365, Salesforce, Slack", latency: "Very Low", cost: "$", highlight: false },
    { model: "Multi-Cloud", desc: "Distributed Cloud Strategy", examples: "Kubernetes, Terraform, ArgoCD", latency: "Optimized", cost: "$$$", highlight: false },
  ];

  const features = [
    { icon: Rocket, title: "Lightning-Fast Deployment", desc: "Provision resources in minutes, not months" },
    { icon: DollarSign, title: "Cost Optimization", desc: "Pay only for what you use, auto-scaling included" },
    { icon: Shield, title: "Enterprise Security", desc: "Compliance with SOC 2, HIPAA, GDPR standards" },
    { icon: TrendingUp, title: "Auto-Scaling", desc: "Automatically handle traffic spikes" },
    { icon: Globe, title: "Global Coverage", desc: "Deploy in 30+ regions worldwide" },
    { icon: Link, title: "API Integration", desc: "Connect any application seamlessly" },
  ];

  const benefits = [
    { icon: Zap, title: "Unlimited Scalability", desc: "Scale from startup to enterprise instantly" },
    { icon: Unlock, title: "24/7 Availability", desc: "99.99% uptime SLA guarantee" },
    { icon: Lightbulb, title: "AI & Machine Learning", desc: "Pre-built AI services ready to use" },
    { icon: Target, title: "Focus on Business", desc: "Stop managing infrastructure, start innovating" },
    { icon: Lock, title: "Zero-Trust Security", desc: "Built-in encryption and compliance" },
    { icon: BarChart3, title: "Real-Time Analytics", desc: "Monitor and optimize instantly" },
  ];

  const useCases = [
    { icon: Building, title: "Enterprise Applications", desc: "Mission-critical business apps on cloud" },
    { icon: Smartphone, title: "Mobile Backends", desc: "Scalable APIs for mobile applications" },
    { icon: Bot, title: "AI & ML Workloads", desc: "Train and deploy ML models at scale" },
    { icon: Database, title: "Big Data Analytics", desc: "Process petabytes of data instantly" },
    { icon: Gamepad2, title: "Gaming Platforms", desc: "Low-latency multiplayer gaming backend" },
    { icon: Globe, title: "Web Applications", desc: "Global CDN with automatic scaling" },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${cloud})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div>
            {/* <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
              Cloud Integration
            </span> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
              Cloud Integration Solutions
            </h1>
            <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
              Transform your business with secure, scalable cloud solutions designed for modern enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-amber-600 to-violet-600 text-white font-bold px-10 py-4 rounded-xl hover:from-amber-700 hover:to-violet-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-violet-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Cloud Services Grid ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Comprehensive Cloud Services
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Multi-cloud expertise across all major platforms</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cloudServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition border-l-4 border-amber-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition">
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

      {/* ===== Cloud Platforms Comparison ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-violet-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-bold uppercase tracking-wider mb-4">
              Platform Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Major Cloud Platforms
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Compare features and capabilities across providers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cloudPlatforms.map((platform, idx) => {
              const Icon = platform.icon;
              return (
                <div key={idx} className="group bg-white rounded-2xl p-8 border-2 border-violet-200 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/20 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 transform transition">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                        {platform.name}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600 font-semibold">Services:</span>
                      <p className="text-gray-700 mt-1 group-hover:text-gray-900">{platform.services}</p>
                    </div>
                    <div className="flex gap-8 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-amber-600 font-bold text-lg">{platform.market}</p>
                        <p className="text-gray-500 text-xs">Market Position</p>
                      </div>
                      <div>
                        <p className="text-violet-600 font-bold text-lg">{platform.users}</p>
                        <p className="text-gray-500 text-xs">Active Users</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Integration Models ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cloud Service Models
            </h2>
            <p className="text-xl text-gray-600">Choose the right model for your workloads</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrationModels.map((model, idx) => (
              <div
                key={idx}
                className={`group rounded-xl p-6 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  model.highlight
                    ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-2xl shadow-amber-400/50 scale-105"
                    : "bg-white border-2 border-purple-200 text-gray-900 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/20"
                }`}
              >
                <h3 className="font-bold text-lg mb-3 group-hover:text-amber-100 transition-colors">
                  {model.model}
                </h3>
                <p className={`text-sm mb-4 ${model.highlight ? "text-amber-100" : "text-gray-600"}`}>
                  {model.desc}
                </p>
                <div className="space-y-2 text-xs">
                  <div><span className={`${model.highlight ? "text-amber-100" : "text-gray-500"}`}>Examples:</span> <span className={`font-semibold ${model.highlight ? "text-white" : "text-gray-800"}`}>{model.examples}</span></div>
                  <div><span className={`${model.highlight ? "text-amber-100" : "text-gray-500"}`}>Latency:</span> <span className={`font-semibold ${model.highlight ? "text-white" : "text-gray-800"}`}>{model.latency}</span></div>
                  <div><span className={`${model.highlight ? "text-amber-100" : "text-gray-500"}`}>Cost:</span> <span className={`font-semibold ${model.highlight ? "text-white" : "text-violet-600"}`}>{model.cost}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Key Features ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
              Key Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Enterprise capabilities ready for your workloads</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:border-amber-400 border-2 border-transparent transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Business Benefits ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
              Business Value
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Business Benefits & ROI
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Transform your operations with cloud-native solutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-amber-400/20 hover:border-amber-400 border-2 border-gray-700 transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-100">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Use Cases ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-bold uppercase tracking-wider mb-4">
              Industry Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Industry Use Cases
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Solutions for every business vertical</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => {
              const Icon = useCase.icon;
              return (
                <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:shadow-violet-500/30 transition border border-violet-200 hover:border-amber-400">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-600 transition">
                      {useCase.title}
                    </h3>
                    <p className="text-slate-600">
                      {useCase.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Migration Process ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900 to-violet-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cloud Migration Journey
            </h2>
            <p className="text-xl text-purple-100">Five-step path to cloud success</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Assess", desc: "Analyze current infrastructure", color: "from-amber-400 to-amber-500" },
              { step: "2", title: "Plan", desc: "Design cloud architecture", color: "from-amber-500 to-amber-600" },
              { step: "3", title: "Migrate", desc: "Move workloads to cloud", color: "from-violet-400 to-purple-500" },
              { step: "4", title: "Optimize", desc: "Fine-tune performance", color: "from-purple-400 to-purple-500" },
              { step: "5", title: "Monitor", desc: "24/7 cloud operations", color: "from-purple-500 to-violet-600" },
            ].map((phase, idx) => (
              <div key={idx} className="group relative">
                <div className={`bg-gradient-to-br ${phase.color} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl hover:shadow-amber-400/40 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2`}>
                  <div className="text-4xl font-bold opacity-20 mb-2">{phase.step}</div>
                  <h3 className="text-lg font-bold mb-1">{phase.title}</h3>
                  <p className="text-sm text-opacity-90">{phase.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-violet-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Performance Metrics ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Performance Metrics
            </h2>
            <p className="text-xl text-gray-600">Benchmark your cloud performance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "50-70%", description: "Cost Reduction", icon: DollarSign, color: "from-amber-100 to-amber-50" },
              { metric: "3-5x", description: "Performance Improvement", icon: Zap, color: "from-violet-100 to-violet-50" },
              { metric: "99.99%", description: "Availability SLA", icon: Target, color: "from-purple-100 to-purple-50" },
              { metric: "50%", description: "Time to Market", icon: Rocket, color: "from-amber-100 to-violet-50" },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className={`group bg-gradient-to-br ${metric.color} rounded-xl p-8 border-2 border-gray-200 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 transition text-center`}>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {metric.metric}
                </p>
                <p className="text-gray-700 font-semibold">
                  {metric.description}
                </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Security & Compliance ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-violet-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-bold uppercase tracking-wider mb-4">
              Security & Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Built-in compliance and protection standards</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                "End-to-End Encryption in Transit & Rest",
                "IAM & Role-Based Access Control",
                "Data Residency & Sovereignty",
                "Disaster Recovery & Backup",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                  <span className="text-gray-700 group-hover:text-violet-600 font-medium transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                "SOC 2 Certified & HIPAA Compliant",
                "GDPR Ready & FedRAMP Authorized",
                "PCI-DSS & ISO 27001 Certified",
                "Threat Detection & Response 24/7",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-2 h-2 bg-amber-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                  <span className="text-gray-700 group-hover:text-violet-600 font-medium transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Developer Support ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
              Developer Tools
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
              Developer Experience
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Tools and support for rapid development</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "SDKs & APIs", desc: "50+ programming languages supported", icon: Code },
              { title: "Free Tier", desc: "Start without credit card", icon: Gift },
              { title: "24/7 Support", desc: "Expert engineers ready to help", icon: UserCheck },
            ].map((support, idx) => {
              const Icon = support.icon;
              return (
                <div key={idx} className="group text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 transition">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-violet-600 rounded-xl shadow-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transform transition">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition">
                    {support.title}
                  </h3>
                  <p className="text-slate-600">
                    {support.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Success Stories ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
              Success Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Cloud Success Stories
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Companies transforming with cloud</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "TechStartup Inc",
                challenge: "Rapid scaling from 100 to 10K users",
                result: "Scaled 100x without infrastructure costs",
                metric: "Series B Funded",
              },
              {
                company: "Enterprise Corp",
                challenge: "Legacy system modernization",
                result: "30% cost savings, 5x faster deployments",
                metric: "500+ Services Migrated",
              },
              {
                company: "FinTech Solutions",
                challenge: "Compliance and high availability",
                result: "Zero downtime, 99.99% uptime achieved",
                metric: "$500M AUM",
              },
            ].map((story, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-8 border-2 border-gray-700 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-violet-500 group-hover:scale-110 transition-all duration-300"></div>
                  <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors">
                    {story.company}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  <span className="text-gray-500">Challenge:</span> {story.challenge}
                </p>
                <p className="text-amber-300 font-semibold mb-4">
                  ✓ {story.result}
                </p>
                <div className="pt-4 border-t border-gray-600">
                  <span className="text-xs text-gray-500 group-hover:text-amber-400 transition-colors">
                    {story.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-900 via-purple-900 to-violet-800 text-white overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl">
            Start Your Cloud Journey Today
          </h2>
          <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of companies transforming their infrastructure with cloud solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-white text-violet-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-violet-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
              Schedule Demo
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-amber-400/30 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-300">100K+</p>
              <p className="text-gray-200 text-sm">Apps Deployed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-300">50+</p>
              <p className="text-gray-200 text-sm">Cloud Services</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-300">99.99%</p>
              <p className="text-gray-200 text-sm">Uptime SLA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}