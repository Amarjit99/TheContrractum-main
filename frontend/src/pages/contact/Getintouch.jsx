import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, Globe, RotateCcw, ClipboardCheck } from 'lucide-react';
import locationIcon from "../../assets/location.png";
import phoneIcon from "../../assets/phone.png";
import emailIcon from "../../assets/email.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { COUNTRIES } from "../../constants/countries";

const Getintouch = () => {
  const [activeHero, setActiveHero] = useState(0);
  const heroImages = [
    "https://www.thecontractum.com/img/01.png",
    "https://www.thecontractum.com/img/02.png"
  ];

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryIndex: 0,
    country: "",
    postalCode: "",
    message: "",
    newsletter: false,
    privacyPolicy: false,
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      countryIndex: 0,
      country: "",
      postalCode: "",
      message: "",
      newsletter: false,
      privacyPolicy: false,
    });
    setStatus(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.privacyPolicy) {
      setStatus("error");
      setErrorMsg("You must accept the Privacy Policy to submit the form.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    const submissionData = {
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: `${COUNTRIES[form.countryIndex].code} ${form.phone}`.trim(),
      companyName: "",
      subject: "Drop Us a Line - Contact Form",
      message: form.message,
      country: form.country,
      preferredContactMethod: "Email",
      postalCode: form.postalCode,
      newsletter: form.newsletter,
      privacyPolicy: form.privacyPolicy,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          countryIndex: 0,
          country: "",
          postalCode: "",
          message: "",
          newsletter: false,
          privacyPolicy: false,
        });
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMsg("Could not reach the server. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Carousel */}
      <div className="relative h-[450px] lg:h-[600px] overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeHero === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          </div>
        ))}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl italic tracking-tight">
            Reach Out <span className="text-blue-500">To Us!</span>
          </h1>
          <div className="w-32 h-2 bg-blue-500 rounded-full mb-8 shadow-lg shadow-blue-500/50"></div>
          <p className="max-w-3xl text-xl lg:text-2xl text-gray-100 font-medium drop-shadow-lg leading-relaxed">
            At The Contractum, the first thing we will do is listen. We want to know more about your challenges and design solutions that will take your business to the next level.
          </p>
        </div>
        {/* Carousel Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHero(idx)}
              className={`w-4 h-4 rounded-full transition-all border-2 border-white ${activeHero === idx ? 'bg-blue-500 w-10' : 'bg-white/30'}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Main Contact Section */}
    <div className="max-w-[1700px] mx-auto px-8 lg:px-12 py-20">
       <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 items-start">

          {/* Send Message Form & World Map */}
          <div className="space-y-12">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16"></div>
              <h2 className="text-5xl font-black text-slate-900 mb-6 italic">Drop Us a Line</h2>
              <p className="text-slate-500 text-lg mb-8 font-medium">We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</p>

              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold"
                      placeholder="Your First Name"
                      required
                    />
                  </div>

                  
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold"
                      placeholder="Your Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
               <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">
    Email Address *
  </label>

  <input
    type="email"
    name="email"
    value={form.email}
    onChange={handleChange}
    className="w-full min-w-[320px] px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold"
    placeholder="your@email.com"
    required
  />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">Phone Number *</label>
                    <div className="flex gap-2">
                      <div className="relative group">
                        <select
                          name="countryIndex"
                          value={form.countryIndex}
                          onChange={handleChange}
                          title={COUNTRIES[form.countryIndex] ? COUNTRIES[form.countryIndex].name : ''}
                          className="w-32 px-3 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold appearance-none cursor-pointer"
                        >
                          {COUNTRIES.map((c, i) => (
                            <option key={i} value={i} title={c.name}>{c.code} ({c.iso})</option>
                          ))}
                        </select>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-md font-bold">
                          {COUNTRIES[form.countryIndex] ? `${COUNTRIES[form.countryIndex].flag} ${COUNTRIES[form.countryIndex].name}` : ''}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                        </div>
                      </div>

                  <input
  type="tel"
  name="phone"
  value={form.phone}
  onChange={handleChange}
  className="w-full min-w-[220px] px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold"
  placeholder="Enter Phone Number"
  required
/>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">Country *</label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map((c, i) => (
                        <option key={i} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold"
                      placeholder="Postal / ZIP Code"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-widest text-xs">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:outline-none transition-all font-bold resize-none"
                    placeholder="Tell us more..."
                    required
                  ></textarea>
                </div>

                {/* Newsletter & Privacy Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      id="newsletter"
                      type="checkbox"
                      name="newsletter"
                      checked={form.newsletter}
                      onChange={handleChange}
                      className="w-5 h-5 mt-1 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="newsletter" className="text-sm font-bold text-slate-600 cursor-pointer select-none">
                      Yes, subscribe to our newsletter for updates, insights, and newsletters.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="privacyPolicy"
                      type="checkbox"
                      name="privacyPolicy"
                      checked={form.privacyPolicy}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 mt-1 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="privacyPolicy" className="text-sm font-bold text-slate-600 cursor-pointer select-none">
                      I agree to the <Link to="/company/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link> and terms of use. *
                    </label>
                  </div>
                </div>

                {/* Status feedback */}
                {status === "success" && (
                  <p className="p-4 bg-green-100 text-green-700 rounded-xl font-bold">✅ Your form is submitted successfully.</p>
                )}
                {status === "error" && (
                  <p className="p-4 bg-red-100 text-red-700 rounded-xl font-bold">❌ {errorMsg}</p>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-xl group disabled:opacity-50"
                  >
                    <Send size={24} className={status === "loading" ? "animate-spin" : "group-hover:translate-x-2 transition-transform"} />
                    <span>{status === "loading" ? "Sending..." : "Submit Request"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 border-2 border-slate-900 text-slate-900 hover:bg-slate-50 font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-xl uppercase tracking-tighter"
                  >
                    <RotateCcw size={24} />
                    <span>Reset Form</span>
                  </button>
                </div>
              </form>
            </div>

            {/* World Map Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 italic">Global Presence</h3>
              </div>
              <div className="rounded-2xl overflow-hidden border-4 border-slate-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.4512345678901!2d75.83500000000001!3d25.180000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f850e8ae2985d%3A0x1234567890abcdef!2sRangbari%20Rd%2C%20Kota%2C%20Rajasthan%20324005!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Contractum Office - Rangbari Road, Kota"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Info & India Map */}
          <div className="space-y-12">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
              <h3 className="text-3xl font-black text-slate-900 mb-6 italic">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <img src={emailIcon} alt="Email" className="w-8 h-8 group-hover:invert transition-all" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email ID</p>
                    <a href="mailto:info@thecontractum.com" className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors">info@thecontractum.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <img src={phoneIcon} alt="Phone" className="w-8 h-8 group-hover:invert transition-all" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Call for help</p>
                    <a href="tel:+919680534740" className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors">+91 96805-34740</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <img src={locationIcon} alt="Location" className="w-8 h-8 group-hover:invert transition-all" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Head Office</p>
                    <p className="text-lg font-bold text-slate-800">Plot No 169, Ground Floor, Rangbari Road, Kota, Rajasthan 324005</p>
                  </div>
                </div>
              </div>
            </div>

            {/* India Map Section */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 italic">Our Service Region</h3>
              </div>
              <div className="rounded-2xl overflow-hidden border-4 border-slate-50 flex justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462434.09734697745!2d75.47023000000001!3d25.181399999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f8be3ce927997%3A0x21703948f5d7c5a7!2sKota%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kota, Rajasthan, India - Service Region"
                ></iframe>
              </div>
            </div>

            {/* Survey CTA Section */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                    <ClipboardCheck size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 italic">Take Survey</h3>
                    <p className="text-slate-500 font-medium">Share your feedback with us</p>
                  </div>
                </div>
                <Link
                  to="/contact/google-form"
                  className="w-full bg-purple-600 hover:bg-slate-900 text-white font-black py-5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-xl uppercase tracking-tighter group/btn"
                >
                  <Send size={24} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  <span>Start Survey Now</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Getintouch;