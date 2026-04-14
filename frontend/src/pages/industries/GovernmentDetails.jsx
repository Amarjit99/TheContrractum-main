import React from 'react';
import { ShieldAlert, Fingerprint, Network, Scale, ShieldCheck, Database, Server } from 'lucide-react';
import cityBg from "../../assets/city.jpg"; // Using the same professional city background

export default function GovernmentDetails() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center" style={{
                backgroundImage: `url(${cityBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-black/80 to-transparent z-0"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-4xl text-left">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-bold uppercase tracking-wider mb-6 border border-blue-200 shadow-sm">
                            Public Sector Innovations
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-2xl">
                            Transforming the Future of Civic Engagement
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl drop-shadow-lg font-light">
                            Our comprehensive digital frameworks redefine how governments operate, interact with citizens, and secure national data infrastructures against modern threats. Dive into the detailed architecture of a smarter nation.
                        </p>
                    </div>
                </div>
            </div>

            {/* In-depth Content Section 1 */}
            <section className="py-24 px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-black text-gray-900 mb-8 pb-4 border-b-4 border-blue-200 inline-block">The Digital Governance Framework</h2>
                    <p className="text-gray-700 text-lg leading-loose mb-8">
                        The modernization of government services is no longer a luxury—it is an absolute necessity. At The Contrractum, we have developed a robust, scalable framework designed specifically for the rigorous demands of federal and municipal operations. We address foundational legacy bottlenecks by migrating entire infrastructures onto secure, private cloud environments that strictly adhere to international data sovereignty laws.
                    </p>
                    <p className="text-gray-700 text-lg leading-loose mb-12">
                        Our systems are designed for high availability and extreme fault tolerance. During unprecedented national emergencies or election periods, traffic to government portals can spike by over 10,000%. Our auto-scaling microservices architecture ensures zero downtime, guaranteeing that critical citizen services remain accessible precisely when they are most needed.
                    </p>

                    <div className="grid md:grid-cols-2 gap-10 mt-16">
                        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <ShieldCheck className="w-12 h-12 text-blue-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Military-Grade Encryption</h3>
                            <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                                Implementing end-to-end AES-256 encryption and quantum-resistant algorithms to safeguard national registries and classified departmental communications.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <Network className="w-12 h-12 text-indigo-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Inter-Departmental API Gateway</h3>
                            <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                                Breaking down bureaucratic data silos with secure, standardized API layers allowing seamless, authenticated data sharing across government branches.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* In-depth Content Section 2 */}
            <section className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-6">Core Operational Vectors</h2>
                        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
                            Our solutions systematically address the three major pillars of modern state infrastructure.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Vector 1 */}
                        <div className="flex flex-col lg:flex-row gap-12 items-start bg-gray-50 p-12 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="lg:w-1/4">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6">
                                    <Fingerprint className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">National Digital Identity Systems</h3>
                            </div>
                            <div className="lg:w-3/4">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    We architect sovereign digital identity solutions that empower citizens with secure, verifiable credentials. Utilizing decentralized identifiers (DIDs) and zero-knowledge proofs, our platforms allow individuals to authenticate themselves for public services, healthcare, and tax portals without exposing underlying sensitive biometric or demographic data to vulnerable centralized databases.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Decentralized Identity (DID)
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Zero-Knowledge Authentication
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Biometric Hashing
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Vector 2 */}
                        <div className="flex flex-col lg:flex-row gap-12 items-start bg-gray-50 p-12 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="lg:w-1/4">
                                <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6">
                                    <Scale className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Transparent Procurement & Audit Trails</h3>
                            </div>
                            <div className="lg:w-3/4">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    Corruption and inefficiency in public procurement cost governments billions globally. We implement enterprise blockchain solutions integrated directly into the tender and supply chain process. Every transaction, bid, and contract modification is recorded on an immutable ledger, providing real-time auditing capabilities for compliance officers and increasing public trust.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Immutable Audit Ledgers
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Smart Contract Governance
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Real-time Fund Tracking
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Vector 3 */}
                        <div className="flex flex-col lg:flex-row gap-12 items-start bg-gray-50 p-12 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="lg:w-1/4">
                                <div className="w-20 h-20 bg-cyan-100 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6">
                                    <Database className="w-10 h-10 text-cyan-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Municipal IoT Infrastructure</h3>
                            </div>
                            <div className="lg:w-3/4">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    Smart cities are not just concepts; they are functioning data hubs. Our unified municipal dashboards aggregate data streams from thousands of urban IoT sensors—covering traffic flow, air quality, energy grid distribution, and emergency response metrics. This massive data lake is processed in real-time by AI models to optimize city resource allocation automatically.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div> Massive IoT Data Aggregation
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div> Predictive Grid Maintenance
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-800 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div> Automated Traffic Analytics
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
