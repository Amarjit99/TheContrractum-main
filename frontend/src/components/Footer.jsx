import React from "react";
import {
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  Send,
  MapPin,
  ArrowRight,
} from "lucide-react";
import VisitorCounter from "./VisitorCounter";

const Footer = () => {
  return (
    <footer className="relative">

      {/* ================= Newsletter Section ================= */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-pink-600 text-white relative overflow-hidden">

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        {/* Curved Shape */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-gray-900 to-black rounded-t-[100%]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Stay Connected with <span className="text-blue-400">The</span> <span className="text-red-500">Contractum</span>
            </h2>
            <p className="text-red-100 text-sm">Get the latest insights, updates, and exclusive offers delivered to your inbox</p>
          </div>

          <div className="flex w-full md:w-auto shadow-2xl">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 w-full md:w-96 text-gray-900 placeholder:text-white rounded-l-xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all font-medium"
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 rounded-r-xl flex items-center justify-center hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg group">
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* ================= Main Footer ================= */}
      <div className="bg-gray-800 text-white pt-20 pb-6 px-6 relative overflow-hidden">

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

          {/* Column 1 - Company Info */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-blue-400">The</span> <span className="text-red-500">Contractum</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Passionately focused on delivering innovative solutions and fostering lasting relationships for over a decade.
            </p>

            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              Follow Us
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent"></div>
            </h4>

            <div className="flex gap-3 mb-6">
              <a href="#" className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10">
                <Youtube size={20} />
              </a>
            </div>

            <button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 group transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-red-500/50">
              Request Demo
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Column 2 - Solutions */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Solutions
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                GIS Solutions
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                IT Consulting
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                E-commerce
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Telecom Services
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                HR Solutions
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                BPO Services
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Market Research
              </li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Company
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                About Us
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Our Team
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Careers
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Contact Us
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Projects
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Resources
              </li>
              <li className="hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all"></span>
                Support
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Get in Touch
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent"></div>
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group cursor-pointer">
                <Mail size={20} className="text-red-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-300 mb-1">Email</p>
                  <a href="mailto:info@thecontractum.com" className="text-white hover:text-red-400 transition-colors font-medium">
                    info@thecontractum.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group cursor-pointer">
                <Phone size={20} className="text-red-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-300 mb-1">Phone</p>
                  <a href="tel:+919680534740" className="text-white hover:text-red-400 transition-colors font-medium">
                    +91 96805-34740
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group cursor-pointer">
                <MapPin size={20} className="text-red-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-300 mb-1">Address</p>
                  <p className="text-white leading-relaxed text-sm">
                    Plot No 169, Ground Floor<br />
                    Rangbari Road<br />
                    Kota, Rajasthan 324005
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-white text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">The</span> <span className="text-red-500 font-semibold">Contractum</span>. All rights reserved.
          </p>
          <VisitorCounter />
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;