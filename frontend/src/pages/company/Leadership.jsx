import React from "react";
import { Crown, Target, Lightbulb, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import leadership from "../../assets/leadership.webp";
import management from "../../assets/management.png";
export default function Leadership() {
    return (
        <div className="bg-white">
            {/* Hero Section with Background Image */}
            <div 
                className="relative h-[600px] flex items-center justify-start overflow-hidden"
                style={{
                    backgroundImage: `url(${leadership})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
                
                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Leadership
                    </span> */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Leadership</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed drop-shadow-lg">
                        The visionaries and strategists guiding The Contrractum towards a smarter, more connected future
                    </p>
                    <div className="flex flex-wrap gap-4 mb-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                            <Target className="w-5 h-5 text-white" />
                            <p className="text-sm font-semibold text-white">Visionary Leadership</p>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                            <Sparkles className="w-5 h-5 text-white" />
                            <p className="text-sm font-semibold text-white">Strategic Excellence</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Leadership Categories */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                        Leadership Teams
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                        Our Leadership Structure
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Meet the teams driving our vision and strategic excellence
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Founders & Directors Card */}
                    <div className="group bg-gradient-to-br from-blue-50 via-indigo-50 to-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Crown className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">Founders & Directors</h3>
                                <p className="text-blue-600 font-semibold">The Visionaries</p>
                            </div>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            Our founders have pioneered innovation and established the core values that drive our organization forward.
                        </p>
                        <a href="#/company/leadership/founders" className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 font-bold shadow-lg hover:shadow-2xl">
                            Meet Our Founders
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>

                    {/* Management Team Card */}
                    <div className="group bg-gradient-to-br from-purple-50 via-pink-50 to-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 group-hover:text-purple-600 transition-colors">Management Team</h3>
                                <p className="text-purple-600 font-semibold">The Strategists</p>
                            </div>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            Our executive team brings decades of experience in technology, business operations, and strategic growth.
                        </p>
                        <a href="#/company/leadership/management" className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 font-bold shadow-lg hover:shadow-2xl">
                            View Management Team
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>
                </div>

                {/* Leadership Principles */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-10 border-2 border-gray-200">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Core Principles
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">Leadership Principles</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The values that guide our leadership approach
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group text-center bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                                <Lightbulb className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Innovation First</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Leading through cutting-edge technology and creative problem-solving
                            </p>
                        </div>
                        <div className="group text-center bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">People-Centric</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Empowering our team and prioritizing customer success
                            </p>
                        </div>
                        <div className="group text-center bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                                <TrendingUp className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Results Driven</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Delivering measurable impact and sustainable growth
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
