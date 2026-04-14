import React from "react";
import { Link } from "react-router-dom";
import {
    Layers,
    Zap,
    Database,
    Share2,
    Smartphone,
    ShieldCheck,
    Activity,
    Search,
    ChevronRight,
    MousePointer2
} from "lucide-react";

export default function ExploreCapabilities() {
    const capabilities = [
        {
            icon: Layers,
            title: "Advanced Spatial Analysis",
            description: "Go beyond simple mapping with complex spatial joins, proximity analysis, and hot-spot detection to uncover hidden patterns in your geographic data.",
            features: ["Proximity & Buffer Analysis", "Density Mapping", "Network Analysis"]
        },
        {
            icon: Activity,
            title: "Real-time Monitoring",
            description: "Integrate live telemetry and IoT sensor data for real-time situational awareness and automated alerts based on geographic events.",
            features: ["Live Asset Tracking", "Geofencing Alerts", "Dynamic Dashboarding"]
        },
        {
            icon: Database,
            title: "Scalable Data Infrastructure",
            description: "Our enterprise-grade GIS databases handle millions of records with sub-second query performance and seamless multi-user versioning.",
            features: ["PostgreSQL/PostGIS Integration", "Cloud-Native Storage", "Automated ETL Pipelines"]
        },
        {
            icon: Share2,
            title: "Interoperable Architecture",
            description: "Connect your GIS environment with ERP, CRM, and BI tools. We support all major OGC standards for seamless data exchange.",
            features: ["REST/SOAP API Services", "WMS/WFS Support", "3rd-Party Integrations"]
        },
        {
            icon: Smartphone,
            title: "Mobile Field Collection",
            description: "Empower your field crews with offline-capable mobile apps for high-precision data collection, inspection, and synchronization.",
            features: ["Offline Map Access", "Centimeter-Level Accuracy", "Field-to-Office Sync"]
        },
        {
            icon: ShieldCheck,
            title: "Governance & Security",
            description: "Maintain strict control over your spatial data with granular user permissions, audit logs, and enterprise authentication (AD/SSO).",
            features: ["Granular RBAC", "Data Encryption", "Single Sign-On (SSO)"]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-slate-900 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold tracking-wider mb-6 border border-emerald-500/20">
                        TECHNICAL CAPABILITIES
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
                        Powering Decisions with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Spatial Intelligence
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Explore the technical foundations and advanced features that make our GIS platform the choice for data-driven organizations worldwide.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact/request-consultation" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2">
                            Request Technical Audit <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Core Capabilities Grid */}
            <div className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {capabilities.map((cap, i) => (
                            <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 border-t-4 border-t-transparent hover:border-t-emerald-500">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-500">
                                    <cap.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {cap.description}
                                </p>
                                <ul className="space-y-3">
                                    {cap.features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-slate-50 py-20 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {[
                        { label: "Query Speed", value: "<100ms" },
                        { label: "Uptime SLA", value: "99.99%" },
                        { label: "Data Protocols", value: "25+" },
                        { label: "Integrations", value: "500+" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">{stat.value}</div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-4 bg-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-8 leading-tight">
                        Ready to elevate your <br />
                        <span className="text-emerald-600">geographic capabilities?</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Join hundreds of forward-thinking companies that leverage our spatial engine to gain a competitive edge in their industry.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact/request-consultation" className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl">
                            Request Demo
                        </Link>
                        <Link to="/contact/touch" className="px-10 py-4 border-2 border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Contact Technical Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
