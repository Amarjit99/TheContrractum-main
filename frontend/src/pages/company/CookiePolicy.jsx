import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cookie, Eye, Settings, Lock, Mail, ArrowLeft, CheckCircle, Info } from 'lucide-react';

const sections = [
  {
    icon: <Cookie size={24} />,
    title: "What Are Cookies?",
    content: `Cookies are small text files that are placed on your device when you visit our website. They help us recognize your device and store information about your preferences or past actions. Cookies enable us to provide a smoother, more personalized experience every time you visit The Contractum.`,
  },
  {
    icon: <Eye size={24} />,
    title: "How We Use Cookies",
    content: `We use cookies for the following purposes:`,
    list: [
      "Essential Cookies — Required for core website functionality such as page navigation, secure areas, and session management.",
      "Performance Cookies — Help us understand how visitors interact with our website by collecting anonymous analytics data.",
      "Functional Cookies — Remember your preferences (language, region, display settings) to provide enhanced features.",
      "Marketing Cookies — Used to deliver relevant advertisements and track campaign performance across platforms.",
    ],
  },
  {
    icon: <Shield size={24} />,
    title: "Types of Cookies We Use",
    content: null,
    table: [
      { type: "Session Cookies", duration: "Browser session", purpose: "Maintain your session while browsing" },
      { type: "Persistent Cookies", duration: "Up to 2 years", purpose: "Remember your preferences across visits" },
      { type: "First-Party Cookies", duration: "Varies", purpose: "Set by The Contractum directly" },
      { type: "Third-Party Cookies", duration: "Varies", purpose: "Set by analytics and advertising partners" },
    ],
  },
  {
    icon: <Settings size={24} />,
    title: "Managing Your Cookie Preferences",
    content: `You have full control over cookies. Most web browsers allow you to manage cookie settings through the browser's preferences or settings panel. You can choose to block or delete cookies at any time. Please note that disabling certain cookies may affect website functionality and your user experience.`,
    list: [
      "Chrome — Settings → Privacy and Security → Cookies",
      "Firefox — Settings → Privacy & Security → Cookies",
      "Safari — Preferences → Privacy → Cookies",
      "Edge — Settings → Cookies and Site Permissions",
    ],
  },
  {
    icon: <Lock size={24} />,
    title: "Data Protection & Privacy",
    content: `All data collected through cookies is handled in strict accordance with our Privacy Policy and applicable data protection laws. We do not sell your personal information to third parties. Cookie data is stored securely and is only accessible to authorized personnel within The Contractum.`,
  },
  {
    icon: <Info size={24} />,
    title: "Updates to This Policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. Any significant changes will be communicated through a notice on our website. We encourage you to review this page periodically.`,
  },
];

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 rounded-full px-6 py-2 mb-8">
            <Shield size={16} className="text-cyan-600" />
            <span className="text-cyan-700 text-sm font-bold uppercase tracking-widest">Legal & Compliance</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight mb-6">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">Policy</span>
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            At The Contractum, we are committed to transparency. This policy explains how we use cookies and similar technologies to enhance your experience on our platform.
          </p>

          <p className="text-slate-500 text-sm mt-6 font-medium">
            Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-100 rounded-2xl p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-200 transition-all duration-300"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                  {section.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-800">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              {section.content && (
                <p className="text-slate-700 leading-relaxed mb-4">{section.content}</p>
              )}

              {/* List */}
              {section.list && (
                <ul className="space-y-3 mt-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Table */}
              {section.table && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-cyan-600 font-bold uppercase tracking-wider text-xs">Type</th>
                        <th className="text-left py-3 px-4 text-cyan-600 font-bold uppercase tracking-wider text-xs">Duration</th>
                        <th className="text-left py-3 px-4 text-cyan-600 font-bold uppercase tracking-wider text-xs">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-100/50 transition-colors">
                          <td className="py-3 px-4 text-slate-900 font-semibold">{row.type}</td>
                          <td className="py-3 px-4 text-slate-500">{row.duration}</td>
                          <td className="py-3 px-4 text-slate-600">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">
                Questions About Our Cookie Policy?
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6">
              If you have any questions or concerns about how we use cookies, please do not hesitate to contact our team. We are here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact/touch"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl transition-all uppercase tracking-widest text-sm"
              >
                <Mail size={16} />
                Contact Us
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all uppercase tracking-widest text-sm"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
