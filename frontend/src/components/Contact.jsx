import React, { useState } from "react";
import location from "../assets/location.png";
import phone from "../assets/phone.png";
import email from "../assets/email.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Registration = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", otherSubject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const submissionData = {
      ...form,
      subject: form.subject === "Others" ? form.otherSubject : form.subject,
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
        setForm({ name: "", email: "", subject: "", otherSubject: "", message: "" });
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
                placeholder="Your Name"
                required
                className="w-full p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400"
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400"
              />
            </div>

            <div className="relative group">
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-gray-900">Select Subject</option>
                <option value="Internship" className="bg-gray-900">Internship</option>
                <option value="Mentorship" className="bg-gray-900">Mentorship</option>
                <option value="Counseling" className="bg-gray-900">Counseling</option>
                <option value="Job" className="bg-gray-900">Job</option>
                <option value="Others" className="bg-gray-900">Others</option>
              </select>
            </div>

            {form.subject === "Others" && (
              <div className="relative group animate-fadeIn">
                <input
                  type="text"
                  name="otherSubject"
                  value={form.otherSubject}
                  onChange={handleChange}
                  placeholder="Specify Subject"
                  required
                  className="w-full p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="relative group">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                required
                className="w-full p-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300 placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>

            {/* Status feedback */}
            {status === "success" && (
              <p className="text-green-400 text-sm font-medium">✅ Message sent successfully! We'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm font-medium">❌ {errorMsg}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-red-700 hover:to-pink-700 px-6 sm:px-8 py-4 font-bold tracking-wide rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed text-center"
              >
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </button>

              <button
                type="reset"
                onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setStatus(null); }}
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