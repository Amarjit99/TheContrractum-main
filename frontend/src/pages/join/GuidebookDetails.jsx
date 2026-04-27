import React from 'react';

export default function GuidebookDetails() {
    const handleDownload = () => {
        alert("Downloading Startup Guidebook PDF...");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Hero Section */}
            <section
                className="relative py-32 px-6 lg:px-20 bg-cover bg-center flex items-center justify-center text-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=800&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-slate-900/85"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
                        Ultimate Startup Guidebook
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto mb-10">
                        Everything you need to know from taking your idea to the market, securing funding, and scaling your operations.
                    </p>
                    <button
                        onClick={handleDownload}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center gap-3 mx-auto"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download PDF Now
                    </button>
                </div>
            </section>

            {/* Guidebook Specifics */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row -mt-16 relative z-20">
                    <div className="md:w-1/3 bg-slate-800 p-10 flex flex-col justify-center text-white">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg">
                            📖
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Inside the Book</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> 100+ Pages of Content
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> 15 Expert Case Studies
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> Pitch Deck Templates
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary">✓</span> Legal Checklists
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-2/3 p-10 lg:p-14">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Master the Art of Startup Growth</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Written by industry veterans, top-tier venture capitalists, and successful founders who have built unicorns from the ground up. This guidebook bypasses the fluff and gives you actionable steps to bypass common pitfalls.
                        </p>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Whether you are a student exploring entrepreneurship or a seasoned professional looking to launch a tech venture, this comprehensive guide will walk you through product validation, MVP development, team building, and mastering investor pitches.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-1">Chapter 1-3</h4>
                                <p className="text-sm text-slate-500">Ideation & Validation</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-1">Chapter 4-6</h4>
                                <p className="text-sm text-slate-500">Go-to-Market Strategy</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-1">Chapter 7-9</h4>
                                <p className="text-sm text-slate-500">Fundraising & Legal</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-1">Chapter 10</h4>
                                <p className="text-sm text-slate-500">Scaling Operations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
