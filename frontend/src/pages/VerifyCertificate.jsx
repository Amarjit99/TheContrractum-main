import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle, Smartphone, Download, Share2, ArrowLeft, X, FileText } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function VerifyCertificate() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  const fetchCertificate = async () => {
    try {
      const res = await fetch(`${API}/api/certificates/public/verify/${id}`);
      if (!res.ok) {
        throw new Error('Certificate not found');
      }
      const data = await res.json();
      setCert(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Verifying Credential...</p>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
           <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <X size={40} className="text-red-500" />
           </div>
           <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Certificate</h1>
           <p className="text-gray-500 mb-8 font-medium">This certificate could not be verified by our systems. Please ensure you have the correct link.</p>
           <Link to="/" className="inline-flex items-center gap-2 text-[#1e5cdc] font-bold hover:underline">
             <ArrowLeft size={18} /> Back to Homepage
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center">
      {/* Verification Header */}
      <header className="w-full bg-white border-b border-gray-100 py-5 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1e5cdc] rounded-lg flex items-center justify-center text-white">
                <Award size={20} />
            </div>
            <span className="font-black italic text-xl tracking-tighter text-gray-800 uppercase">The Contrractum</span>
        </Link>
        <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Officially Verified</span>
                <span className="text-[10px] text-gray-400 font-bold">Secure Digital Record</span>
            </div>
            <CheckCircle className="text-emerald-500" size={24} />
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl p-4 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
         {/* Certificate Display Area */}
         <div className="lg:col-span-2 space-y-6">
            <div className="w-full bg-white rounded-2xl shadow-2xl shadow-blue-500/5 overflow-hidden border border-gray-100 p-2 md:p-6 animate-in fade-in zoom-in duration-500">
                <div className="relative group">
                    <img 
                        src={`${API}${cert.fileUrl}`} 
                        alt="Digital Certificate" 
                        className="w-full h-auto rounded-lg shadow-sm"
                    />
                </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                <a 
                    href={`${API}${cert.fileUrl}`} 
                    download 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-[#1e5cdc] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 leading-none"
                >
                    <Download size={18} /> Download Copy
                </a>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-white text-gray-600 border border-gray-200 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm leading-none"
                >
                    <Smartphone size={18} /> Print Record
                </button>
            </div>
         </div>

         {/* Verification Details Sidebar */}
         <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <FileText size={14} className="text-[#1e5cdc]" /> Certificate Details
                </h3>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Authenticated Recipient</p>
                        <p className="font-bold text-gray-800 text-lg">{cert.name}</p>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Unique Security Key</p>
                        <p className="font-mono text-sm font-bold text-[#1e5cdc] bg-blue-50 px-2 py-1 rounded w-fit">{cert.certificateId}</p>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Date of Official Issue</p>
                        <p className="font-bold text-gray-800">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Classification</p>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase rounded-full mt-1">{cert.type}</span>
                    </div>
                </div>
            </div>
         </aside>
      </main>

      <footer className="w-full p-12 text-center bg-gray-50 border-t border-gray-100 mt-auto">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 The Contrractum Global Systems • All Records Secured via Digital Ledger</p>
      </footer>
    </div>
  );
}
