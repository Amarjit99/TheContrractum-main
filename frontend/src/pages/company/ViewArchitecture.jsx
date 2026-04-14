import React from 'react';
import { Layers, Database, Lock, Globe, Server, Code, Activity, Network, ShieldCheck } from 'lucide-react';
import bgImage from '../../assets/success.webp';

export default function ViewArchitecture() {
    const architectures = [
        {
            title: "Content Delivery & Edge",
            description: "Static assets and cached content are delivered globally via robust CDNs with sub-10ms latency. Web Application Firewalls (WAF) drop malicious requests before they hit our servers.",
            icon: Globe,
            layer: "Tier 1: Edge"
        },
        {
            title: "Load Balancing Layer",
            description: "Layer 7 Application Load Balancers intelligently distribute incoming API and web traffic across hundreds of healthy computing instances across multiple availability zones.",
            icon: Network,
            layer: "Tier 2: Routing"
        },
        {
            title: "Microservices Compute",
            description: "Dockerized Node.js and Java Spring Boot containers managed by Kubernetes. Services scale independently based on CPU utilization, memory pressure, or custom SQS queue depth metrics.",
            icon: Code,
            layer: "Tier 3: Application"
        },
        {
            title: "Distributed Data Stores",
            description: "Relational data lives in clustered PostgreSQL instances with async read replicas. Session logic is kept in Redis memory grids, while unstructured data flows into NoSQL document clusters.",
            icon: Database,
            layer: "Tier 4: Persistence"
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
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-2xl mb-8 border border-blue-400/30">
                        <Layers className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Architecture</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100/90 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
                        A comprehensive, transparent view into our highly resilient, multi-tiered microservices ecosystem.
                    </p>
                </div>
            </div>

            {/* Layer Overview */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">The N-Tier Topology</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">Our systems utilize a decoupled multi-tier architecture, guaranteeing fault isolation and specialized scaling rules for every distinct component.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {architectures.map((arch, index) => {
                            const Icon = arch.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs mb-2 block">{arch.layer}</span>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{arch.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{arch.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30" />

                        <h3 className="text-3xl font-bold text-white mb-8 relative z-10">Data Flow Diagram</h3>

                        <div className="space-y-4 relative z-10 w-full">
                            <div className="w-full bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex justify-between items-center hover:bg-slate-700 transition">
                                <span className="text-slate-300 font-medium">User Browser / Mobile</span>
                                <Globe className="text-blue-400 w-5 h-5" />
                            </div>

                            <div className="flex justify-center">
                                <div className="w-1 h-8 bg-slate-700" />
                            </div>

                            <div className="w-full bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex justify-between items-center hover:bg-slate-700 transition">
                                <span className="text-slate-300 font-medium">AWS Route53 / CDN</span>
                                <ShieldCheck className="text-indigo-400 w-5 h-5" />
                            </div>

                            <div className="flex gap-16 justify-center">
                                <div className="w-1 h-8 bg-slate-700" />
                            </div>

                            <div className="w-full bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex justify-between items-center hover:bg-slate-700 transition">
                                <span className="text-slate-300 font-medium">Auto-Scaling Compute Cluster</span>
                                <Server className="text-emerald-400 w-5 h-5" />
                            </div>

                            <div className="flex gap-16 justify-center">
                                <div className="w-1 h-8 bg-slate-700" />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex flex-col items-center hover:bg-slate-700 transition">
                                    <Database className="text-orange-400 w-5 h-5 mb-2" />
                                    <span className="text-slate-300 text-sm font-medium">Primary DB</span>
                                </div>
                                <div className="flex-1 bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex flex-col items-center hover:bg-slate-700 transition">
                                    <Activity className="text-red-400 w-5 h-5 mb-2" />
                                    <span className="text-slate-300 text-sm font-medium">Redis Cache</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
