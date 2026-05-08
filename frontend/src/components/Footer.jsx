import React from "react";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import VisitorCounter from "./VisitorCounter";

const navLinkClass =
  "hover:text-red-400 cursor-pointer transition-colors hover:translate-x-2 transform duration-200 flex items-center gap-2 group text-gray-300";

const Dot = () => (
  <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all flex-shrink-0" />
);

const Footer = () => {
  return (
    <footer className="relative print:hidden">

      {/* ================= Stay Connected Banner (no form) ================= */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-pink-600 text-white relative overflow-hidden">

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        {/* Curved Shape */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-br from-gray-900 to-black rounded-t-[100%]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Stay Connected with{" "}
            <span className="text-blue-300">The</span>{" "}
            <span className="text-yellow-300">Contractum</span>
          </h2>
          <p className="text-red-100 text-sm">
            Delivering innovative solutions and fostering lasting relationships across India and beyond.
          </p>
        </div>
      </div>

      {/* ================= Main Footer ================= */}
      <div className="bg-gray-800 text-white pt-20 pb-6 px-4 sm:px-6 relative overflow-hidden">

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

          {/* Column 1 - Company Info */}
          <div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-blue-400">The</span>{" "}
              <span className="text-red-500">Contractum</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Passionately focused on delivering innovative solutions and fostering lasting relationships for over a decade.
            </p>

            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              Follow Us
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent" />
            </h4>

            <div className="flex flex-wrap gap-3">
              {/* LinkedIn — real URL */}
              <a
                href="https://www.linkedin.com/company/contractum-integral-solution-pvt-ltd/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-500 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-white/5 p-3 rounded-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-white/10"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Solutions */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Solutions
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent" />
            </h4>
            <ul className="space-y-3">
              {[
                { label: "GIS Solutions", to: "/solutions/business/gis" },
                { label: "IT Consulting", to: "/solutions/business/csit" },
                { label: "Market Research", to: "/solutions/business/Mras" },
                { label: "E-Commerce", to: "/solutions/digital/e-commerce" },
                { label: "HR Solutions", to: "/solutions/digital/hrtech" },
                { label: "BPO Services", to: "/solutions/digital/bpo" },
                { label: "Digital Marketing", to: "/solutions/digital/digital-marketing" },
                { label: "Telecom Services", to: "/solutions/connectivity/telecom" },
                { label: "Cloud & Network", to: "/solutions/connectivity/cloud" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={navLinkClass}>
                    <Dot />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Company
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent" />
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/company/about-us" },
                { label: "Vision", to: "/company/about-us/vision" },
                { label: "Mission", to: "/company/about-us/mission" },
                { label: "Leadership", to: "/company/leadership" },
                { label: "Our Journey", to: "/company/our-journey" },
                { label: "Why Choose Us", to: "/company/why-choose-us" },
                { label: "Core Team", to: "/team/core-team" },
                { label: "Careers", to: "/careers/life" },
                { label: "Projects", to: "/projects/ongoing" },
                { label: "Resources", to: "/resources/blogs" },
                { label: "Affiliate Program", to: "/join/affiliate" },
                { label: "Contact Us", to: "/contact/touch" },
                { label: "Support", to: "/contact/support" },
                { label: "Code Of Conduct", to: "/company/code-of-conduct" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className={navLinkClass}>
                    <Dot />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
              Get in Touch
              <div className="h-0.5 w-8 bg-gradient-to-r from-red-500 to-transparent" />
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group cursor-pointer">
                <Mail size={20} className="text-red-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-300 mb-1">Email</p>
                  <a
                    href="mailto:info@thecontractum.com"
                    className="text-white hover:text-red-400 transition-colors font-medium"
                  >
                    info@thecontractum.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group cursor-pointer">
                <Phone size={20} className="text-red-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-300 mb-1">Phone</p>
                  <a
                    href="tel:+919680534740"
                    className="text-white hover:text-red-400 transition-colors font-medium"
                  >
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
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-400 font-semibold">The</span>{" "}
            <span className="text-red-500 font-semibold">Contractum</span>. All rights reserved.
          </p>
          <VisitorCounter />
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 text-center">
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