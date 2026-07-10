import { useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutTemplate, Plus, Search, Pencil, Trash2, Eye, X, Save,
  CheckCircle, RefreshCw, Tag, AlignLeft, ArrowLeft, Upload,
  Bold, Italic, List, Table, Underline, AlignCenter, AlignRight,
  AlignJustify, ListOrdered, Code
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CONTRACT_CATEGORIES } from '../../utils/contractConstants';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
    <div style="text-align:right;color:#1a408c;font-size:10.5px;line-height:1.4;font-family:sans-serif;padding-right:1.5px;">
      <h2 style="margin:0;font-size:14px;font-weight:800;color:#1a408c;text-transform:uppercase;letter-spacing:0.5px;">Contractum Integral Solution Pvt. Limited</h2>
      <p style="margin:2px 0 0 0;color:#1a408c;">Head office: Plot No.169, Ground Floor, Ganesh Nagar, Kota Rajasthan</p>
      <p style="margin:1px 0 0 0;color:#1a408c;">Pin: 324005, Phone: +91-9216654754</p>
      <p style="margin:1px 0 0 0;color:#1a408c;">Email address: jitendra@thecontractum.com</p>
      <p style="margin:1px 0 0 0;color:#1a408c;">Website: www.thecontractum.com</p>
      <p style="margin:1px 0 0 0;font-weight:bold;color:#1a408c;">CIN: U72900RJ2017PTC057530</p>
    </div>
  </div>
</div>`;

const TYPE_COLORS = {
  Employee:   'bg-blue-100 text-blue-700 border-blue-200',
  Intern:     'bg-purple-100 text-purple-700 border-purple-200',
  Freelancer: 'bg-amber-100 text-amber-700 border-amber-200',
  Vendor:     'bg-teal-100 text-teal-700 border-teal-200',
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

const GRADIENTS = {
  'Employment & HR Contracts': 'from-blue-500 to-indigo-500',
  'Business & Corporate Agreements': 'from-purple-500 to-violet-500',
  'Software & IT Contracts': 'from-amber-400 to-orange-500',
  'Marketing & Media Agreements': 'from-teal-400 to-cyan-500',
  'Financial & Legal Agreements': 'from-rose-500 to-red-500',
  'Sales & Client Agreements': 'from-indigo-500 to-pink-500',
  'Real Estate & Infrastructure Agreements': 'from-emerald-500 to-teal-500',
  'Educational & Training Agreements': 'from-cyan-500 to-blue-500',
  'Project Management & Operations Contracts': 'from-violet-500 to-purple-500',
  'Intellectual Property Agreements': 'from-sky-500 to-cyan-500'
};

const EMPTY = { name: '', description: '', category: 'Employment & HR Contracts', type: 'Employment Agreement', content: '', isActive: true };

export default function AdminContractTemplates() {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [modal, setModal] = useState(null);   // null | 'create' | 'edit' | 'preview'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  
  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'code'
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const [savedRange, setSavedRange] = useState(null);
  const lastUpdatedContentRef = useRef('');

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;
    lastUpdatedContentRef.current = html;
    setForm(prev => ({ ...prev, content: html }));
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
      setForm(prev => ({ ...prev, content: updatedHtml }));
    }
  };

  const handleHeading = (tag) => {
    document.execCommand('formatBlock', false, `<${tag}>`);
    if (editorRef.current) {
      const updatedHtml = editorRef.current.innerHTML;
      lastUpdatedContentRef.current = updatedHtml;
      setForm(prev => ({ ...prev, content: updatedHtml }));
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
    setForm(prev => ({ ...prev, content: updatedHtml }));
  };

  const insertPlaceholderVal = (val) => {
    if (editorMode === 'visual') {
      insertHtmlAtCursor(val);
    } else {
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const replacement = val;
        const newContent = text.substring(0, start) + replacement + text.substring(end);
        setForm(prev => ({ ...prev, content: newContent }));
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + val.length, start + val.length);
        }, 0);
      } else {
        setForm(prev => ({ ...prev, content: (prev.content || '') + val }));
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      if (form.content === lastUpdatedContentRef.current) {
        return;
      }
      editorRef.current.innerHTML = form.content || '';
      lastUpdatedContentRef.current = form.content || '';
    }
  }, [form.content]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = form.content || '';
      lastUpdatedContentRef.current = form.content || '';
    }
  }, [editorMode, modal]);

  const subRole = (admin?.adminSubRole || '').toLowerCase().trim();
  const isLegalOrSuper = subRole.includes('legal') || subRole.includes('compliance') || admin?.role === 'super-admin';

  const token = localStorage.getItem('adminToken') || admin?.token;

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts/templates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setTemplates(data);
    } catch { toast.error('Failed to load templates'); }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchTemplates();
    });
  }, [fetchTemplates]);

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setForm(prev => ({ ...prev, content: event.target.result }));
      toast.success('Template file loaded successfully!');
    };
    reader.onerror = () => toast.error('Failed to read file');
    reader.readAsText(file);
    e.target.value = null; // Reset input
  };
  const openEdit = (t) => { setSelected(t); setForm({ name: t.name, description: t.description || '', category: t.category || 'Employment & HR Contracts', type: t.type || 'Employment Agreement', content: t.content, isActive: t.isActive }); setModal('edit'); };
  const openPreview = (t) => { setSelected(t); setModal('preview'); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.content.trim()) {
      toast.error('Template name and content are required');
      return;
    }
    setSaving(true);
    try {
      const method = modal === 'edit' ? 'PUT' : 'POST';
      const url = modal === 'edit'
        ? `${API}/api/contracts/templates/${selected._id}`
        : `${API}/api/contracts/templates`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(modal === 'edit' ? 'Template updated!' : 'Template created!');
        setModal(null);
        fetchTemplates();
      } else {
        toast.error(data.error || data.message || 'Save failed');
      }
    } catch { toast.error('An error occurred'); }
    setSaving(false);
  };

  const handleDelete = async (t) => {
    if (!window.confirm(`Delete template "${t.name}"?`)) return;
    setDeleting(t._id);
    try {
      const res = await fetch(`${API}/api/contracts/templates/${t._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { toast.success('Template deleted'); fetchTemplates(); }
      else { const d = await res.json(); toast.error(d.message || 'Delete failed'); }
    } catch { toast.error('Delete failed'); }
    setDeleting(null);
  };

  const filtered = templates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || (t.category || 'Employment & HR Contracts') === typeFilter;
    return matchSearch && matchType;
  });

  const FormPanel = () => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
          <h2 className="text-xl font-black text-gray-900">
            {modal === 'edit' ? 'Edit Template' : 'New Contract Template'}
          </h2>
          <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-3">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Template Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Standard Employment Contract"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category *</label>
              <select
                value={form.category}
                onChange={e => {
                  const newCategory = e.target.value;
                  const firstType = CONTRACT_CATEGORIES[newCategory]?.[0] || '';
                  setForm({ ...form, category: newCategory, type: firstType });
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-700"
              >
                {Object.keys(CONTRACT_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Contract Type *</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-700"
              >
                {(CONTRACT_CATEGORIES[form.category] || []).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Status</label>
              <select
                value={form.isActive ? 'Active' : 'Inactive'}
                onChange={e => setForm({ ...form, isActive: e.target.value === 'Active' })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-gray-700"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of this template's purpose"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm text-gray-700"
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest flex justify-between items-center">
                <span>Template Content * <span className="text-blue-500 font-medium normal-case tracking-normal ml-1">(HTML supported)</span></span>
                <label className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[11px] font-bold hover:bg-blue-100 transition-colors">
                  <Upload size={14} /> Upload HTML/TXT
                  <input type="file" accept=".txt,.html" className="hidden" onChange={handleFileUpload} />
                </label>
              </label>
              
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-gray-50 border border-gray-200/60 rounded-xl mb-2">
                <div className="flex flex-wrap items-center gap-1">
                  {editorMode === 'visual' ? (
                    <>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('bold')} title="Bold" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><Bold size={14} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('italic')} title="Italic" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><Italic size={14} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('underline')} title="Underline" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><Underline size={14} /></button>
                      <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleHeading('h1')} className="px-2 py-1 text-xs font-bold hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">H1</button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleHeading('h2')} className="px-2 py-1 text-xs font-bold hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">H2</button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleHeading('p')} className="px-2 py-1 text-xs font-bold hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">P</button>
                      <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('insertUnorderedList')} title="Bullet List" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><List size={14} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('insertOrderedList')} title="Numbered List" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><ListOrdered size={14} /></button>
                      <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('justifyLeft')} title="Align Left" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><AlignLeft size={14} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('justifyCenter')} title="Align Center" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><AlignCenter size={14} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('justifyRight')} title="Align Right" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><AlignRight size={14} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleFormat('justifyFull')} title="Justify" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><AlignJustify size={14} /></button>
                      <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => {
                        const tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 16px 0; border: 1px solid #cbd5e1;"><thead><tr style="background: #f8fafc;"><th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-weight: bold;">Header 1</th><th style="border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-weight: bold;">Header 2</th></tr></thead><tbody><tr><td style="border: 1px solid #cbd5e1; padding: 8px;">Cell 1</td><td style="border: 1px solid #cbd5e1; padding: 8px;">Cell 2</td></tr><tr><td style="border: 1px solid #cbd5e1; padding: 8px;">Cell 3</td><td style="border: 1px solid #cbd5e1; padding: 8px;">Cell 4</td></tr></tbody></table>`;
                        insertHtmlAtCursor(tableHtml);
                      }} title="Insert Table" className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><Table size={14} /></button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => {
                        const textarea = textareaRef.current;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const replacement = '<strong>' + text.substring(start, end) + '</strong>';
                          setForm(prev => ({ ...prev, content: text.substring(0, start) + replacement + text.substring(end) }));
                        }
                      }} className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><Bold size={14} /></button>
                      <button type="button" onClick={() => {
                        const textarea = textareaRef.current;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const replacement = '<em>' + text.substring(start, end) + '</em>';
                          setForm(prev => ({ ...prev, content: text.substring(0, start) + replacement + text.substring(end) }));
                        }
                      }} className="p-1.5 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"><Italic size={14} /></button>
                      <button type="button" onClick={() => {
                        const textarea = textareaRef.current;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const replacement = '<h1>' + text.substring(start, end) + '</h1>';
                          setForm(prev => ({ ...prev, content: text.substring(0, start) + replacement + text.substring(end) }));
                        }
                      }} className="px-2 py-1 text-xs font-bold hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">H1</button>
                      <button type="button" onClick={() => {
                        const textarea = textareaRef.current;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const text = textarea.value;
                          const replacement = '<h2>' + text.substring(start, end) + '</h2>';
                          setForm(prev => ({ ...prev, content: text.substring(0, start) + replacement + text.substring(end) }));
                        }
                      }} className="px-2 py-1 text-xs font-bold hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">H2</button>
                    </>
                  )}
                  
                  <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                  <select onChange={(e) => { if (e.target.value) { insertPlaceholderVal(e.target.value); e.target.value = ''; } }} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none">
                    <option value="">{`{ } Insert Variable`}</option>
                    <option value="{{employee_name}}">Employee Name</option>
                    <option value="{{position}}">Job Title / Position</option>
                    <option value="{{department}}">Department</option>
                    <option value="{{salary}}">Salary / Stipend</option>
                    <option value="{{start_date}}">Start Date</option>
                    <option value="{{end_date}}">End Date</option>
                    <option value="{{company_name}}">Company Name</option>
                    <option value="{{company_address}}">Company Address</option>
                  </select>
                </div>
                
                <div className="flex items-center bg-gray-200/60 p-0.5 rounded-lg border border-gray-300/20">
                  <button
                    type="button"
                    onClick={() => setEditorMode('visual')}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded transition-all ${editorMode === 'visual' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('code')}
                    className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded transition-all ${editorMode === 'code' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Code
                  </button>
                </div>
              </div>

              {editorMode === 'visual' ? (
                <div className="relative border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                  <div
                    ref={editorRef}
                    contentEditable={true}
                    onInput={handleInput}
                    onBlur={handleInput}
                    onKeyUp={saveSelection}
                    onMouseUp={saveSelection}
                    onFocus={saveSelection}
                    className="w-full h-[400px] overflow-y-auto p-12 bg-white outline-none prose prose-sm max-w-none focus:ring-2 focus:ring-blue-500/20 transition-all overflow-x-hidden"
                    style={{ fontFamily: 'Georgia, serif', lineHeight: 1.8, color: '#1e293b' }}
                  />
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  rows={16}
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  placeholder="Enter the contract body here. You can use HTML tags and placeholders like {{employee_name}}, {{start_date}}, {{position}}, etc."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-mono text-xs leading-relaxed text-gray-700 resize-none"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
          <button onClick={() => setModal(null)} className="px-6 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-200 text-sm disabled:opacity-50"
          >
            {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving…' : 'Save Template'}
          </button>
        </div>
      </div>
    </div>
  );

  const PreviewPanel = () => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-black text-gray-900">{selected?.name}</h2>
            <span className={`mt-1 inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${TYPE_COLORS[selected?.category || 'Employment & HR Contracts']}`}>
              {selected?.type}
            </span>
          </div>
          <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
            dangerouslySetInnerHTML={{ __html: (selected?.content || '<p>No content.</p>').replace(/\{\{company_logo\}\}/g, getLetterheadHTML()).replace(/padding-right:\s*\d+px/g, 'padding-right:1.5px') }}
          />
        </div>
        <div className="flex justify-end gap-3 px-8 py-5 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl shrink-0">
          <button onClick={() => setModal(null)} className="px-6 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all text-sm">Close</button>
          {isLegalOrSuper && (
            <button onClick={() => openEdit(selected)} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[#1e5cdc] text-white hover:bg-blue-700 transition-all text-sm">
              <Pencil size={15} /> Edit Template
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {(modal === 'create' || modal === 'edit') && FormPanel()}
      {modal === 'preview' && selected && PreviewPanel()}

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/contracts')}
            title="Back to Contracts"
            className="p-2.5 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <span className="p-2 bg-indigo-100 rounded-xl text-indigo-600"><LayoutTemplate size={24} /></span>
              Contract Templates
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Manage reusable contract templates with professional content for all types.
            </p>
          </div>
        </div>
        {isLegalOrSuper && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/25 self-start sm:self-auto"
          >
            <Plus size={17} /> New Template
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Categories</option>
            {Object.keys(CONTRACT_CATEGORIES).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button onClick={fetchTemplates} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-100 bg-white text-gray-500 hover:bg-gray-50 shrink-0">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Template Grid */}
      {loading ? (
        <div className="py-24 flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-blue-500" size={32} />
          <p className="text-gray-400 font-medium">Loading templates…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-24 flex flex-col items-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
            <LayoutTemplate size={28} />
          </div>
          <p className="text-gray-600 font-bold">No templates found</p>
          {isLegalOrSuper && (
            <button onClick={openCreate} className="flex items-center gap-2 bg-[#1e5cdc] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all">
              <Plus size={16} /> Create First Template
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(t => (
            <div key={t._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col overflow-hidden">
              {/* Card top accent */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${GRADIENTS[t.category || 'Employment & HR Contracts'] || 'from-gray-500 to-slate-500'}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-[#1e5cdc] transition-colors">{t.name}</h3>
                    <p className="text-[9px] font-black text-gray-400 mt-1 uppercase tracking-wider">{t.category || 'Employment & HR Contracts'}</p>
                    {t.description && <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{t.description}</p>}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0 ${TYPE_COLORS[t.category || 'Employment & HR Contracts']}`}>
                    {t.type}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><AlignLeft size={11} /> {Math.round((t.content || '').length / 100) * 100}+ chars</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle size={11} className={t.isActive ? 'text-emerald-500' : 'text-gray-400'} />
                    {t.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Tag size={11} />
                    {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => openPreview(t)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all text-xs font-bold border border-gray-100 hover:border-blue-100"
                  >
                    <Eye size={13} /> Preview
                  </button>
                  {isLegalOrSuper && (
                    <>
                      <button
                        onClick={() => openEdit(t)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-all text-xs font-bold border border-gray-100 hover:border-indigo-100"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t)}
                        disabled={deleting === t._id}
                        className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all border border-gray-100 hover:border-red-100 disabled:opacity-40"
                      >
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {!loading && (
        <p className="mt-6 text-center text-xs text-gray-400 font-medium">
          {filtered.length} template{filtered.length !== 1 ? 's' : ''} · {templates.filter(t => t.isActive).length} active
        </p>
      )}
    </AdminLayout>
  );
}
