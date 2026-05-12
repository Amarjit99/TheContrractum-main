import React from 'react';
import { BookOpen, GraduationCap, Video, Library, Users, Award, CheckCircle2 } from 'lucide-react';
import educationn from "../../assets/educationn.png"

export default function EducationResults() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden bg-slate-900 border-b-8 border-indigo-500" style={{
                backgroundImage: `url(${educationn})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-black/80 to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div>
                        <span className="inline-block bg-indigo-500/20 text-indigo-300 font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest border border-indigo-500/30">
                            Demonstrated Impact
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Measuring Success <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                In Education Tech
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl drop-shadow-lg font-light">
                            Technology without quantifiable pedagogy is just hardware. Explore our comprehensive data and the transformative outcomes we've achieved across academic institutions globally.
                        </p>
                    </div>
                </div>
            </div>

            {/* In-Depth Data Section 1 */}
            <section className="py-24 px-6 lg:px-8 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-10 border-b-4 border-indigo-200 inline-block pb-4">Real Outcomes, Real Numbers</h2>

                    <p className="text-lg text-slate-700 leading-loose mb-8">
                        The true measure of any EdTech deployment isn't how sleek the user interface is, but rather how effectively it improves student retention, accelerates comprehension, and unburdens administrative staff. At The Contractum, our implementations are rigorously audited against baseline historical performance data.
                    </p>
                    <p className="text-lg text-slate-700 leading-loose mb-12">
                        Over a standard 36-month tracking period post-deployment, partner universities have seen an average 18% reduction in first-year drop-out rates. This is achieved by utilizing predictive modeling that identifies struggling students weeks before midterm examinations, allowing early intervention teams to proactively engage.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <GraduationCap className="w-12 h-12 text-blue-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Enhanced Retention Curves</h3>
                            <p className="text-slate-700 leading-relaxed relative z-10">
                                Identifying key friction points in the academic journey allows faculty to intervene. Our analytics dashboard maps engagement against syllabus progression in real-time.
                            </p>
                        </div>
                        <div className="bg-indigo-50 p-10 rounded-3xl border border-indigo-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <Award className="w-12 h-12 text-indigo-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Increased Assessment Scores</h3>
                            <p className="text-slate-700 leading-relaxed relative z-10">
                                Interactive and gamified modules have shown a consistent 22% improvement in continuous assessment scoring across STEM disciplines compared to legacy methods.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Metrics Section */}
            <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white border-y border-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6">Unprecedented Campus Scale</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            Transforming the infrastructure of mass education without compromising individual experiences.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors">
                            <Users className="w-14 h-14 text-blue-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">1 Million+ Concurrent Users</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Our cloud architecture automatically scales during critical peaks, such as national university registration weeks or synchronized inter-college examination periods, guaranteeing zero downtime.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-indigo-500 transition-colors">
                            <Library className="w-14 h-14 text-indigo-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Petabytes of Digital Assets</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Seamlessly migrating centuries-old library archives into instant-search, DRM-protected digital repositories entirely accessible from a single unified global search bar.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-purple-500 transition-colors">
                            <CheckCircle2 className="w-14 h-14 text-purple-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Frictionless Compliance</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Automated accessibility compliance ensuring that UI components naturally adhere to global standards, serving students of all abilities flawlessly across every digital interface.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Outcomes */}
            <section className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-black text-slate-900 mb-6">Hybrid Learning, Perfected</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                The transition to remote and hybrid learning was rushed for many institutions during global disruptions. We step in to construct permanent, robust digital bridges out of those temporary solutions.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                Administrators report a 40% reduction in IT ticketing related to access and provisioning since transitioning to our seamless SAML/SSO architecture. This means professors spend time teaching, not troubleshooting logins.
                            </p>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <Video className="w-10 h-10 text-blue-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">4K</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Classroom Streams</span>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <BookOpen className="w-10 h-10 text-indigo-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">-40%</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">IT Cost Overhead</span>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center col-span-2">
                                    <Award className="w-10 h-10 text-purple-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">Global Ranking</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Consistent Partner Upward Mobility</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
