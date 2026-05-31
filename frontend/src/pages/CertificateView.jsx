import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle, Download, Share2, ArrowLeft, X, FileText, ShieldCheck, Printer, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { THEME_COLORS } from '../constants/certificateConstants';
import { generateCertificateCanvas } from './admin/AdminCertificates';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── SHARED TEMPLATE COMPONENT ──
function CertificateTemplate({ formData, selectedTheme, globalSettings, id }) {
  const sig = formData?.issuerSignature || globalSettings?.authorizedSignature;

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
            The Contractum Official • Secure Registry •
          </span>
        ))}
      </div>

      {/* Top Logo / Branding */}
      <div className="text-center z-10 mb-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-1" style={{ color: selectedTheme.primary }}>Official Recognition</h4>
        <div className="text-2xl font-black italic tracking-normal uppercase" style={{ color: selectedTheme.primary }}>
          The Contractum
        </div>
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
          {sig ? (
            <img 
              src={sig.startsWith('data:') ? sig : `${API}${sig}`} 
              alt="Signature" 
              className="h-10 object-contain mb-1"
              crossOrigin="anonymous"
            />
          ) : (
            <span className="text-[18px] font-serif font-bold italic text-gray-800">{formData.issuedBy || 'The Contractum'}</span>
          )}
          <div className="w-32 h-[1px] my-1" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Issued By</span>
          <span className="text-[7px] font-bold text-gray-400 uppercase">{formData?.issuerDesignation || globalSettings?.signatoryDesignation || 'Authorized Authority'}</span>
        </div>
      </div>
    </div>
  );
}

export default function CertificateView() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [globalSettings, setGlobalSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const fetchCertificate = useCallback(async () => {
    try {
      // First try verify endpoint which is public
      const res = await fetch(`${API}/api/certificates/public/verify/${id}`);
      if (!res.ok) throw new Error('Certificate not found');
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
  }, [id]);

  useEffect(() => {
    fetchCertificate();
  }, [fetchCertificate]);


  const handleDownload = async () => {
    setDownloading(true);
    try {
      const theme = THEME_COLORS.find(t => t.id === cert.themeId) || THEME_COLORS[0];
      const canvas = await generateCertificateCanvas(cert, theme, globalSettings);
      const imgData = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Certificate_${cert.certificateId}.png`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Record Not Found</h2>
          <p className="text-gray-500 mb-6">The certificate ID provided does not match our records.</p>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Back to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Award size={28} />
          </div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Official Digital Credential</h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Issued by The Contractum Global Systems</p>
        </div>

        <div className="relative group max-w-full overflow-auto mb-10 border border-gray-100 rounded-lg shadow-inner bg-gray-50 p-4">
          <div className="scale-[0.5] sm:scale-[0.7] md:scale-[0.9] lg:scale-100 origin-top transform-gpu">
            <CertificateTemplate 
              formData={cert} 
              selectedTheme={THEME_COLORS.find(t => t.id === cert.themeId) || THEME_COLORS[0]} 
              globalSettings={globalSettings}
              id="view-cert-canvas" 
            />
          </div>
        </div>

        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Download size={18} />
            )}
            Download High-Res
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all shadow-lg"
          >
            <Printer size={18} /> Print Certificate
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 w-full flex flex-col items-center">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4">
            <CheckCircle size={16} /> Secure Verification Complete
          </div>
          <Link to={`/verify/${cert.certificateId}`} className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
            View Public Audit Trail <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
