import React from "react";

export default function Themes() {
    const themes = [
        {
            title: "Generative AI and Creative Automation",
            description: "Exploring the boundaries of LLMs and diffusion models to automate creative workflows in design, writing, and music. Moving from prompt engineering to full-scale autonomous creative agents.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
            details: [
                "Autonomous Brand Growth Engines",
                "Real-time Personalization Frameworks",
                "ethical AI Data Synthesis"
            ]
        },
        {
            title: "Sustainable Green Tech Infrastructure",
            description: "Developing software solutions that prioritize energy efficiency and carbon-neutral computing. Researching algorithmic optimizations that reduce the environmental footprint of large-scale data centers.",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
            details: [
                "Energy-aware Algorithmic Processing",
                "Circular Hardware Lifecycle Management",
                "Carbon-tracking API Ecosystems"
            ]
        },
        {
            title: "Next-Gen Cybersecurity & Zero Trust",
            description: "Building resilient systems that operate on the principle of 'never trust, always verify'. focusing on post-quantum cryptography and blockchain-based identity management.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            details: [
                "Decentralized Identity Protocols",
                "Quantum-resistant Encryption Layers",
                "Real-time Behavioral Threat Hunting"
            ]
        },
        {
            title: "Edge Computing & IoT Orchestration",
            description: "Distributing computational power to the edge of the network to minimize latency and maximize privacy. Solving the orchestration challenges of millions of connected devices in smart cities.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            details: [
                "Low-latency Edge Inference",
                "Mesh Network Resilience Models",
                "Privacy-preserving Data Aggregation"
            ]
        },
        {
            title: "Space Application & Satellite Networks",
            description: "Designing the software infrastructure for the next generation of satellite-based internet and orbital data processing units. Focus on fault-tolerant communication in space environments.",
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800",
            details: [
                "Orbital Mesh Networking",
                "Radiation-aware Software Architectures",
                "Deep-space Data Compression"
            ]
        },
        {
            title: "Hyper-automation in Supply Chain",
            description: "Leveraging robotics and advanced AI to create self-healing supply chains that can predict and react to global disruptions before they happen.",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
            details: [
                "Self-optimizing Logistics Networks",
                "Predictive Demand Forecasting",
                "Autonomous Warehouse Coordination"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Hero Section */}
            <div
                className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')"
                }}
            >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
                    <div className="inline-block bg-blue-500/20 text-blue-300 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm border border-blue-500/30">
                        Future Paradigms
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-tight drop-shadow-2xl">
                        Imagine the <br /> <span className="text-blue-400">Next Horizon</span>
                    </h1>
                    <p className="text-2xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed">
                        Exploring the theoretical themes that will define the next decade of digital transformation and human-centric technology.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-32 space-y-32">
                {themes.map((theme, index) => (
                    <div key={index} className={`flex flex-col lg:flex-row gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} group/theme`}>
                        {/* Visual Part */}
                        <div className="lg:w-1/2 w-full relative">
                            <div className="absolute -inset-4 bg-blue-100/50 rounded-[32px] blur-2xl opacity-0 group-hover/theme:opacity-100 transition-opacity duration-700 -z-10"></div>
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-100">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-60 group-hover/theme:opacity-40 transition-opacity duration-500"></div>
                                <img 
                                    src={theme.image} 
                                    alt={theme.title} 
                                    className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover/theme:scale-105"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] bg-blue-600/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                                        Horizon 0{index + 1}
                                    </span>
                                </div>
                            </div>
                        </div>
 
                        {/* Text Part */}
                        <div className="lg:w-1/2 w-full space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                                    {theme.title}
                                </h3>
                                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500 group-hover/theme:w-48"></div>
                            </div>
                            <p className="text-xl text-slate-500 leading-relaxed font-light">
                                {theme.description}
                            </p>
                            <div className="space-y-6 pt-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Strategic Technical Pillars</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {theme.details.map((point, i) => (
                                        <div key={i} className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-xl group/item hover:bg-white hover:shadow-md transition-all duration-300">
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-200 group-hover/item:scale-125 transition-transform"></div>
                                            <span className="text-slate-700 font-bold text-sm tracking-tight">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Deep Dive Section */}
            <div className="bg-slate-50 py-32 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=200" 
                            className="w-full h-full object-cover opacity-80"
                            alt="Innovation"
                        />
                    </div>
                    <h2 className="text-5xl font-black text-slate-900">The Synergy of Innovation</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-light">
                        These themes are not isolated silos. The true potential lies at the intersection of these domains. Imagine a quantum-secured satellite network running federated AI at the edge, all powered by carbon-negative infrastructure. This is not just a vision; it is the blueprint for our research roadmap.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                        <div className="space-y-6 group">
                            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Goal" />
                            </div>
                            <h4 className="font-bold text-xl text-slate-900">Goal-Oriented</h4>
                            <p className="text-slate-500 leading-relaxed">Every research theme is tied to a real-world problem waiting for a solution.</p>
                        </div>
                        <div className="space-y-6 group">
                            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Impact" />
                            </div>
                            <h4 className="font-bold text-xl text-slate-900">Impact-First</h4>
                            <p className="text-slate-500 leading-relaxed">We prioritize innovations that have the maximum positive effect on society.</p>
                        </div>
                        <div className="space-y-6 group">
                            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Global" />
                            </div>
                            <h4 className="font-bold text-xl text-slate-900">Global Scale</h4>
                            <p className="text-slate-500 leading-relaxed">Our themes address problems that transcend borders and industries.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Quote */}
            <div className="py-24 bg-slate-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-3xl font-serif italic text-slate-300">
                        "The best way to predict the future is to create it."
                    </p>
                    <div className="mt-8 text-slate-500 font-bold uppercase tracking-widest text-sm">
                        - Exploring New Frontiers -
                    </div>
                </div>
            </div>
        </div>
    );
}
