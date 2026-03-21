import { Coffee, Music, Sun, Users, Camera, Heart, Hand } from "lucide-react";
import { Link } from "react-router-dom";

export default function Life() {
    const galleryParams = "?auto=format&fit=crop&q=80&w=600";
    const galleryImages = [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" + galleryParams,
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf" + galleryParams,
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7" + galleryParams,
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952" + galleryParams,
        "https://images.unsplash.com/photo-1531545514256-b1400bc00f31" + galleryParams,
        "https://images.unsplash.com/photo-1543269865-cbf427effbad" + galleryParams,
    ];

    const perks = [
        { icon: <Coffee className="w-8 h-8 text-amber-600" />, title: "Cafeteria & Snacks", desc: "Gourmet coffee and healthy snacks on the house." },
        { icon: <Music className="w-8 h-8 text-primary" />, title: "Music & Gaming", desc: "Relax in our gaming zones or jam in the music room." },
        { icon: <Sun className="w-8 h-8 text-yellow-500" />, title: "Wellness Programs", desc: "Yoga sessions, gym memberships, and mental health support." },
        { icon: <Users className="w-8 h-8 text-blue-500" />, title: "Team Retreats", desc: "Annual offsites to beaches and mountains." },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Background Image */}
            <div className="relative text-white py-32 overflow-hidden" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-6">
                        <Heart size={18} className="text-pink-300" />
                        <span className="font-semibold text-sm uppercase tracking-wide">
                            Culture & Vibe
                        </span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black mb-6 drop-shadow-2xl">
                        More Than Just a Job
                    </h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
                        We believe that happy people build better products. Discover the vibrant community behind the code.
                    </p>
                </div>
            </div>

            {/* Photo Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-10 mb-20">
                <div className="bg-white p-4 rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-xl h-48 md:h-64 relative group cursor-pointer">
                                <img src={src} alt={`Life at Contrractum ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Camera className="text-white w-8 h-8" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vibe Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">The Contrractum Vibe</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            It's the little things that make the big difference. From impromptu jam sessions to focused hackathons.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {perks.map((perk, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 text-center group">
                                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {perk.icon}
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-2">{perk.title}</h3>
                                <p className="text-gray-600">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Community Section */}
            <div className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 md:p-16 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 text-yellow-400 mb-4 font-bold uppercase tracking-wider text-sm">
                                    <Hand size={18} />
                                    <span>Giving Back</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-red mb-6">
                                    Community & Impact
                                </h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    We don't just work in silos. We engage with our local communities through volunteer days, coding workshops for kids, and environmental initiatives.
                                </p>
                                <Link to="/resources/csr">
                                    <button className="bg-primary hover:bg-primary-dark text-red-600 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg w-fit">
                                        See Our CSR Initiatives
                                    </button>
                                </Link>
                            </div>
                            <div className="relative h-64 lg:h-auto">
                                <img
                                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
                                    alt="Community Volunteering"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent lg:bg-gradient-to-t lg:from-transparent lg:to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-blue-900 py-20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-white mb-6">Picture Yourself Here</h2>
                    <p className="text-gray-100 text-lg mb-8">
                        The only thing missing is you. Come join the fun.
                    </p>
                    <Link to="/careers/jobs">
                        <button className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl">
                            See Open Roles
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
