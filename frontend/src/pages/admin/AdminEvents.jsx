import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, Calendar, MapPin, Users, Eye, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminEvents() {
    const { admin } = useAdminAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '' });
    const [processing, setProcessing] = useState(false);

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/mini-events`);
            const data = await res.json();
            setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => {
            fetchEvents();
        });
    }, [fetchEvents]);



    const fetchParticipants = async (eventId) => {
        setLoadingParticipants(true);
        setIsParticipantsModalOpen(true);
        try {
            const res = await fetch(`${API}/api/mini-events/${eventId}/participants`, {
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            const data = await res.json();
            setParticipants(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
        setLoadingParticipants(false);
    };

    const handleCreateOrEdit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const url = editingEvent ? `${API}/api/mini-events/${editingEvent._id}` : `${API}/api/mini-events`;
            const method = editingEvent ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin?.token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                await fetchEvents();
                setIsModalOpen(false);
                setFormData({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '' });
                setEditingEvent(null);
            }
        } catch (err) {
            console.error(err);
        }
        setProcessing(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
        try {
            const res = await fetch(`${API}/api/mini-events/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="py-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Events Management</h1>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium">Create and manage events for the Case Studies page</p>
                    </div>
                    <button 
                        onClick={() => { setEditingEvent(null); setFormData({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '' }); setIsModalOpen(true); }}
                        className="bg-[#1e5cdc] text-white px-4 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full sm:w-auto"
                    >
                        <Plus size={18} className="sm:w-5 sm:h-5" />
                        Create New Event
                    </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Events</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-900">{events.length}</p>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Participants</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-900">{events.reduce((acc, curr) => acc + curr.attendees.length, 0)}</p>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Occupancy</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-900">
                            {events.length > 0 ? ((events.reduce((acc, curr) => acc + (curr.attendees.length / curr.capacity), 0) / events.length) * 100).toFixed(1) : 0}%
                        </p>
                    </div>
                </div>

                {/* Search and Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-slate-50">
                        <div className="relative w-full sm:max-w-md">
                            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input 
                                type="text"
                                placeholder="Search events by name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-xs sm:text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Event Detail</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell">Date & Location</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Occupancy</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest text-right sm:text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={32} />
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Synchronizing Data...</p>
                                        </td>
                                    </tr>
                                ) : filteredEvents.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center text-slate-400">No events found matching your search.</td>
                                    </tr>
                                ) : (
                                    filteredEvents.map(event => (
                                        <tr key={event._id} className="hover:bg-slate-50/30 transition-colors">
                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 mt-1 sm:mt-0">
                                                        {event.imageUrl ? <img src={event.imageUrl} className="w-full h-full object-cover" /> : <Calendar className="text-slate-300 w-4 h-4 sm:w-5 sm:h-5" />}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-slate-900 text-sm sm:text-base truncate">{event.title}</p>
                                                        <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1 max-w-[150px] sm:max-w-[200px]">{event.description}</p>
                                                        <div className="sm:hidden space-y-1 mt-2">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                                                                <Calendar size={10} className="text-blue-500 shrink-0" />
                                                                <span className="truncate">{new Date(event.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
                                                                <MapPin size={10} className="text-blue-500 shrink-0" />
                                                                <span className="truncate">{event.location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600">
                                                        <Calendar size={14} className="text-blue-500 shrink-0" />
                                                        <span className="truncate">{new Date(event.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600">
                                                        <MapPin size={14} className="text-blue-500 shrink-0" />
                                                        <span className="truncate max-w-[120px]">{event.location}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1 max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full transition-all ${event.attendees.length >= event.capacity ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                            style={{ width: `${Math.min((event.attendees.length / event.capacity) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] sm:text-xs font-black text-slate-700">
                                                        {event.attendees.length} / {event.capacity}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2">
                                                    <button onClick={() => fetchParticipants(event._id)} className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View Participants"><Eye className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                                                    <button onClick={() => { setEditingEvent(event); setFormData({ ...event, dateTime: new Date(event.dateTime).toISOString().slice(0, 16) }); setIsModalOpen(true); }} className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all" title="Edit Event"><Edit className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                                                    <button onClick={() => handleDelete(event._id)} className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete Event"><Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h4 className="text-lg sm:text-xl font-black text-slate-800">{editingEvent ? 'Edit Event' : 'Create New Event'}</h4>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} className="sm:w-6 sm:h-6" /></button>
                        </div>
                        <form onSubmit={handleCreateOrEdit} className="p-4 sm:p-8 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                                <input required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date & Time</label>
                                    <input required type="datetime-local" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs font-bold" value={formData.dateTime} onChange={e => setFormData({...formData, dateTime: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
                                    <input required type="number" min="1" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm font-bold" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                                <input required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm font-bold" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL</label>
                                <input className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-[10px] sm:text-xs font-mono" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea required rows={3} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                            </div>

                            <button disabled={processing} type="submit" className="w-full py-3 sm:py-4 bg-[#1e5cdc] text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4">
                                {processing ? <Loader2 className="animate-spin" size={20}/> : editingEvent ? 'Update Event' : 'Publish Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Participants Modal */}
            {isParticipantsModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h4 className="text-lg sm:text-xl font-black text-slate-800">Event Attendees</h4>
                                <p className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider">REAL-TIME PARTICIPANT LIST</p>
                            </div>
                            <button onClick={() => setIsParticipantsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} className="sm:w-6 sm:h-6" /></button>
                        </div>
                        <div className="p-4 sm:p-8 max-h-[70vh] sm:max-h-[500px] overflow-y-auto custom-scrollbar">
                            {loadingParticipants ? (
                                <div className="py-10 sm:py-20 text-center">
                                    <Loader2 size={24} className="animate-spin mx-auto text-blue-600 mb-4 sm:w-8 sm:h-8" />
                                    <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Retrieving Audience Data...</p>
                                </div>
                            ) : participants.length === 0 ? (
                                <div className="py-10 sm:py-20 text-center text-slate-300">
                                    <Users className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-20" />
                                    <p className="font-bold text-xs sm:text-sm">No participants have RSVPed yet.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50">
                                        <tr>
                                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {participants.map(p => (
                                            <tr key={p._id} className="hover:bg-slate-50/30">
                                                <td className="px-3 sm:px-4 py-2 sm:py-3">
                                                    <div className="flex items-center gap-2 sm:gap-3">
                                                        <img src={`https://ui-avatars.com/api/?name=${p.firstName}+${p.lastName}&background=random`} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-slate-100 shrink-0" />
                                                        <span className="text-xs sm:text-sm font-bold text-slate-700 truncate max-w-[100px] sm:max-w-none">{p.firstName} {p.lastName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-3 sm:px-4 py-2 sm:py-3">
                                                    <p className="text-[10px] sm:text-xs font-medium text-slate-600 truncate max-w-[120px] sm:max-w-none">{p.email}</p>
                                                    <p className="text-[8px] sm:text-[10px] text-slate-400">{p.mobile}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
