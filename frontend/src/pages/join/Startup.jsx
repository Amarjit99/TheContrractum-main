import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import p3 from '../../assets/p3.webp';

export default function Startup() {
    const startupPrograms = [
        {
            name: 'Accelerator Program',
            duration: '12 Weeks',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
            description: 'Fast-track program for early-stage startups',
            features: ['Mentorship', 'Funding Opportunities', 'Network Access', 'Pitch Training']
        },
        {
            name: 'Incubator Program',
            duration: '6 Months',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
            description: 'Long-term support for idea development',
            features: ['Business Planning', 'Market Validation', 'Team Building', 'Legal Support']
        },
        {
            name: 'Student Innovation',
            duration: 'Year-round',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
            description: 'Programs designed for student entrepreneurs',
            features: ['Mentorship', 'Competition', 'Funding', 'Networking Events']
        }
    ];

    const keyBenefits = [
        {
            number: '500+',
            label: 'Mentor Network',
            description: 'Industry veterans & domain experts guiding your journey',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-indigo-600'
        },
        {
            number: '₹50M+',
            label: 'Funding Access',
            description: 'Capital connections with top-tier VCs & angel investors',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            number: '1000+',
            label: 'Portfolio Companies',
            description: 'Thriving startups launched through our ecosystem',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
            ),
            gradient: 'from-violet-500 to-purple-600'
        },
        {
            number: '80%',
            label: 'Success Rate',
            description: 'Of our alumni achieve product-market fit within 18 months',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
            ),
            gradient: 'from-amber-500 to-orange-600'
        }
    ];

    const features = [
        {
            title: 'Expert Mentorship',
            description: 'Connect with industry veterans and successful entrepreneurs who have been where you are.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
            extraPoints: [
                'One-on-one sessions with industry leaders',
                'Personalized growth roadmap development',
                'Access to exclusive masterclasses',
                'Technical guidance for product scaling'
            ]
        },
        {
            title: 'Funding Support',
            description: 'Access to investment opportunities, grants, and connections with venture capitalists.',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
            extraPoints: [
                'Seed funding for high-potential ideas',
                'Pitch deck review and refinement',
                'Introduction to global angel investors',
                'Assistance with grant applications'
            ]
        },
        {
            title: 'Networking Events',
            description: 'Regular meetups, pitch events, and conferences to expand your professional networks.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
            extraPoints: [
                'Bi-monthly demo days for investors',
                'Exclusive access to regional tech summits',
                'Alumni network for long-term collaboration',
                'Collaborative workshops with partner startups'
            ]
        },
        {
            title: 'Co-working Space',
            description: 'State-of-the-art facilities and collaborative workspace for your team.',
            image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
            extraPoints: [
                'High-speed internet and tech infrastructure',
                'Meeting rooms for pitch presentations',
                'Creative zones for brainstorming',
                'Access to 3D prototyping labs'
            ]
        },
        {
            title: 'Business Resources',
            description: 'Templates, tools, and guides to help you build and scale your business.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
            extraPoints: [
                'Legal advice on IP and company formation',
                'Discounted software subscriptions (SaaS perks)',
                'Marketing and branding toolkit',
                'Recruitment assistance for core teams'
            ]
        },
        {
            title: '24/7 Support',
            description: 'Dedicated support team available to help you overcome challenges and grow.',
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
            extraPoints: [
                'Dedicated relationship managers',
                'Technical troubleshooting around the clock',
                'Crisis management and strategy support',
                'Continuous progress tracking and feedback'
            ]
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
            image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=300&h=200&fit=crop',
            extraPoints: [
                'Structured feedback from judges',
                'Networking with VC firms',
                'Exclusive startup toolkits',
                'Opportunities for incubation'
            ]
        },
        {
            title: 'Startup Workshop Series',
            prize: 'Free Training',
            timeline: 'Year-round',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop',
            extraPoints: [
                'Hands-on coding and tech stacks',
                'Marketing strategy foundations',
                'Product design thinking sessions',
                'Lean startup methodology training'
            ]
        },
        {
            title: 'Mentorship Matching',
            prize: 'Expert Guidance',
            timeline: 'Monthly',
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&fit=crop',
            extraPoints: [
                'Direct access to research scholars',
                'Professional portfolio reviews',
                'Academic and career alignment',
                'Interview and pitch preparation'
            ]
        },
        {
            title: 'Pitch Perfect Program',
            prize: 'Funding Connections',
            timeline: 'Quarterly',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop',
            extraPoints: [
                'Professional videography for pitches',
                'Public speaking coaching',
                'Graphic design for presentational assets',
                'Confidence building workshops'
            ]
        }
    ];

    const [expandedFaq, setExpandedFaq] = useState(null);
    const [expandedFeature, setExpandedFeature] = useState(null);
    const [expandedStudentProg, setExpandedStudentProg] = useState(null);

    const faqs = [
        { q: 'Who can apply to the program?', a: 'Founders at any stage - from ideation to scaling. We also welcome students with business ideas.' },
        { q: 'Is there a cost to join?', a: 'Entry to networking events is free. Accelerator and incubator programs have modest fees. Scholarships available.' },
        { q: 'How long does the program last?', a: '12 weeks for accelerator, 6 months for incubator. Student programs run year-round with flexible schedules.' },
        { q: 'Do you take equity?', a: 'For our programs, we only take equity if we provide seed funding (typically 5-8%). Otherwise, no equity stake.' },
        { q: 'What industries do you support?', a: 'We support all sectors: fintech, healthtech, edtech, green energy, e-commerce, B2B SaaS, and more.' }
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
                            <Link to="/contact/touch">
                                <button className="bg-primary text-white hover:bg-blue-300 font-bold py-3 px-6 md:px-8 rounded-lg transition-colors text-sm md:text-base shadow-lg hover:scale-105 transform">
                                    Apply Now
                                </button>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-primary rounded-2xl h-64 md:h-80 lg:h-96 flex items-center justify-center shadow-lg overflow-hidden relative">
                                <img src={p3} alt="Startup Illustration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Stats Section */}
            <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Our Impact</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Numbers That Speak for Themselves
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {keyBenefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                            >
                                {/* Gradient accent bar at top */}
                                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${benefit.gradient} rounded-b-full group-hover:w-full transition-all duration-500`}></div>

                                {/* Icon */}
                                <div className={`w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                                    {benefit.icon}
                                </div>

                                {/* Stat Number */}
                                <p className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {benefit.number}
                                </p>

                                {/* Label */}
                                <p className="text-gray-700 text-sm font-bold uppercase tracking-wider mb-3">
                                    {benefit.label}
                                </p>

                                {/* Description */}
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Programs Section */}
            <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Our Programs
                    </h2>
                    <p className="text-center text-gray-600 text-base md:text-lg mb-12 max-w-2xl mx-auto">
                        Choose the program that fits your stage and goals
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {startupPrograms.map((program, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={program.image} alt={program.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            {program.duration}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col grow">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {program.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 grow">
                                        {program.description}
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        {program.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-700">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 shrink-0"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/contact/touch">
                                        <button className="w-full bg-slate-50 hover:bg-primary hover:text-white text-primary font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-sm shadow-sm border border-primary/20 hover:border-transparent mt-auto">
                                            Apply Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section - Alternating Layout */}
            <section className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Why Join Our Programs?
                    </h2>
                    <p className="text-center text-gray-600 text-base md:text-lg mb-16 max-w-2xl mx-auto">
                        Complete support system for startup success
                    </p>

                    <div className="space-y-16">
                        {features.map((feature, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center group`}>
                                <div className="flex-1 w-full relative">
                                    <div className="bg-white p-2 rounded-2xl shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                                        <img src={feature.image} alt={feature.title} className="w-full h-64 md:h-80 object-cover rounded-xl" />
                                    </div>
                                    <div className="absolute -inset-4 bg-primary/20 blur-xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <div className="flex-1 px-4 md:px-0">
                                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className={`overflow-hidden transition-all duration-500 ${expandedFeature === idx ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-primary/10">
                                            {feature.extraPoints.map((point, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <span className="text-primary font-bold">▹</span>
                                                    <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setExpandedFeature(expandedFeature === idx ? null : idx)}
                                        className="bg-transparent text-primary hover:text-primary-dark font-bold text-sm tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all"
                                    >
                                        {expandedFeature === idx ? (
                                            <>Close Features <span className="text-lg">↑</span></>
                                        ) : (
                                            <>Explore Feature <span className="text-lg">→</span></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Student Specific Programs */}
            <section className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Student-Specific Programs
                    </h2>
                    <p className="text-center text-gray-600 text-base md:text-lg mb-16 max-w-2xl mx-auto">
                        Exclusive opportunities designed for student entrepreneurs
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {studentPrograms.map((prog, idx) => (
                            <div key={idx} className="bg-white border text-left border-gray-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 flex items-center gap-6 group">
                                <div className="w-28 h-28 shrink-0 overflow-hidden rounded-xl">
                                    <img src={prog.image} alt={prog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-2">
                                        {prog.timeline}
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                        {prog.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-500 mb-4">
                                        {prog.prize}
                                    </p>

                                    <div className={`overflow-hidden transition-all duration-500 ${expandedStudentProg === idx ? 'max-h-64 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                        <ul className="space-y-2 py-2 border-t border-gray-100">
                                            {prog.extraPoints.map((point, i) => (
                                                <li key={i} className="flex items-center text-xs text-gray-600 italic">
                                                    <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => setExpandedStudentProg(expandedStudentProg === idx ? null : idx)}
                                        className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        {expandedStudentProg === idx ? (
                                            <>Close Details <span className="text-sm">↑</span></>
                                        ) : (
                                            <>Explore Details <span className="text-sm">→</span></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Slider */}
            <section className="py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Startup Success Stories</h2>
                    <p className="text-gray-600 mb-12">See what our alumni have achieved</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {startupStories.map((story, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 text-left shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                <span className="bg-primary/10 w-max text-primary text-xs font-bold px-3 py-1 rounded-full">{story.year}</span>
                                <h4 className="text-lg font-extrabold text-slate-800 mt-4 mb-1">{story.company}</h4>
                                <p className="text-sm text-slate-500 italic mb-4">by {story.founder}</p>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">{story.story}</p>
                                <div className="pt-4 border-t border-gray-100 shrink-0 mt-auto">
                                    <p className="text-primary font-bold text-sm">{story.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-900 relative overflow-hidden text-white py-16 md:py-24 px-4 md:px-6 lg:px-8">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-white">
                        Ready to Launch Your Startup?
                    </h2>
                    <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Don't let your idea stay just an idea. Join our program and get the mentorship, funding, and network you need to succeed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact/touch">
                            <button className="w-full sm:w-auto bg-primary border-2 border-white hover:bg-transparent text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm md:text-base">
                                Apply to Accelerator
                            </button>
                        </Link>
                        <Link to="/join/startup/guidebook">
                            <button className="w-full sm:w-auto bg-transparent border-2 border-white/50 hover:border-white text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm md:text-base">
                                Download Guidebook
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Contact */}
            <section className="bg-slate-800 text-white py-16 px-6 relative border-t border-slate-700">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    <h3 className="text-3xl font-extrabold mb-4 text-white">Get in Touch With Our Team</h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg">
                        Have questions about our programs, the application process, or how we can help your startup? Reach out to us.
                    </p>

                    <a href="mailto:startups@thecontractum.com" className="inline-block bg-primary/10 border border-primary/30 text-primary py-3 px-8 rounded-full mb-10 hover:bg-primary hover:text-white transition-all duration-300 font-bold tracking-wide">
                        startups@thecontractum.com
                    </a>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-slate-700 pt-10">
                        <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4 text-xl">📞</div>
                            <h4 className="text-white font-semibold mb-1">Call Us</h4>
                            <p className="text-gray-400 font-light">+1 (800) 789-4567</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4 text-xl">📍</div>
                            <h4 className="text-white font-semibold mb-1">Our Location</h4>
                            <p className="text-gray-400 font-light">Innovation Hub, Tech City</p>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4 text-xl">🌍</div>
                            <h4 className="text-white font-semibold mb-1">Global Reach</h4>
                            <p className="text-gray-400 font-light">Supporting Startups Nationwide</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}