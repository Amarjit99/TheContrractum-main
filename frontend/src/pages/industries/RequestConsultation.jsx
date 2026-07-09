import React, { useState } from "react";
import { CheckCircle, Calendar, Users, Zap, Shield, Globe, Award, Sparkles } from "lucide-react";
import { COUNTRIES } from "../../constants/countries";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const INDUSTRIES_LIST = [
    "IT & Telecom",
    "E-Commerce",
    "Office Automation",
    "Infrastructure & Construction",
    "FMCG",
    "Retail & Consumer Goods",
    "FMCD",
    "Logistics & Supply Chain",
    "BFSI",
    "Media & Entertainment",
    "Pharma & Healthcare",
    "Electronics",
    "Electricals",
    "GIS & Geospatial Services",
    "Government & Public Sector",
    "Education & Training",
    "Manufacturing",
    "Other"
];

const SERVICES_LIST = [
    "Human Resource Solutions",
    "Staffing & Recruitment",
    "Contract Staffing",
    "Workforce Management",
    "GIS Services",
    "Market Research & Surveys",
    "Data Collection & Verification",
    "E-Commerce Services",
    "Merchant Onboarding",
    "Telecommunication Services",
    "Business Process Outsourcing (BPO)",
    "Corporate Training & Skill Development",
    "Facility Management Services (FMS)",
    "Security Services",
    "IT & Software Solutions",
    "Other"
];

const INQUIRY_TYPES = [
    "New Project Requirement",
    "Service Inquiry",
    "Partnership Proposal",
    "Vendor Registration Inquiry",
    "Request for Proposal (RFP)",
    "General Business Query",
    "Customer Support Escalation",
    "Other"
];

const COMPANY_SIZES = [
    "Startup (1-10 Employees)",
    "Small Business (11-50 Employees)",
    "Mid-sized Enterprise (51-200 Employees)",
    "Large Enterprise (201-500 Employees)",
    "Corporate / MNC (501+ Employees)"
];

const CONTACT_METHODS = [
    "Phone Call",
    "Email",
    "WhatsApp Message",
    "Video Consultation (Google Meet / Zoom)",
    "In-person Meeting",
    "Any (Representative's Choice)"
];

const TIMELINES = [
    "Immediate (Within 1-2 Weeks)",
    "Short-term (Within 30 Days)",
    "Medium-term (1-3 Months)",
    "Planning Phase (3+ Months)",
    "Tentative / Exploratory Only"
];

export default function RequestConsultation() {
    const initialFormState = {
        name: "",
        email: "",
        phoneNumber: "",
        countryIndex: 0,
        company: "",
        country: "",
        industry: "",
        serviceRequired: "",
        inquiryType: "",
        companySize: "",
        preferredContactMethod: "",
        projectTimeline: "",
        message: ""
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setStatus(null);
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        // Email validation: must contain @ and end with a valid domain name
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus("error");
            setErrorMsg("Please enter a valid email address ending with a proper domain (e.g. name@company.com).");
            return;
        }

        // Phone validation: must contain at least 10 digits
        const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
            setStatus("error");
            setErrorMsg("Please enter a valid mobile number containing at least 10 digits.");
            return;
        }

        const selectedCountry = COUNTRIES[formData.countryIndex];
        const fullPhoneNumber = `${selectedCountry.code} ${formData.phoneNumber}`;

        const submissionData = {
            name: formData.name,
            email: formData.email,
            phone: fullPhoneNumber,
            company: formData.company,
            country: formData.country || selectedCountry.name,
            industry: formData.industry,
            serviceRequired: formData.serviceRequired,
            inquiryType: formData.inquiryType,
            companySize: formData.companySize,
            preferredContactMethod: formData.preferredContactMethod,
            projectTimeline: formData.projectTimeline,
            message: formData.message
        };

        try {
            const res = await fetch(`${API_URL}/api/expert-consultations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setIsSubmitted(true);
            } else {
                setStatus("error");
                setErrorMsg(data.message || data.error || "Failed to submit consultation request.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setStatus("error");
            setErrorMsg("Could not reach the server. Please try again later.");
        }
    };

    const benefits = [
        { icon: Sparkles, title: "Strategic Planning", desc: "Align resources to key performance indicators and growth initiatives." },
        { icon: Award, title: "Precision Analysis", desc: "Detailed evaluation of operational gaps and technical dependencies." },
        { icon: Shield, title: "Data Integrity", desc: "Ensure compliance, data privacy, and secure data pipelines." }
    ];

    const trustBadges = [
        { icon: Shield, title: "Enterprise Grade Privacy" },
        { icon: Globe, title: "Used in 75+ Countries" }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left Column: Context & Benefits */}
                    <div className="lg:col-span-1">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-widest mb-6">
                            Expert Advisory
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Business Consultation</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                            Tell us about your business requirements and our experts will connect with you within 24 business hours.
                        </p>

                        <div className="space-y-8 mb-12">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-100">
                                        <benefit.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm font-medium">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-6 pt-8 border-t border-slate-200">
                            {trustBadges.map((badge, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                    <badge.icon className="w-5 h-5 text-emerald-500" />
                                    {badge.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                        {/* Decorative Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                        {isSubmitted ? (
                            <div className="text-center py-16 relative z-10">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted Successfully!</h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                    Thank you for sharing your requirements. Our specialists are reviewing details and will connect with you within 24 business hours.
                                </p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md">
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Consultation Intake Form</h3>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Full Name *</label>
                                        <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800" placeholder="Enter your full name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Business Email *</label>
                                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800" placeholder="name@company.com" />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Mobile Number *</label>
                                        <div className="flex gap-2">
                                            <div className="relative group">
                                                <select
                                                    name="countryIndex"
                                                    value={formData.countryIndex}
                                                    onChange={handleChange}
                                                    title={COUNTRIES[formData.countryIndex] ? COUNTRIES[formData.countryIndex].name : ''}
                                                    className="w-24 px-2 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white text-slate-700 font-semibold cursor-pointer"
                                                >
                                                    {COUNTRIES.map((c, i) => (
                                                        <option key={i} value={i} title={c.name}>{c.code} ({c.iso})</option>
                                                    ))}
                                                </select>
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md font-bold">
                                                    {COUNTRIES[formData.countryIndex] ? `${COUNTRIES[formData.countryIndex].flag} ${COUNTRIES[formData.countryIndex].name}` : ''}
                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                                </div>
                                            </div>
                                            <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white placeholder-slate-400 font-semibold text-slate-800" placeholder="XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Company / Organization *</label>
                                        <input required name="company" value={formData.company} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800" placeholder="Enter company name" />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Country *</label>
                                        <select required name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                            <option value="">Select Country</option>
                                            {COUNTRIES.map((c, i) => (
                                                <option key={i} value={c.name}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Industry *</label>
                                        <select required name="industry" value={formData.industry} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                            <option value="">Select Industry</option>
                                            {INDUSTRIES_LIST.map((ind, i) => (
                                                <option key={i} value={ind}>{ind}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Service Required *</label>
                                        <select required name="serviceRequired" value={formData.serviceRequired} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                            <option value="">Select Service</option>
                                            {SERVICES_LIST.map((srv, i) => (
                                                <option key={i} value={srv}>{srv}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Inquiry Type *</label>
                                        <select required name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                            <option value="">Select Inquiry Type</option>
                                            {INQUIRY_TYPES.map((inq, i) => (
                                                <option key={i} value={inq}>{inq}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Company Size</label>
                                        <select name="companySize" value={formData.companySize} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                            <option value="">Select Company Size</option>
                                            {COMPANY_SIZES.map((sz, i) => (
                                                <option key={i} value={sz}>{sz}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Preferred Contact Method *</label>
                                        <select required name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                            <option value="">Select Contact Method</option>
                                            {CONTACT_METHODS.map((meth, i) => (
                                                <option key={i} value={meth}>{meth}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Project Timeline</label>
                                    <select name="projectTimeline" value={formData.projectTimeline} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800">
                                        <option value="">Select Timeline</option>
                                        {TIMELINES.map((time, i) => (
                                            <option key={i} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Message / Business Requirements *</label>
                                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white font-semibold text-slate-800" placeholder="Please describe your business requirements and objective..."></textarea>
                                </div>

                                {status === "error" && (
                                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold leading-relaxed">{errorMsg}</div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={handleReset} className="flex-1 py-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all">
                                        Reset Form
                                    </button>
                                    <button type="submit" disabled={status === "loading"} className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                                        {status === "loading" && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span>}
                                        <span>Request Consultation</span>
                                    </button>
                                </div>

                                <div className="pt-6 border-t border-slate-100 text-center">
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        * By clicking "Request Consultation", you agree to our <a href="/privacy-policy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a> and authorize us to contact you with relevant information about our services. We value your privacy and do not sell details to third parties.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
