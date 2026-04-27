import React from 'react';
import { GraduationCap, Rocket, Target, Award, Users, BookOpen, ChevronRight, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function YTDP() {
    const prosperSteps = [
        {
            icon: BookOpen,
            title: "Skill Development",
            desc: "Focused training and capability building approach in shaping the careers of young business professionals at early stages."
        },
        {
            icon: TrendingUp,
            title: "Performance",
            desc: "Trainees are offered accelerated career advancement opportunities within the organization purely based on their performance."
        },
        {
            icon: Users,
            title: "Engagement",
            desc: "Connecting with our employees through SiteVisits & Delivery Connect along with competency development."
        },
        {
            icon: Award,
            title: "Reward",
            desc: "Engaging & inspiring employees through our various Rewards & Recognition programs."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-[#001f3f] text-white py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 -skew-x-12 transform translate-x-1/4"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-widest mb-6 border border-blue-500/30 backdrop-blur-md">
                            Young Talent Development Program
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                            Grooming the <span className="text-blue-400 font-serif italic">Leaders</span> of Tomorrow
                        </h1>
                        <p className="text-blue-100 text-xl mb-10 leading-relaxed font-medium">
                            A 6-12 month specialized program designed for undergraduate and postgraduate students to build real-world capabilities and create better futures every day.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/careers/jobs" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg flex items-center gap-2">
                                View Openings <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Program Details */}
            <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-[#001f3f] mb-8 underline decoration-blue-600 decoration-8 underline-offset-8">
                            Program Overview
                        </h2>
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            <p>
                                This program is built specifically for undergraduate and postgraduate students who want to be part of <strong>TheContractum</strong> as part-time trainees.
                            </p>
                            <p>
                                It is a <strong>6-12 month</strong> young talent development program designed to groom young talent from identified colleges across India and all around the world.
                            </p>
                            <p>
                                We provide a focused training and capability-building approach to shape the careers of young business professionals at early stages.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8 rounded-r-2xl">
                                <p className="italic font-bold text-blue-900">
                                    "Post 12-month training, trainees are offered accelerated career advancement opportunities within the organization purely based on their performance."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] -rotate-3"></div>
                        <div className="relative bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-[#e31e24] rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-[#001f3f]">Focus Areas</h3>
                            </div>
                            <ul className="space-y-6">
                                {[
                                    "Business Process Management",
                                    "GIS & Spatial Intelligence",
                                    "Digital Transformation",
                                    "Leadership & Communication",
                                    "Technical Strategy & Design"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-700 font-bold border-b border-gray-50 pb-4">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROSPER Section */}
            <div className="bg-gray-50 py-24 border-y border-gray-100 shadow-inner">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-white text-[#e31e24] text-sm font-black uppercase tracking-widest mb-4 shadow-sm">
                        Our Initiative
                    </span>
                    <h2 className="text-5xl font-black text-[#001f3f] mb-6">Prosper</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
                        "Progress through Skill Development, Performance, Engagement & Reward"
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {prosperSteps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-[#e31e24] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg shadow-red-600/10">
                                        <Icon size={28} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-black text-[#001f3f] mb-4 uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Additional Engagement */}
            <div className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="bg-white rounded-[3rem] border border-gray-100 p-12 md:p-20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full -mr-20 -mt-20"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black text-[#001f3f] mb-8">SiteVisits & Delivery Connect</h2>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                                Connect directly with our operations and delivery teams. Our engagement initiative aims at connecting employees through active participation and competency development.
                            </p>
                            <div className="flex items-center gap-4 text-[#e31e24] font-black text-xl">
                                <Users size={32} />
                                <span>Inspired Team, Shared Success</span>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="bg-blue-600 h-40 rounded-3xl text-white p-6 flex flex-col justify-end">
                                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Connect</span>
                                <span className="text-xl font-black italic">Colleges</span>
                            </div>
                            <div className="bg-slate-900 h-40 rounded-3xl text-white p-6 flex flex-col justify-end">
                                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Growth</span>
                                <span className="text-xl font-black italic">Trainees</span>
                            </div>
                            <div className="bg-gray-100 h-40 rounded-3xl p-6 flex flex-col justify-end">
                                <span className="text-sm font-bold opacity-40 uppercase tracking-widest text-black">Reward</span>
                                <span className="text-xl font-black italic text-[#001f3f]">Performance</span>
                            </div>
                            <div className="bg-[#e31e24] h-40 rounded-3xl text-white p-6 flex flex-col justify-end">
                                <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Future</span>
                                <span className="text-xl font-black italic">Success</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#001f3f] py-20">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl font-black mb-8 italic italic">Ready to kick-start your career?</h2>
                    <p className="text-blue-100 text-xl font-medium mb-12">
                        Join the Young Talent Development Program and be the change you want to see.
                    </p>
                    <Link to="/contact/touch" className="bg-[#e31e24] hover:bg-red-700 text-white font-black py-5 px-14 rounded-2xl transition-all shadow-2xl text-xl inline-flex items-center gap-3">
                        Apply Now <Rocket size={24} />
                    </Link>
                </div>
            </div>
        </div>
    );
}