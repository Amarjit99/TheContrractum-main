import { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  ArrowLeft, Save, Send, User as UserIcon, Calendar,
  FileText, ClipboardList, Info, Eye, EyeOff, RefreshCw,
  CheckCircle, LayoutTemplate, ChevronDown, Upload, XCircle, Pencil,
  Mail, Bold, Italic, List, Table, Underline, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, ListOrdered, Code, Trash2,
  // Word-like toolbar additions
  Undo2, Redo2, Strikethrough, Subscript, Superscript,
  Highlighter, Eraser, Link2, Image as ImageInsert,
  Minus, Search, Printer, Type
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CONTRACT_CATEGORIES } from '../../utils/contractConstants';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Corporate letterhead HTML — used in editor, preview, and PDF
const getLetterheadHTML = () => `<div style="position:relative;border-bottom:2px solid #1a408c;padding-bottom:15px;margin-bottom:30px;font-family:Arial,sans-serif;text-align:left;margin-top:1px;margin-left:1px;margin-right:1px;">
  <div style="position:absolute;top:0;left:0;width:150px;height:120px;overflow:hidden;z-index:1;pointer-events:none;">
    <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L110 0 L50 120 L0 120 Z" fill="#1a408c"/>
      <path d="M115 0 L135 0 L75 120 L55 120 Z" fill="#f1a80a"/>
    </svg>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:2;padding-top:15px;">
    <div style="margin-left:25px;margin-top:0;">
      <img src="${API}/uploads/main-logo.jpg" alt="The Contractum Logo" style="height:75px;width:75px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.15);" />
    </div>
    <div style="text-align:right;color:#1a408c;font-size:10.5px;line-height:1.4;font-family:sans-serif;padding-right:12px;">
      <h2 style="margin:0;font-size:14px;font-weight:800;color:#1a408c;text-transform:uppercase;letter-spacing:0.5px;">Contractum Integral Solution Pvt. Limited</h2>
      <p style="margin:2px 0 0 0;color:#1a408c;">Head office: Plot No.169, Ground Floor, Ganesh Nagar, Kota Rajasthan</p>
      <p style="margin:1px 0 0 0;color:#1a408c;">Pin: 324005, Phone: +91-9216654754</p>
      <p style="margin:1px 0 0 0;color:#1a408c;">Email address: jitendra@thecontractum.com</p>
      <p style="margin:1px 0 0 0;color:#1a408c;">Website: www.thecontractum.com</p>
      <p style="margin:1px 0 0 0;font-weight:bold;color:#1a408c;">CIN: U72900RJ2017PTC057530</p>
    </div>
  </div>
</div>`;

// Replaces {{company_logo}} in content with the letterhead HTML, prepending if missing
const injectLetterhead = (content) => {
  if (!content) return content;
  let result = content;
  // Check if the letterhead is already rendered (from a previous save)
  const alreadyHasLetterhead = result.includes('Contractum Integral Solution Pvt. Limited') && result.includes('main-logo.jpg');
  if (!result.includes('{{company_logo}}') && !alreadyHasLetterhead) {
    result = '{{company_logo}}' + result;
  }
  return result.replace(/\{\{company_logo\}\}/g, getLetterheadHTML());
};

const TYPE_BADGE = {
  Employee: 'bg-blue-100 text-blue-700 border-blue-200',
  Intern: 'bg-purple-100 text-purple-700 border-purple-200',
  Freelancer: 'bg-amber-100 text-amber-700 border-amber-200',
  Vendor: 'bg-teal-100 text-teal-700 border-teal-200',
  'Employment & HR Contracts': 'bg-blue-100 text-blue-700 border-blue-200',
  'Business & Corporate Agreements': 'bg-purple-100 text-purple-700 border-purple-200',
  'Software & IT Contracts': 'bg-amber-100 text-amber-700 border-amber-200',
  'Marketing & Media Agreements': 'bg-teal-100 text-teal-700 border-teal-200',
  'Financial & Legal Agreements': 'bg-rose-100 text-rose-700 border-rose-200',
  'Sales & Client Agreements': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Real Estate & Infrastructure Agreements': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Educational & Training Agreements': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Project Management & Operations Contracts': 'bg-violet-100 text-violet-700 border-violet-200',
  'Intellectual Property Agreements': 'bg-sky-100 text-sky-700 border-sky-200'
};

const CLAUSES_CONFIG = [
  { key: 'scopeOfWork', label: 'Scope of Work', placeholder: 'Detailed description of services, duties, and responsibilities...' },
  { key: 'paymentTerms', label: 'Payment Terms', placeholder: 'Compensation details, billing cycles, invoices, and payment schedule...' },
  { key: 'deliverables', label: 'Deliverables', placeholder: 'List of specific deliverables, reports, software code, or outputs...' },
  { key: 'timelineMilestones', label: 'Timeline & Milestones', placeholder: 'Expected start/end dates for key stages and delivery dates...' },
  { key: 'confidentiality', label: 'Confidentiality', placeholder: 'Non-disclosure obligations regarding proprietary information...' },
  { key: 'ipRights', label: 'Intellectual Property', placeholder: 'Ownership of designs, code, assets, and transfer of rights...' },
  { key: 'termination', label: 'Termination', placeholder: 'Notice period, grounds for termination, and post-termination actions...' },
  { key: 'penalty', label: 'Penalty & Damages', placeholder: 'Late delivery penalties, breach of contract clauses, and interest fees...' },
  { key: 'disputeResolution', label: 'Dispute Resolution', placeholder: 'Arbitration process, mediation, and resolution steps...' },
  { key: 'governingLaw', label: 'Governing Law', placeholder: 'Jurisdiction and laws governing this contract (e.g. State of Maharashtra, India)...' },
  { key: 'liability', label: 'Liability & Indemnity', placeholder: 'Limitations on liability, indemnification of claims and damages...' },
  { key: 'forceMajeure', label: 'Force Majeure', placeholder: 'Events beyond control (acts of God, war, pandemic) and suspension rights...' },
  { key: 'renewal', label: 'Renewal & Extension', placeholder: 'Auto-renewal terms, mutual agreement for extension, and pricing review...' }
];

const DEPARTMENTS = [
  'General',
  'IT',
  'Software Development',
  'GIS & Remote Sensing',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Business Development',
  'Artificial Intelligence',
  'Cyber Security',
  'UI/UX Design',
  'Operations',
  'Administration',
  'Engineering',
  'Product',
  'Design',
  'Customer Support',
  'Legal',
  'Procurement',
  'Logistics',
  'R&D'
];

export default function ContractEditor() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [preview, setPreview] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [fullContract, setFullContract] = useState(null);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [designationFilter, setDesignationFilter] = useState('');
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'clauses'
  const textareaRef = useRef(null);
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
  const editorRef = useRef(null);
  const [savedRange, setSavedRange] = useState(null);
  const lastUpdatedContentRef = useRef('');
  const [customRecipient, setCustomRecipient] = useState({
    name: 'Jane Doe',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    email: 'jane.doe@example.com',
    city: 'Bengaluru',
    country: 'India',
    salary: '₹50,000 / month',
    address: '123 Tech Park, Bengaluru, India'
  });
  const [appliedTemplateId, setAppliedTemplateId] = useState('');
  const [rawTemplateContent, setRawTemplateContent] = useState('');

  // ---- Rich Text Editor State ----
  const [fontFamily, setFontFamily] = useState('Georgia');
  const [fontSize, setFontSize] = useState('14');
  const [textColor, setTextColor] = useState('#000000');
  const [highlightColor, setHighlightColor] = useState('#ffff00');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  
  // Word pages view layout state
  const [showRuler, setShowRuler] = useState(true);
  const [showMargins, setShowMargins] = useState(true);
  const [pageColor, setPageColor] = useState('#ffffff');
  const [zoomScale, setZoomScale] = useState(1);

  const [formData, setFormData] = useState({
    employeeId: '',
    title: '',
    description: '',
    category: 'Employment & HR Contracts',
    type: 'Employment Agreement',
    content: '',
    status: 'Draft',
    validFrom: '',
    validUntil: '',
    clauses: {
      scopeOfWork: '',
      paymentTerms: '',
      deliverables: '',
      timelineMilestones: '',
      confidentiality: '',
      ipRights: '',
      termination: '',
      penalty: '',
      disputeResolution: '',
      governingLaw: '',
      liability: '',
      forceMajeure: '',
      renewal: ''
    }
  });

  const [forceEdit, setForceEdit] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const isDraftOrRejected = !isEdit || ['Draft', 'Rejected'].includes(formData.status);
  const isEditable = isDraftOrRejected || forceEdit;

  const token = localStorage.getItem('adminToken') || admin?.token;

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/users?t=${new Date().getTime()}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-cache'
      });
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
    } catch { console.error('Failed to fetch users'); }
  }, [token]);

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/contracts/templates`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (Array.isArray(data)) setTemplates(data);
    } catch { console.error('Failed to fetch templates'); }
  }, [token]);

  const fetchContract = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/contracts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) {
        const isExternal = data.recipientType === 'external' || (!data.employeeId && data.customRecipient);
        const formObj = {
          employeeId: isExternal ? 'custom' : (data.employeeId?._id || data.employeeId || ''),
          title: data.title || '',
          description: data.description || '',
          category: data.category || 'Employment & HR Contracts',
          type: data.type || 'Employment Agreement',
          content: data.content || '',
          status: data.status || 'Draft',
          validFrom: data.validFrom ? data.validFrom.slice(0, 10) : '',
          validUntil: data.validUntil ? data.validUntil.slice(0, 10) : '',
          clauses: {
            scopeOfWork: data.clauses?.scopeOfWork || '',
            paymentTerms: data.clauses?.paymentTerms || '',
            deliverables: data.clauses?.deliverables || '',
            timelineMilestones: data.clauses?.timelineMilestones || '',
            confidentiality: data.clauses?.confidentiality || '',
            ipRights: data.clauses?.ipRights || '',
            termination: data.clauses?.termination || '',
            penalty: data.clauses?.penalty || '',
            disputeResolution: data.clauses?.disputeResolution || '',
            governingLaw: data.clauses?.governingLaw || '',
            liability: data.clauses?.liability || '',
            forceMajeure: data.clauses?.forceMajeure || '',
            renewal: data.clauses?.renewal || '',
          }
        };
        setFormData(formObj);
        setOriginalData(formObj);
        setFullContract(data);
        if (isExternal && data.customRecipient) {
          setCustomRecipient(data.customRecipient);
        }
      }
    } catch { console.error('Failed to fetch contract'); }
  }, [id, token]);

  const insertTag = (before, after) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = before + selectedText + after;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertPlaceholder = (val) => {
    insertTag(val, '');
  };

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;
    lastUpdatedContentRef.current = html;
    setFormData(prev => ({ ...prev, content: html }));
  };

  // Handle Enter key in the visual editor to insert proper paragraph elements
  // (instead of browser-default <div> tags)
  // Shift+Enter = soft line break (<br>)
  // Enter = new paragraph (<p>) — like Word
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      range.deleteContents();

      if (e.shiftKey) {
        // Shift+Enter: soft line break
        const br = document.createElement('br');
        range.insertNode(br);
        // Move cursor after the br
        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      } else {
        // Enter: insert a new paragraph
        const p = document.createElement('p');
        p.appendChild(document.createElement('br')); // empty p needs a br to be focusable
        range.insertNode(p);
        // Move cursor into the new paragraph
        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }

      // Sync content back to state
      if (editorRef.current) {
        const updatedHtml = editorRef.current.innerHTML;
        lastUpdatedContentRef.current = updatedHtml;
        setFormData(prev => ({ ...prev, content: updatedHtml }));
      }
    }
  };

  // ---- Rich Text Editor Handlers ----

  const handleFontFamilyChange = (family) => {
    setFontFamily(family);
    if (editorRef.current) editorRef.current.focus();
    document.execCommand('fontName', false, family);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = html;
      setFormData(prev => ({ ...prev, content: html }));
    }
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    if (!editorRef.current) return;
    editorRef.current.focus();
    // Workaround: execCommand fontSize only accepts 1-7, so we set 7 then swap to a span with real px
    document.execCommand('fontSize', false, '7');
    editorRef.current.querySelectorAll('font[size="7"]').forEach(el => {
      const span = document.createElement('span');
      span.style.fontSize = `${size}px`;
      span.innerHTML = el.innerHTML;
      el.parentNode.replaceChild(span, el);
    });
    const html = editorRef.current.innerHTML;
    lastUpdatedContentRef.current = html;
    setFormData(prev => ({ ...prev, content: html }));
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
    if (editorRef.current) editorRef.current.focus();
    document.execCommand('foreColor', false, color);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = html;
      setFormData(prev => ({ ...prev, content: html }));
    }
  };

  const handleHighlightColorChange = (color) => {
    setHighlightColor(color);
    if (editorRef.current) editorRef.current.focus();
    document.execCommand('hiliteColor', false, color);
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = html;
      setFormData(prev => ({ ...prev, content: html }));
    }
  };

  const handleInsertLink = () => {
    if (!linkUrl || !linkUrl.trim()) { toast.error('Please enter a URL'); return; }
    if (editorRef.current) editorRef.current.focus();
    if (savedRange) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
      document.execCommand('createLink', false, linkUrl);
      editorRef.current?.querySelectorAll('a:not([target])').forEach(a => {
        a.target = '_blank';
        a.style.color = '#1e5cdc';
        a.style.textDecoration = 'underline';
      });
    } else {
      const display = linkText.trim() || linkUrl;
      insertHtmlAtCursor(`<a href="${linkUrl}" target="_blank" style="color:#1e5cdc;text-decoration:underline;">${display}</a>`);
    }
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = html;
      setFormData(prev => ({ ...prev, content: html }));
    }
    setShowLinkDialog(false);
    setLinkUrl('https://');
    setLinkText('');
  };

  const handleInsertImage = () => {
    const url = window.prompt('Enter image URL (direct link to an image):');
    if (!url) return;
    if (editorRef.current) editorRef.current.focus();
    insertHtmlAtCursor(`<img src="${url}" alt="Inserted Image" style="max-width:100%;height:auto;display:block;margin:12px 0;border-radius:6px;" />`);
  };

  const handleInsertHR = () => {
    if (editorRef.current) editorRef.current.focus();
    insertHtmlAtCursor('<hr style="border:none;border-top:2px solid #e2e8f0;margin:24px 0;" />');
  };

  const handlePrint = () => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    const printWin = window.open('', '_blank');
    printWin.document.write(`<!DOCTYPE html><html><head><title>${formData.title || 'Contract'}</title>
      <style>
        body { font-family: Georgia, serif; line-height: 1.8; color: #1e293b; max-width: 794px; margin: 0 auto; padding: 48px; }
        h1,h2,h3 { color: #0f172a; } table { width: 100%; border-collapse: collapse; }
        td, th { border: 1px solid #cbd5e1; padding: 8px; } @media print { body { padding: 0.5in; } }
      </style>
    </head><body>${content}</body></html>`);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => { printWin.print(); }, 400);
  };

  const handleFind = () => {
    if (!findText || !editorRef.current) return;
    const esc = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const highlighted = editorRef.current.innerHTML.replace(
      new RegExp(esc, 'gi'),
      m => `<mark style="background:#fef08a;padding:1px 2px;border-radius:2px;">${m}</mark>`
    );
    editorRef.current.innerHTML = highlighted;
    lastUpdatedContentRef.current = highlighted;
    setFormData(prev => ({ ...prev, content: highlighted }));
    toast.success(`Highlighted "${findText}"`);
  };

  const handleReplaceAll = () => {
    if (!findText || !editorRef.current) return;
    const esc = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const replaced = editorRef.current.innerHTML.replace(new RegExp(esc, 'gi'), replaceText);
    editorRef.current.innerHTML = replaced;
    lastUpdatedContentRef.current = replaced;
    setFormData(prev => ({ ...prev, content: replaced }));
    toast.success(`Replaced all "${findText}" → "${replaceText}"`);
  };

  // Reusable full Word-like toolbar
  const renderEditorToolbar = () => {
    const btn = 'p-1.5 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors flex items-center justify-center';
    const dvdr = <div className="h-4 w-[1px] bg-gray-300 mx-0.5 shrink-0" />;
    const wordCount = formData.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length;
    const charCount = formData.content.replace(/<[^>]*>/g, '').length;
    return (
      <div className="space-y-1.5 p-2 bg-gray-50 border border-gray-200/60 rounded-xl mb-2">
        {/* === ROW 1: Text Formatting === */}
        <div className="flex flex-wrap items-center gap-0.5">
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('undo')} title="Undo (Ctrl+Z)" className={btn}><Undo2 size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('redo')} title="Redo (Ctrl+Y)" className={btn}><Redo2 size={14}/></button>
          {dvdr}
          {/* Font Family */}
          <select value={fontFamily} onChange={e=>handleFontFamilyChange(e.target.value)} title="Font Family"
            className="px-1.5 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none cursor-pointer" style={{maxWidth:'120px'}}>
            {['Georgia','Arial','Times New Roman','Calibri','Verdana','Courier New','Trebuchet MS','Garamond'].map(f=>(
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          {/* Font Size */}
          <select value={fontSize} onChange={e=>handleFontSizeChange(e.target.value)} title="Font Size"
            className="px-1 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none cursor-pointer w-14">
            {[8,9,10,11,12,13,14,16,18,20,22,24,28,32,36,48,72].map(s=>(
              <option key={s} value={String(s)}>{s}</option>
            ))}
          </select>
          {dvdr}
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('bold')} title="Bold (Ctrl+B)" className={btn}><Bold size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('italic')} title="Italic (Ctrl+I)" className={btn}><Italic size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('underline')} title="Underline (Ctrl+U)" className={btn}><Underline size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('strikeThrough')} title="Strikethrough" className={btn}><Strikethrough size={14}/></button>
          {dvdr}
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('subscript')} title="Subscript" className={`${btn} text-[11px] font-bold`}>x₂</button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('superscript')} title="Superscript" className={`${btn} text-[11px] font-bold`}>x²</button>
          {dvdr}
          {/* Text Color */}
          <label title="Text Color" className={`${btn} flex-col gap-0 cursor-pointer relative`} style={{padding:'3px 5px'}}>
            <Type size={12}/>
            <div className="w-4 h-[3px] rounded mt-0.5" style={{backgroundColor:textColor}}/>
            <input type="color" value={textColor} onChange={e=>handleTextColorChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" title="Text Color"/>
          </label>
          {/* Highlight */}
          <label title="Highlight Color" className={`${btn} flex-col gap-0 cursor-pointer relative`} style={{padding:'3px 5px'}}>
            <Highlighter size={12}/>
            <div className="w-4 h-[3px] rounded mt-0.5" style={{backgroundColor:highlightColor}}/>
            <input type="color" value={highlightColor} onChange={e=>handleHighlightColorChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" title="Highlight Color"/>
          </label>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('removeFormat')} title="Clear Formatting" className={btn}><Eraser size={14}/></button>
          <div className="flex-1"/>
          {/* Visual/Code Toggle */}
          <div className="flex items-center bg-gray-200/60 p-0.5 rounded-lg border border-gray-300/20">
            <button type="button" onClick={()=>setEditorMode('visual')}
              className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded transition-all ${editorMode==='visual'?'bg-white text-gray-800 shadow-sm':'text-gray-500 hover:text-gray-700'}`}>Visual</button>
            <button type="button" onClick={()=>setEditorMode('code')}
              className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded transition-all ${editorMode==='code'?'bg-white text-gray-800 shadow-sm':'text-gray-500 hover:text-gray-700'}`}>Code</button>
          </div>
        </div>
        {/* === ROW 2: Block & Insert Tools === */}
        <div className="flex flex-wrap items-center gap-0.5 pt-1.5 border-t border-gray-200/60">
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleHeading('h1')} title="Heading 1" className={`${btn} px-2 text-xs font-bold`}>H1</button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleHeading('h2')} title="Heading 2" className={`${btn} px-2 text-xs font-bold`}>H2</button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleHeading('h3')} title="Heading 3" className={`${btn} px-2 text-xs font-bold`}>H3</button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleHeading('p')} title="Normal Paragraph" className={`${btn} px-2 text-xs`}>¶</button>
          {dvdr}
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('justifyLeft')} title="Align Left" className={btn}><AlignLeft size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('justifyCenter')} title="Center" className={btn}><AlignCenter size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('justifyRight')} title="Align Right" className={btn}><AlignRight size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('justifyFull')} title="Justify" className={btn}><AlignJustify size={14}/></button>
          {dvdr}
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('insertUnorderedList')} title="Bullet List" className={btn}><List size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('insertOrderedList')} title="Numbered List" className={btn}><ListOrdered size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('indent')} title="Increase Indent" className={`${btn} text-xs px-1.5`}>⇥</button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>handleFormat('outdent')} title="Decrease Indent" className={`${btn} text-xs px-1.5`}>⇤</button>
          {dvdr}
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>{
            insertHtmlAtCursor(`<table style="width:100%;border-collapse:collapse;margin:16px 0;border:1px solid #cbd5e1;"><thead><tr style="background:#f8fafc;"><th style="border:1px solid #cbd5e1;padding:8px;text-align:left;font-weight:bold;">Header 1</th><th style="border:1px solid #cbd5e1;padding:8px;text-align:left;font-weight:bold;">Header 2</th></tr></thead><tbody><tr><td style="border:1px solid #cbd5e1;padding:8px;">Cell 1</td><td style="border:1px solid #cbd5e1;padding:8px;">Cell 2</td></tr></tbody></table>`);
          }} title="Insert Table" className={btn}><Table size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>{
            saveSelection();
            setLinkText(window.getSelection()?.toString()||'');
            setShowLinkDialog(true);
          }} title="Insert Link" className={btn}><Link2 size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={handleInsertImage} title="Insert Image" className={btn}><ImageInsert size={14}/></button>
          <button type="button" onMouseDown={e=>e.preventDefault()} onClick={handleInsertHR} title="Insert Divider Line" className={btn}><Minus size={14}/></button>
          {dvdr}
          {/* Variable Inserter */}
          <select onChange={e=>{if(e.target.value){insertPlaceholderVal(e.target.value);e.target.value='';}}} title="Insert Variable"
            className="px-1.5 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none">
            <option value="">{`{ } Variable`}</option>
            <option value="{{employee_name}}">Employee Name</option>
            <option value="{{position}}">Job Title / Role</option>
            <option value="{{department}}">Department</option>
            <option value="{{salary}}">Salary / Stipend</option>
            <option value="{{start_date}}">Start Date</option>
            <option value="{{end_date}}">End Date</option>
            <option value="{{company_name}}">Company Name</option>
            <option value="{{company_address}}">Company Address</option>
            <option value="{{employee_address}}">Employee Address</option>
          </select>
          {dvdr}
          <button type="button" onClick={()=>setShowFindReplace(f=>!f)} title="Find & Replace"
            className={`${btn} ${showFindReplace?'bg-blue-100 text-blue-600':''}`}><Search size={14}/></button>
          <button type="button" onClick={handlePrint} title="Print Document" className={btn}><Printer size={14}/></button>
        </div>
        {/* === Find & Replace Bar === */}
        {showFindReplace && (
          <div className="flex flex-wrap items-center gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl mt-0.5">
            <Search size={12} className="text-amber-600 shrink-0"/>
            <input type="text" value={findText} onChange={e=>setFindText(e.target.value)} placeholder="Find..."
              onKeyDown={e=>e.key==='Enter'&&handleFind()}
              className="px-2.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400 w-28"/>
            <span className="text-gray-400 text-xs">→</span>
            <input type="text" value={replaceText} onChange={e=>setReplaceText(e.target.value)} placeholder="Replace with..."
              onKeyDown={e=>e.key==='Enter'&&handleReplaceAll()}
              className="px-2.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-400 w-32"/>
            <button type="button" onClick={handleFind}
              className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold rounded-lg">Find</button>
            <button type="button" onClick={handleReplaceAll}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">Replace All</button>
            <button type="button" onClick={()=>{setShowFindReplace(false);setFindText('');setReplaceText('');}} className="p-1 hover:bg-gray-100 text-gray-500 rounded ml-auto"><XCircle size={13}/></button>
          </div>
        )}
        {/* === Word & Char Count === */}
        <div className="flex items-center justify-end gap-4 text-[10px] text-gray-400 px-1">
          <span>{wordCount.toLocaleString()} words</span>
          <span>{charCount.toLocaleString()} chars</span>
        </div>
      </div>
    );
  };

  const renderHorizontalRuler = () => {
    if (!showRuler) return null;
    return (
      <div className="w-full max-w-[794px] mx-auto h-6 bg-gray-100 border-b border-gray-200 flex items-center select-none text-[9px] text-gray-500 font-mono relative overflow-hidden shrink-0 rounded-t-lg">
        {/* Left Margin Shading */}
        <div className="absolute left-0 top-0 bottom-0 bg-gray-200/80 border-r border-gray-300" style={{ width: '64px' }} />
        {/* Right Margin Shading */}
        <div className="absolute right-0 top-0 bottom-0 bg-gray-200/80 border-l border-gray-300" style={{ width: '64px' }} />
        
        {/* Rulers Ticks (every 20px) */}
        <div className="w-full h-full flex justify-between items-end pb-1 px-[64px] relative">
          {Array.from({ length: 33 }).map((_, i) => {
            const isMajor = i % 4 === 0;
            const isMedium = i % 2 === 0;
            return (
              <div key={i} className="flex flex-col items-center justify-end h-full" style={{ width: '20px' }}>
                {isMajor && <span className="mb-0.5 transform -translate-x-1/2 scale-75">{i / 4}</span>}
                <div className={`bg-gray-400 ${isMajor ? 'h-3 w-[1.5px]' : isMedium ? 'h-2 w-[1px]' : 'h-1 w-[1px]'}`} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderVerticalRuler = () => {
    if (!showRuler) return null;
    return (
      <div className="hidden xl:flex absolute left-[-24px] top-[24px] bottom-0 w-6 bg-gray-100 border-r border-gray-200 flex-col items-end select-none text-[9px] text-gray-500 font-mono pr-1 pt-[64px] relative overflow-hidden rounded-l-lg" style={{ height: '1123px' }}>
        {/* Top Margin Shading */}
        <div className="absolute top-0 left-0 right-0 bg-gray-200/80 border-b border-gray-300" style={{ height: '64px' }} />
        {/* Ruler Ticks */}
        <div className="h-full w-full flex flex-col justify-between items-end relative" style={{ height: '1123px', boxSizing: 'border-box', paddingBottom: '64px' }}>
          {Array.from({ length: 53 }).map((_, i) => {
            const isMajor = i % 4 === 0;
            const isMedium = i % 2 === 0;
            return (
              <div key={i} className="flex items-center justify-end w-full" style={{ height: '20px' }}>
                {isMajor && <span className="mr-0.5 transform -translate-y-1/2 scale-75">{i / 4}</span>}
                <div className={`bg-gray-400 ${isMajor ? 'w-3 h-[1.5px]' : isMedium ? 'w-2 h-[1px]' : 'w-1 h-[1px]'}`} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const getPageStyle = (isPreview = false) => {
    const baseBg = pageColor === 'grid' ? '#ffffff' : pageColor;
    const gridBg = pageColor === 'grid' 
      ? 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)' 
      : 'none';
    const textColorStyle = pageColor === '#1e293b' ? '#f8fafc' : '#1e293b';

    return {
      fontFamily: fontFamily || 'Georgia, serif',
      lineHeight: 1.8,
      color: textColorStyle,
      wordBreak: 'break-word',
      backgroundColor: baseBg,
      backgroundImage: pageColor === 'grid' 
        ? gridBg 
        : `radial-gradient(rgba(${pageColor === '#1e293b' ? '30, 41, 59' : '255, 255, 255'}, 0.94), rgba(${pageColor === '#1e293b' ? '30, 41, 59' : '255, 255, 255'}, 0.94)), url('${API}/uploads/main-logo.jpg')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 220px',
      backgroundSize: pageColor === 'grid' ? '20px 20px' : '320px',
      backgroundAttachment: 'local',
    };
  };

  const renderLayoutBar = () => {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl mb-4 text-xs font-bold text-gray-600">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={showRuler} onChange={e => setShowRuler(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500/20 w-3.5 h-3.5" />
            Rulers
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={showMargins} onChange={e => setShowMargins(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500/20 w-3.5 h-3.5" />
            Margins Guide
          </label>
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5">
            <button type="button" onClick={() => setZoomScale(z => Math.max(0.7, z - 0.1))} className="px-2 py-0.5 hover:bg-gray-100 rounded text-gray-500">-</button>
            <span className="px-1.5 text-[10px] min-w-8 text-center">{Math.round(zoomScale * 100)}%</span>
            <button type="button" onClick={() => setZoomScale(z => Math.min(1.5, z + 0.1))} className="px-2 py-0.5 hover:bg-gray-100 rounded text-gray-500">+</button>
          </div>

          {/* Page Theme */}
          <select value={pageColor} onChange={e => setPageColor(e.target.value)} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[10px] text-gray-600 focus:outline-none">
            <option value="#ffffff">Theme: White</option>
            <option value="#faf6eb">Theme: Cream (Warm)</option>
            <option value="#f3f4f6">Theme: Light Grey</option>
            <option value="#1e293b">Theme: Dark Mode</option>
            <option value="grid">Theme: Grid Paper</option>
          </select>
        </div>
      </div>
    );
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        setSavedRange(range);
      }
    }
  };

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const updatedHtml = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = updatedHtml;
      setFormData(prev => ({ ...prev, content: updatedHtml }));
    }
  };

  const handleHeading = (tag) => {
    document.execCommand('formatBlock', false, `<${tag}>`);
    if (editorRef.current) {
      const updatedHtml = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = updatedHtml;
      setFormData(prev => ({ ...prev, content: updatedHtml }));
    }
  };

  const insertHtmlAtCursor = (html) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const sel = window.getSelection();
    if (savedRange) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }

    if (sel.getRangeAt && sel.rangeCount) {
      let range = sel.getRangeAt(0);
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        range.deleteContents();

        const el = document.createElement("div");
        el.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        let lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        if (lastNode) {
          const newRange = range.cloneRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          setSavedRange(newRange);
        }
      } else {
        editorRef.current.innerHTML += html;
      }
    } else {
      editorRef.current.innerHTML += html;
    }

    const updatedHtml = editorRef.current.innerHTML;
    lastUpdatedContentRef.current = updatedHtml;
    setFormData(prev => ({ ...prev, content: updatedHtml }));
  };

  const insertPlaceholderVal = (val) => {
    if (editorMode === 'visual') {
      insertHtmlAtCursor(val);
    } else {
      insertPlaceholder(val);
    }
  };

  const insertTagVal = (before, after) => {
    if (editorMode === 'visual') {
      if (before === '<strong>') {
        handleFormat('bold');
      } else if (before === '<em>') {
        handleFormat('italic');
      } else if (before.includes('h1')) {
        handleHeading('h1');
      } else if (before.includes('h2')) {
        handleHeading('h2');
      } else if (before.includes('p')) {
        handleHeading('p');
      } else {
        const sel = window.getSelection();
        const selectedText = sel.toString();
        insertHtmlAtCursor(before + selectedText + after);
      }
    } else {
      insertTag(before, after);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      if (formData.content === lastUpdatedContentRef.current) {
        return;
      }
      editorRef.current.innerHTML = injectLetterhead(formData.content || '');
      lastUpdatedContentRef.current = formData.content || '';
    }
  }, [formData.content]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = injectLetterhead(formData.content || '');
      lastUpdatedContentRef.current = formData.content || '';
    }
  }, [editorMode, isSplit]);

  const injectLivePlaceholders = (content, emp) => {
    if (!content) return '';
    const empName = emp ? (emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim()) : 'John Doe (Demo)';
    const empTitle = emp?.jobTitle || 'Software Engineer (Demo)';
    const empDept = emp?.department || 'Engineering (Demo)';
    const empEmail = emp?.email || 'john.doe@example.com (Demo)';
    const validFromStr = formData.validFrom ? new Date(formData.validFrom).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const validUntilStr = formData.validUntil ? new Date(formData.validUntil).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '__________________';

    const replacements = {
      '{{company_logo}}': getLetterheadHTML(),
      '{{employee_name}}': empName,
      '{{position}}': empTitle,
      '{{department}}': empDept,
      '{{company_name}}': 'The Contractum Integral Solution Pvt. Limited',
      '{{company_address}}': 'India',
      '{{start_date}}': validFromStr,
      '{{end_date}}': validUntilStr,
      '{{salary}}': '₹50,000 / month (Demo)',
      '{{employee_address}}': '123 Tech Park, Bengaluru, India (Demo)',
      '{{company_city}}': 'Bengaluru',
    };

    let result = content;
    const alreadyHasLetterhead1 = result && result.includes('Contractum Integral Solution Pvt. Limited') && result.includes('main-logo.jpg');
    if (result && !result.includes('{{company_logo}}') && !alreadyHasLetterhead1) {
      result = '{{company_logo}}' + result;
    }
    Object.entries(replacements).forEach(([k, v]) => {
      result = result.replace(new RegExp(k.replace(/[{}]/g, '\\$&'), 'g'), v);
    });
    return result;
  };

  const canApproveReject = useCallback(() => {
    if (!admin || !formData.status) return false;
    const subRole = (admin.adminSubRole || '').toLowerCase().trim();
    const isManager = subRole.includes('manager') || admin.role === 'manager';
    const isHR = subRole.includes('hr') || subRole.startsWith('hr ');
    const isLegal = subRole.includes('legal') || subRole.includes('compliance');
    const isSuper = admin.role === 'super-admin';

    return (
      (formData.status === 'Pending_Manager' && isManager) ||
      (formData.status === 'Pending_HR' && isHR) ||
      (formData.status === 'Pending_Legal' && isLegal) ||
      (formData.status === 'Pending_Final' && isSuper)
    );
  }, [admin, formData.status]);

  const handleApprove = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/contracts/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comments: 'Approved via view page' })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Contract approved!');
        navigate('/admin/contracts');
      } else {
        toast.error(data.message || 'Action not allowed');
      }
    } catch {
      toast.error('Failed to approve');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm('Reject this contract?')) return;
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/contracts/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comments: 'Rejected via view page' })
      });
      if (res.ok) {
        toast.success('Contract rejected');
        navigate('/admin/contracts');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to reject');
      }
    } catch {
      toast.error('Failed to reject');
    } finally {
      setLoading(false);
    }
  };

  const [sendingEmail, setSendingEmail] = useState(false);

  const handleSendEmail = async () => {
    if (!formData.employeeId) {
      toast.error('No employee assigned to this contract.');
      return;
    }
    const emp = users.find(u => u._id === formData.employeeId);
    const email = emp?.email || 'the employee';
    if (!window.confirm(`Send contract "${formData.title}" directly to ${email}?`)) return;

    setSendingEmail(true);
    try {
      const res = await fetch(`${API}/api/contracts/${id}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Contract emailed successfully!');
      } else {
        toast.error(data.error ? `${data.message}: ${data.error}` : (data.message || 'Failed to send email.'));
      }
    } catch {
      toast.error('Failed to send email');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleDeleteContract = async () => {
    if (!window.confirm(`Are you sure you want to delete the contract "${formData.title || 'Untitled'}"? This action cannot be undone.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Contract deleted successfully!');
        navigate('/admin/contracts');
      } else {
        toast.error(data.message || 'Failed to delete contract');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!formData.employeeId || !formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields: employee, title, and contract content.');
      return;
    }
    setLoading(true);
    try {
      const sanitized = { ...formData };
      if (!sanitized.validFrom) delete sanitized.validFrom;
      if (!sanitized.validUntil) delete sanitized.validUntil;

      if (sanitized.employeeId === 'custom') {
        sanitized.employeeId = null;
        sanitized.recipientType = 'external';
        sanitized.customRecipient = customRecipient;
      } else {
        sanitized.recipientType = 'employee';
        sanitized.customRecipient = undefined;
      }

      const res = await fetch(`${API}/api/contracts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(sanitized)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Contract updated successfully!');
        setForceEdit(false);
        setOriginalData(sanitized);
        fetchContract();
      } else {
        toast.error(data.error || data.message || 'Failed to update contract');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchUsers();
      fetchTemplates();
      if (isEdit) fetchContract();
    });
  }, [fetchUsers, fetchTemplates, fetchContract, isEdit]);

  useEffect(() => {
    if (!isEditable) {
      setPreview(true);
    } else {
      setPreview(false);
    }
  }, [isEditable]);

  useEffect(() => {
    if (formData.employeeId && formData.employeeId !== 'custom' && users.length > 0) {
      const user = users.find(u => u._id === formData.employeeId);
      if (user) {
        setCustomRecipient(prev => ({
          name: prev.name && prev.name !== 'Jane Doe' ? prev.name : (user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim()),
          jobTitle: prev.jobTitle && prev.jobTitle !== 'Software Engineer' ? prev.jobTitle : (user.jobTitle || ''),
          department: prev.department && prev.department !== 'Engineering' ? prev.department : (user.department || ''),
          email: prev.email && prev.email !== 'jane.doe@example.com' ? prev.email : (user.email || ''),
          city: user.city || '',
          country: user.country || '',
          salary: prev.salary && prev.salary !== '₹50,000 / month' ? prev.salary : (user.salary || ''),
          address: (() => {
            if (prev.address && prev.address !== '123 Tech Park, Bengaluru, India' && prev.address !== '') return prev.address;
            const parts = [
              user.street,
              user.city,
              user.state,
              user.country,
              user.pincode ? `PIN: ${user.pincode}` : ''
            ].filter(Boolean);
            return parts.length > 0 ? parts.join(', ') : '';
          })()
        }));
      }
    }
  }, [users, formData.employeeId]);

  const replacePlaceholders = (contentText, userId, customData = customRecipient, dateOverrides = {}) => {
    if (!contentText) return '';
    let replacements = {};
    const effectiveFrom = dateOverrides.validFrom !== undefined ? dateOverrides.validFrom : formData.validFrom;
    const effectiveUntil = dateOverrides.validUntil !== undefined ? dateOverrides.validUntil : formData.validUntil;
    const startDateStr = effectiveFrom ? new Date(effectiveFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '__________________';
    const endDateStr = effectiveUntil ? new Date(effectiveUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '__________________';

    if (userId === 'custom') {
      replacements = {
        '{{company_logo}}': getLetterheadHTML(),
        '{{employee_name}}': customData.name || 'Custom Recipient',
        '{{position}}': customData.jobTitle || 'Employee',
        '{{department}}': customData.department || 'Engineering',
        '{{company_name}}': 'Contractum Integral Solution Pvt. Limited',
        '{{company_address}}': 'India',
        '{{start_date}}': startDateStr,
        '{{end_date}}': endDateStr,
        '{{salary}}': customData.salary || '₹50,000 / month',
        '{{employee_address}}': customData.address || 'India',
        '{{company_city}}': 'India'
      };
    } else {
      const user = users.find(u => u._id === userId);
      const empName = user ? (user.name || `${user.firstName || ''} ${user.lastName || ''}`).trim() : '';
      replacements = {
        '{{company_logo}}': getLetterheadHTML(),
        '{{employee_name}}': customData.name || empName || '__________________',
        '{{position}}': customData.jobTitle || user?.jobTitle || 'As per appointment',
        '{{department}}': customData.department || user?.department || 'General',
        '{{company_name}}': 'Contractum Integral Solution Pvt. Limited',
        '{{company_address}}': 'India',
        '{{start_date}}': effectiveFrom ? startDateStr : '__________________',
        '{{end_date}}': effectiveUntil ? endDateStr : '__________________',
        '{{salary}}': customData.salary || user?.salary || 'As per offer',
        '{{employee_address}}': customData.address || (() => {
          if (!user) return 'India';
          const parts = [
            user.street,
            user.city,
            user.state,
            user.country,
            user.pincode ? `PIN: ${user.pincode}` : ''
          ].filter(Boolean);
          return parts.length > 0 ? parts.join(', ') : 'India';
        })(),
        '{{company_city}}': 'India'
      };
    }

    let newContent = contentText;
    const alreadyHasLetterhead2 = newContent && newContent.includes('Contractum Integral Solution Pvt. Limited') && newContent.includes('main-logo.jpg');
    if (newContent && !newContent.includes('{{company_logo}}') && !alreadyHasLetterhead2) {
      newContent = '{{company_logo}}' + newContent;
    }
    Object.keys(replacements).forEach(key => {
      newContent = newContent.replace(new RegExp(key, 'g'), replacements[key] || '');
    });
    return newContent;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      let loadedContent = event.target.result;
      if (formData.employeeId) {
        loadedContent = replacePlaceholders(loadedContent, formData.employeeId);
      }
      setFormData(prev => ({ ...prev, content: loadedContent }));
      toast.success('Custom contract file loaded successfully!');
    };
    reader.onerror = () => toast.error('Failed to read file');
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };

  const getRecipientName = (userId, custom = customRecipient) => {
    if (!userId) return '';
    if (userId === 'custom') return custom.name || 'Custom Recipient';
    const user = users.find(u => u._id === userId);
    if (!user) return '';
    const name = (user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim());
    return name || '';
  };

  const generateAutoDescription = (opts = {}) => {
    const tpl = opts.template || templates.find(t => t._id === appliedTemplateId);
    const recipientId = opts.employeeId || formData.employeeId;
    const name = opts.recipientName || getRecipientName(recipientId, opts.customData || customRecipient);
    const contractType = opts.type || formData.type || 'Contract';
    const category = opts.category || formData.category || '';
    const fromDate = opts.validFrom || formData.validFrom;
    const untilDate = opts.validUntil || formData.validUntil;
    const dept = opts.department || (() => {
      if (recipientId === 'custom') return (opts.customData || customRecipient).department;
      const u = users.find(u => u._id === recipientId);
      return u?.department;
    })();
    const position = (() => {
      if (recipientId === 'custom') return (opts.customData || customRecipient).jobTitle;
      const u = users.find(u => u._id === recipientId);
      return u?.jobTitle;
    })();

    const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

    // Build a professional, readable description
    let desc = `${contractType} for ${name || 'the designated recipient'}`;
    if (position) desc += `, ${position}`;
    if (dept) desc += ` in the ${dept} department`;
    desc += '.';

    const from = fmtDate(fromDate);
    const until = fmtDate(untilDate);
    if (from && until) {
      desc += ` Valid from ${from} through ${until}.`;
    } else if (from) {
      desc += ` Commencing ${from}.`;
    }

    if (category) desc += ` Category: ${category}.`;

    return desc;
  };

  const getDefaultClauses = (templateName, templateType) => {
    const isIntern = templateType.includes('Internship') || templateName.includes('Intern');
    const isFreelance = templateType.includes('Freelance') || templateName.includes('Freelance') || templateName.includes('NDA');
    const isVendor = templateType.includes('Vendor') || templateName.includes('Vendor');
    const isConsultant = templateType.includes('Consultant') || templateName.includes('Consulting');
    const isSaaS = templateType.includes('SaaS') || templateName.includes('SaaS');
    const isMOU = templateType.includes('Memorandum') || templateType.includes('MoU') || templateName.includes('MOU');

    let clauses = {};

    if (isIntern) {
      clauses = {
        scopeOfWork: 'The Intern will serve as a {{position}} intern in the {{department}} department, participating in training modules and assisting on real-world projects under the guidance of a designated mentor.',
        paymentTerms: 'The Intern shall receive a monthly stipend of {{salary}}. This stipend is for educational assistance, does not constitute a salary, and does not entitle the Intern to employee benefits.',
        deliverables: 'Weekly learning reports, code contributions, research files, and a final internship project demonstration.',
        timelineMilestones: 'The internship commences on {{start_date}} and ends on {{end_date}}. Work hours are expected to be 6-8 hours per day, Monday through Friday.',
        confidentiality: 'The Intern agrees to keep all company materials, source code, designs, and internal communications strictly confidential during and after the internship.',
        ipRights: 'All intellectual property, code repositories, designs, and documentation developed by the Intern shall belong exclusively to the Company.',
        termination: 'Either party may terminate this internship agreement with 7 days written notice, or immediately for material breaches of conduct.',
        penalty: 'Unprofessional behavior or NDA breaches will result in immediate termination, withholding of the certificate, and potential legal damages.',
        disputeResolution: 'Amicable mediation mediated by the Human Resources department and the internship supervisor.',
        governingLaw: 'Governing laws of India. Courts of Bengaluru shall have exclusive jurisdiction.',
        liability: 'Limited to the extent of academic training boundaries, except in cases of gross negligence or intentional data breaches.',
        forceMajeure: 'Suspension or termination of the internship in the event of natural disasters, government orders, or health emergencies.',
        renewal: 'This internship may be extended by mutual written consent or transitioned into a full-time offer based on performance reviews.'
      };
    } else if (isFreelance || isConsultant) {
      clauses = {
        scopeOfWork: 'The Contractor shall perform professional services as a {{position}} within the {{department}} project group, delivering strategic analysis, software engineering, and advisory services.',
        paymentTerms: 'The Contractor shall be compensated at {{salary}}, payable upon milestone sign-offs or monthly billing logs. Invoices are processed within 15 business days of receipt.',
        deliverables: 'Milestone reports, production-ready software code, system design documents, and weekly status reviews.',
        timelineMilestones: 'The engagement starts on {{start_date}} and concludes on {{end_date}}, unless extended by mutual written agreement.',
        confidentiality: 'Strict NDA. The Contractor shall not disclose or use any Client source code, data, strategies, or proprietary tools for 3 years post-contract.',
        ipRights: 'Upon receipt of final payment, all intellectual property, assets, and source code created under this contract shall be transferred exclusively to the Client.',
        termination: 'Either party may terminate this agreement with 14 days written notice. Completed milestones up to the termination date will be compensated pro-rata.',
        penalty: 'Delays in key deliverables without prior written justification may lead to a penalty of 1% of the milestone value per day of delay.',
        disputeResolution: 'Unresolved disputes shall be referred to sole arbitration under the Arbitration and Conciliation Act, conducted in English.',
        governingLaw: 'Laws of India. Exclusive jurisdiction of courts in Bengaluru, Karnataka.',
        liability: 'Contractor liability is capped at the total fee received in the three months prior to the claim, excluding gross negligence or NDA breaches.',
        forceMajeure: 'Standard force majeure. Delays due to pandemics, strikes, natural disasters, or internet outages shall excuse timely performance.',
        renewal: 'Extended terms and pricing adjustments must be negotiated and executed in writing 30 days prior to contract expiration.'
      };
    } else if (isVendor) {
      clauses = {
        scopeOfWork: 'The Vendor agrees to supply {{position}} services and resource materials to support the {{department}} operations, meeting the standards specified in the SLA.',
        paymentTerms: 'The Company shall pay the Vendor {{salary}} within 30 days of receiving a verified monthly invoice with detailed timesheets/delivery receipts.',
        deliverables: 'Hardware delivery, system hosting services, IT support response logs, and service level achievement sheets.',
        timelineMilestones: 'Effective from {{start_date}} to {{end_date}}. Service response times must adhere to the 24/7 support matrix.',
        confidentiality: 'The Vendor shall protect all company data and client details, maintaining strict data security guidelines in accordance with ISO 27001.',
        ipRights: 'All customized scripts, integrations, and tools developed specifically for the Company shall become the Company\'s exclusive property.',
        termination: 'Either party may terminate with 30 days notice. Immediate termination is permitted for service interruptions exceeding 48 consecutive hours.',
        penalty: 'Failure to meet the 99% uptime SLA will result in service credits calculated at 5% of the monthly fee per 1% of downtime.',
        disputeResolution: 'Escalation to senior executives, followed by formal arbitration if unresolved within 30 days.',
        governingLaw: 'Laws of India, with courts of Mumbai holding exclusive jurisdiction.',
        liability: 'Capped at the total contract value paid over the preceding 6 months.',
        forceMajeure: 'Performance is excused if prevented by war, government regulations, fiber-optic cable cuts, or natural disasters.',
        renewal: 'Automatic annual renewal unless either party provides written notice of non-renewal at least 60 days before expiration.'
      };
    } else if (isSaaS) {
      clauses = {
        scopeOfWork: 'Provider grants Customer a subscription to access and use the SaaS platform for the role of {{position}} in the {{department}} department.',
        paymentTerms: 'Subscription fee of {{salary}} per billing cycle, billed in advance and payable via credit card or bank transfer within 30 days.',
        deliverables: 'Cloud-hosted software access, platform uptime compliance, API integrations, and monthly data backups.',
        timelineMilestones: 'Commencing on {{start_date}} for a subscription period ending on {{end_date}}.',
        confidentiality: 'Customer data remains private. Provider will not access, share, or analyze Customer database except to perform system support.',
        ipRights: 'Provider retains all ownership and intellectual property rights in the SaaS platform. Customer owns all database content entered.',
        termination: 'Customer may cancel subscription at any time. Provider may terminate or suspend access for non-payment exceeding 15 days.',
        penalty: 'Service availability breach below 99.5% entitles the Customer to credit vouchers applied to the next billing statement.',
        disputeResolution: 'Disputes shall be handled through provider-supported online mediation prior to court actions.',
        governingLaw: 'Governing laws of India. Disputes subject to courts in Bengaluru, India.',
        liability: 'Limited to the total amount paid by Customer in the 12 months preceding the incident.',
        forceMajeure: 'Exclusion of provider liability for hosting center power failures, DDoS attacks, or global cloud provider outages.',
        renewal: 'Subscriptions auto-renew at the end of each period at current list pricing unless canceled in writing 30 days prior.'
      };
    } else if (isMOU) {
      clauses = {
        scopeOfWork: 'The Parties intend to collaborate on {{position}} initiatives to enhance {{department}} research and business collaboration.',
        paymentTerms: 'Non-financial MOU. Neither party shall make payments. If specific commercial projects arise, they will be governed by separate agreements.',
        deliverables: 'Joint research proposals, exchange of academic resources, joint workshops, and co-branded project guidelines.',
        timelineMilestones: 'Effective from {{start_date}} for an initial collaboration period through {{end_date}}.',
        confidentiality: 'Information shared for joint evaluation must be kept confidential and cannot be disclosed to third parties without prior written consent.',
        ipRights: 'Background IP remains owned by the contributing party. Foreground IP developed jointly shall be co-owned or negotiated on a project-by-project basis.',
        termination: 'Either party may terminate this MOU at any time by providing 30 days written notice to the other party.',
        penalty: 'No penalties apply. This MOU is a statement of intent and does not create legally binding financial obligations.',
        disputeResolution: 'Mutual negotiation and friendly consultation between the heads of both institutions/organizations.',
        governingLaw: 'Laws of India. Disputes resolved amicably through senior management consultation.',
        liability: 'Neither party shall be liable to the other for any indirect, special, or consequential damages arising under this MOU.',
        forceMajeure: 'Obligations of collaboration are suspended if prevented by regional crises, natural disasters, or national regulations.',
        renewal: 'Subject to mutual evaluation at the end of the term, followed by a signed amendment to extend the duration.'
      };
    } else {
      // Default: Employment Agreement / Offer Letter
      clauses = {
        scopeOfWork: 'The Employee is employed in the capacity of {{position}} in the {{department}} department, executing duties in line with standard job functions and company policy.',
        paymentTerms: 'Gross monthly salary of {{salary}}, subject to statutory tax deductions and paid on or before the last working day of each month.',
        deliverables: 'Standard engineering deliverables, code, project files, and weekly administrative status reports.',
        timelineMilestones: 'Employment commences on {{start_date}} and shall continue indefinitely, subject to successful completion of probation (until {{end_date}} if temporary).',
        confidentiality: 'The Employee shall maintain absolute confidentiality of all company source code, databases, client records, and proprietary plans.',
        ipRights: 'All software, designs, inventions, and research created by the Employee during their employment shall be the sole property of the Company.',
        termination: 'Notice period of 30 days on either side. The Company may terminate employment immediately for gross misconduct, dishonesty, or breach of policy.',
        penalty: 'Policy violations or NDA breaches will lead to disciplinary actions, suspension, or civil claims for financial losses.',
        disputeResolution: 'Amicable consultation with HR, followed by arbitration in Bengaluru in accordance with the Arbitration Act.',
        governingLaw: 'Governing laws of India. Courts of Bengaluru shall have exclusive jurisdiction.',
        liability: 'Employee shall indemnify the company against third-party claims arising from their willful misconduct or fraud.',
        forceMajeure: 'Excuse of performance for both parties during war, natural disasters, epidemics, or government shutdowns.',
        renewal: 'Employment is subject to annual appraisals, performance reviews, and mutual agreement on salary hikes or promotion terms.'
      };
    }

    return clauses;
  };

  const generateProfessionalContract = (category, type) => {
    const categoryColors = {
      'Employment & HR Contracts': { primary: '#1e5cdc', secondary: '#6366f1', bg: '#f8fafc' },
      'Business & Corporate Agreements': { primary: '#0d9488', secondary: '#10b981', bg: '#f0fdfa' },
      'Software & IT Contracts': { primary: '#4f46e5', secondary: '#6366f1', bg: '#f5f3ff' },
      'Marketing & Media Agreements': { primary: '#db2777', secondary: '#ec4899', bg: '#fdf2f8' },
      'Financial & Legal Agreements': { primary: '#d97706', secondary: '#f59e0b', bg: '#fffbeb' },
      'Sales & Client Agreements': { primary: '#0891b2', secondary: '#06b6d4', bg: '#ecfeff' },
      'Real Estate & Infrastructure Agreements': { primary: '#78350f', secondary: '#854d0e', bg: '#fdf8f6' },
      'Educational & Training Agreements': { primary: '#7c3aed', secondary: '#8b5cf6', bg: '#faf5ff' },
      'Project Management & Operations Contracts': { primary: '#374151', secondary: '#4b5563', bg: '#f9fafb' },
      'Intellectual Property Agreements': { primary: '#a21caf', secondary: '#c084fc', bg: '#fdf4ff' }
    };

    const color = categoryColors[category] || { primary: '#1e5cdc', secondary: '#6366f1', bg: '#f8fafc' };

    let html = `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:${color.primary};margin:0;letter-spacing:-0.5px;text-transform:uppercase;">${type}</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, ${color.primary}, ${color.secondary});margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This ${type} ("Agreement") is executed and made effective as of <strong>{{start_date}}</strong>, by and between:</p>

<div style="background-color:${color.bg};border-left:4px solid ${color.primary};padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:${color.primary};text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">First Party:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its registered office at {{company_address}} (hereinafter referred to as the "First Party").</p>
</div>

<div style="background-color:${color.bg};border-left:4px solid ${color.secondary};padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:${color.primary};text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">Second Party:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing/located at {{employee_address}} (hereinafter referred to as the "Second Party").</p>
</div>

<p><strong>WHEREAS</strong>, the First Party desires to engage the Second Party, and the Second Party desires to accept such engagement, under the professional terms and conditions set forth herein.</p>
`;

    if (category === 'Employment & HR Contracts') {
      html += `
<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">1. POSITION AND SCOPE OF DUTIES</h3>
<p>The Employee is hired as a <strong>{{position}}</strong> in the <strong>{{department}}</strong> department. The Employee agrees to perform all assigned administrative, engineering, or operational tasks diligently and comply with all Company policies.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">2. DURATION OF CONTRACT</h3>
<p>This employment starts on <strong>{{start_date}}</strong> and continues indefinitely (or until <strong>{{end_date}}</strong> if a fixed term is specified), subject to satisfactory performance reviews.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">3. COMPENSATION AND BENEFITS</h3>
<p>The Employee shall receive a monthly salary of <strong>{{salary}}</strong>. Payments shall be disbursed on or before the last working day of each calendar month, subject to standard statutory tax deductions (TDS) and provident fund contributions.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">4. WORKING HOURS & DATA CONFIDENTIALITY</h3>
<p>The standard work week is 40 hours. The Employee shall maintain strict confidentiality regarding all proprietary information, software codes, and client databases during and after their employment.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">5. INTELLECTUAL PROPERTY</h3>
<p>All work products, software code, designs, and systems developed by the Employee in the course of employment shall be the sole property of the Company.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">6. TERMINATION</h3>
<p>Either party may terminate this agreement with thirty (30) days written notice, or immediately by the Company in cases of gross misconduct or breach of policy.</p>
`;
    } else if (category === 'Business & Corporate Agreements') {
      html += `
<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">1. SCOPE OF COLLABORATION</h3>
<p>The Parties agree to collaborate on <strong>{{position}}</strong> initiatives supporting the <strong>{{department}}</strong> division. Work must conform to standard quality guidelines.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">2. COMMERCIAL TERMS</h3>
<p>The billing and compensation schedule is agreed at <strong>{{salary}}</strong>. Invoices are payable within thirty (30) days of receipt. Parties are responsible for their own taxes.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">3. DURATION AND TERM</h3>
<p>This collaboration is effective from <strong>{{start_date}}</strong> through <strong>{{end_date}}</strong> and may be renewed by written mutual consent.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">4. CONFIDENTIALITY & DATA SECURITY</h3>
<p>Each party shall protect and maintain the strict confidentiality of all shared business models, source codes, and customer datasets.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">5. RESOLUTION OF DISPUTES</h3>
<p>Any dispute arising under this agreement shall be resolved through friendly executive mediation, failing which it shall be referred to arbitration in {{company_city}}.</p>
`;
    } else if (category === 'Software & IT Contracts') {
      html += `
<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">1. SOFTWARE LICENSE & SERVICES</h3>
<p>Provider grants Customer a subscription license to use the cloud-hosted platform for the role of <strong>{{position}}</strong> within the <strong>{{department}}</strong> division.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">2. FEES AND BILLING CYCLES</h3>
<p>The subscription fee is <strong>{{salary}}</strong> per billing cycle, billed in advance and payable within thirty (30) days of the invoice date.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">3. DEVELOPMENT TIMELINE & DURATION</h3>
<p>Services shall commence on <strong>{{start_date}}</strong> and remain active through <strong>{{end_date}}</strong>, subject to automatic subscription renewal.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">4. DATA SECURITY & OWNERSHIP</h3>
<p>Customer retains sole ownership of all input database content. Provider shall implement security tools to protect data from unauthorized access.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">5. INTELLECTUAL PROPERTY RIGHTS</h3>
<p>Provider retains all intellectual property and proprietary rights in the software platform, tools, source codes, and customized modules.</p>
`;
    } else if (category === 'Marketing & Media Agreements') {
      html += `
<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">1. SERVICES & CREATIVE SCOPE</h3>
<p>The Contractor shall deliver professional marketing and design services in the capacity of a <strong>{{position}}</strong> for the <strong>{{department}}</strong> sector.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">2. RETAINER FEE & EXPENSES</h3>
<p>The Client shall pay the Contractor a monthly retainer fee of <strong>{{salary}}</strong>. Invoices are payable within fifteen (15) days of receipt.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">3. CAMPAIGN SCHEDULE</h3>
<p>This engagement is active from <strong>{{start_date}}</strong> through <strong>{{end_date}}</strong>. Creative assets must be delivered on or before the milestone dates.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">4. INTELLECTUAL PROPERTY</h3>
<p>All customized marketing assets, graphic designs, and video content developed under this agreement shall belong to the Client upon final payment.</p>
`;
    } else if (category === 'Financial & Legal Agreements') {
      html += `
<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">1. DISBURSEMENT OF FUNDS</h3>
<p>The First Party agrees to disburse the investment/loan amount of <strong>{{salary}}</strong> for the operations of the <strong>{{department}}</strong> division, led by <strong>{{position}}</strong>.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">2. REPAYMENT & TERM</h3>
<p>This Agreement is effective from <strong>{{start_date}}</strong> and concludes on <strong>{{end_date}}</strong>. Interest calculations and repayment schedules shall follow the agreed amortization table.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">3. REPRESENTATIONS AND WARRANTIES</h3>
<p>Each party warrants that they hold the full corporate authority to enter into this financial transaction and have complied with all statutory regulations.</p>
`;
    } else {
      html += `
<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #cbd5e1;padding-bottom:6px;margin-top:25px;">1. SCOPE OF SERVICES & DUTIES</h3>
<p>The Second Party agrees to perform services in the capacity of a <strong>{{position}}</strong> supporting the <strong>{{department}}</strong> sector, adhering to all professional standards.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #cbd5e1;padding-bottom:6px;margin-top:25px;">2. FEES AND BILLING SCHEDULE</h3>
<p>The agreed compensation for this contract is <strong>{{salary}}</strong>, billed and processed in accordance with the milestone timelines.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #cbd5e1;padding-bottom:6px;margin-top:25px;">3. TIMELINE AND MILESTONES</h3>
<p>This contract starts on <strong>{{start_date}}</strong> and concludes on <strong>{{end_date}}</strong> unless extended by mutual written agreement.</p>

<h3 style="color:${color.primary};font-size:16px;border-bottom:1px solid #cbd5e1;padding-bottom:6px;margin-top:25px;">4. CONFIDENTIALITY AND INTELLECTUAL PROPERTY</h3>
<p>Both parties agree to protect all shared details as confidential. Any deliverables created specifically under this contract shall belong to the First Party.</p>
`;
    }

    html += `
<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The First Party</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
      <p style="margin:0;font-size:11px;color:#64748b;">The Contractum Pvt. Ltd.</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Second Party</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`;

    return html;
  };

  const generateProfessionalClauses = (category, type) => {
    let clauses = {};

    if (category === 'Employment & HR Contracts') {
      clauses = {
        scopeOfWork: 'The Employee is employed in the capacity of {{position}} in the {{department}} department, executing duties in line with standard job functions and company policy.',
        paymentTerms: 'Gross monthly salary of {{salary}}, subject to statutory tax deductions and paid on or before the last working day of each month.',
        deliverables: 'Standard engineering deliverables, code, project files, and weekly administrative status reports.',
        timelineMilestones: 'Employment commences on {{start_date}} and shall continue indefinitely, subject to successful completion of probation (until {{end_date}} if temporary).',
        confidentiality: 'The Employee shall maintain absolute confidentiality of all company source code, databases, client records, and proprietary plans.',
        ipRights: 'All software, designs, inventions, and research created by the Employee during their employment shall be the sole property of the Company.',
        termination: 'Notice period of 30 days on either side. The Company may terminate employment immediately for gross misconduct, dishonesty, or breach of policy.',
        penalty: 'Policy violations or NDA breaches will lead to disciplinary actions, suspension, or civil claims for financial losses.',
        disputeResolution: 'Amicable consultation with HR, followed by arbitration in Bengaluru in accordance with the Arbitration Act.',
        governingLaw: 'Governing laws of India. Courts of Bengaluru shall have exclusive jurisdiction.',
        liability: 'Employee shall indemnify the company against third-party claims arising from their willful misconduct or fraud.',
        forceMajeure: 'Excuse of performance for both parties during war, natural disasters, epidemics, or government shutdowns.',
        renewal: 'Employment is subject to annual appraisals, performance reviews, and mutual agreement on salary hikes or promotion terms.'
      };
    } else if (category === 'Business & Corporate Agreements') {
      clauses = {
        scopeOfWork: 'The Vendor/Partner agrees to deliver {{position}} services supporting the {{department}} division, meeting the agreed standards.',
        paymentTerms: 'Agreed fee of {{salary}} payable within 30 days of receiving a verified monthly invoice.',
        deliverables: 'Monthly progress sheets, material supplies, SLA compliance reports, and support logs.',
        timelineMilestones: 'Effective from {{start_date}} to {{end_date}}, subject to milestone sign-offs.',
        confidentiality: 'Parties shall protect and maintain the strict confidentiality of all shared business models and customer data.',
        ipRights: 'Custom deliverables created specifically under this contract shall belong to the Company upon final payment.',
        termination: 'Either party may terminate with 30 days written notice, or immediately for material breaches.',
        penalty: 'Delays in key deliverables without prior written justification may lead to a penalty of 1% of the milestone value per day.',
        disputeResolution: 'Escalation to senior executives, followed by formal arbitration if unresolved within 30 days.',
        governingLaw: 'Governing laws of India. Subject to courts in Mumbai.',
        liability: 'Vendor liability is capped at the total fee received in the preceding 6 months.',
        forceMajeure: 'Performance is excused if prevented by war, government regulations, or natural disasters.',
        renewal: 'Negotiations for extension must be initiated at least 60 days before contract expiration.'
      };
    } else if (category === 'Software & IT Contracts') {
      clauses = {
        scopeOfWork: 'Provider grants Customer access to the SaaS platform for the role of {{position}} in the {{department}} division.',
        paymentTerms: 'Subscription fee of {{salary}} per billing cycle, payable within 30 days of the invoice date.',
        deliverables: 'Cloud-hosted access, platform uptime compliance, API integrations, and monthly data backups.',
        timelineMilestones: 'Effective from {{start_date}} through {{end_date}}.',
        confidentiality: 'Provider will maintain standard physical and technical security measures to protect Customer data.',
        ipRights: 'Provider retains all proprietary rights in the software. Customer owns all database content entered.',
        termination: 'Customer may cancel subscription at any time. Provider may suspend access for non-payment exceeding 15 days.',
        penalty: 'SLA availability breach below 99.5% entitles the Customer to billing credit vouchers.',
        disputeResolution: 'Disputes shall be handled through provider-supported online mediation prior to court actions.',
        governingLaw: 'Governing laws of India. Disputes subject to courts in Bengaluru, India.',
        liability: 'Limited to the total amount paid by Customer in the 12 months preceding the incident.',
        forceMajeure: 'Exclusion of provider liability for global cloud outages or internet backbone cuts.',
        renewal: 'Subscriptions auto-renew at the end of each period at current list pricing.'
      };
    } else if (category === 'Marketing & Media Agreements') {
      clauses = {
        scopeOfWork: 'Contractor shall perform professional services as a {{position}} within the {{department}} project group, delivering marketing campaigns and creative designs.',
        paymentTerms: 'Retainer fee of {{salary}} payable monthly within 15 days of invoice receipt.',
        deliverables: 'Social media campaign plans, ad copy, design layouts, and monthly engagement reports.',
        timelineMilestones: 'Effective from {{start_date}} through {{end_date}}.',
        confidentiality: 'Contractor agrees not to disclose client product details or market research insights.',
        ipRights: 'All designs, branding assets, and creatives developed shall belong to the Client upon final payment.',
        termination: 'Either party may terminate this agreement with 14 days written notice.',
        penalty: 'Failure to publish approved campaign assets on schedule may result in a 5% billing reduction.',
        disputeResolution: 'Resolved informally through executive discussion.',
        governingLaw: 'Governing laws of India. Courts of Bengaluru shall have jurisdiction.',
        liability: 'Limited to the total retainer fee paid under this agreement.',
        forceMajeure: 'Standard force majeure. Major platform shutdowns (e.g. Meta, Google) shall excuse timely delivery.',
        renewal: 'Subject to renegotiation and signed amendment 30 days prior to contract end.'
      };
    } else if (category === 'Financial & Legal Agreements') {
      clauses = {
        scopeOfWork: 'Disbursement of the investment/loan principal of {{salary}} to support the operations of the {{department}} division led by {{position}}.',
        paymentTerms: 'Repayment of principal and interest per the amortization schedule.',
        deliverables: 'Financial statements, compliance audit reports, and shareholder dashboard updates.',
        timelineMilestones: 'Effective from {{start_date}} through {{end_date}}.',
        confidentiality: 'Both parties shall keep financial transaction details and board discussions strictly confidential.',
        ipRights: 'First Party retains security interest in designated intellectual property assets until loan discharge.',
        termination: 'Immediate acceleration of loan balance upon event of default.',
        penalty: 'Late payment fee of 2% per month on overdue balances.',
        disputeResolution: 'Sole arbitrator appointed under the Arbitration Act.',
        governingLaw: 'Governing laws of India. Disputes subject to courts in Delhi.',
        liability: 'Borrower is personally liable for representations made in compliance certs.',
        forceMajeure: 'Suspension of late fees during national financial holidays or bank closures.',
        renewal: 'Extensions must be agreed in writing by the Board of Directors.'
      };
    } else {
      clauses = {
        scopeOfWork: 'The Second Party agrees to perform services in the capacity of a {{position}} supporting the {{department}} division.',
        paymentTerms: 'The agreed compensation is {{salary}} payable in accordance with the milestone timelines.',
        deliverables: 'Milestone reports, service updates, and project documents.',
        timelineMilestones: 'Effective from {{start_date}} through {{end_date}}.',
        confidentiality: 'Parties shall protect all shared information and keep proprietary files confidential.',
        ipRights: 'Deliverables created specifically under this contract shall belong to the First Party upon final payment.',
        termination: 'Either party may terminate this agreement with 30 days written notice.',
        penalty: 'Delays in key deliverables may lead to proportional fee adjustments.',
        disputeResolution: 'Escalation to senior management followed by arbitration.',
        governingLaw: 'Governing laws of India. Exclusive jurisdiction of courts in {{company_city}}.',
        liability: 'Capped at the total contract value paid.',
        forceMajeure: 'Excuse of performance for both parties during war, natural disasters, or epidemics.',
        renewal: 'Subject to mutual written consent prior to expiration.'
      };
    }

    return clauses;
  };

  const loadDefaultTemplateForType = (category, type, force = false) => {
    if (formData.content && formData.content !== '<p><br></p>' && formData.content !== '' && !force) {
      toast((t) => (
        <span className="text-xs font-bold text-gray-700">
          Load default template for <b>{type}</b>?
          <button
            onClick={() => {
              toast.dismiss(t.id);
              loadDefaultTemplateForType(category, type, true);
            }}
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors"
          >
            Apply
          </button>
        </span>
      ), { duration: 6000 });
      return;
    }

    const generated = generateProfessionalContract(category, type);
    const generatedClauses = generateProfessionalClauses(category, type);

    const isCustom = formData.employeeId === 'custom';
    const targetRecipient = isCustom ? customRecipient : undefined;
    const populatedContent = replacePlaceholders(generated, formData.employeeId, targetRecipient);
    const populatedClauses = {};
    Object.keys(generatedClauses).forEach(key => {
      populatedClauses[key] = replacePlaceholders(generatedClauses[key], formData.employeeId, targetRecipient);
    });

    const recipientName = getRecipientName(formData.employeeId);
    const autoTitle = recipientName ? `${type} – ${recipientName}` : type;
    const autoDesc = generateAutoDescription({
      type,
      category,
      recipientName
    });

    setFormData(prev => ({
      ...prev,
      content: populatedContent,
      title: autoTitle,
      description: autoDesc,
      clauses: populatedClauses
    }));
    toast.success(`Standard template & clauses loaded for "${type}"`);
  };

  const applyTemplate = (templateId) => {
    const template = templates.find(t => t._id === templateId);
    if (template) {
      setAppliedTemplateId(templateId);
      setRawTemplateContent(template.content);

      const isCustom = formData.employeeId === 'custom';
      const targetRecipient = isCustom ? customRecipient : undefined;
      let populatedContent = template.content;
      if (formData.employeeId) {
        populatedContent = replacePlaceholders(template.content, formData.employeeId, targetRecipient);
      }

      const recipientName = getRecipientName(formData.employeeId);
      const autoTitle = recipientName
        ? `${template.name} – ${recipientName}`
        : template.name;
      const effectiveCategory = template.category || 'Employment & HR Contracts';
      const effectiveType = template.type || 'Employment Agreement';
      const autoDesc = generateAutoDescription({
        template,
        recipientName,
        type: effectiveType,
        category: effectiveCategory
      });

      // Get standard clauses for the template and replace placeholders inside them too!
      const defaultClauses = getDefaultClauses(template.name, effectiveType);
      const populatedClauses = {};
      Object.keys(defaultClauses).forEach(key => {
        populatedClauses[key] = replacePlaceholders(defaultClauses[key], formData.employeeId, targetRecipient);
      });

      setFormData(prev => ({
        ...prev,
        content: populatedContent,
        title: autoTitle,
        description: autoDesc,
        category: effectiveCategory,
        type: effectiveType,
        clauses: populatedClauses
      }));
      setTemplateOpen(false);
      toast.success(`Template "${template.name}" applied with default clauses`);
    }
  };

  const handleCustomFieldChange = (field, val) => {
    const updatedCustom = { ...customRecipient, [field]: val };
    setCustomRecipient(updatedCustom);

    let newContent = formData.content;
    if (rawTemplateContent) {
      newContent = replacePlaceholders(rawTemplateContent, formData.employeeId, updatedCustom);
    } else if (formData.content) {
      newContent = replacePlaceholders(formData.content, formData.employeeId, updatedCustom);
    }

    const updatedClauses = { ...formData.clauses };
    Object.keys(updatedClauses).forEach(key => {
      const clauseText = updatedClauses[key];
      if (clauseText) {
        updatedClauses[key] = replacePlaceholders(clauseText, formData.employeeId, updatedCustom);
      }
    });

    // Auto-update title and description when custom fields change
    const appliedTemplate = templates.find(t => t._id === appliedTemplateId);
    const autoTitle = (field === 'name' && appliedTemplate)
      ? `${appliedTemplate.name} – ${val || 'Custom Recipient'}`
      : undefined;
    const autoDesc = generateAutoDescription({
      template: appliedTemplate,
      recipientName: field === 'name' ? val : undefined,
      department: field === 'department' ? val : updatedCustom.department
    });

    setFormData(prev => ({
      ...prev,
      content: newContent,
      clauses: updatedClauses,
      description: autoDesc,
      ...(autoTitle ? { title: autoTitle } : {})
    }));
  };

  const handleEmployeeChange = (newUserId) => {
    let newContent = formData.content;
    const isCustom = newUserId === 'custom';
    
    let updatedCustom = { ...customRecipient };
    if (!isCustom && newUserId) {
      const user = users.find(u => u._id === newUserId);
      if (user) {
        updatedCustom = {
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          jobTitle: user.jobTitle || '',
          department: user.department || '',
          email: user.email || '',
          city: user.city || '',
          country: user.country || '',
          salary: user.salary || '',
          address: `${user.city || ''}, ${user.country || ''}`.replace(/^, /, '').trim() || ''
        };
        setCustomRecipient(updatedCustom);
      }
    } else if (isCustom) {
      // Reset custom recipient to default demo values
      updatedCustom = {
        name: 'Jane Doe',
        jobTitle: 'Software Engineer',
        department: 'Engineering',
        email: 'jane.doe@example.com',
        city: 'Bengaluru',
        country: 'India',
        salary: '₹50,000 / month',
        address: '123 Tech Park, Bengaluru, India'
      };
      setCustomRecipient(updatedCustom);
    }

    if (rawTemplateContent) {
      newContent = replacePlaceholders(rawTemplateContent, newUserId, updatedCustom);
    } else if (newUserId && formData.content) {
      newContent = replacePlaceholders(formData.content, newUserId, updatedCustom);
    }

    const updatedClauses = { ...formData.clauses };
    Object.keys(updatedClauses).forEach(key => {
      const clauseText = updatedClauses[key];
      if (clauseText) {
        updatedClauses[key] = replacePlaceholders(clauseText, newUserId, updatedCustom);
      }
    });

    // Auto-update title and description with new recipient
    const recipientName = getRecipientName(newUserId, updatedCustom);
    const appliedTemplate = templates.find(t => t._id === appliedTemplateId);
    const autoTitle = appliedTemplate && recipientName
      ? `${appliedTemplate.name} – ${recipientName}`
      : undefined;
    const autoDesc = generateAutoDescription({
      template: appliedTemplate,
      recipientName,
      employeeId: newUserId,
      customData: updatedCustom
    });

    setFormData(prev => ({
      ...prev,
      employeeId: newUserId,
      content: newContent,
      clauses: updatedClauses,
      description: autoDesc,
      ...(autoTitle ? { title: autoTitle } : {})
    }));
  };

  const handleStartDateChange = (dateVal) => {
    setFormData(prev => {
      const updated = { ...prev, validFrom: dateVal };
      const dateOvr = { validFrom: dateVal, validUntil: prev.validUntil };
      let newContent = prev.content;
      if (rawTemplateContent) {
        newContent = replacePlaceholders(rawTemplateContent, prev.employeeId, customRecipient, dateOvr);
      }

      const updatedClauses = { ...prev.clauses };
      Object.keys(updatedClauses).forEach(key => {
        const clauseText = updatedClauses[key];
        if (clauseText) {
          updatedClauses[key] = replacePlaceholders(clauseText, prev.employeeId, customRecipient, dateOvr);
        }
      });

      const autoDesc = generateAutoDescription({ validFrom: dateVal, validUntil: prev.validUntil });
      return { ...updated, content: newContent, clauses: updatedClauses, description: autoDesc };
    });
  };

  const handleEndDateChange = (dateVal) => {
    setFormData(prev => {
      const updated = { ...prev, validUntil: dateVal };
      const dateOvr = { validFrom: prev.validFrom, validUntil: dateVal };
      let newContent = prev.content;
      if (rawTemplateContent) {
        newContent = replacePlaceholders(rawTemplateContent, prev.employeeId, customRecipient, dateOvr);
      }

      const updatedClauses = { ...prev.clauses };
      Object.keys(updatedClauses).forEach(key => {
        const clauseText = updatedClauses[key];
        if (clauseText) {
          updatedClauses[key] = replacePlaceholders(clauseText, prev.employeeId, customRecipient, dateOvr);
        }
      });

      const autoDesc = generateAutoDescription({ validFrom: prev.validFrom, validUntil: dateVal });
      return { ...updated, content: newContent, clauses: updatedClauses, description: autoDesc };
    });
  };

  const handleAutoFill = () => {
    if (!formData.content) {
      toast.error('Template content is empty!');
      return;
    }
    const newContent = replacePlaceholders(formData.content, formData.employeeId);
    setFormData(prev => ({ ...prev, content: newContent }));
    toast.success('Placeholders auto-filled based on selected details!');
  };

  const handleAutoGenerate = () => {
    // 1. Gather employee and company details
    const isCustom = formData.employeeId === 'custom';
    const user = isCustom ? null : users.find(u => u._id === formData.employeeId);
    const empName = isCustom ? customRecipient.name : (user ? (user.name || `${user.firstName || ''} ${user.lastName || ''}`).trim() : '__________________');
    const empEmail = isCustom ? customRecipient.email : (user?.email || '__________________');
    const empTitle = isCustom ? customRecipient.jobTitle : (user?.jobTitle || '__________________');
    const empDept = isCustom ? customRecipient.department : (user?.department || '__________________');
    const validFromStr = formData.validFrom ? new Date(formData.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '__________________';
    const validUntilStr = formData.validUntil ? new Date(formData.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '__________________';

    // 2. Generate clauses HTML
    let clausesHtml = '';
    let sectionNum = 1;
    CLAUSES_CONFIG.forEach(clause => {
      const value = formData.clauses[clause.key]?.trim();
      if (value) {
        clausesHtml += `
          <div style="margin-bottom: 24px; page-break-inside: avoid;">
            <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
              Section ${sectionNum}. ${clause.label}
            </h3>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; text-align: justify; white-space: pre-line;">${value}</p>
          </div>
        `;
        sectionNum++;
      }
    });

    if (!clausesHtml) {
      toast.error('Please fill out at least one clause in the Agreement Clauses tab before generating.');
      return;
    }

    // 3. Compile the full HTML document
    const compiledHtml = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Inter', system-ui, sans-serif; color: #1e293b;">
        <!-- Header Banner -->
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px double #1e5cdc; padding-bottom: 20px;">
          <h1 style="color: #1e5cdc; font-size: 28px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">
            ${formData.title || 'MUTUAL CONTRACT AGREEMENT'}
          </h1>
          <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; tracking: 0.1em; margin: 0;">
            ${formData.category} &bull; ${formData.type}
          </p>
        </div>

        <!-- Agreement Intro Preamble -->
        <div style="margin-bottom: 32px; font-size: 14px; line-height: 1.6; color: #334155;">
          <p style="margin: 0 0 16px 0; text-align: justify;">
            This ${formData.type} (hereinafter referred to as the <strong>"Agreement"</strong>) is entered into and made effective as of <strong>${validFromStr}</strong>, by and between:
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; background: #f8fafc; padding: 16px; rounded: 12px; border: 1px solid #f1f5f9;">
            <div>
              <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">FIRST PARTY (EMPLOYER):</h4>
              <p style="margin: 0; font-size: 13px; color: #475569;">
                <strong>Contractum Integral Solution Pvt. Limited</strong><br />
                Address: India
              </p>
            </div>
            <div>
              <h4 style="margin: 0 0 6px 0; color: #0f172a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">SECOND PARTY (RECIPIENT):</h4>
              <p style="margin: 0; font-size: 13px; color: #475569;">
                <strong>${empName}</strong><br />
                Title: ${empTitle}<br />
                Department: ${empDept}<br />
                Email: ${empEmail}
              </p>
            </div>
          </div>
          <p style="margin: 0; text-align: justify;">
            WHEREAS, the First Party desires to retain the services of the Second Party, and the Second Party agrees to perform such services under the terms and conditions set forth below.
          </p>
        </div>

        <!-- Clauses Container -->
        <div style="margin-bottom: 40px;">
          ${clausesHtml}
        </div>

        <!-- Term & Expiry -->
        <div style="margin-bottom: 40px; background: #f8fafc; padding: 16px; border-left: 4px solid #1e5cdc; font-size: 13px; color: #475569;">
          <strong>AGREEMENT TERM:</strong> This Agreement shall commence on <strong>${validFromStr}</strong> and shall continue in full force and effect until <strong>${validUntilStr}</strong>, unless terminated earlier in accordance with the termination provision herein.
        </div>

        <!-- Signatures Blocks -->
        <div style="margin-top: 60px; font-size: 13px; color: #334155; page-break-inside: avoid;">
          <p style="margin-bottom: 30px; text-align: justify;">
            IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.
          </p>
          <table style="width: 100%; border-collapse: collapse; border: none;">
            <tr>
              <td style="width: 45%; vertical-align: top; border: none; padding: 0;">
                <p style="margin: 0 0 40px 0; font-weight: 700;">For: Contractum Integral Solution Pvt. Limited</p>
                <div style="border-bottom: 1px solid #94a3b8; width: 80%; margin-bottom: 6px;"></div>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Authorized Signatory</p>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Title: Compliance Officer</p>
              </td>
              <td style="width: 10%; border: none;"></td>
              <td style="width: 45%; vertical-align: top; border: none; padding: 0;">
                <p style="margin: 0 0 40px 0; font-weight: 700;">For: ${empName}</p>
                <div style="border-bottom: 1px solid #94a3b8; width: 80%; margin-bottom: 6px;"></div>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Second Party / Recipient Signature</p>
                <p style="margin: 0; font-size: 11px; color: #64748b;">Date: __________________</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    `;

    setFormData(prev => ({ ...prev, content: compiledHtml }));
    setActiveTab('editor'); // Switch back to editor to let them see and review the compiled document
    toast.success('Document compiled from clauses successfully!');
  };

  const handleSubmit = async (submitForApproval = false) => {
    if (!formData.employeeId || !formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields: employee, title, and contract content.');
      return;
    }

    setLoading(true);
    try {
      const sanitized = { ...formData };
      if (!sanitized.validFrom) delete sanitized.validFrom;
      if (!sanitized.validUntil) delete sanitized.validUntil;

      if (sanitized.employeeId === 'custom') {
        sanitized.employeeId = null;
        sanitized.recipientType = 'external';
        sanitized.customRecipient = customRecipient;
      } else {
        sanitized.recipientType = 'employee';
        sanitized.customRecipient = undefined;
      }

      const payload = { ...sanitized, status: submitForApproval ? 'Pending_Manager' : 'Draft' };

      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${API}/api/contracts/${id}` : `${API}/api/contracts`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(submitForApproval ? 'Contract submitted for approval!' : 'Contract saved as draft.');
        const contractId = data._id || id;
        if (contractId) {
          navigate(`/admin/contracts/view/${contractId}`);
          if (isEdit) {
            setForceEdit(false);
            fetchContract();
          }
        } else {
          navigate('/admin/contracts');
        }
      } else {
        toast.error(data.error || data.message || 'Failed to save contract');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
    setLoading(false);
  };

  const selectedUser = users.find(u => u._id === formData.employeeId);
  
  const COMMON_JOB_TITLES = [
    'Employee',
    'Software Engineer',
    'Senior Software Engineer',
    'Lead Developer',
    'Intern',
    'Software Development Intern',
    'Marketing Intern',
    'HR Intern',
    'Operations Intern',
    'Finance Intern',
    'Project Coordinator Intern',
    'HR Manager',
    'HR Executive',
    'Operations Director',
    'Operations Manager',
    'Operations Executive',
    'Project Manager',
    'Project Coordinator',
    'Sales Executive',
    'Marketing Manager',
    'Marketing Specialist',
    'Freelancer',
    'Consultant',
    'Advisor',
    'Partner',
    'Vendor Representative',
    'Customer Support Executive',
    'System Administrator',
    'Legal Counsel',
    'Finance Executive'
  ];

  const uniqueDesignations = [
    'Employee',
    'Intern',
    'Freelancer',
    'Consultant',
    'Advisor',
    'Partner',
    'Vendor'
  ];

  const suggestedJobTitles = [...new Set([
    ...users.map(u => u.jobTitle || 'Employee').filter(Boolean),
    ...COMMON_JOB_TITLES
  ])].sort();

  const filteredUsers = designationFilter 
    ? users.filter(u => {
        const title = (u.jobTitle || 'Employee').toLowerCase();
        const filter = designationFilter.toLowerCase();
        if (filter === 'intern') {
          return title.includes('intern');
        }
        if (filter === 'employee') {
          const otherCore = ['intern', 'freelancer', 'consultant', 'advisor', 'partner', 'vendor'];
          return !otherCore.some(term => title.includes(term));
        }
        return title.includes(filter);
      }) 
    : users;

  return (
    <>
      <AdminLayout>
      {/* ── Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/contracts')}
            className="p-2.5 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isEdit ? 'Edit Contract' : 'Create Contract'}
            </h1>
            <p className="text-gray-500 font-medium text-sm mt-0.5">
              {isEdit ? 'Update existing contract details and content.' : 'Draft a new contract and assign it to a user.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              setPreview(p => !p);
              setIsSplit(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all ${preview ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'}`}
          >
            {preview ? <EyeOff size={16} /> : <Eye size={16} />}
            {preview ? 'Edit Mode' : 'Preview'}
          </button>
          {!preview && (
            <button
              onClick={() => setIsSplit(s => !s)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm border transition-all ${isSplit ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'}`}
            >
              <LayoutTemplate size={16} />
              {isSplit ? 'Single Column' : 'Split Preview'}
            </button>
          )}
          {isEdit && (
            <>
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail || loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all text-sm disabled:opacity-50 shadow-sm"
              >
                {sendingEmail ? <RefreshCw size={16} className="animate-spin" /> : <Mail size={16} />}
                Send Email
              </button>
              <button
                onClick={handleDeleteContract}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all text-sm disabled:opacity-50 shadow-sm"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                Delete Contract
              </button>
            </>
          )}
          {isEdit && !forceEdit && canApproveReject() && (
            <>
              <button
                onClick={handleReject}
                disabled={loading}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/25 disabled:opacity-50"
              >
                <XCircle size={16} /> Reject
              </button>
              <button
                onClick={handleApprove}
                disabled={loading}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
              >
                <CheckCircle size={16} /> Approve
              </button>
            </>
          )}
          {isDraftOrRejected ? (
            <>
              <button
                onClick={() => handleSubmit(false)}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-sm disabled:opacity-50"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                Save Draft
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 text-sm disabled:opacity-50"
              >
                <Send size={16} /> Submit for Approval
              </button>
            </>
          ) : (
            <>
              {!forceEdit ? (
                <button
                  onClick={() => setForceEdit(true)}
                  className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25"
                >
                  <Pencil size={16} /> Edit Contract
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      if (originalData) {
                        setFormData(originalData);
                      }
                      setForceEdit(false);
                      toast.success('Restored previous content');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25 text-sm disabled:opacity-50"
                  >
                    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Changes
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Read-Only Warning Banner */}
      {!isEditable && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <p className="text-sm font-bold">Read-Only Mode</p>
              <p className="text-xs text-blue-600 font-medium">This contract is currently in <strong>{formData.status.replace('_', ' ')}</strong> status and cannot be edited.</p>
            </div>
          </div>
        </div>
      )}

      {/* Editing Mode Banner */}
      {forceEdit && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold">Editing In-Review Contract</p>
              <p className="text-xs text-amber-600 font-medium">You are making changes to a contract that is currently in <strong>{formData.status.replace('_', ' ')}</strong> status.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Editor / Preview ── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-8 py-4 bg-gray-50/70 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-600" />
                <span className="font-bold text-gray-700 text-sm">{preview ? 'Contract Preview' : 'Contract Editor'}</span>
                {formData.category && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${TYPE_BADGE[formData.category]}`}>
                    {formData.type}
                  </span>
                )}
              </div>
              {!preview && (
                <span className="text-[10px] text-gray-400 font-medium">
                  {formData.content.length.toLocaleString()} chars
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/30 px-8">
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-3 px-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'editor' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                Contract Body
              </button>
              <button
                onClick={() => setActiveTab('clauses')}
                className={`py-3 px-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'clauses' ? 'border-[#1e5cdc] text-[#1e5cdc]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                Agreement Clauses ({Object.values(formData.clauses || {}).filter(Boolean).length}/13)
              </button>
            </div>

            {activeTab === 'editor' ? (
              <div className="p-8 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                    Contract Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    disabled={!isEditable}
                    placeholder="e.g. Employment Agreement – John Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-gray-900 text-sm disabled:opacity-60"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Internal Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isEditable}
                    placeholder="Short note for internal reference (not shown in contract)"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm text-gray-700 disabled:opacity-60"
                  />
                </div>

                {/* Content / Preview */}
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex justify-between items-center">
                    <span>
                      Contract Content <span className="text-red-400">*</span>
                      {!preview && <span className="text-blue-400 font-medium normal-case tracking-normal ml-2">(HTML supported)</span>}
                    </span>
                    {!preview && isEditable && (
                      <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-colors">
                        <Upload size={14} /> Upload Custom File
                        <input type="file" accept=".txt,.html" className="hidden" onChange={handleFileUpload} />
                      </label>
                    )}
                  </label>
                  {renderLayoutBar()}
                  {isSplit ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-between">
                          <span>Editor</span>
                          <span>{formData.content.length.toLocaleString()} chars</span>
                        </div>
                        {isEditable && renderEditorToolbar()}
                        {editorMode === 'visual' ? (
                          <div className="w-full bg-slate-100/80 border border-gray-200/60 rounded-2xl p-4 overflow-y-auto h-[650px] shadow-inner flex flex-col items-center">
                            <div className="relative w-full max-w-[794px] mx-auto my-4 transition-transform duration-200 origin-top" style={{ transform: `scale(${zoomScale})` }}>
                              {renderVerticalRuler()}
                              <div className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 rounded-b-lg overflow-hidden relative">
                                {renderHorizontalRuler()}
                                {showMargins && <div className="absolute pointer-events-none inset-0 border border-dashed border-blue-300/30 m-8 sm:m-10 rounded-sm z-10" />}
                                <div
                                  ref={editorRef}
                                  contentEditable={isEditable}
                                  onInput={handleInput}
                                  onBlur={handleInput}
                                  onKeyDown={handleKeyDown}
                                  onKeyUp={saveSelection}
                                  onMouseUp={saveSelection}
                                  onFocus={saveSelection}
                                  className="w-full min-h-[1123px] p-8 sm:p-10 outline-none focus:outline-none transition-all prose prose-sm max-w-none disabled:opacity-75"
                                  style={getPageStyle()}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <textarea
                            ref={textareaRef}
                            rows={24}
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            disabled={!isEditable}
                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-mono text-xs leading-relaxed text-gray-700 resize-none disabled:opacity-70"
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-center">Live Preview</div>
                        <div className="w-full bg-slate-100/80 border border-gray-200/60 rounded-2xl p-4 overflow-y-auto h-[650px] shadow-inner flex flex-col items-center">
                          <div className="relative w-full max-w-[794px] mx-auto my-4 transition-transform duration-200 origin-top" style={{ transform: `scale(${zoomScale})` }}>
                            {renderVerticalRuler()}
                            <div className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 rounded-b-lg overflow-hidden relative">
                              {renderHorizontalRuler()}
                              {showMargins && <div className="absolute pointer-events-none inset-0 border border-dashed border-blue-300/30 m-8 sm:m-10 rounded-sm z-10" />}
                              <div
                                className="w-full min-h-[1123px] p-8 sm:p-10 prose prose-sm max-w-none"
                                style={getPageStyle()}
                                dangerouslySetInnerHTML={{ __html: injectLivePlaceholders(formData.content, selectedUser) || '<p class="text-gray-400 italic">No content to preview.</p>' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : preview ? (
                    <div className="w-full bg-slate-100/80 border border-gray-200/60 rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[750px] shadow-inner flex flex-col items-center">
                      <div className="relative w-full max-w-[794px] mx-auto my-4 transition-transform duration-200 origin-top" style={{ transform: `scale(${zoomScale})` }}>
                        {renderVerticalRuler()}
                        <div className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 rounded-b-lg overflow-hidden relative">
                          {renderHorizontalRuler()}
                          {showMargins && <div className="absolute pointer-events-none inset-0 border border-dashed border-blue-300/30 m-12 sm:m-16 rounded-sm z-10" />}
                          <div
                            className="w-full min-h-[1123px] p-12 sm:p-16 prose prose-sm max-w-none"
                            style={getPageStyle()}
                            dangerouslySetInnerHTML={{ __html: injectLivePlaceholders(formData.content, selectedUser) || '<p class="text-gray-400 italic">No content to preview.</p>' }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {isEditable && renderEditorToolbar()}
                      {editorMode === 'visual' ? (
                        <div className="w-full bg-slate-100/80 border border-gray-200/60 rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[750px] shadow-inner flex flex-col items-center">
                          <div className="relative w-full max-w-[794px] mx-auto my-4 transition-transform duration-200 origin-top" style={{ transform: `scale(${zoomScale})` }}>
                            {renderVerticalRuler()}
                            <div className="w-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 rounded-b-lg overflow-hidden relative">
                              {renderHorizontalRuler()}
                              {showMargins && <div className="absolute pointer-events-none inset-0 border border-dashed border-blue-300/30 m-12 sm:m-16 rounded-sm z-10" />}
                              <div
                                ref={editorRef}
                                contentEditable={isEditable}
                                onInput={handleInput}
                                onBlur={handleInput}
                                onKeyDown={handleKeyDown}
                                onKeyUp={saveSelection}
                                onMouseUp={saveSelection}
                                onFocus={saveSelection}
                                className="w-full min-h-[1123px] p-12 sm:p-16 outline-none focus:outline-none transition-all prose prose-sm max-w-none disabled:opacity-75"
                                style={getPageStyle()}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <textarea
                          ref={textareaRef}
                          rows={22}
                          value={formData.content}
                          onChange={e => setFormData({ ...formData, content: e.target.value })}
                          disabled={!isEditable}
                          placeholder={`Enter the full contract text here.\n\nYou can use HTML tags for formatting:\n  <h2>SECTION TITLE</h2>\n  <p>Paragraph text...</p>\n  <ul><li>List item</li></ul>\n\nAvailable placeholders:\n  {{employee_name}}, {{position}}, {{department}}\n  {{start_date}}, {{end_date}}, {{salary}}\n  {{company_name}}, {{company_address}}`}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-mono text-xs leading-relaxed text-gray-700 resize-none disabled:opacity-70"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                  <div className="pr-4">
                    <h4 className="text-sm font-bold text-blue-900">Custom Clause-Based Generator</h4>
                    <p className="text-xs text-blue-700 mt-0.5">Fill in the clauses below, then click generate to compile a formatted document.</p>
                  </div>
                  {isEditable && (
                    <button
                      onClick={handleAutoGenerate}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-200 shrink-0"
                    >
                      Auto-Generate Document
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {CLAUSES_CONFIG.map(clause => (
                    <div key={clause.key} className="space-y-2">
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">{clause.label}</label>
                      <textarea
                        rows={4}
                        value={formData.clauses[clause.key] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            clauses: {
                              ...prev.clauses,
                              [clause.key]: val
                            }
                          }));
                        }}
                        disabled={!isEditable}
                        placeholder={clause.placeholder}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-xs leading-relaxed text-gray-700 resize-none disabled:opacity-60"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Card Footer Actions */}
            <div className="bg-gray-50/70 border-t border-gray-100 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                {isEditable ? '⚠️ Unsaved Changes will be lost unless saved.' : `ℹ️ Contract status: ${formData.status.replace('_', ' ')}`}
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {isEdit && !forceEdit && canApproveReject() && (
                  <>
                    <button
                      type="button"
                      onClick={handleReject}
                      disabled={loading}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/25 disabled:opacity-50"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                    <button
                      type="button"
                      onClick={handleApprove}
                      disabled={loading}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                  </>
                )}
                {isEdit && (
                  <button
                    type="button"
                    onClick={handleDeleteContract}
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all shadow-sm text-sm disabled:opacity-50"
                  >
                    {loading ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    Delete Contract
                  </button>
                )}
                {isDraftOrRejected ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSubmit(false)}
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-sm disabled:opacity-50"
                    >
                      {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmit(true)}
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 text-sm disabled:opacity-50"
                    >
                      <Send size={16} /> Submit for Approval
                    </button>
                  </>
                ) : (
                  <>
                    {!forceEdit ? (
                      <button
                        type="button"
                        onClick={() => setForceEdit(true)}
                        className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25"
                      >
                        <Pencil size={16} /> Edit Contract
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            if (originalData) {
                              setFormData(originalData);
                            }
                            setForceEdit(false);
                            toast.success('Restored previous content');
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm text-sm"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveEdit}
                          disabled={loading}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/25 text-sm disabled:opacity-50"
                        >
                          {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                          Save Changes
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">
          {/* Template Picker */}
          {isEditable && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5">
              <h3 className="text-sm font-black text-blue-800 mb-3 flex items-center gap-2">
                <LayoutTemplate size={16} /> Apply Template
              </h3>
              <p className="text-xs text-blue-600 mb-3 leading-relaxed">Select a professional template to auto-populate the editor.</p>
              <div className="relative">
                <button
                  onClick={() => setTemplateOpen(o => !o)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm font-bold text-blue-700 hover:border-blue-400 transition-all"
                >
                  <span>Choose a template…</span>
                  <ChevronDown size={16} className={`transition-transform ${templateOpen ? 'rotate-180' : ''}`} />
                </button>
                {templateOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-blue-100 shadow-xl z-10 overflow-hidden max-h-56 overflow-y-auto">
                    {templates.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-gray-400 font-medium">No templates available</div>
                    ) : (
                      templates.map(t => (
                        <button
                          key={t._id}
                          onClick={() => applyTemplate(t._id)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                        >
                          <p className="text-sm font-bold text-gray-900">{t.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{t.type} · {t.description || 'No description'}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Configuration */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <ClipboardList size={16} className="text-blue-600" /> Configuration
            </h3>

            {/* Assign Employee */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Filter by Designation
                </label>
                <select
                  value={designationFilter}
                  onChange={e => {
                    setDesignationFilter(e.target.value);
                    setFormData({ ...formData, employeeId: '' }); // reset selected user when filter changes
                  }}
                  disabled={!isEditable}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
                >
                  <option value="">All Designations</option>
                  {uniqueDesignations.map((desig, idx) => (
                    <option key={idx} value={desig}>{desig}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                  Assign to Recipient <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.employeeId}
                  onChange={e => handleEmployeeChange(e.target.value)}
                  disabled={!isEditable}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
                >
                  <option value="">Select user…</option>
                  <option value="custom" className="text-blue-600 font-bold">✨ Custom / External Recipient</option>
                  {filteredUsers.map(u => (
                    <option key={u._id} value={u._id}>
                      {u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim()} - {(u.jobTitle || 'Employee')} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              {formData.employeeId && (
                <div className="mt-2 p-4 bg-blue-50/30 border border-blue-100/50 rounded-xl space-y-3">
                  <h4 className="text-xs font-black text-blue-800 uppercase tracking-wider">
                    {formData.employeeId === 'custom' ? 'Custom Recipient Details' : 'Recipient Details (Overrides)'}
                  </h4>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customRecipient.name}
                      onChange={e => handleCustomFieldChange('name', e.target.value)}
                      disabled={!isEditable}
                      placeholder="e.g. Jane Smith"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                    <input
                      type="email"
                      value={customRecipient.email}
                      onChange={e => handleCustomFieldChange('email', e.target.value)}
                      disabled={!isEditable}
                      placeholder="e.g. jane.smith@example.com"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 disabled:opacity-60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Job Title</label>
                      <input
                        list="custom-job-titles"
                        type="text"
                        value={customRecipient.jobTitle}
                        onChange={e => handleCustomFieldChange('jobTitle', e.target.value)}
                        disabled={!isEditable}
                        placeholder="e.g. Designer"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 disabled:opacity-60"
                      />
                      <datalist id="custom-job-titles">
                        {suggestedJobTitles.map((desig, idx) => (
                          <option key={idx} value={desig} />
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Department</label>
                      <input
                        list="custom-departments"
                        type="text"
                        value={customRecipient.department}
                        onChange={e => handleCustomFieldChange('department', e.target.value)}
                        disabled={!isEditable}
                        placeholder="e.g. Marketing"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 disabled:opacity-60"
                      />
                      <datalist id="custom-departments">
                        {DEPARTMENTS.map((dept, idx) => (
                          <option key={idx} value={dept} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Compensation / Salary</label>
                    <input
                      type="text"
                      value={customRecipient.salary}
                      onChange={e => handleCustomFieldChange('salary', e.target.value)}
                      disabled={!isEditable}
                      placeholder="e.g. ₹60,000 / month"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Address / Location</label>
                    <input
                      type="text"
                      value={customRecipient.address}
                      onChange={e => handleCustomFieldChange('address', e.target.value)}
                      disabled={!isEditable}
                      placeholder="e.g. Mumbai, India"
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/20 disabled:opacity-60"
                    />
                  </div>
                </div>
              )}

              {selectedUser && (
                <div className="mt-2 flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-[10px] uppercase shrink-0">
                    {selectedUser.firstName?.[0] || selectedUser.name?.[0]}{selectedUser.lastName?.[0] || ''}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-800">{selectedUser.firstName || selectedUser.name} {selectedUser.lastName || ''}</p>
                    <p className="text-[10px] text-blue-500">{selectedUser.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contract Category */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Category *</label>
              <select
                value={formData.category}
                onChange={e => {
                  const newCat = e.target.value;
                  const firstType = CONTRACT_CATEGORIES[newCat]?.[0] || '';
                  setFormData(prev => ({ ...prev, category: newCat, type: firstType }));
                  loadDefaultTemplateForType(newCat, firstType);
                }}
                disabled={!isEditable}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
              >
                {Object.keys(CONTRACT_CATEGORIES).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Contract Type */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Type *</label>
              <select
                value={formData.type}
                onChange={e => {
                  const newType = e.target.value;
                  setFormData(prev => ({ ...prev, type: newType }));
                  loadDefaultTemplateForType(formData.category, newType);
                }}
                disabled={!isEditable}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 disabled:opacity-60"
              >
                {(CONTRACT_CATEGORIES[formData.category] || []).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => loadDefaultTemplateForType(formData.category, formData.type, true)}
                disabled={!isEditable}
                className="w-full mt-3 py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                ✨ Load Professional Template & Clauses
              </button>
            </div>

            {/* Validity Period */}
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                <Calendar size={11} className="inline mr-1" /> Validity Period
              </label>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">From</label>
                  <input
                    type="date"
                    value={formData.validFrom}
                    onChange={e => handleStartDateChange(e.target.value)}
                    disabled={!isEditable}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 mt-1 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Until</label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={e => handleEndDateChange(e.target.value)}
                    disabled={!isEditable}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-gray-700 mt-1 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Approval Workflow Info / Live Timeline */}
          {isEdit && fullContract ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" /> Approval Timeline
              </h3>

              <div className="relative border-l-2 border-gray-100 ml-3 pl-6 space-y-6">
                {/* Step 1: Draft / Creation */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">✓</span>
                  <h4 className="text-xs font-bold text-gray-800">Contract Drafted</h4>
                  <p className="text-[10px] text-gray-400">Created by: {fullContract.createdBy?.name || 'Admin'}</p>
                </div>

                {/* Step 2: Manager Approval */}
                {(() => {
                  const approval = fullContract.approvals?.find(a => a.role === 'Manager');
                  const isCurrent = fullContract.status === 'Pending_Manager';
                  const isDone = approval?.status === 'Approved' || ['Pending_HR', 'Pending_Legal', 'Pending_Final', 'Pending_Signature', 'Active'].includes(fullContract.status);
                  const isRejected = fullContract.status === 'Rejected' && fullContract.approvals?.[fullContract.approvals.length - 1]?.role === 'Manager';

                  return (
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isDone ? 'bg-emerald-500 text-white' : isRejected ? 'bg-red-500 text-white' : isCurrent ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {isDone ? '✓' : isRejected ? '✕' : '2'}
                      </span>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>Manager Approval</h4>
                      {approval && (
                        <p className="text-[10px] text-gray-500 mt-0.5 italic">"{approval.comments || 'No comments'}"</p>
                      )}
                      <p className="text-[9px] text-gray-400">
                        {isDone ? `Approved on ${new Date(approval?.timestamp).toLocaleDateString()}` : isRejected ? 'Rejected' : isCurrent ? 'Awaiting action' : 'Not started'}
                      </p>
                    </div>
                  );
                })()}

                {/* Step 3: HR Approval */}
                {(() => {
                  const approval = fullContract.approvals?.find(a => a.role === 'HR');
                  const isCurrent = fullContract.status === 'Pending_HR';
                  const isDone = approval?.status === 'Approved' || ['Pending_Legal', 'Pending_Final', 'Pending_Signature', 'Active'].includes(fullContract.status);
                  const isRejected = fullContract.status === 'Rejected' && fullContract.approvals?.[fullContract.approvals.length - 1]?.role === 'HR';

                  return (
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isDone ? 'bg-emerald-500 text-white' : isRejected ? 'bg-red-500 text-white' : isCurrent ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {isDone ? '✓' : isRejected ? '✕' : '3'}
                      </span>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>HR Approval</h4>
                      {approval && (
                        <p className="text-[10px] text-gray-500 mt-0.5 italic">"{approval.comments || 'No comments'}"</p>
                      )}
                      <p className="text-[9px] text-gray-400">
                        {isDone ? `Approved on ${new Date(approval?.timestamp).toLocaleDateString()}` : isRejected ? 'Rejected' : isCurrent ? 'Awaiting action' : 'Not started'}
                      </p>
                    </div>
                  );
                })()}

                {/* Step 4: Legal Review */}
                {(() => {
                  const approval = fullContract.approvals?.find(a => a.role === 'Legal');
                  const isCurrent = fullContract.status === 'Pending_Legal';
                  const isDone = approval?.status === 'Approved' || ['Pending_Final', 'Pending_Signature', 'Active'].includes(fullContract.status);
                  const isRejected = fullContract.status === 'Rejected' && fullContract.approvals?.[fullContract.approvals.length - 1]?.role === 'Legal';

                  return (
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isDone ? 'bg-emerald-500 text-white' : isRejected ? 'bg-red-500 text-white' : isCurrent ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {isDone ? '✓' : isRejected ? '✕' : '4'}
                      </span>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>Legal Compliance Audit</h4>
                      {approval && (
                        <p className="text-[10px] text-gray-500 mt-0.5 italic">"{approval.comments || 'No comments'}"</p>
                      )}
                      <p className="text-[9px] text-gray-400">
                        {isDone ? `Approved on ${new Date(approval?.timestamp).toLocaleDateString()}` : isRejected ? 'Rejected' : isCurrent ? 'Awaiting action' : 'Not started'}
                      </p>
                    </div>
                  );
                })()}

                {/* Step 5: Final SuperAdmin Review */}
                {(() => {
                  const approval = fullContract.approvals?.find(a => a.role === 'SuperAdmin');
                  const isCurrent = fullContract.status === 'Pending_Final';
                  const isDone = approval?.status === 'Approved' || ['Pending_Signature', 'Active'].includes(fullContract.status);
                  const isRejected = fullContract.status === 'Rejected' && fullContract.approvals?.[fullContract.approvals.length - 1]?.role === 'SuperAdmin';

                  return (
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isDone ? 'bg-emerald-500 text-white' : isRejected ? 'bg-red-500 text-white' : isCurrent ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {isDone ? '✓' : isRejected ? '✕' : '5'}
                      </span>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>Final Review (Executive)</h4>
                      {approval && (
                        <p className="text-[10px] text-gray-500 mt-0.5 italic">"{approval.comments || 'No comments'}"</p>
                      )}
                      <p className="text-[9px] text-gray-400">
                        {isDone ? `Approved on ${new Date(approval?.timestamp).toLocaleDateString()}` : isRejected ? 'Rejected' : isCurrent ? 'Awaiting action' : 'Not started'}
                      </p>
                    </div>
                  );
                })()}

                {/* Step 6: Signature */}
                {(() => {
                  const isCurrent = fullContract.status === 'Pending_Signature';
                  const isDone = fullContract.status === 'Active' || (fullContract.signature && fullContract.signature.isSigned);

                  return (
                    <div className="relative">
                      <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                        }`}>
                        {isDone ? '✓' : '✍'}
                      </span>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-gray-800'}`}>Employee Signature</h4>
                      {isDone && fullContract.signature && (
                        <div className="text-[9px] text-gray-500 mt-0.5 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                          <p>Signed By: <strong>{fullContract.signature.signatureName}</strong></p>
                          <p>IP: {fullContract.signature.signatureIp || 'N/A'}</p>
                          <p>At: {new Date(fullContract.signature.signedAt).toLocaleString()}</p>
                        </div>
                      )}
                      <p className="text-[9px] text-gray-400">
                        {isDone ? 'Contract active' : isCurrent ? 'Awaiting employee signature' : 'Not started'}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 flex items-start gap-3">
              <Info className="text-amber-500 mt-0.5 shrink-0" size={18} />
              <div>
                <h4 className="font-bold text-amber-900 text-sm mb-1.5">Approval Workflow</h4>
                <div className="space-y-1">
                  {['Manager Review', 'HR Review', 'Legal Review', 'Final Approval', 'Pending Signature'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-[9px] font-black shrink-0">{i + 1}</span>
                      <span className="text-amber-700 text-[11px] font-medium">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-amber-600 text-[10px] mt-2 leading-relaxed">
                  Once submitted, the contract moves through all 5 stages before reaching the employee for signing.
                </p>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-500" /> Helpful Placeholders
              </h4>
              <button
                onClick={handleAutoFill}
                className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-emerald-600 transition-colors"
              >
                Auto-Fill All
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                ['{{employee_name}}', 'Full name of the employee'],
                ['{{position}}', 'Job title / role'],
                ['{{department}}', 'Department'],
                ['{{start_date}}', 'Contract start date'],
                ['{{salary}}', 'Agreed salary / stipend'],
                ['{{company_name}}', 'The Contractum'],
              ].map(([ph, desc]) => (
                <div key={ph} className="flex items-start gap-2">
                  <code className="text-[10px] bg-white border border-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono shrink-0">{ph}</code>
                  <span className="text-[10px] text-emerald-600 leading-tight">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>

      {/* ===== Insert Link Dialog ===== */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center p-4" onClick={() => setShowLinkDialog(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-100" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-black text-gray-900 mb-4 flex items-center gap-2">
              <Link2 size={16} className="text-blue-600" /> Insert Hyperlink
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Display Text <span className="font-normal text-gray-400">(optional — uses URL if empty)</span></label>
                <input type="text" value={linkText} onChange={e => setLinkText(e.target.value)}
                  placeholder="e.g. Click here..."
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">URL <span className="text-red-400">*</span></label>
                <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                  onKeyDown={e => e.key === 'Enter' && handleInsertLink()} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button type="button" onClick={handleInsertLink}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md shadow-blue-200">
                Insert Link
              </button>
              <button type="button" onClick={() => { setShowLinkDialog(false); setLinkUrl('https://'); setLinkText(''); }}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
