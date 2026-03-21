import p25 from "../../assets/p25.webp";
import p26 from "../../assets/p26.webp";
import p27 from "../../assets/p27.webp";
import p28 from "../../assets/p28.webp";
import p29 from "../../assets/p29.webp";
export default function Volunteer() {
    const opportunities = [
        {
            icon: "💻",
            title: "Technical Volunteering",
            desc: "Contribute your technical skills to build solutions for social impact."
        },
        {
            icon: "📚",
            title: "Mentoring & Training",
            desc: "Guide students and young professionals in technology and career development."
        },
        {
            icon: "🌍",
            title: "Community Outreach",
            desc: "Conduct workshops and awareness programs in underserved communities."
        },
        {
            icon: "🎓",
            title: "Education Programs",
            desc: "Teach coding and tech skills to underprivileged youth and adults."
        },
    ];

    const impacts = [
        { number: "50K+", label: "Lives Impacted" },
        { number: "200+", label: "Active Volunteers" },
        { number: "15+", label: "Communities Served" },
        { number: "100+", label: "Workshops Conducted" },
    ];

    const benefits = [
        {
            icon: "🌟",
            title: "Personal Growth",
            desc: "Develop new skills and gain valuable experience."
        },
        {
            icon: "🤝",
            title: "Network Building",
            desc: "Connect with like-minded professionals and mentors."
        },
        {
            icon: "💪",
            title: "Make Impact",
            desc: "Directly contribute to meaningful social change."
        },
        {
            icon: "🎖️",
            title: "Recognition",
            desc: "Get recognized for your contributions and dedication."
        },
        {
            icon: "📜",
            title: "Certifications",
            desc: "Earn certificates for your volunteer work."
        },
        {
            icon: "🎯",
            title: "Career Boost",
            desc: "Enhance your professional portfolio and resume."
        },
    ];

    const csrPrograms = [
        {
            name: "Digital Literacy Initiative",
            description: "Teaching digital skills to rural and underserved populations.",
            image:p27
        },
        {
            name: "STEM for Girls",
            description: "Encouraging girls to pursue careers in science and technology.",
            image: p28
        },
        {
            name: "Education for All",
            description: "Providing quality education resources to underprivileged children.",
            image: p29
        },
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Tech Volunteer",
            quote: "Volunteering with TheContrractum changed my perspective. I've learned so much while helping others discover their potential.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Rajesh Kumar",
            role: "Mentor",
            quote: "The mentoring program is incredibly rewarding. Seeing young people succeed is the best feeling anyone can experience.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Anjali Singh",
            role: "Community Outreach",
            quote: "Through this volunteer program, I've discovered my passion for education and community service. Highly recommended!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                Volunteer & <span className="text-teal-400">CSR Programs</span>
                            </h1>
                            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                                Make a real difference in people's lives. Join thousands of volunteers transforming communities through education and innovation.
                            </p>
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition text-sm sm:text-base">
                                Get Involved Today
                            </button>
                        </div>
                        <img 
                            src={p25}                            alt="Volunteer Community" 
                            className="w-full h-auto rounded-lg shadow-lg" 
                        />
                    </div>
                </div>
            </div>

            {/* Impact Statistics */}
            <div className="bg-teal-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Our Impact So Far</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {impacts.map((impact, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-teal-500 mb-2">{impact.number}</div>
                                <p className="text-slate-600 text-sm sm:text-base font-semibold">{impact.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Volunteer Opportunities */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Volunteer Opportunities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {opportunities.map((opp, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                <div className="text-4xl mb-4">{opp.icon}</div>
                                <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">{opp.title}</h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{opp.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Volunteer Section */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <img 
                            src={p26} 
                            alt="Volunteering Benefits" 
                            className="w-full h-auto rounded-lg shadow-lg order-2 md:order-1" 
                        />
                        <div className="order-1 md:order-2">
                            <p className="text-teal-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Why Join Our Community</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Benefits of Volunteering</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Volunteering with TheContrractum offers more than just helping others. It's a journey of personal growth, skill development, and meaningful connections.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-teal-500 font-bold">✓</span> Develop professional skills
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-teal-500 font-bold">✓</span> Build strong networks
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-teal-500 font-bold">✓</span> Gain leadership experience
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-teal-500 font-bold">✓</span> Make real social impact
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Volunteer Benefits Grid */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">What You'll Gain</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">{benefit.title}</h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CSR Programs */}
            <div className="bg-teal-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Our CSR Initiatives</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {csrPrograms.map((program, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                <img 
                                    src={program.image} 
                                    alt={program.name} 
                                    className="w-full h-48 object-cover" 
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{program.name}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{program.description}</p>
                                    <button className="mt-4 bg-primary text-white font-bold text-sm hover:bg-primary-dark transition px-4 py-2 rounded">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How to Get Involved */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">How to Get Involved</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">1</div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Sign Up</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Fill out our volunteer registration form online.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">2</div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Get Evaluated</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">We assess your skills and preferences.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">3</div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Get Trained</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Receive comprehensive orientation and training.</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">4</div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Contribute</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Make your impact in the community.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Volunteer Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center gap-4 mb-4">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        className="w-12 h-12 rounded-full object-cover" 
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">{testimonial.name}</h3>
                                        <p className="text-teal-500 text-xs font-semibold">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed italic">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">How much time do I need to commit?</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Volunteering is flexible. You can contribute from a few hours a month to being a regular contributor. Choose what works best for you.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Do I need specific qualifications?</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Not necessarily. We have opportunities for volunteers with various skill levels. Your passion and willingness to help matter most.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Will I get a certificate?</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Yes! All volunteers receive certificates recognizing their contribution and service hours.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">Can I volunteer remotely?</h3>
                            <p className="text-slate-600 text-xs sm:text-sm">Absolutely! Many of our volunteer roles can be done remotely, including mentoring and online training.</p>
                        </div>
                    </div>
                </div>
            </div>

           {/* CTA Section – Professional */}
<div className="bg-blue-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 text-center">

    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-white">
      Ready to Make a Meaningful Impact?
    </h2>

    <p className="text-gray-100 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
      Become part of our volunteer network and contribute your time,
      skills, and passion to initiatives that create lasting change.
    </p>

    <button className="bg-white text-blue-900 font-medium px-6 sm:px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition duration-300">
      Apply as Volunteer
    </button>

  </div>
</div>

        </div>
    );
}

