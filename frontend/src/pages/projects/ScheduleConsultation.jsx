import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { COUNTRIES } from '../../constants/countries';

export default function ScheduleConsultation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryIndex: 0,
        company: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const phoneWithCode = `${COUNTRIES[formData.countryIndex].code} ${formData.phone}`;
            const submissionData = { ...formData, phone: phoneWithCode };
            const response = await fetch(`${API}/api/expert-consultations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({ name: '', email: '', company: '' });
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                const data = await response.json();
                setError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative text-white h-[500px] md:h-[600px] overflow-hidden bg-slate-900 border-b-8 border-blue-600" style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=1920&h=600&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-blue-500/20 text-blue-300 font-bold px-4 py-2 rounded-full mb-6 tracking-wider border border-blue-500/30">
                            Enterprise Consultation
                        </span>
                        <h1 className="text-4xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl text-white">
                            Strategic Planning for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                Digital Innovation
                            </span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-10 leading-relaxed drop-shadow-lg font-light">
                            Engage directly with our architects to map the path from legacy infrastructure to a scalable digital future. No sales pitches—just actionable engineering strategy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Philosophy & Form Section */}
            <section className="py-24 px-6 lg:px-8 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* Content Column */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-10 border-b-4 border-blue-200 inline-block pb-4">
                                The Consultation Framework
                            </h2>

                            <p className="text-xl text-slate-700 leading-loose mb-8 font-serif">
                                A typical technology consultation focuses primarily on vendor lock-in and immediate deployment. Our agenda is different. We structure our consultations around the long-term mathematical viability of your enterprise architecture.
                            </p>
                            <p className="text-lg text-slate-700 leading-loose mb-12">
                                During our engagement, we will analyze your current code repositories, evaluate your database scaling limits, and model potential cloud expenditure over a five-year horizon.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "System Architecture Audits", desc: "Before we write a single line of code, our lead architects map your entire data flow." },
                                    { title: "Agile Migration Roadmaps", desc: "We design phased, non-disruptive migration strategies from legacy systems." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="bg-blue-600 text-white p-2 rounded-lg h-fit">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Column */}
                        <div id="consultation-form" className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-slate-200 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black text-slate-900 mb-2">Schedule Your Session</h3>
                                <p className="text-slate-500 mb-8 font-medium">Select a time for a 30-minute strategic deep dive.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Business Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                        <div className="flex gap-2">
                                            <select
                                                name="countryIndex"
                                                value={formData.countryIndex}
                                                onChange={handleChange}
                                                className="w-32 px-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 transition-all bg-white font-bold appearance-none cursor-pointer"
                                            >
                                                {COUNTRIES.map((c, i) => (
                                                    <option key={i} value={i}>{c.code} ({c.iso})</option>
                                                ))}
                                            </select>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="XXXXX XXXXX"
                                                className="flex-1 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            name="company"
                                            required
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Acme Corp"
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none"
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-5 rounded-xl font-black text-white transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
                                            isSubmitting 
                                            ? 'bg-slate-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                                        }`}
                                    >
                                        {isSubmitting ? 'Requesting...' : (
                                            <>
                                                Request Free Consultation
                                                <Send size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                                <p className="text-slate-400 text-xs text-center mt-6">
                                    By clicking this button, you agree to our privacy policy and data governance standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Timeline with Images */}
            <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6">Execution Methodology</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">
                            How we transform abstract business goals into rigorous deployment schedules.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Process Steps */}
                        {[
                            {
                                phase: "Phase 01",
                                title: "Discovery & Technical Triage",
                                desc: "We align our engineering directors with your C-suite and technical leads to map strict performance conditions.",
                                img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&fit=crop"
                            },
                            {
                                phase: "Phase 02",
                                title: "Proof of Concept Engineering",
                                desc: "Before committing the full budget, we isolate highest-risk technical variables and build an MVP.",
                                img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&fit=crop",
                                reverse: true
                            },
                            {
                                phase: "Phase 03",
                                title: "Full Scale Production",
                                desc: "Upon PoC verification, we deploy our full engineering squads with two-week sprint cycles.",
                                img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&fit=crop"
                            }
                        ].map((step, i) => (
                            <div key={i} className={`flex flex-col md:flex-row ${step.reverse ? 'md:flex-row-reverse' : ''} items-stretch bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-colors`}>
                                <div className="md:w-2/5 relative min-h-[300px]">
                                    <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="md:w-3/5 p-12 flex flex-col justify-center">
                                    <span className="text-blue-400 font-bold tracking-widest uppercase mb-2">{step.phase}</span>
                                    <h3 className="text-3xl font-bold mb-6">{step.title}</h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"></div>
                    <div className="relative bg-white rounded-3xl p-10 shadow-2xl max-w-md w-full text-center border-4 border-blue-500 animate-bounce-in">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4">Request Sent!</h3>
                        <p className="text-slate-600 mb-8 text-lg font-medium">An expert advisor will review your request and contact you within 24 hours to schedule the deep-dive.</p>
                        <button 
                            onClick={() => setShowSuccess(false)}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                        >
                            Got it
                        </button>
                    </div>
                    <style>{`
                        @keyframes bounce-in {
                            0% { opacity: 0; transform: scale(0.3); }
                            50% { opacity: 1; transform: scale(1.05); }
                            70% { transform: scale(0.9); }
                            100% { transform: scale(1); }
                        }
                        .animate-bounce-in {
                            animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}
