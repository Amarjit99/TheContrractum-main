import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Share2, UserPlus, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import { toast } from 'react-hot-toast';

export default function Affiliate() {
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        audienceCategory: '',
        paymentDetails: '',
        promotionMethod: ''
    });

    const [status, setStatus] = useState({ loading: false, error: null });
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            name: '',
            website: '',
            audienceCategory: '',
            paymentDetails: '',
            promotionMethod: ''
        });
        setStatus({ loading: false, error: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null });

        try {
            const res = await fetch(`${API}/api/affiliate-applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to store application');

            toast.success('Your form is submitted successfully.');
            handleReset();
        } catch (err) {
            setStatus({ loading: false, error: err.message });
            toast.error('Error submitting form: ' + err.message);
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const steps = [
        {
            icon: <UserPlus className="w-12 h-12 text-blue-600" />,
            title: "Join",
            description: "Sign up for our affiliate program. It's free and takes only a few minutes to get started."
        },
        {
            icon: <Share2 className="w-12 h-12 text-purple-600" />,
            title: "Recommend",
            description: "Share our premium services with your audience using customized linking tools and banners."
        },
        {
            icon: <DollarSign className="w-12 h-12 text-green-600" />,
            title: "Earn",
            description: "Earn up to 15% commission on every successful contract signed through your referral."
        }
    ];

    const faqs = [
        {
            question: "How does the Affiliate Program work?",
            answer: "You can share products and available programs on The Contractum with your audience through customized linking tools and earn money on qualifying purchases and customer actions."
        },
        {
            question: "How do I qualify for this program?",
            answer: "Bloggers, publishers, and content creators with a qualifying website or mobile app can participate in this program. We also welcome social media influencers with an established following."
        },
        {
            question: "How do I earn in this program?",
            answer: "You earn from qualifying purchases through the traffic you drive to The Contractum. Commission fees for qualifying services differ based on the contract category."
        },
        {
            question: "When do I get paid?",
            answer: "Commissions are paid monthly for all successfully closed and paid contracts originating from your referral links, with a minimum payout threshold of ₹5,000."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>
                
                <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-left mb-12 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Recommend Services.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Earn Commissions.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 max-w-lg">
                            Join our community of content creators, publishers, and bloggers who are earning with The Contractum Affiliate Program.
                        </p>
                        <Link to="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all transform hover:scale-105 inline-block">
                            Sign Up Now
                        </Link>
                    </div>
                    <div className="md:w-5/12">
                        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-green-500/20 p-3 rounded-2xl">
                                    <DollarSign className="w-8 h-8 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Top Earner Reward</h3>
                                    <p className="text-slate-400 text-sm">Earn up to 15% on high-value contracts</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400" />
                                    <span className="text-slate-200">Easy Signing Process</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400" />
                                    <span className="text-slate-200">Global Payout Support</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400" />
                                    <span className="text-slate-200">Real-time Performance Tacking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it Works Section */}
            <div className="py-24 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How it Works</h2>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-slate-50 p-10 rounded-3xl text-center group hover:bg-white hover:shadow-2xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-2">
                            <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commission Table Section */}
            <div className="bg-slate-50 py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Commission Structure</h2>
                        <p className="text-slate-600">Our transparent earning model based on contract value.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Service Category</th>
                                    <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Commission Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-semibold text-slate-700">Digital Solutions (SaaS/Apps)</td>
                                    <td className="px-8 py-6 font-bold text-blue-600">12%</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-semibold text-slate-700">Business Consultancy</td>
                                    <td className="px-8 py-6 font-bold text-blue-600">15%</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-semibold text-slate-700">IT Infrastructure Projects</td>
                                    <td className="px-8 py-6 font-bold text-blue-600">10%</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-semibold text-slate-700">GIS & Research Services</td>
                                    <td className="px-8 py-6 font-bold text-blue-600">14%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Application Form Section */}
            <div id="apply-form" className="py-24 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Affiliate Registration Form</h2>
                        <p className="text-slate-500">Apply today and start earning within 48 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 bg-slate-50 outline-none transition-all"
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Website/Social Media Links</label>
                            <input
                                type="url"
                                name="website"
                                required
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 bg-slate-50 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Audience Category</label>
                            <input
                                type="text"
                                name="audienceCategory"
                                required
                                value={formData.audienceCategory}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 bg-slate-50 outline-none transition-all"
                                placeholder="Audience Category"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Payment Details</label>
                            <input
                                type="text"
                                name="paymentDetails"
                                required
                                value={formData.paymentDetails}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 bg-slate-50 outline-none transition-all"
                                placeholder="Payment Details"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Promotion Method</label>
                            <textarea
                                name="promotionMethod"
                                rows="4"
                                required
                                value={formData.promotionMethod}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:border-blue-500 bg-slate-50 outline-none transition-all resize-none"
                                placeholder="Promotion Method"
                            ></textarea>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50"
                            >
                                {status.loading ? 'Processing...' : 'Apply for Program'}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="sm:w-32 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-slate-50 py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block p-4 bg-white rounded-3xl shadow-sm mb-4">
                            <HelpCircle className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className="text-lg font-bold text-slate-800">{faq.question}</span>
                                    {openFaq === idx ? (
                                        <ChevronUp className="w-6 h-6 text-blue-600" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-slate-400" />
                                    )}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-6 pb-6 animate-fadeIn">
                                        <div className="w-full h-px bg-slate-100 mb-6"></div>
                                        <p className="text-slate-600 leading-relaxed text-lg">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="relative py-24 bg-blue-600 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start earning?</h2>
                    <p className="text-xl text-blue-100 mb-10">Join our affiliate community today and grow your revenue with The Contractum.</p>
                    <Link to="/contact/touch" className="bg-white text-blue-600 hover:bg-slate-100 font-extrabold py-5 px-12 rounded-full shadow-2xl transition-all transform hover:scale-105 inline-block text-lg">
                        Apply Now for Free
                    </Link>
                </div>
            </div>
        </div>
    );
}
