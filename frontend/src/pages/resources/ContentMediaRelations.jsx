import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ContentMediaRelations() {
  const [formData, setFormData] = useState({
    fullName: "",
    outlet: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
      toast.error("Please provide a valid @gmail.com email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API}/api/media/relations-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          fullName: "", outlet: "", email: "", subject: "", message: ""
        });
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to submit inquiry.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=600&fit=crop&q=80" 
            alt="Media Relations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/80 to-blue-950/90"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
            <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Press Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Media Relations</h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto font-light">
            Connecting journalists and news agencies with corporate statements, spokesperson scheduling, and official brand assets.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {/* Left Columns - Info */}
        <div className="md:col-span-2 space-y-10">
          {/* PR Contacts */}
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-[#007BFF] rounded-full"></span>
              Media Contact Points
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-[#007BFF] uppercase tracking-wider mb-1">Corporate Communications</p>
                <p className="font-semibold text-slate-800 text-lg">Jane Smith</p>
                <p className="text-sm text-slate-500 mb-4">VP of Public Relations</p>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>Email: <a href="mailto:media@thecontractum.com" className="text-[#007BFF] hover:underline">media@thecontractum.com</a></p>
                  <p>Tel: +1 (555) 019-2834</p>
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Global Headquarters</p>
                <p className="font-semibold text-slate-800 text-lg">The Contractum Group</p>
                <p className="text-sm text-slate-500 mb-4">Corporate Relations Office</p>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>Tech District, Suite 400</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </section>

          {/* Boilerplate */}
          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-[#007BFF] rounded-full"></span>
              About The Contractum
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4 text-sm">
              The Contractum is a premier enterprise systems consulting group specializing in automated workflows, intelligent contract management software, and AI-driven business intelligence. Our research wing publishes technical briefs and corporate reports to assist organizations in system audits and digital transformations.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm">
              Founded in 2021, The Contractum serves enterprise clients globally, streamlining contract lifecycle management and legal operations with modern cloud architectures and AI orchestration.
            </p>
          </section>
        </div>

        {/* Right Column - Inquiry Form */}
        <div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg sticky top-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Media Inquiry Form</h3>
            <p className="text-xs text-slate-500 mb-6">Are you a member of the press? Submit an inquiry and our team will get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#007BFF] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Media Outlet / Publication</label>
                <input
                  type="text"
                  placeholder="e.g. Daily Tech News"
                  value={formData.outlet}
                  onChange={(e) => setFormData(p => ({ ...p, outlet: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#007BFF] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@newsoutlet.com"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#007BFF] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Interview Request"
                  value={formData.subject}
                  onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#007BFF] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message / Inquiry Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, deadline, or required details..."
                  value={formData.message}
                  onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#007BFF] text-slate-800"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
                className="w-full py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <span>Send Press Inquiry</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center z-10 border-t-4 border-[#007BFF]">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Inquiry Submitted</h3>
            <p className="text-sm text-slate-500 mb-6">Thank you. Your media inquiry has been logged. Our corporate communications team will respond to you shortly.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{ backgroundColor: '#007BFF', color: '#ffffff' }}
              className="w-full py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
