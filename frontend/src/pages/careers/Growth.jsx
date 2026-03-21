import { TrendingUp, BookOpen, Award, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import growth from "../../assets/growth.webp"
export default function Growth() {
    const learningPaths = [
        {
            title: "Technical Mastery",
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            desc: "Deep dive into Cloud, AI, and Blockchain with sponsored certifications (AWS, Google, etc.) and workshops."
        },
        {
            title: "Leadership Track",
            icon: <Users className="w-8 h-8 text-blue-500" />,
            desc: "For those who want to lead teams. Includes management training, EQ workshops, and mentorship."
        },
        {
            title: "Product Innovation",
            icon: <Target className="w-8 h-8 text-primary" />,
            desc: "Learn the art of product management, user research, and strategic thinking."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[550px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${growth})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    {/* <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-6">
                        <TrendingUp size={18} className="text-green-300" />
                        <span className="font-semibold text-sm uppercase tracking-wide">
                            Learning & Development
                        </span>
                    </div> */}
                    <h1 className="text-5xl lg:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
                        Grow With Us
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
                        We invest in your future because your growth is our growth. Access world-class learning resources and mentorship.
                    </p>
                </div>
            </div>

            {/* Stats/Budget Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-10 mb-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 border-t-4 border-emerald-500">
                    <div className="p-10 text-center border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white transition-all duration-300 group">
                        <div className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">$2,000</div>
                        <div className="text-gray-600 font-bold uppercase tracking-wide text-sm">Annual Learning Budget</div>
                    </div>
                    <div className="p-10 text-center border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white transition-all duration-300 group">
                        <div className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">40+</div>
                        <div className="text-gray-600 font-bold uppercase tracking-wide text-sm">Hours of Paid Learning</div>
                    </div>
                    <div className="p-10 text-center hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white transition-all duration-300 group">
                        <div className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">1-on-1</div>
                        <div className="text-gray-600 font-bold uppercase tracking-wide text-sm">Mentorship Program</div>
                    </div>
                </div>
            </div>

            {/* Learning Paths */}
            <div className="bg-gradient-to-br from-white to-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            Learning Paths
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Choose Your Path</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                            Whether you want to be a rigorous individual contributor or an inspiring leader, we have a path for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {learningPaths.map((path, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-emerald-500 group transform hover:-translate-y-2">
                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {path.icon}
                                </div>
                                <h3 className="font-black text-2xl text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">{path.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{path.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mentorship Section */}
            <div className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
                            <img
                                src="https://images.unsplash.com/photo-1515169067759-0f01dac55866?auto=format&fit=crop&q=80&w=800"
                                alt="Mentorship session"
                                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white/10 h-[500px] object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full mb-6">
                                <div className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                                    <BookOpen size={16} />
                                    <span>Mentorship</span>
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Learn from the Best
                            </h2>
                            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                                Our mentorship program pairs you with senior leaders and domain experts. Get career advice, code reviews, and life lessons from people who have been there and done that.
                            </p>
                            <div className="flex flex-col gap-5">
                                <div className="flex items-start gap-5 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                                    <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform"><Award size={28} /></div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-1">Structured Goals</h4>
                                        <p className="text-sm text-gray-400">Set quarterly goals with your mentor and track your progress.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all group">
                                    <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform"><Users size={28} /></div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-1">Networking</h4>
                                        <p className="text-sm text-gray-400">Access to leadership and cross-team networks for growth.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-50 to-white py-24 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="inline-block bg-emerald-100 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                        Start Your Journey
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Invest in Your Future</h2>
                    <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join a company that prioritizes your personal and professional evolution.
                    </p>
                    <Link to="/careers/jobs">
                        <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-12 rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl">
                            Find Your Role
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
