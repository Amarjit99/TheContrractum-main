import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { ChevronDown, ChevronUp, Trash2, Mail, Calendar, Search, ClipboardCheck, User, Plus, X, Save, Edit2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminSurveys() {
    const { admin } = useAdminAuth();
    const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

    const [surveys, setSurveys] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [msg, setMsg] = useState('');
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('responses'); // 'responses' | 'questions'

    // Question form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({ question: '', options: ['', ''], answer: '' });

    const fetchSurveys = useCallback(async () => {
        try {
            const authHeaders = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };
            const res = await fetch(`${API}/api/survey`, { headers: authHeaders });
            const d = await res.json();
            setSurveys(Array.isArray(d) ? d : []);
        } catch (err) { console.error(err); }
    }, [admin]);

    const fetchQuestions = useCallback(async () => {
        try {
            const authHeaders = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };
            const res = await fetch(`${API}/api/survey/questions`, { headers: authHeaders });
            const d = await res.json();
            setQuestions(Array.isArray(d) ? d : []);
            setLoading(false);
        } catch (err) { console.error(err); setLoading(false); }
    }, [admin]);

    useEffect(() => {
        Promise.resolve().then(() => {
            fetchSurveys();
            fetchQuestions();
        });
    }, [fetchSurveys, fetchQuestions]);

    const deleteSurvey = async (id) => {
        if (!confirm('Delete this survey response?')) return;
        const res = await fetch(`${API}/api/survey/${id}`, { method: 'DELETE', headers });
        if (res.ok) { setMsg('Response deleted.'); setTimeout(() => setMsg(''), 3000); fetchSurveys(); }
    };

    const deleteQuestion = async (id) => {
        if (!confirm('Delete this question?')) return;
        const res = await fetch(`${API}/api/survey/questions/${id}`, { method: 'DELETE', headers });
        if (res.ok) { setMsg('Question deleted.'); setTimeout(() => setMsg(''), 3000); fetchQuestions(); }
    };

    const handleSaveQuestion = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/api/survey/questions`, {
            method: 'POST',
            headers,
            body: JSON.stringify(currentQuestion.id ? { ...currentQuestion } : currentQuestion)
        });
        if (res.ok) {
            setMsg(currentQuestion.id ? 'Question updated.' : 'Question added.');
            setTimeout(() => setMsg(''), 3000);
            setIsEditing(false);
            setCurrentQuestion({ question: '', options: ['', ''], answer: '' });
            fetchQuestions();
        }
    };

    const filteredSurveys = surveys.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="mb-6 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Survey Management</h1>
                    <div className="flex gap-4 mt-2">
                        <button onClick={() => setActiveTab('responses')} className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${activeTab === 'responses' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400'}`}>Responses ({surveys.length})</button>
                        <button onClick={() => setActiveTab('questions')} className={`text-sm font-bold uppercase tracking-wider pb-1 border-b-2 transition-all ${activeTab === 'questions' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400'}`}>Manage Questions ({questions.length})</button>
                    </div>
                </div>

                {activeTab === 'questions' && (
                    <button onClick={() => { setIsEditing(true); setCurrentQuestion({ question: '', options: ['', ''], answer: '' }); }} className="bg-[#1e5cdc] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shrink-0">
                        <Plus size={18} /> Add New Question
                    </button>
                )}

                {activeTab === 'responses' && (
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-10 pr-4 py-2 border border-blue-100 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full md:w-64" />
                    </div>
                )}
            </div>

            {msg && <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-bold animate-fade-in">{msg}</div>}

            {activeTab === 'questions' && isEditing && (
                <div className="bg-white border-2 border-[#1e5cdc] rounded-2xl p-6 mb-8 shadow-xl animate-in slide-in-from-top duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900 italic">{currentQuestion.id ? 'Edit Question' : 'Add New Question'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSaveQuestion} className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-slate-500 mb-1 uppercase tracking-widest">Question Text</label>
                            <input required value={currentQuestion.question} onChange={e => setCurrentQuestion({ ...currentQuestion, question: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#1e5cdc] focus:outline-none transition font-bold" />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Options (Min 2)</label>
                            {currentQuestion.options.map((opt, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input required value={opt} onChange={e => { const newOpts = [...currentQuestion.options]; newOpts[idx] = e.target.value; setCurrentQuestion({ ...currentQuestion, options: newOpts }); }} placeholder={`Option ${idx + 1}`} className="flex-1 px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-lg focus:border-[#1e5cdc] outline-none transition font-medium" />
                                    {currentQuestion.options.length > 2 && (
                                        <button type="button" onClick={() => setCurrentQuestion({ ...currentQuestion, options: currentQuestion.options.filter((_, i) => i !== idx) })} className="p-2 text-red-400 hover:text-red-600"><X size={20} /></button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={() => setCurrentQuestion({ ...currentQuestion, options: [...currentQuestion.options, ''] })} className="text-[#1e5cdc] text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline"><Plus size={14} /> Add Option</button>
                        </div>
                        <button type="submit" className="w-full bg-[#1e5cdc] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 hover:bg-slate-900 transition shadow-xl"><Save size={20} /> {currentQuestion.id ? 'Update Question' : 'Save Question'}</button>
                    </form>
                </div>
            )}

            {activeTab === 'questions' ? (
                <div className="space-y-4">
                    {questions.map((q, idx) => (
                        <div key={q._id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-black text-[#1e5cdc] uppercase tracking-tighter">Question {idx + 1}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{q.question}</h3>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {q.options.map((opt, i) => <span key={i} className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{opt}</span>)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => { setIsEditing(true); setCurrentQuestion({ id: q._id, question: q.question, options: [...q.options], answer: q.answer || '' }); }} className="p-2 text-[#1e5cdc] hover:bg-blue-50 rounded-lg transition"><Edit2 size={20} /></button>
                                <button onClick={() => deleteQuestion(q._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"><Trash2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                    {questions.length === 0 && <div className="text-center py-20 bg-white rounded-2xl text-gray-400">No questions added yet. Click "Add New Question" above.</div>}
                </div>
            ) : (
                <div className="space-y-4">
                    {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div></div> : filteredSurveys.map(s => (
                        <div key={s._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition" onClick={() => setExpanded(expanded === s._id ? null : s._id)}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#1e5cdc]"><User size={20} /></div>
                                    <div><p className="font-bold text-slate-800">{s.name}</p><p className="text-xs text-slate-500 font-medium">{s.email}</p></div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="hidden sm:flex items-center gap-1.5 text-slate-400 text-xs font-medium"><Calendar size={12} /> {new Date(s.createdAt).toLocaleDateString()}</p>
                                    <button onClick={e => { e.stopPropagation(); deleteSurvey(s._id); }} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                                    <div className="text-gray-400">{expanded === s._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                                </div>
                            </div>
                            {expanded === s._id && (
                                <div className="px-6 py-5 bg-blue-50/20 border-t border-gray-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {s.responses.map((r, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm"><p className="text-[10px] font-black text-blue-400 uppercase mb-1">Q{i + 1}</p><p className="text-sm font-bold text-slate-800 mb-2">{r.question}</p><div className="bg-blue-50 px-3 py-2 rounded-lg"><p className="text-xs font-bold text-[#1e5cdc]">{r.answer}</p></div></div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {!loading && filteredSurveys.length === 0 && <div className="text-center py-20 bg-white rounded-2xl text-gray-400">No responses found matching your search.</div>}
                </div>
            )}
        </AdminLayout>
    );
}
