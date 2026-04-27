import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Globe } from 'lucide-react';
import bpoo from "../../../assets/bpoo.webp";
import iso9001 from "../../../assets/certifications/iso9001.png";
import iso27001 from "../../../assets/certifications/iso27001.png";
import gdpr from "../../../assets/certifications/gdpr.png";
import soc2 from "../../../assets/certifications/soc2.png";
import pci from "../../../assets/certifications/pci.png";
import hipaa from "../../../assets/certifications/hipaa.png";

const Certifications = () => {
    const certifications = [
        {
            title: "ISO 9001:2015",
            subtitle: "Quality Management System",
            description: "International standard that specifies requirements for a quality management system (QMS).",
            image: iso9001,
            details: ["Customer Satisfaction Focus", "Continuous Improvement", "Process Optimization", "Risk-Based Thinking"],
            color: "from-blue-500 to-indigo-600"
        },
        {
            title: "ISO 27001",
            subtitle: "Information Security Management",
            description: "Formal specification for an information security management system (ISMS).",
            image: iso27001,
            details: ["Data Integrity & Privacy", "Asset Management", "Access Control Policies", "Internal Security Audits"],
            color: "from-purple-600 to-pink-600"
        },
        {
            title: "GDPR Compliance",
            subtitle: "Data Protection Regulation",
            description: "Strict adherence to EU data protection and privacy regulations for all individuals.",
            image: gdpr,
            details: ["User Data Privacy", "Right to Access", "Breach Notification Protocols", "Data Minimization"],
            color: "from-emerald-500 to-teal-600"
        },
        {
            title: "SOC 2 Type II",
            subtitle: "Security & Availability",
            description: "Auditing procedure that ensures service providers securely manage your data.",
            image: soc2,
            details: ["Trust Services Criteria", "Strict Internal Controls", "Privacy Protection", "Availability Monitoring"],
            color: "from-orange-500 to-red-600"
        },
        {
            title: "PCI DSS",
            subtitle: "Payment Card Industry",
            description: "Secure environment for handling credit card information and transactions.",
            image: pci,
            details: ["Safe Payment Processing", "Network Security", "Vulnerability Management", "Strong Access Control"],
            color: "from-cyan-500 to-blue-600"
        },
        {
            title: "HIPAA",
            subtitle: "Health Information Privacy",
            description: "Standard for sensitive patient data protection and healthcare compliance.",
            image: hipaa,
            details: ["Healthcare Privacy", "Secure Health Records", "Administrative Safeguards", "Technical Safeguards"],
            color: "from-rose-500 to-pink-600"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center overflow-hidden" style={{ backgroundImage: `url(${bpoo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                        <Link to="/solutions/digital/bpo" className="inline-flex items-center text-purple-400 font-bold mb-6 hover:text-purple-300 transition group">
                            <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition" />
                            Back to BPO Solutions
                        </Link>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                            Quality & Compliance <br/>
                            <span className="text-purple-400 italic">Certifications</span>
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed drop-shadow-md">
                            We maintain the highest global standards in quality management, data security, and operational excellence to ensure your business is in safe hands.
                        </p>
                    </div>
                </div>
            </div>

            {/* Certifications Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Our Global Certifications</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">Demonstrating our commitment to excellence through rigorous auditing and international recognitions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => {
                        return (
                            <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col hover:-translate-y-2 overflow-hidden">
                                {/* Color accent bar */}
                                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${cert.color}`}></div>
                                
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cert.color} p-0.5 mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition duration-300 overflow-hidden`}>
                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-2xl" />
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-1">{cert.title}</h3>
                                <p className="text-purple-600 font-bold text-sm mb-4 tracking-wide uppercase italic">{cert.subtitle}</p>
                                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{cert.description}</p>

                                <div className="space-y-3 mb-8">
                                    {cert.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-700 font-semibold text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cert.color}`}></div>
                                            {detail}
                                        </div>
                                    ))}
                                </div>

                                <button className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition active:scale-95 shadow-md">
                                    <Download className="w-4 h-4" /> Download Certificate
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Compliance Section */}
            <div className="bg-slate-900 text-white py-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl sm:text-5xl font-black mb-8 leading-tight">Global Compliance. <br/> Local Excellence.</h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-12">
                        Our compliance framework is designed to meet the most stringent legal and regulatory requirements worldwide. We continuously update our processes to stay ahead of international data protection laws.
                    </p>
                    <div className="flex flex-wrap justify-center gap-10 opacity-60">
                        {["ISO 9001", "ISO 27001", "GDPR", "SOC 2", "PCI DSS", "HIPAA"].map((label, i) => (
                            <span key={i} className="text-xl font-bold tracking-widest">{label}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[3rem] p-12 sm:p-20 shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 border-8 border-white rounded-full"></div>
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-black mb-6">Need more details on our standards?</h3>
                    <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto font-medium">
                        Request our full compliance handbook and audit reports for your due diligence process. We are transparent about our operations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact/request-demo" className="bg-white text-purple-700 font-bold px-12 py-4 rounded-2xl hover:bg-gray-100 transition transform hover:scale-105 shadow-xl text-lg">
                            Request Audit Report
                        </Link>
                        <Link to="/contact/touch" className="border-2 border-white/50 text-white font-bold px-12 py-4 rounded-2xl hover:bg-white/10 transition transform hover:scale-105 text-lg">
                            Contact Compliance Team
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certifications;
