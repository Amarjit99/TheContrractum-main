import { Linkedin, Mail, Twitter, Target, Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import team from "../../assets/team.jpeg"
export default function CoreTeam() {
    const leaders = [
        {
            name: "Amit Verma",
            role: "Founder & CEO",
            bio: "Visionary leader with 15+ years in tech innovation. Driving Contrractum's mission to reshape digital landscapes.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        },
        {
            name: "Sarah Jenkins",
            role: "Chief Technology Officer",
            bio: "Expert in AI & Blockchain architectures. Leading our engineering teams to build scalable, future-proof solutions.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        },
        {
            name: "David Chen",
            role: "Head of Operations",
            bio: "Operational excellence strategist ensuring seamless delivery and execution across all global projects.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        },
        {
            name: "Priya Sharma",
            role: "Chief Marketing Officer",
            bio: "Brand builder and storyteller connecting our innovations with the communities that need them most.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section with Background Image */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${team})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            Core Leadership Team
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            Meet Our Leadership
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            The visionaries and strategists guiding The Contrractum towards a smarter, more connected future.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30 shadow-2xl">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm font-bold text-white">Visionary Leadership</p>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30 shadow-2xl">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <Rocket className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm font-bold text-white">Strategic Excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Leadership Team
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                            Our Core Leadership
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Experienced leaders driving innovation and excellence</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {leaders.map((leader, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-blue-400"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                                        {leader.name}
                                    </h3>
                                    <p className="text-blue-600 font-semibold mb-4">{leader.role}</p>
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                        {leader.bio}
                                    </p>
                                    <div className="flex justify-center space-x-3">
                                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition transform hover:scale-110">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-400 rounded-full transition transform hover:scale-110">
                                            <Twitter size={18} />
                                        </a>
                                        <a href="mailto:contact@contrractum.com" className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-full transition transform hover:scale-110">
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl">
                        Connect with Visionaries
                    </h2>
                    <p className="text-gray-100 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                        Our leadership team is always open to discussing strategic partnerships and new ventures.
                    </p>
                    <Link to="/contact/touch">
                        <button className="bg-white text-blue-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Contact Leadership
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
