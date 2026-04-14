import React from "react";
import { Mail, PhoneCall, MapPin, MessageSquare, Globe, ArrowRight, Lightbulb } from "lucide-react";

export default function ContactInnovationLab() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <Lightbulb className="w-10 h-10 text-cyan-300" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Partnerships & Inquiries
                    </span>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">The Lab</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Whether you are an academic institution, a deep-tech startup, or an enterprise looking to co-innovate, our doors are open to visionary partnerships.
                    </p>
                </div>
            </div>

            {/* ===== Contact Methods ===== */}
            <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Direct Access
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                            How to Reach Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Skip the corporate bureaucracy. Route your inquiry directly to the Innovation Lab operational desk.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300">
                                <Mail className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">Research Proposals</h3>
                            <p className="text-gray-600 mb-4">For academic partnerships and joint R&D initiatives.</p>
                            <p className="text-indigo-600 font-semibold">labs.research@thecontractum.com</p>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border-2 border-cyan-100 hover:border-cyan-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                            <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:scale-110 transition-all duration-300">
                                <Globe className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors">Startup Incubation</h3>
                            <p className="text-gray-600 mb-4">For deep-tech founders looking for infrastructure and mentorship.</p>
                            <p className="text-cyan-600 font-semibold">labs.ventures@thecontractum.com</p>
                        </div>

                        <div className="group bg-white p-8 rounded-3xl border-2 border-blue-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                <MessageSquare className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Media & Press</h3>
                            <p className="text-gray-600 mb-4">For interviews, lab tours, and publication inquiries.</p>
                            <p className="text-blue-600 font-semibold">labs.press@thecontractum.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Global Hubs ===== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Lab Locations
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                                Global Innovation Nodes
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Our R&D infrastructure isn't centralized. We operate localized "Nodes" globally, tapping into regional ecosystems and talent pools.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <MapPin className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Silicon Valley Node (Alpha)</h3>
                                        <p className="text-gray-500 text-sm mt-1">Focus: Quantum Algorithms & Foundational ML</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <MapPin className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Bangalore Node (Beta)</h3>
                                        <p className="text-gray-500 text-sm mt-1">Focus: Scalable Cloud Architecture & Web3</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">London Node (Gamma)</h3>
                                        <p className="text-gray-500 text-sm mt-1">Focus: FinTech Security & Applied Cryptography</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full blur-2xl flex-shrink-0" />
                                <h3 className="text-2xl font-bold mb-6 relative z-10">Visitor Policy</h3>
                                <div className="space-y-4 relative z-10 text-slate-300">
                                    <p>Due to the proprietary nature of our active research, physical lab access is strictly invite-only.</p>
                                    <p>However, we host public <strong className="text-cyan-400">"Open Compute"</strong> days quarterly where external developers and researchers can access sandbox environments and attend technical teardowns.</p>
                                    <p className="pt-4 border-t border-slate-700 font-semibold text-white">Subscribe to our technical briefing to get notified about the next Open Compute session.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
