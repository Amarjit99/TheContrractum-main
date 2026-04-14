import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Shield, Zap, Cloud, Database, Cpu, ChevronRight, HelpCircle, Info } from 'lucide-react';
import cloudPricingHero from "../../../assets/cloud_pricing_hero.png";

const CloudPricing = () => {
    const plans = [
        {
            name: "Basic Cloud",
            price: "$99",
            period: "per month",
            desc: "Essential cloud resources for startups and small projects.",
            features: {
                "vCPU / Memory": "2 vCPU / 4GB",
                "Storage": "100GB SSD",
                "Auto-Scaling": false,
                "Priority Support": false,
                "Global CDN": true,
                "Security Pack": "Standard"
            },
            color: "border-slate-200"
        },
        {
            name: "Business Pro",
            price: "$299",
            period: "per month",
            desc: "Powerful cloud integration for growing enterprises.",
            features: {
                "vCPU / Memory": "8 vCPU / 16GB",
                "Storage": "500GB NVMe",
                "Auto-Scaling": true,
                "Priority Support": true,
                "Global CDN": true,
                "Security Pack": "Advanced"
            },
            color: "border-amber-500",
            popular: true
        },
        {
            name: "Enterprise Multi-Cloud",
            price: "Custom",
            period: "tailored pricing",
            desc: "Full multi-cloud orchestration for large organizations.",
            features: {
                "vCPU / Memory": "Dedicated",
                "Storage": "Unlimited+",
                "Auto-Scaling": "Intelligent",
                "Priority Support": "24/7 Dedicated",
                "Global CDN": "Enterprise",
                "Security Pack": "Zero-Trust"
            },
            color: "border-violet-900"
        }
    ];

    const featureList = ["vCPU / Memory", "Storage", "Auto-Scaling", "Priority Support", "Global CDN", "Security Pack"];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center overflow-hidden" style={{ backgroundImage: `url(${cloudPricingHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-900 via-violet-900/70 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                    <Link to="/solutions/connectivity/cloud" className="inline-flex items-center text-amber-400 font-bold mb-6 hover:text-amber-300 transition group mx-auto">
                        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
                        Back to Cloud Solutions
                    </Link>
                    <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">Cloud Integration <span className="text-amber-500 italic">Pricing</span></h1>
                    <p className="text-gray-200 text-xl max-w-2xl mx-auto drop-shadow-lg font-medium">Scale your cloud infrastructure with transparent, predictable pricing models designed for growth.</p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={`bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 transition-transform hover:-translate-y-2 ${plan.color} flex flex-col overflow-hidden relative group`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rotate-45 translate-x-10 translate-y-6 shadow-lg">
                                    Best Value
                                </div>
                            )}
                            <h3 className="text-lg font-black text-slate-500 uppercase tracking-widest text-center mb-2">{plan.name}</h3>
                            <div className="text-center mb-6">
                                <span className={`text-5xl font-black text-slate-900 ${plan.price === 'Custom' ? 'text-3xl' : ''}`}>{plan.price}</span>
                                {plan.price !== 'Custom' && <span className="text-slate-500 font-bold ml-1">/{plan.period.split(' ')[1]}</span>}
                                <p className="text-slate-400 font-bold text-xs mt-1">{plan.period}</p>
                            </div>
                            <p className="text-slate-600 text-sm text-center font-bold mb-8 leading-relaxed h-12">{plan.desc}</p>
                            
                            <div className="space-y-4 mb-10 flex-grow">
                                {featureList.map((feat, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-3">
                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{feat}</span>
                                        <div className="font-black text-violet-600 text-sm">
                                            {typeof plan.features[feat] === 'boolean' ? (
                                                plan.features[feat] ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
                                            ) : (
                                                plan.features[feat]
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to={plan.price === 'Custom' ? '/contact/touch' : '/contact/request-demo'} className={`w-full py-4 rounded-2xl font-black text-center transition active:scale-95 shadow-lg ${
                                plan.popular 
                                    ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-500 hover:to-amber-400 shadow-amber-100" 
                                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100"
                            }`}>
                                {plan.price === 'Custom' ? "Contact Sales" : "Activate Cloud Plan"}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <Info className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Cloud Integration FAQ</h2>
                        <div className="h-1.5 w-20 bg-violet-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { q: "How is billing calculated?", a: "We use a pay-as-you-go model with monthly invoicing. No hidden setup fees." },
                            { q: "What is Multi-Cloud Orchestration?", a: "It's our system for managing workloads across AWS, Azure, and GCP from a single dashboard." },
                            { q: "Do you offer migration support?", a: "Yes, all Pro and Enterprise plans include dedicated migration assistance from our cloud engineers." },
                            { q: "Is there a free trial?", a: "Yes, start with our 30-day Basic Cloud trial with $200 in credits." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-violet-200 transition">
                                <h4 className="font-black text-slate-900 mb-2 flex gap-2 items-center text-sm">
                                    <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" /> {faq.q}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Support CTA */}
            <div className="bg-violet-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-800 to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div>
                        <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">Need a high-compliance solution?</h3>
                        <p className="text-violet-200 text-lg font-medium">Talk to our HIPAA and SOC 2 compliance experts for specialized sectors.</p>
                    </div>
                    <Link to="/contact/touch" className="bg-amber-500 text-slate-900 font-extrabold px-12 py-5 rounded-2xl hover:bg-amber-400 transition whitespace-nowrap shadow-2xl transform hover:scale-105 active:scale-95 text-lg">
                        Consult with Specialists
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CloudPricing;
