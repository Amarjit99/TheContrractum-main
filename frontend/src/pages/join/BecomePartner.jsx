import { useState } from 'react';
import { COUNTRIES } from '../../constants/countries';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BecomePartner() {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        countryIndex: 0,
        domain: '',
        sector: '',
        organizationDetails: '',
        achievements: ''
    });

    const [status, setStatus] = useState({ loading: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            name: '',
            contact: '',
            email: '',
            countryIndex: 0,
            domain: '',
            sector: '',
            organizationDetails: '',
            achievements: ''
        });
        setStatus({ loading: false, error: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null });

        const phoneWithCode = `${COUNTRIES[formData.countryIndex].code} ${formData.contact}`;
        const submissionData = { ...formData, contact: phoneWithCode };

        try {
            const res = await fetch(`${API}/api/partner-applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (!res.ok) throw new Error('Failed to store application');

            toast.success('Form submitted and stored in database successfully!');
            handleReset();
        } catch (err) {
            setStatus({ loading: false, error: err.message });
            toast.error('Error submitting form: ' + err.message);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div
                className="relative text-white py-32 overflow-hidden flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=600&fit=crop&q=80')" }}
            >
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Partner</h1>
                    <p className="text-xl text-gray-200">
                        Join our network of industry leaders and innovate together. Fill out the application below to get started.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                <div className="bg-slate-50 rounded-2xl shadow-xl p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Partnership Application</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
                                <div className="flex gap-2">
                                    <select
                                        name="countryIndex"
                                        value={formData.countryIndex}
                                        onChange={handleChange}
                                        className="w-32 px-2 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white font-bold appearance-none cursor-pointer"
                                    >
                                        {COUNTRIES.map((c, i) => (
                                            <option key={i} value={i}>{c.code} ({c.iso})</option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="contact"
                                        required
                                        value={formData.contact}
                                        onChange={handleChange}
                                        className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white"
                                        placeholder="XXXXX XXXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Domain</label>
                                <select
                                    name="domain"
                                    required
                                    value={formData.domain}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white appearance-none"
                                >
                                    <option value="">Select Domain</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Sector</label>
                                <select
                                    name="sector"
                                    required
                                    value={formData.sector}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white appearance-none"
                                >
                                    <option value="">Select Sector</option>
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                    <option value="Non-Profit">Non-Profit</option>
                                    <option value="Government">Government</option>
                                    <option value="Start-up">Start-up</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {formData.domain === "Others" && (
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Specify Domain</label>
                                    <input
                                        type="text"
                                        name="otherDomain"
                                        required
                                        value={formData.otherDomain}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white"
                                        placeholder="Enter your domain"
                                    />
                                </div>
                            )}
                            {formData.sector === "Others" && (
                                <div className="animate-fadeIn">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Specify Sector</label>
                                    <input
                                        type="text"
                                        name="otherSector"
                                        required
                                        value={formData.otherSector}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white"
                                        placeholder="Enter your sector"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Organization Details</label>
                            <textarea
                                name="organizationDetails"
                                required
                                rows="4"
                                value={formData.organizationDetails}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition resize-none bg-white"
                                placeholder="Tell us about your organization..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Achievements / Milestones</label>
                            <textarea
                                name="achievements"
                                rows="3"
                                value={formData.achievements}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition resize-none bg-white"
                                placeholder="Highlight key achievements..."
                            ></textarea>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
                            >
                                {status.loading ? 'Submitting...' : 'Submit Application'}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 rounded-lg transition shadow hover:shadow-md transform hover:-translate-y-1"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
