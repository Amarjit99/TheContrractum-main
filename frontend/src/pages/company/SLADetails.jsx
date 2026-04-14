import React from "react";
import { ShieldCheck, Activity, Clock, FileText, AlertTriangle, Scale, Percent, Zap } from "lucide-react";
import commitmentBg from "../../assets/commitment.webp"; // Using the same reliable background from the Reliability page

const uptimeGuarantees = [
    {
        icon: Activity,
        service: "Core Cloud Infrastructure",
        sla: "99.99%",
        downtime: "4.38 minutes / month",
        color: "from-blue-500 to-indigo-600"
    },
    {
        icon: Zap,
        service: "API & Data Gateway",
        sla: "99.95%",
        downtime: "21.90 minutes / month",
        color: "from-cyan-500 to-teal-600"
    },
    {
        icon: ShieldCheck,
        service: "Authentication Services",
        sla: "99.99%",
        downtime: "4.38 minutes / month",
        color: "from-purple-500 to-pink-600"
    },
    {
        icon: FileText,
        service: "Web Applications",
        sla: "99.90%",
        downtime: "43.80 minutes / month",
        color: "from-orange-500 to-red-600"
    }
];

const serviceCredits = [
    { uptime: "99.99% - 99.95%", credit: "10% of monthly fee" },
    { uptime: "99.94% - 99.00%", credit: "25% of monthly fee" },
    { uptime: "Less than 99.00%", credit: "50% of monthly fee" }
];

const priorityLevels = [
    {
        level: "P1 (Critical)",
        criteria: "Total system failure, primary services unavailable to all users.",
        response: "Under 15 minutes",
        updateFrequency: "Every 30 minutes"
    },
    {
        level: "P2 (High)",
        criteria: "Core functionality impaired or degraded for a majority of users.",
        response: "Under 1 hour",
        updateFrequency: "Every 2 hours"
    },
    {
        level: "P3 (Normal)",
        criteria: "Non-critical issues or minor bugs that do not affect core operations.",
        response: "Under 4 hours",
        updateFrequency: "Daily"
    },
    {
        level: "P4 (Low)",
        criteria: "General inquiries, feature requests, or documentation questions.",
        response: "Under 24 hours",
        updateFrequency: "As needed"
    }
];

const exclusions = [
    "Scheduled maintenance periods (with 48-hour prior notice)",
    "Force Majeure events (natural disasters, acts of war, internet-wide outages)",
    "Outages caused by third-party integrations not managed by The Contractum",
    "Downtime resulting from client-side configurations or custom code",
    "Periods where the client is in breach of contract terms (e.g., non-payment)"
];

export default function SLADetails() {
    return (
        <div className="bg-white">

            {/* ===== Hero ===== */}
            <div
                className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 py-32 px-6 overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(30, 58, 138, 0.8)), url(${commitmentBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="relative max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                        <FileText className="w-10 h-10 text-cyan-300" />
                    </div>
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-bold uppercase tracking-wider mb-6">
                        Service Level Agreement
                    </span>
                    <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                        Our SLA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Details</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Transparency and accountability are the foundations of enterprise reliability. Review our comprehensive uptime guarantees, incident response protocols, and service credit policies.
                    </p>
                </div>
            </div>

            {/* ===== Uptime Guarantees ===== */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Uptime Targets
                        </span>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">
                            Service Availability Commitments
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We engineer our systems for maximum resilience, ensuring your critical workflows remain uninterrupted.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {uptimeGuarantees.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="group bg-white p-8 rounded-3xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-default">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.service}</h3>
                                    <div className="flex flex-col gap-2 mt-4">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                            <span className="text-gray-500 font-medium">Monthly SLA</span>
                                            <span className="text-2xl font-black text-blue-600">{item.sla}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-gray-500 font-medium">Max Allowed Downtime</span>
                                            <span className="text-gray-900 font-bold">{item.downtime}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== Service Credits ===== */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                                Financial Backing
                            </span>
                            <h2 className="text-4xl font-black text-gray-900 mb-6">
                                Service Credit Policy
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                An SLA is only a promise without financial backing. If we fall short of our monthly uptime commitments, we automatically credit your account according to the tier schedule.
                            </p>
                            <p className="text-md text-gray-500 bg-purple-50 p-6 rounded-xl border border-purple-100 italic">
                                Service credits are calculated automatically at the end of every billing cycle. No manual support claims are required to receive your credit.
                            </p>
                        </div>

                        <div className="flex-1 w-full bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 opacity-20 rounded-full blur-3xl" />
                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-4">
                                    <Percent className="w-8 h-8 text-purple-400" />
                                    <h3 className="text-2xl font-bold">Credit Schedule</h3>
                                </div>
                                {serviceCredits.map((sc, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <span className="text-slate-300 font-medium">{sc.uptime}</span>
                                        <span className="text-purple-300 font-bold">{sc.credit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Incident Response ===== */}
            <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Support SLAs
                        </span>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">
                            Incident Response Times
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            How quickly our engineering teams respond based on incident severity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {priorityLevels.map((p, i) => (
                            <div key={i} className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-cyan-500 hover:-translate-y-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-6 h-6 text-cyan-600 group-hover:text-amber-500 transition-colors" />
                                    <h3 className="font-bold text-gray-900 text-lg">{p.level}</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-6 min-h-[60px]">{p.criteria}</p>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Target Response</p>
                                    <p className="font-bold text-blue-600 mb-3">{p.response}</p>
                                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Update Frequency</p>
                                    <p className="font-bold text-gray-800">{p.updateFrequency}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== Exclusions ===== */}
            <section className="py-24 px-6 bg-white shrink">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-start bg-rose-50 rounded-3xl p-10 border border-rose-100 shadow-lg">
                        <div className="flex-none">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-rose-500" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-4">
                                SLA Exclusions
                            </h2>
                            <p className="text-gray-600 mb-6">
                                The Service Level Agreement does not apply to any performance or availability issues resulting from the following scenarios:
                            </p>
                            <ul className="space-y-4">
                                {exclusions.map((ex, i) => (
                                    <li key={i} className="flex items-start gap-3 group">
                                        <Scale className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5 group-hover:text-rose-600 transition-colors" />
                                        <span className="text-gray-700">{ex}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-8 text-sm text-gray-500 font-medium">
                                * Note: For full legal definitions, definitions of downtime, and liability limitations, please refer to the Master Service Agreement (MSA) signed during client onboarding.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
