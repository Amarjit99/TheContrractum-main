import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Network, Server, Shield, Zap, Layout, Info, CheckCircle2, Globe, Cpu } from 'lucide-react';
import architectureHero from "../../../assets/network_architecture_hero.png";

const NetworkArchitecture = () => {
    const topologies = [
        {
            name: "Hub & Spoke",
            desc: "A centralized hub connects multiple spoke sites, ideal for branch-office connectivity.",
            latency: "5-10ms",
            scalability: "High",
            bestFor: "Regional Branch Offices",
            features: ["Centralized Security", "Simplified Management", "Cost-Effective", "Easily Scalable"]
        },
        {
            name: "Full Mesh",
            desc: "Every node is connected to every other node, providing maximum redundancy and lowest latency.",
            latency: "1-2ms",
            scalability: "Limited",
            bestFor: "Data Center Interconnects",
            features: ["Self-Healing", "Ultra-Low Latency", "No Single Point of Failure", "Highest Availability"]
        },
        {
            name: "SD-WAN Mesh",
            desc: "Software-defined wide area network that intelligently routes traffic over multiple connections.",
            latency: "3-8ms",
            scalability: "Ultra",
            bestFor: "Cloud-First Enterprises",
            features: ["Path Optimization", "Application Awareness", "Centralized Orchestration", "Zero-Touch Provisioning"]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[500px] flex items-center overflow-hidden" style={{ backgroundImage: `url(${architectureHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl text-white font-sans">
                        <Link to="/solutions/connectivity/network-infra" className="inline-flex items-center text-cyan-400 font-bold mb-6 hover:text-cyan-300 transition group">
                            <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
                            Back to Infrastructure
                        </Link>
                        <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
                            Future-Proof <span className="text-cyan-400">Network Architecture</span>
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
                            Custom-engineered network topologies designed for maximum uptime, ultra-low latency, and seamless scalability across your global enterprise.
                        </p>
                    </div>
                </div>
            </div>

            {/* Architecture Patterns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Enterprise Topology Patterns</h2>
                    <p className="text-slate-600 text-lg">Select the architecture that aligns with your performance and budget requirements.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topologies.map((topo, i) => (
                        <div key={i} className="group bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 hover:border-cyan-500 transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition duration-300 shadow-inner">
                                <Network className="w-7 h-7 text-cyan-600 group-hover:text-white transition duration-300" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4">{topo.name}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{topo.desc}</p>
                            
                            <div className="space-y-3 mb-8">
                                {topo.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs font-black text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        {feat}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Latency</p>
                                    <p className="font-black text-cyan-600 italic leading-none">{topo.latency}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Scale</p>
                                    <p className="font-black text-slate-900 italic leading-none">{topo.scalability}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* In-depth Review */}
            <div className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-cyan-400 font-black tracking-widest uppercase text-xs mb-4 inline-block">Design Philosophy</span>
                            <h2 className="text-4xl font-black text-white mb-8 leading-tight">Optimized for Total Performance</h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-sans">
                                Our architecture design process involves deep discovery phases where we analyze your traffic flows, latency requirements, and regional growth projections to build a network that grows with you.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: Shield, title: "Zero Trust", color: "bg-red-500/10 text-red-500" },
                                    { icon: Zap, title: "Edge Logic", color: "bg-orange-500/10 text-orange-500" },
                                    { icon: Server, title: "Redundancy", color: "bg-cyan-500/10 text-cyan-500" },
                                    { icon: Layout, title: "Elasticity", color: "bg-purple-500/10 text-purple-500" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-white font-bold">{item.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 shadow-2xl group">
                            <div className="flex items-center gap-4 mb-8">
                                <Info className="text-cyan-400 w-8 h-8" />
                                <h4 className="text-2xl font-black text-white">Project Methodology</h4>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Site Discovery", desc: "Granular analysis of physical and virtual node requirements." },
                                    { step: "02", title: "Traffic Modeling", desc: "Simulations of peak-load scenarios and failure modes." },
                                    { step: "03", title: "Final Validation", desc: "Rigorous testing of failover and load balancing logic." }
                                ].map((step, i) => (
                                    <div key={i} className="relative pl-12">
                                        <div className="absolute left-0 top-0 text-cyan-500 text-3xl font-black opacity-30 group-hover:opacity-100 transition duration-500">{step.step}</div>
                                        <h5 className="font-black text-white mb-1">{step.title}</h5>
                                        <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <Link to="/contact/touch" className="mt-12 block text-center bg-cyan-600 text-white font-black py-4 rounded-2xl hover:bg-cyan-500 transition transform hover:scale-105 shadow-xl">
                                Request Custom Design
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Need Expert Guidance?</h2>
                    <p className="text-slate-600 mb-10 leading-relaxed font-sans">
                        Our certified network architects are available for consultations to help you navigate complex hybrid-cloud and global connectivity requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <Link to="/contact/request-demo" className="bg-slate-900 text-white font-black px-10 py-4 rounded-xl hover:bg-slate-800 transition">
                            Book Live Architecture Review
                        </Link>
                         <Link to="/contact/touch" className="border-2 border-slate-900 text-slate-900 font-black px-10 py-4 rounded-xl hover:bg-slate-900 hover:text-white transition">
                            Chat With an Architect
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkArchitecture;
