import React from "react";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";
const RequestQuote = () => {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Details</h2>
          <p className="text-gray-600 mb-8 text-sm">Please provide accurate information for a detailed quote</p>

          <form className="space-y-5 mt-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
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
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Service <span className="text-primary">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white" required>
                <option value="">Choose a service</option>
                <option>GIS Solutions</option>
                <option>IT Consulting</option>
                <option>E-commerce Development</option>
                <option>Telecom Services</option>
                <option>HR Solutions</option>
                <option>BPO Services</option>
                <option>Market Research</option>
                <option>Custom Development</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estimated Budget <span className="text-primary">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all bg-white" required>
                <option value="">Select budget range</option>
                <option>Under ₹1,00,000</option>
                <option>₹1,00,000 - ₹5,00,000</option>
                <option>₹5,00,000 - ₹10,00,000</option>
                <option>₹10,00,000 - ₹25,00,000</option>
                <option>Above ₹25,00,000</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description <span className="text-primary">*</span>
              </label>
              <textarea
                rows="5"
                placeholder="Please describe your project requirements, goals, and any specific features you need..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-gray-800 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-primary hover:bg-primary text-white py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
              Submit Quote Request
            </button>
          </form>
        </div>

        {/* Right Side - Info Section */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Why Choose Us?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Partner with us for innovative solutions and exceptional service
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Customized Solutions</h4>
                  <p className="text-sm text-gray-600">Tailored to meet your specific business needs</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transparent Pricing</h4>
                  <p className="text-sm text-gray-600">No hidden costs, clear and honest quotes</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dedicated Support</h4>
                  <p className="text-sm text-gray-600">Expert team available throughout the project</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="bg-orange-100 p-1.5 rounded-full mt-0.5">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
                  <p className="text-sm text-gray-600">Fast delivery with guaranteed quality standards</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-primary text-white shadow-xl rounded-2xl p-8">
            <h4 className="font-semibold mb-4 text-lg">Need Assistance?</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src={phone} alt="Phone" className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-400">Call us</p>
                  <a href="tel:+919680534740" className="text-white hover:text-gray-300 transition-colors">
                    +91 96805-34740
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <img src={email} alt="Email" className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-400">Email us</p>
                  <a href="mailto:info@thecontractum.com" className="text-white hover:text-gray-300 transition-colors">
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
