import { Briefcase, Calendar, CheckCircle, Clock, DollarSign, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import internship from "../../assets/internship.png";

export default function Internships() {
    const domains = [
        {
            title: "Engineering",
            roles: ["Frontend Dev", "Backend Dev", "DevOps", "QA Automation"],
            icon: <CodeIcon className="w-6 h-6 text-blue-500" />
        },
        {
            title: "Data & AI",
            roles: ["Data Analyst", "ML Engineer", "Data Scientist"],
            icon: <DatabaseIcon className="w-6 h-6 text-purple-500" />
        },
        {
            title: "Design & Product",
            roles: ["UI/UX Designer", "Product Management", "User Researcher"],
            icon: <PenToolIcon className="w-6 h-6 text-pink-500" />
        },
        {
            title: "Sales & Marketing",
            roles: ["Digital Marketing", "Business Development", "Content Strategy"],
            icon: <MegaphoneIcon className="w-6 h-6 text-orange-500" />
        }
    ];

    const timeline = [
        { title: "Applications Open", date: "Jan - Feb", desc: "Submit your application online." },
        { title: "Selection Process", date: "March", desc: "Interviews and assessments." },
        { title: "Onboarding", date: "May", desc: "Welcome kit and orientation." },
        { title: "Internship Period", date: "May - July", desc: "8-12 weeks of intense learning." },
        { title: "PPO Offers", date: "August", desc: "Top performers get full-time offers." }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[500px] overflow-hidden" style={{
                backgroundImage: `url(${internship})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center h-full flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-6">
                        {/* <Briefcase size={18} className="text-yellow-300" /> */}
                        {/* <span className="font-semibold text-sm uppercase tracking-wide">
                            Intern Leaders Program
                        </span> */}
                    </div>
                    {/* <h1 className="text-5xl lg:text-6xl font-black mb-6 drop-shadow-lg">
                        Do Work That Matters
                    </h1> */}
                    {/* <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        Don't just fetch coffee. Build products, ship code, and solve real problems affecting millions of users.
                    </p> */}
                </div>
            </div>

            {/* Perks Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-10 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 hover:border-orange-500 transition-all duration-300 group">
                        <div className="bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                            <Rocket className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Real Impact</h3>
                        <p className="text-gray-600 leading-relaxed">Work on live production code. Your contributions will be shipped to real users globally.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 hover:border-primary transition-all duration-300 group">
                        <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                            <DollarSign className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">Competitive Stipend</h3>
                        <p className="text-gray-600 leading-relaxed">We value your time and talent. Receive industry-leading stipends and comprehensive benefits.</p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 hover:border-pink-500 transition-all duration-300 group">
                        <div className="bg-pink-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-100 transition-colors">
                            <CheckCircle className="w-8 h-8 text-pink-500" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-3">PPO Opportunity</h3>
                        <p className="text-gray-600 leading-relaxed">Perform well and secure a Pre-Placement Offer to join us full-time after graduation.</p>
                    </div>
                </div>
            </div>

            {/* Domains Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="md:w-1/3 md:sticky md:top-8">
                            <div className="inline-block bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                                Opportunities
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-4 leading-tight">Open Roles</h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We hire interns across almost every function. Find the role that suits your skills and ambitions.
                            </p>
                            <Link to="/careers/jobs">
                                <button className="bg-primary text- blackfont-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Apply Now <ArrowRight size={20} />
                                </button>
                            </Link>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {domains.map((domain, index) => (
                                <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:border-primary transition-all duration-300 group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl group-hover:scale-110 transition-transform">{domain.icon}</div>
                                        <h3 className="font-black text-xl text-gray-900 group-hover:text-primary transition-colors">{domain.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {domain.roles.map((role, rIdx) => (
                                            <span key={rIdx} className="text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:from-blue-50 hover:to-blue-100 hover:text-primary transition-colors cursor-default">
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            Timeline
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-3">Internship Journey</h2>
                        <p className="text-gray-600 text-lg">Summer 2026 Batch • 8-12 Weeks Program</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 z-0"></div>

                        {timeline.map((item, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 border-4 border-white rounded-full flex items-center justify-center font-black text-white shadow-xl mb-4 group-hover:scale-110 transition-transform">
                                    {index + 1}
                                </div>
                                <h4 className="font-black text-gray-900 mb-2 text-lg">{item.title}</h4>
                                <span className="text-sm font-bold text-primary mb-3 block bg-primary/10 px-3 py-1 rounded-full">{item.date}</span>
                                <p className="text-gray-600 text-sm px-2 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ / CTA */}
            <div className="bg-gradient-to-br from-primary via-blue-700 to-indigo-800 text-white py-24 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                        Need Help?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Still Have Questions?</h2>
                    <p className="text-blue-100 text-xl mb-10 leading-relaxed">
                        Check out our student resources or reach out to our university recruiting team. We're here to help!
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/contact/support">
                            <button className="bg-red text-primary font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                                Contact Recruiting Team
                            </button>
                        </Link>
                        <Link to="/careers/jobs">
                            <button className="bg-red text-primary font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                                View Open Positions
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

function DatabaseIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
    )
}

function PenToolIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
    )
}

function MegaphoneIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
    )
}
