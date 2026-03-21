import React from 'react';
import { BookOpen, GraduationCap, Video, Library, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import educationn from "../../assets/educationn.png"
import educationImg from "../../assets/education.jfif"
export default function Education() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden flex items-center" style={{
                backgroundImage: `url(${educationn})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-0"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        {/* <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider mb-6 border border-white/30">
                            <span className="flex items-center gap-2"><BookOpen size={16} />EdTech Solutions</span>
                        </div> */}
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Smart Learning <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                                Beyond Boundaries
                            </span>
                        </h1>
                        <p className="text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl drop-shadow-lg">
                            Empowering institutions with next-gen learning management systems, virtual classrooms, and data-driven student success platforms.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact/quote" className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105">
                                Request Demo
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/projects/case-studies" className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-sm transition-all border-2 border-white/30 hover:border-white/50 transform hover:scale-105">
                                View Case Studies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Challenges Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Key Challenges
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Reimagining the Education Landscape</h2>
                        <p className="text-gray-600 text-lg">We help schools and universities adapt to the digital age, ensuring continuity and quality in education.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Video,
                                title: "Hybrid Learning",
                                description: "Creating seamless experiences that bridge the gap between physical classrooms and remote learning environments."
                            },
                            {
                                icon: Library,
                                title: "Digital Libraries",
                                description: "Cloud-based repositories that provide instant access to millions of resources for students and researchers."
                            },
                            {
                                icon: Users,
                                title: "Student Engagement",
                                description: "Interactive platforms that foster collaboration, gamify learning, and improve retention rates."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-500 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Solutions Grid */}
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-6">
                                Our Solutions
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive EdTech Ecosystem</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                From K-12 to Higher Education, we provide scalable platforms that streamline administration and enhance learning outcomes.
                            </p>

                            <div className="space-y-6">
                                {[
                                    "Learning Management Systems (LMS)",
                                    "Student Information Systems (SIS)",
                                    "AI-Powered Proctoring & Assessments",
                                    "Campus Management ERP",
                                    "Alumni Network Platforms"
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <span className="text-lg text-black font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10">
                                <Link to="/solutions/digital" className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center gap-2 group">
                                    Discover our platforms
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-3xl transform rotate-3"></div>
                            <img
                                src={educationImg}
                                alt="Digital Classroom"
                                loading="lazy"
                                className="relative rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">500+</div>
                            <div className="text-gray-300">Institutions</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">1M+</div>
                            <div className="text-gray-300">Students Supported</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">10M+</div>
                            <div className="text-gray-300">Exams Conducted</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">35%</div>
                            <div className="text-gray-300">Engagement Boost</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Transform Your Campus Today</h2>
                            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                                Join the digital education revolution. Let's build the future of learning together.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/contact/touch" className="px-10 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105">
                                    Contact Us
                                </Link>
                                <Link to="/company/about-us" className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:scale-105">
                                    See Results
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
