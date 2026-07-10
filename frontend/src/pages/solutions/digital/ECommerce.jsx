import React from 'react';
import { Link } from 'react-router-dom';
import online from "../../../assets/online.jpg";
import DynamicServices from "../../../components/DynamicServices";
import {
    ShoppingBag,
    ShoppingCart,
    Smartphone,
    Package,
    Truck,
    BarChart3,
    Layers,
    Globe,
    Zap,
    Download,
    Send,
    Building2,
    Store
} from 'lucide-react';

export default function ECommerceSolutions() {
    const servicesList = [
        { icon: ShoppingBag, title: "Amazon Assistant", id: "A" },
        { icon: ShoppingCart, title: "Flipkart Assistant", id: "B" },
        { icon: Store, title: "Snapdeal Assistant", id: "C" },
        { icon: Building2, title: "Shopclues Assistant", id: "D" },
        { icon: Smartphone, title: "Paytm Mall Assistant", id: "E" },
        { icon: Layers, title: "Myntra Assistant", id: "F" },
        { icon: Globe, title: "Ajio Assistant", id: "G" },
        { icon: Package, title: "Nykaa Assistant", id: "H" },
        { icon: Zap, title: "Udaan Assistant", id: "I" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[650px] flex items-center" style={{ backgroundImage: `url(${online})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold uppercase tracking-widest mb-6 border border-purple-500/30 backdrop-blur-md">
                            Future of Digital Commerce
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
                            Scalable <span className="text-purple-500">E-Commerce</span> Solutions & Services
                        </h1>
                        <p className="text-gray-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl drop-shadow-2xl font-medium">
                            TheContractum creates a platform for the future in e-commerce. We deliver scalable B2B and B2C core solutions, helping you manage stock, sales, and dynamic landing pages across major global marketplaces.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                to="/contact/quote"
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
                            >
                                <Send size={20} />
                                Apply Now
                            </Link>
                            <Link
                                to="/solutions/download?service=ecommerce"
                                className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all border border-white/20 backdrop-blur-md flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
                            >
                                <Download size={20} />
                                Download PDF
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services List Section */}
            <div className="bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-500/5 -skew-x-12 transform translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Multi-Portal Assistance
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Complete E-Commerce Support</h2>
                        <div className="w-24 h-1.5 bg-purple-500 mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We provide end-to-end assistant services for all major e-commerce portals to help you achieve serious sales results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {servicesList.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 group hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
                                >
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                                            <Icon size={28} />
                                        </div>
                                        <div>
                                            <div className="text-purple-600 font-bold text-xs uppercase mb-1">PORTAL {service.id}</div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{service.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Impact Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-purple-500/10 rounded-3xl -rotate-2"></div>
                            <img
                                src={online}
                                alt="E-Commerce Impact"
                                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl relative z-10 border-8 border-white"
                            />
                        </div>

                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Global Commerce Expertism
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                Manage Your Online Store with Serious Sales Intelligence
                            </h2>

                            <div className="space-y-6">
                                {[
                                    "Dynamic landing page editing & optimization",
                                    "In-depth stock & sales intelligent reporting",
                                    "Scale from tens to thousands of product items",
                                    "Flexible B2B and B2C Core E-commerce solutions"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold shrink-0">
                                            ✓
                                        </div>
                                        <span className="font-bold text-lg text-slate-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-slate-900 relative py-20 lg:py-32 overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-full h-full opacity-25">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
                        Ready to <span className="text-purple-500">Sell Globally?</span>
                    </h2>

                    <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Joining hands with us and be rest ensured that your online business will get quality treatment and our complete attention.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/contact/request-demo"
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-purple-500/40 text-lg"
                        >
                            Request a Consultation
                        </Link>
                        <Link
                            to="/solutions/download?service=ecommerce"
                            className="bg-white/5 hover:bg-white/10 text-white font-bold px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg"
                        >
                            Get Brochure (PDF)
                        </Link>
                    </div>
                </div>
            </div>
            <DynamicServices category="Digital Solutions" subCategory="E-Commerce Platforms" />
        </div>
    );
}