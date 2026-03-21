import { GraduationCap, BookOpen, Users, Globe, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import campus from "../../assets/Campus.png"
export default function Campus() {
    const programs = [
        {
            title: "Graduate Engineer Trainee (GET)",
            description: "A comprehensive 12-month program designed to transform fresh engineering graduates into world-class technologists.",
            icon: <CodeIcon className="w-8 h-8 text-blue-500" />,
            features: ["Rotational assignments", "Mentorship from senior architects", "Project ownership"]
        },
        {
            title: "Management Trainee (MT)",
            description: "For MBA graduates looking to lead the future of business. Gain exposure to strategy, operations, and finance.",
            icon: <ChartIcon className="w-8 h-8 text-green-500" />,
            features: ["Leadership shadowing", "Cross-functional projects", "Fast-track growth"]
        },
        {
            title: "Research & Innovation Fellow",
            description: "Join our R&D labs to work on cutting-edge technologies like AI, Quantum Computing, and Blockchain.",
            icon: <MicroscopeIcon className="w-8 h-8 text-purple-500" />,
            features: ["Publish papers", "Patent filing support", "Access to state-of-the-art labs"]
        }
    ];

    const stats = [
        { number: "50+", label: "Partner Universities" },
        { number: "200+", label: "Graduates Hired Annually" },
        { number: "100%", label: "PPO Conversion Rate for Top Performers" },
        { number: "15+", label: "Global Locations" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[550px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${campus})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    {/* <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-6">
                        <GraduationCap size={18} className="text-yellow-300" />
                        <span className="font-semibold text-sm uppercase tracking-wide">
                            University Relations
                        </span>
                    </div> */}
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
                        From Campus to Corporate
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                        Your degree was just the beginning. Launch your career with a company that invests in your potential.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-violet-600 transform hover:-translate-y-1">
                            <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                            <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Programs Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <div className="inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                        Campus Programs
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Our Programs</h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        We offer tailored paths for different disciplines, ensuring you start your career on the right foot.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-violet-500 group transform hover:-translate-y-2">
                            <div className="bg-gradient-to-br from-violet-50 to-purple-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {program.icon}
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">{program.title}</h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{program.description}</p>
                            <ul className="space-y-3 mb-8">
                                {program.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex-shrink-0"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/careers/jobs" className="inline-flex items-center gap-2 text-violet-600 font-bold hover:gap-3 transition-all group-hover:underline">
                                View Openings <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Steps Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                                Hiring Process
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">How We Hire</h2>
                            <p className="text-gray-600 text-lg mb-8">
                                We look for problem solvers, critical thinkers, and passionate learners. Our process is designed to help you showcase your best self.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: "Application & Assessment", desc: "Submit your profile and complete a coding/aptitude challenge." },
                                    { title: "Technical Interviews", desc: "Deep dive into your domain knowledge and problem-solving approach." },
                                    { title: "Culture Fit & HR", desc: "Understanding your aspirations and alignment with our values." },
                                    { title: "Offer & Onboarding", desc: "Welcome to the team! A structured orientation awaits you." }
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-5 items-start group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">{step.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                                alt="Students discussing"
                                className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px] border-4 border-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                        Check if we are visiting your campus or apply directly through our off-campus drives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/careers/jobs">
                            <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl w-full sm:w-auto">
                                View Campus Drives
                            </button>
                        </Link>
                        <Link to="/contact/touch">
                            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 w-full sm:w-auto">
                                For Placement Officers
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CodeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    )
}

function ChartIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    )
}

function MicroscopeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
    )
}
