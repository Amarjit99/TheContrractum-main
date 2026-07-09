import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ArrowLeft, Search, Calendar, Users, Eye, Loader2, Mail, Phone, Building, Plus, X, Tag, Image as ImageIcon, MapPin, Type, DollarSign, MessageSquare, User } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminEventRegistrations() {
    const { admin } = useAdminAuth();
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [eventProcessing, setEventProcessing] = useState(false);
    const [eventFormData, setEventFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        category: 'Conference',
        type: 'upcoming',
        image: '',
        description: '',
        speaker: '',
        totalSeats: 100,
        price: 'Free',
        featured: false,
        tags: ''
    });

    const fetchRegistrations = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/event-registrations`);
            const data = await res.json();
            setRegistrations(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => {
            fetchRegistrations();
        });
    }, [fetchRegistrations]);



    const handleEventSubmit = async (e) => {
        e.preventDefault();
        setEventProcessing(true);
        try {
            const formattedData = {
                ...eventFormData,
                seatsAvailable: eventFormData.totalSeats,
                tags: eventFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            };

            const res = await fetch(`${API}/api/resource-events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admin?.token}`
                },
                body: JSON.stringify(formattedData)
            });

            if (res.ok) {
                alert('Event created successfully!');
                setIsEventModalOpen(false);
                setEventFormData({
                    title: '', date: '', time: '', location: '', category: 'Conference',
                    type: 'upcoming', image: '', description: '', speaker: '',
                    totalSeats: 100, price: 'Free', featured: false, tags: ''
                });
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to create event');
        }
        setEventProcessing(false);
    };

    const filteredRegistrations = registrations.filter(r => 
        r.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.organization && r.organization.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const [recentCount, setRecentCount] = useState(0);

    useEffect(() => {
        const limit = Date.now() - 24 * 60 * 60 * 1000;
        const count = registrations.filter(r => new Date(r.createdAt).getTime() > limit).length;
        Promise.resolve().then(() => {
            setRecentCount(count);
        });
    }, [registrations]);

    return (
        <AdminLayout>
            <div className="py-8">
                <div className="mb-4">
                    <button 
                        onClick={() => navigate('/admin/resources')} 
                        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#1e5cdc] transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Resource Management
                    </button>
                </div>
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Event Registrations</h1>
                        <p className="text-slate-500 text-xs sm:text-sm font-medium">View and manage registrations for the Events & Activities section</p>
                    </div>
                    <button 
                        onClick={() => setIsEventModalOpen(true)}
                        className="bg-[#1e5cdc] text-white px-4 sm:px-6 py-3 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full sm:w-auto"
                    >
                        <Plus size={18} className="sm:w-5 sm:h-5" />
                        Create New Event
                    </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Registrations</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-900">{registrations.length}</p>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unique Events</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-900">{new Set(registrations.map(r => r.eventName)).size}</p>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recent (24h)</p>
                        <p className="text-xl sm:text-2xl font-black text-slate-900">
                            {registrations.filter(r => new Date(r.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
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
                                placeholder="Search by name, email, event or organization..."
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
                                     <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Attendee</th>
                                     <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Event Detail</th>
                                     <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:table-cell">Organization</th>
                                     <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Payment</th>
                                     <th className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50">
                                 {loading ? (
                                     <tr>
                                         <td colSpan="5" className="py-20 text-center">
                                             <Loader2 className="animate-spin mx-auto text-blue-600 mb-4" size={32} />
                                             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Registrations...</p>
                                         </td>
                                     </tr>
                                 ) : filteredRegistrations.length === 0 ? (
                                     <tr>
                                         <td colSpan="5" className="py-20 text-center text-slate-400">No registrations found matching your search.</td>
                                     </tr>
                                 ) : (
                                     filteredRegistrations.map(reg => (
                                         <tr key={reg._id} className="hover:bg-slate-50/30 transition-colors">
                                             <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                 <div className="flex items-center gap-3">
                                                     <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs sm:text-sm shrink-0">
                                                         {reg.firstName ? reg.firstName[0] : ''}{reg.lastName ? reg.lastName[0] : ''}
                                                     </div>
                                                     <div className="min-w-0">
                                                         <p className="font-bold text-slate-900 text-sm sm:text-base truncate">{reg.firstName} {reg.lastName}</p>
                                                         <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-0.5">
                                                             <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                                                                 <Mail size={12} className="shrink-0" />
                                                                 <span className="truncate max-w-[120px] sm:max-w-none">{reg.email}</span>
                                                                 </div>
                                                             <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                                                                 <Phone size={12} className="shrink-0" />
                                                                 <span>{reg.phone}</span>
                                                             </div>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </td>
                                             <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                 <div className="space-y-1">
                                                     <p className="font-bold text-slate-800 text-xs sm:text-sm">{reg.eventName}</p>
                                                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                         <Calendar size={12} className="text-blue-500 shrink-0" />
                                                         <span>{reg.eventDate} • {reg.eventTime}</span>
                                                     </div>
                                                 </div>
                                             </td>
                                             <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                                 <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                     <Building size={14} className="text-slate-400 shrink-0" />
                                                     <span className="truncate max-w-[150px]">{reg.organization || 'N/A'}</span>
                                                 </div>
                                             </td>
                                             <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                 <div className="space-y-1">
                                                     <div className="flex items-center gap-1.5">
                                                         <span className="text-xs font-bold text-slate-800">{reg.amountPaid || 'Free'}</span>
                                                         {reg.amountPaid && reg.amountPaid.toLowerCase() !== 'free' ? (
                                                             <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-green-100 text-green-700">Paid</span>
                                                         ) : (
                                                             <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-600">Free</span>
                                                         )}
                                                     </div>
                                                     {reg.paymentMethod && reg.paymentMethod !== 'N/A' && (
                                                         <div className="text-[10px] text-slate-500 font-semibold">
                                                             via {reg.paymentMethod}
                                                             {reg.paymentDetails && reg.paymentDetails.cardLast4 && ` (*${reg.paymentDetails.cardLast4})`}
                                                             {reg.paymentDetails && reg.paymentDetails.transactionId && ` (Ref: ${reg.paymentDetails.transactionId})`}
                                                         </div>
                                                     )}
                                                 </div>
                                             </td>
                                             <td className="px-3 sm:px-6 py-3 sm:py-4">
                                                 <div className="text-[10px] sm:text-xs text-slate-400">
                                                     <p>{new Date(reg.createdAt).toLocaleDateString()}</p>
                                                     <p>{new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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

            {/* Create Event Modal */}
            {isEventModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                            <h4 className="text-xl font-black text-slate-800 tracking-tight">Create New Resource Event</h4>
                            <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleEventSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <Type size={12} /> Event Title
                                        </label>
                                        <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                            value={eventFormData.title} onChange={e => setEventFormData({...eventFormData, title: e.target.value})} placeholder="e.g. AI Summit 2026" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Calendar size={12} /> Date
                                            </label>
                                            <input required type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                                value={eventFormData.date} onChange={e => setEventFormData({...eventFormData, date: e.target.value})} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Calendar size={12} /> Time
                                            </label>
                                            <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                                value={eventFormData.time} onChange={e => setEventFormData({...eventFormData, time: e.target.value})} placeholder="e.g. 9:00 AM - 5:00 PM" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <MapPin size={12} /> Location
                                        </label>
                                        <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                            value={eventFormData.location} onChange={e => setEventFormData({...eventFormData, location: e.target.value})} placeholder="e.g. Virtual or Physical Address" />
                                    </div>
                                </div>

                                {/* Advanced Info */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Tag size={12} /> Category
                                            </label>
                                            <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700 appearance-none" 
                                                value={eventFormData.category} onChange={e => setEventFormData({...eventFormData, category: e.target.value})}>
                                                {["Conference", "Workshop", "Training", "Networking", "Bootcamp", "Webinar", "Masterclass"].map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Type size={12} /> Status
                                            </label>
                                            <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700 appearance-none" 
                                                value={eventFormData.type} onChange={e => setEventFormData({...eventFormData, type: e.target.value})}>
                                                <option value="upcoming">Upcoming</option>
                                                <option value="past">Past</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <ImageIcon size={12} /> Image URL
                                        </label>
                                        <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-mono text-[10px] text-slate-500" 
                                            value={eventFormData.image} onChange={e => setEventFormData({...eventFormData, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Users size={12} /> Total Capacity
                                            </label>
                                            <input required type="number" min="1" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                                value={eventFormData.totalSeats} onChange={e => setEventFormData({...eventFormData, totalSeats: parseInt(e.target.value)})} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <DollarSign size={12} /> Price
                                            </label>
                                            <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                                value={eventFormData.price} onChange={e => setEventFormData({...eventFormData, price: e.target.value})} placeholder="e.g. Free or $49" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <User size={12} /> Key Speaker / Host
                                </label>
                                <input required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-bold text-slate-700" 
                                    value={eventFormData.speaker} onChange={e => setEventFormData({...eventFormData, speaker: e.target.value})} placeholder="e.g. Dr. Jane Smith" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <MessageSquare size={12} /> Event Description
                                </label>
                                <textarea required rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all text-sm text-slate-700" 
                                    value={eventFormData.description} onChange={e => setEventFormData({...eventFormData, description: e.target.value})} placeholder="Provide a detailed overview of the event..." />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Tag size={12} /> Tags (Comma separated)
                                </label>
                                <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] transition-all font-medium text-slate-700" 
                                    value={eventFormData.tags} onChange={e => setEventFormData({...eventFormData, tags: e.target.value})} placeholder="e.g. AI, Tech, Networking" />
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="checkbox" id="featured" checked={eventFormData.featured} onChange={e => setEventFormData({...eventFormData, featured: e.target.checked})} 
                                    className="w-5 h-5 rounded border-slate-300 text-[#1e5cdc] focus:ring-[#1e5cdc]" />
                                <label htmlFor="featured" className="text-sm font-bold text-slate-700 cursor-pointer">Feature this event on the main page</label>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex gap-4 sticky bottom-0 bg-white pb-2">
                                <button type="button" onClick={() => setIsEventModalOpen(false)} 
                                    className="flex-1 px-6 py-4 rounded-2xl font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
                                    Cancel
                                </button>
                                <button disabled={eventProcessing} type="submit" 
                                    className="flex-[2] bg-[#1e5cdc] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                    {eventProcessing ? <Loader2 className="animate-spin" size={20}/> : 'Publish Resource Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
