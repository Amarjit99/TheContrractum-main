import React from "react";
import { TrendingUp, CheckCircle, Shield, Users, Globe, Award, BarChart2, Zap } from "lucide-react";

const excellencePillars = [
    {
        icon: BarChart2,
        title: "Data-Driven Decisions",
        description:
            "Our management team relies on deep analytics, market intelligence, and performance data to make confident strategic decisions that outperform the competition consistently.",
        color: "from-purple-500 to-indigo-600",
    },
    {
        icon: Shield,
        title: "Risk Management",
        description:
            "Strategic excellence includes knowing where risks lie. We proactively identify, assess, and mitigate risks to ensure business continuity and stakeholder confidence.",
        color: "from-red-500 to-rose-600",
    },
    {
        icon: Globe,
        title: "Market Positioning",
        description:
            "From Pan-India coverage to global markets, our leaders strategically position The Contractum at the forefront of every industry we serve — creating competitive advantages that last.",
        color: "from-teal-500 to-cyan-600",
    },
    {
        icon: Users,
        title: "Talent Strategy",
        description:
            "People are our greatest strategy. We attract, develop, and retain world-class talent that brings expertise, creativity, and drive to every client engagement.",
        color: "from-green-500 to-emerald-600",
    },
    {
        icon: Zap,
        title: "Operational Agility",
        description:
            "Strategic excellence isn't static. Our management team builds agile systems and processes that respond swiftly to change — turning disruption into opportunity.",
        color: "from-yellow-500 to-amber-600",
    },
    {
        icon: Award,
        title: "Client-Centric Strategy",
        description:
            "Every strategy begins and ends with the client. We co-create solutions, listen deeply, and design outcomes that generate measurable, long-term value for every partner.",
        color: "from-blue-500 to-indigo-600",
    },
];

const frameworks = [
    {
        phase: "01",
        title: "Assess",
        description: "Conduct thorough market, operational, and competitive assessments to establish a clear baseline and uncover hidden opportunities.",
    },
    {
        phase: "02",
        title: "Strategize",
        description: "Define bold, achievable strategies with measurable milestones, resource allocation plans, and clear success metrics.",
    },
    {
        phase: "03",
        title: "Execute",
        description: "Deploy cross-functional teams with precision, accountability, and a relentless focus on delivering quality on time and within budget.",
    },
    {
        phase: "04",
        title: "Measure",
        description: "Track every key performance indicator, celebrate wins, and identify areas for continuous improvement and optimization.",
    },
    {
        phase: "05",
        title: "Evolve",
        description: "Incorporate learnings, adapt strategies, and continuously raise the performance bar — because excellence is never finished.",
    },
];

const stats = [
    { metric: "99.9%", label: "Client Satisfaction Rate" },
    { metric: "$50B+", label: "Client Value Created" },
    { metric: "500+", label: "Projects Delivered Annually" },
    { metric: "100+", label: "Industry Awards Received" },
];

const commitments = [
    "Deliver measurable ROI on every engagement",
    "Maintain best-in-class quality standards across all deliverables",
    "Build strategies that scale with our clients' ambitions",
    "Foster a culture of accountability and continuous improvement",
    "Align every initiative with the broader organizational vision",
    "Report transparently on progress, challenges, and outcomes",
];

export default function StrategicExcellence() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
                        <TrendingUp className="w-10 h-10 text-purple-300" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Management Team
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Strategic{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                            Excellence
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                        How The Contractum's management team crafts and executes strategies that consistently deliver exceptional results for clients, partners, and stakeholders worldwide.
                    </p>
                </div>
            </div>

            {/* ===== Stats ===== */}
            <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 text-center transform hover:-translate-y-2 cursor-default"
                        >
                            <p className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 group-hover:scale-110 transition-transform">
                                {s.metric}
                            </p>
                            <p className="text-gray-700 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Six Pillars ===== */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Excellence Framework
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Six Pillars of Strategic Excellence
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The strategic foundations our management team builds everything upon
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {excellencePillars.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={i}
                                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 cursor-default"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-800 transition-colors">
                                        {p.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== Execution Framework ===== */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            How We Execute
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                            Our 5-Phase Execution Model
                        </h2>
                        <p className="text-xl text-gray-600">
                            A repeatable, proven framework for delivering strategic outcomes
                        </p>
                    </div>
                    <div className="space-y-6">
                        {frameworks.map((f, idx) => (
                            <div
                                key={idx}
                                className="group flex items-start gap-6 p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-500 cursor-default"
                            >
                                <div className="flex-none w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg group-hover:scale-110 transition-transform">
                                    {f.phase}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                        {f.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {f.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Commitments ===== */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Commitments
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                            What We Promise
                        </h2>
                        <p className="text-xl text-gray-600">
                            The strategic commitments our management team honours every day
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {commitments.map((c, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-4 p-5 bg-gradient-to-br from-white to-purple-50 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-default"
                            >
                                <div className="flex-none w-9 h-9 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-gray-700 font-medium text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                                    {c}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
