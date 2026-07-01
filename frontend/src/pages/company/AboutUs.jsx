import React from "react";
import { Link } from "react-router-dom";
import { Target, Rocket, Users, ShieldCheck, Award, Rocket as RocketIcon, Lightbulb, Globe } from "lucide-react";

const WorkingProcessItem = ({ title, desc, icon }) => (
    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition duration-300">
        <div className="mb-6">{icon}</div>
        <h4 className="text-2xl font-bold mb-4">{title}</h4>
        <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
);

export default function AboutUs() {
    const workingProcess = [
        { title: "Discover & Understand", desc: "We begin by understanding your goals, constraints, and market realities to define a practical roadmap.", icon: <Users className="text-primary w-8 h-8" /> },
        { title: "Plan with Precision", desc: "Our experts translate requirements into a clear execution plan with measurable milestones and outcomes.", icon: <ShieldCheck className="text-primary w-8 h-8" /> },
        { title: "Build with Confidence", desc: "We deliver with quality-first engineering practices, transparent communication, and accountable ownership.", icon: <Award className="text-primary w-8 h-8" /> },
        { title: "Integrate Technology", desc: "Modern technologies are integrated seamlessly to create scalable, secure, and future-ready solutions.", icon: <RocketIcon className="text-primary w-8 h-8" /> },
        { title: "Innovate Continuously", desc: "Our teams continuously optimize performance and experience through research, feedback, and iteration.", icon: <Lightbulb className="text-primary w-8 h-8" /> },
        { title: "Scale Nationwide", desc: "With strong delivery capabilities across India, we support consistent execution at every stage of growth.", icon: <Globe className="text-primary w-8 h-8" /> },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-96 bg-gray-900 flex items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" alt="About" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                </div>
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl">About Us</h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">Empowering businesses through innovation, expertise, and growth.</p>
                </div>
            </div>

            {/* Intro Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest rounded-full mb-6">Welcome to TheContractum</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">We Build Trust through <br /><span className="text-primary">Transparent Communication.</span></h2>
                    <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                        <p>Contractum Integral Solutions Pvt. Ltd. is a leading global provider of B2B and B2C services across multiple segments, offering Pan-India coverage.</p>
                        <p>Associated with international and domestic organizations, we provide responsible, accurate, and punctual services to our clients. We are dedicated to our client’s business growth and acceleration in the global market.</p>
                        <p>Our services are designed to ensure client satisfaction and happiness through achieved business goals and excellent technological solutions.</p>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-light rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200" className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover transition duration-500 hover:scale-[1.02]" alt="Team" />
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition duration-500">
                        <Target className="text-primary w-12 h-12 mb-8" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
                        <p className="text-gray-600 text-xl leading-relaxed italic">"To help our clients grow and accelerate in their respective businesses on the global platform."</p>
                    </div>
                    <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition duration-500">
                        <Rocket className="text-primary w-12 h-12 mb-8" />
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">TheContractum mission is simple: to help all small and mid-sized companies grow through exclusive expertise and business associations in Business Solutions and services.</p>
                    </div>
                </div>
            </section>

            {/* Who Are We? */}
            <section className="py-24 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12">Who Are We?</h2>
                <p className="max-w-4xl mx-auto text-gray-600 text-xl leading-relaxed">TheContractum is a leading global business Solution and Services company providing services across various business verticals. We strive for excellence, carving a niche through varied business techniques and Success Mantras built on truthfulness and quality.</p>
            </section>

            {/* Working Process */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Our Working Process</h2>
                    <p className="max-w-3xl mx-auto text-center text-gray-300 mb-12 text-lg">
                        A structured approach that combines strategy, execution, and continuous improvement to deliver dependable results.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workingProcess.map((item, idx) => <WorkingProcessItem key={idx} {...item} />)}
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-24 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-12">"The Customer is God"</h2>
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary-light p-1 rounded-3xl shadow-2xl">
                    <div className="bg-white p-10 md:p-16 rounded-[calc(1.5rem-1px)]">
                        <p className="text-gray-700 text-xl md:text-2xl leading-relaxed mb-10 text-left border-l-4 border-primary pl-8">We believe that "the Customer is God". Our team remains committed to helping our business clients progress and realize their entrepreneurial dreams through innovation and excellence.</p>
                        <p className="text-primary font-black text-lg uppercase tracking-widest">It is our prime responsibility to take you to high success.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Ready to Accelerate Your Entrepreneurial Dreams?</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/join/partner" className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition shadow-lg inline-block text-center cursor-pointer">Work With Us</Link>
                        <Link to="/contact/touch" className="px-10 py-4 border-2 border-primary text-black font-bold rounded-xl hover:bg-primary hover:text-white transition inline-block text-center cursor-pointer">Get Expert Advice</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}