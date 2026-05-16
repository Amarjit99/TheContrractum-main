import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle, Smartphone, Download, Share2, ArrowLeft, X, FileText, ShieldCheck, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { THEME_COLORS } from '../constants/certificateConstants';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── SHARED TEMPLATE COMPONENT (Copied for Public Page) ──
function CertificateTemplate({ formData, selectedTheme, globalSettings, id }) {
  return (
    <div
      id={id}
      className="w-[800px] h-[580px] bg-white relative flex flex-col items-center p-12 overflow-hidden border-[16px]"
      style={{ borderColor: selectedTheme.primary, backgroundColor: selectedTheme.bg }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10" style={{ backgroundColor: selectedTheme.primary, borderRadius: '0 0 100% 0' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: selectedTheme.primary, borderRadius: '100% 0 0 0' }} />
      <div className="absolute inset-0 border-[1px] border-dashed m-4 pointer-events-none" style={{ borderColor: selectedTheme.primary + '33' }} />

      {/* Premium Watermark Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex flex-wrap gap-12 rotate-[-35deg] scale-150 justify-center items-center content-center">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="text-[14px] font-black uppercase whitespace-nowrap tracking-widest">
            {globalSettings?.companyName || 'The Contractum'} Official • Secure Registry •
          </span>
        ))}
      </div>

      {/* Official Digital Seal */}
      <div className="absolute top-12 right-12 z-20 w-28 h-28 border-4 border-red-600/30 rounded-full flex items-center justify-center overflow-hidden">
        {globalSettings?.companySeal ? (
          <img src={globalSettings.companySeal.startsWith('data:') ? globalSettings.companySeal : `${API}${globalSettings.companySeal}`} alt="Seal" className="w-full h-full object-contain" crossOrigin="anonymous" />
        ) : (
          <div className="w-24 h-24 border-2 border-red-600/20 rounded-full flex flex-col items-center justify-center text-red-600/40 bg-white/50 backdrop-blur-sm">
            <span className="text-[8px] font-black uppercase tracking-tighter text-center leading-tight">
              {globalSettings?.companyName ? globalSettings.companyName.substring(0, 10) : 'Contractum'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">OFFICIAL</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">VERIFIED</span>
          </div>
        )}
      </div>

      {/* Candidate Photo (if available) */}
      {formData.fileUrl && (
        <div className="absolute top-12 left-12 z-20 w-24 h-28 border-[3px] bg-white/80 shadow-md flex items-center justify-center overflow-hidden rounded-md" style={{ borderColor: selectedTheme.primary + '66' }}>
          <img src={formData.fileUrl.startsWith('data:') ? formData.fileUrl : `${API}${formData.fileUrl}`} alt="Candidate" className="w-full h-full object-cover" crossOrigin="anonymous" />
        </div>
      )}

      {/* Top Logo / Branding */}
      <div className="text-center z-10 mb-6 flex flex-col items-center">
        {globalSettings?.companyLogo ? (
          <img src={globalSettings.companyLogo.startsWith('data:') ? globalSettings.companyLogo : `${API}${globalSettings.companyLogo}`} alt="Company Logo" className="h-16 object-contain mb-2" crossOrigin="anonymous" />
        ) : (
          <>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-1" style={{ color: selectedTheme.primary }}>Official Recognition</h4>
            <div className="text-2xl font-black italic tracking-[-0.2em] uppercase" style={{ color: selectedTheme.primary }}>
              {globalSettings?.companyName || 'The Contractum'}
            </div>
          </>
        )}
      </div>

      {/* Main Title Area */}
      <div className="text-center z-10 flex flex-col items-center w-full mt-2">
        <h1 className="text-4xl font-serif font-bold italic mb-1" style={{ color: selectedTheme.accent }}>Certificate</h1>
        <h2 className="text-base font-bold tracking-[0.3em] uppercase mb-8" style={{ color: selectedTheme.primary }}>Of Achievement</h2>

        <p className="text-xs font-medium mb-1" style={{ color: '#6b7280' }}>THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
        <div className="w-1/2 h-[1px] mb-3" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>
        <h2 className="text-3xl font-serif font-bold uppercase mb-3" style={{ color: selectedTheme.primary }}>{formData.name || 'Recipient Name'}</h2>
        <div className="w-1/2 h-[1px] mb-8" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>

        <p className="text-xs max-w-lg leading-relaxed px-8 text-center" style={{ color: '#4b5563' }}>
          This certificate is awarded for the successful completion of the <span className="font-bold underline">{formData.designation || 'Program'}</span> track
          {formData.details && (
            <span className="block mt-2 italic font-medium">Project: {formData.details}</span>
          )}
          <br/>
          This recognition honors exceptional dedication and professional excellence.
        </p>
      </div>

      {/* Unified Bottom Layout */}
      <div className="absolute bottom-10 left-12 right-12 flex items-end justify-between z-10 border-t pt-6" style={{ borderColor: selectedTheme.primary + '33' }}>
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/40 border border-white/60 backdrop-blur-[2px]">
          <QRCodeSVG
            value={`${window.location.origin}/verify/${formData.certificateId}`}
            size={52}
            fgColor={selectedTheme.primary}
            level="H"
            includeMargin={false}
          />
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Verify Record</span>
            <span className="text-[10px] font-mono font-bold" style={{ color: selectedTheme.primary }}>{formData.certificateId || 'TC-CERT-000'}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[14px] font-bold text-gray-800">
            {new Date(formData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="w-32 h-[1px] my-1" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Date of Issue</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[18px] font-serif font-bold italic text-gray-800">Amit Verma</span>
          <div className="w-32 h-[1px] my-1" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Authorized Signature</span>
          <span className="text-[7px] font-bold text-gray-400 uppercase">Director • The Contractum</span>
        </div>
      </div>
    </div>
  );
}


export default function VerifyCertificate() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [globalSettings, setGlobalSettings] = useState(null);
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

      const settingsRes = await fetch(`${API}/api/settings`);
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setGlobalSettings(settingsData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = Math.min(1, (containerWidth - 32) / 800);
        setScale(newScale);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <span className="font-black italic text-xl tracking-tighter text-gray-800 uppercase">The Contractum</span>
        </Link>
        <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end mr-2">
                <span className={`text-[9px] font-black uppercase tracking-widest ${(cert?.status === 'Revoked' || cert?.status === 'Expired') ? 'text-red-500' : 'text-emerald-500'}`}>
                  {(cert?.status === 'Revoked' || cert?.status === 'Expired') ? 'Certificate Revoked' : 'Officially Verified'}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">Secure Digital Record</span>
            </div>
            {(cert?.status === 'Revoked' || cert?.status === 'Expired') 
              ? <X className="text-red-500" size={24} />
              : <CheckCircle className="text-emerald-500" size={24} />
            }
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl p-4 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
         {/* Certificate Display Area */}
         <div className="lg:col-span-2 space-y-6">
            <div ref={containerRef} className="w-full bg-white rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden border border-gray-100 p-4 md:p-8 animate-in fade-in zoom-in duration-500 flex justify-center items-start">
                <div 
                  className="relative group shadow-lg border border-gray-100 rounded-sm origin-top transition-transform duration-200"
                  style={{
                    transform: `scale(${scale})`,
                    width: '800px',
                    height: '580px',
                    marginBottom: `-${580 * (1 - scale)}px`
                  }}
                >
                    {/* Live Rendered Template from Secure Metadata */}
                    <CertificateTemplate 
                        formData={cert} 
                        selectedTheme={THEME_COLORS.find(t => t.id === cert.themeId) || THEME_COLORS[0]} 
                        globalSettings={globalSettings}
                        id="verified-cert-canvas" 
                    />
                    
                    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors pointer-events-none rounded-sm border-2 border-transparent group-hover:border-emerald-500/20" />
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
             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                 {/* Decorative background for premium feel */}
                 <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-50 rounded-full opacity-50 blur-3xl"></div>
                 
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 relative z-10">
                     <FileText size={14} className="text-[#1e5cdc]" /> Credential Audit
                 </h3>
                 
                 <div className="space-y-6 relative z-10">
                     <div>
                         <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Authenticated Recipient</p>
                         <p className="font-bold text-gray-800 text-lg">{cert.name}</p>
                     </div>
                     <div>
                         <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Unique Security Key</p>
                         <p className="font-mono text-sm font-bold text-[#1e5cdc] bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100 w-fit">{cert.certificateId}</p>
                     </div>
                     <div>
                         <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Date of Official Issue</p>
                         <p className="font-bold text-gray-800">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                     </div>
                     <div>
                         <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Classification</p>
                         <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase rounded-full mt-1">{cert.type}</span>
                     </div>
                     {cert.issuedBy && (
                       <div>
                         <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">Issued By</p>
                         <p className="font-bold text-gray-800">{cert.issuedBy}</p>
                       </div>
                     )}
                 </div>

                 <div className="mt-8 pt-6 border-t border-gray-50">
                    {(cert.status === 'Revoked' || cert.status === 'Expired') ? (
                      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                        <X size={20} className="text-red-500 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-red-700 uppercase tracking-tighter leading-none">Status: {cert.status}</p>
                          <p className="text-[8px] text-red-600 font-bold uppercase mt-1 opacity-70">This certificate is no longer valid</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter leading-none">Status: {cert.status || 'Active'}</p>
                          <p className="text-[8px] text-emerald-600 font-bold uppercase mt-1 opacity-70">Integrity Check Passed</p>
                        </div>
                      </div>
                    )}
                 </div>
             </div>

             {/* Security Note */}
             <div className="bg-[#18181b] rounded-3xl p-8 text-white shadow-xl shadow-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <Award size={20} className="text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Secure Ledger</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                    This document is a certified digital copy. Any modification to this record or its unique security key will render the verification null. 
                </p>
                <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Encrypted Distribution</span>
                </div>
             </div>
          </aside>
      </main>

      <footer className="w-full p-12 text-center bg-gray-50 border-t border-gray-100 mt-auto">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 The Contractum Global Systems • All Records Secured via Digital Ledger</p>
      </footer>
    </div>
  );
}
