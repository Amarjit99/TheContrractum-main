import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Shield, Crown, HelpCircle } from 'lucide-react';

const PricingPage = () => {
    const plans = [
        {
            name: "Starter",
            price: "499",
            description: "Perfect for small businesses starting their digital journey.",
            features: [
                "Basic E-commerce Setup",
                "Up to 500 Products",
                "Standard SEO Optimization",
                "Community Support",
                "Mobile Responsive Design",
                "Basic Analytics"
            ],
            icon: Zap,
            highlight: false,
            buttonText: "Choose Starter",
            color: "from-blue-500 to-cyan-500"
        },
        {
            name: "Professional",
            price: "999",
            description: "Advanced features for growing businesses and high traffic.",
            features: [
                "Advanced E-commerce Setup",
                "Unlimited Products",
                "Priority SEO & Marketing",
                "24/7 Dedicated Support",
                "Custom UX/UI Design",
                "Advanced Analytics & ROI Tracking",
                "Multi-channel Integration",
                "Inventory Management Sync"
            ],
            icon: Shield,
            highlight: true,
            buttonText: "Choose Professional",
            color: "from-purple-600 to-pink-600"
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for large-scale operations and complex needs.",
            features: [
                "Full Platform Migration",
                "Custom API Developments",
                "Dedicated Account Manager",
                "Wholesale & B2B Features",
                "Advanced Security Controls",
                "SLA Guaranteed Support",
                "On-site Training",
                "Quarterly Business Reviews"
            ],
            icon: Crown,
            highlight: false,
            buttonText: "Contact Sales",
            color: "from-emerald-500 to-teal-500"
        }
    ];

    const faqs = [
        { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise clients." },
        { q: "Is there a setup fee?", a: "The Starter and Professional plans have no setup fees. Enterprise setup fees vary based on complexity." },
        { q: "Do you offer a free trial?", a: "We provide a 14-day free trial for our Professional plan features so you can test the platform." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
                
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="text-base font-semibold leading-7 text-purple-400 uppercase tracking-widest">Pricing Plans</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Scalable pricing for every business size
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Choose the plan that's right for you. Transparent pricing with no hidden fees, designed to help your store grow and succeed.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-24 pb-24 relative z-10">
                <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-8 items-stretch">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <div 
                                key={index} 
                                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                                    plan.highlight ? 'ring-2 ring-purple-600 shadow-xl scale-105 lg:scale-110 z-20' : 'z-10'
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-x-4">
                                        <h3 className={`text-2xl font-bold leading-8 ${plan.highlight ? 'text-purple-600' : 'text-slate-900'}`}>
                                            {plan.name}
                                        </h3>
                                        {plan.highlight && (
                                            <p className="rounded-full bg-purple-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-purple-600">
                                                Most Popular
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-4 flex items-center gap-x-3">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${plan.color}`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-sm leading-6 text-gray-600">{plan.description}</p>
                                    </div>
                                    <p className="mt-6 flex items-baseline gap-x-1">
                                        <span className="text-4xl font-bold tracking-tight text-slate-900">
                                            {plan.price !== "Custom" ? `$${plan.price}` : plan.price}
                                        </span>
                                        {plan.price !== "Custom" && <span className="text-sm font-semibold leading-6 text-gray-600">/mo</span>}
                                    </p>
                                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex gap-x-3">
                                                <Check className="h-6 w-5 flex-none text-purple-600" aria-hidden="true" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link
                                    to={plan.price === "Custom" ? "/contact/request-demo" : "/solutions/product-details"}
                                    className={`mt-10 block rounded-xl px-4 py-3 text-center text-sm font-bold leading-6 transition-all duration-200 shadow-sm hover:shadow-md transform active:scale-95 ${
                                        plan.highlight 
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90' 
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                    }`}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Comparison Table (Desktop Only) */}
            <div className="hidden lg:block bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Compare Features</h2>
                        <p className="mt-4 text-lg text-gray-600">A detailed look at what's included in each plan.</p>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 font-semibold text-slate-900">Feature</th>
                                <th className="py-4 font-semibold text-slate-900 text-center">Starter</th>
                                <th className="py-4 font-semibold text-purple-600 text-center">Professional</th>
                                <th className="py-4 font-semibold text-slate-900 text-center">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                ["Platform Access", "Basic", "Full", "Advanced"],
                                ["Support", "Community", "Priority Email", "24/7 Phone/Email"],
                                ["Products", "500", "Unlimited", "Unlimited"],
                                ["Custom Domain", "✓", "✓", "✓"],
                                ["API Access", "-", "✓", "✓"],
                                ["B2B Features", "-", "-", "✓"],
                                ["Inventory Management", "Manual", "Automated", "Advanced Sync"],
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td className="py-4 text-sm text-gray-600 font-medium">{row[0]}</td>
                                    <td className="py-4 text-sm text-gray-500 text-center">{row[1]}</td>
                                    <td className="py-4 text-sm text-purple-600 font-semibold text-center bg-purple-50/30">{row[2]}</td>
                                    <td className="py-4 text-sm text-gray-500 text-center">{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-slate-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <div className="flex justify-center mb-4">
                            <HelpCircle className="w-12 h-12 text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
                        <p className="mt-4 text-lg text-gray-600">Find answers to common questions about our plans and services.</p>
                    </div>
                    <div className="mx-auto max-w-3xl grid grid-cols-1 gap-8 md:grid-cols-2">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <dt className="text-base font-bold leading-7 text-slate-900">{faq.q}</dt>
                                <dd className="mt-2 text-sm leading-7 text-gray-600">{faq.a}</dd>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter/CTA */}
            <div className="bg-purple-700 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-slate-900 p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                        <div className="relative z-10 max-w-xl text-center lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Still not sure?</h2>
                            <p className="mt-4 text-lg text-gray-300">
                                Schedule a 15-minute consultation with our experts to find the perfect solution for your business.
                            </p>
                        </div>
                        <div className="relative z-10">
                            <Link 
                                to="/contact/request-demo"
                                className="inline-block rounded-xl bg-white px-8 py-4 text-sm font-black text-purple-700 shadow-xl hover:bg-gray-100 transition transform hover:scale-105 active:scale-95"
                            >
                                Schedule Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
