import { useState } from "react";
import { toast } from "react-hot-toast";
import { CheckCircle, Shield, Globe, Cpu, Lightbulb, Zap, TrendingUp, Layers } from "lucide-react";

export default function ConnectExperts() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [consultationTopic, setConsultationTopic] = useState("");
    const [preferredSchedule, setPreferredSchedule] = useState("");
    const [contactDetails, setContactDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const response = await fetch(`${API}/api/expert-consultations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    company,
                    consultationTopic,
                    preferredSchedule,
                    contactDetails
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Consultation request submitted successfully!");
                setName("");
                setEmail("");
                setCompany("");
                setConsultationTopic("");
                setPreferredSchedule("");
                setContactDetails("");
            } else {
                toast.error(data.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            console.error("Expert consultation submission error:", err);
            toast.error("Failed to connect to server. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section with Background */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-400/30 backdrop-blur-sm shadow-2xl">
                            Expert Consultation
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            Connect with Our Experts
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl leading-relaxed max-w-3xl drop-shadow-2xl">
                            Reach out to our world-class technical specialists for tailored solutions to your complex business challenges. We bring visionary thinking and disciplined execution.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Expertise Areas */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">Core Domains</span>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">Areas of Specialized Knowledge</h2>
                        <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
                            Our team is composed of industry veterans specializing in the most critical technological domains defining modern business. Connecting with our experts gives you direct access to this knowledge.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Domain 1 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Cpu className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Cloud Architecture</h3>
                            <p className="text-slate-600 leading-relaxed">Designing resilient, highly-available cloud infrastructures tailored for extreme scale and global reach.</p>
                        </div>
                        {/* Domain 2 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
                            <p className="text-slate-600 leading-relaxed">Implementing Zero-Trust frameworks and comprehensive threat detection tailored for enterprise needs.</p>
                        </div>
                        {/* Domain 3 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Lightbulb className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">AI & Automation</h3>
                            <p className="text-slate-600 leading-relaxed">Driving business efficiency through predictive modeling, machine learning, and workflow automation.</p>
                        </div>
                        {/* Domain 4 */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-cyan-300 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Layers className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Data Engineering</h3>
                            <p className="text-slate-600 leading-relaxed">Building massive data lakes, real-time analytics pipelines, and actionable intelligence dashboards.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Methodology Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-900/50 text-blue-300 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-500/30">Process & Execution</span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-6">How Our Experts Partner With You</h2>
                        <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                            Connecting with our team is the first step in a proven methodology designed to transform your operations from the ground up.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <div>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 mb-4 opacity-70">
                                01
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Discovery & Audit</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                When you reach out, our specialists begin by deeply understanding your current landscape. We audit existing architectures, pinpoint inefficiencies, and clarify your strategic business objectives before proposing any technical interventions.
                            </p>
                        </div>
                        <div>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600 mb-4 opacity-70">
                                02
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Solution Design</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Using the insights gathered, our technical architects draft an end-to-end blueprint. This roadmap outlines toolchains, cloud infrastructure requirements, security protocols, and phased implementation schedules tailored to your constraints.
                            </p>
                        </div>
                        <div>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-emerald-500 mb-4 opacity-70">
                                03
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Seamless Integration</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Our engineers work alongside your teams to deploy the new systems. We emphasize zero-downtime migrations, comprehensive team training, and robust monitoring to ensure an immediate positive impact on your day-to-day operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Global Enterprises Trust Us */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-blue-50 border-y border-blue-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-8 leading-tight">Why Industry Leaders Trust Our Experts</h2>
                            <p className="text-slate-600 text-xl leading-relaxed mb-6">
                                We pride ourselves on delivering more than just code. We deliver strategic advantages that place our clients ahead of the curve.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Engaging with our team gives you an uncompromised commitment to quality, backed by years of managing billion-dollar digital overhauls across healthcare, finance, and logistics sectors.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-1">Tailored, Not Templated</h4>
                                        <p className="text-slate-600">Every solution is uniquely crafted around your specific proprietary needs.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-1">Future-Proof Technologies</h4>
                                        <p className="text-slate-600">We utilize modern, sustainable stacks to prevent technical debt down the line.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-1">Unwavering Support</h4>
                                        <p className="text-slate-600">Our SLA-backed maintenance ensures your systems remain operational 24/7/365.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-indigo-400 rounded-3xl transform rotate-3 opacity-30 shadow-inner"></div>
                            <img
                                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1000"
                                alt="Professionals discussing strategy"
                                className="relative z-10 rounded-3xl shadow-2xl w-full object-cover h-[600px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section with Expert Consultation Form */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Left Side: Contact Information */}
                        <div className="lg:col-span-5 space-y-8 text-left">
                            <div>
                                <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-200">
                                    Start the Conversation
                                </span>
                                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">We're Ready to Help</h2>
                                <p className="text-slate-650 text-lg leading-relaxed">
                                    Get in touch with our technical team today. We look forward to exploring how we can drive your success with cutting-edge expertise and strategic guidance.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Direct Email</h3>
                                    <p className="text-slate-800 text-lg font-medium mb-1">experts@thecontractum.com</p>
                                    <p className="text-slate-500 text-sm">We typically respond within 24 hours to all business inquiries.</p>
                                </div>
                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Direct Phone</h3>
                                    <p className="text-slate-800 text-lg font-medium mb-1">+1 (555) 123-4567</p>
                                    <p className="text-slate-500 text-sm">Available Mon-Fri, 9am - 5pm EST for immediate assistance.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Global Headquarters</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">123 Innovation Drive, Tech District<br />San Francisco, CA 94105</p>
                                </div>
                                <Globe className="w-12 h-12 text-blue-400 opacity-80 shrink-0" />
                            </div>
                        </div>

                        {/* Right Side: Expert Consultation Form */}
                        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-2xl relative animate-fade-in">
                            <div className="mb-6">
                                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">Expert Consultation Form</h3>
                                <p className="text-slate-500 text-sm font-medium">Please supply your details below and an expert will follow up within 24 hours.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="Your Name"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm font-semibold shadow-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm font-semibold shadow-xs"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Organization</label>
                                        <input
                                            type="text"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            required
                                            placeholder="Company Name"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm font-semibold shadow-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Preferred Schedule</label>
                                        <select
                                            value={preferredSchedule}
                                            onChange={(e) => setPreferredSchedule(e.target.value)}
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm font-semibold shadow-xs cursor-pointer"
                                        >
                                            <option value="" disabled>Select Date/Time Window</option>
                                            <option value="Morning (9am - 12pm EST)">Morning (9am - 12pm EST)</option>
                                            <option value="Afternoon (12pm - 3pm EST)">Afternoon (12pm - 3pm EST)</option>
                                            <option value="Late Afternoon (3pm - 5pm EST)">Late Afternoon (3pm - 5pm EST)</option>
                                            <option value="Flexible Weekdays">Flexible Weekdays</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Consultation Topic</label>
                                    <input
                                        type="text"
                                        value={consultationTopic}
                                        onChange={(e) => setConsultationTopic(e.target.value)}
                                        required
                                        placeholder="e.g. Zero-Trust Cloud Architecture Migration"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm font-semibold shadow-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">Contact Details & Inquiry Details</label>
                                    <textarea
                                        value={contactDetails}
                                        onChange={(e) => setContactDetails(e.target.value)}
                                        required
                                        rows={4}
                                        placeholder="Provide your phone number or any relevant project specs for the experts..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all text-sm font-semibold shadow-xs resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-98 transition-all shadow-md text-sm cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? "Scheduling..." : "Submit Consultation Request"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
