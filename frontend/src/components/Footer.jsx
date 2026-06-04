import React, { useState, useEffect } from "react";
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

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const navLinkClass =
  "hover:text-red-400 cursor-pointer transition-colors hover:translate-x-1.5 transform duration-200 flex items-center gap-1.5 group text-gray-400 hover:text-white text-xs font-semibold";

const Dot = () => (
  <span className="w-1 h-1 bg-red-500 rounded-full group-hover:w-1.5 group-hover:h-1.5 transition-all flex-shrink-0" />
);

const PlayStoreButton = () => (
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    className="flex items-center gap-2 bg-gray-900/80 border border-gray-800 hover:border-gray-700 rounded-xl px-3 py-1.5 hover:bg-gray-800/80 transition-all shrink-0 max-w-[145px]"
  >
    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5,3.23C5.17,3.06 5.43,2.94 5.76,2.94L16.24,9.1L5.86,19.38C5.55,19.38 5.3,19.26 5.13,19.09L5,3.23 M17.06,9.58L20.82,11.8C21.43,12.16 21.43,12.84 20.82,13.2L17.06,15.42L12.56,12.5L17.06,9.58 M5.86,19.38L16.24,13.26L12.56,12.5L5.86,19.38" />
    </svg>
    <div className="text-left leading-none">
      <span className="text-[7.5px] uppercase text-gray-500 font-bold block">GET IT ON</span>
      <span className="text-[10px] text-gray-300 font-bold block">Google Play</span>
    </div>
  </a>
);

const AppStoreButton = () => (
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    className="flex items-center gap-2 bg-gray-900/80 border border-gray-800 hover:border-gray-700 rounded-xl px-3 py-1.5 hover:bg-gray-800/80 transition-all shrink-0 max-w-[145px]"
  >
    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,22 9.09,22.05C7.79,22.1 6.8,20.77 5.96,19.5C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
    </svg>
    <div className="text-left leading-none">
      <span className="text-[7.5px] uppercase text-gray-500 font-bold block">Download on the</span>
      <span className="text-[10px] text-gray-300 font-bold block">App Store</span>
    </div>
  </a>
);


const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    linkedin: 'https://www.linkedin.com/company/contractum-integral-solution-pvt-ltd/posts/?feedView=all',
    twitter: 'https://twitter.com/thecontractum',
    facebook: 'https://facebook.com/thecontractum',
    youtube: 'https://youtube.com/@thecontractum'
  });
  const [contact, setContact] = useState({
    email: 'info@thecontractum.com',
    phone: '+91 96805-34740',
    address: 'Plot No 169, Ground Floor, Rangbari Road, Kota, Rajasthan 324005'
  });

  useEffect(() => {
    fetch(`${API}/api/settings`)
      .then(r => r.json())
      .then(data => {
        const cleanLink = (val, fallback) => {
          if (!val || val.trim() === "" || val.trim() === "#") return fallback;
          return val;
        };

        if (data?.socialLinks) {
          setSocialLinks(prev => ({
            linkedin: cleanLink(data.socialLinks.linkedin, prev.linkedin),
            twitter: cleanLink(data.socialLinks.twitter, prev.twitter),
            facebook: cleanLink(data.socialLinks.facebook, prev.facebook),
            youtube: cleanLink(data.socialLinks.youtube, prev.youtube),
          }));
        }
        if (data?.contactDetails) {
          setContact(prev => ({
            email: data.contactDetails.email || prev.email,
            phone: data.contactDetails.phone || prev.phone,
            address: data.contactDetails.address || prev.address,
          }));
        }
      })
      .catch(() => { });
  }, []);

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
      <div className="bg-gray-900 text-white pt-16 pb-6 px-4 sm:px-6 relative overflow-hidden border-t border-white/5">

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 relative z-10">

          {/* Column 1 - Information & Mobile */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white text-sm font-extrabold mb-4 flex items-center gap-2 tracking-wider uppercase">
                Information
                <div className="h-0.5 w-6 bg-gradient-to-r from-red-500 to-transparent" />
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "About Us", to: "/company/about-us" },
                  { label: "Terms & Conditions", to: "/company/terms-of-service" },
                  { label: "Privacy Policy", to: "/company/privacy-policy" },
                  { label: "Careers with Us", to: "/careers/life" },
                  { label: "Cookie Policy", to: "/company/cookie-policy" },
                  { label: "Contact Us", to: "/contact/touch" },
                  { label: "Support & FAQs", to: "/contact/support" },
                  { label: "Code of Conduct", to: "/company/code-of-conduct" },
                  { label: "Employee Verification", to: "/company/employee-id" },
                  { label: "Company Contracts", to: "/company/contracts" },
                  { label: "Referral Dashboard", to: "/company/referral-dashboard" },
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

            <div className="pt-2">
              <h4 className="text-white text-xs font-extrabold mb-3 tracking-wider uppercase">
                Contractum on Mobile
              </h4>
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5">
                <PlayStoreButton />
                <AppStoreButton />
              </div>
            </div>
          </div>

          {/* Column 2 - Solutions & Industries */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white text-sm font-extrabold mb-4 flex items-center gap-2 tracking-wider uppercase">
                Solutions We Provide
                <div className="h-0.5 w-6 bg-gradient-to-r from-red-500 to-transparent" />
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "GIS Solutions", to: "/solutions/business/gis" },
                  { label: "IT Consulting", to: "/solutions/business/csit" },
                  { label: "Market Research", to: "/solutions/business/Mras" },
                  { label: "E-Commerce Solutions", to: "/solutions/digital/e-commerce" },
                  { label: "HR Tech Solutions", to: "/solutions/digital/hrtech" },
                  { label: "BPO Services", to: "/solutions/digital/bpo" },
                  { label: "Digital Marketing", to: "/solutions/digital/digital-marketing" },
                  { label: "Telecom Solutions", to: "/solutions/connectivity/telecom" },
                  { label: "Cloud Services", to: "/solutions/connectivity/cloud" },
                  { label: "Explore Solutions", to: "/solutions/business" },
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

            <div>
              <h4 className="text-white text-sm font-extrabold mb-4 flex items-center gap-2 tracking-wider uppercase">
                Industries We Serve
                <div className="h-0.5 w-6 bg-gradient-to-r from-red-500 to-transparent" />
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Government Sector", to: "/industries/government" },
                  { label: "Healthcare Sector", to: "/industries/healthcare" },
                  { label: "Education Sector", to: "/industries/education" },
                  { label: "Retail & Commerce", to: "/industries/retail" },
                  { label: "Telecom Industry", to: "/industries/telecom" },
                  { label: "Banking & Finance", to: "/industries/banking" },
                  { label: "Smart Agriculture", to: "/industries/agriculture" },
                  { label: "Manufacturing", to: "/industries/manufacturing" },
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
          </div>

          {/* Column 3 - Careers & Jobseekers */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white text-sm font-extrabold mb-4 flex items-center gap-2 tracking-wider uppercase">
                Careers & Opportunities
                <div className="h-0.5 w-6 bg-gradient-to-r from-red-500 to-transparent" />
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Candidate Login", to: "/login" },
                  { label: "Register Profile", to: "/register" },
                  { label: "Careers Home", to: "/careers/life" },
                  { label: "Current Job Openings", to: "/careers/jobs" },
                  { label: "Internship Programs", to: "/careers/internships" },
                  { label: "Campus Recruitment", to: "/careers/campus" },
                  { label: "Growth & Training", to: "/careers/growth" },
                  { label: "Employee Benefits", to: "/careers/benefits" },
                  { label: "Youth Development (YTDP)", to: "/careers/ytdp" },
                  { label: "CSR Initiatives", to: "/careers/csr" },
                  { label: "Verify Certificates", to: "/careers/certificates" },
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
          </div>

          {/* Column 4 - Company, Contact, Socials */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white text-sm font-extrabold mb-4 flex items-center gap-2 tracking-wider uppercase">
                Company & Culture
                <div className="h-0.5 w-6 bg-gradient-to-r from-red-500 to-transparent" />
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Our Vision", to: "/company/about-us/vision" },
                  { label: "Our Mission", to: "/company/about-us/mission" },
                  { label: "Core Values", to: "/company/about-us/values" },
                  { label: "Leadership Team", to: "/company/leadership" },
                  { label: "Founders & Management", to: "/company/leadership/founders" },
                  { label: "Our Journey", to: "/company/our-journey" },
                  { label: "Why Choose Us", to: "/company/why-choose-us" },
                  { label: "Core Team", to: "/team/core-team" },
                  { label: "Corporate Culture", to: "/team/culture" },
                  { label: "Collaborate With Us", to: "/join/collaborate" },
                  { label: "Startup Accelerator", to: "/join/startup" },
                  { label: "Volunteer Application", to: "/join/volunteer" },
                  { label: "Affiliate Portal", to: "/join/affiliate" },
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

            <div>
              <h4 className="text-white text-xs font-extrabold mb-3 tracking-wider uppercase">
                Get in Touch
              </h4>
              <div className="space-y-2 text-xs text-gray-400 font-semibold leading-relaxed">
                <div className="flex items-center gap-2 group hover:text-white transition-colors cursor-pointer">
                  <Mail size={12} className="text-red-500" />
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
                <div className="flex items-center gap-2 group hover:text-white transition-colors cursor-pointer">
                  <Phone size={12} className="text-red-500" />
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                </div>
                <div className="flex items-start gap-2 group hover:text-white transition-colors cursor-pointer">
                  <MapPin size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{contact.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-extrabold mb-3 tracking-wider uppercase">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: <Linkedin size={14} />, href: socialLinks.linkedin, bg: "hover:bg-blue-600 hover:from-blue-600 hover:to-blue-700", label: "LinkedIn" },
                  { icon: <Twitter size={14} />, href: socialLinks.twitter, bg: "hover:bg-blue-400 hover:from-blue-400 hover:to-cyan-500", label: "Twitter" },
                  { icon: <Facebook size={14} />, href: socialLinks.facebook, bg: "hover:bg-blue-600 hover:from-blue-600 hover:to-indigo-600", label: "Facebook" },
                  { icon: <Youtube size={14} />, href: socialLinks.youtube, bg: "hover:bg-red-600 hover:from-red-600 hover:to-red-700", label: "YouTube" },
                ].map(({ icon, href, bg, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white/5 p-2 rounded-xl text-gray-400 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-105 border border-white/10 ${bg}`}
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-gray-400 text-xs text-center md:text-left font-semibold">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-400">The</span>{" "}
            <span className="text-red-500">Contractum</span>. All rights reserved.
          </p>
          <VisitorCounter />
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-400 text-center">
            <Link to="/company/privacy-policy" className="hover:text-red-400 transition-colors">Privacy Policy</Link>
            <Link to="/company/terms-of-service" className="hover:text-red-400 transition-colors">Terms of Service</Link>
            <Link to="/company/cookie-policy" className="hover:text-red-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;