import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Scale, AlertTriangle, UserCheck, Globe, Ban, RefreshCw, Mail, ArrowLeft, CheckCircle, Info, Gavel, BookOpen } from 'lucide-react';

const sections = [
  {
    icon: <BookOpen size={24} />,
    title: "Acceptance of Terms",
    content: `By accessing and using the website, services, and solutions provided by The Contractum (Contractum Integral Solution Pvt. Ltd.), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using our services. These terms constitute a legally binding agreement between you ("User") and The Contractum ("Company", "we", "us", or "our").`,
  },
  {
    icon: <FileText size={24} />,
    title: "Description of Services",
    content: `The Contractum provides a comprehensive range of professional services including, but not limited to:`,
    list: [
      "IT Consulting & Software Development — Custom software solutions, system integration, and technology advisory services tailored to your business needs.",
      "GIS & Geospatial Solutions — Geographic information system services including spatial data analysis, mapping, and location intelligence.",
      "Market Research & Analytics — Data-driven market research, competitive analysis, and business intelligence services.",
      "Human Resource Technology — HR management solutions, recruitment platforms, and workforce optimization tools.",
      "BPO & Digital Marketing — Business process outsourcing, digital marketing strategies, SEO, and brand management.",
      "Telecom & Cloud Infrastructure — Network infrastructure, cloud migration, hosting solutions, and connectivity services.",
      "E-Commerce Solutions — Online marketplace development, payment integration, and digital commerce strategies.",
    ],
  },
  {
    icon: <UserCheck size={24} />,
    title: "User Obligations & Responsibilities",
    content: `As a user of our services, you agree to the following obligations:`,
    list: [
      "Accurate Information — You must provide truthful, accurate, and complete information when registering, submitting forms, or communicating with us.",
      "Lawful Use — You shall use our services only for lawful purposes and in compliance with all applicable local, national, and international laws and regulations.",
      "Account Security — You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "Respectful Conduct — You agree not to harass, abuse, or harm other users, our employees, or partners through any means of communication.",
      "No Unauthorized Access — You shall not attempt to gain unauthorized access to any systems, networks, or data belonging to The Contractum.",
      "Compliance with Policies — You agree to comply with all additional policies, guidelines, and codes of conduct published on our website.",
    ],
  },
  {
    icon: <Shield size={24} />,
    title: "Intellectual Property Rights",
    content: `All content, materials, and intellectual property on this website and within our services are protected:`,
    list: [
      "Ownership — All trademarks, logos, service marks, trade names, software, designs, text, graphics, and other content are the exclusive property of The Contractum or its licensors.",
      "Limited License — We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our website for personal and business purposes.",
      "Restrictions — You may not reproduce, distribute, modify, create derivative works, publicly display, or commercially exploit any content without our prior written consent.",
      "User Content — By submitting content (feedback, suggestions, ideas) to us, you grant The Contractum a non-exclusive, royalty-free, perpetual license to use such content for business improvement.",
      "DMCA Compliance — We respect intellectual property rights and will respond to valid notices of alleged copyright infringement in accordance with applicable laws.",
    ],
  },
  {
    icon: <Scale size={24} />,
    title: "Payment & Billing Terms",
    content: `For paid services and engagements, the following terms apply:`,
    list: [
      "Pricing — All service fees are as quoted in individual proposals, contracts, or agreements. Prices are subject to change with prior notice.",
      "Payment Schedule — Payments are due as specified in the agreed contract terms. Late payments may incur interest charges as permitted by law.",
      "Taxes — All fees are exclusive of applicable taxes (GST, service tax, etc.) unless explicitly stated otherwise. You are responsible for paying all applicable taxes.",
      "Refund Policy — Refunds are handled on a case-by-case basis and are subject to the terms outlined in your specific service agreement.",
      "Disputes — Any billing disputes must be raised in writing within 30 days of the invoice date. We will work in good faith to resolve disputes promptly.",
    ],
  },
  {
    icon: <Ban size={24} />,
    title: "Prohibited Activities",
    content: `You are strictly prohibited from engaging in the following activities:`,
    list: [
      "Uploading or transmitting viruses, malware, or any malicious code that could damage, disable, or impair our systems.",
      "Attempting to reverse engineer, decompile, or disassemble any software or technology used in our services.",
      "Using automated tools (bots, scrapers, crawlers) to access, collect, or extract data from our website without authorization.",
      "Impersonating any person or entity, or falsely representing your affiliation with any person or entity.",
      "Interfering with or disrupting the integrity or performance of our services, servers, or networks.",
      "Using our services for any illegal, fraudulent, or unauthorized purpose, including money laundering or terrorist financing.",
      "Collecting or harvesting personally identifiable information of other users without their explicit consent.",
    ],
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by applicable law:`,
    list: [
      "Disclaimer of Warranties — Our services are provided \"as is\" and \"as available\" without warranties of any kind, either express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
      "Limitation — The Contractum shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.",
      "Cap on Liability — Our total liability to you for any claims arising under these terms shall not exceed the total amount paid by you to us in the twelve (12) months preceding the claim.",
      "Force Majeure — We shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including natural disasters, pandemics, wars, or government actions.",
      "Third-Party Links — Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of any external sites.",
    ],
  },
  {
    icon: <Gavel size={24} />,
    title: "Governing Law & Dispute Resolution",
    content: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these terms shall be resolved through the following process:`,
    list: [
      "Negotiation — Both parties shall first attempt to resolve disputes through good-faith negotiation within 30 days of written notice.",
      "Mediation — If negotiation fails, disputes shall be submitted to mediation before a mutually agreed mediator.",
      "Arbitration — Unresolved disputes shall be referred to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India.",
      "Jurisdiction — The courts of Kota, Rajasthan, India shall have exclusive jurisdiction over any legal proceedings arising from these terms.",
    ],
  },
  {
    icon: <RefreshCw size={24} />,
    title: "Termination",
    content: `Either party may terminate the relationship under the following conditions:`,
    list: [
      "By User — You may stop using our services at any time. Account deletion requests can be submitted through our contact page.",
      "By The Contractum — We reserve the right to suspend or terminate your access to our services at our discretion, with or without notice, for any violation of these terms.",
      "Effect of Termination — Upon termination, your right to access and use our services ceases immediately. Provisions relating to intellectual property, limitation of liability, and governing law shall survive termination.",
      "Data After Termination — We may retain your data for a reasonable period as required by law or legitimate business purposes, after which it will be securely deleted.",
    ],
  },
  {
    icon: <Info size={24} />,
    title: "Changes to These Terms",
    content: `The Contractum reserves the right to modify or update these Terms of Service at any time. Changes become effective immediately upon posting on this page. Material changes will be communicated via a notice on our website or by email where applicable. Your continued use of our services after any modifications constitutes acceptance of the updated terms. We encourage you to review this page periodically.`,
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-6 py-2 mb-8">
            <Scale size={16} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Legal & Compliance</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Service</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Please read these Terms of Service carefully before using the services offered by The Contractum. These terms govern your access to and use of our website, platform, and professional services.
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
              className="bg-slate-900/80 border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300"
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                  {section.icon}
                </div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                  {section.title}
                </h2>
              </div>

              {/* Content */}
              {section.content && (
                <p className="text-slate-300 leading-relaxed mb-4">{section.content}</p>
              )}

              {/* List */}
              {section.list && (
                <ul className="space-y-3 mt-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Table */}
              {section.table && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-amber-400 font-bold uppercase tracking-wider text-xs">Type</th>
                        <th className="text-left py-3 px-4 text-amber-400 font-bold uppercase tracking-wider text-xs">Duration</th>
                        <th className="text-left py-3 px-4 text-amber-400 font-bold uppercase tracking-wider text-xs">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-white font-semibold">{row.type}</td>
                          <td className="py-3 px-4 text-slate-400">{row.duration}</td>
                          <td className="py-3 px-4 text-slate-300">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Questions About Our Terms?
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              If you have any questions or need clarification regarding these Terms of Service, please feel free to contact our legal team. We are committed to ensuring transparency and clarity in all our engagements.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact/touch"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all uppercase tracking-widest text-sm"
              >
                <Mail size={16} />
                Contact Us
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm"
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

export default TermsOfService;
