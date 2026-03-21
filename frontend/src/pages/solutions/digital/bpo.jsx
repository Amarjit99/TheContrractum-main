import React from 'react';
import bpoo from "../../../assets/bpoo.webp";
import bpoImg from "../../../assets/bpo.jfif";
import { Phone, Mail, MessageSquare, FileText, BarChart3, Search, Smartphone, ClipboardList, ShoppingCart, Briefcase, Heart, Laptop, Radio, Plane, DollarSign, Zap, Globe, TrendingUp, Target, Users } from 'lucide-react';

export default function BPO() {
    const bpoServices = [
        { icon: Phone, title: "Customer Support Services", desc: "24/7 multilingual support handling inbound and outbound calls" },
        { icon: Mail, title: "Email Support", desc: "Professional email management and customer inquiry resolution" },
        { icon: MessageSquare, title: "Live Chat Support", desc: "Real-time customer engagement across multiple platforms" },
        { icon: FileText, title: "Data Entry & Processing", desc: "Accurate data entry with 99.8% accuracy rates" },
        { icon: BarChart3, title: "Back-Office Operations", desc: "Invoice processing, billing, and account management" },
        { icon: Search, title: "Quality Assurance", desc: "Compliance monitoring and quality control services" },
        { icon: Smartphone, title: "Technical Support", desc: "IT helpdesk and technical troubleshooting services" },
        { icon: ClipboardList, title: "HR Administration", desc: "Payroll processing and employee onboarding support" },
    ];

    const industries = [
        { name: "Retail & E-Commerce", icon: ShoppingCart, clients: "500+" },
        { name: "Finance & Banking", icon: Briefcase, clients: "350+" },
        { name: "Healthcare", icon: Heart, clients: "200+" },
        { name: "Technology", icon: Laptop, clients: "450+" },
        { name: "Telecommunications", icon: Radio, clients: "180+" },
        { name: "Travel & Hospitality", icon: Plane, clients: "220+" },
    ];

    const bpoModels = [
        { model: "Dedicated Team", desc: "Exclusive team assigned to your account", min: "5", highlight: false },
        { model: "Shared Services", desc: "Cost-effective shared resource model", min: "1", highlight: false },
        { model: "Hybrid Model", desc: "Combination of dedicated and shared resources", min: "10", highlight: true },
        { model: "Project-Based", desc: "Short-term project-specific resources", min: "2", highlight: false },
    ];

    const advantages = [
        { icon: DollarSign, title: "Cost Reduction", benefit: "Save up to 60% on operational costs" },
        { icon: Zap, title: "Efficiency Boost", benefit: "Increase productivity by 40-50%" },
        { icon: Globe, title: "Global Reach", benefit: "24/7 operations across time zones" },
        { icon: TrendingUp, title: "Scalability", benefit: "Easily scale resources up or down" },
        { icon: Target, title: "Focus on Core Business", benefit: "Let us handle non-core operations" },
        { icon: Users, title: "Skilled Workforce", benefit: "Access to trained professionals" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${bpoo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            Business Process Outsourcing
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            BPO Solutions
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Streamline your business operations with our comprehensive BPO solutions. Focus on growth while we handle your back-office, customer support, and operational needs.
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Get Free Consultation
                        </button>
                    </div>
                </div>
            </div>

            {/* BPO Services Grid */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Comprehensive BPO Services</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">End-to-end business process outsourcing solutions tailored to your needs</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {bpoServices.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition border-b-4 border-purple-500 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2 text-base group-hover:text-purple-600 transition">{s.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
                                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-purple-500 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Industry Specializations */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Industry Expertise
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Industries We Serve</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Proven expertise across diverse industries and sectors</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((ind, i) => {
                            const Icon = ind.icon;
                            return (
                                <div key={i} className="bg-white p-8 rounded-2xl border-2 border-purple-200 hover:border-purple-500 hover:shadow-2xl transition group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition">{ind.name}</h3>
                                    <p className="text-purple-600 font-semibold text-lg mb-4">{ind.clients} Clients</p>
                                    <button className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2 group-hover:gap-3 transition">
                                        Learn More <span className="transform group-hover:translate-x-2 transition">→</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Business Advantages */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Key Benefits
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Why Choose Our BPO Services</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Key benefits that drive business transformation</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {advantages.map((adv, i) => {
                            const Icon = adv.icon;
                            return (
                                <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition border-t-4 border-purple-500 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-3 text-xl group-hover:text-purple-600 transition">{adv.title}</h3>
                                        <p className="text-slate-600 text-base leading-relaxed">{adv.benefit}</p>
                                        <div className="mt-4 flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition">
                                            <span>Explore</span> <span className="group-hover:translate-x-2 transition">→</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* BPO Engagement Models */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Engagement Options
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Flexible Engagement Models</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Choose the BPO model that fits your business requirements</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {bpoModels.map((mod, i) => (
                            <div key={i} className={`rounded-2xl p-8 text-center transition hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden group ${
                                mod.highlight 
                                    ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white ring-4 ring-purple-300" 
                                    : "bg-white text-slate-900"
                            }`}>
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition ${mod.highlight ? "bg-white" : "bg-purple-600"}`}></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-3">{mod.model}</h3>
                                    <p className={`text-sm mb-4 leading-relaxed ${mod.highlight ? "text-purple-100" : "text-slate-600"}`}>{mod.desc}</p>
                                    <p className="text-xl font-bold mb-6">Min: {mod.min} resources</p>
                                    <button className={`px-8 py-3 rounded-xl font-bold transition transform hover:scale-110 shadow-lg ${
                                        mod.highlight 
                                            ? "bg-white text-purple-600 hover:bg-gray-100" 
                                            : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                                    }`}>
                                        Get Quote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quality & Process Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="relative order-2 md:order-1">
                            <img src={bpoImg} alt="Quality Assurance" className="w-full h-auto rounded-2xl shadow-2xl" />
                        </div>
                        <div className="order-1 md:order-2">
                            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Excellence in Delivery
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Quality Assurance & Compliance</h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                We maintain stringent quality standards with ISO certifications, GDPR compliance, and continuous process improvement.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">ISO 9001 & ISO 27001 certified</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">GDPR & SOC 2 compliant</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">99.8% SLA uptime guarantee</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Regular audits and training</span>
                                </li>
                            </ul>
                            <button className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105 shadow-2xl">
                                View Certifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Case Studies Section */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Success Stories
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Proven Results from Our Clients</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { company: "E-Commerce Giant", metric: "45% cost reduction", story: "Partnered for customer support, saved $2M annually while improving satisfaction by 30%." },
                            { company: "Financial Services", metric: "40% faster operations", story: "Automated back-office processes resulting in faster transaction processing and compliance." },
                            { company: "Tech Startup", metric: "3x volume growth", story: "Scaled customer support from 5000 to 15000 monthly tickets without hiring overhead." }
                        ].map((client, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition border-l-4 border-purple-500 group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl group-hover:scale-110 transition">
                                        {client.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition">{client.company}</h3>
                                        <p className="text-purple-600 text-sm font-semibold">{client.metric}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm italic leading-relaxed">"{client.story}"</p>
                                <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm group-hover:gap-3 gap-2 transition">
                                    <span>Read Case Study</span> <span className="group-hover:translate-x-2 transition">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">Ready to Optimize Your Operations?</h2>
                    <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                        Partner with us to streamline your business processes, reduce costs, and focus on what matters most. Get expert guidance tailored to your business needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                        <button className="bg-white text-purple-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Get Free Consultation
                        </button>
                        <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-purple-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Schedule a Call
                        </button>
                    </div>
                    <p className="text-gray-100 text-base">No credit card required • 30-minute demo • Dedicated account manager</p>
                </div>
            </div>
        </div>
    );
}