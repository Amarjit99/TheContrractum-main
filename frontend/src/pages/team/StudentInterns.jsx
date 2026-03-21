import { GraduationCap, Briefcase, Star, Rocket, Users, Sparkles, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import intern from "../../assets/intern.webp";

export default function StudentInterns() {
    const interns = [
        {
            name: "Aryan Gupta",
            role: "Frontend Developer Intern",
            school: "IIT Delhi",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400",
            quote: "Working on real-world projects from day one has been an incredible learning curve.",
            tags: ["React", "UI/UX", "Web Performance"],
        },
        {
            name: "Sneha Patel",
            role: "Data Science Intern",
            school: "BITS Pilani",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
            quote: "The mentorship here is unmatched. I've learned more in 3 months than a year of college.",
            tags: ["Python", "Pandas", "Machine Learning"],
        },
        {
            name: "Rahul Singh",
            role: "Cybersecurity Intern",
            school: "NIT Trichy",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
            quote: "Protecting live infrastructure against simulated attacks was the highlight of my summer.",
            tags: ["Ethical Hacking", "Network Security"],
        },
        {
            name: "Ananya Roy",
            role: "Product Design Intern",
            school: "NID Ahmedabad",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
            quote: "I love how my designs are actually being used by thousands of users today.",
            tags: ["Figma", "User Research", "Prototyping"],
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{ backgroundImage: `url(${intern})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
                    <div>
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-2xl">
                            Future Leaders Program
                        </span> */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            Student Interns
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-2xl">
                            Fueling growth, innovation, and fresh perspectives. Meet the bright minds shaping tomorrow.
                        </p>
                        <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-10 py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition transform hover:scale-105 text-base sm:text-lg shadow-2xl">
                            Join Our Team
                        </button>
                    </div>
                </div>
            </div>

            {/* Interns Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-orange-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Rising Stars
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-4 text-slate-900">Meet Our Talented Interns</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Passionate students bringing fresh ideas and driving innovation
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {interns.map((intern, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-2"
                            >
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                                        <img
                                            src={intern.image}
                                            alt={intern.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                                <Star className="w-5 h-5 text-white fill-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">
                                            {intern.name}
                                        </h3>
                                        <p className="text-orange-600 font-bold mb-3">{intern.role}</p>

                                        <div className="flex items-center gap-2 text-slate-600 text-sm mb-4 bg-slate-100 w-fit px-3 py-1.5 rounded-lg">
                                            <GraduationCap size={16} />
                                            <span className="font-semibold">{intern.school}</span>
                                        </div>

                                        <div className="bg-orange-50 p-4 rounded-xl mb-4 relative border-l-4 border-orange-500">
                                            <div className="absolute top-3 right-3">
                                                <QuoteIcon className="text-orange-200 w-6 h-6" />
                                            </div>
                                            <p className="text-slate-700 italic text-sm leading-relaxed">"{intern.quote}"</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {intern.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 rounded-full hover:bg-orange-100 hover:text-orange-700 transition"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Applications for Summer Internships 2026 are Open!</h2>
                    <p className="text-slate-200 text-lg sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                        Don't just watch the revolution—be part of it. Experience mentorship, real projects, and rapid growth.
                    </p>
                    <Link to="/careers/internships">
                        <button className="bg-white text-orange-900 hover:bg-slate-100 font-black py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3">
                            <Rocket className="w-5 h-5" />
                            Apply Now
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

function QuoteIcon({ className }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
        </svg>
    )
}
