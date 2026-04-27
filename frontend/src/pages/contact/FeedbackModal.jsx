import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send } from "lucide-react";

const ratings = [
  { id: 1, label: "Very bad", emoji: "😠" },
  { id: 2, label: "Bad", emoji: "😕" },
  { id: 3, label: "Okay", emoji: "😐" },
  { id: 4, label: "Good", emoji: "🙂" },
  { id: 5, label: "Very good", emoji: "😄" },
];

const FeedbackModal = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(3);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
 
  const handleSubmit = async () => {
    if (!message.trim()) return;
    setStatus({ loading: true, success: false, error: null });
    try {
      const resp = await fetch(`${API}/api/public/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: selected, message }),
      });
      if (resp.ok) {
        setStatus({ loading: false, success: true, error: null });
        setTimeout(() => navigate(-1), 2000);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Submission failed. Please try again." });
    }
  };
 
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[500px] bg-white shadow-2xl border border-gray-400">
 
        {/* Header */}
        <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            We want to hear your feedback!
          </h2>
          <button onClick={() => navigate(-1)} className="hover:bg-primary-dark p-1 rounded transition-colors">
            <X size={20} />
          </button>
        </div>
 
        {/* Content */}
        <div className="p-6">
 
          {/* Rating Question */}
          <p className="text-gray-700 mb-6 font-medium text-center">
            How would you rate your experience on our website today?
          </p>
 
          {/* Emoji Ratings */}
          <div className="flex justify-between items-center mb-2 px-4">
            {ratings.map((rate) => (
              <div
                key={rate.id}
                onClick={() => setSelected(rate.id)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center text-2xl rounded-full border-2 transition-all duration-300 transform group-hover:scale-110
                  ${selected === rate.id
                      ? "border-blue-600 bg-blue-50 scale-110 shadow-lg shadow-blue-100"
                      : "border-gray-200 hover:border-blue-300"
                    }`}
                >
                  {rate.emoji}
                </div>
              </div>
            ))}
          </div>
 
          {/* Labels */}
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-8 px-4">
            <span>Critical</span>
            <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] tracking-widest shadow-lg">
              {ratings.find((r) => r.id === selected)?.label}
            </span>
            <span>Excellent</span>
          </div>
 
          {/* Suggestion */}
          <p className="text-gray-700 mb-3 font-medium">
            Do you have any suggestions for how to improve our website?
          </p>
 
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status.success}
            placeholder="Tell us what you think..."
            className="w-full border-2 border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none shadow-inner"
          ></textarea>
 
          {status.error && <p className="text-red-500 text-xs mt-2 font-bold ml-1">{status.error}</p>}
          {status.success && <p className="text-emerald-500 text-xs mt-2 font-black ml-1 uppercase tracking-widest">✅ Thank you! Redirecting...</p>}
 
          {/* Send Button Group */}
          <div className="flex justify-end items-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleSubmit}
              disabled={status.loading || status.success || !message.trim()}
              className={`bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {status.loading ? "Sending..." : status.success ? "Sent!" : (
                <>Submit Feedback <Send size={16} /></>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-[0.2em] font-medium italic">
            Your feedback helps us <span className="text-blue-600">evolve</span>.
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
