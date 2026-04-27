import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Globe, Cpu, Smartphone, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';
import telecom5gHero from "../../../assets/telecom_5g_hero.png";

const Telecom5GPlans = () => {
    const plans = [
        {
            name: "Basic 5G",
            speed: "500 Mbps",
            data: "100 GB",
            price: "$49",
            features: ["HD Streaming", "Standard Gaming", "Reliable Connectivity", "24/7 Support"],
            color: "from-blue-500 to-indigo-600"
        },
        {
            name: "Pro 5G",
            speed: "2 Gbps",
            data: "Unlimited",
            price: "$79",
            features: ["4K/8K Streaming", "Pro Gaming", "Priority Network", "Enhanced Security"],
            color: "from-orange-500 to-red-600",
            popular: true
        },
        {
            name: "Elite 5G",
            speed: "10 Gbps",
            data: "Unlimited+",
            price: "$129",
            features: ["Cloud Computing Ready", "IoT Integration", "Dedicated IP", "Premium Support"],
            color: "from-purple-600 to-indigo-700"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[500px] flex items-center overflow-hidden" style={{ backgroundImage: `url(${telecom5gHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl text-white">
                        <Link to="/solutions/connectivity/telecom" className="inline-flex items-center text-orange-400 font-bold mb-6 hover:text-orange-300 transition group">
                            <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
                            Back to Telecom Solutions
                        </Link>
                        <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight drop-shadow-xl">
                            Experience the Power of <span className="text-orange-500">5G</span>
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8">
                            Unleash unprecedented speeds and ultra-low latency with our next-generation 5G plans. Designed for the connected future.
                        </p>
                    </div>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Choose Your 5G Experience</h2>
                    <p className="text-slate-600 text-lg">Fast, reliable, and secure 5G plans tailored to your needs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${
                            plan.popular 
                                ? "bg-white border-orange-500 shadow-2xl scale-105 z-10 ring-4 ring-orange-100" 
                                : "bg-gray-50 border-gray-100 hover:shadow-xl hover:bg-white"
                        }`}>
                            {plan.popular && (
                                <span className="absolute top-0 right-8 -translate-y-1/2 bg-orange-600 text-white text-xs font-black uppercase px-4 py-1.5 rounded-full shadow-lg">
                                    Most Popular
                                </span>
                            )}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                                <span className="text-slate-500 font-bold">/mo</span>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Max Speed</p>
                                    <p className="text-lg font-black text-orange-600">{plan.speed}</p>
                                </div>
                                <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Data Cap</p>
                                    <p className="text-lg font-black text-slate-900">{plan.data}</p>
                                </div>
                                <div className="pt-4 space-y-3">
                                    {plan.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-semibold">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-black transition transform active:scale-95 shadow-xl ${
                                plan.popular 
                                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-orange-200" 
                                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100"
                            }`}>
                                Get Started Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Detail */}
            <div className="bg-slate-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Advanced 5G Technology <br/> <span className="text-orange-500 underline decoration-4 underline-offset-8">Built for Business</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    { icon: Shield, title: "Secure Core", desc: "Private network slices for business security." },
                                    { icon: Globe, title: "Wide Coverage", desc: "98% nationwide 5G coverage and growing." },
                                    { icon: Cpu, title: "Edge Ops", desc: "Process data closer to your devices." },
                                    { icon: BarChart3, title: "Insights", desc: "Real-time network performance analytics." }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                                            <item.icon className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h4 className="font-black text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            <h3 className="text-3xl font-black mb-6 relative z-10">Why move to 5G?</h3>
                            <ul className="space-y-6 relative z-10">
                                {[
                                    "Up to 100x faster than 4G LTE",
                                    "Ultra-low latency for real-time apps",
                                    "Support for massive IoT deployments",
                                    "Improved energy efficiency for devices",
                                    "Reliable connectivity in crowded areas"
                                ].map((bullet, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 font-bold text-xs text-slate-900">
                                            {i + 1}
                                        </div>
                                        <p className="font-bold text-gray-200">{bullet}</p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-12 relative z-10">
                                <Link to="/contact/request-demo" className="bg-orange-500 text-slate-900 font-extrabold px-8 py-3 rounded-xl hover:bg-orange-400 transition inline-block">
                                    Request Business Audit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Telecom5GPlans;
