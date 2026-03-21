import React from 'react';
import { Mail, Phone, MessageCircle, Book, Clock, Headphones, Search, AlertCircle, CheckCircle } from 'lucide-react';

const Support = () => {
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
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">How Can We Help You?</h2>
          <p className="text-gray-600 text-center mb-10">Choose your preferred support channel</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 p-6 group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone size={26} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">Speak with our expert support team</p>
              <a href="tel:+919680534740" className="text-primary font-semibold text-sm hover:text-green-700 flex items-center gap-1">
                Call Now <span>→</span>
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 p-6 group">
              <div className="bg-gradient-to-br from-purple-500 to-primary w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail size={26} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">Detailed assistance via email</p>
              <a href="mailto:info@thecontractum.com" className="text-primary font-semibold text-sm hover:text-primary-dark flex items-center gap-1">
                Send Email <span>→</span>
              </a>
            </div>

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side - Submit Ticket Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit a Support Ticket</h2>
              <p className="text-gray-600">Our team will review your request and respond within 2-4 business hours</p>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Category <span className="text-primary">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white" required>
                  <option value="">Select a category</option>
                  <option>Technical Issue</option>
                  <option>Billing & Payment</option>
                  <option>Account Access</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority Level <span className="text-primary">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white" required>
                  <option value="">Select priority</option>
                  <option>Low - General question</option>
                  <option>Medium - Minor issue</option>
                  <option>High - Impacting work</option>
                  <option>Critical - System down</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-primary">*</span>
                </label>
                <textarea
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none"
                  placeholder="Please provide detailed information about your issue..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Max file size: 10MB. Supported formats: PDF, PNG, JPG</p>
              </div>

              <button className="w-full bg-primary hover:bg-primary text-white py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                Submit Ticket
              </button>
            </form>
          </div>

          {/* Right Side - Info Sections */}
          <div className="space-y-6">
            
            {/* Support Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-md p-6 text-white">
              <div className="flex items-center gap-3 mb-5">
                <Headphones size={26} className="text-white" />
                <div>
                  <h3 className="text-xl font-bold">Support Hours</h3>
                  <p className="text-xs text-gray-300">When we're available</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-700">
                  <p className="text-sm text-gray-300 mb-1">Monday - Friday</p>
                  <p className="text-2xl font-bold">9:00 AM - 6:00 PM</p>
                  <p className="text-xs text-gray-400 mt-1">Indian Standard Time</p>
                </div>
                <div className="pb-4 border-b border-gray-700">
                  <p className="text-sm text-gray-300 mb-1">Saturday</p>
                  <p className="text-2xl font-bold">10:00 AM - 4:00 PM</p>
                  <p className="text-xs text-gray-400 mt-1">Indian Standard Time</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-xs text-gray-200 leading-relaxed">
                    <CheckCircle size={14} className="inline mr-1" />
                    24/7 emergency support available for critical issues
                  </p>
                </div>
              </div>
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
