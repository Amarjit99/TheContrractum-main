import { useEffect, useState, useRef } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { Edit2, Trash2, Plus, X, Upload, Calendar, Search, Newspaper } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminNews() {
    const { admin } = useAdminAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [msg, setMsg] = useState('');
    const [search, setSearch] = useState('');
    
    // Form state
    const [currentId, setCurrentId] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Health'); // default category
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [featured, setFeatured] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    
    const fileInputRef = useRef(null);
    const categories = ["Health", "Sport", "Politics", "Business", "World", "Technology", "Entertainment"];

    const headers = { Authorization: `Bearer ${admin?.token}` };

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/admin/news`, { headers: { Authorization: `Bearer ${admin?.token}` } });
            const data = await res.json();
            setNews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch news failed", error);
            setNews([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const resetForm = () => {
        setCurrentId(null);
        setTitle('');
        setCategory('Health');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
        setFeatured(false);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleEdit = (article) => {
        setCurrentId(article._id);
        setTitle(article.title);
        setCategory(article.category);
        setDescription(article.description);
        setDate(new Date(article.date).toISOString().split('T')[0]);
        setFeatured(article.featured || false);
        setImagePreview(article.image.startsWith('http') ? article.image : `${API}${article.image}`);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this news article?")) return;
        try {
            const res = await fetch(`${API}/api/admin/news/${id}`, { method: 'DELETE', headers });
            if (res.ok) {
                setMsg("News article deleted.");
                setTimeout(() => setMsg(''), 3000);
                fetchNews();
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('featured', featured);

        if (fileInputRef.current && fileInputRef.current.files[0]) {
            formData.append('image', fileInputRef.current.files[0]);
        } else if (!currentId) {
            alert('Please select an image.');
            return;
        }

        try {
            let res;
            if (currentId) {
                res = await fetch(`${API}/api/admin/news/${currentId}`, {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${admin?.token}` },
                    body: formData
                });
            } else {
                res = await fetch(`${API}/api/admin/news`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${admin?.token}` },
                    body: formData
                });
            }

            if (res.ok) {
                setMsg(currentId ? "News updated." : "News published.");
                setTimeout(() => setMsg(''), 3000);
                setIsEditing(false);
                resetForm();
                fetchNews();
            } else {
                const data = await res.json();
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Submit failed", error);
        }
    };

    const filteredNews = news.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.category.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout>
            <div className="mb-6 mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Newspaper size={28} className="text-[#1e5cdc]" />
                        News Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">{news.length} total articles</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..." className="pl-10 pr-4 py-2 border border-blue-100 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64" />
                    </div>
                    {!isEditing && (
                        <button onClick={() => { resetForm(); setIsEditing(true); }} className="w-full sm:w-auto bg-[#1e5cdc] text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shrink-0">
                            <Plus size={18} /> Post News Update
                        </button>
                    )}
                </div>
            </div>

            {msg && <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm text-center font-bold animate-fade-in">{msg}</div>}

            {isEditing && (
                <div className="bg-white border-2 border-[#1e5cdc] rounded-2xl p-6 mb-8 shadow-xl animate-in fade-in zoom-in-95 duration-300 relative">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-black text-slate-900 italic">{currentId ? 'Edit Article' : 'Create New Article'}</h2>
                        <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-500 mb-1 uppercase tracking-widest">Heading / Title <span className="text-red-500">*</span></label>
                                <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Article Headline" className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#1e5cdc] outline-none font-bold" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 mb-1 uppercase tracking-widest">Sector / Category <span className="text-red-500">*</span></label>
                                <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#1e5cdc] outline-none font-bold text-slate-700">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 mb-1 uppercase tracking-widest">Date <span className="text-red-500">*</span></label>
                                <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#1e5cdc] outline-none font-bold text-slate-700" />
                            </div>
                            <div className="flex items-center mt-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-5 h-5 accent-[#1e5cdc]" />
                                    <span className="text-sm font-black uppercase text-slate-700 tracking-tight">Mark as Featured List</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 mb-1 uppercase tracking-widest">Description <span className="text-red-500">*</span></label>
                            <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Write the article content..." className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-[#1e5cdc] outline-none font-medium custom-scrollbar" />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">Article Image <span className="text-red-500">*</span></label>
                            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 p-4 border-2 border-slate-100 border-dashed rounded-xl">
                                <div className="flex-1 w-full">
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" id="image-upload" />
                                    <label htmlFor="image-upload" className="flex flex-col justify-center items-center h-32 bg-white rounded-lg border-2 border-dashed border-blue-200 cursor-pointer hover:bg-blue-50 transition w-full group">
                                        <Upload size={28} className="text-blue-400 group-hover:text-blue-600 mb-2" />
                                        <span className="text-sm font-bold text-slate-500">Click to upload image</span>
                                        <span className="text-xs text-slate-400 mt-1">JPEG, PNG, WEBP</span>
                                    </label>
                                </div>
                                {imagePreview && (
                                    <div className="relative w-48 h-32 rounded-lg overflow-hidden border-4 border-white shadow-xl shrink-0">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"><X size={14} /></button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition">Cancel</button>
                            <button type="submit" className="px-8 py-3 bg-[#1e5cdc] text-white font-black rounded-xl shadow-lg hover:bg-blue-800 transition">{currentId ? 'Update Article' : 'Publish Article'}</button>
                        </div>
                    </form>
                </div>
            )}

            {!isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div></div>
                    ) : filteredNews.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white rounded-2xl text-gray-400 shadow-sm border border-gray-100 flex flex-col items-center">
                            <Newspaper size={48} className="text-gray-200 mb-3" />
                            <p className="font-bold">No news articles found.</p>
                            <p className="text-sm">Create one to get started.</p>
                        </div>
                    ) : (
                        filteredNews.map(n => (
                            <div key={n._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full">
                                <div className="h-48 relative overflow-hidden bg-slate-100 shrink-0">
                                    <img src={n.image.startsWith('http') ? n.image : `${API}${n.image}`} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur text-[#1e5cdc] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow">{n.category}</span>
                                        {n.featured && <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow">Featured</span>}
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-2"><Calendar size={12} /> {new Date(n.date).toLocaleDateString()}</p>
                                    <h3 className="font-black text-slate-800 text-lg leading-tight mb-2 line-clamp-2">{n.title}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">{n.description}</p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <button onClick={() => handleEdit(n)} className="text-[#1e5cdc] text-sm font-bold flex items-center gap-1 hover:underline"><Edit2 size={14} /> Edit</button>
                                        <button onClick={() => handleDelete(n._id)} className="text-red-400 text-sm font-bold flex items-center gap-1 hover:text-red-600 transition"><Trash2 size={14} /> Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
