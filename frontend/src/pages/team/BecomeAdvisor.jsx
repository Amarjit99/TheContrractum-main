import { useState } from "react";
import { Send, UserPlus, Briefcase, GraduationCap, Globe, CheckCircle } from "lucide-react";
import { COUNTRIES } from "../../constants/countries";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function BecomeAdvisor() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        countryIndex: 0,
        linkedin: "",
        domain: "",
        experience: "",
        currentOrg: "",
        achievements: "",
        interestStatement: ""
    });
    const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleReset = () => {
        setForm({
            fullName: "",
            email: "",
            phone: "",
            countryIndex: 0,
            linkedin: "",
            domain: "",
            experience: "",
            currentOrg: "",
            achievements: "",
            interestStatement: ""
        });
        setStatus(null);
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const phoneWithCode = `${COUNTRIES[form.countryIndex].code} ${form.phone}`;
        const submissionData = { ...form, phone: phoneWithCode };

        try {
            const res = await fetch(`${API_URL}/api/advisor-applications`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                // Don't clear form immediately so they can see what they sent, 
                // or clear it if that's preferred. Usually clearing is best on success.
                // handleReset(); // Optional: uncomment if you want to keep data visible for a moment
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

    if (status === "success") {
        return (
            <div className="min-h-screen bg-slate-50 py-20 px-4 flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center border border-green-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">Application Received!</h1>
                    <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                        Thank you for your interest in joining our advisory board, <span className="font-bold text-indigo-600">{form.fullName}</span>.
                        Our executive committee will review your credentials and contact you within 5-7 business days.
                    </p>
                    <button
                        onClick={handleReset}
                        className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-black py-4 px-10 rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-5 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-black uppercase tracking-wider mb-6 border border-purple-200 shadow-sm">
                        Join Our Advisory Board
                    </span>
                    <h1 className="text-5xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Apply to Become an Industry Advisor</h1>
                    <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto">
                        We are actively seeking visionary leaders and seasoned experts to join our strategic advisory board. Please formally submit your professional credentials below.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-10 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <Briefcase className="w-8 h-8 text-purple-300" />
                            <h2 className="text-3xl font-bold">Formal Application Form</h2>
                        </div>
                        <p className="text-purple-100 text-lg">
                            Ensure all details match your current professional records. Our executive committee reviews applications thoroughly.
                        </p>
                    </div>

                    <form className="p-10 space-y-10" onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
                                <UserPlus className="text-indigo-500 w-6 h-6" /> Personal Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Legal Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg" placeholder="Dr. John Doe" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Professional Email Address <span className="text-red-500">*</span></label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg" placeholder="john.doe@company.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                                    <div className="flex gap-2">
                                        <select
                                            name="countryIndex"
                                            value={form.countryIndex}
                                            onChange={handleChange}
                                            className="w-32 px-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 transition-all bg-white font-bold appearance-none cursor-pointer"
                                        >
                                            {COUNTRIES.map((c, i) => (
                                                <option key={i} value={i}>{c.code} ({c.iso})</option>
                                            ))}
                                        </select>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="flex-1 px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg" placeholder="555-000-0000" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn Profile URL</label>
                                    <input type="url" name="linkedin" value={form.linkedin} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg" placeholder="https://linkedin.com/in/johndoe" />
                                </div>
                            </div>
                        </div>

                        {/* Professional Background Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4 mt-8">
                                <GraduationCap className="text-indigo-500 w-6 h-6" /> Professional Expertise
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Primary Domain / Industry <span className="text-red-500">*</span></label>
                                    <select name="domain" value={form.domain} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg bg-white" required>
                                        <option value="" disabled>Select your core domain...</option>
                                        <option value="fintech">FinTech & Blockchain</option>
                                        <option value="cloud">Cloud Architecture</option>
                                        <option value="cybersecurity">Cybersecurity & Compliance</option>
                                        <option value="govtech">GovTech & Public Sector</option>
                                        <option value="ai">Artificial Intelligence</option>
                                        <option value="other">Other / Multi-disciplinary</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Years of Executive Experience <span className="text-red-500">*</span></label>
                                    <select name="experience" value={form.experience} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg bg-white" required>
                                        <option value="" disabled>Select experience level...</option>
                                        <option value="0-5">0 - 5 Years</option>
                                        <option value="5-10">5 - 10 Years</option>
                                        <option value="10-15">10 - 15 Years</option>
                                        <option value="15-20">15 - 20 Years</option>
                                        <option value="20-30">20 - 30 Years</option>
                                        <option value="30+">30+ Years</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Current or Most Recent Organization & Title <span className="text-red-500">*</span></label>
                                    <input type="text" name="currentOrg" value={form.currentOrg} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg" placeholder="e.g. Chief Strategy Officer at Global Tech Inc." required />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Notable Achievements or Board Positions</label>
                                    <textarea name="achievements" value={form.achievements} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg min-h-[120px]" placeholder="Briefly list any significant achievements, prior advisory roles, or published works..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Motivation Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4 mt-8">
                                <Globe className="text-indigo-500 w-6 h-6" /> Statement of Interest
                            </h3>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Why do you want to advise The Contrractum? <span className="text-red-500">*</span></label>
                                <textarea name="interestStatement" value={form.interestStatement} onChange={handleChange} className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition text-slate-900 text-lg min-h-[180px]" placeholder="Please provide a detailed paragraph explaining your motivation and how your specific expertise aligns with our company vision..." required></textarea>
                            </div>
                        </div>

                        {/* Status Messages */}
                        {status === "error" && (
                            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold">
                                ❌ {errorMsg}
                            </div>
                        )}

                        {/* Submit Actions */}
                        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="flex-[2] bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-black py-5 rounded-2xl transition-all transform hover:scale-[1.02] shadow-xl hover:shadow-2xl text-xl flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                <Send className="w-6 h-6" /> {status === "loading" ? "SUBMITTING..." : "Submit Advisory Application"}
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-black py-5 rounded-2xl hover:bg-slate-50 transition-all text-xl"
                            >
                                Reset Form
                            </button>
                        </div>

                        <p className="text-center text-slate-500 text-sm">
                            By submitting this form, you acknowledge that our executive committee will review your detailed credentials. You will be contacted within 5-7 business days if selected for an initial interview.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
