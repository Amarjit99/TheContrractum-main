import React from 'react';
import { Factory, Cog, Cpu, Truck, BarChart3, Settings, CheckCircle2 } from 'lucide-react';
import menn from "../../assets/menn.webp"

export default function OptimizeProduction() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative text-white h-[600px] overflow-hidden bg-slate-900 border-b-8 border-orange-500" style={{
                backgroundImage: `url(${menn})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-950/95 via-black/80 to-transparent z-0"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
                    <div>
                        <span className="inline-block bg-orange-500/20 text-orange-300 font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest border border-orange-500/30">
                            The Factory of the Future
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                            Next-Generation <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                                Production Scaling
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl drop-shadow-lg font-light">
                            Transforming legacy supply chains into intelligent, hyper-connected digital ecosystems. We engineer software that eliminates mechanical latency, predicts machine failure, and automates precision quality control.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Philosophy Section */}
            <section className="py-24 px-6 lg:px-8 bg-white border-b border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-10 border-b-4 border-orange-200 inline-block pb-4">Architecting Industrial Intelligence</h2>

                    <p className="text-lg text-slate-700 leading-loose mb-8">
                        The threshold between a standard assembly line and an autonomous production network is profound. Today's manufacturing landscape demands far more than basic automation; it requires deep-learning neural networks that can analyze robotic kinematics in real time, edge-computing infrastructure capable of processing sensory data locally, and digital twin environments that allow engineering teams to simulate supply chain shocks before they occur.
                    </p>
                    <p className="text-lg text-slate-700 leading-loose mb-12">
                        At The Contractum, we do not view manufacturing optimization as merely bolting tablets onto heavy machinery. We believe in total vertical integration. By breaking down data silos between the shop floor PLC networks and the executive ERP dashboards, we unlock unprecedented operational visibility.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                        <div className="bg-orange-50 p-10 rounded-3xl border border-orange-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <Cpu className="w-12 h-12 text-orange-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Edge Computing & IoT</h3>
                            <p className="text-slate-700 leading-relaxed relative z-10">
                                Deploying robust, low-latency micro-data centers directly onto the factory floor to eliminate massive cloud transit delays during critical robotic operations.
                            </p>
                        </div>
                        <div className="bg-amber-50 p-10 rounded-3xl border border-amber-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            <Cog className="w-12 h-12 text-amber-600 mb-6 relative z-10" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Predictive Machine Learning</h3>
                            <p className="text-slate-700 leading-relaxed relative z-10">
                                Analyzing high-frequency vibrational and thermal sensor data to forecast mechanical deterioration weeks before catastrophic failure occurs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Differentiators Section */}
            <section className="py-24 px-6 lg:px-8 bg-slate-900 text-white border-y border-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6">Our Engineering Superiority</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            The technological framework driving our clients' digital transformations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-orange-500 transition-colors">
                            <Factory className="w-14 h-14 text-orange-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Digital Twin Synchronization</h3>
                            <p className="text-slate-300 leading-relaxed">
                                We map entire supply chains into dynamic, physics-based virtual environments. Run thousands of "what-if" operational scenarios safely before committing Capital Expenditure.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-amber-500 transition-colors">
                            <BarChart3 className="w-14 h-14 text-amber-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">OEE Dashboard Mastery</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Our bespoke Overall Equipment Effectiveness applications consume machine data aggressively, distilling millions of data points into actionable insights for floor managers instantly.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-yellow-500 transition-colors">
                            <Truck className="w-14 h-14 text-yellow-400 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">Autonomous Logistics Support</h3>
                            <p className="text-slate-300 leading-relaxed">
                                From automated guided vehicles (AGVs) in the warehouse to intelligent fleet routing algorithms, we eliminate bottlenecks in material handling and dispatch.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Legacy */}
            <section className="py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-black text-slate-900 mb-6">Redefining Heavy Industry Capabilities</h2>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                The transition to Industry 4.0 is not a risk; the risk is allowing your competitors to arrive there first. Our enterprise architecture is battle-tested in grueling environments—from automotive assembly plants handling millimeter tolerances to continuous-process chemical refineries prioritizing safety above all.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                Partner with our deep-tech strategists to identify your highest-leverage optimization points, and watch as we architect software that permanently enhances your production output. We are the architects behind the autonomous factory.
                            </p>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <Settings className="w-10 h-10 text-orange-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">95%</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Process Automation</span>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
                                    <CheckCircle2 className="w-10 h-10 text-amber-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">Zero</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Unplanned Downtime target</span>
                                </div>
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center col-span-2">
                                    <BarChart3 className="w-10 h-10 text-yellow-600 mb-4" />
                                    <span className="text-3xl font-black text-slate-900 mb-2">35x</span>
                                    <span className="text-sm font-bold text-slate-500 uppercase">Average Return on Infrastructure investment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
