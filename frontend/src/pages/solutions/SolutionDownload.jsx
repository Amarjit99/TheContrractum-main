import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, User, Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import gsi from "../../assets/gsi.jpg";

const SolutionDownload = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceParam = queryParams.get("service") || "general";

    // Mapping service IDs to human-readable names
    const serviceNames = {
        gis: "GIS Solutions",
        csit: "CS & IT Solutions",
        mras: "Market Research & Analysis",
        ecommerce: "E-Commerce Services",
        telecom: "Telecommunication",
        hrtech: "Human Resources",
        bpo: "Business Process Outsourcing",
        cloud: "Cloud Solutions",
        network: "Network Infrastructure"
    };

    // Mapping service IDs to PDF brochure files
    const brochureFiles = {
        gis: "GIS.pdf",
        csit: "CSIT.pdf"
    };

    const serviceTitle = serviceNames[serviceParam] || "Our Business Solutions";
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        service: serviceParam,
        add_browcher: "true"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // 1. Capture the lead in the backend
            await fetch(`${API}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.contact,
                    subject: `Brochure Request: ${serviceTitle}`,
                    message: `User requested the ${serviceTitle} brochure via the download form.`
                })
            });

            // 2. Trigger the download if file exists
            const fileName = brochureFiles[serviceParam];
            if (fileName) {
                const link = document.createElement('a');
                link.href = `${import.meta.env.BASE_URL}pdf/${fileName}`;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            setSubmitted(true);
        } catch (err) {
            console.error("Download error:", err);
            // Even if lead capture fails locally, try to let them download if they filled the form
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-blue-600 w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Thank You!</h2>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                        Your details have been received. Your {serviceTitle} brochure is being prepared for download.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
                    >
                        <ArrowLeft size={18} />
                        Back to Solutions
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Left Side - Visual Content */}
            <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={gsi}
                        alt={serviceTitle}
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/90"></div>
                </div>

                <div className="relative z-10 p-12 lg:p-20 flex flex-col justify-center text-white">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-12 transition-colors group"
                    >
                        <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                        Back to Solutions
                    </button>

                    <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                        {serviceTitle} <br />
                        <span className="text-blue-500 text-3xl sm:text-4xl lg:text-5xl">Capability Profile</span>
                    </h1>

                    <p className="text-gray-300 text-lg lg:text-xl max-w-lg mb-8 leading-relaxed">
                        Download our comprehensive brochure to explore our {serviceTitle} capabilities, past projects, and technology stacks.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Complete List of Service Categories",
                            "Industry-specific Case Studies",
                            "Technical Architecture Overview",
                            "Service Delivery Framework"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0">
                                    ✓
                                </div>
                                <span className="font-semibold text-gray-200">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white relative">
                <div className="max-w-md w-full">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Get Your Brochure</h2>
                        <p className="text-slate-500 font-medium tracking-tight">
                            Please provide your professional details to access the {serviceTitle} PDF.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="service" value={serviceParam} />
                        <input type="hidden" name="add_browcher" value="true" />

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-slate-700 ml-1">
                                Your Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-slate-700 ml-1">
                                Your Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email address"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-bold text-slate-700 ml-1">
                                Your Contact Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter contact number"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-[0.98] transform"
                        >
                            <Download size={22} />
                            Download PDF Brochure
                        </button>

                        <p className="text-center text-slate-400 text-xs font-medium px-8">
                            By downloading, you agree to our Terms of Service and Privacy Policy. We'll protect your information.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SolutionDownload;