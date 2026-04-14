import React, { useState } from "react";
import { CheckCircle, Calendar, Users, Zap, Shield, Globe } from "lucide-react";

export default function RequestDemo() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        jobTitle: "",
        employeeCount: "1-50",
        interestArea: "digital-transformation",
        message: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would normally send the data to a backend
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
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
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Context & Benefits */}
                    <div>
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
                    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
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
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Tell us about yourself</h3>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">First Name *</label>
                                        <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Last Name *</label>
                                        <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Work Email *</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@company.com" />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Company Name *</label>
                                        <input required name="company" value={formData.company} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Acme Inc." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Job Title</label>
                                        <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="Director of IT" />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Company Size</label>
                                        <select name="employeeCount" value={formData.employeeCount} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white">
                                            <option value="1-50">1 - 50 employees</option>
                                            <option value="51-200">51 - 200 employees</option>
                                            <option value="201-1000">201 - 1,000 employees</option>
                                            <option value="1001+">1,001+ employees</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Primary Interest</label>
                                        <select name="interestArea" value={formData.interestArea} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white">
                                            <option value="digital-transformation">Digital Transformation</option>
                                            <option value="cloud-computing">Cloud Infrastructure</option>
                                            <option value="ai-ml">AI & Machine Learning</option>
                                            <option value="cybersecurity">Cybersecurity</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">How can we help? (Optional)</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none" placeholder="Tell us about your specific use case or challenges..."></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    Schedule My Demo
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
