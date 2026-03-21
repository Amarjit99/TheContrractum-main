import React from 'react';
import hr from "../../../assets/hr.jpg";
import hrImg from "../../../assets/hr.jfif";
import { Briefcase, ClipboardList, Users, DollarSign, BarChart3, GraduationCap, Award, Scale, Search, Target, FileText, TrendingUp, HandshakeIcon, BookOpen } from 'lucide-react';

export default function HrTech() {
    const hrTechFeatures = [
        { icon: Briefcase, title: "Recruitment Automation", description: "AI-powered candidate sourcing and screening" },
        { icon: ClipboardList, title: "Applicant Tracking", description: "Streamline hiring workflow from application to offer" },
        { icon: Users, title: "Employee Management", description: "Comprehensive employee records and profiles" },
        { icon: DollarSign, title: "Payroll Integration", description: "Automated payroll processing and compliance" },
        { icon: BarChart3, title: "Performance Analytics", description: "Real-time insights into employee performance" },
        { icon: GraduationCap, title: "Learning & Development", description: "Online training and skill development programs" },
        { icon: Award, title: "Recognition & Rewards", description: "Employee engagement and rewards platform" },
        { icon: Scale, title: "Compliance Management", description: "Stay compliant with labor laws and regulations" },
    ];

    const hrSolutions = [
        { name: "WorkDay", features: ["Cloud-Based", "Enterprise", "Global"], highlight: true },
        { name: "BambooHR", features: ["Simple", "SMB-Focused", "Affordable"], highlight: false },
        { name: "SAP Success Factors", features: ["Powerful", "Enterprise", "Comprehensive"], highlight: false },
        { name: "Guidepoint", features: ["Modern", "User-Friendly", "Cost-Effective"], highlight: true },
    ];

    const hrServices = [
        { icon: Search, title: "Talent Acquisition", description: "End-to-end recruitment solutions with AI-powered matching" },
        { icon: Target, title: "Performance Management", description: "Goal setting, feedback, and performance evaluation systems" },
        { icon: FileText, title: "Onboarding", description: "Streamlined new hire onboarding and orientation programs" },
        { icon: TrendingUp, title: "Workforce Analytics", description: "Data-driven insights for workforce planning and optimization" },
        { icon: HandshakeIcon, title: "Employee Engagement", description: "Tools to boost engagement, culture, and retention" },
        { icon: BookOpen, title: "Training Programs", description: "Custom learning paths and professional development" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${hr})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            HR Tech Solutions
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            HR Tech Solutions
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Transform your HR operations with cutting-edge technology. Automate recruitment, streamline employee management, and build a thriving workplace culture.
                        </p>
                        <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-10 py-4 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* HR Tech Features Grid */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Core Solutions
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Core HR Solutions</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Complete suite of tools to manage your workforce effectively</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {hrTechFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* HR Platform Comparison */}
            <div className="bg-gradient-to-br from-gray-50 to-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Platform Comparison
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Choose Your Ideal HR Platform</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Find the perfect HR solution for your organization</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {hrSolutions.map((p, i) => (
                            <div key={i} className={`rounded-2xl p-8 text-center transition transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl ${
                                p.highlight 
                                    ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white ring-4 ring-cyan-300" 
                                    : "bg-white text-slate-900"
                            }`}>
                                <h3 className="text-2xl sm:text-3xl font-black mb-6">{p.name}</h3>
                                <ul className="space-y-3 text-sm sm:text-base mb-8">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="flex justify-center items-center gap-2">
                                            <span className="font-bold text-xl">✓</span> <span className="font-semibold">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`px-8 py-3 rounded-xl font-bold transition transform hover:scale-110 shadow-lg ${
                                    p.highlight 
                                        ? "bg-white text-cyan-600 hover:bg-gray-100" 
                                        : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                                }`}>
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HR Services Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Our HR Services</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Comprehensive HR solutions tailored to your organization</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hrServices.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition border-t-4 border-cyan-500 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-3 text-xl">{s.title}</h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">{s.description}</p>
                                    <button className="text-cyan-600 font-semibold hover:text-cyan-700 flex items-center gap-2 group-hover:gap-4 transition">
                                        Learn More <span>→</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Talent Management & Retention */}
            <div className="bg-gradient-to-br from-gray-50 to-cyan-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="relative order-2 md:order-1">
                            <img src={hrImg} alt="Talent Management" className="w-full h-auto rounded-2xl shadow-2xl" />
                        </div>
                        <div className="order-1 md:order-2">
                            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Build Strong Teams
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Talent Management & Retention</h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                Attract, develop, and retain top talent with strategic HR initiatives. Create a workplace where employees thrive and your organization grows.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Talent pipeline development</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Succession planning tools</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Career path mapping</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Retention analytics</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Employee satisfaction surveys</span>
                                </li>
                            </ul>
                            <button className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold px-10 py-4 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition transform hover:scale-105 shadow-2xl">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-br from-cyan-900 via-blue-900 to-cyan-800 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">Ready to Transform Your HR Operations?</h2>
                    <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">Join hundreds of companies that have streamlined their HR processes and improved employee satisfaction with our integrated platform.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-white text-cyan-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Schedule Demo
                        </button>
                        <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-cyan-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            View Pricing
                        </button>
                    </div>
                </div>
            </div>

            {/* Case Studies Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Success Stories
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Enterprise Success Stories</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { company: "Global Tech Corp", results: "40% faster hiring", story: "Reduced time-to-hire from 45 days to 27 days with our automated recruitment system." },
                            { company: "Finance Solutions Inc", results: "35% cost reduction", story: "Streamlined payroll and compliance processes, saving thousands in operational costs." },
                            { company: "Healthcare Network", results: "85% employee satisfaction", story: "Implemented performance management and learning systems that boosted engagement scores." }
                        ].map((story, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition border-l-4 border-cyan-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xl">
                                        {story.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{story.company}</h3>
                                        <p className="text-cyan-600 text-sm font-semibold">{story.results}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm italic">"{story.story}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}