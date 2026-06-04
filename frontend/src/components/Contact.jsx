import React, { useState } from "react";
import location from "../assets/location.png";
import phone from "../assets/phone.png";
import email from "../assets/email.png";
import { COUNTRIES } from "../constants/countries";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryIndex: 0,
    subject: "",
    otherSubject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      countryIndex: 0,
      subject: "",
      otherSubject: "",
      message: "",
    });
    setStatus(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const submissionData = {
      name: form.name,
      email: form.email,
      phone: `${COUNTRIES[form.countryIndex].code} ${form.phone}`,
      subject: form.subject === "Others" ? form.otherSubject : form.subject,
      message: form.message,
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
          name: "",
          email: "",
          phone: "",
          countryIndex: 0,
          subject: "",
          otherSubject: "",
          message: "",
        });
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Could not reach the server. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SECTION */}
      <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6 sm:p-12 flex flex-col justify-center relative overflow-hidden">

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary-dark to-primary text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let's Start a <br /> Conversation
            </h1>
            <p className="text-gray-400 text-sm">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full p-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:border-white/30 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400 font-medium"
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full p-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:border-white/30 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400 font-medium"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative group">
                <select
                  name="countryIndex"
                  value={form.countryIndex}
                  onChange={handleChange}
                  title={COUNTRIES[form.countryIndex] ? COUNTRIES[form.countryIndex].name : ''}
                  className="w-28 p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 cursor-pointer font-medium"
                >
                  {COUNTRIES.map((c, i) => (
                    <option key={i} value={i} className="bg-gray-900" title={c.name}>{c.code} ({c.iso})</option>
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
                placeholder="Mobile Number"
                className="flex-1 p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400 min-w-0 font-medium"
              />
            </div>

            <div className="relative group">
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className={`w-full p-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/30 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 appearance-none cursor-pointer font-medium ${form.subject ? 'text-white' : 'text-gray-400'}`}
              >
                <option value="" className="bg-gray-900 text-gray-400">Select Inquiry Category</option>
                <option value="Internship" className="bg-gray-900 text-white">Internship</option>
                <option value="Mentorship" className="bg-gray-900 text-white">Mentorship</option>
                <option value="Counseling" className="bg-gray-900 text-white">Counseling</option>
                <option value="Job" className="bg-gray-900 text-white">Job</option>
                <option value="Others" className="bg-gray-900 text-white">Others</option>
              </select>
            </div>

            {form.subject === "Others" && (
              <div className="relative group animate-fadeIn">
                <input
                  type="text"
                  name="otherSubject"
                  value={form.otherSubject}
                  onChange={handleChange}
                  placeholder="Specify Inquiry Category"
                  required
                  className="w-full p-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:border-white/30 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400 font-medium"
                />
              </div>
            )}

            <div className="relative group">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                required
                className="w-full p-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:border-white/30 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400 resize-none font-medium"
              ></textarea>
            </div>

            {/* Status feedback */}
            {status === "success" && (
              <p className="text-green-400 text-sm font-medium">✅ Your form is submitted successfully.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm font-medium">❌ {errorMsg}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 px-6 sm:px-8 py-4 border-2 border-white/30 font-bold hover:bg-white/10 rounded-xl transition-all duration-300 text-center"
              >
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </button>

              <button
                type="reset"
                onClick={handleReset}
                className="flex-1 px-6 sm:px-8 py-4 border-2 border-white/30 font-bold hover:bg-white/10 rounded-xl transition-all duration-300 text-center"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100 rounded-full -ml-24 -mb-24 opacity-30"></div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-red-100 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              Contact Information
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900">We're Here to Help</h2>
            <p className="text-gray-600">
              Reach out to us through any of these channels. We're available to assist you.
            </p>
          </div>

          <div className="space-y-6">

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-500 to-primary-light p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <img src={email} alt="Email" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Email Address</h4>
                  <a href="mailto:info@thecontractum.com" className="text-gray-600 hover:text-primary transition-colors font-medium flex items-center gap-2 group">
                    info@thecontractum.com
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-primary to-primary p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <img src={phone} alt="Phone" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Phone Number</h4>
                  <a href="tel:+919680534740" className="text-gray-600 hover:text-primary transition-colors font-medium flex items-center gap-2 group">
                    +91 96805-34740
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-primary-light p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <img src={location} alt="Location" className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Office Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Plot No 169 Ground Floor, Rangbari Road<br />
                    Kota, Rajasthan 324005
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;