import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { COUNTRIES } from '../../constants/countries';
import p25 from "../../assets/p25.webp";
import p26 from "../../assets/p26.webp";
import p27 from "../../assets/p27.webp";
import p28 from "../../assets/p28.webp";
import p29 from "../../assets/p29.webp";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Volunteer() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        countryIndex: 0,
        skills: [],
        interests: ''
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        const phoneWithCode = `${COUNTRIES[formData.countryIndex].code} ${formData.phone}`;
        const submissionData = { ...formData, phone: phoneWithCode };

        try {
            const resp = await fetch(`${API}/api/public/volunteer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });
            if (resp.ok) {
                setStatus({ loading: false, success: true, error: null });
                setFormData({ fullName: '', email: '', phone: '', countryIndex: 0, skills: [], interests: '' });
            } else {
                throw new Error("Failed to submit application");
            }
        } catch (err) {
            setStatus({ loading: false, success: false, error: "Submission failed. Please try again." });
        }
    };
    const opportunities = [
        {
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
            title: "Technical Volunteering",
            desc: "Contribute your technical skills to build solutions for social impact."
        },
        {
            image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop",
            title: "Mentoring & Training",
            desc: "Guide students and young professionals in technology and career development."
        },
        {
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
            title: "Community Outreach",
            desc: "Conduct workshops and awareness programs in underserved communities."
        },
        {
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
            title: "Education Programs",
            desc: "Teach coding and tech skills to underprivileged youth and adults."
        },
    ];

    const impacts = [
        { number: "50K+", label: "Lives Impacted" },
        { number: "200+", label: "Active Volunteers" },
        { number: "15+", label: "Communities Served" },
        { number: "100+", label: "Workshops Conducted" },
    ];

    const benefits = [
        {
            image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=150&h=150&fit=crop",
            title: "Personal Growth",
            desc: "Develop new skills and gain valuable experience."
        },
        {
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop",
            title: "Network Building",
            desc: "Connect with like-minded professionals and mentors."
        },
        {
            image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=150&h=150&fit=crop",
            title: "Make Impact",
            desc: "Directly contribute to meaningful social change."
        },
        {
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop",
            title: "Recognition",
            desc: "Get recognized for your contributions and dedication."
        },
        {
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop",
            title: "Certifications",
            desc: "Earn certificates for your volunteer work."
        },
        {
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop",
            title: "Career Boost",
            desc: "Enhance your professional portfolio and resume."
        },
    ];

    const csrPrograms = [
        {
            name: "Digital Literacy Initiative",
            description: "Teaching digital skills to rural and underserved populations.",
            image: p27
        },
        {
            name: "STEM for Girls",
            description: "Encouraging girls to pursue careers in science and technology.",
            image: p28
        },
        {
            name: "Education for All",
            description: "Providing quality education resources to underprivileged children.",
            image: p29
        },
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Tech Volunteer",
            quote: "Volunteering with TheContrractum changed my perspective. I've learned so much while helping others discover their potential.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Rajesh Kumar",
            role: "Mentor",
            quote: "The mentoring program is incredibly rewarding. Seeing young people succeed is the best feeling anyone can experience.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Anjali Singh",
            role: "Community Outreach",
            quote: "Through this volunteer program, I've discovered my passion for education and community service. Highly recommended!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img src={p25} alt="Volunteer Hero" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 italic tracking-tight">
                        Impact <span className="text-teal-400">The World</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-200 font-medium leading-relaxed">
                        Join our global force for good. Your skills can change lives, build communities, and create a sustainable future for all.
                    </p>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-12 bg-white -mt-10 relative z-20 max-w-6xl mx-auto w-full px-6 rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {impacts.map((stat, idx) => (
                        <div key={idx} className="text-center group">
                            <h4 className="text-4xl font-black text-teal-600 mb-2 group-hover:scale-110 transition-transform">{stat.number}</h4>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Opportunities Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4 italic">Volunteering Opportunities</h2>
                    <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {opportunities.map((opt, idx) => (
                        <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:border-teal-300 transition-all group">
                            <div className="h-48 overflow-hidden">
                                <img src={opt.image} alt={opt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-black mb-3 text-slate-900">{opt.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4 italic">Why Volunteer With Us?</h2>
                        <p className="text-teal-400 font-bold uppercase tracking-widest text-xs">Unlock your potential while helping others</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex gap-6 group">
                                <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-teal-500/30 group-hover:border-teal-400 transition-all">
                                    <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                </div>
                                <div>
                                    <h4 className="font-black text-xl mb-2 text-white">{benefit.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CSR Programs */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 italic">Our CSR Initiatives</h2>
                        <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {csrPrograms.map((program, idx) => (
                            <div key={idx} className="relative h-[400px] rounded-[2.5rem] overflow-hidden group shadow-2xl">
                                <img src={program.image} alt={program.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <h3 className="text-2xl font-black text-white mb-2">{program.name}</h3>
                                    <p className="text-teal-300 text-sm font-medium">{program.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 italic">Volunteer Stories</h2>
                        <p className="text-slate-500 font-medium">Hear from those who are making a difference</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl relative group hover:-translate-y-2 transition-all">
                                <div className="absolute -top-6 left-10 w-16 h-16 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-6">
                                    <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.quote}"</p>
                                    <h4 className="font-black text-slate-900">{t.name}</h4>
                                    <p className="text-teal-600 font-bold text-xs uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="apply-now" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-slate-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-teal-500/20 transition-all"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-slate-900 mb-2">Volunteer Application Form</h3>
                            <p className="text-slate-500 mb-8 font-medium italic uppercase tracking-widest text-xs">Join our global network of change-makers</p>

                            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-600 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-600 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                    <div className="flex gap-2">
                                        <select
                                            name="countryIndex"
                                            value={formData.countryIndex}
                                            onChange={handleChange}
                                            className="w-32 border-2 border-slate-200 rounded-xl px-2 py-4 focus:border-teal-600 transition-all bg-white font-bold appearance-none cursor-pointer"
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
                                            className="flex-1 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-600 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Target Opportunity</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {["Technical Volunteering", "Mentoring & Training", "Community Outreach", "Education Programs"].map((skill) => (
                                            <label key={skill} className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${formData.skills.includes(skill) ? 'border-teal-600 bg-teal-50' : 'border-slate-100 bg-slate-50 hover:border-teal-200'}`}>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={formData.skills.includes(skill)}
                                                    onChange={() => {
                                                        const newSkills = formData.skills.includes(skill)
                                                            ? formData.skills.filter(s => s !== skill)
                                                            : [...formData.skills, skill];
                                                        setFormData({ ...formData, skills: newSkills });
                                                    }}
                                                />
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${formData.skills.includes(skill) ? 'bg-teal-600 border-teal-600' : 'border-slate-300 bg-white'}`}>
                                                    {formData.skills.includes(skill) && <CheckCircle size={14} className="text-white" />}
                                                </div>
                                                <span className={`text-sm font-bold ${formData.skills.includes(skill) ? 'text-teal-900' : 'text-slate-600'}`}>{skill}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Why do you want to volunteer? (Availability & Interests)</label>
                                    <textarea
                                        name="interests"
                                        rows="4"
                                        value={formData.interests}
                                        onChange={handleChange}
                                        placeholder="Tell us about your background and how many hours you can commit..."
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-600 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                {status.error && <p className="text-red-500 text-sm font-bold">{status.error}</p>}

                                <button
                                    type="submit"
                                    disabled={status.loading || status.success}
                                    className={`w-full py-5 rounded-2xl font-black text-white transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-teal-500/20 uppercase tracking-widest text-sm ${
                                        status.loading ? 'bg-slate-400 cursor-not-allowed' : 
                                        status.success ? 'bg-emerald-500' : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                                    }`}
                                >
                                    {status.loading ? 'Processing...' : status.success ? 'Application Sent ✓' : 'Submit Volunteer Application'}
                                </button>
                                {status.success && <p className="text-center text-emerald-600 font-bold text-xs mt-4 animate-pulse">Application received! We will contact you shortly.</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section – Professional */}
            <div className="bg-slate-900 text-white relative overflow-hidden text-center z-10 border-t border-slate-800">
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-color-dodge pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative z-20">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-xl tracking-tight">
                        Ready to Make an <span className="text-teal-400">Impact</span>?
                    </h2>

                    <p className="text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Become part of our vast global volunteer network and contribute your time, skills, and passion to initiatives that create massive, lasting change.
                    </p>

                    <a href="#apply-now">
                        <button className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-extrabold px-10 py-5 rounded-2xl shadow-cyan-500/20 shadow-2xl hover:shadow-cyan-500/40 hover:-translate-y-2 transition-all duration-300 transform tracking-widest uppercase text-sm md:text-base border border-teal-300/30">
                            Apply as Volunteer
                        </button>
                    </a>
                </div>
            </div>

        </div>
    );
}
