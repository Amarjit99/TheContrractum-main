import React from 'react';
import { ShieldCheck, Heart, Activity, Database, Microscope, CheckCircle2 } from 'lucide-react';
import healthcareImg from "../../assets/Healthcare.png"

export default function WhyChooseHealthcare() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden bg-slate-900 border-b-8 border-teal-500" style={{
                backgroundImage: `url(${healthcareImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/95 via-black/80 to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div>
                        <span className="inline-block bg-teal-500/20 text-teal-300 font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest border border-teal-500/30">
                            The Value Proposition
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Why Partner With <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                The Contrractum?
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl drop-shadow-lg font-light">
                            Developing technology for the healthcare sector requires more than just coding expertise. It demands a profound understanding of patient empathy, stringent regulatory environments, and zero-failure tolerances.
                        </p>
                    </div>
                </div>
            </div>

            {/* In-Depth Core Philosophy */}
            <section className="py-24 px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-10 border-b-4 border-teal-200 inline-block pb-4">Our Commitment to Health Tech</h2>

                    <p className="text-lg text-slate-700 leading-loose mb-8">
                        The intersection of healthcare and technology is arguably the most critical juncture in modern society. When software fails in typical consumer sectors, it results in lost revenue or minor inconveniences. When software fails in healthcare, lives are directly at stake. That fundamental reality informs every line of code we write, every architecture we design, and every product we deploy.
                    </p>
                    <p className="text-lg text-slate-700 leading-loose mb-12">
                        At The Contrractum, we do not view ourselves merely as software vendors; we are dedicated clinical partners. We integrate our elite engineering units directly alongside your doctors, nurses, hospital administrators, and compliance officers. This total immersion ensures that our solutions are not built in a vacuum but are actively designed to function seamlessly within high-pressure triage centers, remote tele-clinics, and sprawling research laboratories.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        <div className="bg-teal-50 p-10 rounded-2xl border-l-8 border-teal-500 shadow-sm">
                            <Activity className="w-12 h-12 text-teal-600 mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Clinician-Centric Design</h3>
                            <p className="text-slate-700 leading-relaxed">
                                We design workflows that reduce 'click-fatigue' for physicians. By streamlining how doctors interact with electronic health records (EHRs), we return valuable time directly back to direct patient care.
                            </p>
                        </div>
                        <div className="bg-emerald-50 p-10 rounded-2xl border-l-8 border-emerald-500 shadow-sm">
                            <Heart className="w-12 h-12 text-emerald-600 mb-6" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Patient Outcome Optimization</h3>
                            <p className="text-slate-700 leading-relaxed">
                                Utilizing advanced predictive AI, our systems flag potential adverse health events long before they become critical down-stream anomalies. Prevention is mathematically coded into our platforms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Differentiators Section */}
            <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white border-y border-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6">Uncompromising Standards</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            The technological differentiators that isolate our capabilities from conventional IT firms.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-teal-500 transition-colors">
                            <ShieldCheck className="w-14 h-14 text-teal-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Impenetrable Security Posture</h3>
                            <p className="text-slate-300 leading-relaxed">
                                With medical data actively targeted by global ransomware syndicates, we deploy zero-trust architectures and continuous cryptographic health-checks. Our compliance frameworks exceed HIPAA, GDPR, and localized medical data mandates.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-emerald-500 transition-colors">
                            <Database className="w-14 h-14 text-emerald-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">HL7 & FHIR Mastery</h3>
                            <p className="text-slate-300 leading-relaxed">
                                True interoperability means disparate systems communicating flawlessly. Our deep expertise in the latest FHIR (Fast Healthcare Interoperability Resources) protocols ensures that crucial patient data follows the patient globally without friction.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-cyan-500 transition-colors">
                            <Database className="w-14 h-14 text-cyan-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Agile R&D Integration</h3>
                            <p className="text-slate-300 leading-relaxed">
                                For bio-tech firms and medical researchers, our data-lake engineering enables the rapid processing of genomic sequences and vast clinical trial data, mathematically accelerating the time-to-market for life-saving therapeutics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Historical Legacy */}
            <section className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-black text-slate-900 mb-6">A Proven Track Record of Excellence</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                Words mean little without the architecture to support them. Over the past decade, we have successfully modernized the core infrastructure for over 200 hospital networks spanning 3 continents.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                From deploying rural telemedicine platforms in underserved communities to building ultra-low-latency robotic surgery network bridges for internationally renowned research hospitals, our legacy is coded directly into the improved survival rates of millions of patients worldwide. Let our engineering heritage become the foundation of your medical innovation.
                            </p>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <Activity className="w-10 h-10 text-teal-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">10+</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Years Dedicated to Health Tech</span>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <Microscope className="w-10 h-10 text-emerald-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">200+</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Successful Major Deployments</span>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center col-span-2">
                                    <CheckCircle2 className="w-10 h-10 text-cyan-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">100%</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Compliance Audit Pass Rate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
