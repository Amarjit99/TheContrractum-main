import { useState } from 'react';
import { Search, ShieldAlert, ArrowLeft, Printer, IdCard as IdCardIcon } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function EmployeeId() {
    const [employeeId, setEmployeeId] = useState('');
    const [idCard, setIdCard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!employeeId.trim()) return;

        setLoading(true);
        setError('');
        setIdCard(null);

        try {
            const res = await fetch(`${API}/api/id-cards/${employeeId.trim()}`);
            if (res.ok) {
                const data = await res.json();
                // Check if status is Generated or Approved. Wait, if it exists, it's valid data.
                setIdCard(data);
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
                            placeholder="e.g. EMP-001"
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
                </div>
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
                        <div className="w-[300px] h-[480px] bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between border border-gray-200 print:shadow-none print-container">
                            {/* Header / Top Shape */}
                            <div className="h-32 relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${idCard.cardColor || '#1e5cdc'}, ${(idCard.cardColor || '#1e5cdc')}dd)` }}>
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                                <div className="text-black font-black text-xl tracking-wider uppercase z-10 w-full text-center px-4 mt-8 leading-tight">
                                    The Contractum
                                </div>
                                <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 320" style={{ transform: "rotateY(180deg) rotateZ(180deg)" }}>
                                    <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                                </svg>
                            </div>

                            {/* Photo & Category */}
                            <div className="flex flex-col items-center -mt-10 z-20">
                                <img src={idCard.photo || 'https://via.placeholder.com/150'} alt="Profile" className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                                <span className={`mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full`} style={{ backgroundColor: idCard.cardColor || '#1e5cdc' }}>
                                    {idCard.category}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col items-center pt-2 px-6 text-center">
                                <h1 className="text-xl font-bold text-gray-900 leading-tight uppercase">{idCard.name}</h1>
                                <p className="font-semibold text-sm mt-0.5 uppercase tracking-wide" style={{ color: idCard.cardColor || '#1e5cdc' }}>{idCard.designation}</p>
                                <p className="text-gray-500 text-xs font-medium">{idCard.department}</p>

                                <div className="w-full mt-4 flex flex-col gap-1 text-xs text-left bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="flex justify-between border-b border-gray-200 pb-1">
                                        <span className="text-gray-500 font-semibold">ID No.</span>
                                        <span className="font-bold text-gray-800">{idCard.employeeId.toUpperCase()}</span>
                                    </div>
                                    {idCard.bloodGroup && (
                                        <div className="flex justify-between border-b border-gray-200 py-1">
                                            <span className="text-gray-500 font-semibold">Blood Group</span>
                                            <span className="font-bold text-red-600">{idCard.bloodGroup}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between pt-1">
                                        <span className="text-gray-500 font-semibold">Valid Till</span>
                                        <span className="font-bold text-gray-800">{new Date(idCard.validUntil).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Bar */}
                            <div className="h-6 mt-auto" style={{ background: `linear-gradient(to right, ${idCard.cardColor || '#1e5cdc'}, ${(idCard.cardColor || '#1e5cdc')}aa)` }}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
