import Employee from "../../assets/employee.png"
export default function Benefits() {
    const benefits = [
        {
            title: "Competitive Salary",
            description: "Industry-leading compensation packages with performance-based bonuses and annual increments.",
            color: "from-green-500 to-emerald-600",
            bgImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
        },
        {
            title: "Health Insurance",
            description: "Comprehensive medical coverage for you and your family, including dental and vision care.",
            color: "from-primary to-cyan-600",
            bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop"
        },
        {
            title: "Paid Time Off",
            description: "Generous vacation days, sick leave, and paid holidays to maintain work-life balance.",
            color: "from-orange-500 to-red-600",
            bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
        },
        {
            title: "Learning & Development",
            description: "Access to training programs, certifications, workshops, and conferences to grow your skills.",
            color: "from-purple-500 to-primary-light",
            bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
        },
        {
            title: "Remote Work Options",
            description: "Flexible work-from-home policies and hybrid working arrangements for better flexibility.",
            color: "from-primary to-primary-light",
            bgImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
        },
        {
            title: "Career Growth",
            description: "Clear career progression paths with mentorship programs and leadership development.",
            color: "from-red-500 to-primary-light",
            bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
        },
        {
            title: "Free Meals & Snacks",
            description: "Complimentary lunch, breakfast options, and unlimited snacks in the office pantry.",
            color: "from-yellow-500 to-primary",
            bgImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
        },
        {
            title: "Transport Allowance",
            description: "Monthly transportation reimbursement or company-provided shuttle services.",
            color: "from-teal-500 to-green-600",
            bgImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop"
        },
        {
            title: "Retirement Plans",
            description: "Provident fund contributions and retirement savings plans for your future security.",
            color: "from-gray-600 to-gray-800",
            bgImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop"
        },
        {
            title: "Team Events",
            description: "Regular team outings, celebrations, and company-sponsored social activities.",
            color: "from-pink-500 to-rose-600",
            bgImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
        },
        {
            title: "Wellness Programs",
            description: "Gym memberships, yoga classes, mental health support, and wellness initiatives.",
            color: "from-green-500 to-primary-light",
            bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop"
        },
        {
            title: "Parental Leave",
            description: "Extended maternity and paternity leave with flexible return-to-work options.",
            color: "from-violet-500 to-primary",
            bgImage: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=300&fit=crop"
        }
    ];

    const additionalPerks = [
        "Employee referral bonus program",
        "Performance recognition awards",
        "Annual company retreats",
        "Stock options for senior positions",
        "Technology equipment allowance",
        "Professional membership fees covered",
        "Relocation assistance",
        "Education assistance for higher studies",
        "Life and disability insurance",
        "Childcare support",
        "Flexible spending accounts",
        "Employee assistance programs"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Hero Section */}
            <div className="relative text-white h-[550px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${Employee})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div>
                        {/* <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                            Careers at The Contrractum
                        </span> */}
                        <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl leading-tight">
                            Employee Benefits & Perks
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl drop-shadow-lg leading-relaxed">
                            We believe in taking care of our team. Discover the comprehensive benefits package designed to support your professional growth and personal well-being.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Benefits Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <div className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                        Employee Benefits
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                        Why Work With Us?
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        We offer a comprehensive benefits package that goes beyond the basics to ensure you thrive both professionally and personally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-500 hover:-translate-y-2"
                        >
                            <div className="relative h-40 overflow-hidden">
                                <img 
                                    src={benefit.bgImage} 
                                    alt={benefit.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Perks Section */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                            More Perks
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black mb-6">Additional Perks</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            And there's more! Here are some additional benefits you'll enjoy as part of our team.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                        {additionalPerks.map((perk, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 hover:bg-white/10 transition-all duration-300 border border-white/10 group"
                            >
                                <svg className="w-7 h-7 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white font-medium">{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl shadow-2xl overflow-hidden border border-blue-700">
                    <div className="grid md:grid-cols-2 gap-0 items-center">
                        <div className="p-12 lg:p-16">
                            <div className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                                Join Us Today
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                                Ready to Join Our Team?
                            </h2>
                            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                                Explore our current job openings and start your journey with The Contrractum today.
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <a
                                    href="#/careers/jobs"
                                    className="inline-block px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                                >
                                    View Job Openings
                                </a>
                                <a
                                    href="#/careers/life"
                                    className="inline-block px-8 py-4 bg-transparent text-white border-2 border-white font-bold rounded-xl hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1">
                                
                                    Life at Company
                                </a>
                            </div>
                        </div>
                        <div className="hidden md:block relative h-full min-h-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-900/50 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800"
                                alt="Team collaboration"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                        Have Questions?
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                        Have Questions About Our Benefits?
                    </h3>
                    <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                        Our HR team is here to help. Reach out to learn more about our comprehensive benefits package.
                    </p>
                    <a
                        href="#/contact/touch"
                        className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                    
                     Contact HR Team
                    </a>
                </div>
            </div>
        </div>
    );
}
