import { Quote, Briefcase, Award, Target } from "lucide-react";

export default function AdvisorsDetails() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section Without Buttons */}
            <div className="relative h-[600px] flex items-center bg-slate-900 border-b-8 border-purple-600">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-black/80 to-indigo-900/80"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                        Comprehensive Advisor Profiles
                    </h1>
                    <p className="text-gray-200 text-xl md:text-2xl mb-8 leading-relaxed max-w-4xl drop-shadow-xl font-light">
                        We believe that true innovation requires not only brilliant engineering but also unparalleled strategic foresight. Our advisors represent the pinnacle of industry leadership across finance, healthcare, and enterprise architecture.
                    </p>
                </div>
            </div>

            {/* In-depth Advisory Philosophy Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto text-left">
                    <h2 className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-indigo-100 pb-4 inline-block">Our Advisory Philosophy</h2>
                    <p className="text-slate-700 text-lg leading-loose mb-6">
                        At The Contrractum, we do not view our advisors as mere figureheads. They are active participants in shaping our macro-strategy, deeply embedding their decades of enterprise navigation into our core product offerings. They challenge our assumptions, refine our go-to-market strategies, and open doors to strategic partnerships that accelerate our global footprint.
                    </p>
                    <p className="text-slate-700 text-lg leading-loose mb-12">
                        By establishing a formalized advisory board comprising seasoned executives from Fortune 500 corporations, influential policymakers, and leading academic researchers, we consistently deliver solutions that anticipate regulatory shifts and market demands long before they become mainstream.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                        <div className="bg-purple-50 p-10 rounded-3xl border border-purple-100 shadow-sm">
                            <Quote className="w-12 h-12 text-purple-400 mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Strategic Realignment</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Our board specializes in market realignment strategies, actively guiding our pivot into emerging decentralized markets while ensuring strict compliance with international legal frameworks. This proactive approach minimizes organizational risk.
                            </p>
                        </div>
                        <div className="bg-indigo-50 p-10 rounded-3xl border border-indigo-100 shadow-sm">
                            <Target className="w-12 h-12 text-indigo-400 mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Objective Targeting</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Through rigorous OKR implementation guided by our experienced advisors, every technical milestone we achieve is directly correlated with a measurable business outcome, ensuring rapid ROI for our stakeholders.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Roster Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100 border-y border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-6">Detailed Biographical Index</h2>
                        <p className="text-slate-600 text-xl max-w-3xl mx-auto">
                            A closer look at the professional heritage of the individuals driving our strategic narrative.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Advisor 1 Detailed Profile */}
                        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/3">
                                <div className="aspect-square rounded-full overflow-hidden border-8 border-indigo-50 shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&fit=crop" alt="Dr. Robert Keynes" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="lg:w-2/3">
                                <h3 className="text-3xl font-black text-slate-900 mb-2">Dr. Robert Keynes, Ph.D.</h3>
                                <p className="text-indigo-600 font-bold text-xl mb-6">Chairman of the Advisory Board</p>
                                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                                    Dr. Keynes brings over 35 years of executive experience leading global strategy for top-tier multinational technology firms. His pioneering work in systems theory and enterprise architecture optimization has been published in numerous prestigious journals. At The Contrractum, he focuses on macro-level strategic partnerships and overarching corporate governance.
                                </p>
                                <div className="flex gap-4">
                                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium">B2B Strategy</span>
                                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium">Global Expansion</span>
                                </div>
                            </div>
                        </div>

                        {/* Advisor 2 Detailed Profile */}
                        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col lg:flex-row-reverse gap-12 items-center">
                            <div className="lg:w-1/3">
                                <div className="aspect-square rounded-full overflow-hidden border-8 border-purple-50 shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&fit=crop" alt="Elena Rodriguez" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="lg:w-2/3 text-left lg:text-right">
                                <h3 className="text-3xl font-black text-slate-900 mb-2">Elena Rodriguez, MBA</h3>
                                <p className="text-purple-600 font-bold text-xl mb-6">Lead Advisor - Financial Compliance</p>
                                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                                    A former SEC regulator and current board member for three major FinTech innovators, Elena provides critical oversight for our blockchain and decentralized finance initiatives. Her unparalleled understanding of international financial regulations ensures that our proprietary products maintain strict compliance without sacrificing innovative edge or market speed.
                                </p>
                                <div className="flex gap-4 justify-start lg:justify-end">
                                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium">FinTech Compliance</span>
                                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium">Risk Management</span>
                                </div>
                            </div>
                        </div>

                        {/* Advisor 3 Detailed Profile */}
                        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/3">
                                <div className="aspect-square rounded-full overflow-hidden border-8 border-cyan-50 shadow-2xl">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop" alt="James Sterling" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="lg:w-2/3">
                                <h3 className="text-3xl font-black text-slate-900 mb-2">James Sterling, JD</h3>
                                <p className="text-cyan-600 font-bold text-xl mb-6">Lead Policy Advisor - GovTech</p>
                                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                                    With a distinguished legal career spanning several decades advising federal governments on data sovereignty and cloud migration, James is instrumental in our public sector engagements. He acts as our primary liaison for government contracts, ensuring that all our infrastructure solutions exceed the highest federal security clearances and data protection mandates.
                                </p>
                                <div className="flex gap-4">
                                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium">Data Sovereignty</span>
                                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium">Public Sector Contracts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
