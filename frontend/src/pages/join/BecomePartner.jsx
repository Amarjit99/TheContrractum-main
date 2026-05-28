import { useState } from 'react';
import { COUNTRIES } from '../../constants/countries';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BecomePartner() {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactPerson: '',
        businessType: '',
        website: '',
        email: '',
        countryIndex: 0,
        contact: '',
        partnershipCategory: '',
        businessProposal: ''
    });

    const [status, setStatus] = useState({ loading: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            organizationName: '',
            contactPerson: '',
            businessType: '',
            website: '',
            email: '',
            countryIndex: 0,
            contact: '',
            partnershipCategory: '',
            businessProposal: ''
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
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Partner Registration Form</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Organization Name</label>
                                <input
                                    type="text"
                                    name="organizationName"
                                    required
                                    value={formData.organizationName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800"
                                    placeholder="Enter your organization name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Person</label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    required
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800"
                                    placeholder="Enter contact person's name"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Type</label>
                                <select
                                    name="businessType"
                                    required
                                    value={formData.businessType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800 appearance-none"
                                >
                                    <option value="">Select Business Type</option>
                                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="LLC">LLC (Limited Liability Company)</option>
                                    <option value="Corporation">Corporation</option>
                                    <option value="Non-Profit">Non-Profit</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        {formData.businessType === "Others" && (
                            <div className="animate-fadeIn">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Specify Business Type</label>
                                <input
                                    type="text"
                                    name="otherBusinessType"
                                    required
                                    value={formData.otherBusinessType || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800"
                                    placeholder="Enter your business type"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                <div className="flex gap-2">
                                    <select
                                        name="countryIndex"
                                        value={formData.countryIndex}
                                        onChange={handleChange}
                                        className="w-32 px-2 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white font-bold appearance-none cursor-pointer text-gray-800"
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
                                        className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800"
                                        placeholder="XXXXX XXXXX"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Partnership Category</label>
                            <select
                                name="partnershipCategory"
                                required
                                value={formData.partnershipCategory}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition bg-white text-gray-800 appearance-none"
                            >
                                <option value="">Select Partnership Category</option>
                                <option value="Technology Partner">Technology Partner</option>
                                <option value="Reseller Partner">Reseller Partner</option>
                                <option value="Enterprise Partner">Enterprise Partner</option>
                                <option value="Channel Partner">Channel Partner</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Proposal</label>
                            <textarea
                                name="businessProposal"
                                required
                                rows="6"
                                value={formData.businessProposal}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition resize-none bg-white text-gray-800"
                                placeholder="Describe your business proposal here..."
                            ></textarea>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={status.loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 cursor-pointer"
                            >
                                {status.loading ? 'Submitting...' : 'Submit Application'}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 rounded-lg transition shadow hover:shadow-md transform hover:-translate-y-1 cursor-pointer"
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
