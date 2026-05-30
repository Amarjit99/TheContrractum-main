import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Book, Clock, Headphones, Search, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { COUNTRIES } from "../../constants/countries";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Support = () => {
  const [formData, setFormData] = useState({
    ticketSubject: '',
    name: '',
    email: '',
    phoneNumber: '',
    countryIndex: 0,
    category: '',
    priority: '',
    attachment: '',
    description: ''
  });

  const [status, setStatus] = useState({ loading: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          attachment: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      ticketSubject: '',
      name: '',
      email: '',
      phoneNumber: '',
      countryIndex: 0,
      category: '',
      priority: '',
      attachment: '',
      description: ''
    });
    setStatus({ loading: false, error: null });
    const fileInput = document.getElementById('attachment-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    const selectedCountry = COUNTRIES[formData.countryIndex];
    const fullPhoneNumber = `${selectedCountry.code} ${formData.phoneNumber}`;

    const submissionData = {
      ticketSubject: formData.ticketSubject,
      name: formData.name,
      email: formData.email,
      phoneNumber: fullPhoneNumber,
      category: formData.category,
      priority: formData.priority,
      attachment: formData.attachment,
      description: formData.description
    };

    try {
      const res = await fetch(`${API}/api/support-tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!res.ok) throw new Error('Failed to submit ticket');

      toast.success('Support ticket submitted successfully!');
      handleReset();
    } catch (err) {
      setStatus({ loading: false, error: err.message });
      toast.error('Error submitting ticket: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Support & Help Desk</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our dedicated support team is here to assist you. Get quick answers, expert guidance, and solutions to keep your business running smoothly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Quick Support Options */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 italic">How Can We Help You?</h2>
            <p className="text-gray-500 font-light text-lg">Choose your preferred support channel for immediate assistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <div className="bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 p-10 group border border-slate-100 hover:border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 italic">Phone Support</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed font-light">Speak directly with our technical experts for real-time troubleshooting.</p>
              <a href="tel:+919680534740" className="inline-flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all group/link">
                Call Now <span className="text-xl">→</span>
              </a>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 p-10 group border border-slate-100 hover:border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:-rotate-12 transition-transform">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 italic">Email Support</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed font-light">Send us a detailed request and we'll get back to you with a solution.</p>
              <a href="mailto:info@thecontractum.com" className="inline-flex items-center gap-2 text-slate-800 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all group/link">
                Send Email <span className="text-xl">→</span>
              </a>
            </div>

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Side - Submit Ticket Form */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl border border-slate-50 p-10 lg:p-12 relative overflow-hidden">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-gray-900 mb-2 italic">Support Ticket Form</h2>
              <p className="text-slate-500 font-light text-lg">Our team typically responds within 2-4 business hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                  Ticket Subject
                </label>
                <input
                  type="text"
                  name="ticketSubject"
                  value={formData.ticketSubject}
                  onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                  placeholder="e.g., Unable to login to my account"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryIndex"
                      value={formData.countryIndex}
                      onChange={handleChange}
                      className="w-28 px-2 py-4 border border-slate-200 bg-slate-50/50 rounded-xl focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all font-semibold cursor-pointer"
                    >
                      {COUNTRIES.map((c, i) => (
                        <option key={i} value={i}>{c.code} ({c.iso})</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="flex-1 min-w-0 border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all placeholder-slate-400"
                      placeholder="XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Issue Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Billing & Payment">Billing & Payment</option>
                    <option value="Account Access">Account Access</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select priority</option>
                    <option value="Low - General question">Low - General question</option>
                    <option value="Medium - Minor issue">Medium - Minor issue</option>
                    <option value="High - Impacting work">High - Impacting work</option>
                    <option value="Critical - System down">Critical - System down</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Attachment Upload
                  </label>
                  <input
                    id="attachment-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-3 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-5 py-4 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all resize-none"
                  placeholder="Provide details about your inquiry..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="md:col-span-2 bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 group/btn disabled:opacity-50"
                >
                  {status.loading ? "Submitting..." : "Submit Support Ticket"}
                  <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw size={16} /> Reset
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Info Sections */}
          <div className="space-y-8">

            {/* Support Hours */}
            <div className="bg-slate-900 rounded-[2rem] shadow-2xl p-8 lg:p-10 text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight">Support Hours</h3>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Global Availability</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/card">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Weekdays</p>
                  <p className="text-2xl font-black italic group-hover:text-blue-400 transition-colors">9:00 AM - 6:00 PM</p>
                  <p className="text-[10px] text-slate-500 mt-1 italic">Monday to Friday (IST)</p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/card">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Saturdays</p>
                  <p className="text-2xl font-black italic group-hover:text-blue-400 transition-colors">10:00 AM - 4:00 PM</p>
                  <p className="text-[10px] text-slate-500 mt-1 italic">Extended Support (IST)</p>
                </div>

                <div className="p-4 bg-blue-600/20 rounded-xl border border-blue-600/30 flex items-center gap-3">
                  <AlertCircle size={18} className="text-blue-400 shrink-0" />
                  <p className="text-[10px] text-blue-100 font-bold leading-relaxed uppercase tracking-widest">
                    24/7 Priority support for Enterprise Users
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] shadow-2xl p-10 text-white">
              <h4 className="text-2xl font-black mb-4 italic tracking-tight">Urgent Issue?</h4>
              <p className="text-blue-100 text-sm font-light leading-relaxed mb-6">If your system is down or you're facing a critical security issue, please call our emergency hotline immediately.</p>
              <a href="tel:+919680534740" className="block text-center bg-white text-blue-600 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-colors shadow-lg">
                Emergency Line
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to help you get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">How do I reset my password?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Click on "Forgot Password" on the login page. You'll receive an email with instructions to create a new password securely.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">We accept all major credit/debit cards, UPI, net banking, and NEFT/RTGS bank transfers for your convenience.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">How can I upgrade my plan?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Navigate to your account settings, select "Plans & Billing", and choose the upgrade option that best suits your needs.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Do you offer technical training?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Yes, we provide comprehensive training sessions and documentation for all our services. Contact us to schedule a session.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
