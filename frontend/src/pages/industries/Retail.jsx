import React from 'react';
import { ShoppingBag, TrendingUp, Users, RefreshCw, Truck, Smartphone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import eco from "../../assets/eco.jpg"
import ecommerceImg from "../../assets/ecommerce.jfif"
export default function Retail() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden flex items-center" style={{
                backgroundImage: `url(${eco})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                       {/* <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider mb-6 border border-white/30">
                            <span className="flex items-center gap-2"><ShoppingBag size={16} />Retail & Ecommerce</span>
                        </div> */}
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Redefining the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                Shopper Experience
                            </span>
                        </h1>
                        <p cla ssName="text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl drop-shadow-lg">
                            Unifying physical and digital commerce with omnichannel strategies, AI-driven personalization, and smart supply chain solutions.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact/quote" className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105">
                                Request Strategy
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
                        <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Key Challenges
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Capturing the Modern Consumer</h2>
                        <p className="text-gray-600 text-lg">In a hyper-competitive market, we help retailers stay agile, relevant, and customer-obsessed.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: RefreshCw,
                                title: "Omnichannel Unity",
                                description: "Eliminating silos between online and offline channels to create a fluid, consistent brand journey."
                            },
                            {
                                icon: TrendingUp,
                                title: "Data-Driven Insights",
                                description: "Leveraging big data to predict trends, optimize inventory, and personalize marketing efforts."
                            },
                            {
                                icon: Users,
                                title: "Customer Loyalty",
                                description: "Building lasting relationships through rewards programs, superior service, and emotional connection."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-purple-500 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-3xl transform -rotate-3"></div>
                            <img
                                src={ecommerceImg}
                                alt="Modern Retail"
                                loading="lazy"
                                className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-bold uppercase tracking-wider mb-6">
                                Our Solutions
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Future-Ready Retail Architecture</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Whether you're a boutique brand or a global chain, we build the technology stack that powers your growth.
                            </p>

                            <div className="space-y-6">
                                {[
                                    "E-commerce Platform Development",
                                    "Point of Sale (POS) Integration",
                                    "Inventory & Supply Chain Management",
                                    "Customer Relationship Management (CRM)",
                                    "AR/VR Virtual Try-On Experiences"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <span className="text-lg text-black font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Link to="/contact/touch" className="text-primary font-bold hover:text-primary-dark inline-flex items-center gap-2 group">
                                    Upgrade your store
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100+</div>
                            <div className="text-gray-300">Brands Transformed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$2B+</div>
                            <div className="text-gray-300">Revenue Processed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">25%</div>
                            <div className="text-gray-300">Conversion Uplift</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50%</div>
                            <div className="text-gray-300">Faster Checkout</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Scale Your Retail Business</h2>
                            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                                Don't just sell—create experiences. Let's build a retail ecosystem that customers love.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact/quote" className="px-10 py-4 bg-white text-purple-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105">
                                    Get Started
                                </Link>
                                <Link to="/company/about-us" className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
