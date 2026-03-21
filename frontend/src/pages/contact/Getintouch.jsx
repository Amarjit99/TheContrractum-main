import React from 'react';
import { Send } from 'lucide-react';
import location from "../../assets/location.png";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";

const Getintouch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Reach Out To Us!</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">At The Contractum, the first thing we will do is listen. We want to know more about your challenges and design solutions that will take your HR tech to the next level.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you shortly.</p>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none"
                  placeholder="Tell us more about your requirements..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary text-white font-semibold py-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Submit Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600 mb-8">Feel free to reach out through any of the following channels</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="bg-primary p-3 rounded-lg">
                    <img src={email} alt="Email" className="w-5.5 h-5.5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm uppercase tracking-wide">Email Address</h3>
                    <a href="mailto:info@thecontractum.com" className="text-gray-700 hover:text-primary transition-colors text-lg">
                      info@thecontractum.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="bg-primary p-3 rounded-lg">
                    <img src={phone} alt="Phone" className="w-5.5 h-5.5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm uppercase tracking-wide">Phone Number</h3>
                    <a href="tel:+919680534740" className="text-gray-700 hover:text-primary transition-colors text-lg">
                      +91 96805-34740
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
                  <div className="bg-primary p-3 rounded-lg">
                    <img src={location} alt="Location" className="w-5.5 h-5.5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm uppercase tracking-wide">Office Address</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Plot No 169, Ground Floor<br />
                      Rangbari Road<br />
                      Kota, Rajasthan 324005
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Getintouch;
