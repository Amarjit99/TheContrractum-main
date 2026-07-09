import React from 'react';
import { Link } from 'react-router-dom';
import DynamicServices from "../../../components/DynamicServices";
import dmHero from "../../../assets/dm_hero.png";
import dmStrategy from "../../../assets/dm_strategy.png";
import dmAnalytics from "../../../assets/dm_analytics.png";

export default function DigitalMarketing() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-cyan-100 selection:text-cyan-900">
            {/* Hero Section */}
            <header className="relative h-[80vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 hover:scale-100"
                    style={{ backgroundImage: `url(${dmHero})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md mb-8">
                            <span className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em]">
                                Digital Excellence
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                            Dominate the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Digital Frontier
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-medium max-w-2xl">
                            The Contractum transforms your digital presence into a high-performance growth engine. We combine data-driven strategies with creative mastery to capture attention and convert leads.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact/quote"
                                className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-cyan-500/20 transform hover:-translate-y-1"
                            >
                                Start Your Strategy
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Strategic Value Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                Data-Driven Intelligence, <br />
                                Human-Centered Design
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Our approach to digital marketing isn't just about traffic; it's about the right traffic. We dive deep into market analytics to understand your audience's behavior, preferences, and pain points.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                                    <h4 className="text-cyan-600 font-black text-3xl mb-2">94%</h4>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-snug">Average Increase in Client Engagement</p>
                                </div>
                                <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                                    <h4 className="text-blue-600 font-black text-3xl mb-2">12x</h4>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-snug">ROI for Targeted SEM Campaigns</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute -inset-4 bg-cyan-500/5 rounded-[3rem] rotate-3"></div>
                            <img
                                src={dmStrategy}
                                alt="Marketing Strategy"
                                className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Grid - No Icons */}
            <section className="py-24 relative bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-20">
                        <span className="text-cyan-600 font-black text-sm uppercase tracking-[0.2em] mb-4 block">Our Capabilities</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">End-to-End Digital Solutions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* SEO */}
                        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-cyan-400 mb-6 transition-colors">
                                Search Engine <br /> Optimization
                            </h3>
                            <p className="text-slate-600 group-hover:text-slate-400 mb-8 leading-relaxed">
                                We climb the rankings using ethical, long-term SEO strategies. From technical audits to high-authority backlink building, we ensure your brand stays on page one.
                            </p>
                            <ul className="space-y-3">
                                {['Technical SEO', 'Keyword Research', 'On-Page Strategy'].map((item) => (
                                    <li key={item} className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SEM */}
                        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-cyan-400 mb-6 transition-colors">
                                Paid Search & <br /> Social Ads
                            </h3>
                            <p className="text-slate-600 group-hover:text-slate-400 mb-8 leading-relaxed">
                                Instant reach with laser-focused targeting. We manage high-converting PPC campaigns on Google, Meta, Linked-In, and Twitter to maximize your ROAS.
                            </p>
                            <ul className="space-y-3">
                                {['PPC Management', 'Retargeting', 'A/B Testing'].map((item) => (
                                    <li key={item} className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Content Marketing */}
                        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-cyan-400 mb-6 transition-colors">
                                Content Strategy & <br /> Storytelling
                            </h3>
                            <p className="text-slate-600 group-hover:text-slate-400 mb-8 leading-relaxed">
                                Content that educates, inspires, and converts. We create high-value blogs, whitepapers, videos, and social content that establishes your authority.
                            </p>
                            <ul className="space-y-3">
                                {['Blog Creation', 'Video Content', 'Email Newsletters'].map((item) => (
                                    <li key={item} className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-500 mb-6 transition-colors">
                                Social Media <br /> Ecosystems
                            </h3>
                            <p className="text-slate-600 group-hover:text-slate-400 mb-8 leading-relaxed">
                                We build communities, not just follower counts. Our team manages your entire social presence to ensure consistent brand voice and high engagement.
                            </p>
                            <ul className="space-y-3">
                                {['Channel Management', 'Crisis Monitoring', 'Influencer Collabs'].map((item) => (
                                    <li key={item} className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Email Marketing */}
                        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-500 mb-6 transition-colors">
                                High-Conversion <br /> Email Marketing
                            </h3>
                            <p className="text-slate-600 group-hover:text-slate-400 mb-8 leading-relaxed">
                                Direct communication with your most loyal customers. We design automated nurture sequences that keep your audience engaged and moving through the funnel.
                            </p>
                            <ul className="space-y-3">
                                {['Drip Campaigns', 'List Segmentation', 'Newsletters'].map((item) => (
                                    <li key={item} className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Performance Analytics */}
                        <div className="p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500">
                            <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-500 mb-6 transition-colors">
                                Performance <br /> Growth Analytics
                            </h3>
                            <p className="text-slate-600 group-hover:text-slate-400 mb-8 leading-relaxed">
                                Marketing is meaningless without measurement. We provide real-time dashboards and weekly deep-dives into your campaign performance and ROI.
                            </p>
                            <ul className="space-y-3">
                                {['Custom Dashboards', 'Attribution Modeling', 'Weekly Reporting'].map((item) => (
                                    <li key={item} className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Analytics Visual Section */}
            <section className="py-24 bg-slate-950 text-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[120px]"></div>
                            <img
                                src={dmAnalytics}
                                alt="Analytics Dashboard"
                                className="relative z-10 w-full h-[450px] object-cover rounded-[2rem] shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                            />
                        </div>
                        <div>
                            <span className="text-cyan-400 font-black text-sm uppercase tracking-[0.3em] mb-6 block">Growth Tracking</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 leading-tight">Watch Your Brand Grow in Real-Time</h2>
                            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                                Transparency is at the core of what we do. You'll have constant access to your performance metrics, meaning you never have to guess where your marketing budget is going.
                            </p>
                            <div className="space-y-6">
                                {[
                                    'Real-time conversion tracking & attribution',
                                    'Multi-channel performance aggregation',
                                    'Automated weekly strategy refinements'
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-4 py-4 border-b border-white/10">
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                        <span className="text-lg font-bold text-slate-200">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Methodology Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Our 4-Step Strategic Engine</h2>
                        <p className="text-lg text-slate-600 font-medium">We don't believe in guesswork. Our process ensures every move is calculated for maximum impact.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0">
                        {[
                            { step: '01', title: 'Audit', desc: 'Comprehensive analysis of current presence and competitors.' },
                            { step: '02', title: 'Strategize', desc: 'Developing a unique roadmap centered on high-value keywords.' },
                            { step: '03', title: 'Deploy', desc: 'Precision execution across all selected digital channels.' },
                            { step: '04', title: 'Scale', desc: 'Aggressive growth based on successful data patterns.' }
                        ].map((process, idx) => (
                            <div key={idx} className="p-10 bg-slate-50 md:even:bg-white flex flex-col border-y md:border-y-0 md:border-x border-slate-100 group hover:bg-slate-900 transition-all duration-500">
                                <span className="text-5xl font-black text-slate-200 group-hover:text-white/10 mb-8 transition-colors">{process.step}</span>
                                <h4 className="text-xl font-black text-slate-900 group-hover:text-cyan-400 mb-4 transition-colors uppercase tracking-widest">{process.title}</h4>
                                <p className="text-slate-500 group-hover:text-slate-400 leading-relaxed font-medium">{process.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Content Section */}
            <DynamicServices category="Digital Solutions" subCategory="Digital Marketing" />

            {/* Final CTA */}
            <section className="py-24 relative overflow-hidden bg-slate-900">
                <div className="absolute top-0 right-0 w-full h-full opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                        Ready to Outpace the <br />
                        <span className="text-cyan-400 uppercase">Competition?</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Stop following the trends and start setting them. Join forces with The Contractum and claim your place at the top of the search results.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/contact/quote"
                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-cyan-500/30 text-lg uppercase tracking-widest"
                        >
                            Get A Quote
                        </Link>
                        <Link
                            to="/solutions/info?service=digital-marketing"
                            className="bg-white/5 hover:bg-white/10 text-white font-black px-12 py-5 rounded-2xl transition-all border border-white/20 backdrop-blur-md text-lg uppercase tracking-widest"
                        >
                            Download Guide
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
