import React, { useState } from "react";
import { CheckCircle, Map, Target, Zap, Shield, Globe } from "lucide-react";

export default function RequestConsultation() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interestArea: "gis-mapping",
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
        console.log("Consultation form submitted:", formData);
        setIsSubmitted(true);
    };

    const benefits = [
        { icon: Map, title: "Strategic Spatial Planning", desc: "Expert guidance on leveraging GIS for your business objectives." },
        { icon: Target, title: "Precision Analysis", desc: "Identify location-based opportunities with high-fidelity spatial data." },
        { icon: Zap, title: "Optimized Workflows", desc: "Streamline operations through automated geographic insights." }
    ];

    const trustBadges = [
        { icon: Shield, title: "Data Integrity & Security" },
        { icon: Globe, title: "Global GIS Standards" }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left Column: Context & Benefits */}
                    <div>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-widest mb-6">
                            Expert Guidance
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                            Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Consultation</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
                            Connect with our GIS specialists to unlock the full potential of location intelligence for your organization.
                        </p>

                        <div className="space-y-8 mb-12">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-6 h-6 text-emerald-600" />
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
                    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-emerald-200/50 border border-emerald-50 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                        
                        {isSubmitted ? (
                            <div className="text-center py-16 relative z-10">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Consultation Requested!</h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Thank you for reaching out. A GIS specialist will review your information and get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b pb-4">Consultation Details</h3>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Full Name *</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John Doe" />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Work Email *</label>
                                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Primary Interest Area</label>
                                    <select name="interestArea" value={formData.interestArea} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white">
                                        <option value="gis-mapping">GIS Mapping & Visualization</option>
                                        <option value="spatial-analytics">Spatial Data Analytics</option>
                                        <option value="remote-sensing">Remote Sensing & Imagery</option>
                                        <option value="asset-management">Infrastructure/Asset Management</option>
                                        <option value="other">Other Solutions</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">How can we help? (Optional)</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none" placeholder="Tell us about your requirements or share your opinion..."></textarea>
                                </div>

                                <button type="submit" className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    Book My Consultation
                                </button>
                                
                                <p className="text-xs text-center text-slate-500 mt-4">
                                    By submitting this form, you agree to our Privacy Policy regarding the handling of your professional information.
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
