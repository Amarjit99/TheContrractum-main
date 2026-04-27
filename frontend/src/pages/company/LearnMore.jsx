import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Lightbulb, TrendingUp, Target, Users, ShieldCheck, Globe2 } from "lucide-react";
import img1 from "../../assets/g11.png"; // AI & ML
import img2 from "../../assets/g10.png"; // Digital Transformation
import img3 from "../../assets/g12.png"; // Sustainability

export default function LearnMore() {
    const focusAreas = [
        {
            icon: Lightbulb,
            title: "Innovation & Technology",
            desc: "Discover how we leverage emerging technologies like AI, IoT, and cloud computing to create scalable, future-proof solutions for enterprises worldwide.",
            color: "from-blue-500 to-indigo-600",
            image: img1
        },
        {
            icon: TrendingUp,
            title: "Digital Transformation",
            desc: "Learn about our systematic approach to modernizing legacy systems, automating workflows, and driving unprecedented operational efficiency.",
            color: "from-purple-500 to-fuchsia-600",
            image: img2
        },
        {
            icon: Globe2,
            title: "Sustainable Business",
            desc: "Explore our commitment to ESG initiatives, carbon neutrality, and building green technology solutions for a better tomorrow.",
            color: "from-emerald-500 to-teal-600",
            image: img3
        }
    ];

    const principles = [
        { icon: Target, title: "Client-Centricity", desc: "Every solution is tailored to meet specific business objectives." },
        { icon: ShieldCheck, title: "Uncompromising Quality", desc: "Rigorous testing and security standards at every step." },
        { icon: Users, title: "Collaborative Growth", desc: "Building long-term partnerships, not just vendor relationships." }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* ===== Hero Header ===== */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]"></div>
                </div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold uppercase tracking-widest mb-6">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        Deep Dive
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                        Learn More About Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Vision</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-light">
                        Dive deeper into our strategic focus areas, core methodologies, and how we are engineering the future of global enterprise technology.
                    </p>
                </div>
            </div>

            {/* ===== Focus Areas ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto -mt-32 relative z-20">
                    <div className="grid md:grid-cols-3 gap-8">
                        {focusAreas.map((area, idx) => (
                            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group border border-slate-100 flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={area.image} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-6">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center shadow-lg`}>
                                            <area.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{area.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6 flex-1">{area.desc}</p>
                                    <Link to="/contact/touch" className={`inline-flex items-center text-sm font-bold bg-gradient-to-r ${area.color} bg-clip-text text-transparent group-hover:gap-3 gap-2 transition-all duration-300`}>
                                        Discuss This Focus Area <ArrowRight className="w-4 h-4 text-indigo-500" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Core Methodology ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Methodology</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                How We Turn Vision Into Reality
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                We don't just dream about the future; we build it through a framework of proven methodologies, agile practices, and an unwavering commitment to excellence.
                            </p>
                            
                            <div className="space-y-6">
                                {principles.map((principle, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                                            <principle.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-1">{principle.title}</h4>
                                            <p className="text-slate-600">{principle.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-indigo-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
                                <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Start Your Digital Journey</h3>
                                <p className="text-indigo-200 mb-8 relative z-10 leading-relaxed">
                                    Whether you need to modernize your infrastructure, implement AI, or scale globally, our experts are ready to guide you.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                    <Link to="/contact/quote" className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl text-center hover:bg-indigo-50 transition-colors shadow-lg">
                                        Request a Consultation
                                    </Link>
                                    <Link to="/company/our-journey" className="px-8 py-4 bg-transparent border-2 border-indigo-400 text-indigo-100 font-bold rounded-xl text-center hover:bg-indigo-800 transition-colors">
                                        View Company Timeline
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
