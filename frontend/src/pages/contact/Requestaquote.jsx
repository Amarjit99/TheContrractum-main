import React, { useState } from "react";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { COUNTRIES } from "../../constants/countries";
import { toast } from 'react-hot-toast';

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryIndex: 0,
    company: "",
    serviceRequired: "",
    budgetEstimate: "",
    projectScope: "",
    timeline: "",
  });

  const [status, setStatus] = useState({ loading: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      countryIndex: 0,
      company: "",
      serviceRequired: "",
      budgetEstimate: "",
      projectScope: "",
      timeline: "",
    });
    setStatus({ loading: false, error: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: `${COUNTRIES[formData.countryIndex].code} ${formData.phone}`,
      company: formData.company,
      serviceRequired: formData.serviceRequired,
      budgetEstimate: formData.budgetEstimate,
      projectScope: formData.projectScope,
      timeline: formData.timeline,
    };

    try {
      const res = await fetch(`${API}/api/quote-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      toast.success("Quote request submitted successfully!");
      handleReset();
    } catch (err) {
      setStatus({ loading: false, error: err.message });
      toast.error("Error submitting request: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          Request a Quote
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us about your project and we’ll provide you with a customized quote.
          Our team will get back to you within 24 hours.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Left Side - Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote Form</h2>
          <p className="text-gray-600 mb-8 text-sm">Please provide accurate information for a detailed quote</p>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@company.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  name="countryIndex"
                  value={formData.countryIndex}
                  onChange={handleChange}
                  className="w-32 border border-gray-300 rounded-lg px-2 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white font-bold appearance-none cursor-pointer"
                >
                  {COUNTRIES.map((c, i) => (
                    <option key={i} value={i}>{c.code} ({c.iso})</option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="XXXXX XXXXX"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all min-w-0"
                  required
                />
              </div>
            </div>

            {/* Service Required */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Required <span className="text-primary">*</span>
              </label>
              <select
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white cursor-pointer"
                required
              >
                <option value="">Choose a service</option>
                <option value="CS & IT Services">CS & IT Services</option>
                <option value="GIS Solutions">GIS Solutions</option>
                <option value="MRAS Services">MRAS Services</option>
                <option value="E-Commerce Platforms">E-Commerce Platforms</option>
                <option value="HR Tech Solutions">HR Tech Solutions</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="BPO Services">BPO Services</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Network Infrastructure">Network Infrastructure</option>
                <option value="Cloud Integration">Cloud Integration</option>
                <option value="Custom Development">Custom Development</option>
              </select>
            </div>

            {/* Budget Estimate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget Estimate <span className="text-primary">*</span>
              </label>
              <select
                name="budgetEstimate"
                value={formData.budgetEstimate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white cursor-pointer"
                required
              >
                <option value="">Select budget range</option>
                <option value="Under ₹1,00,000">Under ₹1,00,000</option>
                <option value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</option>
                <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                <option value="₹10,00,000 - ₹25,00,000">₹10,00,000 - ₹25,00,000</option>
                <option value="Above ₹25,00,000">Above ₹25,00,000</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Timeline <span className="text-primary">*</span>
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white cursor-pointer"
                required
              >
                <option value="">Select project timeline</option>
                <option value="Immediate (Within 1 month)">Immediate (Within 1 month)</option>
                <option value="1 to 3 Months">1 to 3 Months</option>
                <option value="3 to 6 Months">3 to 6 Months</option>
                <option value="6+ Months">6+ Months</option>
                <option value="Flexible / Ongoing">Flexible / Ongoing</option>
              </select>
            </div>

            {/* Project Scope */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Scope <span className="text-primary">*</span>
              </label>
              <textarea
                name="projectScope"
                value={formData.projectScope}
                onChange={handleChange}
                rows="5"
                placeholder="Please describe your project requirements, goals, and any specific features you need..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none"
                required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={status.loading}
                className="flex-[2] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50"
              >
                {status.loading ? "Submitting..." : "Submit Quote Request"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-all duration-300 border border-gray-200"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Info Section */}
        <div className="flex flex-col justify-start space-y-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Why Choose Us?
            </h3>
            <p className="text-gray-400 text-sm mb-8 font-medium uppercase tracking-widest">
              Innovative Solutions & Exceptional Service
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Customized Solutions</h4>
                  <p className="text-sm text-gray-500">Tailored to meet your specific business requirements.</p>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Transparent Pricing</h4>
                  <p className="text-sm text-gray-500">No hidden costs, clear and honest quotation model.</p>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="bg-blue-50 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Dedicated Support</h4>
                  <p className="text-sm text-gray-500">Expert team available throughout the project lifecycle.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white shadow-2xl rounded-2xl p-10 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="font-black mb-6 text-2xl italic tracking-tight">Need Assistance?</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <img src={phone} alt="Phone" className="w-5 h-5 invert" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Call us directly</p>
                  <a href="tel:+919680534740" className="text-white font-bold hover:text-blue-400 transition-colors text-lg">
                    +91 96805-34740
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <img src={email} alt="Email" className="w-5 h-5 invert" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Email our team</p>
                  <a href="mailto:info@thecontractum.com" className="text-white font-bold hover:text-blue-400 transition-colors text-lg">
                    info@thecontractum.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
