import React, { useState, useEffect } from 'react';
import { Shield, Mail, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ConsentPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [manageCount, setManageCount] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [emailMode, setEmailMode] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success

    useEffect(() => {
        const accepted = localStorage.getItem('cookiesAccepted');
        const dismissed = sessionStorage.getItem('cookiesDismissed');
        if (!accepted && !dismissed) {
            // Initial delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);



    const handleManage = () => {
        if (isLocked) return;

        setIsVisible(false);
        const newCount = manageCount + 1;
        setManageCount(newCount);

        // Re-show after delay
        setTimeout(() => {
            setIsVisible(true);
            if (newCount >= 3) {
                setIsLocked(true);
            }
        }, 3000);
    };

    const handleCancel = () => {
        // Dismiss the popup without accepting — stores a session-only flag
        // so the popup won't reappear until the next browser session
        if (isLocked) return;
        setIsVisible(false);
        localStorage.setItem('cookiesAccepted', 'false');
        sessionStorage.setItem('cookiesDismissed', 'true');
    };

    const handleAcceptClick = () => {
        setEmailMode(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cookies/accept`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                localStorage.setItem('cookiesAccepted', 'true');
                setTimeout(() => setIsVisible(false), 2000);
            } else {
                setStatus('idle');
                toast.error('Subscription failed. Please try again.');
            }
        } catch (error) {
            console.error('Error accepting cookies:', error);
            setStatus('idle');
        }
    };

    // Also check sessionStorage dismissal
    useEffect(() => {
        const dismissed = sessionStorage.getItem('cookiesDismissed');
        if (dismissed) {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible && !isLocked) return null;

    return (
        <div className={`fixed inset-0 z-[9999] pointer-events-none transition-all duration-700 print:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div className={`absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-1000 ${isLocked ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

            {/* Popup Card */}
            <div className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-[calc(100%-2rem)] sm:w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl pointer-events-auto transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
                
                {/* Cancel / Close Button */}
                {!isLocked && (
                    <button
                        onClick={handleCancel}
                        className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                        aria-label="Dismiss cookie popup"
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl ${isLocked ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                        {isLocked ? <AlertTriangle size={32} /> : <Shield size={32} />}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white italic tracking-tight uppercase">
                            {isLocked ? 'Access Restricted' : 'Cookie Policy'}
                        </h2>
                        <p className="text-slate-400 font-medium">Your privacy, our priority.</p>
                    </div>
                </div>

                {/* Content */}
                {!emailMode ? (
                    <>
                        <p className="text-slate-300 leading-relaxed mb-8">
                            {isLocked 
                                ? "Multiple attempts to manage cookies without acceptance have been detected. To continue accessing The Contractum services and view our high-performance solutions, please accept our terms."
                                : "We use essential and performance cookies to enhance your journey through the digital frontier. Manage them to your preference or accept to experience the full power of our platform."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAcceptClick}
                                className="flex-[2] px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-widest text-xs"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleManage}
                                disabled={isLocked}
                                className={`flex-[1] px-4 py-3 border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                            >
                                Manage {manageCount > 0 && `(${manageCount})`}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isLocked}
                                className={`flex-[1] px-4 py-3 border border-white/10 hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-bold rounded-xl transition-all uppercase tracking-widest text-xs ${isLocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Cancel / Decline text button */}
                        {!isLocked && (
                            <button
                                onClick={handleCancel}
                                className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-300 font-medium transition-colors uppercase tracking-wider"
                            >
                                No thanks, continue without cookies
                            </button>
                        )}

                        {manageCount > 0 && !isLocked && (
                            <p className="mt-4 text-xs text-red-500 font-black uppercase text-center tracking-widest animate-pulse">
                                Warning: {3 - manageCount} clicks remaining before access lock.
                            </p>
                        )}

                        {/* Link to full Cookie Policy page */}
                        <p className="mt-4 text-center text-xs text-slate-500">
                            Read our full{' '}
                            <Link to="/company/cookie-policy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors" onClick={handleCancel}>
                                Cookie Policy
                            </Link>
                        </p>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Confirm Identity to Proceed</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400" size={20} />
                                <input
                                    required
                                    type="email"
                                    placeholder="Enter professional email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all font-medium"
                                />
                            </div>
                        </div>

                        {status === 'success' ? (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400">
                                <CheckCircle size={20} />
                                <span className="font-bold text-sm uppercase tracking-wide">Access Granted. Welcome back.</span>
                            </div>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "Confirm & Access Website"
                                    )}
                                </button>
                                {/* Back / Cancel button in email mode */}
                                <button
                                    type="button"
                                    onClick={() => setEmailMode(false)}
                                    className="w-full py-2 text-sm text-slate-500 hover:text-slate-300 font-medium transition-colors uppercase tracking-wider"
                                >
                                    ← Go Back
                                </button>
                            </>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default ConsentPopup;
