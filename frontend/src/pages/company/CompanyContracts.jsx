import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FileCheck, ShieldCheck, Clock, UserCheck, 
  ArrowRight, FileText, CheckCircle2, AlertCircle, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function CompanyContracts() {
    const { user } = useAuth();
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchMyContracts();
        }
    }, [user]);

    const fetchMyContracts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/contracts/my-contracts`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            if (Array.isArray(data)) setContracts(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const workflowSteps = [
        { icon: <Clock />, label: 'Manager Review', desc: 'Initial validation by reporting manager.' },
        { icon: <ShieldCheck />, label: 'HR Approval', desc: 'Verification of employment terms.' },
        { icon: <FileCheck />, label: 'Legal Audit', desc: 'Ensuring regulatory compliance.' },
        { icon: <UserCheck />, label: 'Final Review', desc: 'Final sign-off by executive team.' },
        { icon: <ArrowRight />, label: 'Signature', desc: 'Digital signing by the employee.' },
    ];

    return (
        <div className="min-h-screen bg-[#f0f4f8]">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#1e5cdc] to-blue-800 py-20 px-4 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-blue-400/20 rounded-full text-blue-100 text-xs font-black uppercase tracking-widest mb-6 border border-blue-400/30">
                        Official Documentation
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Contract Management Portal</h1>
                    <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Access, track, and digitally sign your official employment documentation through our secure, transparent lifecycle management system.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-12 pb-20">
                {/* Workflow Visualization */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-blue-50">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-black text-gray-900 mb-2">The Approval Lifecycle</h2>
                        <p className="text-gray-500 font-medium">Every contract undergoes a rigorous 5-step verification process.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 relative">
                        {/* Connecting lines for desktop */}
                        <div className="hidden lg:block absolute top-[40px] left-0 w-full h-0.5 bg-blue-50 z-0"></div>
                        
                        {workflowSteps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-50 text-[#1e5cdc] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-blue-100 transform hover:scale-110 transition-transform">
                                    {step.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">{step.label}</h3>
                                <p className="text-[11px] text-gray-400 font-medium leading-tight px-2">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Interaction Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left side: My Contracts tracking */}
                    <div className="lg:col-span-2">
                        {!user ? (
                            <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
                                <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Secure Access Required</h2>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto font-medium">To view your official documentation and tracking status, please log in with your corporate credentials.</p>
                                <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e5cdc] text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                                    Login to Portal <ArrowRight size={20} />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Active Registrations</h3>
                                    <Link to="/profile?tab=contracts" className="text-sm font-bold text-[#1e5cdc] hover:underline">Full Dashboard</Link>
                                </div>

                                {loading ? (
                                    <div className="bg-white rounded-3xl p-12 text-center text-gray-400 font-bold border-2 border-dashed border-gray-100 uppercase tracking-widest text-xs">
                                        Querying secure database...
                                    </div>
                                ) : contracts.length === 0 ? (
                                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                                        <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No documentation records found</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {contracts.map(c => (
                                            <div key={c._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-blue-50 text-[#1e5cdc] rounded-xl">
                                                        <FileText size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 uppercase tracking-tight">{c.title}</h4>
                                                        <p className="text-[11px] text-gray-400 font-medium">Issued on {new Date(c.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                                                        c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                        {c.status.replace('_', ' ')}
                                                    </span>
                                                    <Link to="/profile?tab=contracts" className="p-2 text-gray-300 hover:text-[#1e5cdc] transition-colors">
                                                        <ArrowRight size={20} />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right side: Information/FAQ */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                            <h3 className="font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
                                <AlertCircle size={20} className="text-amber-500" /> Key Information
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-tight">Legally Binding</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">All digital signatures performed through this portal carry full legal weight as per the Indian IT Act.</p>
                                </div>
                                <hr className="border-gray-50" />
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-tight">Data Integrity</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">Contracts are encrypted and stored in our secure documentation vault with full audit logging.</p>
                                </div>
                                <hr className="border-gray-50" />
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-tight">Need Assistance?</h4>
                                    <p className="text-xs text-gray-500 mb-3 font-medium leading-relaxed">Contact your HR representative for any queries regarding contract clauses or terms.</p>
                                    <Link to="/contact/support" className="text-xs font-black text-[#1e5cdc] uppercase tracking-widest hover:underline">Get Help & Support</Link>
                                </div>
                            </div>
                        </div>

                        {/* ID Verification Promo */}
                        <div className="bg-[#1e5cdc] rounded-3xl p-8 text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                           <h3 className="font-black uppercase tracking-tight mb-2 relative z-10">Lost your ID?</h3>
                           <p className="text-xs text-blue-100 mb-6 relative z-10 font-medium">Verify your employee identity anytime through our real-time verification portal.</p>
                           <Link to="/company/employee-id" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-[#1e5cdc] px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg relative z-10">
                              Verify Now <Search size={16} />
                           </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
