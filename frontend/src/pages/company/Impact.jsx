import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Globe, Heart, Leaf, Zap, Shield, Users, Trophy } from "lucide-react";
import imp1 from "../../assets/g7.png"; // Placeholder images using existing assets
import imp2 from "../../assets/g12.png";
import imp3 from "../../assets/g14.png";

export default function OurImpact() {
    const impactMissions = [
        {
            title: "Environmental Sustainability",
            desc: "Committing to a greener future by reducing our carbon footprint and promoting sustainable tech solutions globally.",
            icon: Leaf,
            color: "from-green-500 to-emerald-600",
            stat: "100%",
            statLabel: "Carbon Neutral by 2027"
        },
        {
            title: "Global Empowerment",
            desc: "Bridging the digital divide by making transformative enterprise technologies accessible across emerging markets.",
            icon: Globe,
            color: "from-blue-500 to-cyan-600",
            stat: "1M+",
            statLabel: "Lives Impacted"
        },
        {
            title: "Community Welfare",
            desc: "Investing heavily in education, healthcare, and infrastructure to uplift local communities where we operate.",
            icon: Heart,
            color: "from-rose-500 to-red-600",
            stat: "$50M",
            statLabel: "In CSR Initiatives"
        },
        {
            title: "Ethical AI & Tech",
            desc: "Pioneering secure, unbiased, and transparent artificial intelligence to build trust in the digital age.",
            icon: Shield,
            color: "from-purple-500 to-indigo-600",
            stat: "0",
            statLabel: "Data Breaches"
        }
    ];

    const stats = [
        { value: "500+", label: "NGOs Supported", icon: Users },
        { value: "50K+", label: "Hours Volunteered", icon: Heart },
        { value: "100%", label: "Renewable Energy", icon: Zap },
        { value: "Top 10", label: "ESG Rankings", icon: Trophy }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* ===== Hero Section ===== */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imp3})`, backgroundAttachment: "fixed" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-black/90"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold uppercase tracking-widest mb-6">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Beyond Business
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400">Impact</span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
                        We measure our success not just by the technology we build, but by the positive change we create in the world.
                    </p>
                </div>
            </div>

            {/* ===== Impact Stats ===== */}
            <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl shadow-purple-900/10 border border-gray-100 p-8 md:p-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x-0 md:divide-x divide-gray-200">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center px-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{stat.value}</p>
                                    <p className="text-sm md:text-base text-gray-500 font-medium tracking-wide uppercase">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Mission Areas ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                            Areas of Transformation
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our strategic initiatives are designed to address the world's most pressing challenges through innovation and action.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                        {impactMissions.map((mission, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                {/* Decorative Gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mission.color} opacity-10 rounded-bl-full`}></div>
                                
                                <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mission.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                        <mission.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">{mission.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">{mission.desc}</p>
                                        
                                        <div className="inline-flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100 w-full">
                                            <span className={`text-2xl font-black bg-gradient-to-r ${mission.color} bg-clip-text text-transparent`}>
                                                {mission.stat}
                                            </span>
                                            <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                                                {mission.statLabel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Featured Story ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                            <span className="text-indigo-300 font-bold tracking-widest uppercase text-sm mb-4">Featured Initiative</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Tech for Tomorrow: The 2030 Education Pledge</h2>
                            <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                                We are bridging the digital divide by committing to provide free technological infrastructure, high-speed internet, and digital literacy programs to over 10,000 underprivileged schools across the globe by 2030.
                            </p>
                            <Link to="/contact/touch" className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors w-fit">
                                Partner With This Initiative
                            </Link>
                        </div>
                        <div className="lg:w-1/2 relative min-h-[400px]">
                            <img src={imp1} alt="Impact Initiative" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
