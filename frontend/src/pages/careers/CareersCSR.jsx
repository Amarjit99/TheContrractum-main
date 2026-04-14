import React from "react";
import { Heart, Globe, Users, BookOpen } from "lucide-react";

export default function CareersCSR() {
    const csrInitiatives = [
        {
            title: "Digital Education for Underprivileged Children",
            category: "Education",
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
            description: "Providing free computer education, coding classes, and digital literacy programs to 5,000+ underprivileged children across 50 schools. Includes laptops, internet connectivity, and trained instructors.",
            outcomes: "85% of participating students are now digitally literate."
        },
        {
            title: "Green Technology & Environmental Sustainability",
            category: "Environment",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
            description: "Carbon-neutral operations initiative including renewable energy adoption, tree plantation drives, e-waste recycling programs, and sustainable office practices. Committed to planting 50,000 trees annually.",
            outcomes: "Achieved a 60% reduction in carbon footprint across all operations."
        },
        {
            title: "Healthcare Access in Rural Areas",
            category: "Healthcare",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
            description: "Mobile health clinics providing free medical checkups, medicines, and telemedicine consultations to remote villages. Focus on maternal health, child vaccination, and preventive care.",
            outcomes: "Over 25,000 patients treated with a 90% improvement in healthcare access."
        },
        {
            title: "Women in Technology Empowerment Program",
            category: "Social",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=600&fit=crop",
            description: "Free technology training, mentorship, and job placement support for women from economically disadvantaged backgrounds. Includes coding bootcamps, soft skills training, and entrepreneurship programs.",
            outcomes: "70% successful job placement rate for over 2,500 trained women."
        },
        {
            title: "Clean Water & Sanitation Projects",
            category: "Infrastructure",
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
            description: "Installing water purification systems, building toilets, and creating sanitation awareness in water-scarce regions. Focus on schools and community centers for maximum impact.",
            outcomes: "Provided 100% access to clean water in targeted areas supporting 35,000+ people."
        },
        {
            title: "Skill Development for Youth Employment",
            category: "Education",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop",
            description: "Vocational training programs in IT, digital marketing, data analytics, and emerging technologies for unemployed youth. Includes internship opportunities and job fair participation.",
            outcomes: "65% of participants secured employment within 6 months of program completion."
        },
        {
            title: "Disaster Relief & Emergency Response",
            category: "Emergency",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=600&fit=crop",
            description: "Rapid response team providing immediate relief during natural disasters including food, shelter, medical aid, and technology support for affected communities. 24/7 emergency helpline operational.",
            outcomes: "Maintained an emergency response time of under 24 hours, aiding 15,000+ victims."
        },
        {
            title: "Elderly Care & Digital Inclusion",
            category: "Social",
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1200&h=600&fit=crop",
            description: "Teaching senior citizens to use smartphones, online banking, telemedicine, and social media to stay connected. Includes free tablets and personalized training sessions.",
            outcomes: "90% of the 3,000+ participants now use digital services independently."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div
                className="relative py-40 bg-cover bg-center flex items-center justify-center text-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=2000')" }}
            >
                <div className="absolute inset-0 bg-blue-900/70 backdrop-blur-sm mix-blend-multiply"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-white space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                        <Heart size={20} className="text-red-400" />
                        <span className="font-bold tracking-wide uppercase">Community & Impact</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black drop-shadow-xl">
                        Our CSR Initiatives
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-slate-200">
                        A comprehensive look into our dedicated efforts to create a positive, lasting impact on communities worldwide.
                    </p>
                </div>
            </div>

            {/* Intro Section */}
            <div className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <Globe className="w-16 h-16 text-blue-600 mx-auto" strokeWidth={1.5} />
                    <h2 className="text-4xl font-bold text-slate-900">Making a Global Difference</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        At Contrractum, we believe our responsibility extends beyond business. We are deeply committed to empowering communities, protecting the environment, and utilizing technology as a force for good. Through targeted corporate social responsibility initiatives, we are driving systemic change and addressing some of the most pressing challenges of our time.
                    </p>
                </div>
            </div>

            {/* Detailed Initiatives Layout */}
            <div className="py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto px-6 space-y-24">
                    {csrInitiatives.map((initiative, index) => (
                        <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={initiative.image}
                                    alt={initiative.title}
                                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                                    {initiative.category}
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                                    {initiative.title}
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {initiative.description}
                                </p>
                                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Key Outcome</h4>
                                    <p className="text-slate-800 font-medium">
                                        {initiative.outcomes}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ethical Statement (No Buttons) */}
            <div className="py-24 bg-blue-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    <Users className="w-16 h-16 text-blue-400 mx-auto" strokeWidth={1.5} />
                    <h2 className="text-4xl font-bold">Our Commitment Endures</h2>
                    <p className="text-xl text-blue-100 leading-relaxed">
                        We will continue to expand our initiatives, prioritizing sustainable growth, equitable opportunities, and the well-being of the communities in which we operate.
                    </p>
                </div>
            </div>
        </div>
    );
}
