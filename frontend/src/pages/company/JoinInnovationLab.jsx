import React from "react";
import { Sparkles, Users, CheckCircle, Code, Briefcase, Zap, Globe, Target } from "lucide-react";

const perks = [
    {
        icon: Code,
        title: "Unrestricted Sandboxes",
        description: "Access unlimited cloud computing power, AI model APIs, and hardware to test radical ideas without bureaucratic friction.",
    },
    {
        icon: Users,
        title: "Brilliant Cohorts",
        description: "Work alongside PhDs, rogue engineers, industry veterans, and researchers who challenge your intellect daily.",
    },
    {
        icon: Briefcase,
        title: "Equity in Ideas",
        description: "Lab members receive direct stakes in the commercialized intellectual property they help architect and patent.",
    },
    {
        icon: Globe,
        title: "Global Collaboration",
        description: "Rotate through our international lab nodes. Work from Tokyo, London, or Silicon Valley for quarter-long sprints.",
    },
];

const requirements = [
    "A proven track record of building non-trivial systems from scratch",
    "Deep fluency in at least two modern paradigms (e.g., ML & Distributed Systems)",
    "Insatiable curiosity and a bias toward rapid, iterative prototyping",
    "The ability to dismantle complex problems and explain them simply",
    "A portfolio of side projects, open-source contributions, or patents",
    "Zero ego — a willingness to discard your own ideas when the data proves otherwise",
];

export default function JoinInnovationLab() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <Sparkles className="w-10 h-10 text-purple-300" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Careers in R&D
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Innovation Lab</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                        We are looking for builders, hackers, and theorists to join our elite R&D division. No red tape. Pure innovation.
                    </p>
                </div>
            </div>

            {/* ===== Why Join ===== */}
            <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            The Environment
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                            Why Build With Us?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our lab isn't a traditional corporate department. It's a high-velocity incubator embedded inside a global enterprise.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {perks.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <div key={i} className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-purple-100 cursor-default">
                                    <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                                        <Icon className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{p.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== What We Look For ===== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-bold uppercase tracking-wider mb-4">
                                The Profile
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                                Who We Look For
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                We index heavily on agency, curiosity, and technical depth. We care less about prestige degrees and more about what you've actually built.
                            </p>

                            <div className="space-y-4">
                                {requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-800 font-medium">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <Target className="w-12 h-12 text-pink-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">The Application Process</h3>
                                <ol className="space-y-4 text-sm text-slate-300">
                                    <li className="flex gap-3"><span className="font-bold text-pink-400">1.</span> Portfolio Review</li>
                                    <li className="flex gap-3"><span className="font-bold text-pink-400">2.</span> Technical Deep Dive</li>
                                    <li className="flex gap-3"><span className="font-bold text-pink-400">3.</span> Take-home Architecture Design</li>
                                    <li className="flex gap-3"><span className="font-bold text-pink-400">4.</span> Lab Director Synthesis</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Manifesto ===== */}
            <section className="py-24 px-6 bg-slate-900 text-center">
                <div className="max-w-3xl mx-auto">
                    <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-relaxed mb-6">
                        "We don't optimize the known variables. We discover entirely new equations."
                    </h2>
                    <p className="text-slate-400 font-semibold uppercase tracking-widest">— The Lab Manifesto</p>
                </div>
            </section>

        </div>
    );
}
