export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-light">
            <div className="bg-gradient-to-r from-primary via-primary-light to-primary-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h1 className="text-5xl font-black mb-4 text-center drop-shadow-lg">About Us</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">
                        Learn about our vision, mission, and values
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary/10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Content coming soon...
                    </p>
                </div>
            </div>
        </div>
    );
}
