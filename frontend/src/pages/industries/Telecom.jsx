import React from 'react';
import { Signal, Radio, Globe2, Wifi, Server, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import telecomImg from '../../assets/tele.jfif';

export default function Telecom() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-zinc-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1200"
                        alt="Telecommunication Tower"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-900/90 to-transparent z-0"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                            <Signal size={16} />
                            <span>Next-Gen Connectivity</span>
                        </div> */}
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            The Future of <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-400">
                                Global Communication
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                            Empowering telecom providers with 5G infrastructure, AI-driven network optimization, and seamless customer experience platforms.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact/quote" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                                Consult with Us
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/solutions/connectivity" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm transition-all border border-white/10">
                                Network Solutions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Challenges Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Connecting a Data-Hungry World</h2>
                        <p className="text-gray-600 text-lg">As demand for bandwidth explodes, we help telcos scale efficiently and monetize new services.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Radio,
                                title: "5G Rollout",
                                description: "Accelerating the deployment of 5G infrastructure while managing costs and regulatory compliance."
                            },
                            {
                                icon: Server,
                                title: "Network Virtualization",
                                description: "Transitioning to NFV and SDN to increase network agility and reduce hardware dependency."
                            },
                            {
                                icon: Phone,
                                title: "Customer Experience",
                                description: "Delivering hyper-personalized services and support to reduce churn in a competitive market."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
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
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">End-to-End Telecom Engineering</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                From the core network to the edge, we provide the software and engineering expertise to keep the world connected.
                            </p>

                            <div className="space-y-6">
                                {[
                                    "OSS/BSS Transformation",
                                    "Network Operations Center (NOC) Automation",
                                    "IoT Connectivity Platforms",
                                    "Cloud-Native 5G Core Solutions",
                                    "Cybersecurity for Critical Infrastructure"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <span className="text-lg text-black font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Link to="/solutions/connectivity" className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center gap-2 group">
                                    View our capabilities
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-cyan-600/20 rounded-3xl transform rotate-3"></div>
                            <img
                                src={telecomImg}
                                alt="Fiber Optics"
                                loading="lazy"
                                className="relative rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-zinc-900 py-20 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">20+</div>
                            <div className="text-blue-400">Global Telcos</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">1B+</div>
                            <div className="text-blue-400">Subscribers Impacted</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">40%</div>
                            <div className="text-blue-400">OpEx Reduction</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">10x</div>
                            <div className="text-blue-400">Faster Deployment</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="bg-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Build the Network of Tomorrow</h2>
                            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                                Partner with us to navigate the complexities of modern telecommunications.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact/quote" className="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                                    Get Started
                                </Link>
                                <Link to="/company/about-us" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                                    Our Expertise
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
