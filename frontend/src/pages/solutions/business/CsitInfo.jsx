import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Code2, 
    Smartphone, 
    Palette, 
    Globe2, 
    ShoppingCart, 
    TrendingUp, 
    Search, 
    Download, 
    ArrowLeft, 
    Database, 
    Cpu, 
    Cloud, 
    ShieldCheck, 
    Layers,
    Clock,
    Award
} from 'lucide-react';
import it from "../../../assets/it.avif";

export default function CsitInfo() {
    const detailedServices = [
        {
            icon: Code2,
            title: "Custom Software Development",
            description: "We build tailored software architectures designed to solve complex business challenges. Our development lifecycle covers discovery, architecture design, prototyping, scaling, and continuous deployment.",
            features: ["Enterprise Application Development", "SaaS & Platform Engineering", "Legacy System Modernization", "API Integration & Development"]
        },
        {
            icon: Globe2,
            title: "Web Development & E-Commerce",
            description: "Our front-end and back-end engineers build fast, secure, and user-centric web applications and transactional platforms optimized for conversion and scalability.",
            features: ["Single Page Applications (SPA)", "Custom E-Commerce Architectures", "Headless CMS Solutions", "Progressive Web Apps (PWA)"]
        },
        {
            icon: Smartphone,
            title: "Mobile Application Development",
            description: "Native and cross-platform mobile apps built to deliver seamless user experiences. We leverage the latest frameworks to achieve high performance on both iOS and Android.",
            features: ["iOS & Android Native Apps", "Cross-Platform (React Native, Flutter)", "Mobile UI/UX Optimizations", "App Store Deployment & Management"]
        },
        {
            icon: Cloud,
            title: "Cloud & Infrastructure Solutions",
            description: "Future-proof cloud infrastructure setup and management. We help you migrate, configure, and automate scaling on AWS, Google Cloud, and Microsoft Azure.",
            features: ["Cloud Migration Strategy", "CI/CD & DevOps Automation", "Docker & Kubernetes Orchestration", "Serverless Architecture Design"]
        },
        {
            icon: ShieldCheck,
            title: "Cybersecurity & QA Testing",
            description: "Robust testing and safety protocols to secure your applications and data against vulnerabilities, ensuring compliance and uninterrupted business operations.",
            features: ["Vulnerability Assessment & Pen Testing", "Automated & Manual QA Testing", "Secure Coding Practices Audit", "Data Privacy & GDPR Compliance"]
        },
        {
            icon: Database,
            title: "Data Engineering & Analytics",
            description: "Translate complex raw data into actionable business intelligence. We build secure database solutions and analytical systems that fuel data-driven decisions.",
            features: ["Relational & NoSQL Database Design", "ETL Pipelines & Data Warehousing", "Interactive BI Dashboards", "Data Mining & Machine Learning Ready Platforms"]
        }
    ];

    const techStacks = [
        { category: "Frontend", techs: ["React.js", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript"] },
        { category: "Backend", techs: ["Node.js", "Express", "Python (Django/FastAPI)", "Java (Spring Boot)", "Go"] },
        { category: "Cloud & DevOps", techs: ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "GitHub Actions"] },
        { category: "Databases", techs: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Hero Section */}
            <div className="relative h-[450px] flex items-center" style={{ backgroundImage: `url(${it})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                        <Link 
                            to="/solutions/business/csit"
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-6 transition-all group"
                        >
                            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
                            Back to CS & IT Services
                        </Link>
                        <span className="block text-blue-400 text-sm font-bold uppercase tracking-widest mb-3">
                            Deep Dive & Capabilities
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            CS & IT Services <span className="text-blue-500">Capability Overview</span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                            Explore the technical standards, service layers, and framework delivery models we deploy to accelerate digital transformations for global companies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Capabilities Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                        Service Deep-Dive
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Our Technical Solutions & Expertise</h2>
                    <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {detailedServices.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                                <div>
                                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm sm:text-base">
                                        {service.description}
                                    </p>
                                </div>
                                <ul className="space-y-2 border-t border-slate-100 pt-6">
                                    {service.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tech Stack Matrix Section */}
            <div className="bg-slate-950 text-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                            Technology Ecosystem
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">Our Modern Tech Stack</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            We build using reliable, scalable, and cutting-edge software engineering tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {techStacks.map((stack, index) => (
                            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-lg font-black text-blue-400 mb-4 uppercase tracking-widest">{stack.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {stack.techs.map((tech, tIdx) => (
                                        <span 
                                            key={tIdx} 
                                            className="px-3.5 py-1.5 bg-slate-800 text-gray-300 text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Partner With Us Section */}
            <div className="bg-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Operational Excellence
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6">Why Organizations Partner With Us</h2>
                        <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Clock size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3">On-Time Delivery & SLA</h3>
                            <p className="text-slate-600 font-medium">
                                We adhere strictly to project timelines and Service Level Agreements (SLAs) with zero compromises on quality.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Cpu size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3">Agile Process Execution</h3>
                            <p className="text-slate-600 font-medium">
                                Regular sprint updates, transparent staging environments, and prompt feedback integration throughout the design life cycle.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Award size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-3">Certified Engineers</h3>
                            <p className="text-slate-600 font-medium">
                                Our development teams hold industry certifications from major cloud providers, Scrum Alliance, and specialized tech groups.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">
                        Ready to Learn More or Download the Brochure?
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                        Fill in your professional details to access our exhaustive capability sheets, case studies, and services lists.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/solutions/download?service=csit"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl hover:shadow-blue-500/40 text-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 active:scale-[0.98]"
                        >
                            <Download size={20} />
                            Brochure Download
                        </Link>
                        <Link
                            to="/contact/quote"
                            className="bg-white/10 hover:bg-white/20 text-white font-black px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-sm text-lg transform hover:-translate-y-1 active:scale-[0.98]"
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
