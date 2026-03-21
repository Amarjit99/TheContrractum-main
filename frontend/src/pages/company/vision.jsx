import React, { useState, useEffect, useRef } from "react";
import { Target, Rocket, Trophy, Sparkles, Globe, Building2, TrendingUp, Lightbulb, Users, Shield, Heart, Award, Zap, CheckCircle } from "lucide-react";
import g1 from "../../assets/g1.png";
import g2 from "../../assets/g2.png";
import g3 from "../../assets/g3.png";
import g4 from "../../assets/g4.png";  
import g5 from "../../assets/g5.png";
import g6 from "../../assets/g6.png";
import g7 from "../../assets/g7.png";
import g8 from "../../assets/g8.png";
import g9 from "../../assets/g9.png";
import g10 from "../../assets/g10.png";
import g11 from "../../assets/g11.png";
import g12 from "../../assets/g12.png";
import g13 from "../../assets/g13.png";
import g14 from "../../assets/g14.png";
import visin from "../../assets/visin.png";
export default function Vision() {
    const visionPillars = [
        {
            title: "Global Impact",
            desc: "Extending our services across continents to empower organizations worldwide",
            details: "We aim to reach 100+ countries and serve 10,000+ organizations globally by 2030",
            image: g1
        },
        {
            title: "Innovation",
            desc: "Pioneering next-generation solutions through continuous research & development",
            details: "Investing 20% of revenue in R&D for breakthrough technologies and methodologies",
            image: g2
        },
        {
            title: "Strategic Partnerships",
            desc: "Building strong collaborations with industry leaders and technology innovators",
            details: "Creating ecosystem partnerships to deliver integrated, best-in-class solutions",
             image: g3
        },
        {
            title: "Sustainable Growth",
            desc: "Achieving consistent, profitable growth while maintaining our core values",
            details: "Targeting 30% annual growth with strong profitability and stakeholder value",
            image: g4
        },
    ];

    const futureFocus = [
        {
            area: "Digital Transformation",
            goals: [
                "Enable enterprises to embrace Industry 4.0",
                "Lead cloud adoption and migration strategies",
                "Drive IoT and real-time analytics adoption"
            ],
            color: "from-blue-500 to-blue-600",
            image: g10
        },
        {
            area: "AI & Machine Learning",
            goals: [
                "Make AI accessible to organizations of all sizes",
                "Develop industry-specific AI solutions",
                "Build responsible and ethical AI systems"
            ],
            color: "from-purple-500 to-purple-600",
            image: g11
        },
        {
            area: "Sustainability & ESG",
            goals: [
                "Help organizations achieve carbon neutrality",
                "Promote sustainable business practices",
                "Champion environmental responsibility"
            ],
            color: "from-green-500 to-green-600",
            image: g12
        },
        {
            area: "Customer Excellence",
            goals: [
                "Deliver exceptional customer experiences",
                "Build long-term strategic partnerships",
                "Consistently exceed expectations"
            ],
            color: "from-amber-500 to-amber-600",
            image: g13
        },
    ];

    const values = [
        {
            value: "Excellence",
            description: "Pursuing the highest standards in everything we do",
            color: "from-yellow-100 to-yellow-50",
            borderColor: "border-yellow-500",
            image: g4
        },
        {
            value: "Integrity",
            description: "Acting with honesty, transparency, and ethical principles",
            color: "from-blue-100 to-blue-50",
            borderColor: "border-blue-500",
            image: g5
        },
        {
            value: "Innovation",
            description: "Embracing change and driving continuous improvement",
            color: "from-purple-100 to-purple-50",
            borderColor: "border-purple-500",
            image: g6
        },
        {
            value: "Collaboration",
            description: "Working together to achieve extraordinary results",
            color: "from-pink-100 to-pink-50",
            borderColor: "border-pink-500",
            image: g7
        },
        {
            value: "Customer Focus",
            description: "Putting our customers at the center of our decisions",
            color: "from-green-100 to-green-50",
            borderColor: "border-green-500",
            image: g8
        },
        {
            value: "Responsibility",
            description: "Making positive impact on society and environment",
            color: "from-teal-100 to-teal-50",
            borderColor: "border-teal-500",
            image: g9
        },
    ];

    const roadmap = [
        {
            year: "2025",
            phase: "Foundation & Expansion",
            milestone: "Global Footprint Establishment",
            description: "Strengthening our presence across continents with cutting-edge infrastructure and technology",
            achievements: [
                { title: "Regional Growth", detail: "Launch 10 new offices across emerging markets" },
                { title: "Innovation Centers", detail: "Establish 5 continental innovation hubs" },
                { title: "AI Integration", detail: "Deploy comprehensive AI-powered service suite" },
                { title: "Talent Acquisition", detail: "Onboard 2,500+ skilled professionals globally" }
            ],
            icon: Rocket,
            color: "from-blue-500 to-cyan-500"
        },
        {
            year: "2026",
            phase: "Market Leadership",
            milestone: "Industry Recognition & Scale",
            description: "Establishing market dominance through innovation, quality, and enterprise-grade solutions",
            achievements: [
                { title: "Market Position", detail: "Rank among top-3 digital transformation providers" },
                { title: "Platform Launch", detail: "Release proprietary AI-powered automation platform" },
                { title: "Client Milestone", detail: "Serve 5,000+ enterprise clients worldwide" },
                { title: "Strategic Partnerships", detail: "Form alliances with 50+ technology leaders" }
            ],
            icon: Trophy,
            color: "from-purple-500 to-indigo-500"
        },
        {
            year: "2027",
            phase: "Sustainability Focus",
            milestone: "Environmental & Social Impact",
            description: "Leading the industry in sustainable practices and empowering organizations for a greener future",
            achievements: [
                { title: "Carbon Neutral", detail: "Achieve 100% carbon-neutral global operations" },
                { title: "ESG Leadership", detail: "Help 500+ organizations transition to sustainability" },
                { title: "Green Solutions", detail: "Launch eco-friendly product line and services" },
                { title: "Social Impact", detail: "Impact 1M+ lives through CSR initiatives" }
            ],
            icon: Sparkles,
            color: "from-green-500 to-emerald-500"
        },
        {
            year: "2028",
            phase: "Global Dominance",
            milestone: "Undisputed Industry Leader",
            description: "Setting global standards in technology, innovation, and excellence as the employer of choice",
            achievements: [
                { title: "Global Reach", detail: "Operate across 75+ countries on all continents" },
                { title: "Enterprise Scale", detail: "Support 10,000+ enterprise clients globally" },
                { title: "Employer Brand", detail: "Become #1 employer of choice in tech industry" },
                { title: "Innovation Labs", detail: "Run 15+ R&D labs pioneering future technologies" }
            ],
            icon: Award,
            color: "from-amber-500 to-orange-500"
        },
    ];

    const stats = [
        { metric: "75+", label: "Countries We Serve" },
        { metric: "10K+", label: "Enterprise Clients" },
        { metric: "$5B+", label: "Client Value Created" },
        { metric: "25K+", label: "Skilled Professionals" },
    ];

    return (
        <div className="bg-white">
            {/* ===== Hero Section ===== */}
            <div 
                className="relative h-[600px] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `url(${visin})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    {/* <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Vision
                    </span> */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">Vision</span> for Tomorrow
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed drop-shadow-lg">
                        To be the world's most trusted technology partner, transforming businesses and empowering organizations to achieve their boldest aspirations
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 shadow-2xl text-lg">
                            <Target className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Discover Our Journey
                        </button>
                        <button className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg">
                            Our Impact
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Vision Statement ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Vision Statement
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                            Our Vision Statement
                        </h2>
                        <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-white rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-2xl hover:border-purple-400 transition-all duration-500 cursor-pointer group">
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 leading-relaxed group-hover:scale-105 transition-all duration-300">
                                "To empower organizations worldwide with innovative technology solutions, strategic partnerships, and expert guidance that drive transformation, create lasting value, and shape the future of industries."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Vision Pillars ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Strategic Pillars
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Four Pillars of Our Vision
                        </h2>
                        <p className="text-xl text-gray-600">The foundation of our strategic direction</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                        {visionPillars.map((pillar, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                                {/* Background Image - Clear and Visible */}
                                <div className="absolute inset-0">
                                    <img 
                                        src={pillar.image} 
                                        alt={pillar.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 brightness-90"
                                    />
                                    {/* Subtle dark overlay only at bottom for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="relative bg-transparent rounded-2xl p-6 md:p-8 h-full flex flex-col justify-end">
                                    <div className="relative">
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-2xl">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-white mb-3 md:mb-4 leading-relaxed drop-shadow-lg">
                                            {pillar.desc}
                                        </p>
                                        <div className="pt-3 md:pt-4 border-t-2 border-white/40">
                                            <p className="text-xs md:text-sm text-white font-semibold drop-shadow-lg">
                                                {pillar.details}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Core Values ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
                {/* Background Image - Clear and Visible */}
                <div className="absolute inset-0">
                    <img 
                        src={g9}
                        alt="Values Background" 
                        className="w-full h-full object-cover brightness-90"
                    />
                    <div className="absolute inset-0 bg-white/30"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Core Values
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600">Principles that guide our decisions and actions</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {values.map((val, idx) => (
                            <div key={idx} className="group rounded-xl p-6 md:p-8 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden">
                                {/* Background Image for Each Card - Clear and Visible */}
                                <div className="absolute inset-0">
                                    <img 
                                        src={val.image} 
                                        alt={val.value} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 brightness-90"
                                    />
                                    {/* Subtle dark overlay only at bottom for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                </div>
                                <div className="relative z-10 h-full flex flex-col justify-end">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-2xl">
                                        {val.value}
                                    </h3>
                                    <p className="text-sm md:text-base text-white leading-relaxed drop-shadow-lg">
                                        {val.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Future Focus Areas ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Future Focus
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Future Focus Areas
                        </h2>
                        <p className="text-xl text-gray-600">Where we're investing for tomorrow's opportunities</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                        {futureFocus.map((focus, idx) => (
                            <div key={idx} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
                                {/* Background Image - Clear and Visible */}
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img 
                                        src={focus.image} 
                                        alt={focus.area} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 brightness-90"
                                    />
                                    {/* Subtle dark overlay only at bottom for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white text-center px-4 drop-shadow-2xl">
                                            {focus.area}
                                        </h3>
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="bg-white p-6 md:p-8">
                                    <ul className="space-y-3 md:space-y-4">
                                        {focus.goals.map((goal, i) => (
                                            <li key={i} className="flex items-start gap-3 group-hover:translate-x-2 transition-all duration-300">
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${focus.color} mt-2 flex-shrink-0`}></div>
                                                <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900">{goal}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Vision Roadmap ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold rounded-full mb-6 shadow-lg uppercase tracking-wider">
                            Our Journey Ahead
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                            Strategic Roadmap to 2028
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Four transformative phases that will shape our journey from global expansion to industry leadership
                        </p>
                    </div>

                    {/* Desktop: Horizontal Timeline */}
                    <div className="hidden lg:block relative">
                        {/* Connecting Line */}
                        <div className="absolute top-24 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 via-green-500 to-amber-500 rounded-full shadow-lg"></div>
                        
                        <div className="grid grid-cols-4 gap-6 items-start">
                            {roadmap.map((item, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Timeline Dot */}
                                    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-2xl ring-4 ring-white group-hover:scale-125 transition-all duration-500`}>
                                            <item.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    
                                    {/* Card */}
                                    <div className="mt-32 bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
                                        {/* Year Badge */}
                                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${item.color} text-white text-2xl font-bold rounded-xl shadow-lg mb-4`}>
                                            {item.year}
                                        </div>
                                        
                                        {/* Phase Label */}
                                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">
                                            Phase {idx + 1}
                                        </div>
                                        
                                        {/* Phase Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {item.phase}
                                        </h3>
                                        
                                        {/* Milestone */}
                                        <h4 className="text-base font-semibold text-gray-700 mb-3">
                                            {item.milestone}
                                        </h4>
                                        
                                        {/* Description */}
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4 border-l-4 border-purple-300 pl-3">
                                            {item.description}
                                        </p>
                                        
                                        {/* Achievements */}
                                        <div className="space-y-3 mt-4">
                                            {item.achievements.map((achievement, i) => (
                                                <div key={i} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 border border-purple-100">
                                                    <div className="flex items-start gap-2">
                                                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md`}>
                                                            <span className="text-white text-xs font-bold">✓</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-xs font-bold text-gray-900 mb-0.5">{achievement.title}</p>
                                                            <p className="text-xs text-gray-600 leading-relaxed">{achievement.detail}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile & Tablet: Vertical Timeline */}
                    <div className="lg:hidden relative">
                        {/* Vertical connecting line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 via-green-500 to-amber-500 rounded-full"></div>
                        
                        <div className="space-y-8 md:space-y-12">
                            {roadmap.map((item, idx) => (
                                <div key={idx} className="relative pl-16 md:pl-20 group">
                                    {/* Timeline Icon */}
                                    <div className="absolute left-2 md:left-3 top-0">
                                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl ring-4 ring-white`}>
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                        </div>
                                    </div>
                                    
                                    {/* Card */}
                                    <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-500">
                                        {/* Year & Phase */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`px-4 py-2 bg-gradient-to-r ${item.color} text-white text-xl md:text-2xl font-bold rounded-xl shadow-lg`}>
                                                {item.year}
                                            </div>
                                            <div className="text-xs md:text-sm font-bold text-purple-600 uppercase tracking-wider">
                                                Phase {idx + 1}
                                            </div>
                                        </div>
                                        
                                        {/* Phase Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {item.phase}
                                        </h3>
                                        
                                        {/* Milestone */}
                                        <h4 className="text-base md:text-lg font-semibold text-gray-700 mb-3">
                                            {item.milestone}
                                        </h4>
                                        
                                        {/* Description */}
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 border-l-4 border-purple-300 pl-4">
                                            {item.description}
                                        </p>
                                        
                                        {/* Achievements */}
                                        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                                            {item.achievements.map((achievement, i) => (
                                                <div key={i} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100 hover:shadow-lg transition-all duration-300">
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                                            <span className="text-white text-sm font-bold">✓</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-gray-900 mb-1">{achievement.title}</p>
                                                            <p className="text-xs text-gray-600 leading-relaxed">{achievement.detail}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 md:mt-20 text-center">
                        <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-red-700 rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden border border-amber-500/30">
                            {/* Premium decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="absolute top-10 left-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
                            </div>
                            
                            {/* Premium badge */}
                            <div className="relative inline-block mb-6">
                                <div className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black text-xs md:text-sm font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/50">
                                    <Sparkles className="w-4 h-4" />
                                    Exclusive Opportunity
                                </div>
                            </div>
                            
                            {/* Premium heading */}
                            <h3 className="relative text-3xl md:text-4xl lg:text-5xl font-black mb-6 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent leading-tight">
                                Join Us on This Journey
                            </h3>
                            
                            {/* Premium divider */}
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500"></div>
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500"></div>
                            </div>
                            
                            {/* Premium description */}
                            <p className="relative text-base md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                                Be part of our <span className="text-amber-400 font-semibold">transformative journey</span> as we shape the future of <span className="text-purple-400 font-semibold">technology</span> and <span className="text-blue-400 font-semibold">innovation</span>
                            </p>
                            
                            {/* Premium CTA buttons */}
                            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black text-base md:text-lg font-black rounded-xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105 transition-all duration-300 uppercase tracking-wide">
                                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    Explore Opportunities
                                    <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <button className="inline-flex items-center gap-2 px-10 py-4 bg-transparent border-2 border-amber-400/50 text-amber-400 text-base md:text-lg font-bold rounded-xl hover:bg-amber-400/10 hover:border-amber-400 hover:scale-105 transition-all duration-300 uppercase tracking-wide">
                                    Learn More
                                    <TrendingUp className="w-5 h-5" />
                                </button>
                            </div>
                            
                            {/* Premium stats bar */}
                            <div className="relative mt-12 pt-8 border-t border-amber-500/20">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                                    <div className="text-center">
                                        <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">75+</p>
                                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Countries</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent mb-2">10K+</p>
                                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Clients</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">$5B+</p>
                                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Value Created</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">25K+</p>
                                        <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Professionals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Vision Commitment ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative min-h-[700px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={g14}
                        alt="Commitment Background" 
                        className="w-full h-full object-cover object-center brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60"></div>
                </div>

                <div className="relative max-w-5xl mx-auto text-center flex flex-col justify-center min-h-[600px]">
                    <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-6 mx-auto">
                        Our Promise
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 drop-shadow-2xl">
                        Our Commitment to You
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-100 mb-12 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
                        We are committed to building an organization that not only achieves business success but also makes a meaningful positive impact on society, the environment, and the communities we serve. Our vision is aspirational yet grounded in measurable, achievable goals that drive us every single day.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-6 mt-12">
                        {[
                            { text: "Innovation", number: "01", icon: Lightbulb },
                            { text: "Responsibility", number: "02", icon: Shield },
                            { text: "Excellence", number: "03", icon: Award }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 hover:border-amber-400 hover:bg-white/20 transition-all duration-500 cursor-pointer">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-6xl font-bold text-white/20 mb-3 group-hover:text-white/30 transition-colors">
                                    {item.number}
                                </p>
                                <p className="text-xl text-white font-bold group-hover:text-amber-300 transition-colors">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Final CTA ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Top Badge */}
                    <div className="text-center mb-8">
                        <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full mb-6 text-purple-300 text-sm font-bold uppercase tracking-wider\">\n                            Join Our Journey\n                        </span>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight\">\n                            Be Part of Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300\">Vision</span>\n                        </h2>
                        
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
                        </div>
                        
                        <p className="text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Join us in shaping the future of <span className="text-purple-300 font-semibold">technology</span> and <span className="text-indigo-300 font-semibold">innovation</span>. Together, we can achieve extraordinary things and create lasting impact.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <button className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 text-lg">
                            <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Explore Opportunities
                            <Zap className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                        <button className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 text-lg">
                            Learn More
                            <TrendingUp className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                    <Target className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-3xl md:text-4xl font-black text-white group-hover:text-purple-300 transition-colors mb-1">2028</p>
                                    <p className="text-sm md:text-base text-gray-400 font-medium">Target Year</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">Achieving global leadership and sustainable growth</p>
                        </div>

                        <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-indigo-400/50 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
                                    <Globe className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-3xl md:text-4xl font-black text-white group-hover:text-indigo-300 transition-colors mb-1">75+</p>
                                    <p className="text-sm md:text-base text-gray-400 font-medium">Countries</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">Expanding our global footprint across continents</p>
                        </div>

                        <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                    <Building2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-300 transition-colors mb-1">10K+</p>
                                    <p className="text-sm md:text-base text-gray-400 font-medium">Enterprise Clients</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">Empowering businesses to reach their full potential</p>
                        </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="mt-12 pt-8 border-t border-white/10 text-center">
                        <p className="text-gray-400 text-base flex items-center justify-center gap-2">
                            Ready to transform your organization? 
                            <span className="inline-flex items-center gap-1 text-purple-300 font-semibold cursor-pointer hover:text-purple-200 transition-colors">
                                Get in touch 
                                <Zap className="w-4 h-4" />
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}