import React from 'react';
import it from "../../../assets/it.avif";
import cs from "../../../assets/cs.jfif";
import gis from "../../../assets/gis.jfif";
import mr from "../../../assets/mr.jfif";
import { BarChart3, Briefcase, Rocket, Target } from 'lucide-react';

export default function Csit() {
    const features = [
        { icon: BarChart3, title: "GIS Mapping", description: "Advanced geographic information systems for location intelligence" },
        { icon: Briefcase, title: "CS Services", description: "Professional computer science consulting and development" },
        { icon: Rocket, title: "IT Solutions", description: "Enterprise-grade information technology infrastructure" },
        { icon: Target, title: "Managed Support", description: "Comprehensive managed resilience and support services" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${it})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            Business Solutions
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            Business Solutions for Modern Enterprises
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Drive growth with our comprehensive suite of GIS, CS, IT, and managed services designed for the digital age.
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-10 py-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Explore Solutions
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Offerings
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Integrated Business Solutions</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-6">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* GIS Solutions */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Geographic Insights
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">GIS Mapping Solutions</h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                Transform location data into actionable intelligence. Our GIS solutions help you visualize, analyze, and optimize operations.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Spatial analysis</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Custom mapping</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Location intelligence</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Data visualization</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <img src={gis} alt="GIS Mapping" className="w-full h-auto rounded-2xl shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CS & IT Services */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="relative order-2 md:order-1">
                            <img src={cs} alt="IT Services" className="w-full h-auto rounded-2xl shadow-2xl" />
                        </div>
                        <div className="order-1 md:order-2">
                            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Technology Services
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">CS & IT Services</h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                Expert computer science and IT services to drive digital transformation. From custom development to infrastructure modernization.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Software development</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">IT consulting</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Infrastructure setup</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-cyan-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Legacy modernization</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* MRAS Services */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Managed Services
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">MRAS Services</h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                Reduce operational burden with our managed resilience and support services. Focus on your core business while we handle infrastructure.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Managed IT operations</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Service desk support</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Infrastructure management</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-blue-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Cost optimization</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <img src={mr} alt="Managed Services" className="w-full h-auto rounded-2xl shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-800 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">Let's Grow Your Business Together</h2>
                    <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">Our business solutions are designed to maximize your ROI and accelerate growth.</p>
                    <button className="bg-white text-blue-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                        Request Demo
                    </button>
                </div>
            </div>
        </div>
    );
}