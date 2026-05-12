import React from 'react';
import { Landmark, CreditCard, Shield, TrendingUp, Smartphone, PieChart, CheckCircle2 } from 'lucide-react';
import bank from "../../assets/bank.webp"

export default function WhyChooseBanking() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden bg-slate-900 border-b-8 border-emerald-500" style={{
                backgroundImage: `url(${bank})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-black/80 to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div>
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest border border-emerald-500/30">
                            The Financial Imperative
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Why Trust Us With <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                                Your Financial Core?
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl drop-shadow-lg font-light">
                            In modern finance, milliseconds of latency cost millions, and a single security flaw can destroy decades of institutional trust. We engineer banking systems that refuse to compromise on either.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Philosophy Section */}
            <section className="py-24 px-6 lg:px-8 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-10 border-b-4 border-emerald-200 inline-block pb-4">Engineering Financial Resilience</h2>

                    <p className="text-lg text-slate-700 leading-loose mb-8">
                        The digitalization of banking is far past its infancy. Today, the challenge isn't merely offering a mobile app; it's about deeply integrating decentralized ledgers with legacy mainframes, orchestrating real-time AI fraud detection on petabytes of transaction data, and achieving zero-downtime microservice architectures during massive market fluctuations.
                    </p>
                    <p className="text-lg text-slate-700 leading-loose mb-12">
                        At The Contractum, our FinTech division operates under a strict "Security-First, Scalability-Always" doctrine. We do not bolt security onto our applications post-development. Every API, every database schema, and every user interface is cryptographically hardened from the first line of code.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        <div className="bg-emerald-50 p-10 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <Shield className="w-12 h-12 text-emerald-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Military-Grade Defense Vectors</h3>
                            <p className="text-slate-700 leading-relaxed relative z-10">
                                Employing state-of-the-art anomaly detection and continuous penetration testing to safeguard institutional liquidity.
                            </p>
                        </div>
                        <div className="bg-green-50 p-10 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <TrendingUp className="w-12 h-12 text-green-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">High-Frequency Architecture</h3>
                            <p className="text-slate-700 leading-relaxed relative z-10">
                                Trade execution and settlement infrastructure mathematically optimized to eliminate bottlenecks during catastrophic volume spikes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Differentiators Section */}
            <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white border-y border-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6">Our Fintech Differentiators</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            The technical foundations that separate our financial software from the industry standard.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-emerald-500 transition-colors">
                            <CreditCard className="w-14 h-14 text-emerald-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">PCI-DSS Level 1 Mastery</h3>
                            <p className="text-slate-300 leading-relaxed">
                                We hold ourselves to the highest global payment processing standards. Our gateway engineering ensures frictionless, low-fee international remittance networks.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-green-500 transition-colors">
                            <PieChart className="w-14 h-14 text-green-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Automated Regulatory Compliance</h3>
                            <p className="text-slate-300 leading-relaxed">
                                The regulatory landscape shifts constantly. Our systems are built with embedded RegTech capabilities, automatically generating real-time audit trails for KYC, AML, and Basel III reports.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-teal-500 transition-colors">
                            <Smartphone className="w-14 h-14 text-teal-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">The Neobank Interface</h3>
                            <p className="text-slate-300 leading-relaxed">
                                We pair rigorous backend stability with hyper-fluid, consumer-focused frontends. We deliver mobile experiences that drive daily average usage (DAU) to industry-leading highs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Historical Legacy */}
            <section className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-black text-slate-900 mb-6">A History of Institutional Transformation</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                We do not practice on our clients' time. Over the last decade, our embedded engineering units have overseen the complete digital overhaul of major global retail banks and decentralized exchanges alike.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                By modernizing core ledgers without disrupting hourly operations, we empower traditional banks to compete directly with native Web3 challengers. We know the stakes, and we welcome the scrutiny. Let us engineer your financial future.
                            </p>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <Landmark className="w-10 h-10 text-emerald-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">Tier-1</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Institutional Partners</span>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <CheckCircle2 className="w-10 h-10 text-green-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">99.999%</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Guaranteed High Availability</span>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center col-span-2">
                                    <Shield className="w-10 h-10 text-teal-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">0</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Systematic Vulnerability Exploits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
