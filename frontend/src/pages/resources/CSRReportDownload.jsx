import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Download, User, Mail, Phone, ArrowLeft, CheckCircle, Leaf, Users, Shield, Award } from "lucide-react";
import { COUNTRIES } from "../../constants/countries";
import { toast } from "react-hot-toast";

const CSRReportDownload = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        countryIndex: 0
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "contact") {
            // Strip any non-digit character for validation & formatting consistency
            const cleanVal = value.replace(/\D/g, "");
            setFormData(prev => ({ ...prev, [name]: cleanVal }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        // Clear errors for the field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email address is required";
        } else if (!formData.email.endsWith("@gmail.com")) {
            newErrors.email = "Please use a @gmail.com email address";
        }

        // Phone validation (exactly 10 digits required)
        if (!formData.contact) {
            newErrors.contact = "Phone number is required";
        } else if (formData.contact.length !== 10) {
            newErrors.contact = "Phone number must be exactly 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("Please correct the form errors before submitting.");
            return;
        }

        setLoading(true);

        try {
            const country = COUNTRIES[formData.countryIndex];
            const fullPhone = `${country.code} ${formData.contact}`;

            // 1. Capture the lead in the backend CSR report downloads collection
            const response = await fetch(`${API}/api/csr/report-download`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                    country: country.iso
                })
            });

            if (!response.ok) {
                throw new Error("Failed to save lead information");
            }

            // 2. Trigger the download dynamically in the backside
            const link = document.createElement('a');
            link.href = `${import.meta.env.BASE_URL || "/"}pdf/CSR_Report.pdf`;
            link.download = "CSR_Report.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Download started successfully!");
            setSubmitted(true);
        } catch (err) {
            console.error("CSR download form error:", err);
            toast.error("Something went wrong, but you can still download the report directly.");
            
            // Backup download in case API is down so it does not fail
            const link = document.createElement('a');
            link.href = `${import.meta.env.BASE_URL || "/"}pdf/CSR_Report.pdf`;
            link.download = "CSR_Report.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-emerald-600 w-12 h-12 animate-scaleIn" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Thank You!</h2>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                        Your request has been registered. The Contractum Sustainability & Impact Report 2024 PDF download has started.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
                    >
                        <ArrowLeft size={18} />
                        Back to CSR Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Left Side - Visual Cover / Benefits */}
            <div className="hidden md:flex md:w-1/2 relative bg-emerald-950 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
                        alt="CSR Cover Background"
                        className="w-full h-full object-cover opacity-25 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900/90 to-slate-950"></div>
                </div>

                <div className="relative z-10 p-12 lg:p-20 flex flex-col justify-center text-white">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-12 transition-colors group self-start"
                    >
                        <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                        Back to Report
                    </button>

                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-emerald-500/30 self-start">
                        <Award size={16} className="text-emerald-400" />
                        <span className="text-emerald-300 font-bold uppercase tracking-widest text-[10px]">Sustainability Report</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                        Sustainability & <br />
                        <span className="text-emerald-400">Impact Report 2024</span>
                    </h1>

                    <p className="text-slate-300 text-base lg:text-lg max-w-lg mb-8 leading-relaxed">
                        Provide your details to download our complete ESG disclosure, featuring environmental audits, digital inclusivity indices, and 2030 sustainability roadmaps.
                    </p>

                    <div className="space-y-4">
                        {[
                            { icon: Leaf, text: "Carbon Neutrality Roadmap & DAC Initiatives" },
                            { icon: Users, text: "Community & Digital Education Metrics" },
                            { icon: Shield, text: "Corporate Governance & Ethics Compliance" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0">
                                    <item.icon size={16} />
                                </div>
                                <span className="font-semibold text-slate-200 text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-grow flex items-center justify-center p-6 sm:p-12 bg-white relative">
                <div className="max-w-md w-full">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Download CSR Report</h2>
                        <p className="text-slate-500 font-medium tracking-tight">
                            Please provide your details below to instantly access the PDF report.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 ml-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-emerald-500/50'} rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-medium text-sm`}
                                />
                            </div>
                            {errors.name && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 ml-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className={`block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-emerald-500/50'} rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-medium text-sm`}
                                />
                            </div>
                            {errors.email && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 ml-1">
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <div className="relative shrink-0">
                                    <select
                                        name="countryIndex"
                                        value={formData.countryIndex}
                                        onChange={handleChange}
                                        className="h-[48px] px-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-800 font-bold focus:outline-none focus:border-emerald-500/50 text-sm cursor-pointer appearance-none pr-8"
                                    >
                                        {COUNTRIES.map((c, i) => (
                                            <option key={i} value={i}>{c.code} ({c.iso})</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-500">
                                        ▼
                                    </div>
                                </div>

                                <div className="relative flex-grow group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        placeholder="10-digit number"
                                        className={`block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 ${errors.contact ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-emerald-500/50'} rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all font-medium text-sm`}
                                    />
                                </div>
                            </div>
                            {errors.contact && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.contact}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-black py-4 rounded-xl transition-all shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-3 active:scale-[0.98] transform"
                        >
                            <Download size={20} />
                            {loading ? "Registering Request..." : "Download Full PDF Report"}
                        </button>

                        <p className="text-center text-slate-400 text-[10px] font-semibold px-4 mt-4 leading-normal">
                            We respect your privacy. Your details are captured securely to compile report readership statistics.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CSRReportDownload;
