import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, FileText, ExternalLink, Download, Award, Filter, FileSpreadsheet, RefreshCw, CheckCircle2, Upload, Eye, CheckCircle, ShieldCheck, Settings as SettingsIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-hot-toast';
import { CATEGORIES, DEPARTMENTS_BY_CATEGORY, DESIGNATIONS_MAPPING, THEME_COLORS } from '../../constants/certificateConstants';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';


// ── SHARED TEMPLATE COMPONENT FOR DRY ──
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
          <br />
          This recognition honors exceptional dedication and professional excellence.
        </p>
      </div>

      {/* Unified Bottom Layout */}
      <div className="absolute bottom-10 left-12 right-12 flex items-end justify-between z-10 border-t pt-6" style={{ borderColor: selectedTheme.primary + '33' }}>
        {/* QR Code Section */}
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

        {/* Date Section */}
        <div className="flex flex-col items-center">
          <span className="text-[14px] font-bold text-gray-800">
            {new Date(formData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="w-32 h-[1px] my-1" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Date of Issue</span>
        </div>

        {/* Signature / Issued By Section */}
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-serif font-bold italic text-gray-800">{formData.issuedBy || 'The Contractum'}</span>
          <div className="w-32 h-[1px] my-1" style={{ backgroundColor: selectedTheme.primary + '66' }}></div>
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Issued By</span>
          <span className="text-[7px] font-bold text-gray-400 uppercase">Authorized Authority</span>
        </div>
      </div>
    </div>
  );
}


// ── PURE CANVAS 2D GENERATOR (Pixel-Perfect Clone of HTML Template) ──
async function generateCertificateCanvas(data, theme, globalSettings = null) {
  const W = 2400; // 800 * 3
  const H = 1740; // 580 * 3
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1. Background
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, H);

  // 2. Main Premium Border
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 48; // 16 * 3
  ctx.strokeRect(24, 24, W - 48, H - 48);

  // 3. Decorative Corner Elements (10% Opacity)
  ctx.fillStyle = theme.primary;
  ctx.globalAlpha = 0.1;
  // Top-Left
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(384, 0);
  ctx.arcTo(384, 384, 0, 384, 384);
  ctx.closePath();
  ctx.fill();
  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(W, H);
  ctx.lineTo(W - 384, H);
  ctx.arcTo(W - 384, H - 384, W, H - 384, 384);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 4. Inner Dashed Border
  ctx.strokeStyle = theme.primary + '33';
  ctx.lineWidth = 3;
  ctx.setLineDash([15, 15]);
  ctx.strokeRect(60, 60, W - 120, H - 120);
  ctx.setLineDash([]);

  // 5. Premium Watermark Pattern
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-35 * Math.PI / 180);
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#000000';
  ctx.font = 'black 42px Montserrat, sans-serif';
  ctx.textAlign = 'center';
  for (let i = -15; i < 15; i++) {
    for (let j = -15; j < 15; j++) {
      ctx.fillText('The Contractum Official • Secure Registry • ', i * 1000, j * 150);
    }
  }
  ctx.restore();
  ctx.globalAlpha = 1.0;

  // 6. Official Digital Seal (Reddish/Theme Mix)
  const sealX = W - 360;
  const sealY = 240;
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 150, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.2)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 135, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.translate(sealX, sealY);
  ctx.rotate(-15 * Math.PI / 180);
  ctx.fillStyle = 'rgba(220, 38, 38, 0.4)';
  ctx.textAlign = 'center';
  ctx.font = '900 24px Montserrat, sans-serif';
  ctx.fillText('CONTRACTUM', 0, -30);
  ctx.font = '900 30px Montserrat, sans-serif';
  ctx.fillText('OFFICIAL', 0, 15);
  ctx.font = '900 24px Montserrat, sans-serif';
  ctx.fillText('VERIFIED', 0, 50);
  ctx.restore();

  // 7. Branding
  ctx.textAlign = 'center';
  
  if (globalSettings?.companyLogo) {
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = globalSettings.companyLogo.startsWith('data:') ? globalSettings.companyLogo : `${API}${globalSettings.companyLogo}`;
      await new Promise(resolve => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve; // Continue on error
      });
      // Draw logo centered
      const maxLogoHeight = 120;
      const aspect = logoImg.width / logoImg.height;
      const logoWidth = maxLogoHeight * aspect;
      ctx.drawImage(logoImg, W / 2 - logoWidth / 2, 190, logoWidth, maxLogoHeight);
    } catch (e) {
      console.error("Failed to load global logo for canvas", e);
    }
  } else {
    ctx.fillStyle = theme.primary;
    ctx.font = '900 30px Montserrat, sans-serif';
    ctx.fillText('OFFICIAL RECOGNITION', W / 2, 210);
    ctx.font = 'italic 900 72px Montserrat, sans-serif';
    ctx.fillText(globalSettings?.companyName || 'The Contractum', W / 2, 300);
  }

  // 8. Main Title
  ctx.fillStyle = theme.accent;
  ctx.font = 'bold italic 120px Georgia, serif';
  ctx.fillText('Certificate', W / 2, 480);
  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 48px Montserrat, sans-serif';
  ctx.fillText('OF ACHIEVEMENT', W / 2, 570);

  // 9. Recipient Info
  ctx.fillStyle = '#6b7280';
  ctx.font = '500 36px Montserrat, sans-serif';
  ctx.fillText('THIS CERTIFICATE IS PROUDLY PRESENTED TO', W / 2, 720);

  // Name underline
  ctx.strokeStyle = theme.primary + '66';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 600, 870);
  ctx.lineTo(W / 2 + 600, 870);
  ctx.stroke();

  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 90px Georgia, serif';
  ctx.fillText((data.name || 'Recipient Name').toUpperCase(), W / 2, 840);

  // Details
  ctx.fillStyle = '#4b5563';
  ctx.font = '500 39px Montserrat, sans-serif';
  const detailY = 990;
  const mainText = `This certificate is awarded for the successful completion of the ${data.designation || 'Program'} track`;
  ctx.fillText(mainText, W / 2, detailY);
  ctx.fillText(`under the ${data.type.toUpperCase()} initiative.`, W / 2, detailY + 60);

  if (data.details) {
    ctx.font = 'italic 500 36px Montserrat, sans-serif';
    ctx.fillText(`Project: ${data.details}`, W / 2, detailY + 150);
  }
  ctx.font = '500 36px Montserrat, sans-serif';
  ctx.fillText('This recognition honors exceptional dedication and professional excellence.', W / 2, detailY + (data.details ? 210 : 150));

  // 10. Bottom Layout
  const bottomY = H - 300;

  // Real QR Code
  try {
    const qrUrl = `${window.location.origin}/verify/${data.certificateId}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl, {
      margin: 0,
      color: { dark: theme.primary, light: '#00000000' },
      width: 156
    });
    const qrImg = new Image();
    qrImg.src = qrDataUrl;
    await new Promise(resolve => qrImg.onload = resolve);
    ctx.drawImage(qrImg, 150, bottomY - 60, 156, 156);
  } catch (qrErr) { console.error(qrErr); }

  ctx.fillStyle = '#9ca3af';
  ctx.font = '900 21px Montserrat, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('VERIFY RECORD', 320, bottomY + 15);
  ctx.fillStyle = theme.primary;
  ctx.font = 'bold 27px monospace';
  ctx.fillText(data.certificateId || 'TC-CERT-000', 320, bottomY + 55);

  // Issued By / Authorized Signature
  ctx.textAlign = 'center';

  // If signature image is uploaded in settings, render it; otherwise use italic text
  if (globalSettings?.authorizedSignature) {
    try {
      const sigImg = new Image();
      sigImg.crossOrigin = 'anonymous';
      sigImg.src = globalSettings.authorizedSignature.startsWith('data:') ? globalSettings.authorizedSignature : `${API}${globalSettings.authorizedSignature}`;
      await new Promise(resolve => { sigImg.onload = resolve; sigImg.onerror = resolve; });
      const sigWidth = 240;
      const sigHeight = 60;
      ctx.drawImage(sigImg, W - 450 - sigWidth / 2, bottomY - 10, sigWidth, sigHeight);
    } catch (e) {
      // Fallback to italic text
      ctx.fillStyle = theme.primary;
      ctx.font = 'italic 63px Georgia, serif';
      ctx.fillText(data.issuedBy || 'The Contractum', W - 450, bottomY + 30);
    }
  } else {
    ctx.fillStyle = theme.primary;
    ctx.font = 'italic 63px Georgia, serif';
    ctx.fillText(data.issuedBy || 'The Contractum', W - 450, bottomY + 30);
  }

  ctx.strokeStyle = theme.primary + '66';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W - 690, bottomY + 60);
  ctx.lineTo(W - 210, bottomY + 60);
  ctx.stroke();

  ctx.fillStyle = theme.primary;
  ctx.font = '900 27px Montserrat, sans-serif';
  ctx.fillText('ISSUED BY', W - 450, bottomY + 105);
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 21px Montserrat, sans-serif';
  ctx.fillText(globalSettings?.signatoryDesignation || 'AUTHORIZED AUTHORITY', W - 450, bottomY + 140);

  // Date of Issue
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.primary;
  const dateStr = new Date(data.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  ctx.font = 'bold 48px Montserrat, sans-serif';
  ctx.fillText(dateStr, W / 2, bottomY + 45);

  ctx.strokeStyle = theme.primary + '66';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 240, bottomY + 60);
  ctx.lineTo(W / 2 + 240, bottomY + 60);
  ctx.stroke();

  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 27px Montserrat, sans-serif';
  ctx.fillText('DATE OF ISSUE', W / 2, bottomY + 105);

  return canvas;
}


export default function AdminCertificates() {
  const { admin } = useAdminAuth();
  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState('Employee');
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [scanLogs, setScanLogs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [globalSettings, setGlobalSettings] = useState({ companyName: 'The Contractum', companyLogo: '', companySeal: '', authorizedSignature: '', signatoryDesignation: 'Authorized Authority' });
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [candidatePhoto, setCandidatePhoto] = useState('');
  const [generatedPreview, setGeneratedPreview] = useState('');

  // Helper to get the admin's display name for "Issued By"
  const getAdminDisplayName = () => {
    if (!admin) return 'The Contractum';
    const name = admin.name || admin.email || 'Admin';
    const role = admin.role === 'super-admin' ? 'Super Admin' : admin.role === 'admin' ? 'Admin' : admin.role || '';
    return role ? `${name} (${role})` : name;
  };

  const isSuperAdmin = admin?.role === 'super-admin';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Employee',
    issueDate: new Date().toISOString().split('T')[0],
    certificateId: '',
    details: '',
    recipientEmail: '',
    recipientPhone: '',
    themeId: 'modern',
    designation: '',
    department: 'General',
    issuedBy: '',
    file: null
  });

  async function fetchCertificates() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/certificates`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      setCertificates(Array.isArray(data) ? data : []);

      // Fetch Verification Logs (assuming same backend pattern as ID cards)
      const logsRes = await fetch(`${API}/api/certificates/logs`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (logsRes.ok) {
        const logs = await logsRes.json();
        setScanLogs(Array.isArray(logs) ? logs : []);
      }

      // Fetch Admin Activity Audit Logs
      const auditRes = await fetch(`${API}/api/audit-logs`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (auditRes.ok) {
        const auditData = await auditRes.json();
        setAuditLogs(Array.isArray(auditData) ? auditData : []);
      }

      // Fetch Global Settings
      const settingsRes = await fetch(`${API}/api/settings`);
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setGlobalSettings(settingsData);
      }
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
    }
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchCertificates(); }, [activeTab]);

  // Auto-set "Issued By" with the logged-in admin's name
  useEffect(() => {
    if (admin && !formData.issuedBy) {
      setFormData(prev => ({ ...prev, issuedBy: getAdminDisplayName() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  const filteredCerts = (certificates || []).filter(c => {
    if (!c) return false;
    const matchesTab = activeTab === 'All' || c.type === activeTab;
    const matchesDept = !filterDepartment || c.department === filterDepartment;
    const matchesStatus = !filterStatus || (c.status || 'Issued') === filterStatus;

    let matchesYear = true;
    if (filterYear) {
      try {
        matchesYear = new Date(c.issueDate).getFullYear().toString() === filterYear;
      } catch { matchesYear = false; }
    }

    let matchesMonth = true;
    if (filterMonth) {
      try {
        matchesMonth = (new Date(c.issueDate).getMonth() + 1).toString() === filterMonth;
      } catch { matchesMonth = false; }
    }

    const matchesSearch = (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.certificateId || '').toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesDept && matchesStatus && matchesYear && matchesMonth && matchesSearch;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, file: file });
        setCandidatePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: activeTab,
      issueDate: new Date().toISOString().split('T')[0],
      certificateId: '', // Let useEffect generate this
      designation: '',
      details: '',
      recipientEmail: '',
      recipientPhone: '',
      themeId: 'modern',
      department: 'General',
      issuedBy: getAdminDisplayName(),
      file: null
    });
    setEditingId(null);
    setPreviewMode(false);
    setCandidatePhoto('');
    setGeneratedPreview('');
  };

  // ── Auto-Generate Certificate ID ──
  useEffect(() => {
    if (!editingId && formData.type && certificates.length >= 0) {
      const prefix = 'TC';
      const year = new Date().getFullYear();
      const typeCode = formData.type.substring(0, 3).toUpperCase();

      const sameTypeIds = certificates
        .map(c => c.certificateId)
        .filter(id => id && id.startsWith(`${prefix}-${year}-${typeCode}`));

      let nextSeq = 1;
      if (sameTypeIds.length > 0) {
        const sequences = sameTypeIds.map(id => {
          const parts = id.split('-');
          return parseInt(parts[parts.length - 1]) || 0;
        });
        nextSeq = Math.max(...sequences) + 1;
      }

      const nextId = `${prefix}-${year}-${typeCode}-${nextSeq.toString().padStart(3, '0')}`;
      if (formData.certificateId !== nextId && !editingId) {
        setFormData(prev => ({ ...prev, certificateId: nextId }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.type, certificates, editingId]);

  // ── Auto-Theme Selection ──
  useEffect(() => {
    if (!editingId) {
      if (formData.type === 'internship') setFormData(prev => ({ ...prev, themeId: 'modern' }));
      else if (formData.type === 'hackathon') setFormData(prev => ({ ...prev, themeId: 'classic' }));
      else if (formData.type === 'other') setFormData(prev => ({ ...prev, themeId: 'emerald' }));
    }
  }, [formData.type, editingId]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate record?")) {
      try {
        const res = await fetch(`${API}/api/certificates/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        });
        if (res.ok) fetchCertificates();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDownload = async (certData) => {
    setDownloading(true);
    try {
      const theme = THEME_COLORS.find(t => t.id === certData.themeId) || THEME_COLORS[0];
      const canvas = await generateCertificateCanvas(certData, theme, globalSettings);
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `Certificate_${certData.certificateId || 'download'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
      toast.error('Download failed. Please try again.');
    }
    setDownloading(false);
  };

  const exportCertificatesAsPDF = async (specificCerts = null) => {
    setDownloading(true);
    const certsToExport = Array.isArray(specificCerts) ? specificCerts : filteredCerts;

    if (certsToExport.length === 0) {
      toast.error('No certificates available to export.');
      setDownloading(false);
      return;
    }

    try {
      const doc = new jsPDF('l', 'mm', 'a4'); // A4 Landscape

      for (let i = 0; i < certsToExport.length; i++) {
        const cert = certsToExport[i];
        if (i > 0) doc.addPage('a4', 'l');

        const theme = THEME_COLORS.find(t => t.id === cert.themeId) || THEME_COLORS[0];
        const canvas = await generateCertificateCanvas(cert, theme, globalSettings);
        const imgData = canvas.toDataURL('image/png', 1.0);

        // A4 is 297mm x 210mm
        doc.addImage(imgData, 'PNG', 0, 0, 297, 210);
      }

      doc.save(`Certificates_Batch_${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error('Bulk PDF failed:', err);
      toast.error('Failed to generate PDF certificates.');
    }
    setDownloading(false);
  };

  const copyShareLink = (id) => {
    const url = `${window.location.origin}/verify/${id}`;
    navigator.clipboard.writeText(url);
    toast.success('Verification link copied to clipboard!');
  };

  const handleStatusChange = async (certId, newStatus) => {
    const confirmMsg = {
      'Revoked': 'Are you sure you want to REVOKE this certificate? This action is visible publicly.',
      'Approved': 'Mark this certificate as Approved?',
      'Issued': 'Mark this certificate as Issued?',
      'Pending': 'Move this certificate back to Pending?',
    };
    if (confirmMsg[newStatus] && !window.confirm(confirmMsg[newStatus])) return;

    try {
      const res = await fetch(`${API}/api/certificates/${certId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}`
        },
        body: JSON.stringify({
          status: newStatus,
          ...(newStatus === 'Approved' || newStatus === 'Issued' ? { approvedBy: getAdminDisplayName() } : {}),
          ...(newStatus === 'Revoked' ? { rejectedBy: getAdminDisplayName() } : {})
        })
      });
      if (res.ok) {
        await fetchCertificates();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to update status.');
      }
    } catch (err) {
      console.error('Status change failed:', err);
      toast.error('Failed to update certificate status.');
    }
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    if (generatedPreview) {
      setPreviewMode(true);
      return;
    }
    setLoading(true);
    try {
      const theme = THEME_COLORS.find(t => t.id === formData.themeId) || THEME_COLORS[0];
      // Include candidate photo in the data for rendering
      const renderData = { ...formData, fileUrl: candidatePhoto };
      const canvas = await generateCertificateCanvas(renderData, theme, globalSettings);
      setGeneratedPreview(canvas.toDataURL('image/png', 1.0));
      setPreviewMode(true);
    } catch (err) {
      console.error('Preview generation failed:', err);
      toast.error('Failed to generate preview.');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // If there's a candidate photo, pass it as photo to be saved as fileUrl
      const payload = { ...formData, photo: candidatePhoto };

      const url = editingId ? `${API}/api/certificates/${editingId}` : `${API}/api/certificates`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        await fetchCertificates();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          resetForm();
        }, 1500);
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to save certificate.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please check your connection.");
    }
    setIsProcessing(false);
  };
  const handleBulkGenerate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        if (results.data.length === 0) return toast.error('CSV is empty or invalid.');

        setIsProcessing(true);
        try {
          // Map CSV column names (capitalized) to backend field names (lowercase)
          const mapped = results.data
            .filter(row => row.Name && row.Designation) // skip invalid rows
            .map(row => ({
              name: row.Name,
              type: row.Type || 'Intern',
              issueDate: row.Date || new Date().toISOString().split('T')[0],
              certificateId: row.ID || `TC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              designation: row.Designation,
              details: row.Details || '',
              recipientEmail: row.Email || '',
              themeId: row.Theme || 'modern',
              department: row.Department || 'General',
            }));

          if (mapped.length === 0) return toast.error('No valid rows found. Ensure Name and Designation columns are filled.');

          const res = await fetch(`${API}/api/certificates/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${admin?.token}` },
            body: JSON.stringify(mapped)
          });
          const result = await res.json();
          toast.success(result.message);
          fetchCertificates();
          setIsBulkModalOpen(false);
        } catch (err) {
          console.error(err);
          toast.error('Bulk upload failed. Please check your file and try again.');
        }
        setIsProcessing(false);
      }
    });
  };

  const handleView = async (cert) => {
    setEditingId(cert._id);
    setFormData({
      name: cert.name,
      type: cert.type,
      issueDate: new Date(cert.issueDate).toISOString().split('T')[0],
      certificateId: cert.certificateId,
      details: cert.details || '',
      recipientEmail: cert.recipientEmail || '',
      themeId: cert.themeId || 'modern',
      designation: cert.designation || '',
      department: cert.department || 'General'
    });

    setLoading(true);
    try {
      const theme = THEME_COLORS.find(t => t.id === cert.themeId) || THEME_COLORS[0];
      const canvas = await generateCertificateCanvas(cert, theme);
      setPreviewImageUrl(canvas.toDataURL('image/png', 1.0));
      setPreviewMode(true);
      setSuccess(false);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Preview generation failed:', err);
      toast.error('Failed to load preview.');
    }
    setLoading(false);
  };

  const selectedTheme = THEME_COLORS.find(t => t.id === formData.themeId) || THEME_COLORS[0];

  const exportToExcel = () => {
    const data = certificates.map(c => ({
      'Recipient Name': c.name,
      'Certificate ID': c.certificateId,
      'Category': c.type,
      'Department': c.department || 'General',
      'Designation': c.designation,
      'Issue Date': new Date(c.issueDate).toLocaleDateString(),
      'Status': c.status || 'Issued',
      'Recipient Email': c.recipientEmail || 'N/A',
      'Recipient Phone': c.recipientPhone || 'N/A',
      'Issued By': c.issuedBy || 'N/A',
      'Project/Details': c.details || 'N/A'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Certificates");
    XLSX.writeFile(wb, "Certificate_Registry.xlsx");
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} certificates?`)) {
      try {
        await Promise.all(selectedIds.map(id =>
          fetch(`${API}/api/certificates/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${admin?.token}` }
          })
        ));
        setSelectedIds([]);
        fetchCertificates();
        toast.success('Bulk deletion successful.');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete some certificates.');
      }
    }
  };

  const tabs = [
    { id: 'All', label: 'All Certificates', icon: <FileText size={18} /> },
    ...CATEGORIES.map(cat => ({
      id: cat,
      label: cat,
      icon: cat === 'Employee' ? <ShieldCheck size={18} /> : cat === 'Intern' ? <Award size={18} /> : <Filter size={18} />
    }))
  ];

  const resetFilters = () => {
    setFilterYear('');
    setFilterMonth('');
    setFilterDepartment('');
    setFilterStatus('');
    setSearch('');
    setActiveTab('All');
  };

  const stats = {
    total: (certificates || []).length,
    employees: (certificates || []).filter(c => c?.type === 'Employee').length,
    interns: (certificates || []).filter(c => c?.type === 'Intern').length,
    recent: (certificates || []).filter(c => {
      if (!c?.issueDate) return false;
      const diff = new Date() - new Date(c.issueDate);
      return diff < (7 * 24 * 60 * 60 * 1000);
    }).length,
    pending: (certificates || []).filter(c => c?.status === 'Pending' || c?.status === 'Under Review').length,
    approved: (certificates || []).filter(c => c?.status === 'Approved' || c?.status === 'Issued').length,
    revoked: (certificates || []).filter(c => c?.status === 'Revoked' || c?.status === 'Expired').length,
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Certificate Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, Preview and Track Certificates</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[160px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or ID..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full bg-white"
            />
          </div>
          <button onClick={exportToExcel} className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-100" title="Export to Excel">
            <FileSpreadsheet size={18} />
          </button>
          <button onClick={() => fetchCertificates()} className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100" title="Refresh">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => setIsBulkModalOpen(true)} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-sm">
            <FileSpreadsheet size={15} /> <span className="hidden xs:inline">Bulk Onboarding</span><span className="xs:hidden">Bulk</span>
          </button>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-sm">
            <Plus size={15} /> Add Certificate
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <select
          className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">All Years</option>
          {[...new Set((certificates || []).map(c => c?.issueDate ? new Date(c.issueDate).getFullYear() : null))].filter(Boolean).sort((a, b) => b - a).map(y => (
            <option key={y} value={y.toString()}>{y}</option>
          ))}
        </select>
        <select
          className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
            <option key={i + 1} value={(i + 1).toString()}>{m}</option>
          ))}
        </select>
        <select
          className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {[...new Set((certificates || []).map(c => c?.department))].filter(Boolean).sort().map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {['Pending', 'Under Review', 'Approved', 'Issued', 'Revoked', 'Expired'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {(filterYear || filterMonth || activeTab !== 'All' || filterDepartment || filterStatus || search) && (
          <button
            onClick={resetFilters}
            className="text-red-500 hover:text-red-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 px-2"
          >
            <X size={14} /> Reset Filters
          </button>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
        {[
          { label: 'Total Records', val: stats.total, color: 'text-blue-600', bg: 'bg-blue-50', icon: <FileText size={20} /> },
          { label: 'Employees', val: stats.employees, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <ShieldCheck size={20} /> },
          { label: 'Interns', val: stats.interns, color: 'text-amber-600', bg: 'bg-amber-50', icon: <Award size={20} /> },
          { label: 'Newly Issued (7d)', val: stats.recent, color: 'text-purple-600', bg: 'bg-purple-50', icon: <RefreshCw size={20} /> },
          { label: 'Pending Approvals', val: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: <Filter size={20} /> },
          { label: 'Active / Issued', val: stats.approved, color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle2 size={20} /> },
          { label: 'Revoked / Expired', val: stats.revoked, color: 'text-red-600', bg: 'bg-red-50', icon: <X size={20} /> }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
            <div>
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{s.label}</p>
              <h3 className={`text-2xl font-black ${s.color}`}>{s.val}</h3>
            </div>
            <div className={`p-3 ${s.bg} ${s.color} rounded-xl`}>{s.icon}</div>
          </div>
        ))}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-7 flex flex-col justify-between">
          <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Reports & Advanced Exports</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors border border-emerald-100 text-xs font-bold" title="Export Excel Report">
              <FileSpreadsheet size={16} /> Excel Spreadsheet
            </button>
            <button
              onClick={() => exportCertificatesAsPDF(filteredCerts)}
              disabled={downloading}
              className={`ml-auto px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all flex items-center gap-2 text-xs font-bold shadow-lg shadow-black/10 ${downloading ? 'opacity-50 pointer-events-none' : 'hover:scale-105 active:scale-95'}`}
            >
              {downloading ? <RefreshCw size={16} className="animate-spin" /> : <Award size={16} />}
              Generate Batch PDF Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      {certificates.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Award size={14} className="text-[#1e5cdc]" /> Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={(() => {
                    const counts = {};
                    certificates.forEach(c => { counts[c.type] = (counts[c.type] || 0) + 1; });
                    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
                  })()}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {['#1e5cdc', '#059669', '#d97706', '#9333ea', '#dc2626', '#0891b2', '#ea580c', '#7c3aed', '#16a34a', '#18181b', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6', '#f97316'].map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 700 }} />
                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Issuance Bar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText size={14} className="text-[#1e5cdc]" /> Monthly Issuance ({new Date().getFullYear()})
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={(() => {
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const currentYear = new Date().getFullYear();
                  const monthData = months.map((m, i) => ({
                    month: m,
                    Issued: certificates.filter(c => {
                      const d = new Date(c.issueDate);
                      return d.getFullYear() === currentYear && d.getMonth() === i;
                    }).length
                  }));
                  return monthData;
                })()}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 700 }} />
                <Bar dataKey="Issued" fill="#1e5cdc" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Verification Activity Section (New Feature like ID Cards) */}
      {scanLogs.length > 0 && (
        <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> Recent Certificate Verifications
            </h3>
            <div className="flex items-center gap-3">
              <button onClick={fetchCertificates} className="p-1.5 text-gray-400 hover:text-[#1e5cdc] transition-colors" title="Refresh Logs"><RefreshCw size={14} className={loading ? 'animate-spin' : ''} /></button>
              <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100 uppercase tracking-tighter">Live Audit</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Cert ID</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {scanLogs.slice(0, 5).map(log => (
                  <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-xs font-medium text-gray-500">{new Date(log.scannedAt).toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs font-bold text-gray-800 uppercase">{log.recipientName}</td>
                    <td className="px-6 py-3 text-xs font-mono font-bold text-blue-600">{log.certificateId}</td>
                    <td className="px-6 py-3 text-xs font-medium text-gray-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin Audit Logs Section */}
      {auditLogs.length > 0 && (
        <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <FileText size={18} className="text-[#1e5cdc]" /> Administrator Activity Ledger
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#1e5cdc] bg-blue-50 px-2 py-1 rounded-full border border-blue-100 uppercase tracking-tighter">Security Audit</span>
            </div>
          </div>
          <div className="overflow-x-auto max-h-64 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 sticky top-0">
                <tr>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Admin</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target ID</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {auditLogs.map(log => (
                  <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-xs font-medium text-gray-500">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs font-bold text-gray-800 uppercase">{log.adminName}</td>
                    <td className="px-6 py-3">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                        log.action === 'Create' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        log.action === 'Update' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        log.action === 'Delete' ? 'bg-red-50 text-red-600 border-red-100' :
                        log.action === 'Status Change' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                        'bg-gray-50 text-gray-600 border-gray-100'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs font-mono font-bold text-blue-600">{log.targetId}</td>
                    <td className="px-6 py-3 text-xs font-medium text-gray-500">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar items-center justify-between">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                ? 'border-[#1e5cdc] text-[#1e5cdc]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {isSuperAdmin && (
          <button onClick={() => setIsSettingsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 shadow-sm mr-2">
            <SettingsIcon size={16} /> Branding Settings
          </button>
        )}
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-600 text-white px-4 sm:px-6 py-4 rounded-2xl mb-6 shadow-lg shadow-blue-500/20 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <span className="font-bold text-sm">{selectedIds.length} Certificates Selected</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportCertificatesAsPDF(certificates.filter(c => selectedIds.includes(c._id)))}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs sm:text-sm font-bold transition-colors disabled:opacity-50"
            >
              {downloading ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />} Export PDF
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
            >
              <Trash2 size={14} /> Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredCerts.length && filteredCerts.length > 0}
                    onChange={e => {
                      if (e.target.checked) setSelectedIds(filteredCerts.map(c => c._id));
                      else setSelectedIds([]);
                    }}
                    className="rounded border-gray-300 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                  />
                </th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Recipient Name</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Certificate ID</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden md:table-cell">Category</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden md:table-cell">Issue Date</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden md:table-cell">Status</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden lg:table-cell">Issued By</th>
                <th className="text-right text-gray-500 font-semibold px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="8" className="text-center py-12 text-gray-500 font-medium">Loading records...</td></tr>
              ) : filteredCerts.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-12 text-gray-500 font-medium">No certificates found matching your criteria.</td></tr>
              ) : (
                filteredCerts.map(c => (
                  <tr key={c._id} className={`hover:bg-gray-50/80 transition-colors ${selectedIds.includes(c._id) ? 'bg-blue-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(c._id)}
                        onChange={e => {
                          if (e.target.checked) setSelectedIds([...selectedIds, c._id]);
                          else setSelectedIds(selectedIds.filter(id => id !== c._id));
                        }}
                        className="rounded border-gray-300 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <Eye size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800">{c.name}</span>
                          <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{c.designation || 'No designation'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">{c.certificateId}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-gray-50 border border-gray-100 rounded text-gray-500">{c.type}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-600 hidden md:table-cell">
                      {new Date(c.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {(() => {
                        const s = c.status || 'Issued';
                        const styles = {
                          'Pending': 'bg-yellow-50 text-yellow-600 border-yellow-100',
                          'Under Review': 'bg-blue-50 text-blue-600 border-blue-100',
                          'Approved': 'bg-indigo-50 text-indigo-600 border-indigo-100',
                          'Issued': 'bg-emerald-50 text-emerald-600 border-emerald-100',
                          'Revoked': 'bg-red-50 text-red-600 border-red-100',
                          'Expired': 'bg-gray-100 text-gray-500 border-gray-200',
                        };
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[s] || styles['Issued']}`}>
                            <CheckCircle size={12} /> {s}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs font-bold text-gray-600">{c.issuedBy || 'The Contractum'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* Status Actions (Super Admin Only) */}
                        {isSuperAdmin && (
                          <>
                            {(c.status === 'Pending' || c.status === 'Under Review') && (
                              <button onClick={() => handleStatusChange(c._id, 'Issued')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100" title="Approve & Issue">
                                <CheckCircle2 size={16} />
                              </button>
                            )}
                            {(c.status === 'Issued' || c.status === 'Approved') && (
                              <button onClick={() => handleStatusChange(c._id, 'Revoked')} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Revoke Certificate">
                                <X size={16} />
                              </button>
                            )}
                            {(c.status === 'Revoked' || c.status === 'Expired') && (
                              <button onClick={() => handleStatusChange(c._id, 'Issued')} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Reissue Certificate">
                                <RefreshCw size={16} />
                              </button>
                            )}
                          </>
                        )}
                        {/* Standard Actions */}
                        <button onClick={() => handleView(c)} className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100" title="View Certificate"><Award size={16} /></button>
                        <Link to={`/verify/${c.certificateId}`} target="_blank" className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="View Verification Page"><Eye size={16} /></Link>
                        <button onClick={() => handleDownload(c)} disabled={downloading} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100" title="Download PNG"><Download size={16} /></button>
                        <button onClick={() => copyShareLink(c.certificateId)} className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors border border-transparent hover:border-orange-100" title="Copy Share Link"><ExternalLink size={16} /></button>
                        <button onClick={() => {
                          setEditingId(c._id);
                          setFormData({
                            name: c.name,
                            type: c.type,
                            issueDate: new Date(c.issueDate).toISOString().split('T')[0],
                            certificateId: c.certificateId,
                            details: c.details || '',
                            recipientEmail: c.recipientEmail || '',
                            recipientPhone: c.recipientPhone || '',
                            themeId: c.themeId || 'modern',
                            designation: c.designation || '',
                            department: c.department || 'General',
                            issuedBy: c.issuedBy || 'The Contractum'
                          });
                          setCandidatePhoto(c.fileUrl || '');
                          setGeneratedPreview('');
                          setPreviewMode(false);
                          setIsModalOpen(true);
                        }} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors border border-transparent hover:border-amber-100" title="Edit Details"><Edit size={16} /></button>
                        {isSuperAdmin && (
                          <button onClick={() => handleDelete(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Delete"><Trash2 size={16} /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <>
        {/* Add/Preview Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh] animate-in fade-in zoom-in duration-200">
              {!previewMode ? (
                <div className="flex-1 flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
                  <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">{editingId ? 'Edit Certificate' : 'Add New Certificate'}</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handlePreview} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Name *</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="e.g. Jane Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                        <select required value={formData.type} onChange={e => {
                          const newType = e.target.value;
                          setFormData({
                            ...formData,
                            type: newType,
                            department: 'General',
                            designation: DESIGNATIONS_MAPPING[newType]?.General?.[0] || ''
                          });
                        }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]">
                          <option value="">Select Category</option>
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Department *</label>
                        <select required value={formData.department} onChange={e => {
                          const newDept = e.target.value;
                          setFormData({
                            ...formData,
                            department: newDept,
                            designation: DESIGNATIONS_MAPPING[formData.type]?.[newDept]?.[0] || ''
                          });
                        }} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]">
                          {(DEPARTMENTS_BY_CATEGORY[formData.type] || ['General']).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Designation *</label>
                        <select required value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]">
                          {(DESIGNATIONS_MAPPING[formData.type]?.[formData.department] || ['Other']).map(des => (
                            <option key={des} value={des}>{des}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Certificate ID *</label>
                        <input required type="text" value={formData.certificateId} onChange={e => setFormData({ ...formData, certificateId: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] font-mono" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Email (Optional)</label>
                        <input type="email" value={formData.recipientEmail} onChange={e => setFormData({ ...formData, recipientEmail: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Phone (WhatsApp)</label>
                        <input type="tel" value={formData.recipientPhone} onChange={e => setFormData({ ...formData, recipientPhone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="+91 9876543210" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Date *</label>
                        <input required type="date" value={formData.issueDate} onChange={e => setFormData({ ...formData, issueDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Issued By</label>
                        <input type="text" value={formData.issuedBy} onChange={e => setFormData({ ...formData, issuedBy: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="The Contractum" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Details / Project Description</label>
                      <textarea value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" rows={2} placeholder="Briefly describe achievement..." />
                    </div>
                    <div className="pt-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-widest text-[10px]">Visual Theme Profile</label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {THEME_COLORS.map(theme => (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, themeId: theme.id })}
                            className={`group relative h-14 rounded-xl border-2 transition-all overflow-hidden ${formData.themeId === theme.id ? 'border-[#1e5cdc] scale-105 shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                          >
                            <div className="absolute inset-0 flex flex-col">
                              <div className="h-2/3 w-full" style={{ backgroundColor: theme.primary }}></div>
                              <div className="h-1/3 w-full" style={{ backgroundColor: theme.bg }}></div>
                            </div>
                            {formData.themeId === theme.id && (
                              <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                                <CheckCircle2 size={20} className="text-white drop-shadow-md" />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-[2px] py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[7px] text-white font-bold uppercase tracking-tighter">{theme.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 flex items-center justify-between gap-3 mt-4 border-t border-gray-100 pb-6">
                      <div className="flex flex-col">
                        <label className="inline-flex items-center gap-2 cursor-pointer group">
                          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                          <Upload size={16} className="text-[#1e5cdc]" />
                          <span className="text-xs font-bold text-[#1e5cdc] group-hover:underline">Upload Custom File Instead</span>
                        </label>
                        {formData.file && <span className="text-[10px] text-emerald-600 font-bold ml-6 mt-1">✓ {formData.file.name} attached</span>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-all shadow-sm inline-flex items-center gap-2"
                        >
                          <Eye size={16} /> {formData.file ? 'Preview Uploaded File' : 'Preview Certificate'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8 overflow-y-auto relative min-h-0">
                  <button onClick={() => setPreviewMode(false)} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-500 transition-all z-50">
                    <X size={24} />
                  </button>
                  {success ? (
                    <div className="flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={40} className="text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">Certificate Processed!</h3>
                      <p className="text-gray-500 mt-2">The record has been saved and theme generated.</p>
                    </div>
                  ) : (
                    <div className="flex-1 bg-gray-100/50 p-8 flex flex-col items-center justify-center overflow-auto relative w-full">
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 sticky top-0 bg-gray-100/50 w-full justify-center py-2 z-10">
                        <Award size={18} /> Live Theme Preview
                      </h3>
                      {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 gap-3">
                          <div className="w-8 h-8 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Generating High-Fidelity Preview...</span>
                        </div>
                      ) : (
                        <div className="shadow-2xl flex-shrink-0 w-full max-w-4xl overflow-hidden rounded-lg bg-white">
                          {generatedPreview || candidatePhoto ? (
                            <div className="absolute inset-0 z-0 bg-white shadow-xl shadow-black/5 p-4 origin-center">
                              <img src={generatedPreview || candidatePhoto} alt="Certificate Preview" className="w-full h-auto border border-gray-100 rounded-sm" />
                            </div>
                          ) : (
                            <div className="w-full h-64 flex items-center justify-center text-gray-400 font-bold uppercase">No Preview Available</div>
                          )}
                        </div>
                      )}
                      <div className="flex gap-4 mt-8 w-full max-w-sm sticky bottom-0 bg-gray-100/50 justify-center py-4 z-10">
                        <button
                          onClick={() => setPreviewMode(false)}
                          disabled={isProcessing}
                          className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isProcessing}
                          className={`flex-1 py-3 text-sm font-bold text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                          style={{ backgroundColor: selectedTheme.primary }}
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing...
                            </>
                          ) : (
                            <><CheckCircle size={18} /> Confirm & Save</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Bulk Modal */}
        {isBulkModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                      <FileSpreadsheet size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-gray-800">Bulk Generation</h2>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Onboard Multiple Recipients</p>
                    </div>
                  </div>
                  <button onClick={() => setIsBulkModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all">
                    <X size={20} />
                  </button>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 text-center">
                  <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                    Upload a CSV file with columns: <br />
                    <span className="font-black text-emerald-600 font-mono text-xs">Name, Designation, Type, ID, Details, Email, Theme</span>
                  </p>
                  <div className="mt-4 flex justify-center">
                    <button onClick={() => {
                      const csvContent = "Name,Designation,Type,ID,Details,Email,Theme\nJohn Doe,Product Intern,internship,TC-2026-INT-001,Excellent Work,john@example.com,modern";
                      const blob = new Blob([csvContent], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'certificate_template.csv';
                      a.click();
                    }} className="text-xs font-black text-emerald-600 hover:underline uppercase tracking-widest">
                      Download Sample CSV
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-3xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={32} className="text-gray-400 group-hover:text-emerald-500 transition-colors mb-3" />
                      <p className="mb-2 text-sm text-gray-500 font-bold">Click to upload CSV</p>
                      <p className="text-xs text-gray-400">Excel / CSV files only</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv"
                      onChange={handleBulkGenerate}
                      disabled={isProcessing}
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <RefreshCw size={32} className="text-emerald-600 animate-spin" />
                        <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">Processing Bulk Data...</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      {/* Branding Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
              <h2 className="text-xl font-black text-gray-800">Branding Settings</h2>
              <button onClick={() => setIsSettingsModalOpen(false)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Company Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all"
                    value={globalSettings.companyName}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      {globalSettings.companyLogo ? (
                        <img src={globalSettings.companyLogo.startsWith('data:') ? globalSettings.companyLogo : `${API}${globalSettings.companyLogo}`} alt="Logo" className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">NONE</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#1e5cdc]/10 file:text-[#1e5cdc] hover:file:bg-[#1e5cdc]/20 transition-all cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setGlobalSettings({ ...globalSettings, companyLogo: reader.result });
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-400 mt-2">Upload a PNG or JPG logo with a transparent background for best results.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Company Seal</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      {globalSettings.companySeal ? (
                        <img src={globalSettings.companySeal.startsWith('data:') ? globalSettings.companySeal : `${API}${globalSettings.companySeal}`} alt="Seal" className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">NONE</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 transition-all cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setGlobalSettings({ ...globalSettings, companySeal: reader.result });
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-400 mt-2">Upload official company seal (PNG with transparent background).</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Authorized Signature</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                      {globalSettings.authorizedSignature ? (
                        <img src={globalSettings.authorizedSignature.startsWith('data:') ? globalSettings.authorizedSignature : `${API}${globalSettings.authorizedSignature}`} alt="Signature" className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">NONE</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100 transition-all cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => setGlobalSettings({ ...globalSettings, authorizedSignature: reader.result });
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <p className="text-xs text-gray-400 mt-2">Upload authorized signatory's signature image (PNG, transparent bg).</p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Signatory Designation</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 text-sm font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all"
                    value={globalSettings.signatoryDesignation || ''}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, signatoryDesignation: e.target.value })}
                    placeholder="e.g. Director, CEO, HR Manager"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0 flex justify-end gap-3">
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await fetch(`${API}/api/settings`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${admin?.token}` },
                      body: JSON.stringify(globalSettings)
                    });
                    toast.success('Settings updated successfully!');
                    setIsSettingsModalOpen(false);
                  } catch (err) { toast.error('Failed to update settings'); }
                }}
                className="px-6 py-2.5 text-sm font-bold text-white bg-[#1e5cdc] hover:bg-blue-700 shadow-md shadow-blue-500/20 rounded-xl transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

