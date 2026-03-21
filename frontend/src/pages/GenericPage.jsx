import { useParams, useLocation } from 'react-router-dom';

export default function GenericPage() {
    const location = useLocation();
    const { title, description } = location.state || {};

    // Extract page name from URL path
    const pageName = title || location.pathname.split('/').filter(Boolean).join(' / ').replace(/-/g, ' ');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-light">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-black mb-4 capitalize drop-shadow-lg">
                            {pageName}
                        </h1>
                        {description && (
                            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary/10">
                    <div className="prose max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                            Welcome to {pageName}
                        </h2>

                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary p-6 rounded-lg mb-8">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                This page is currently under development. We're working hard to bring you amazing content and features.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Efficient</h3>
                                <p className="text-gray-600">Built with modern technology for optimal performance.</p>
                            </div>

                            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Reliable</h3>
                                <p className="text-gray-600">Your data and privacy are our top priorities.</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-primary-light p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Customizable</h3>
                                <p className="text-gray-600">Tailored solutions to meet your specific needs.</p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-gray-600 mb-6">Have questions or need more information?</p>
                            <a
                                href="/contact"
                                className="inline-block bg-gradient-to-r from-primary to-primary-light text-white font-bold px-8 py-3 rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
