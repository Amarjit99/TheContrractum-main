import React from "react";
import { Target, Award, Lightbulb, Users, Heart, Leaf, CheckCircle, Sparkles, Rocket, Shield, TrendingUp } from "lucide-react";
import value1 from "../../assets/g1.png";
import value2 from "../../assets/g2.png";
import value3 from "../../assets/g3.png";
import value4 from "../../assets/g4.png";
import value5 from "../../assets/g5.png";
import value6 from "../../assets/g6.png";
import leadershipBg from "../../assets/leadership.webp";
import value from "../../assets/value.webp";
export default function Values() {
    const coreValues = [
        {
            id: 1,
            icon: "🎯",
            title: "Excellence",
            color: "from-blue-500 to-blue-600",
            description: "We pursue the highest standards in everything we do - from innovation to customer service.",
            details: [
                "Continuous improvement mindset",
                "Quality-first approach",
                "Attention to detail",
                "Best-in-class solutions",
                "Performance excellence"
            ],
            impact: "Drive superior results and customer satisfaction",
            image: value1
        },
        {
            id: 2,
            icon: "💎",
            title: "Integrity",
            color: "from-purple-500 to-purple-600",
            description: "We operate with transparency, honesty, and unwavering ethical principles in all dealings.",
            details: [
                "Transparent communication",
                "Ethical decision-making",
                "Accountability",
                "Honest partnerships",
                "Trustworthy relationships"
            ],
            impact: "Build lasting trust with all stakeholders",
            image: value2
        },
        {
            id: 3,
            icon: "💡",
            title: "Innovation",
            color: "from-green-500 to-green-600",
            description: "We embrace creativity, explore new ideas, and constantly push boundaries to drive progress.",
            details: [
                "Creative thinking",
                "Forward-looking approach",
                "Technology adoption",
                "Experimentation culture",
                "Continuous learning"
            ],
            impact: "Create breakthrough solutions and competitive advantage",
            image: value3
        },
        {
            id: 4,
            icon: "🤝",
            title: "Collaboration",
            color: "from-pink-500 to-pink-600",
            description: "We believe in the power of teamwork, diverse perspectives, and unified purpose.",
            details: [
                "Cross-functional teamwork",
                "Shared ownership",
                "Open communication",
                "Diverse perspectives",
                "Collective success"
            ],
            impact: "Achieve extraordinary results together",
            image: value4
        },
        {
            id: 5,
            icon: "👥",
            title: "Customer Focus",
            color: "from-orange-500 to-orange-600",
            description: "We put customers at the center of our decisions, consistently exceeding their expectations.",
            details: [
                "Customer-centric design",
                "Responsive support",
                "Value delivery",
                "Feedback incorporation",
                "Long-term partnerships"
            ],
            impact: "Build loyal customer relationships",
            image: value5
        },
        {
            id: 6,
            icon: "🌍",
            title: "Responsibility",
            color: "from-teal-500 to-teal-600",
            description: "We take accountability for our impact on society, environment, and sustainable future.",
            details: [
                "Environmental stewardship",
                "Social responsibility",
                "Ethical practices",
                "Community engagement",
                "Sustainable operations"
            ],
            impact: "Create positive impact for generations",
            image: value6
        },
    ];

    const valuesPillars = [
        {
            category: "Professional Excellence",
            icon: "⭐",
            values: ["Expertise", "Quality", "Results-Driven", "Performance Focus"],
            description: "We deliver exceptional quality and measurable outcomes in everything we undertake"
        },
        {
            category: "Human Values",
            icon: "❤️",
            values: ["Respect", "Empowerment", "Inclusivity", "Development"],
            description: "We value people, foster growth, and create an inclusive, empowering workplace"
        },
        {
            category: "Organizational Values",
            icon: "🏢",
            values: ["Transparency", "Accountability", "Collaboration", "Innovation"],
            description: "We operate with integrity, work together, and drive continuous improvement"
        },
        {
            category: "Social Impact",
            icon: "🌱",
            values: ["Sustainability", "Ethics", "Community Care", "Long-term Thinking"],
            description: "We commit to sustainable practices and positive impact on society and environment"
        },
    ];

    const whenWeUphold = [
        {
            situation: "Facing Pressure for Quick Results",
            value: "Integrity",
            action: "We maintain ethical standards and quality even under pressure",
            outcome: "Build sustainable, trustworthy solutions"
        },
        {
            situation: "Solving Complex Problems",
            value: "Collaboration",
            action: "We bring diverse teams together to find innovative solutions",
            outcome: "Create breakthrough results through collective wisdom"
        },
        {
            situation: "Encountering New Opportunities",
            value: "Innovation",
            action: "We explore creative approaches and embrace calculated risks",
            outcome: "Drive industry-leading solutions and competitive advantage"
        },
        {
            situation: "Interacting with Customers",
            value: "Customer Focus",
            action: "We listen, understand, and exceed expectations consistently",
            outcome: "Build lasting partnerships and loyalty"
        },
        {
            situation: "Making Strategic Decisions",
            value: "Responsibility",
            action: "We consider long-term impact on all stakeholders",
            outcome: "Create sustainable value for communities and environment"
        },
        {
            situation: "Setting Goals and Standards",
            value: "Excellence",
            action: "We pursue the highest standards and continuous improvement",
            outcome: "Deliver superior results and industry recognition"
        },
    ];

    const valuesBehaviors = [
        {
            behavior: "Speak Up with Ideas",
            alignment: ["Innovation", "Collaboration"],
            description: "Encourage creative thinking and diverse perspectives"
        },
        {
            behavior: "Admit Mistakes Openly",
            alignment: ["Integrity", "Responsibility"],
            description: "Take accountability and learn from experiences"
        },
        {
            behavior: "Support Colleagues",
            alignment: ["Collaboration", "Customer Focus"],
            description: "Help others succeed and foster teamwork"
        },
        {
            behavior: "Question & Challenge",
            alignment: ["Excellence", "Innovation"],
            description: "Drive improvement through constructive questioning"
        },
        {
            behavior: "Respect Differences",
            alignment: ["Collaboration", "Responsibility"],
            description: "Value diverse backgrounds and perspectives"
        },
        {
            behavior: "Go Extra Mile for Customers",
            alignment: ["Excellence", "Customer Focus"],
            description: "Exceed expectations and build lasting relationships"
        },
    ];

    const testimonials = [
        {
            role: "Chief Executive Officer",
            quote: "Our values aren't just words on a wall - they're embedded in every decision, every project, and every interaction with our stakeholders.",
            name: "Sarah Chen",
            company: "Leadership Team"
        },
        {
            role: "VP of Engineering",
            quote: "Excellence and innovation go hand-in-hand at our company. Our teams feel empowered to create breakthrough solutions because we trust and support each other.",
            name: "Marcus Rodriguez",
            company: "Technology Division"
        },
        {
            role: "Client Partnership Director",
            quote: "Customer focus isn't just a value - it's our competitive advantage. Every project is driven by what's best for our clients' long-term success.",
            name: "Priya Patel",
            company: "Client Success"
        },
    ];

    const commitments = [
        "Act with integrity in all our business dealings and decisions",
        "Invest in continuous learning and professional development",
        "Create an inclusive and diverse workplace culture",
        "Protect the environment and operate sustainably",
        "Support community initiatives and social causes",
        "Deliver excellence in quality and customer service",
        "Encourage innovation and creative thinking",
        "Maintain work-life balance and employee wellbeing"
    ];

    return (
        <div className="bg-white">
            {/* ===== Hero Section ===== */}
            <div 
                className="relative h-[600px] flex items-center justify-start overflow-hidden"
                style={{
                    backgroundImage: `url(${value})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                    {/* <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Our Foundation
                    </span> */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Values</span> Matter
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed drop-shadow-lg">
                        Six core values guide every decision we make and define who we are as an organization. They shape our culture, drive our actions, and inspire our teams.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:scale-105 transform transition-all duration-300 shadow-2xl text-lg">
                            <Award className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Discover Our Values
                        </button>
                        <button className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg">
                            Culture & Impact
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Six Core Values ===== */}
            <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Core Values
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Six Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These values form the foundation of our organization and guide our daily decisions, interactions, and strategic direction.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {coreValues.map((val) => (
                            <div key={val.id} className="group rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 relative min-h-[400px] md:min-h-[450px]">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img 
                                        src={val.image} 
                                        alt={val.title} 
                                        className="w-full h-full object-cover brightness-90 group-hover:scale-110 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/60 transition-all duration-500"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-purple-300 transition-colors">
                                        {val.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6 group-hover:text-white transition-colors leading-relaxed">
                                        {val.description}
                                    </p>
                                    <div className="space-y-2 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-white/20 group-hover:border-white/40 transition-colors">
                                        {val.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors">
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full group-hover:scale-150 transition-all duration-300"></span>
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs md:text-sm font-semibold text-purple-300 group-hover:text-purple-200 mt-auto">
                                        ✓ {val.impact}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Values Pillars ===== */}
            <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Values Framework
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Four Pillars of Our Values
                        </h2>
                        <p className="text-xl text-gray-600">How our values span across dimensions</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                        {valuesPillars.map((pillar, idx) => (
                            <div key={idx} className="group bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 min-h-[280px] md:min-h-[300px]">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-purple-600 transition-colors">
                                    {pillar.category}
                                </h3>
                                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 group-hover:text-gray-900 transition-colors leading-relaxed">
                                    {pillar.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {pillar.values.map((v, i) => (
                                        <span key={i} className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm font-semibold group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                            {v}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== When We Uphold Values ===== */}
            <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Values in Action
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            When We Uphold Our Values
                        </h2>
                        <p className="text-xl text-gray-600">Real-world examples of values in action</p>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        {whenWeUphold.map((item, idx) => (
                            <div key={idx} className="group relative">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                                    <div className="flex-none">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center font-bold text-white text-xl md:text-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                                            {(idx + 1)}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group-hover:-translate-y-2">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-purple-600 transition-colors">
                                                {item.situation}
                                            </h3>
                                            <div className="mb-4 md:mb-6">
                                                <p className="text-sm md:text-base font-semibold text-purple-600 mb-2">Core Value: {item.value}</p>
                                                <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">
                                                    {item.action}
                                                </p>
                                            </div>
                                            <div className="pt-3 md:pt-4 border-t border-gray-200">
                                                <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-colors">
                                                    <span className="font-bold text-green-600">✓ Outcome:</span> {item.outcome}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Values-Aligned Behaviors ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Daily Behaviors
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Behaviors That Embody Our Values
                        </h2>
                        <p className="text-xl text-gray-600">How we live our values every day</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {valuesBehaviors.map((behav, idx) => (
                            <div key={idx} className="group bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                    {behav.behavior}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                                    {behav.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {behav.alignment.map((val, i) => (
                                        <span key={i} className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Leadership Testimonials ===== */}
            <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src={leadershipBg} 
                        alt="Leadership Background" 
                        className="w-full h-full object-cover brightness-90"
                    />
                    <div className="absolute inset-0 bg-white/85"></div>
                </div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Leadership Voices
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Leadership on Values
                        </h2>
                        <p className="text-xl text-gray-600">Voices from across our organization</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((test, idx) => (
                            <div key={idx} className="group bg-white rounded-xl p-6 md:p-8 border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer min-h-[280px] md:min-h-[300px]">
                                <div className="mb-4 md:mb-6">
                                    <p className="text-4xl md:text-5xl text-purple-500 mb-3 md:mb-4">"</p>
                                    <p className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">
                                        {test.quote}
                                    </p>
                                </div>
                                <div className="pt-4 md:pt-6 border-t border-gray-200 group-hover:border-purple-300 transition-colors">
                                    <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                        {test.name}
                                    </p>
                                    <p className="text-gray-600 text-xs md:text-sm group-hover:text-gray-700 transition-colors">
                                        {test.role} • {test.company}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Our Commitments ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Commitments
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Our Commitments
                        </h2>
                        <p className="text-xl text-gray-600">Promises we make to uphold our values</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {commitments.map((commitment, idx) => (
                            <div key={idx} className="group flex items-start gap-4 p-6 bg-gradient-to-br from-white to-purple-50 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                                <div className="flex-none">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors leading-relaxed">
                                        {commitment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Values Impact Statistics ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Impact Metrics
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
                            Impact Through Values
                        </h2>
                        <p className="text-xl text-gray-600">Real outcomes from living our values</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { metric: "98%", label: "Employee Trust Score", detail: "Employees trust leadership" },
                            { metric: "95%", label: "Engagement Rate", detail: "Team actively engaged" },
                            { metric: "4.9/5", label: "Culture Rating", detail: "Glassdoor employee reviews" },
                            { metric: "1000+", label: "Volunteer Hours", detail: "Community service annually" },
                        ].map((stat, idx) => (
                            <div key={idx} className="group text-center p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:scale-110 transition-all duration-300 mb-3">
                                    {stat.metric}
                                </p>
                                <p className="text-gray-900 font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                                    {stat.label}
                                </p>
                                <p className="text-gray-600 text-sm group-hover:text-gray-700">
                                    {stat.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Every Team Member Matters ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" 
                                alt="Team Members" 
                                className="w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl group-hover:scale-105 transition-all duration-500 relative z-10"
                            />
                        </div>
                        <div>
                            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Team Culture
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                                Every Team Member Matters
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Our values thrive because every team member - from interns to executives - actively lives them. We believe each person is responsible for upholding these principles.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    "We create a culture where values aren't top-down, but lived bottom-up",
                                    "Every employee has a voice in shaping how we embody our values",
                                    "We celebrate and recognize those who exemplify our values",
                                    "We support continuous learning and growth rooted in our values"
                                ].map((point, idx) => (
                                    <div key={idx} className="group flex items-start gap-3 p-4 rounded-lg hover:bg-purple-50 transition-all duration-300 cursor-pointer">
                                        <div className="flex-none w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 font-medium group-hover:text-gray-900">{point}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300">
                                Join Our Team
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Final CTA ===== */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <Rocket className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                        Live Our Values With Us
                    </h2>
                    <p className="text-xl text-purple-100 mb-10 leading-relaxed">
                        Our values define who we are and everything we do. Join an organization where integrity, excellence, innovation, and collaboration aren't just words - they're lived every day.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 text-lg">
                            <Users className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Explore Careers
                        </button>
                        <button className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 text-lg">
                            Get to Know Us
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-purple-400/30 flex flex-col md:flex-row justify-center gap-8">
                        <div className="text-center group">
                            <p className="text-3xl font-bold text-white group-hover:scale-110 transition-all duration-300">6</p>
                            <p className="text-purple-100 font-semibold group-hover:text-white transition-colors">Core Values</p>
                        </div>
                        <div className="text-center group">
                            <p className="text-3xl font-bold text-white group-hover:scale-110 transition-all duration-300">98%</p>
                            <p className="text-purple-100 font-semibold group-hover:text-white transition-colors">Employee Trust</p>
                        </div>
                        <div className="text-center group">
                            <p className="text-3xl font-bold text-white group-hover:scale-110 transition-all duration-300">100%</p>
                            <p className="text-purple-100 font-semibold group-hover:text-white transition-colors">Culture Commitment</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}