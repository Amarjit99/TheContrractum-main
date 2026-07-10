import React, { useState } from "react";
import { CheckCircle, Calendar, Users, Zap, Shield, Globe } from "lucide-react";
import { COUNTRIES } from "../../constants/countries";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RequestDemo() {
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        countryIndex: 0,
        productInterested: "",
        preferredDate: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        // Email validation: must contain @ and end with a valid domain name
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus("error");
            setErrorMsg("Please enter a valid email address ending with a proper domain (e.g. name@email.com).");
            return;
        }

        // Phone validation: must contain at least 10 digits
        const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
            setStatus("error");
            setErrorMsg("Please enter a valid phone number containing at least 10 digits.");
            return;
        }

        const selectedCountry = COUNTRIES[formData.countryIndex];
        const fullPhoneNumber = `${selectedCountry.code} ${formData.phoneNumber}`;

        const submissionData = {
            name: formData.name,
            companyName: formData.companyName,
            email: formData.email,
            phoneNumber: fullPhoneNumber,
            productInterested: formData.productInterested,
            preferredDate: formData.preferredDate
        };

        try {
            const res = await fetch(`${API_URL}/api/demo-requests`, {
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
                setErrorMsg(data.message || "Failed to submit demo request.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setStatus("error");
            setErrorMsg("Could not reach the server. Please try again later.");
        }
    };

    const benefits = [
        { icon: Calendar, title: "Personalized Walkthrough", desc: "See exactly how our platform fits your unique business needs." },
        { icon: Users, title: "Expert Consultation", desc: "Speak directly with our solution architects, not just sales reps." },
        { icon: Zap, title: "Immediate Value", desc: "Discover quick wins and long-term scaling strategies." }
    ];

    const trustBadges = [
        { icon: Shield, title: "Enterprise Grade Security" },
        { icon: Globe, title: "Used in 75+ Countries" }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Left Column: Context & Benefits */}
                    <div className="lg:col-span-1">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-widest mb-6">
                            See It In Action
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Live Demo</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
                            Discover how TheContractum can transform your business operations, streamline workflows, and drive unprecedented growth.
                        </p>

                        <div className="space-y-8 mb-12">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                        <p className="text-slate-600">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-6 pt-8 border-t border-slate-200">
                            {trustBadges.map((badge, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-600 font-semibold">
                                    <badge.icon className="w-5 h-5 text-emerald-500" />
                                    {badge.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                        {isSubmitted ? (
                            <div className="text-center py-16 relative z-10">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Thank you for your interest. One of our solution experts will contact you within 24 hours to schedule your personalized demo.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Request Demo Registration Form</h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Name *</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John Doe" />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Company Name *</label>
                                        <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Acme Inc." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Work Email *</label>
                                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@company.com" />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Phone Number *</label>
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
                                            <input required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white placeholder-slate-400" placeholder="XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Preferred Demo Date *</label>
                                        <input required name="preferredDate" value={formData.preferredDate} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Product/Service Interested *</label>
                                    <select required name="productInterested" value={formData.productInterested} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white">
                                        <option value="">Select a Product/Service</option>
                                        <option value="digital-transformation">Digital Transformation</option>
                                        <option value="cloud-computing">Cloud Infrastructure</option>
                                        <option value="ai-ml">AI & Machine Learning</option>
                                        <option value="cybersecurity">Cybersecurity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {status === "error" && (
                                    <p className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-semibold">{errorMsg}</p>
                                )}

                                <button type="submit" disabled={status === "loading"} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                                    {status === "loading" && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block"></span>}
                                    <span>Schedule My Demo</span>
                                </button>

                                <p className="text-xs text-center text-slate-500 mt-4">
                                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
