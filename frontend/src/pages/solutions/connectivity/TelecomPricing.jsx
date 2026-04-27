import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Shield, Zap, Globe, Phone, Headphones, ChevronRight, HelpCircle } from 'lucide-react';
import telecomPricingHero from "../../../assets/telecom_pricing_hero.png";

const TelecomPricing = () => {
    const plans = [
        {
            name: "Starter",
            price: "$39",
            period: "per line / mo",
            desc: "Essential connectivity for growing teams.",
            features: {
                "High Speed Data": "5GB",
                "Unlimited Voice": true,
                "Global Roaming": false,
                "Priority Support": false,
                "Security Pack": "Basic",
                "Team Management": false
            },
            color: "border-slate-200"
        },
        {
            name: "Professional",
            price: "$69",
            period: "per line / mo",
            desc: "Advanced features for established businesses.",
            features: {
                "High Speed Data": "Unlimited",
                "Unlimited Voice": true,
                "Global Roaming": "50 Countries",
                "Priority Support": true,
                "Security Pack": "Advanced",
                "Team Management": true
            },
            color: "border-orange-500",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "tailored pricing",
            desc: "Full-scale solutions for large organizations.",
            features: {
                "High Speed Data": "Dedicated",
                "Unlimited Voice": true,
                "Global Roaming": "Worldwide",
                "Priority Support": "24/7 Dedicated",
                "Security Pack": "Elite",
                "Team Management": "Enterprise API"
            },
            color: "border-slate-900"
        }
    ];

    const featureList = ["High Speed Data", "Unlimited Voice", "Global Roaming", "Priority Support", "Security Pack", "Team Management"];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center bg-slate-900" style={{ backgroundImage: `url(${telecomPricingHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-slate-900/60"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                    <Link to="/solutions/connectivity/telecom" className="inline-flex items-center text-orange-400 font-bold mb-6 hover:text-orange-300 transition group mx-auto">
                        <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
                        Back to Telecom Solutions
                    </Link>
                    <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">Simple, Transparent <span className="text-orange-500">Pricing</span></h1>
                    <p className="text-gray-200 text-xl max-w-2xl mx-auto">No hidden fees. No complex contracts. Just reliable connectivity that scales with your business.</p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div key={i} className={`bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 transition-transform hover:-translate-y-2 ${plan.color} flex flex-col`}>
                            {plan.popular && (
                                <div className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-fit mb-6 mx-auto">
                                    Best Value
                                </div>
                            )}
                            <h3 className="text-lg font-black text-slate-500 uppercase tracking-widest text-center mb-2">{plan.name}</h3>
                            <div className="text-center mb-6">
                                <span className={`text-5xl font-black text-slate-900 ${plan.price === 'Custom' ? 'text-3xl' : ''}`}>{plan.price}</span>
                                {plan.price !== 'Custom' && <span className="text-slate-500 font-bold ml-1">/{plan.period.split(' / ')[1]}</span>}
                                <p className="text-slate-400 font-bold text-xs mt-1">{plan.period}</p>
                            </div>
                            <p className="text-slate-600 text-sm text-center font-medium mb-8 leading-relaxed h-10">{plan.desc}</p>
                            
                            <div className="space-y-4 mb-10 flex-grow">
                                {featureList.map((feat, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-3">
                                        <span className="text-sm font-bold text-slate-700">{feat}</span>
                                        <div className="font-black text-orange-600 text-sm">
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
                                    ? "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-100" 
                                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-100"
                            }`}>
                                {plan.price === 'Custom' ? "Contact Sales" : "Choose Plan"}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* FAQ or Additional Info */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <div className="h-1.5 w-20 bg-orange-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { q: "Can we change plans later?", a: "Yes, you can upgrade or downgrade your plan at any time through our portal." },
                            { q: "What is Priority Network?", a: "Pro and Elite users get exclusive network bands for stable connections during peak hours." },
                            { q: "Do you offer multi-line discounts?", a: "Absolutely. For 10+ lines, please contact our enterprise sales team." },
                            { q: "Is international roaming included?", a: "Basic roaming is available on all plans, with dedicated packages on Professional and above." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h4 className="font-black text-slate-900 mb-2 flex gap-2 items-center">
                                    <HelpCircle className="w-5 h-5 text-orange-500" /> {faq.q}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Support CTA */}
            <div className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-black mb-2">Need a completely custom solution?</h3>
                        <p className="text-slate-400">Our engineering team can design a bespoke network architecture for your specific business needs.</p>
                    </div>
                    <Link to="/contact/touch" className="bg-white text-slate-900 font-black px-10 py-4 rounded-xl hover:bg-gray-100 transition whitespace-nowrap">
                        Talk to an Expert
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TelecomPricing;
