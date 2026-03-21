export default function BusinessSolutions() {
    const features = [
        { icon: "📊", title: "Strategic Planning", desc: "Data-driven business strategy" },
        { icon: "💼", title: "Process Optimization", desc: "Streamline operations" },
        { icon: "🚀", title: "Growth Acceleration", desc: "Scale your business" },
        { icon: "🎯", title: "ROI Focused", desc: "Measurable results" },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                Business <span className="text-green-400">Solutions</span>
                            </h1>
                            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
                                Drive business growth through strategic consulting and innovative solutions designed for modern enterprises.
                            </p>
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold px-6 sm:px-8 py-3 rounded-lg transition text-sm sm:text-base">
                                Explore Now
                            </button>
                        </div>
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" alt="Business Solutions" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-slate-900">Our Business Solutions</h2>
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
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" alt="Location Analytics" className="w-full h-auto rounded-lg shadow-lg order-2 md:order-1" />
                        <div className="order-1 md:order-2">
                            <p className="text-green-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Location Analytics</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">GIS Solutions for Business</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Leverage geographic insights to optimize your business operations, expand markets, and make smarter location-based decisions.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Market analysis & site selection
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Customer segmentation
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Territory optimization
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Supply chain visualization
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
                            <p className="text-green-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Technology Infrastructure</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">CS & IT Services</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Build robust IT infrastructure that supports your business growth. Our services ensure reliability, security, and scalability.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Enterprise architecture design
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Application development
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> System integration
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Legacy modernization
                                </li>
                            </ul>
                        </div>
                        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" alt="IT Services" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>

            {/* MRAS Services */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Managed Services" className="w-full h-auto rounded-lg shadow-lg order-2 md:order-1" />
                        <div className="order-1 md:order-2">
                            <p className="text-green-500 font-bold text-xs sm:text-sm uppercase tracking-wide mb-2">Managed Services</p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">MRAS Services</h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                Reduce operational burden with our managed resilience and support services. Focus on your core business while we handle infrastructure.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Managed IT operations
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Service desk support
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Infrastructure management
                                </li>
                                <li className="flex gap-3 text-sm sm:text-base text-slate-700">
                                    <span className="text-green-500 font-bold">✓</span> Cost optimization
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Let's Grow Your Business Together</h2>
                    <p className="text-green-100 text-sm sm:text-base mb-6 max-w-2xl mx-auto">Our business solutions are designed to maximize your ROI and accelerate growth.</p>
                    <button className="bg-primary text-white font-bold px-6 sm:px-8 py-3 rounded-lg hover:bg-primary-dark transition text-sm sm:text-base">
                        Request Demo
                    </button>
                </div>
            </div>
        </div>
    );
}

