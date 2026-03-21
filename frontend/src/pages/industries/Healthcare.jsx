import React from 'react';
import { Heart, Activity, ShieldCheck, Microscope, Database, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import healthcareImg from "../../assets/Healthcare.png"
import healthTech from "../../assets/health.jfif"
export default function Healthcare() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${healthcareImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div>
                        
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Digital Health <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                for a Better Tomorrow
                            </span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-3xl drop-shadow-lg">
                            Revolutionizing patient care with cutting-edge telemedicine, data interoperability, and AI-driven diagnostic tools.
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <Link to="/contact/quote" className="px-10 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105">
                                Talk to an Expert
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/solutions/digital" className="px-10 py-4 bg-white/10 hover:bg-white hover:text-gray-900 text-white font-bold rounded-xl backdrop-blur-sm transition-all border-2 border-white/30 transform hover:scale-105">
                                Explore Solutions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Challenges Section */}
            <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block bg-teal-50 text-teal-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            Key Challenges
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Navigating the Future of Healthcare</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">We empower healthcare providers to overcome modern challenges and focus on what matters most: patient outcomes.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Activity,
                                title: "Interoperability",
                                description: "Seamlessly connecting disparate EHR systems to provide a unified view of patient health history."
                            },
                            {
                                icon: ShieldCheck,
                                title: "HIPAA Compliance",
                                description: "Rigorous security protocols to protect patient privacy and ensure compliance with global healthcare regulations."
                            },
                            {
                                icon: Microscope,
                                title: "AI Diagnostics",
                                description: "Leveraging machine learning to assist doctors in early detection and personalized treatment plans."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-teal-500 transform hover:-translate-y-2 group">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Solutions Grid */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -inset-6 bg-gradient-to-tr from-teal-600 to-emerald-600 rounded-3xl opacity-20 blur-2xl"></div>
                            <img
                                src={healthTech}
                                alt="Healthcare Technology"
                                className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 border-4 border-white w-full h-auto"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-block bg-teal-50 text-teal-600 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                                Our Solutions
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Intelligent Healthcare Ecosystems</h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                We help hospitals, clinics, and health-tech startups build robust digital infrastructure that improves operational efficiency and patient care.
                            </p>

                            <div className="space-y-5">
                                {[
                                    "Telehealth & Remote Monitoring Apps",
                                    "Blockchain for Medical Records",
                                    "Hospital Management Systems (HMS)",
                                    "Predictive Analytics for Resource Allocation",
                                    "IoT-enabled Medical Devices Integration"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group">
                                        <div className="mt-1 bg-teal-50 p-1 rounded-lg group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <span className="text-lg text-gray-900 font-semibold">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Link to="/contact/touch" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 group">
                                    Schedule a demo
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="text-5xl font-black mb-3 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">200+</div>
                            <div className="text-gray-300 font-medium">Hospitals Partnered</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl font-black mb-3 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">5M+</div>
                            <div className="text-gray-300 font-medium">Patient Records Secured</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl font-black mb-3 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">40%</div>
                            <div className="text-gray-300 font-medium">Efficiency Increase</div>
                        </div>
                        <div className="group">
                            <div className="text-5xl font-black mb-3 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">24/7</div>
                            <div className="text-gray-300 font-medium">Support & Monitoring</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-teal-900 to-emerald-900 rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl border border-teal-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                        <div className="relative z-10">
                            <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                                Get Started Today
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">Innovate Your Healthcare Services</h2>
                            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Partner with us to deliver better care through technology. Secure, scalable, and patient-centric solutions await.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Link to="/contact/quote" className="px-10 py-4 bg-white text-teal-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                                    Get Started
                                </Link>
                                <Link to="/company/about-us" className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-teal-900 transition-all transform hover:scale-105">
                                    Why Choose Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
