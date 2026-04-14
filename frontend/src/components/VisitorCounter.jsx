import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const VisitorCounter = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const incrementAndFetch = async () => {
            try {
                // Only count once per browser session
                if (!sessionStorage.getItem("counted")) {
                    const res = await fetch(`${API_URL}/api/visitors/increment`, {
                        method: "POST",
                    });
                    const data = await res.json();
                    sessionStorage.setItem("counted", "1");
                    animateTo(data.count);
                } else {
                    const res = await fetch(`${API_URL}/api/visitors`);
                    const data = await res.json();
                    animateTo(data.count);
                }
            } catch {
                // Fallback: use localStorage if backend is unavailable
                const raw = localStorage.getItem("visitorCount");
                let stored = raw ? parseInt(raw, 10) : 0;
                if (!sessionStorage.getItem("counted")) {
                    stored += 1;
                    localStorage.setItem("visitorCount", String(stored));
                    sessionStorage.setItem("counted", "1");
                }
                animateTo(stored);
            }
        };

        const animateTo = (total) => {
            let current = 0;
            setCount(0);
            const steps = Math.min(total, 60);
            const increment = Math.ceil(total / steps);
            const delay = Math.max(20, Math.floor(1000 / steps));

            const timer = setInterval(() => {
                current += increment;
                if (current >= total) {
                    current = total;
                    clearInterval(timer);
                }
                setCount(current);
            }, delay);
        };

        incrementAndFetch();
    }, []);

    if (count === null) return null;

    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
            <Eye size={14} className="text-red-400" />
            <span className="text-gray-400 text-xs">
                <span className="text-white font-bold">{count.toLocaleString()}</span>
                &nbsp;visitors
            </span>
        </div>
    );
};

export default VisitorCounter;