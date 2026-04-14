import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, CheckCircle, HelpCircle, User, Mail, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const GoogleForm = () => {
    const [step, setStep] = useState(0); // 0: Info, 1: Questions, 2: Success
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDynamicQuestions();
    }, []);

    const fetchDynamicQuestions = async () => {
        setLoadingQuestions(true);
        try {
            const res = await fetch(`${API_URL}/api/survey/questions`);
            const data = await res.json();
            if (Array.isArray(data)) {
                // Shuffle and pick all or a subset? User said "any no. of questions", so we show all provided by admin.
                setQuestions(data.sort(() => 0.5 - Math.random()));
            }
        } catch (err) {
            console.error("Failed to fetch questions:", err);
            setError("Could not load survey questions. Please try again later.");
        } finally {
            setLoadingQuestions(false);
        }
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            setError('Please provide both name and email.');
            return;
        }
        if (questions.length === 0) {
            setError('No questions available at the moment.');
            return;
        }
        setError('');
        setStep(1);
    };

    const handleAnswerChange = (qId, option) => {
        setUserAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleSubmit = async () => {
        if (Object.keys(userAnswers).length < questions.length) {
            setError(`Please answer all ${questions.length} questions before submitting.`);
            return;
        }

        setIsSubmitting(true);
        setError('');

        const formattedResponses = questions.map(q => ({
            question: q.question,
            answer: userAnswers[q._id]
        }));

        try {
            const res = await fetch(`${API_URL}/api/survey`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    responses: formattedResponses
                })
            });

            if (res.ok) {
                setStep(2);
            } else {
                const data = await res.json();
                setError(data.error || 'Submission failed. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Is the server running?');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingQuestions && step === 0) {
        return (
            <div className="min-h-screen bg-[#f0ebf8] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f0ebf8] flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/contact/touch" className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
                            <ArrowLeft size={24} className="text-gray-600 group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-900 leading-tight">Company Survey</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></div>
                        <span className="text-xs font-black text-purple-600 uppercase tracking-widest">Live</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-3xl px-4 py-8 flex-grow flex flex-col">
                {step === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-t-[10px] border-purple-700 p-8">
                            <h2 className="text-3xl font-black text-slate-900 mb-2 italic">Awareness Survey</h2>
                            <p className="text-slate-500 mb-6 font-medium">Your insights help us shape the future of The Contractum.</p>
                            <div className="h-px bg-slate-100 w-full mb-6"></div>
                            <p className="text-sm text-red-500 mb-2 font-bold select-none">* Required</p>
                        </div>

                        <form onSubmit={handleInfoSubmit} className="space-y-6">
                            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 focus-within:border-purple-300 transition-all">
                                <label className="block text-base font-black text-slate-800 mb-4 uppercase tracking-tight">Full Name <span className="text-red-500">*</span></label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your name" className="w-full border-b-[2px] border-gray-200 py-3 focus:border-purple-700 outline-none transition-all text-lg font-bold bg-transparent" />
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 focus-within:border-purple-300 transition-all">
                                <label className="block text-base font-black text-slate-800 mb-4 uppercase tracking-tight">Email Address <span className="text-red-500">*</span></label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email" className="w-full border-b-[2px] border-gray-200 py-3 focus:border-purple-700 outline-none transition-all text-lg font-bold bg-transparent" />
                            </div>
                            {error && <div className="p-4 bg-red-50 border-2 border-red-100 text-red-600 rounded-xl font-bold flex items-center gap-3"><X size={18} /> {error}</div>}
                            <button type="submit" className="w-full bg-purple-700 text-white py-4 rounded-xl font-black text-xl hover:bg-slate-900 transition-all shadow-xl active:scale-[0.98]">Begin Survey Now</button>
                        </form>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <div className="bg-white rounded-xl shadow-xl border-t-[10px] border-purple-700 p-8">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Questionnaire</h2>
                            <p className="text-slate-500 font-medium">Please answer all questions to complete the submission.</p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-2 flex-grow bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600 transition-all duration-500" style={{ width: `${(Object.keys(userAnswers).length / questions.length) * 100}%` }}></div>
                                </div>
                                <span className="text-xs font-black text-purple-700">{Object.keys(userAnswers).length}/{questions.length}</span>
                            </div>
                        </div>

                        {questions.map((q, idx) => (
                            <div key={q._id} className="bg-white rounded-xl shadow-md p-8 border-l-[6px] border-transparent hover:border-purple-400 transition-all">
                                <p className="text-xs font-black text-purple-600 uppercase mb-2">Question {idx + 1}</p>
                                <h3 className="text-lg font-black text-slate-800 mb-6 leading-snug">{q.question}</h3>
                                <div className="space-y-3">
                                    {q.options.map(opt => (
                                        <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${userAnswers[q._id] === opt ? 'bg-purple-50 border-purple-600' : 'bg-slate-50 border-transparent hover:bg-purple-50/50'}`}>
                                            <input type="radio" checked={userAnswers[q._id] === opt} onChange={() => handleAnswerChange(q._id, opt)} className="w-5 h-5 accent-purple-700" />
                                            <span className={`font-bold ${userAnswers[q._id] === opt ? 'text-purple-900' : 'text-slate-600'}`}>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {error && <div className="p-4 bg-red-50 border-2 border-red-100 text-red-600 rounded-xl font-bold">{error}</div>}

                        <div className="flex gap-4 pb-20">
                            <button onClick={() => setStep(0)} className="px-8 py-4 bg-white border-2 border-purple-700 text-purple-700 rounded-xl font-black hover:bg-purple-50 transition active:scale-95">Back</button>
                            <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-4 bg-purple-700 text-white rounded-xl font-black text-xl hover:bg-slate-900 transition shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                                {isSubmitting ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <><Send size={20} /> Submit Survey</>}
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mb-8 shadow-inner"><CheckCircle size={64} /></div>
                        <h2 className="text-4xl font-black text-slate-900 italic mb-4">Submission Successful!</h2>
                        <p className="text-xl text-slate-500 font-medium max-w-md mb-10">Thank you for your time. Your feedback has been recorded in our secure database.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button onClick={() => { setStep(0); setFormData({ name: '', email: '' }); setUserAnswers({}); fetchDynamicQuestions(); }} className="bg-white border-2 border-purple-700 text-purple-700 px-10 py-4 rounded-2xl font-black text-xl hover:bg-purple-50 transition-all shadow-md active:scale-95">Submit Another</button>
                            <Link to="/contact/touch" className="bg-purple-700 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-900 transform hover:-translate-y-1 transition-all">Return to Home</Link>
                        </div>
                    </div>
                )}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `body { background-color: #f0ebf8; }` }} />
        </div>
    );
};

export default GoogleForm;