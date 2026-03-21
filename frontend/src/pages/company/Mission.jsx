import React from "react";
import { Target, Sparkles, TrendingUp, Users, Shield, CheckCircle, Lightbulb, Heart, Award, Zap, Globe, Building2, Rocket } from "lucide-react";
import about1 from "../../assets/about-1.jpg";
import about2 from "../../assets/about-2.jpg";
import commitment from "../../assets/commitment.webp";
import m1 from "../../assets/m1.png";
import gov from "../../assets/gov.png";
import mission from "../../assets/mission.png";
export default function Mission() {
    const missionPillars = [
        {
            title: "Drive Digital Transformation",
            description: "Enable organizations to embrace digital technologies and modernize their operations for competitive advantage",
            impact: "Helping 1000+ enterprises transform annually",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Deliver Innovation",
            description: "Create cutting-edge solutions that solve complex business challenges with creativity and technology",
            impact: "50+ proprietary solutions launched",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Empower People",
            description: "Develop and nurture talent to build a world-class team of experts and leaders",
            impact: "25,000+ skilled professionals developed",
            gradient: "from-green-500 to-teal-500"
        },
        {
            title: "Create Positive Impact",
            description: "Contribute to sustainable business practices and societal progress through our work",
            impact: "$100M+ value created for communities",
            gradient: "from-orange-500 to-red-500"
        },
    ];

    const whatWeDo = [
        {
            title: "Custom Solutions",
            desc: "Build tailored technology solutions aligned with your unique business objectives",
            features: ["Enterprise apps", "Cloud platforms", "Data analytics", "AI integration"],
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Strategic Consulting",
            desc: "Provide expert guidance to navigate digital transformation and technology challenges",
            features: ["Technology roadmaps", "Digital strategy", "Process optimization", "Change management"],
            gradient: "from-purple-500 to-pink-600"
        },
        {
            title: "Managed Services",
            desc: "Offer comprehensive support for your critical business systems and operations",
            features: ["24/7 support", "Infrastructure mgmt", "Performance monitoring", "Proactive updates"],
            gradient: "from-green-500 to-teal-600"
        },
        {
            title: "Training & Development",
            desc: "Equip your teams with skills and knowledge for modern technologies",
            features: ["Technical training", "Leadership programs", "Certification paths", "Skill assessments"],
            gradient: "from-yellow-500 to-orange-600"
        },
        {
            title: "Partnership & Collaboration",
            desc: "Work as an extension of your team to achieve shared objectives",
            features: ["Dedicated teams", "Integrated planning", "Transparent communication", "Long-term support"],
            gradient: "from-red-500 to-rose-600"
        },
        {
            title: "Security & Compliance",
            desc: "Protect your assets with enterprise-grade security and regulatory compliance",
            features: ["Risk assessment", "Security audits", "Compliance training", "Incident response"],
            gradient: "from-indigo-500 to-purple-600"
        },
    ];

    const ourApproach = [
        {
            step: "1",
            title: "Listen & Understand",
            description: "We invest time to deeply understand your business, challenges, and aspirations before proposing solutions"
        },
        {
            step: "2",
            title: "Strategize & Plan",
            description: "Develop a comprehensive roadmap with clear milestones, deliverables, and success metrics"
        },
        {
            step: "3",
            title: "Execute with Excellence",
            description: "Deliver solutions with quality, innovation, and adherence to timelines and budgets"
        },
        {
            step: "4",
            title: "Support & Optimize",
            description: "Provide ongoing support and continuously optimize for performance and business impact"
        },
        {
            step: "5",
            title: "Celebrate Success",
            description: "Measure outcomes, celebrate milestones, and document lessons learned for future growth"
        },
    ];

       const targetMarkets = [
        {
            sector: "Financial Services",
            focus: "Digital banking, wealth management, risk analytics",
            color: "from-green-500 to-emerald-600",
            image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
        },
        {
            sector: "Healthcare",
            focus: "Patient care systems, data management, compliance",
            color: "from-red-500 to-rose-600",
            image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop"
        },
        {
            sector: "Retail & E-commerce",
            focus: "Customer experience, inventory, digital sales",
            color: "from-pink-500 to-rose-600",
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
        },
        {
            sector: "Manufacturing",
            focus: "IoT, supply chain, production optimization",
            color: "from-yellow-500 to-orange-600",
            image: m1
        },
        {
            sector: "Telecommunications",
            focus: "Network infrastructure, customer platforms, analytics",
            color: "from-blue-500 to-cyan-600",
            image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=600&fit=crop"
        },
        {
            sector: "Government",
            focus: "Public services, citizen engagement, compliance",
            color: "from-indigo-500 to-purple-600",
            image: gov
        },
    ];

    const values = [
        {
            title: "Client Success",
            description: "Your success is our success. We're committed to delivering measurable results and exceeding expectations.",
            gradient: "from-yellow-500 to-amber-600"
        },
        {
            title: "Integrity",
            description: "We operate with transparency, honesty, and ethical principles in all our dealings.",
            gradient: "from-blue-500 to-indigo-600"
        },
        {
            title: "Innovation",
            description: "We constantly explore new technologies and methodologies to stay ahead of the curve.",
            gradient: "from-purple-500 to-pink-600"
        },
        {
            title: "Collaboration",
            description: "We believe in the power of teamwork and partnerships to solve complex challenges.",
            gradient: "from-green-500 to-teal-600"
        },
    ];

    const impact = [
        {
            metric: "1000+",
            label: "Organizations Transformed",
            detail: "Enterprises modernized with our solutions"
        },
        {
            metric: "$50B+",
            label: "Client Revenue Impact",
            detail: "Direct and indirect business value created"
        },
        {
            metric: "99.9%",
            label: "Customer Satisfaction",
            detail: "Client retention and satisfaction rate"
        },
        {
            metric: "500+",
            label: "Projects Annually",
            detail: "Successfully delivered projects yearly"
        },
    ];

    const commitments = [
        "Deliver solutions on time, within budget, and exceeding expectations",
        "Maintain the highest standards of quality and security in everything we do",
        "Invest in our people to create a learning, inclusive, and innovative culture",
        "Support sustainable business practices and contribute to societal progress",
        "Provide transparent communication and build lasting partnerships with clients",
        "Continuously improve our services based on client feedback and market trends"
    ];

    return (
        <div className="bg-white">
            {/* ===== Hero Section ===== */}
            <div 
                className="relative h-[600px] flex items-center justify-start overflow-hidden"
                style={{
                    backgroundImage: `url(${mission})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    {/* <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Mission
                    </span> */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">Mission</span> Matters
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed drop-shadow-lg">
                        To transform businesses through innovative technology solutions, strategic partnerships, and exceptional service that creates lasting value and positive impact
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 shadow-2xl text-lg">
                            <Target className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Start Your Journey
                        </button>
                        <button className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg">
                            Our Approach
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Mission Statement ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Mission Statement
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                            Our Core Mission
                        </h2>
                        <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-white rounded-2xl border-2 border-teal-200 shadow-lg hover:shadow-2xl hover:border-teal-400 transition-all duration-500 cursor-pointer group">
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 leading-relaxed group-hover:scale-105 transition-all duration-300">
                                To empower organizations with transformative technology solutions, expert guidance, and dedicated partnership that drive sustainable growth, innovation, and measurable business success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Mission Pillars ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Core Pillars
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Four Core Pillars
                        </h2>
                        <p className="text-xl text-gray-600">Building blocks of our daily mission</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                        {missionPillars.map((pillar, idx) => (
                            <div key={idx} className="group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 group-hover:from-teal-500/20 group-hover:to-emerald-500/20 transition-all duration-500 rounded-2xl"></div>
                                <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-teal-600 transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 group-hover:text-gray-800 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                    <div className="pt-3 md:pt-4 border-t-2 border-gray-200 group-hover:border-teal-300 transition-colors">
                                        <p className="text-xs md:text-sm text-teal-600 font-semibold">
                                            ✓ {pillar.impact}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== What We Do ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            What We Do
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            What We Do
                        </h2>
                        <p className="text-xl text-gray-600">Comprehensive services delivering mission-driven results</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {whatWeDo.map((service, idx) => (
                            <div key={idx} className="group bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 transition-all duration-500 border-l-4 border-transparent hover:border-teal-400 cursor-pointer relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-100/0 to-emerald-100/0 group-hover:from-teal-100/10 group-hover:to-emerald-100/10 transition-all duration-500"></div>
                                <div className="relative z-10">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${service.gradient} mb-3 md:mb-4 group-hover:scale-110 transition-all duration-300`}></div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-teal-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 group-hover:text-gray-700 transition-colors leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-600">
                                        {service.features.map((feat, i) => (
                                            <li key={i} className="flex items-center gap-2 group-hover:text-teal-600 transition-colors">
                                                <span className="w-2 h-2 bg-teal-400 rounded-full group-hover:scale-150 transition-all duration-300"></span>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Our Approach ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={about2} 
                        alt="Approach Background" 
                        className="w-full h-full object-cover brightness-90"
                    />
                    <div className="absolute inset-0 bg-white/85"></div>
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Approach
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            How We Work
                        </h2>
                        <p className="text-xl text-gray-600">Our five-step mission-driven approach</p>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        {ourApproach.map((phase, idx) => (
                            <div key={idx} className="group relative">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                                    <div className="flex-none">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center font-bold text-white text-xl md:text-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                                            {phase.step}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 group-hover:-translate-y-2">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-teal-600 transition-colors">
                                                {phase.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-800 transition-colors leading-relaxed">
                                                {phase.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Industries We Serve ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Industries We Serve
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Industries We Serve
                        </h2>
                        <p className="text-xl text-gray-600">Delivering mission-aligned solutions across sectors</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {targetMarkets.map((market, idx) => (
                            <div key={idx} className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2">
                                <div className="relative h-40 md:h-48 overflow-hidden">
                                    <img 
                                        src={market.image} 
                                        alt={market.sector} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 brightness-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-xl md:text-2xl font-bold text-white text-center px-4 drop-shadow-2xl">
                                            {market.sector}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-white p-4 md:p-6">
                                    <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                                        {market.focus}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Our Values ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={commitment} 
                        alt="Values Background" 
                        className="w-full h-full object-cover brightness-90"
                    />
                    <div className="absolute inset-0 bg-white/80"></div>
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Values
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Values That Guide Us
                        </h2>
                        <p className="text-xl text-gray-600">Core principles in our mission execution</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="group bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
                                <div className="flex items-start gap-4 md:gap-6">
                                    <div className={"flex-none w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br " + val.gradient + " group-hover:scale-110 transition-all duration-300"}></div>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-teal-600 transition-colors">
                                            {val.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-800 transition-colors leading-relaxed">
                                            {val.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Impact Metrics ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Impact Metrics
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Mission Impact
                        </h2>
                        <p className="text-xl text-gray-600">Measurable results from our mission-driven work</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {impact.map((item, idx) => (
                            <div key={idx} className="group bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 text-center">
                                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:scale-110 transition-all duration-300 mb-2 md:mb-3">
                                    {item.metric}
                                </p>
                                <p className="text-sm md:text-base text-gray-900 font-semibold mb-1.5 md:mb-2 group-hover:text-teal-600 transition-colors">
                                    {item.label}
                                </p>
                                <p className="text-xs md:text-sm text-gray-600 group-hover:text-gray-700">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Our Commitments ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Commitments
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Our Commitments
                        </h2>
                        <p className="text-xl text-gray-600">Promises we make every day</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {commitments.map((commitment, idx) => (
                            <div key={idx} className="group flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg border-2 border-gray-200 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 cursor-pointer hover:bg-teal-50/50">
                                <div className="flex-none">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm md:text-base text-gray-700 font-semibold group-hover:text-gray-900 transition-colors leading-relaxed">
                                        {commitment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Client Success Stories ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-sm font-bold uppercase tracking-wider mb-4">
                            Success Stories
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                            Mission in Action
                        </h2>
                        <p className="text-xl text-gray-300">Real impact from our mission-driven partnerships</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                company: "RetailCorp Global",
                                challenge: "Modernize legacy e-commerce platform",
                                mission: "Enabled 24/7 shopping experience",
                                result: "+150% sales increase"
                            },
                            {
                                company: "HealthFirst Medical",
                                challenge: "Unified patient care systems",
                                mission: "Improved patient outcomes",
                                result: "40% faster diagnoses"
                            },
                            {
                                company: "FinanceFlow Ltd",
                                challenge: "Digital banking transformation",
                                mission: "Financial inclusion for millions",
                                result: "500K+ new users"
                            },
                        ].map((story, idx) => (
                            <div key={idx} className="group bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl p-6 md:p-8 border-2 border-gray-600 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden">
                                <div className="relative">
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                                        {story.company}
                                    </h3>
                                    <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">
                                        <span className="text-gray-500">Challenge:</span> {story.challenge}
                                    </p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg flex items-center justify-center">
                                            <Lightbulb className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-teal-300 font-semibold text-sm md:text-base">
                                            {story.mission}
                                        </p>
                                    </div>
                                    <div className="pt-3 md:pt-4 border-t border-gray-500">
                                        <p className="text-teal-300 font-bold group-hover:text-teal-100 transition-colors text-sm md:text-base">
                                            {story.result}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Final CTA ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <Rocket className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                        Join Us in Our Mission
                    </h2>
                    <p className="text-xl text-teal-100 mb-10 leading-relaxed">
                        Partner with us to achieve meaningful digital transformation, sustainable growth, and lasting business success through our mission-driven approach
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 text-lg">
                            <Target className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Begin Your Transformation
                        </button>
                        <button className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg">
                            Explore Solutions
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-teal-400/30 grid grid-cols-3 gap-4 md:gap-8">
                        <div className="text-center group">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:scale-110 transition-all duration-300">1000+</p>
                            <p className="text-xs md:text-sm text-teal-100 font-semibold group-hover:text-white transition-colors">Organizations Transformed</p>
                        </div>
                        <div className="text-center group">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:scale-110 transition-all duration-300">$50B+</p>
                            <p className="text-xs md:text-sm text-teal-100 font-semibold group-hover:text-white transition-colors">Client Value Created</p>
                        </div>
                        <div className="text-center group">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:scale-110 transition-all duration-300">99.9%</p>
                            <p className="text-xs md:text-sm text-teal-100 font-semibold group-hover:text-white transition-colors">Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}