import { useState } from "react";
import { Building2, Cloud, Lock, CheckCircle, Users, FileText, BookOpen, Video } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Local Assets Imports
import technical from "../../assets/technical.jpg";
import workImg from "../../assets/work.jpg";
import cityImg from "../../assets/city.jpg";
import collabImg from "../../assets/collab.webp";
import m1Img from "../../assets/m1.png";
import g1Img from "../../assets/g1.png";
import g2Img from "../../assets/g2.png";
import g3Img from "../../assets/g3.png";
import articlesImg from "../../assets/Articles-and-Blogs.jpg";
import businessImg from "../../assets/Business.jpg";
import ecoImg from "../../assets/eco.jpg";

export default function TechnicalExperts() {
    const [openCard, setOpenCard] = useState(null);
    const [form, setForm] = useState({
        systemProductName: "",
        technicalIssue: "",
        errorScreenshot: "",
        deviceInformation: "",
        email: "",
        phone: "",
        countryCode: "+1"
    });
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
    const [errorMsg, setErrorMsg] = useState("");

    const toggleCard = (index) => {
        setOpenCard(openCard === index ? null : index);
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({ ...prev, errorScreenshot: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setForm((prev) => ({ ...prev, errorScreenshot: "" }));
        }
    };

    const handleReset = () => {
        setForm({
            systemProductName: "",
            technicalIssue: "",
            errorScreenshot: "",
            deviceInformation: "",
            email: "",
            phone: "",
            countryCode: "+1"
        });
        setStatus(null);
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch(`${API_URL}/api/expert-consultations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    contactDetails: `Email: ${form.email} | Phone: ${form.countryCode} ${form.phone}`
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setForm({
                    systemProductName: "",
                    technicalIssue: "",
                    errorScreenshot: "",
                    deviceInformation: "",
                    email: "",
                    phone: "",
                    countryCode: "+1"
                });
                // Reset file input element if any
                const fileInput = document.getElementById("errorScreenshotInput");
                if (fileInput) fileInput.value = "";
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setStatus("error");
            setErrorMsg("Could not reach the server. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section with Background */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${technical})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            World-Class Technical Excellence
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Our team of certified technical experts combines deep industry knowledge with cutting-edge solutions to drive your success
                        </p>
                        {/* <Link to="/team/connect-experts">
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                                Connect with Our Experts
                            </button>
                        </Link> */}
                    </div>
                </div>
            </div>

            {/* About Our Expertise */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">About Our Team</span>
                            <h2 className="text-4xl sm:text-5xl font-black mb-8 text-slate-900 leading-tight">Expert Solutions for Complex Challenges</h2>
                            <p className="text-slate-700 mb-5 text-lg leading-relaxed">
                                Our technical experts bring extensive experience across multiple industries and technologies. We specialize in delivering innovative solutions that address your most pressing business challenges.
                            </p>
                            <p className="text-slate-700 mb-10 text-lg leading-relaxed">
                                With a proven track record of successful implementations and a deep understanding of emerging technologies, our team is equipped to guide your organization through digital transformation.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-bold text-lg">25+ Years Combined Experience</span>
                                        <p className="text-slate-600 text-sm">Proven expertise across diverse sectors</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-bold text-lg">Industry Certifications & Training</span>
                                        <p className="text-slate-600 text-sm">Latest certifications and continuous learning</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-bold text-lg">Dedicated Support & Guidance</span>
                                        <p className="text-slate-600 text-sm">24/7 assistance and consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative grid grid-cols-2 gap-4">
                            <div className="col-span-2 relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-2 shadow-2xl overflow-hidden border border-slate-100">
                                <img src={workImg} alt="Technical Team Meeting" className="rounded-xl w-full object-cover h-64 shadow-inner" />
                            </div>
                            <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-2 shadow-2xl overflow-hidden border border-slate-100 hover:scale-105 transition-transform duration-300">
                                <img src={cityImg} alt="Team Discussion" className="rounded-xl w-full object-cover h-40 shadow-inner" />
                            </div>
                            <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-2 shadow-2xl overflow-hidden border border-slate-100 hover:scale-105 transition-transform duration-300">
                                <img src={collabImg} alt="Technical Planning" className="rounded-xl w-full object-cover h-40 shadow-inner" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Expertise Areas */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        {/*  */}
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">Targeted Expertise Areas</h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                            Our specialists deliver customized solutions across multiple domains
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-blue-500/30">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">Enterprise Architecture</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Design and implement scalable enterprise solutions with cloud-native architectures and microservices integration
                            </p>
                            <button onClick={(e) => { e.preventDefault(); toggleCard(1); }} className="inline-flex items-center text-blue-300 font-bold hover:text-white transition-colors cursor-pointer focus:outline-none">
                                {openCard === 1 ? 'Show Less' : 'Learn More'} <span className={`ml-2 transform transition-transform duration-300 ${openCard === 1 ? '-rotate-90' : ''}`}>→</span>
                            </button>
                            {openCard === 1 && (
                                <ul className="mt-4 space-y-2 text-blue-100 text-sm list-disc list-inside">
                                    <li>Microservices System Design</li>
                                    <li>Legacy System Modernization</li>
                                </ul>
                            )}
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-cyan-500/30">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Cloud className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">Cloud Migration</h3>
                            <p className="text-cyan-100 mb-6 leading-relaxed">
                                Seamless transition to cloud platforms with minimal disruption, ensuring security, performance, and cost optimization
                            </p>
                            <button onClick={(e) => { e.preventDefault(); toggleCard(2); }} className="inline-flex items-center text-cyan-300 font-bold hover:text-white transition-colors cursor-pointer focus:outline-none">
                                {openCard === 2 ? 'Show Less' : 'Learn More'} <span className={`ml-2 transform transition-transform duration-300 ${openCard === 2 ? '-rotate-90' : ''}`}>→</span>
                            </button>
                            {openCard === 2 && (
                                <ul className="mt-4 space-y-2 text-cyan-100 text-sm list-disc list-inside">
                                    <li>Multi-Cloud Strategies</li>
                                    <li>Zero-Downtime Migration Execution</li>
                                </ul>
                            )}
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-indigo-500/30">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white">Security & Compliance</h3>
                            <p className="text-indigo-100 mb-6 leading-relaxed">
                                Comprehensive security frameworks and compliance solutions protecting your digital assets and data integrity
                            </p>
                            <button onClick={(e) => { e.preventDefault(); toggleCard(3); }} className="inline-flex items-center text-indigo-300 font-bold hover:text-white transition-colors cursor-pointer focus:outline-none">
                                {openCard === 3 ? 'Show Less' : 'Learn More'} <span className={`ml-2 transform transition-transform duration-300 ${openCard === 3 ? '-rotate-90' : ''}`}>→</span>
                            </button>
                            {openCard === 3 && (
                                <ul className="mt-4 space-y-2 text-indigo-100 text-sm list-disc list-inside">
                                    <li>Zero-Trust Implementations</li>
                                    <li>ISO & SOC2 Readiness Audits</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-white">
                            Proven Excellence
                        </h2>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Figures that strengthen our commitment to go above and beyond</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="group relative bg-gradient-to-br from-primary/10 to-primary-light/10 border border-blue-500/30 rounded-2xl p-12 hover:border-blue-400/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 rounded-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-3">
                                    500+
                                </p>
                                <p className="text-xl font-bold text-slate-200">Successfully Delivered Projects</p>
                                <p className="text-slate-400 text-sm mt-2">Proven track record of excellence</p>
                            </div>
                        </div>
                        <div className="group relative bg-gradient-to-br from-cyan-600/10 to-cyan-800/10 border border-cyan-500/30 rounded-2xl p-12 hover:border-cyan-400/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-cyan-500/0 group-hover:from-cyan-600/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300"></div>
                            <div className="relative">
                                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-3">
                                    10M+
                                </p>
                                <p className="text-xl font-bold text-slate-200">Lives Positively Impacted</p>
                                <p className="text-slate-400 text-sm mt-2">Global reach and influence</p>
                            </div>
                        </div>
                        <div className="group relative bg-gradient-to-br from-primary/10 to-primary-dark/10 border border-primary/30 rounded-2xl p-12 hover:border-primary-light/60 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/5 rounded-2xl transition-all duration-300"></div>
                            <div className="relative">
                               <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-3">
                                    50+
                                </p>
                                <p className="text-xl font-bold text-slate-200">Certified Experts</p>
                                <p className="text-slate-400 text-sm mt-2">Highly qualified professionals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Meet the Team</span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">Our Technical Experts</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Our team comprises industry veterans with deep expertise across various technical domains
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Expert Card 1 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src={m1Img} alt="John Mitchell" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">John Mitchell</h3>
                                <p className="text-blue-600 font-bold mb-3">Lead Cloud Architect</p>
                                <p className="text-slate-600 text-sm leading-relaxed">15+ years in cloud infrastructure and enterprise solutions</p>
                            </div>
                        </div>

                        {/* Expert Card 2 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src={g1Img} alt="Sarah Anderson" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">Sarah Anderson</h3>
                                <p className="text-blue-600 font-bold mb-3">Security Specialist</p>
                                <p className="text-slate-600 text-sm leading-relaxed">12+ years in cybersecurity and compliance frameworks</p>
                            </div>
                        </div>

                        {/* Expert Card 3 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src={g2Img} alt="David Chen" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">David Chen</h3>
                                <p className="text-blue-600 font-bold mb-3">Data Solutions Lead</p>
                                <p className="text-slate-600 text-sm leading-relaxed">10+ years in big data analytics and AI implementation</p>
                            </div>
                        </div>

                        {/* Expert Card 4 */}
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-72">
                                <img src={g3Img} alt="Emily Rodriguez" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">Emily Rodriguez</h3>
                                <p className="text-blue-600 font-bold mb-3">DevOps Architect</p>
                                <p className="text-slate-600 text-sm leading-relaxed">9+ years in infrastructure automation and CI/CD pipelines</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        {/* Form Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-4xl font-black mb-4 text-white">Technical Assistance Form</h3>
                            <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                                Connect with our technical experts to discuss your specific challenges and discover tailored solutions for your business.
                            </p>
                            <div className="bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm mt-8">
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div>
                                        <input type="text" name="systemProductName" value={form.systemProductName} onChange={handleChange} placeholder="System/Product Name" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500 bg-white" required />
                                    </div>
                                    <div>
                                        <textarea name="technicalIssue" value={form.technicalIssue} onChange={handleChange} placeholder="Technical Issue" rows="4" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500 bg-white resize-none" required></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-2">Error Screenshot</label>
                                        <input type="file" id="errorScreenshotInput" accept="image/*" onChange={handleFileChange} className="w-full px-5 py-3 rounded-xl text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-white/10 border border-white/10" />
                                    </div>
                                    <div>
                                        <input type="text" name="deviceInformation" value={form.deviceInformation} onChange={handleChange} placeholder="Device Information" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500 bg-white" required />
                                    </div>
                                    <div>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="w-full px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500 bg-white" required />
                                    </div>
                                    <div className="flex gap-4">
                                        <select
                                            name="countryCode"
                                            value={form.countryCode}
                                            onChange={handleChange}
                                            className="w-1/3 px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition bg-white"
                                        >
                                            {[
                                                { code: "+91", label: "+91 (IN)", name: "India" },
                                                { code: "+1", label: "+1 (US)", name: "United States" },
                                                { code: "+44", label: "+44 (GB)", name: "United Kingdom" },
                                                { code: "+61", label: "+61 (AU)", name: "Australia" },
                                                { code: "+1", label: "+1 (CA)", name: "Canada" },
                                                { code: "+971", label: "+971 (AE)", name: "United Arab Emirates" },
                                                { code: "+966", label: "+966 (SA)", name: "Saudi Arabia" },
                                                { code: "+65", label: "+65 (SG)", name: "Singapore" },
                                                { code: "+64", label: "+64 (NZ)", name: "New Zealand" },
                                                { code: "+27", label: "+27 (ZA)", name: "South Africa" },
                                                { code: "+93", label: "+93 (AF)", name: "Afghanistan" },
                                                { code: "+880", label: "+880 (BD)", name: "Bangladesh" },
                                                { code: "+975", label: "+975 (BT)", name: "Bhutan" },
                                                { code: "+86", label: "+86 (CN)", name: "China" },
                                                { code: "+62", label: "+62 (ID)", name: "Indonesia" },
                                                { code: "+98", label: "+98 (IR)", name: "Iran" },
                                                { code: "+964", label: "+964 (IQ)", name: "Iraq" },
                                                { code: "+972", label: "+972 (IL)", name: "Israel" },
                                                { code: "+81", label: "+81 (JP)", name: "Japan" },
                                                { code: "+962", label: "+962 (JO)", name: "Jordan" },
                                                { code: "+965", label: "+965 (KW)", name: "Kuwait" },
                                                { code: "+60", label: "+60 (MY)", name: "Malaysia" },
                                                { code: "+960", label: "+960 (MV)", name: "Maldives" },
                                                { code: "+977", label: "+977 (NP)", name: "Nepal" },
                                                { code: "+968", label: "+968 (OM)", name: "Oman" },
                                                { code: "+92", label: "+92 (PK)", name: "Pakistan" },
                                                { code: "+63", label: "+63 (PH)", name: "Philippines" },
                                                { code: "+974", label: "+974 (QA)", name: "Qatar" },
                                                { code: "+82", label: "+82 (KR)", name: "South Korea" },
                                                { code: "+94", label: "+94 (LK)", name: "Sri Lanka" },
                                                { code: "+66", label: "+66 (TH)", name: "Thailand" },
                                                { code: "+90", label: "+90 (TR)", name: "Turkey" },
                                                { code: "+84", label: "+84 (VN)", name: "Vietnam" },
                                                { code: "+355", label: "+355 (AL)", name: "Albania" },
                                                { code: "+43", label: "+43 (AT)", name: "Austria" },
                                                { code: "+32", label: "+32 (BE)", name: "Belgium" },
                                                { code: "+359", label: "+359 (BG)", name: "Bulgaria" },
                                                { code: "+385", label: "+385 (HR)", name: "Croatia" },
                                                { code: "+357", label: "+357 (CY)", name: "Cyprus" },
                                                { code: "+420", label: "+420 (CZ)", name: "Czech Republic" },
                                                { code: "+45", label: "+45 (DK)", name: "Denmark" },
                                                { code: "+358", label: "+358 (FI)", name: "Finland" },
                                                { code: "+33", label: "+33 (FR)", name: "France" },
                                                { code: "+49", label: "+49 (DE)", name: "Germany" },
                                                { code: "+30", label: "+30 (GR)", name: "Greece" },
                                                { code: "+36", label: "+36 (HU)", name: "Hungary" },
                                                { code: "+354", label: "+354 (IS)", name: "Iceland" },
                                                { code: "+353", label: "+353 (IE)", name: "Ireland" },
                                                { code: "+39", label: "+39 (IT)", name: "Italy" },
                                                { code: "+31", label: "+31 (NL)", name: "Netherlands" },
                                                { code: "+47", label: "+47 (NO)", name: "Norway" },
                                                { code: "+48", label: "+48 (PL)", name: "Poland" },
                                                { code: "+351", label: "+351 (PT)", name: "Portugal" },
                                                { code: "+40", label: "+40 (RO)", name: "Romania" },
                                                { code: "+7", label: "+7 (RU)", name: "Russia" },
                                                { code: "+34", label: "+34 (ES)", name: "Spain" },
                                                { code: "+46", label: "+46 (SE)", name: "Sweden" },
                                                { code: "+41", label: "+41 (CH)", name: "Switzerland" },
                                                { code: "+380", label: "+380 (UA)", name: "Ukraine" },
                                                { code: "+213", label: "+213 (DZ)", name: "Algeria" },
                                                { code: "+20", label: "+20 (EG)", name: "Egypt" },
                                                { code: "+233", label: "+233 (GH)", name: "Ghana" },
                                                { code: "+254", label: "+254 (KE)", name: "Kenya" },
                                                { code: "+212", label: "+212 (MA)", name: "Morocco" },
                                                { code: "+234", label: "+234 (NG)", name: "Nigeria" },
                                                { code: "+255", label: "+255 (TZ)", name: "Tanzania" },
                                                { code: "+256", label: "+256 (UG)", name: "Uganda" },
                                                { code: "+54", label: "+54 (AR)", name: "Argentina" },
                                                { code: "+55", label: "+55 (BR)", name: "Brazil" },
                                                { code: "+56", label: "+56 (CL)", name: "Chile" },
                                                { code: "+57", label: "+57 (CO)", name: "Colombia" },
                                                { code: "+52", label: "+52 (MX)", name: "Mexico" },
                                                { code: "+51", label: "+51 (PE)", name: "Peru" },
                                                { code: "+58", label: "+58 (VE)", name: "Venezuela" },
                                                { code: "+679", label: "+679 (FJ)", name: "Fiji" },
                                                { code: "+675", label: "+675 (PG)", name: "Papua New Guinea" }
                                            ].map((country, idx) => (
                                                <option key={idx} value={country.code} title={country.name}>
                                                    {country.label}
                                                </option>
                                            ))}
                                        </select>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-2/3 flex-1 px-5 py-4 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition placeholder-slate-500 bg-white" required />
                                    </div>
                                    {status === "success" && (
                                        <p className="p-4 bg-green-500/20 text-green-300 rounded-xl font-bold border border-green-500/30">✅ Request sent successfully! We'll get back to you soon.</p>
                                    )}
                                    {status === "error" && (
                                        <p className="p-4 bg-red-500/20 text-red-300 rounded-xl font-bold border border-red-500/30">❌ {errorMsg}</p>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button type="submit" disabled={status === "loading"} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-xl transition transform hover:scale-105 shadow-2xl disabled:opacity-50">
                                            {status === "loading" ? "SENDING..." : "Request Expert Consultation"}
                                        </button>
                                        <button type="button" onClick={handleReset} className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all font-black">
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h3 className="text-4xl font-black mb-10 text-white">The answers to your main questions</h3>
                            <div className="space-y-5">
                                <div className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 cursor-pointer border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                                    <p className="font-black text-white text-lg mb-3 group-hover:text-blue-300 transition">What is technical expertise?</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">Our experts provide specialized knowledge and consulting services across cloud, security, and enterprise solutions tailored to your needs.</p>
                                </div>
                                <div className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 cursor-pointer border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                                    <p className="font-black text-white text-lg mb-3 group-hover:text-blue-300 transition">How can we assess your needs?</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">We conduct comprehensive assessments of your current infrastructure and business requirements to create a strategic roadmap.</p>
                                </div>
                                <div className="group bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-all duration-300 cursor-pointer border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                                    <p className="font-black text-white text-lg mb-3 group-hover:text-blue-300 transition">What is our commitment?</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">We're dedicated to delivering measurable results and long-term success for your organization through expert guidance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Knowledge Center</span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">Latest Technical Insights</h2>
                        <p className="text-slate-600 text-lg">
                            Stay updated with industry trends and expert perspectives
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-56">
                                <img src={articlesImg} alt="Whitepaper" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">WHITEPAPER</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">Cloud Migration Best Practices 2024</h3>
                                <p className="text-slate-600 leading-relaxed">Comprehensive guide to planning and executing successful cloud transitions with minimal risk</p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-56">
                                <img src={businessImg} alt="Case Study" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-4 h-4 text-purple-700" />
                                    </div>
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">CASE STUDY</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">Enterprise Security Transformation</h3>
                                <p className="text-slate-600 leading-relaxed">How we helped a global enterprise strengthen their security posture and compliance framework</p>
                            </div>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-slate-100">
                            <div className="relative overflow-hidden h-56">
                                <img src={ecoImg} alt="Webinar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                                        <Video className="w-4 h-4 text-cyan-700" />
                                    </div>
                                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">WEBINAR</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">AI and Machine Learning in Enterprise</h3>
                                <p className="text-slate-600 leading-relaxed">Explore practical applications of AI for modern business solutions and digital transformation</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/resources/blogs">
                            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 px-10 rounded-xl transition transform hover:scale-105 shadow-2xl">
                                View All Resources
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
