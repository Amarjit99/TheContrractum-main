import React from "react";
import { Target, Globe, Lightbulb, TrendingUp, Star, Users, Shield, Rocket } from "lucide-react";

const visionPillars = [
    {
        icon: Target,
        title: "Clear Direction",
        description:
            "Our management team charts a bold, unwavering course for the organization. Every strategy is deliberately aligned with our long-term mission to create lasting value across industries.",
        color: "from-blue-500 to-indigo-600",
    },
    {
        icon: Globe,
        title: "Global Perspective",
        description:
            "With presence in 75+ countries, our leaders think globally and act locally — understanding diverse markets, cultures, and client needs to deliver solutions that truly resonate.",
        color: "from-teal-500 to-cyan-600",
    },
    {
        icon: Lightbulb,
        title: "Innovation Leadership",
        description:
            "We don't follow trends — we set them. Our leadership team invests heavily in R&D, emerging technologies, and forward-thinking initiatives to stay ahead of the curve.",
        color: "from-yellow-500 to-orange-600",
    },
    {
        icon: TrendingUp,
        title: "Growth Mindset",
        description:
            "Visionary leaders at The Contractum embrace continuous evolution — of ideas, processes, and people. Growth is not a metric; it is a mindset embedded in everything we do.",
        color: "from-green-500 to-emerald-600",
    },
    {
        icon: Users,
        title: "People-First Vision",
        description:
            "Our vision is built around human potential. We champion inclusive workplaces, empowered teams, and meaningful careers — because business success and people's wellbeing go hand in hand.",
        color: "from-pink-500 to-rose-600",
    },
    {
        icon: Shield,
        title: "Ethical Governance",
        description:
            "Visionary leadership demands integrity. Our management upholds the highest ethical standards in decision-making, ensuring transparency, accountability, and trust at every level.",
        color: "from-purple-500 to-indigo-600",
    },
];

const traits = [
    { label: "Anticipate", desc: "Spotting opportunities before they become obvious" },
    { label: "Inspire", desc: "Motivating teams to exceed what they believed possible" },
    { label: "Decide", desc: "Making bold, informed choices with conviction" },
    { label: "Adapt", desc: "Pivoting with agility when the landscape shifts" },
    { label: "Sustain", desc: "Building systems and cultures that outlast any individual" },
];

const stats = [
    { metric: "75+", label: "Countries with Leadership Presence" },
    { metric: "25,000+", label: "Professionals Under Visionary Guidance" },
    { metric: "15+", label: "Years of Leadership Excellence" },
    { metric: "1000+", label: "Organizations Transformed" },
];

export default function VisionaryLeadership() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
                        <Star className="w-10 h-10 text-blue-300" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Management Team
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Visionary{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                            Leadership
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Discover how The Contractum's management team drives transformative vision — shaping industries, empowering people, and defining the future of business.
                    </p>
                </div>
            </div>

            {/* ===== Stats ===== */}
            <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 text-center transform hover:-translate-y-2 cursor-default"
                        >
                            <p className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 group-hover:scale-110 transition-transform">
                                {s.metric}
                            </p>
                            <p className="text-gray-700 font-semibold text-sm group-hover:text-blue-600 transition-colors">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== What Visionary Leadership Means ===== */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Vision Framework
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Six Pillars of Visionary Leadership
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            How our management team brings visionary thinking to life every day across every department
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visionPillars.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={i}
                                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 cursor-default"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
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

            {/* ===== Traits of a Visionary Leader ===== */}
            <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold uppercase tracking-wider mb-4">
                            Leadership Traits
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                            What Makes a Visionary Leader
                        </h2>
                        <p className="text-xl text-blue-100">
                            Five defining traits our management team embodies every day
                        </p>
                    </div>
                    <div className="space-y-5">
                        {traits.map((t, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 cursor-default"
                            >
                                <div className="flex-none w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center font-black text-white text-lg group-hover:scale-110 transition-transform">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                        {t.label}
                                    </h3>
                                    <p className="text-blue-100 text-sm leading-relaxed">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Vision Statement ===== */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Vision Statement
                    </span>
                    <div className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 shadow-xl">
                        <Rocket className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                        <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 leading-relaxed">
                            "To be the most trusted global partner for digital transformation — inspiring organizations to reimagine what's possible through visionary leadership, technology, and human excellence."
                        </p>
                        <p className="mt-6 text-gray-500 font-semibold">— The Contractum Management Team</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
