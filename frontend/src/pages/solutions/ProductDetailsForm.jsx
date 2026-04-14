import React, { useState } from "react";
import { Package, Tag, FileText, Info, CheckCircle, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductDetailsForm() {
    const [formData, setFormData] = useState({
        productName: "",
        category: "software",
        version: "",
        specifications: "",
        description: "",
        contactEmail: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Details submitted:", formData);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-20 px-4">
            <div className="max-w-3xl mx-auto mt-10">
                <Link to="/solutions/digital" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 font-semibold transition-colors">
                    <ChevronLeft className="w-5 h-5" /> Back to Solutions
                </Link>

                <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                        <Package className="w-8 h-8 text-blue-600" />
                    </div>
                    
                    <h1 className="text-3xl font-black text-slate-900 mb-2 text-center">Product Setup Details</h1>
                    <p className="text-slate-500 text-center mb-10 max-w-md">Provide the technical and business details of your product to get started with our scaling solutions.</p>

                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Details Recorded!</h3>
                            <p className="text-slate-600">Our product team will analyze your specifications and reach out via email.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-blue-500" /> Product Name *
                                    </label>
                                    <input required name="productName" value={formData.productName} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="e.g. Enterprise CRM" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Info className="w-4 h-4 text-blue-500" /> Category
                                    </label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white">
                                        <option value="software">Software / SaaS</option>
                                        <option value="hardware">Hardware / Infrastructure</option>
                                        <option value="service">Digital Service</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-500" /> Key Specifications
                                </label>
                                <textarea name="specifications" value={formData.specifications} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white resize-none" placeholder="Primary features, tech stack, or dimensions..."></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Detailed Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white resize-none" placeholder="Briefly describe the product's purpose and target audience..."></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Business Email *</label>
                                <input required name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white" placeholder="john@company.com" />
                            </div>

                            <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98]">
                                Submit Product Details
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
