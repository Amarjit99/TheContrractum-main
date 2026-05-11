import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, UserCheck, Globe, Mail, ArrowLeft, CheckCircle, Info, FileText, AlertTriangle } from 'lucide-react';

const sections = [
  {
    icon: <Eye size={24} />,
    title: "Information We Collect",
    content: `At The Contractum, we collect information that you voluntarily provide when interacting with our website, services, or team. This may include:`,
    list: [
      "Personal Identification — Full name, email address, phone number, and mailing address provided through forms or registrations.",
      "Professional Information — Company name, job title, industry, and business-related details shared during consultations or project inquiries.",
      "Technical Data — IP address, browser type and version, operating system, device information, and access timestamps collected automatically.",
      "Usage Data — Pages visited, time spent on pages, navigation patterns, referral sources, and interaction data to understand user behavior.",
      "Communication Records — Emails, support tickets, feedback submissions, and any messages exchanged with our team.",
    ],
  },
  {
    icon: <Database size={24} />,
    title: "How We Use Your Information",
    content: `We process your personal information for the following legitimate business purposes:`,
    list: [
      "Service Delivery — To provide, maintain, and improve our consulting, IT, and business solutions tailored to your specific needs.",
      "Communication — To respond to inquiries, send project updates, share relevant newsletters, and provide customer support.",
      "Analytics & Improvement — To analyze website usage patterns, optimize user experience, and enhance the quality of our services.",
      "Legal Compliance — To comply with applicable laws, regulations, and legal obligations, including tax and financial reporting requirements.",
      "Security — To detect, prevent, and address fraud, unauthorized access, and other security concerns across our platform.",
      "Marketing — To send promotional materials and updates about new services, with your explicit consent where required by law.",
    ],
  },
  {
    icon: <Shield size={24} />,
    title: "Data Protection & Security",
    content: `We implement comprehensive security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction:`,
    list: [
      "SSL/TLS Encryption — All data transmitted between your browser and our servers is encrypted using industry-standard protocols.",
      "Access Controls — Strict role-based access ensures only authorized personnel can view or process sensitive information.",
      "Regular Audits — We conduct periodic security assessments and vulnerability testing to identify and remediate potential risks.",
      "Data Minimization — We collect only the information necessary for the stated purposes and retain it only as long as required.",
      "Incident Response — We maintain a documented incident response plan to address any potential data breaches swiftly and transparently.",
    ],
  },
  {
    icon: <UserCheck size={24} />,
    title: "Your Rights & Choices",
    content: `Under applicable data protection laws, you have the following rights regarding your personal information:`,
    list: [
      "Right to Access — Request a copy of the personal data we hold about you at any time.",
      "Right to Rectification — Request correction of any inaccurate or incomplete personal data.",
      "Right to Erasure — Request deletion of your personal data, subject to legal retention requirements.",
      "Right to Restrict Processing — Request that we limit the processing of your data under certain circumstances.",
      "Right to Data Portability — Receive your personal data in a structured, commonly used, machine-readable format.",
      "Right to Object — Object to the processing of your personal data for direct marketing or legitimate interest purposes.",
      "Right to Withdraw Consent — Where processing is based on consent, you may withdraw it at any time without affecting prior lawful processing.",
    ],
  },
  {
    icon: <Globe size={24} />,
    title: "Third-Party Sharing & Transfers",
    content: `We do not sell, trade, or rent your personal information to third parties. However, we may share data in the following circumstances:`,
    list: [
      "Service Providers — Trusted partners who assist in operating our website, conducting business, or servicing you, bound by strict confidentiality agreements.",
      "Legal Requirements — When disclosure is required to comply with the law, enforce our policies, or protect the rights and safety of The Contractum or others.",
      "Business Transfers — In connection with any merger, acquisition, or sale of company assets, where personal data may be transferred as part of the transaction.",
      "Analytics Partners — Aggregated, anonymized data may be shared with analytics providers to improve our services and understand market trends.",
    ],
  },
  {
    icon: <Lock size={24} />,
    title: "Data Retention",
    content: `We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy. Specific retention periods include:`,
    table: [
      { type: "Account Information", duration: "Duration of account + 3 years", purpose: "Service delivery and support" },
      { type: "Transaction Records", duration: "7 years", purpose: "Legal and financial compliance" },
      { type: "Communication Logs", duration: "3 years", purpose: "Quality assurance and dispute resolution" },
      { type: "Analytics Data", duration: "2 years", purpose: "Service improvement and reporting" },
      { type: "Marketing Preferences", duration: "Until consent withdrawn", purpose: "Personalized communications" },
    ],
  },
  {
    icon: <FileText size={24} />,
    title: "Children's Privacy",
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take immediate steps to delete such information from our records. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`,
  },
  {
    icon: <Info size={24} />,
    title: "Updates to This Policy",
    content: `We may update this Privacy Policy periodically to reflect changes in our practices, technologies, legal requirements, or other operational factors. Any material changes will be communicated via a prominent notice on our website or through direct communication. We encourage you to review this page regularly to stay informed about how we protect your data.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-2 mb-8">
            <Shield size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Legal & Compliance</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Policy</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            At The Contractum, we value your privacy. This policy outlines how we collect, use, protect, and manage your personal information when you interact with our services and platform.
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
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
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
                      <CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
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
                        <th className="text-left py-3 px-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">Data Type</th>
                        <th className="text-left py-3 px-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">Retention Period</th>
                        <th className="text-left py-3 px-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">Purpose</th>
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
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">
                Questions About Your Privacy?
              </h2>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please do not hesitate to reach out. Our dedicated privacy team is committed to addressing your inquiries promptly and transparently.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact/touch"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all uppercase tracking-widest text-sm"
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

export default PrivacyPolicy;
