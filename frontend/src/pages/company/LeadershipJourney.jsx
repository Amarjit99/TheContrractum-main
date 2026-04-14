import React from "react";
import { Link } from "react-router-dom";
import {
    Rocket, Star, Globe, Users, Award, TrendingUp,
    Lightbulb, CheckCircle, Target, BookOpen, Heart
} from "lucide-react";

const milestones = [
    {
        year: "2010",
        title: "The Beginning",
        leader: "Rajesh Kumar",
        description:
            "Rajesh Kumar founded The Contractum with a bold vision — to transform how businesses harness technology for sustainable growth. Starting with just 5 team members in a modest office, the foundation was built on innovation and trust.",
        achievement: "5-member founding team, first 10 enterprise clients onboarded",
        color: "from-blue-500 to-indigo-600",
        icon: Rocket,
    },
    {
        year: "2013",
        title: "Expanding the Core",
        leader: "Priya Sharma & Arjun Patel Join",
        description:
            "Priya Sharma and Arjun Patel joined as Co-Founders, bringing deep technology and operational expertise. This expanded the leadership to a complete C-suite, enabling rapid scaling across 10+ countries and 500+ employees.",
        achievement: "500+ employees, presence in 10+ countries, 100+ clients",
        color: "from-purple-500 to-pink-600",
        icon: Users,
    },
    {
        year: "2016",
        title: "Board of Directors Established",
        leader: "Leadership Team",
        description:
            "A distinguished Board of Directors was established, bringing seasoned industry veterans into the leadership circle. This governance milestone enabled strategic long-term thinking, elevated credibility, and crossed the $100M revenue milestone.",
        achievement: "$100M revenue, industry recognition awards, 15+ countries",
        color: "from-green-500 to-teal-600",
        icon: Award,
    },
    {
        year: "2019",
        title: "Global Leadership Expansion",
        leader: "Global Leadership Team",
        description:
            "The executive team expanded to six specialized Directors — leading innovation, client success, global expansion, people & culture, partnerships, and sustainability. This diversified leadership enabled operations in 50+ countries.",
        achievement: "6 executive directors, 50+ countries, serving 1000+ enterprises",
        color: "from-orange-500 to-red-600",
        icon: Globe,
    },
    {
        year: "2023",
        title: "Vision 2030 Launched",
        leader: "Entire Leadership Collective",
        description:
            "The Contractum unveiled its ambitious Vision 2030 roadmap — focusing on AI-driven solutions, pan-India deep penetration, and international market dominance. Operating across 75+ countries with a world-class team of 25,000+ professionals.",
        achievement: "75+ countries, 25,000+ professionals, Vision 2030 roadmap",
        color: "from-indigo-500 to-blue-700",
        icon: TrendingUp,
    },
];

const philosophies = [
    {
        icon: Heart,
        title: "Servant Leadership",
        description:
            "We lead by serving — our teams, our clients, and the communities we operate in. Leadership at The Contractum means putting people first.",
        color: "from-pink-500 to-rose-600",
    },
    {
        icon: BookOpen,
        title: "Continuous Learning",
        description:
            "Our leaders invest in themselves and their teams through constant growth, mentorship, and learning — because a learning organization is an unbeatable one.",
        color: "from-blue-500 to-indigo-600",
    },
    {
        icon: Target,
        title: "Purpose-Driven Direction",
        description:
            "Every decision is guided by purpose — creating meaningful, measurable impact for clients, employees, and society at large.",
        color: "from-green-500 to-teal-600",
    },
    {
        icon: Lightbulb,
        title: "Innovation at the Core",
        description:
            "We empower our leaders to challenge the status quo and pursue bold ideas that drive the industry forward.",
        color: "from-yellow-500 to-orange-600",
    },
];

const stats = [
    { metric: "280+", label: "Combined Years of Experience", detail: "Across all leadership positions" },
    { metric: "75+", label: "Countries of Operation", detail: "And growing with Vision 2030" },
    { metric: "25,000+", label: "Professionals Developed", detail: "Under visionary leadership" },
    { metric: "1000+", label: "Enterprises Transformed", detail: "Global client impact" },
];

export default function LeadershipJourney() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Leadership Story
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        The{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                            Leadership
                        </span>{" "}
                        Journey
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                        From a 5-member startup to a global force in 75+ countries — discover how visionary leadership shaped The Contractum into what it is today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/company/leadership/founders"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl text-lg"
                        >
                            <Users className="w-5 h-5" />
                            Meet Our Founders
                        </Link>
                        <Link
                            to="/company/leadership"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg"
                        >
                            <Star className="w-5 h-5" />
                            Full Leadership
                        </Link>
                    </div>
                </div>
            </div>

            {/* ===== Stats ===== */}
            <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 text-center transform hover:-translate-y-2 cursor-default"
                        >
                            <p className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                {s.metric}
                            </p>
                            <p className="text-gray-900 font-bold mb-1 group-hover:text-blue-600 transition-colors">{s.label}</p>
                            <p className="text-gray-500 text-sm">{s.detail}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Timeline ===== */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Timeline
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Milestones That Shaped Us
                        </h2>
                        <p className="text-xl text-gray-600">
                            Key moments in our leadership journey from 2010 to today
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-400 hidden md:block" />

                        <div className="space-y-12">
                            {milestones.map((m, idx) => {
                                const Icon = m.icon;
                                return (
                                    <div key={idx} className="group relative flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                                        {/* Year bubble */}
                                        <div className="flex-none flex flex-col items-center">
                                            <div
                                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 z-10`}
                                            >
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <span className="mt-2 text-sm font-black text-gray-500 tracking-widest">{m.year}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-8 group-hover:border-blue-400 group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:-translate-y-1 transition-all duration-500">
                                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">{m.leader}</p>
                                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                {m.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-5">{m.description}</p>
                                            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm font-semibold text-blue-800">{m.achievement}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Leadership Philosophy ===== */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Philosophy
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            What Drives Our Leaders
                        </h2>
                        <p className="text-xl text-gray-600">
                            The principles that define leadership at The Contractum
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {philosophies.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={i}
                                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 text-center transform hover:-translate-y-2 cursor-default"
                                >
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} mb-5 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {p.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                                        {p.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== Final CTA ===== */}
            <section className="py-24 px-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-800">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <Rocket className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        Be Part of Our Next Chapter
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                        The Contractum's leadership journey is far from over. Join us as we pursue Vision 2030 — building the future of technology, business, and human potential.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/careers/jobs"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-white text-blue-700 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                        >
                            <TrendingUp className="w-5 h-5" />
                            Explore Careers
                        </Link>
                        <Link
                            to="/contact/touch"
                            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg"
                        >
                            <Target className="w-5 h-5" />
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
