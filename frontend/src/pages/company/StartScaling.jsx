import React from 'react';
import { Rocket, Server, BarChart, HardDrive, Cpu, Network, ShieldCheck, Activity } from 'lucide-react';
import bgImage from '../../assets/success.webp';

export default function StartScaling() {
    const steps = [
        {
            title: 'Current State Analysis',
            desc: 'We map your existing infrastructure, identify performance bottlenecks, and analyze your current traffic patterns to establish baseline metrics.',
            icon: Activity,
            color: 'blue'
        },
        {
            title: 'Capacity Planning',
            desc: 'Our architects develop predictive models based on your projected growth, defining exact compute, memory, and database requirements for the future.',
            icon: BarChart,
            color: 'indigo'
        },
        {
            title: 'Cloud Migration Strategy',
            desc: 'Formulation of a zero-downtime migration path to a distributed, cloud-native architecture utilizing containerization and microservices.',
            icon: Cloud,
            color: 'cyan'
        },
        {
            title: 'Implementation & Provisioning',
            desc: 'Deployment of auto-scaling groups, load balancers, and replicated database clusters across multiple geographic regions.',
            icon: Server,
            color: 'green'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="relative bg-gradient-to-r from-slate-900 to-indigo-900 overflow-hidden py-32 px-6"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(49, 46, 129, 0.85)), url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="relative max-w-4xl mx-auto text-center z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 backdrop-blur-sm rounded-2xl mb-8 border border-emerald-400/30">
                        <Rocket className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                        The Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Infinite Scale</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100/90 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
                        Scaling is not just about adding servers; it's about re-engineering your operational paradigm. Discover how we transition enterprises to highly resilient, auto-scaling architectures.
                    </p>
                </div>
            </div>

            {/* Philosophy Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm bg-emerald-50 px-4 py-2 rounded-full mb-6 inline-block">Methodology</span>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">Scale Out,<br />Not Just Up</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Traditional vertical scaling hits a hard hardware ceiling. Our starting methodology focuses exclusively on <strong>horizontal scaling (scaling out)</strong>. By distributing workloads across autonomous microservices and leveraging stateless application layers, we eliminate single points of failure.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We separate computing from storage, enabling your web servers to scale instantly in response to web traffic spikes, while databases utilize read-replicas and sharding to maintain sub-millisecond query responses.
                        </p>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                        {[
                            { label: 'Compute Instances', icon: Cpu },
                            { label: 'Storage Volumes', icon: HardDrive },
                            { label: 'Network Bridges', icon: Network },
                            { label: 'Security Groups', icon: ShieldCheck }
                        ].map((metric, i) => {
                            const Icon = metric.icon;
                            return (
                                <div key={i} className="bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    <Icon className="w-8 h-8 text-indigo-600 mb-4" />
                                    <p className="font-bold text-slate-900">{metric.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-24 px-6 bg-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Our Scaling Roadmap</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">The step-by-step technical journey to transforming your infrastructure.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={index} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden border-t-4 border-emerald-500">
                                    <div className="absolute top-0 right-0 p-6 text-slate-100 text-6xl font-black transition-transform group-hover:scale-110 -z-10 group-hover:text-emerald-50">
                                        {index + 1}
                                    </div>
                                    <div className={`w-14 h-14 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:-translate-y-1 transition-transform`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

// Inline fallback for Cloud icon which wasn't imported above
function Cloud(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
    );
}
