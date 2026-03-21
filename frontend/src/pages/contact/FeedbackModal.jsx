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
  const [selected, setSelected] = useState(5);
  const [message, setMessage] = useState("");

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
          <p className="text-gray-700 mb-6">
            How would you rate your experience on our website today?
          </p>

          {/* Emoji Ratings */}
          <div className="flex justify-between items-center mb-2">
            {ratings.map((rate) => (
              <div
                key={rate.id}
                onClick={() => setSelected(rate.id)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center text-2xl rounded-full border-2 transition-all duration-200
                  ${
                    selected === rate.id
                      ? "border-green-500 bg-green-50 scale-110"
                      : "border-gray-300"
                  }`}
                >
                  {rate.emoji}
                </div>
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-6">
            <span>Very bad</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
              {ratings.find((r) => r.id === selected)?.label}
            </span>
            <span>Very good</span>
          </div>

          {/* Suggestion */}
          <p className="text-gray-700 mb-2">
            Do you have any suggestions for how to improve our website?
          </p>

          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-2 border-dashed border-red-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          {/* Send Button */}
          <div className="flex justify-end mt-6">
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded shadow-md flex items-center gap-2">
              Send <Send size={16} />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 mt-6">
            Powered by <span className="font-semibold text-primary">m</span>opinion
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
