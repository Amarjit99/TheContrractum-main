import { Quote, TrendingUp, Award, Briefcase, Users, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Business from "../../assets/business.jpg"

export default function IndustryAdvisors() {
    const advisors = [
        {
            name: "Dr. Robert Keynes",
            role: "Ex-Director, Global Strategy at TechGiant",
            quote:
                "The Contrractum is uniquely positioned to bridge the gap between traditional industry silos and modern digital ecosystems.",
            impact: "Strategic Partnerships",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400",
        },
        {
            name: "Elena Rodriguez",
            role: "Board Member, FinTech Innovators",
            quote:
                "Their approach to blockchain integration in finance sets a new standard for transparency and operational efficiency.",
            impact: "Financial Compliance",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
        },
        {
            name: "James Sterling",
            role: "Senior Policy Advisor",
            quote:
                "Navigating complex regulatory landscapes requires foresight. This team has the vision to lead responsibly.",
            impact: "GovTech Regulations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${Business})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            Strategic Leadership
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            Industry Advisors
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Guiding our journey with decades of experience and strategic foresight from world-class industry leaders
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Meet Our Advisors
                        </button>
                    </div>
                </div>
            </div>

            {/* Advisors Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Advisory Board
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">Strategic Industry Leaders</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Experienced professionals providing strategic guidance and industry insights
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {advisors.map((advisor, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 flex flex-col border border-slate-100"
                            >
                                <div className="p-8 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Quote className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-slate-600 italic text-lg mb-6 leading-relaxed">
                                        "{advisor.quote}"
                                    </p>
                                    <div className="flex items-center gap-2 text-sm font-bold text-purple-700 mb-6 bg-purple-100 w-fit px-4 py-2 rounded-full">
                                        <Target size={16} />
                                        <span>Focus: {advisor.impact}</span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-slate-50 to-white p-6 flex items-center gap-4 border-t border-slate-100">
                                    <img
                                        src={advisor.image}
                                        alt={advisor.name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div>
                                        <h3 className="font-black text-slate-900 mb-1">{advisor.name}</h3>
                                        <p className="text-sm text-slate-600">{advisor.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Shape the Future with Us</h2>
                    <p className="text-slate-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                        We value wisdom and experience. If you're an industry veteran looking to make an impact, let's talk.
                    </p>
                    <Link to="/join/partner">
                        <button className="bg-white text-purple-900 hover:bg-slate-100 font-black py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3">
                            <Users className="w-5 h-5" />
                            Become an Advisor
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
