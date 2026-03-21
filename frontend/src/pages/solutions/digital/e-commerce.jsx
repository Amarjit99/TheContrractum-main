import React from 'react';
import online from "../../../assets/online.jpg";

import { ShoppingBag, Smartphone, CreditCard, Package, Truck, BarChart3, Shield, Users, Settings, Palette, LinkIcon, TrendingUp, ShoppingCart, Zap } from 'lucide-react';

export default function ECommerceSolutions() {
    const ecommercePlatforms = [
        { icon: ShoppingBag, title: "Multi-Channel Selling", description: "Sell across multiple platforms and channels seamlessly" },
        { icon: Smartphone, title: "Mobile Commerce", description: "Optimized shopping experience for mobile users" },
        { icon: CreditCard, title: "Payment Integration", description: "Multiple payment gateways and processors" },
        { icon: Package, title: "Inventory Management", description: "Real-time stock tracking and management" },
        { icon: Truck, title: "Logistics Integration", description: "Automated shipping and delivery solutions" },
        { icon: BarChart3, title: "Analytics Dashboard", description: "Advanced insights and sales analytics" },
        { icon: Shield, title: "Security & Compliance", description: "PCI DSS certified and secure transactions" },
        { icon: Users, title: "Customer Management", description: "CRM and loyalty program integration" },
    ];

    const platformComparison = [
        { name: "Shopify", features: ["Easy Setup", "Low Cost", "Scalable"], highlight: true },
        { name: "WooCommerce", features: ["Flexible", "Open Source", "Customizable"], highlight: false },
        { name: "Magento", features: ["Enterprise", "Powerful", "Complex"], highlight: false },
        { name: "BigCommerce", features: ["Professional", "Full-Featured", "Global"], highlight: true },
    ];

    const services = [
        { icon: Settings, title: "Platform Setup", description: "Configure your e-commerce platform from scratch with best practices" },
        { icon: Palette, title: "Store Design", description: "Beautiful, responsive storefronts that convert visitors to customers" },
        { icon: LinkIcon, title: "Integration Services", description: "Connect your store with inventory, accounting, and analytics tools" },
        { icon: TrendingUp, title: "Performance Optimization", description: "Speed optimization, SEO, and conversion rate improvements" },
        { icon: ShoppingCart, title: "Cart Customization", description: "Enhanced checkout flows to reduce abandonment" },
        { icon: Zap, title: "App Development", description: "Native mobile apps for increased customer engagement" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${online})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            E-Commerce Solutions
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            E-Commerce Platform Solutions
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Build, scale, and optimize your online store with our comprehensive e-commerce solutions. From setup to growth, we've got you covered.
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-10 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Start Your Store
                        </button>
                    </div>
                </div>
            </div>

            {/* E-Commerce Features Grid */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Platform Features
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">E-Commerce Platform Features</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Everything you need to run a successful online business</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {ecommercePlatforms.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-2xl transition transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-6">
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

            {/* Platform Comparison */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Platform Comparison
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Choose Your Perfect Platform</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Compare our recommended e-commerce platforms</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {platformComparison.map((p, i) => (
                            <div key={i} className={`rounded-2xl p-8 text-center transition transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl ${
                                p.highlight 
                                    ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white ring-4 ring-purple-300" 
                                    : "bg-white text-slate-900"
                            }`}>
                                <h3 className="text-2xl sm:text-3xl font-black mb-6">{p.name}</h3>
                                <ul className="space-y-3 text-sm sm:text-base mb-8">
                                    {p.features.map((f, j) => (
                                        <li key={j} className="flex justify-center items-center gap-2">
                                            <span className="font-bold text-xl">✓</span> <span className="font-semibold">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`px-8 py-3 rounded-xl font-bold transition transform hover:scale-110 shadow-lg ${
                                    p.highlight 
                                        ? "bg-white text-purple-600 hover:bg-gray-100" 
                                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                                }`}>
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Our E-Commerce Services</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Complete solutions from launch to growth</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition border-t-4 border-purple-500 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transform transition">
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-3 text-xl">{s.title}</h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">{s.description}</p>
                                    <button className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2 group-hover:gap-4 transition">
                                        Learn More <span>→</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Conversion & Growth */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="relative order-2 md:order-1">
                            <img src={online} alt="Conversion Optimization" className="w-full h-auto rounded-2xl shadow-2xl" />
                        </div>
                        <div className="order-1 md:order-2">
                            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Maximize Revenue
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Conversion & Growth Strategies</h2>
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                                Optimize every step of the customer journey to increase sales and customer lifetime value. Our proven strategies drive measurable results.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">A/B testing & optimization</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Email marketing automation</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">SEO and content marketing</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Personalization engines</span>
                                </li>
                                <li className="flex gap-4 text-base sm:text-lg text-slate-700 items-center">
                                    <span className="text-purple-600 font-bold text-xl">✓</span>
                                    <span className="font-semibold">Upsell & cross-sell tactics</span>
                                </li>
                            </ul>
                            <button className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-10 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-2xl">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-purple-800 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl">Ready to Launch Your E-Commerce Store?</h2>
                    <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">Get expert guidance and support to build and scale your online business. Our proven strategies help merchants like you achieve 5x growth.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-white text-purple-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Request Demo
                        </button>
                        <button className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white hover:text-purple-900 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            View Pricing
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Success Stories
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">Client Success Stories</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Fashion Boutique", growth: "250% increase in sales", testimonial: "The platform setup and optimization were seamless. Our conversion rate improved significantly." },
                            { name: "Electronics Store", growth: "5x faster shipping", testimonial: "Integration with our logistics was quick and reliable. Customer satisfaction has never been better." },
                            { name: "Health & Wellness", growth: "$2M annual revenue", testimonial: "Their growth strategies helped us scale from 100 to 500 orders monthly in just 6 months." }
                        ].map((story, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition border-l-4 border-purple-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white flex items-center justify-center font-bold text-xl">
                                        {story.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{story.name}</h3>
                                        <p className="text-purple-600 text-sm font-semibold">{story.growth}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm italic">"{story.testimonial}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}