import React from "react";
import { Rocket, Sparkles, Zap, Brain, Globe, Cpu, Beaker, Focus, CheckCircle } from "lucide-react";

const domains = [
    {
        icon: Brain,
        title: "Artificial Intelligence Lab",
        description: "Pioneering the next generation of AI models that understand context, learn asynchronously, and assist in complex human decision-making processes.",
        color: "from-blue-500 to-indigo-600",
    },
    {
        icon: Globe,
        title: "Web3 & Decentralization",
        description: "Building the infrastructure for a trustless economy. Exploring smart contract automation, decentralized identity, and tokenized ecosystems.",
        color: "from-teal-500 to-emerald-600",
    },
    {
        icon: Cpu,
        title: "Quantum Computing Research",
        description: "Preparing for the post-classical era. Developing quantum algorithms for supply chain optimization, drug discovery, and advanced cryptography.",
        color: "from-purple-500 to-pink-600",
    },
    {
        icon: Zap,
        title: "Edge & IoT Ecosystems",
        description: "Bringing computation closer to the data source. Creating smart city frameworks, autonomous industrial systems, and connected healthcare devices.",
        color: "from-orange-500 to-red-600",
    },
];

const impactAreas = [
    "Predictive Healthcare Diagnostics",
    "Sustainable Energy Grid Management",
    "Automated Supply Chain Resilience",
    "Next-Gen Financial Security",
    "Hyper-Personalized Education",
    "Smart Urban Infrastructure",
];

export default function ExploreInnovations() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <Rocket className="w-10 h-10 text-blue-300" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Research & Development
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Explore
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                            Innovations
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Take a deep dive into the technologies, research frameworks, and radical ideas being built inside The Contractum's Innovation Labs today.
                    </p>
                </div>
            </div>

            {/* ===== Research Domains ===== */}
            <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Focus Areas
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                            Core Research Domains
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We allocate dedicated R&D resources to four primary verticals that we believe will define the next decade of civilization.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {domains.map((d, i) => {
                            const Icon = d.icon;
                            return (
                                <div key={i} className="group bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-default">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {d.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {d.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== The Innovation Process ===== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Methodology
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                            From Concept to Reality
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Horizontal Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 hidden md:block -mt-8" />

                        <div className="grid md:grid-cols-3 gap-12 relative z-10 text-center">
                            <div className="bg-white p-6">
                                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl relative">
                                    <Beaker className="w-10 h-10 text-blue-600" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Hypothesize</h3>
                                <p className="text-gray-600">Identifying macro-problems and positing radical technological interventions.</p>
                            </div>

                            <div className="bg-white p-6">
                                <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl relative">
                                    <Focus className="w-10 h-10 text-indigo-600" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Incubate</h3>
                                <p className="text-gray-600">Rapid prototyping, sandboxed testing, and rigorous peer-review evaluation.</p>
                            </div>

                            <div className="bg-white p-6">
                                <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl relative">
                                    <Sparkles className="w-10 h-10 text-purple-600" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Commercialize</h3>
                                <p className="text-gray-600">Scaling successful prototypes into enterprise-grade, market-ready solutions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Societal Impact ===== */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                            Real-World Impact
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">
                            Applied Innovation
                        </h2>
                        <p className="text-xl text-slate-400">
                            Innovation at The Contractum isn't just theoretical. Our R&D output actively reshapes these core sectors today:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {impactAreas.map((area, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                                <span className="text-lg font-medium">{area}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
