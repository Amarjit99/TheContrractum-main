import React from 'react';
import { Landmark, CreditCard, Shield, TrendingUp, Smartphone, PieChart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import bank from "../../assets/bank.webp"
export default function Banking() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden flex items-center" style={{
                backgroundImage: `url(${bank})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                    <div className="max-w-3xl text-left">
                        {/* <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider mb-6 border border-white/30">
                            <span className="flex items-center gap-2"><Landmark size={16} />FinTech Solutions</span>
                        </div> */}
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Secure, Seamless <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                                Digital Banking
                            </span>
                        </h1>
                        <p className="text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl drop-shadow-lg">
                            Transforming financial institutions with secure cloud banking, blockchain integration, and AI-driven fraud detection.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact/quote" className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105">
                                Request Consultation
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/solutions/business" className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border-2 border-white/30 hover:border-white/50 transform hover:scale-105">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Challenges Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Key Challenges
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">The Future of Finance is Digital</h2>
                        <p className="text-gray-600 text-lg">Banks and insurers must innovate rapidly to meet customer expectations while managing risk and compliance.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Cybersecurity",
                                description: "Protecting assets and customer data against increasingly sophisticated cyber threats and fraud."
                            },
                            {
                                icon: Smartphone,
                                title: "Neobank Experience",
                                description: "Competing with agile fintech startups by offering frictionless mobile-first banking experiences."
                            },
                            {
                                icon: PieChart,
                                title: "Regulatory Compliance",
                                description: "Navigating a complex web of global financial regulations (GDPR, PSD2, KYC/AML) with automated solutions."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-emerald-500 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Solutions Grid */}
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-green-500/20 rounded-3xl transform -rotate-3"></div>
                            <img
                                src={bank}
                                alt="Digital Finance"
                                loading="lazy"
                                className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-6">
                                Our Solutions
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Intelligent Financial Systems</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                We engineer secure, scalable platforms that power the next generation of financial services.
                            </p>

                            <div className="space-y-6">
                                {[
                                    "Open Banking API Development",
                                    "AI-Powered Risk Assessment & Scoring",
                                    "Blockchain-based Payments & Settlements",
                                    "Robotic Process Automation (RPA) for Operations",
                                    "Secure Mobile Wallet & Payment Apps"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <span className="text-lg text-black font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Link to="/contact/touch" className="text-emerald-600 font-bold hover:text-emerald-700 inline-flex items-center gap-2 group">
                                    Modernize your bank
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">300+</div>
                            <div className="text-gray-300">Financial Clients</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">$50B+</div>
                            <div className="text-gray-300">Assets Managed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Zero</div>
                            <div className="text-gray-300">Security Breaches</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">24/7</div>
                            <div className="text-gray-300">Fraud Monitoring</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Innovate with Confidence</h2>
                            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                                Partner with a team that understands the intersection of finance and technology.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact/quote" className="px-10 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105">
                                    Start a Project
                                </Link>
                                <Link to="/company/about-us" className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
                                    Why Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
