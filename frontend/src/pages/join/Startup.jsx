import p3 from '../../assets/p3.webp';
export default function Startup() {
    const startupPrograms = [
        {
            name: 'Accelerator Program',
            duration: '12 Weeks',
            icon: '🚀',
            description: 'Fast-track program for early-stage startups',
            features: ['Mentorship', 'Funding Opportunities', 'Network Access', 'Pitch Training']
        },
        {
            name: 'Incubator Program',
            duration: '6 Months',
            icon: '🔥',
            description: 'Long-term support for idea development',
            features: ['Business Planning', 'Market Validation', 'Team Building', 'Legal Support']
        },
        {
            name: 'Student Innovation',
            duration: 'Year-round',
            icon: '🎓',
            description: 'Programs designed for student entrepreneurs',
            features: ['Mentorship', 'Competition', 'Funding', 'Networking Events']
        }
    ];

    const keyBenefits = [
        { number: '500+', label: 'Mentor Network', icon: '👥' },
        { number: '50M+', label: 'Funding Access', icon: '💰' },
        { number: '1000+', label: 'Portfolio Companies', icon: '📊' },
        { number: '80%', label: 'Success Rate', icon: '✅' }
    ];

    const features = [
        {
            title: 'Expert Mentorship',
            description: 'Connect with industry veterans and successful entrepreneurs who have been where you are.',
            icon: '🎯'
        },
        {
            title: 'Funding Support',
            description: 'Access to investment opportunities, grants, and connections with venture capitalists.',
            icon: '💵'
        },
        {
            title: 'Networking Events',
            description: 'Regular meetups, pitch events, and conferences to expand your professional networks.',
            icon: '🤝'
        },
        {
            title: 'Co-working Space',
            description: 'State-of-the-art facilities and collaborative workspace for your team.',
            icon: '🏢'
        },
        {
            title: 'Business Resources',
            description: 'Templates, tools, and guides to help you build and scale your business.',
            icon: '📚'
        },
        {
            title: '24/7 Support',
            description: 'Dedicated support team available to help you overcome challenges and grow.',
            icon: '🛟'
        }
    ];

    const startupStories = [
        {
            company: 'TechFlow Solutions',
            founder: 'Sarah Chen',
            result: 'Raised $2M in Series A',
            story: 'Started with an idea in 2023. Through our accelerator, found co-founders and secured early funding.',
            year: '2024'
        },
        {
            company: 'EcoVision',
            founder: 'James Rodriguez',
            result: '10K+ Users',
            story: 'Graduated from incubator with validated product. Now expanding into 3 new markets.',
            year: '2024'
        },
        {
            company: 'FintechHub',
            founder: 'Priya Patel',
            result: 'Acquired by FinServe',
            story: 'Student project turned into successful company with acquisition in 18 months.',
            year: '2025'
        },
        {
            company: 'HealthAI',
            founder: 'David Kim',
            result: '$5M Funding Round',
            story: 'Developed AI solution for healthcare. Secured institutional funding after mentorship.',
            year: '2025'
        }
    ];

    const studentPrograms = [
        {
            title: 'Business Plan Competition',
            prize: '₹50,000 Prize Pool',
            timeline: 'April - June',
            icon: '🏆'
        },
        {
            title: 'Startup Workshop Series',
            prize: 'Free Training',
            timeline: 'Year-round',
            icon: '📖'
        },
        {
            title: 'Mentorship Matching',
            prize: 'Expert Guidance',
            timeline: 'Monthly',
            icon: '👨‍🏫'
        },
        {
            title: 'Pitch Perfect Program',
            prize: 'Funding Connections',
            timeline: 'Quarterly',
            icon: '🎤'
        }
    ];

    const [expandedFaq, setExpandedFaq] = React.useState(null);

    const faqs = [
        {
            q: 'Who can apply to the program?',
            a: 'Founders at any stage - from ideation to scaling. We also welcome students with business ideas.'
        },
        {
            q: 'Is there a cost to join?',
            a: 'Entry to networking events is free. Accelerator and incubator programs have modest fees. Scholarships available.'
        },
        {
            q: 'How long does the program last?',
            a: '12 weeks for accelerator, 6 months for incubator. Student programs run year-round with flexible schedules.'
        },
        {
            q: 'Do you take equity?',
            a: 'For our programs, we only take equity if we provide seed funding (typically 5-8%). Otherwise, no equity stake.'
        },
        {
            q: 'What industries do you support?',
            a: 'We support all sectors: fintech, healthtech, edtech, green energy, e-commerce, B2B SaaS, and more.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 drop-shadow-lg">
                                Launch Your Startup
                            </h1>
                            <p className="text-base md:text-lg text-gray-100 mb-6 md:mb-8">
                                Turn your idea into a thriving business with our comprehensive startup and student programs. 
                                Get mentorship, funding, and network access to accelerate your growth.
                            </p>
                            <button className="bg-primary text-white hover:bg-blue-300 font-bold py-3 px-6 md:px-8 rounded-lg transition-colors text-sm md:text-base shadow-lg">
                                Apply Now
                            </button>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-primary rounded-2xl h-64 md:h-80 lg:h-96 flex items-center justify-center shadow-lg">
                                <span className="text-7xl md:text-8xl"><img src={p3} alt="Startup Illustration" className="w-full h-full object-cover rounded-b-4xl" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Stats Section */}
         <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {keyBenefits.map((benefit, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-lg p-6 md:p-8 text-center shadow-md 
                               hover:shadow-xl hover:scale-105 transition-transform transition-shadow duration-300 cursor-pointer"
                >
                    <div className="text-4xl md:text-5xl mb-3">{benefit.icon}</div>
                    <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {benefit.number}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base font-semibold">
                        {benefit.label}
                    </p>
                </div>
            ))}
        </div>
    </div>
</section>


            {/* Core Programs Section */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                        Our Programs
                    </h2>
                    <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-12 max-w-2xl mx-auto">
                        Choose the program that fits your stage and goals
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {startupPrograms.map((program, idx) => (
                            <div
                                key={idx}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary-dark rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative bg-white border-2 border-primary rounded-2xl p-6 md:p-8">
                                    <div className="text-5xl md:text-6xl mb-4">{program.icon}</div>
                                    <div className="inline-block bg-red-100 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        {program.duration}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                        {program.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base mb-6">
                                        {program.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {program.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Alternating Layout */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                        Why Join Our Programs?
                    </h2>
                    <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-16 max-w-2xl mx-auto">
                        Complete support system for startup success
                    </p>

                    <div className="space-y-12 md:space-y-20">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
                            >
                                <div className="flex-1">
                                    <div className="bg-primary/10 rounded-2xl p-12 md:p-16 flex items-center justify-center h-64 md:h-80 shadow-md">
                                        <span className="text-6xl md:text-7xl">{feature.icon}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base mb-6">
                                        {feature.description}
                                    </p>
                                    <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm">
                                        Explore →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Student Specific Programs */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                        Student-Specific Programs
                    </h2>
                    <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-12 max-w-2xl mx-auto">
                        Exclusive opportunities designed for student entrepreneurs
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {studentPrograms.map((prog, idx) => (
                            <div
                                key={idx}
                                className="bg-gradient-to-br from-gray-50 to-white border-2 border-primary/20 rounded-xl p-6 md:p-8 hover:border-primary transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{prog.icon}</div>
                                    <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {prog.timeline}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                    {prog.title}
                                </h3>
                                <p className="text-base md:text-lg font-bold text-primary">
                                    {prog.prize}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Slider */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                        Startup Success Stories
                    </h2>
                    <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-12 max-w-2xl mx-auto">
                        See what our alumni have achieved
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {startupStories.map((story, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-3">
                                    <span className="inline-block bg-red-100 text-primary text-xs font-bold px-2 py-1 rounded">
                                        {story.year}
                                    </span>
                                </div>
                                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                                    {story.company}
                                </h4>
                                <p className="text-sm text-gray-600 mb-3">Founded by {story.founder}</p>
                                <div className="bg-primary/10 rounded-lg p-4 mb-3">
                                    <p className="text-sm text-gray-700">
                                        {story.story}
                                    </p>
                                </div>
                                <p className="text-base font-bold text-primary">
                                    {story.result}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-center text-gray-600 text-sm md:text-base mb-8 md:mb-12">
                        Quick answers to common questions
                    </p>

                    <div className="space-y-3 md:space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                                >
                                    <span className="font-bold text-gray-900 text-sm md:text-base">
                                        {faq.q}
                                    </span>
                                    <span className={`text-primary font-bold text-lg transform transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t-2 border-gray-200">
                                        <p className="text-gray-700 text-sm md:text-base">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-900 text-white py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
                        Ready to Launch Your Startup?
                    </h2>
                    <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-100 max-w-2xl mx-auto">
                        Don't let your idea stay just an idea. Join our program and get the mentorship, 
                        funding, and network you need to succeed.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-3 px-6 md:px-8 rounded-lg transition-colors text-sm md:text-base shadow-lg">
                            Apply to Accelerator
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 md:px-8 rounded-lg transition-colors text-sm md:text-base">
                            Download Guidebook
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Contact */}
            <section className="bg-primary text-white py-8 md:py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-lg md:text-xl font-bold mb-4">Get in Touch With Our Team</h3>
                    <p className="text-gray-400 text-sm md:text-base mb-6">
                        Have questions about our programs? Contact us:
                    </p>
                    <a href="mailto:startups@thecontractum.com" className="text-primary hover:underline text-base md:text-lg font-semibold">
                        startups@thecontractum.com
                    </a>
                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6 text-sm md:text-base">
                        <div>📞 +1 (800) 789-4567</div>
                        <div>📍 Visit Our Office</div>
                        <div>🌍 Global Reach</div>
                    </div>
                </div>
            </section>
        </div>
    );
}

import React from 'react';
