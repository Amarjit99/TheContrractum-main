import React from 'react';
import { Link } from 'react-router-dom';
import DynamicServices from "../../../components/DynamicServices";
import hr from "../../../assets/hr.jpg";
import {
    Users,
    UserPlus,
    FileText,
    Globe,
    Briefcase,
    ShieldCheck,
    HardHat,
    Settings,
    Download,
    Send,
    ClipboardCheck
} from 'lucide-react';

export default function HrTech() {
    const servicesList = [
        { icon: Users, title: "Staffing Solutions", id: "A" },
        { icon: UserPlus, title: "Recruitment", id: "B" },
        { icon: HardHat, title: "Manpower Contract Staffing", id: "C" },
        { icon: Globe, title: "Global Workforce Experts", id: "D" },
        { icon: Settings, title: "Workforce Management", id: "E" },
        { icon: Briefcase, title: "IT Services", id: "F" },
        { icon: ShieldCheck, title: "Managed Services Provider", id: "G" },
        { icon: ClipboardCheck, title: "Vendor Management Services", id: "H" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[650px] flex items-center" style={{ backgroundImage: `url(${hr})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div className="max-w-4xl">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold uppercase tracking-widest mb-6 border border-cyan-500/30 backdrop-blur-md">
                            Human Capital Excellence
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
                            End-to-End <span className="text-cyan-500">Human Resources</span> Services
                        </h1>
                        <p className="text-gray-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl drop-shadow-2xl font-medium">
                            TheContractum staffing services help simplify operations by outsourcing the complete staffing administration process—from onboarding and management to full settlement. We are a leader in diverse recruitment across India.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                to="/contact/quote"
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
                            >
                                <Send size={20} />
                                Apply Now
                            </Link>
                            <Link
                                to="/solutions/download?service=hrtech"
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
                <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 -skew-x-12 transform translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Workforce Solutions
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Human Resources Portfolio</h2>
                        <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We provide skilled and unskilled employee recruitment across diverse fields with a successful track record of dominance in the industry.
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
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform">
                                            <Icon size={28} />
                                        </div>
                                        <div>
                                            <div className="text-cyan-600 font-bold text-xs uppercase mb-1">SERVICE {service.id}</div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">{service.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* High Expertise Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-cyan-500/10 rounded-3xl -rotate-2"></div>
                            <img
                                src={hr}
                                alt="HR Expertise"
                                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl relative z-10 border-8 border-white"
                            />
                        </div>

                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Highly Expertism
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                Simplifying Staffing for Every Business Need
                            </h2>

                            <div className="space-y-6">
                                {[
                                    "Onboarding & complete staff management",
                                    "Skilled & unskilled employee recruitment",
                                    "Full and final settlement administration",
                                    "End-to-end personnel business services"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 items-center p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold shrink-0">
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8">
                        Ready to <span className="text-cyan-500">Simplify Your HR?</span>
                    </h2>

                    <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Partner with India's leading staffing experts to streamline your recruitment and workforce management today.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/join/partner"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-cyan-500/40 text-lg"
                        >
                            Partner with Us
                        </Link>
                        <Link
                            to="/solutions/info?service=hrtech"
                            className="bg-white/5 hover:bg-white/10 text-white font-bold px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg"
                        >
                            Download HR Profile (PDF)
                        </Link>
                    </div>
                </div>
            </div>

            {/* Dynamic Content from CMS */}
            <DynamicServices category="Digital Solutions" subCategory="HR Tech Solutions" />
        </div>
    );
}