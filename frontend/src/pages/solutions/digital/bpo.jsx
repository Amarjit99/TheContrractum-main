import React from 'react';
import { Link } from 'react-router-dom';
import DynamicServices from "../../../components/DynamicServices";
import bpoo from "../../../assets/bpoo.webp";
import {
    PhoneIncoming,
    Headphones,
    PhoneOutgoing,
    Database,
    Eraser,
    FileSearch,
    Globe,
    Download,
    Send,
    LifeBuoy
} from 'lucide-react';

export default function BPO() {
    const servicesList = [
        { icon: PhoneIncoming, title: "Inbound Call Centre Services", id: "A" },
        { icon: LifeBuoy, title: "Inbound Customer Solution Services", id: "B" },
        { icon: PhoneOutgoing, title: "Outbound Call Centre Services", id: "C" },
        { icon: Database, title: "Back Office Services", id: "D" },
        { icon: Eraser, title: "Data Cleaning Services", id: "E" },
        { icon: FileSearch, title: "Data Entry and Data Mining Services", id: "F" },
        { icon: Globe, title: "Web-Enabled Services", id: "G" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[650px] flex items-center" style={{ backgroundImage: `url(${bpoo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold uppercase tracking-widest mb-6 border border-indigo-500/30 backdrop-blur-md">
                            Operational Excellence
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
                            Strategic <span className="text-indigo-500">BPO</span> & Knowledge Process Solutions
                        </h1>
                        <p className="text-gray-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl drop-shadow-2xl font-medium">
                            TheContractum provides high-quality business process outsourcing services including inbound/outbound call centers and back-office support. We help our clients achieve operational efficiency and customer satisfaction through dedicated service excellence.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                to="/contact/quote"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
                            >
                                <Send size={20} />
                                Apply Now
                            </Link>
                            <Link
                                to="/solutions/download?service=bpo"
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
                <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/5 -skew-x-12 transform translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our BPO Portfolio
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Comprehensive BPO Services</h2>
                        <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Delivering specialized inbound, outbound, and back-office solutions designed to scale with your business requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {servicesList.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 group hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden"
                                >
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                                            <Icon size={28} />
                                        </div>
                                        <div>
                                            <div className="text-indigo-600 font-bold text-xs uppercase mb-1">SERVICE {service.id}</div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{service.title}</h3>
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
                            <div className="absolute -inset-4 bg-indigo-500/10 rounded-3xl -rotate-2"></div>
                            <img
                                src={bpoo}
                                alt="BPO Impact"
                                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl relative z-10 border-8 border-white"
                            />
                        </div>

                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Scalability & Quality
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                Enhance Efficiency with Professional Outsourcing
                            </h2>

                            <div className="space-y-6">
                                {[
                                    "Multichannel inbound and outbound customer support",
                                    "Accurate data entry, mining & cleaning specialists",
                                    "Robust back-office & web-enabled operations",
                                    "SLA-driven performance for highest quality delivery"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
                        Drive Your <span className="text-indigo-500">Business Growth</span>
                    </h2>

                    <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Our BPO services are designed to help you focus on core business strategies while we handle the operational complexities with precision.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/team/technical-experts"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-indigo-500/40 text-lg"
                        >
                            Consult with Experts
                        </Link>
                        <Link
                            to="/solutions/download?service=bpo"
                            className="bg-white/5 hover:bg-white/10 text-white font-bold px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg"
                        >
                            Get Brochure (PDF)
                        </Link>
                    </div>
                </div>
            </div>

            {/* Dynamic Content from CMS */}
            <DynamicServices category="Digital Solutions" subCategory="BPO Services" />
        </div>
    );
}