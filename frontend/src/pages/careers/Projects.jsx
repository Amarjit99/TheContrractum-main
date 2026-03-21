import { Rocket, GitBranch, Code, Cpu, ExternalLink } from "lucide-react";
import running from "../../assets/running.png"
export default function Projects() {
    const projects = [
        {
            title: "Project Nova",
            category: "R&D - Artificial Intelligence",
            desc: "A next-generation predictive analytics engine designed to optimize supply chain logistics in real-time using reinforcement learning.",
            status: "Active Development",
            tech: ["Python", "PyTorch", "AWS Sagemaker"],
            icon: <Cpu className="w-8 h-8 text-purple-500" />
        },
        {
            title: "Project Aegis",
            category: "Cybersecurity",
            desc: "An automated threat detection system that uses behavioral analysis to identify zero-day vulnerabilities in enterprise networks.",
            status: "Beta Testing",
            tech: ["Go", "Kafka", "ElasticSearch"],
            icon: <Code className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Project Helios",
            category: "Renewable Energy Tech",
            desc: "IoT-based monitoring platform for solar farms to maximize efficiency and predict maintenance needs.",
            status: "Concept Phase",
            tech: ["IoT", "React Native", "MQTT"],
            icon: <Rocket className="w-8 h-8 text-orange-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[500px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${running})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center h-full flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 mx-auto">
                        <GitBranch size={18} className="text-yellow-300" />
                        {/* <span className="font-semibold text-sm uppercase tracking-wide">
                            Internal Initiatives
                        </span> */}
                    </div>
                    {/* <h1 className="text-5xl lg:text-6xl font-black mb-6 drop-shadow-2xl">
                        Innovation Labs
                    </h1> */}
                    {/* <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
                        Explore the cutting-edge projects our teams are hacking on. From moonshots to weekend hacks, this is where the future is built.
                    </p> */}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <div className="inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                        Current Projects
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">What We're Building</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        These are the live projects that our teams are actively working on. Each represents an opportunity to learn, innovate, and make impact.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-violet-500 flex flex-col group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                    {project.icon}
                                </div>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                                    project.status === "Active Development" ? "bg-green-100 text-green-700" :
                                    project.status === "Beta Testing" ? "bg-blue-100 text-blue-700" :
                                    "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {project.status}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">{project.title}</h3>
                            <div className="text-violet-600 font-bold text-sm mb-4 uppercase tracking-wide">{project.category}</div>
                            <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
                                    View Details <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hackathon Teaser */}
            <div className="bg-gradient-to-br from-gray-50 to-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl relative">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                        <div className="relative z-10 px-6 py-20 md:py-24 text-center">
                            <div className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                                <Rocket className="inline-block w-4 h-4 mr-2 mb-0.5" />
                                Live Event
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">Internal Hackathon 2026</h2>
                            <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                48 hours. Unlimited coffee. One goal: Build something awesome.
                                Currently open for employee registration.
                            </p>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl">
                                    Register Team
                                </button>
                                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105">
                                    View Themes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
