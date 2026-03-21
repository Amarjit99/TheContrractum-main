import p5 from "../../assets/p5.webp";
import p6 from "../../assets/p6.webp";
import p7 from "../../assets/p7.webp";
import p8 from "../../assets/p8.webp";
export default function DigitalSolutions() {
    const features = [
        { icon: "🌍", title: "Global Coverage", desc: "Serve customers across 150+ countries" },
        { icon: "⚡", title: "High Performance", desc: "99.9% uptime guarantee" },
        { icon: "🔒", title: "Secure & Scalable", desc: "Enterprise-grade security" },
        { icon: "💡", title: "AI-Powered", desc: "Advanced analytics & insights" },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                Digital <span className="text-blue-400">Solutions</span>
                            </h1>
                            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                                Transform your business with cutting-edge digital technologies. Our comprehensive solutions drive innovation, efficiency, and growth.
                            </p>
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition text-sm sm:text-base">
                                Get Started
                            </button>
                        </div>
                        <img src={p5} alt="Digital Solutions" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Why Choose Digital Solutions?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                                <div className="text-4xl mb-4">{f.icon}</div>
                                <h3 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">{f.title}</h3>
                                <p className="text-slate-600 text-xs sm:text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* GIS Solutions */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <img src={p6} alt="GIS Solutions" className="w-full h-auto rounded-lg shadow-lg order-2 md:order-1" />
                        <div className="order-1 md:order-2">
                            <p className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Geographic Information Systems</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">GIS Solutions</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Leverage geospatial intelligence to make data-driven decisions. Our GIS solutions help you visualize, analyze, and optimize location-based information for better business outcomes.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Spatial data analysis & mapping
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Real-time location tracking
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Predictive analytics
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Custom map development
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CS & IT Services */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <p className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Computer Science & Information Technology</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">CS & IT Services</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Comprehensive IT solutions tailored to your business needs. From cloud infrastructure to cybersecurity, we provide enterprise-grade services with expert support.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Cloud computing & migration
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Cybersecurity solutions
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Network infrastructure
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> 24/7 technical support
                                </li>
                            </ul>
                        </div>
                        <img src={p7} alt="IT Services" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* MRAS Services */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <img src={p8} alt="MRAS Services" className="w-full h-auto rounded-lg shadow-lg order-2 md:order-1" />
                        <div className="order-1 md:order-2">
                            <p className="text-blue-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Managed Resilience & Support Services</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">MRAS Services</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Ensure continuous business operations with our managed resilience and support services. We proactively monitor, maintain, and optimize your IT infrastructure.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Proactive monitoring & maintenance
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Disaster recovery planning
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Business continuity solutions
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-blue-500 font-bold">✓</span> Performance optimization
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section – Professional Dark */}
<div className="bg-blue-900 py-20">
  <div className="max-w-5xl mx-auto px-6 text-center text-white">

    <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-white">
      Ready to Transform Your Business?
    </h2>

    <p className="text-gray-100 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
      Contact our experts to discuss how our digital solutions can drive
      your success and accelerate growth.
    </p>

    <button className="bg-white text-blue-900 font-medium px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">
      Schedule Consultation
    </button>

  </div>
</div>

        </div>
    );
}

