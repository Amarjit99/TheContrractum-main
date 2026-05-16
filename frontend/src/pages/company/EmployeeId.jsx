import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ShieldAlert, ArrowLeft, Printer, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, QrCode as QrIcon } from 'lucide-react';
import QRCode from 'qrcode';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function EmployeeId() {
    const { id } = useParams();
    const [employeeId, setEmployeeId] = useState(id || '');
    const [idCard, setIdCard] = useState(null);
    const [qrUrl, setQrUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            handleSearch(null, id);
        }
    }, [id]);

    const handleSearch = async (e, forcedId = null) => {
        if (e) e.preventDefault();
        const targetId = forcedId || employeeId;
        if (!targetId.trim()) return;

        setLoading(true);
        setError('');
        setIdCard(null);

        try {
            const res = await fetch(`${API}/api/id-cards/${targetId.trim()}`);
            if (res.ok) {
                const data = await res.json();
                setIdCard(data);
                
                // Generate QR Code for the verified page
                const qrData = window.location.href;
                const url = await QRCode.toDataURL(qrData, { margin: 1, width: 200 });
                setQrUrl(url);
            } else {
                if (res.status === 404) {
                    setError('No ID Card found with the provided Employee ID.');
                } else {
                    setError('An error occurred while fetching data. Please try again.');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Network error. Please check your connection.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#f0f4f8] py-20 px-4 flex flex-col items-center">
            {/* Banner */}
            <div className="text-center mb-12 print:hidden">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Identity Verification Portal</h1>
                <p className="text-gray-500 text-lg">Verify the authenticity of an official TheContractum ID Card.</p>
            </div>

            {!idCard ? (
                <>
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 w-full max-w-2xl text-center">
                    <div className="w-16 h-16 bg-blue-50 text-[#1e5cdc] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Search Records</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Enter the Employee ID printed on the physical or digital card to verify their identity.</p>

                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            placeholder="e.g. EMP2026IT001"
                            required
                            className="flex-1 px-5 py-4 uppercase font-mono text-center sm:text-left bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] focus:bg-white transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-4 bg-[#1e5cdc] text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verifying...' : 'Verify ID'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-center gap-3 border border-red-100">
                            <ShieldAlert size={20} />
                            <span className="font-semibold">{error}</span>
                        </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 text-gray-400">
                            <div className="flex flex-col items-center gap-1">
                                <ShieldCheck size={20} className="text-emerald-500 opacity-50" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Encrypted</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <CheckCircle2 size={20} className="text-blue-500 opacity-50" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Official</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-xs font-bold text-gray-400 hover:text-[#1e5cdc] transition-colors flex items-center gap-1.5">
                                <ArrowLeft size={14} /> Main Site
                            </Link>
                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                            <a href="/contact/support" className="text-xs font-bold text-gray-400 hover:text-[#1e5cdc] transition-colors">Support</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 max-w-2xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm flex flex-col gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1e5cdc] shadow-sm">
                            <span className="font-black text-sm">01</span>
                        </div>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-wider">Locate the ID number on the front of the official card.</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm flex flex-col gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1e5cdc] shadow-sm">
                            <span className="font-black text-sm">02</span>
                        </div>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-wider">Enter the ID exactly as printed in the field above.</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm flex flex-col gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1e5cdc] shadow-sm">
                            <span className="font-black text-sm">03</span>
                        </div>
                        <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-wider">Review the verified profile to confirm authenticity.</p>
                    </div>
                </div>
                </>
            ) : (
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <button
                        onClick={() => { setIdCard(null); setEmployeeId(''); }}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-semibold transition-colors print:hidden"
                    >
                        <ArrowLeft size={16} /> Back to Search
                    </button>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center">
                        <div className="w-full flex justify-between items-center mb-8 px-2">
                            <div>
                                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Verified Record
                                </span>
                            </div>
                            <button onClick={() => window.print()} className="text-gray-400 hover:text-[#1e5cdc] transition-colors print:hidden" title="Print Card">
                                <Printer size={20} />
                            </button>
                        </div>

                        <style>{`
                            @media print {
                                @page { margin: 0; size: auto; }
                                body { 
                                    -webkit-print-color-adjust: exact !important; 
                                    print-color-adjust: exact !important; 
                                    margin: 0 !important;
                                    padding: 0 !important;
                                }
                                /* Hide everything that is NOT the card container */
                                nav, header, footer, .no-print, [class*="fixed"], [class*="sticky"] {
                                    display: none !important;
                                }
                                .print-container {
                                    box-shadow: none !important;
                                    border: 1px solid #eee !important;
                                    page-break-inside: avoid !important;
                                    break-inside: avoid !important;
                                    margin: 20px auto !important;
                                    position: relative !important;
                                    top: 0 !important;
                                    left: 0 !important;
                                }
                                .min-h-screen {
                                    padding: 0 !important;
                                    background: white !important;
                                }
                            }
                        `}</style>

                        {/* Dynamic ID Card Render */}
                        <div className="w-[340px] bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col border border-gray-100 print:shadow-none print-container">
                            {/* Watermark Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden flex flex-wrap gap-12 p-8 rotate-[-15deg]">
                                {Array.from({length: 12}).map((_, i) => (
                                    <div key={i} className="text-xl font-black text-gray-900 whitespace-nowrap">THE CONTRACTUM</div>
                                ))}
                            </div>

                            {/* Header Section */}
                            <div className="h-28 relative flex flex-col items-center justify-center pt-2" style={{ background: `linear-gradient(135deg, ${idCard.cardColor || '#1e5cdc'}, ${(idCard.cardColor || '#1e5cdc')}dd)` }}>
                                <div className="z-10 flex flex-col items-center">
                                    <img src="/assets/main-logo1.png" alt="Logo" className="h-10 mb-1 brightness-0 invert" onError={(e) => e.target.style.display = 'none'} />
                                    <h2 className="text-white font-black text-[15px] tracking-[0.2em] uppercase">The Contractum</h2>
                                </div>
                                <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 320" style={{ transform: "rotateY(180deg) rotateZ(180deg)" }}>
                                    <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>
                            </div>

                            {/* Profile Image & Category */}
                            <div className="flex flex-col items-center -mt-14 z-20">
                                <div className="relative">
                                    <img 
                                        src={idCard.photo || 'https://via.placeholder.com/150'} 
                                        alt="Profile" 
                                        className="w-32 h-32 rounded-full border-8 border-white shadow-xl object-cover bg-white" 
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg border border-gray-50">
                                        <div className="bg-emerald-500 text-white p-1 rounded-full">
                                            <ShieldCheck size={14} />
                                        </div>
                                    </div>
                                </div>
                                <span className={`mt-3 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-full shadow-md`} style={{ backgroundColor: idCard.cardColor || '#1e5cdc' }}>
                                    {idCard.category}
                                </span>
                            </div>

                            {/* Personal Info */}
                            <div className="flex flex-col items-center px-8 pt-4 pb-6 text-center">
                                <h1 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tight">{idCard.name}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-0.5 rounded-full" style={{ backgroundColor: idCard.cardColor || '#1e5cdc' }}></span>
                                    <p className="font-bold text-sm uppercase tracking-widest" style={{ color: idCard.cardColor || '#1e5cdc' }}>{idCard.designation}</p>
                                    <span className="w-2 h-0.5 rounded-full" style={{ backgroundColor: idCard.cardColor || '#1e5cdc' }}></span>
                                </div>
                                <p className="text-gray-400 text-xs font-bold mt-1 uppercase">{idCard.department}</p>

                                {/* Verification Data Table */}
                                <div className="w-full mt-6 space-y-3 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/50 backdrop-blur-sm">
                                    <div className="flex flex-col gap-0.5 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Identification Number</span>
                                        <span className="font-mono font-black text-lg text-gray-800 tracking-tighter">{idCard.employeeId.toUpperCase()}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Blood Group</span>
                                            <span className="font-black text-red-600 text-sm">{idCard.bloodGroup || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Issue Date</span>
                                            <span className="font-black text-gray-800 text-sm">
                                                {new Date(idCard.issueDate || idCard.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-0.5 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expiry Date</span>
                                        <span className={`font-black text-sm ${new Date(idCard.validUntil) < new Date() ? 'text-red-500' : 'text-gray-800'}`}>
                                            {new Date(idCard.validUntil).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Footer Icons */}
                                    <div className="pt-4 border-t border-gray-200/50 flex justify-between items-center">
                                        <div className="flex gap-3 text-gray-300">
                                            <Phone size={14} />
                                            <Mail size={14} />
                                            <MapPin size={14} />
                                        </div>
                                        {qrUrl && <img src={qrUrl} alt="QR Code" className="w-12 h-12" />}
                                    </div>
                                </div>
                                
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em] mt-6">
                                    The Contractum Official Identification System
                                </p>
                            </div>

                            {/* Bottom Accent Bar */}
                            <div className="h-2 w-full mt-auto" style={{ backgroundColor: idCard.cardColor || '#1e5cdc' }}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
