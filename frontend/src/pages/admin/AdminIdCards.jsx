import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Trash2, X, CheckCircle, CheckCircle2, Upload, Eye, IdCard as IdCardIcon, Download, Share2, Edit2, Mail, Linkedin, MessageCircle, Loader2, FileSpreadsheet, FileText, Filter, RefreshCw, ShieldCheck } from 'lucide-react';
import * as XLSX from 'xlsx';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toast } from 'react-hot-toast';
// No html2canvas import needed — we draw via Canvas 2D API

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const COLORS = [
  '#1e5cdc', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981',
  '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#f97316',
  '#ef4444', '#f43f5e', '#ec4899', '#d946ef', '#a855f7',
  '#8b5cf6', '#6366f1', '#475569', '#334155', '#18181b'
];

const CATEGORIES = ['Employee', 'Student', 'Intern', 'Consultant', 'Trainer', 'Volunteer', 'Research Associate', 'Project Associate', 'HR', 'Management', 'Guest', 'Vendor', 'Visitor', 'Contractor', 'Others'];

const DEPARTMENTS_BY_CATEGORY = {
  Employee: ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Sales', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration', 'Engineering', 'Product', 'Design', 'Customer Support', 'Legal', 'Procurement', 'Logistics', 'R&D'],
  Student: ['General', 'Computer Science', 'Business', 'Engineering', 'Arts', 'Science'],
  Intern: ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration'],
  Consultant: ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration'],
  Trainer: ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration'],
  Volunteer: ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration'],
  'Research Associate': ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration'],
  'Project Associate': ['General', 'IT', 'Software Development', 'GIS & Remote Sensing', 'Human Resources', 'Finance', 'Marketing', 'Business Development', 'Artificial Intelligence', 'Cyber Security', 'UI/UX Design', 'Operations', 'Administration'],
  HR: ['General', 'Human Resources'],
  Management: ['General', 'Operations', 'Administration', 'Business Development'],
  Guest: ['General', 'Client Visit', 'Meeting'],
  Vendor: ['General', 'IT Services', 'Facility Management', 'Catering', 'Security', 'Transport', 'Maintenance', 'Supply Chain', 'Printing & Stationery', 'Cleaning Services', 'Electrical'],
  Visitor: ['General', 'Client Visit', 'Government', 'Audit', 'Interview', 'Meeting', 'Event', 'Delivery'],
  Contractor: ['General', 'IT', 'Civil', 'Electrical', 'Mechanical', 'Construction', 'Plumbing', 'HVAC', 'Interior Design', 'Landscaping', 'Security Systems'],
  Others: ['General', 'Temporary Staff', 'Freelancer', 'Partner', 'Board Member', 'Advisor', 'Volunteer']
};

const DESIGNATIONS_MAPPING = {
  Employee: {
    IT: ['Software Engineer', 'Senior Software Engineer', 'Lead Engineer', 'Tech Lead', 'System Admin', 'DevOps Engineer', 'Database Administrator', 'IT Support Specialist', 'Network Engineer', 'Security Analyst', 'Architect'],
    'Human Resources': ['HR Manager', 'HR Executive', 'Recruiter', 'Talent Acquisition Specialist', 'HR Operations', 'Senior HR Manager', 'Compensation & Benefits'],
    General: ['Employee', 'Staff Member', 'Office Assistant', 'Support Staff', 'Security Guard', 'Driver', 'Office Boy', 'Peon'],
    'Software Development': ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Lead Developer', 'Technical Architect', 'Software Engineer', 'QA Engineer', 'DevOps Engineer'],
    'GIS & Remote Sensing': ['GIS Analyst', 'GIS Developer', 'Remote Sensing Specialist', 'GIS Specialist', 'Photogrammetrist', 'Surveyor'],
    Finance: ['Accountant', 'Financial Analyst', 'Finance Manager', 'Billing Executive', 'Internal Auditor', 'Tax Consultant'],
    Marketing: ['Marketing Manager', 'Digital Marketing Executive', 'Content Strategist', 'SEO Specialist', 'Social Media Manager', 'Marketing Coordinator', 'Brand Manager'],
    Sales: ['Sales Manager', 'Business Development Executive', 'Account Manager', 'Sales Coordinator', 'Area Sales Manager', 'Sales Executive'],
    'Business Development': ['BD Manager', 'Strategic Partnership Manager', 'Market Researcher', 'Lead Generation Specialist'],
    'Artificial Intelligence': ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'AI Researcher', 'AI Analyst'],
    'Cyber Security': ['Cyber Security Analyst', 'Ethical Hacker', 'Security Engineer', 'Security Consultant', 'Compliance Officer'],
    'UI/UX Design': ['UI/UX Designer', 'Product Designer', 'Interaction Designer', 'Visual Designer', 'UX Researcher'],
    Operations: ['Operations Manager', 'Operations Coordinator', 'Logistics Coordinator', 'Supply Chain Analyst', 'Manager', 'Senior Manager', 'VP', 'Director'],
    Administration: ['Admin Manager', 'Admin Executive', 'Facility Manager', 'Office Coordinator', 'Executive', 'Administrator'],
    Engineering: ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Project Engineer', 'Draftsman', 'Safety Engineer'],
    Product: ['Product Manager', 'Associate Product Manager', 'Product Analyst', 'Product Designer', 'Technical Product Manager'],
    Design: ['Graphic Designer', 'UI/UX Designer', 'Visual Designer', 'Art Director'],
    'Customer Support': ['Support Lead', 'Customer Success Manager', 'Support Executive', 'Help Desk Technician'],
    Legal: ['Legal Counsel', 'Legal Advisor', 'Legal Assistant', 'Compliance Officer', 'Company Secretary'],
    Procurement: ['Procurement Manager', 'Purchase Executive', 'Vendor Manager'],
    Logistics: ['Logistics Manager', 'Warehouse Supervisor', 'Fleet Manager'],
    'R&D': ['Research Scientist', 'Research Associate', 'R&D Manager', 'Lab Technician']
  },
  Student: {
    General: ['Student', 'Scholar', 'Candidate'],
    'Computer Science': ['CS Student', 'B.Tech Student', 'M.Tech Student', 'BCA Student', 'MCA Student'],
    Business: ['BBA Student', 'MBA Student', 'Management Student'],
    Engineering: ['Engineering Student', 'B.E. Student', 'Diploma Student'],
    Arts: ['Arts Student', 'B.A. Student', 'M.A. Student'],
    Science: ['Science Student', 'B.Sc Student', 'M.Sc Student']
  },
  Intern: {
    General: ['Intern', 'Summer Intern', 'Graduate Intern'],
    IT: ['Software Intern', 'IT Support Intern', 'Web Development Intern'],
    'Software Development': ['Software Development Intern', 'Frontend Development Intern', 'Backend Development Intern'],
    'GIS & Remote Sensing': ['GIS Intern', 'Remote Sensing Intern'],
    'Human Resources': ['HR Intern', 'Recruiting Intern'],
    Finance: ['Finance Intern', 'Accounting Intern'],
    Marketing: ['Marketing Intern', 'Digital Marketing Intern'],
    'Business Development': ['BD Intern', 'Sales Strategy Intern'],
    'Artificial Intelligence': ['AI Intern', 'Machine Learning Intern', 'Data Science Intern'],
    'Cyber Security': ['Cyber Security Intern', 'Security Analysis Intern'],
    'UI/UX Design': ['UI/UX Design Intern', 'Graphic Design Intern'],
    Operations: ['Operations Intern', 'Logistics Intern'],
    Administration: ['Admin Intern', 'Office Management Intern']
  },
  Consultant: {
    General: ['Consultant', 'Senior Consultant', 'External Advisor'],
    IT: ['Senior IT Consultant', 'Solutions Architect'],
    'Software Development': ['Technical Consultant', 'Architecture Consultant'],
    'GIS & Remote Sensing': ['GIS Consultant', 'Geospatial Advisor'],
    'Human Resources': ['HR Strategy Consultant', 'Change Management Expert'],
    Finance: ['Financial Advisor', 'Tax Consultant'],
    Marketing: ['Marketing Strategist', 'Brand Consultant'],
    'Business Development': ['Strategy Consultant', 'Business Consultant'],
    'Artificial Intelligence': ['AI Consultant', 'ML Advisor'],
    'Cyber Security': ['Security Consultant', 'Security Auditor'],
    'UI/UX Design': ['Design Consultant', 'Experience Advisor'],
    Operations: ['Operations Consultant', 'Management Consultant'],
    Administration: ['Admin Consultant', 'Compliance Advisor']
  },
  Trainer: {
    General: ['Trainer', 'Instructor', 'Coach'],
    IT: ['Technical Trainer', 'Software Instructor'],
    'Software Development': ['Coding Instructor', 'Web Development Trainer'],
    'GIS & Remote Sensing': ['GIS Trainer', 'RS Instructor'],
    'Human Resources': ['Soft Skills Trainer', 'HR Trainer'],
    'Artificial Intelligence': ['AI Trainer', 'Data Science Instructor'],
    'Cyber Security': ['Security Trainer', 'Ethical Hacking Instructor']
  },
  Volunteer: {
    General: ['Volunteer', 'Event Volunteer', 'Social Worker']
  },
  'Research Associate': {
    General: ['Research Associate', 'Researcher', 'Junior Scientist'],
    'Artificial Intelligence': ['Senior Research Associate', 'AI Researcher'],
    'GIS & Remote Sensing': ['Geospatial Researcher', 'Remote Sensing Associate']
  },
  'Project Associate': {
    General: ['Project Associate', 'Project Assistant'],
    'Software Development': ['Project Associate', 'Technical Coordinator'],
    Operations: ['Project Associate', 'Project Coordinator']
  },
  HR: {
    General: ['HR Specialist', 'HR Support'],
    'Human Resources': ['HR Lead', 'HR Partner', 'HR Advisor']
  },
  Management: {
    General: ['Management Staff', 'Office Manager'],
    Operations: ['Operations Manager', 'Project Manager', 'Team Lead'],
    Administration: ['Admin Manager', 'Management Partner'],
    'Business Development': ['BD Manager', 'Strategic Partner']
  },
  Guest: {
    General: ['Guest', 'Personal Visit'],
    'Client Visit': ['Client Representative', 'Potential Partner'],
    Meeting: ['Meeting Participant', 'Vendor Representative']
  },
  Vendor: {
    General: ['Vendor', 'Service Provider', 'External Partner', 'Supplier'],
    'IT Services': ['System Consultant', 'Network Technician', 'Software Vendor'],
    'Facility Management': ['Facility Supervisor', 'Maintenance Staff'],
    Catering: ['Catering Manager', 'Head Chef', 'Service Staff'],
    Security: ['Security Head', 'Security Guard', 'CCTV Operator'],
    Transport: ['Fleet Supervisor', 'Driver', 'Transport Coordinator'],
    Maintenance: ['Electrician', 'Plumber', 'HVAC Technician', 'Technician'],
    'Supply Chain': ['Supplier Representative', 'Logistics Agent'],
    'Printing & Stationery': ['Printing In-charge', 'Delivery Agent'],
    'Cleaning Services': ['Cleaning Supervisor', 'Housekeeping Staff'],
    Electrical: ['Electrical Contractor', 'Senior Electrician']
  },
  Visitor: {
    General: ['Guest', 'Personal Visit'],
    'Client Visit': ['Client Representative', 'Potential Partner'],
    Government: ['Govt Official', 'Inspector', 'Regulatory Officer'],
    Audit: ['External Auditor', 'Financial Auditor', 'Compliance Auditor'],
    Interview: ['Candidate', 'Interviewee'],
    Meeting: ['Meeting Participant', 'Vendor Representative'],
    Event: ['Guest Speaker', 'Attendee', 'Organizer'],
    Delivery: ['Delivery Person', 'Courier Agent']
  },
  Contractor: {
    General: ['Contractor', 'Sub-Contractor', 'Supervisor'],
    IT: ['IT Contractor', 'Software Consultant'],
    Civil: ['Civil Contractor', 'Site Supervisor', 'Mason'],
    Electrical: ['Electrical Contractor', 'Wireman', 'Electrician'],
    Mechanical: ['Mechanical Contractor', 'Fitter'],
    Construction: ['Site In-charge', 'Contractor'],
    Plumbing: ['Plumbing Contractor', 'Plumber'],
    HVAC: ['AC Technician', 'HVAC Specialist'],
    'Interior Design': ['Interior Designer', 'Decorator'],
    Landscaping: ['Landscape Artist', 'Gardening Lead'],
    'Security Systems': ['CCTV Technician', 'Security Consultant']
  },
  Others: {
    General: ['Temporary Staff', 'Helper', 'Specialist'],
    'Temporary Staff': ['Temporary Executive', 'Assistant'],
    Freelancer: ['Freelance Designer', 'Freelance Developer', 'Freelance Writer'],
    Partner: ['Business Partner', 'Strategic Associate'],
    'Board Member': ['Director', 'Board Representative'],
    Advisor: ['Technical Advisor', 'Legal Advisor', 'Consultant'],
    Volunteer: ['Event Volunteer', 'Social Worker']
  }
};

const DEPARTMENT_COLORS = {
  'IT': '#1e5cdc',
  'Software Development': '#2563eb',
  'GIS & Remote Sensing': '#0891b2',
  'Human Resources': '#9333ea',
  'Finance': '#16a34a',
  'Artificial Intelligence': '#18181b',
  'Marketing': '#ea580c',
  'Business Development': '#d97706',
  'Cyber Security': '#dc2626',
  'UI/UX Design': '#ec4899',
  'Operations': '#4b5563',
  'Administration': '#334155',
  'Engineering': '#0369a1',
  'Product': '#7c3aed',
  'Design': '#db2777',
  'Customer Support': '#059669',
  'Legal': '#475569',
  'Procurement': '#b45309',
  'Logistics': '#3f6212',
  'R&D': '#4338ca',
  'Sales': '#c2410c',
  'General': '#1e5cdc',
  'Client Visit': '#475569',
  'Government': '#1e293b',
  'Audit': '#9f1239',
  'Interview': '#0d9488',
  'Meeting': '#4b5563',
  'Event': '#7c3aed',
  'Delivery': '#d97706',
  'Civil': '#a16207',
  'Electrical': '#eab308',
  'Mechanical': '#334155',
  'Construction': '#854d0e',
  'Plumbing': '#1d4ed8',
  'HVAC': '#0891b2',
  'Interior Design': '#db2777',
  'Landscaping': '#15803d',
  'Security Systems': '#b91c1c'
};

const VALIDITY_MAP = {
  Intern: 6,      // 6 Months
  Employee: 36,   // 3 Years
  Student: 48,    // 4 Years
  Consultant: 12, // 1 Year
  Trainer: 12,    // 1 Year
  Volunteer: 6,
  'Research Associate': 12,
  'Project Associate': 12,
  HR: 36,
  Management: 36,
  Guest: 1,
  Vendor: 12,
  Visitor: 1,
  Contractor: 6,
  Others: 12
};

// Mapping of categories to ID prefixes
const PREFIX_MAP = {
  Intern: 'INT',
  Employee: 'EMP',
  Student: 'STU',
  Consultant: 'CON',
  Trainer: 'TRN',
  Volunteer: 'VOL',
  'Research Associate': 'RA',
  'Project Associate': 'PA',
  HR: 'HR',
  Management: 'MGT',
  Guest: 'GST',
  Vendor: 'VEN',
  Visitor: 'VIS',
  Contractor: 'CON',
  Others: 'OTH'
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// ── Helper: load an image from a src (base64 or URL) ──
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ── Helper: draw a rounded rect ──
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── Core: Generate the ID card image on a Canvas ──
async function generateCardCanvas(data) {
  const W = 700, H = 1120; // 2x for hi-res
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const color = data.cardColor || '#1e5cdc';

  // Background
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 0, 0, W, H, 28);
  ctx.fill();

  // (Watermark removed from here to be drawn at the end for better clarity)

  ctx.save();
  roundRect(ctx, 0, 0, W, H, 28);
  ctx.clip();

  // ── Header gradient ──
  const hdrH = 320;
  const grad = ctx.createLinearGradient(0, 0, W, hdrH);
  grad.addColorStop(0, color);
  grad.addColorStop(1, color + 'dd');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, hdrH);

  // ── Wave curve ──
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0, hdrH - 60);
  ctx.bezierCurveTo(W * 0.25, hdrH - 20, W * 0.5, hdrH + 10, W * 0.75, hdrH - 30);
  ctx.bezierCurveTo(W * 0.9, hdrH - 50, W, hdrH - 10, W, hdrH - 40);
  ctx.lineTo(W, hdrH);
  ctx.lineTo(0, hdrH);
  ctx.closePath();
  ctx.fill();

  // ── Company name ──
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('THE CONTRACTUM', W / 2, 80);

  // ── Profile photo (circular) ──
  const photoR = 110;
  const photoCX = W / 2;
  const photoCY = hdrH - 60;
  ctx.save();
  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoR + 6, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(photoCX, photoCY, photoR, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  if (data.photo) {
    try {
      const img = await loadImage(data.photo);
      ctx.drawImage(img, photoCX - photoR, photoCY - photoR, photoR * 2, photoR * 2);
    } catch {
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(photoCX - photoR, photoCY - photoR, photoR * 2, photoR * 2);
    }
  } else {
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(photoCX - photoR, photoCY - photoR, photoR * 2, photoR * 2);
  }
  ctx.restore();

  // ── Category badge ──
  const badgeY = photoCY + photoR + 30;
  const badgeText = (data.category || 'Employee').toUpperCase();
  ctx.font = 'bold 20px Arial, sans-serif';
  const badgeW = ctx.measureText(badgeText).width + 36;
  roundRect(ctx, W / 2 - badgeW / 2, badgeY - 14, badgeW, 32, 16);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText(badgeText, W / 2, badgeY + 8);

  // ── Name ──
  let curY = badgeY + 60;
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((data.name || '').toUpperCase(), W / 2, curY);

  // ── Designation ──
  curY += 44;
  ctx.fillStyle = color;
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText((data.designation || '').toUpperCase(), W / 2, curY);

  // ── Department ──
  curY += 34;
  ctx.fillStyle = '#6b7280';
  ctx.font = '22px Arial, sans-serif';
  ctx.fillText(data.department || '', W / 2, curY);

  // ── Details table ──
  curY += 50;
  const tableX = 60, tableW = W - 120;
  roundRect(ctx, tableX, curY, tableW, data.bloodGroup ? 180 : 130, 16);
  ctx.fillStyle = '#f9fafb';
  ctx.fill();
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  ctx.stroke();

  const rowH = data.bloodGroup ? 55 : 60;
  let rowY = curY + 38;

  // ID row
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('ID No.', tableX + 20, rowY);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText((data.employeeId || '').toUpperCase(), tableX + tableW - 20, rowY);

  // Divider
  rowY += 12;
  ctx.strokeStyle = '#e5e7eb';
  ctx.beginPath();
  ctx.moveTo(tableX + 16, rowY);
  ctx.lineTo(tableX + tableW - 16, rowY);
  ctx.stroke();

  // Blood group row
  if (data.bloodGroup) {
    rowY += rowH - 12;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText('Blood Group', tableX + 20, rowY);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.fillText(data.bloodGroup, tableX + tableW - 20, rowY);
    rowY += 12;
    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(tableX + 16, rowY);
    ctx.lineTo(tableX + tableW - 16, rowY);
    ctx.stroke();
  }

  // Valid till row
  rowY += rowH - 12;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('Valid Till', tableX + 20, rowY);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 22px Arial, sans-serif';
  const validStr = data.validUntil ? new Date(data.validUntil).toLocaleDateString() : 'N/A';
  ctx.fillText(validStr, tableX + tableW - 20, rowY);

  // ── Watermark Protection (Premium Repeated Pattern) ──
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 4);
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
  ctx.textAlign = 'center';
  for (let i = -4; i < 6; i++) {
    for (let j = -5; j < 12; j++) {
      ctx.fillText('THE CONTRACTUM OFFICIAL', i * 320, j * 120);
    }
  }
  ctx.restore();

  // ── QR Code ──
  try {
    const vUrl = `${window.location.origin}/company/employee-id/${data.employeeId}`;
    const qrData = `EMPLOYEE ID: ${data.employeeId}\nNAME: ${data.name}\nDEPT: ${data.department}\nVERIFY: ${vUrl}`;
    const qrUrl = await QRCode.toDataURL(qrData, { margin: 1, width: 150 });
    const qrImg = await loadImage(qrUrl);
    ctx.drawImage(qrImg, W - 180, H - 280, 150, 150);
  } catch (err) {
    console.error('QR Gen Failed:', err);
  }

  // ── Signatures & Seal ──
  const sigY = H - 180;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1f2937';

  // HR Signature
  ctx.font = 'italic 20px Times, serif';
  ctx.fillText('Authorized HR', 120, sigY);
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40, sigY + 10); ctx.lineTo(200, sigY + 10); ctx.stroke();
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('HR SIGNATURE', 120, sigY + 30);

  // Authorized Signature
  ctx.font = 'italic 20px Times, serif';
  ctx.fillText('Director', W - 120, sigY);
  ctx.beginPath(); ctx.moveTo(W - 200, sigY + 10); ctx.lineTo(W - 40, sigY + 10); ctx.stroke();
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('AUTHORIZED SIGN', W - 120, sigY + 30);

  // Company Seal
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(W / 2, sigY + 10, 50, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = 'bold 10px Arial';
  ctx.fillStyle = '#dc2626';
  ctx.fillText('CONTRACTUM', W / 2, sigY + 5);
  ctx.fillText('OFFICIAL SEAL', W / 2, sigY + 18);
  ctx.font = 'bold 8px Arial, sans-serif';
  ctx.fillText('VERIFIED', W / 2, sigY + 28);

  // ── Footer bar ──
  const footH = 40;
  const footGrad = ctx.createLinearGradient(0, H - footH, W, H - footH);
  footGrad.addColorStop(0, color);
  footGrad.addColorStop(1, color + 'aa');
  ctx.fillStyle = footGrad;
  ctx.fillRect(0, H - footH, W, footH);

  ctx.restore();
  return canvas;
}

export default function AdminIdCards() {
  const { admin } = useAdminAuth();
  const [idCards, setIdCards] = useState([]);
  const [scanLogs, setScanLogs] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const cardRef = useRef(null);

  // Helper to get the admin's display name for "Issued By"
  const getAdminDisplayName = () => {
    if (!admin) return 'The Contractum';
    const name = admin.name || admin.email || 'Admin';
    const role = admin.role === 'super-admin' ? 'Super Admin' : admin.role === 'admin' ? 'Admin' : admin.role || '';
    return role ? `${name} (${role})` : name;
  };

  // Form State
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    category: 'Employee',
    department: '',
    designation: '',
    bloodGroup: '',
    contactNumber: '',
    email: '',
    photo: '', // base64
    validUntil: '',
    cardColor: '#1e5cdc',
    issuedBy: ''
  });

  useEffect(() => {
    fetchIdCards();
  }, []);

  // Auto-set "Issued By" with the logged-in admin's name
  useEffect(() => {
    if (admin && !formData.issuedBy) {
      setFormData(prev => ({ ...prev, issuedBy: getAdminDisplayName() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  const fetchIdCards = async () => {
    setLoading(true);
    try {
      const [cardsRes, logsRes] = await Promise.all([
        fetch(`${API}/api/id-cards`, { headers: { Authorization: `Bearer ${admin?.token}` } }),
        fetch(`${API}/api/id-cards/logs/all`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      ]);

      if (cardsRes.ok) {
        const data = await cardsRes.json();
        setIdCards(Array.isArray(data) ? data : []);
      }
      if (logsRes.ok) {
        const logs = await logsRes.json();
        setScanLogs(Array.isArray(logs) ? logs : []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  };

  // ── Auto-Generate ID Logic ──
  useEffect(() => {
    if (isModalOpen && !editingId && formData.category && formData.department) {
      generateNextId();
    }
  }, [formData.category, formData.department, isModalOpen, editingId, idCards]);

  const generateNextId = () => {
    const prefix = PREFIX_MAP[formData.category] || 'OTH';
    const year = new Date().getFullYear();
    const deptCode = formData.department.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 3);
    const idPrefix = `${prefix}${year}${deptCode}`;

    // Find the highest sequence number for this prefix
    const samePrefixIds = idCards
      .map(c => c.employeeId)
      .filter(id => id.startsWith(idPrefix));

    let nextSeq = 1;
    if (samePrefixIds.length > 0) {
      const sequences = samePrefixIds.map(id => {
        const seqPart = id.replace(idPrefix, '');
        return parseInt(seqPart) || 0;
      });
      nextSeq = Math.max(...sequences) + 1;
    }

    const nextId = `${idPrefix}${nextSeq.toString().padStart(3, '0')}`;
    setFormData(prev => ({ ...prev, employeeId: nextId }));
  };

  // ── Bulk Onboarding Logic ──
  const handleBulkOnboarding = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBulkLoading(true);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet);

        // Tracker to avoid ID collisions during batch
        const tracker = {};
        CATEGORIES.forEach(cat => {
          const prefix = PREFIX_MAP[cat] || 'OTH';
          const year = new Date().getFullYear();
          const existingSeqs = idCards
            .filter(c => c.category === cat && c.employeeId.startsWith(`${prefix}${year}`))
            .map(c => {
              const seqPart = c.employeeId.slice(-3);
              return parseInt(seqPart) || 0;
            });
          tracker[cat] = existingSeqs.length > 0 ? Math.max(...existingSeqs) + 1 : 1;
        });

        const onboardingData = rows.map(row => {
          const cat = row.Category || 'Employee';
          const dept = row.Department || 'IT';
          const prefix = PREFIX_MAP[cat] || 'OTH';
          const year = new Date().getFullYear();
          const deptCode = dept.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 3);
          const idPrefix = `${prefix}${year}${deptCode}`;
          const employeeId = `${idPrefix}${String(tracker[cat]++).padStart(3, '0')}`;

          return {
            employeeId,
            name: row.Name || row.full_name,
            category: cat,
            department: dept,
            designation: row.Designation || 'Staff',
            contactNumber: row.Phone || row.contactNumber || '0000000000',
            email: row.Email || row.email || 'pending@company.com',
            bloodGroup: row['Blood Group'] || row.bloodGroup || 'N/A',
            photo: row.Photo || 'https://via.placeholder.com/150',
            status: 'Generated',
            validUntil: row['Valid Until'] || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
            cardColor: DEPARTMENT_COLORS[dept] || '#1e5cdc'
          };
        });

        const res = await fetch(`${API}/api/id-cards/bulk`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${admin?.token}`
          },
          body: JSON.stringify(onboardingData)
        });

        if (res.ok) {
          toast.success(`Successfully onboarded ${onboardingData.length} employees!`);
          fetchIdCards();
        } else {
          const errData = await res.json();
          toast.error(`Bulk upload failed: ${errData.message}`);
        }
      } catch (err) {
        console.error('Bulk upload error:', err);
        toast.error('Error processing file. Please check format.');
      } finally {
        setBulkLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  // ── Auto Theme & Validity ──
  useEffect(() => {
    if (formData.department && DEPARTMENT_COLORS[formData.department]) {
      setFormData(prev => ({ ...prev, cardColor: DEPARTMENT_COLORS[formData.department] }));
    }
  }, [formData.department]);

  useEffect(() => {
    if (formData.category && VALIDITY_MAP[formData.category]) {
      const months = VALIDITY_MAP[formData.category];
      const date = new Date();
      date.setMonth(date.getMonth() + months);
      setFormData(prev => ({ ...prev, validUntil: date.toISOString().split('T')[0] }));
    }
  }, [formData.category]);

  const filteredCards = idCards.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.employeeId.toLowerCase().includes(search.toLowerCase());

    const issueDate = new Date(c.issueDate || c.createdAt);
    const matchesYear = filterYear ? issueDate.getFullYear().toString() === filterYear : true;
    const matchesMonth = filterMonth ? (issueDate.getMonth() + 1).toString() === filterMonth : true;
    const matchesCategory = filterCategory ? c.category === filterCategory : true;
    const matchesDept = filterDepartment ? c.department === filterDepartment : true;

    return matchesSearch && matchesYear && matchesMonth && matchesCategory && matchesDept;
  });

  const resetFilters = () => {
    setSearch('');
    setFilterYear('');
    setFilterMonth('');
    setFilterCategory('');
    setFilterDepartment('');
  };

  const downloadTemplate = () => {
    const template = [
      {
        'Name': 'John Doe',
        'Category': 'Employee',
        'Department': 'IT',
        'Designation': 'Software Engineer',
        'Email': 'john@example.com',
        'Phone': '1234567890',
        'Blood Group': 'O+'
      }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Bulk_Onboarding_Template.xlsx");
  };

  const exportToExcel = () => {
    const exportData = filteredCards.map(c => ({
      'Employee ID': c.employeeId,
      'Name': c.name,
      'Category': c.category,
      'Department': c.department,
      'Designation': c.designation,
      'Blood Group': c.bloodGroup || 'N/A',
      'Contact': c.contactNumber,
      'Email': c.email,
      'Status': c.status,
      'Valid Until': new Date(c.validUntil).toLocaleDateString(),
      'Generated At': new Date(c.issueDate || c.createdAt).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ID Cards Report");
    XLSX.writeFile(wb, `ID_Cards_Export_${new Date().getFullYear()}.xlsx`);
  };

  const exportToCSV = () => {
    const headers = ['Employee ID', 'Name', 'Category', 'Department', 'Designation', 'Status', 'Valid Until', 'Generated At'];
    const rows = filteredCards.map(c => [
      c.employeeId, c.name, c.category, c.department, c.designation, c.status,
      new Date(c.validUntil).toLocaleDateString(),
      new Date(c.issueDate || c.createdAt).toLocaleString()
    ]);

    let csvContent = headers.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ID_Cards_Export_${new Date().getFullYear()}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("ID Cards Generation Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Records: ${filteredCards.length} | Generated: ${new Date().toLocaleString()}`, 14, 22);

    const tableData = filteredCards.map(c => [
      c.employeeId, c.name, c.category, c.department, c.status, new Date(c.validUntil).toLocaleDateString()
    ]);

    doc.autoTable({
      head: [['ID', 'Name', 'Category', 'Dept', 'Status', 'Valid Till']],
      body: tableData,
      startY: 28,
    });
    doc.save(`ID_Cards_Data_Report_${new Date().getFullYear()}.pdf`);
  };

  const exportCardsAsPDF = async (specificCards = null) => {
    setDownloading(true);
    const cardsToExport = Array.isArray(specificCards) ? specificCards : filteredCards;

    if (cardsToExport.length === 0) {
      toast.success('No cards available to export.');
      setDownloading(false);
      return;
    }

    try {
      const doc = new jsPDF('p', 'mm', [54, 85.6]); // Standard CR80 ID Card size (Portrait)

      for (let i = 0; i < cardsToExport.length; i++) {
        const card = cardsToExport[i];
        if (i > 0) doc.addPage([54, 85.6], 'p');

        const canvas = await generateCardCanvas(card);
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        doc.addImage(imgData, 'JPEG', 0, 0, 54, 85.6);
      }

      doc.save(`Generated_ID_Cards_${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error('Bulk PDF failed:', err);
      toast.error('Failed to generate PDF cards.');
    }
    setDownloading(false);
  };

  const handlePrintCard = async (card) => {
    try {
      const doc = new jsPDF('p', 'mm', [54, 85.6]);
      const canvas = await generateCardCanvas(card);
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      doc.addImage(imgData, 'JPEG', 0, 0, 54, 85.6);
      window.open(doc.output('bloburl'), '_blank');
    } catch (err) {
      console.error('Print failed:', err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      name: '',
      category: 'Employee',
      department: '',
      designation: '',
      bloodGroup: '',
      contactNumber: '',
      email: '',
      photo: '',
      validUntil: '',
      cardColor: '#1e5cdc'
    });
    setImagePreview(null);
    setPreviewMode(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ID card?')) return;
    try {
      const res = await fetch(`${API}/api/id-cards/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        setIdCards(idCards.filter(c => c._id !== id));
        setSelectedIds(selectedIds.filter(sid => sid !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleSelectAll = (filtered) => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(c => c._id));
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected records?`)) return;
    try {
      setLoading(true);
      const deletePromises = selectedIds.map(id =>
        fetch(`${API}/api/id-cards/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${admin?.token}` }
        })
      );
      await Promise.all(deletePromises);
      setIdCards(idCards.filter(c => !selectedIds.includes(c._id)));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (card) => {
    if (!window.confirm(`Renew ID for ${card.name}? This will extend validity based on category.`)) return;
    try {
      setLoading(true);
      const months = VALIDITY_MAP[card.category] || 12;
      const newValidDate = new Date();
      newValidDate.setMonth(newValidDate.getMonth() + months);

      const res = await fetch(`${API}/api/id-cards/${card._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${admin?.token}` },
        body: JSON.stringify({ validUntil: newValidDate.toISOString().split('T')[0] })
      });

      if (res.ok) {
        toast.success(`${card.name}'s ID has been renewed successfully!`);
        fetchIdCards();
      }
    } catch (err) {
      console.error('Renewal failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (e) => {
    if (e) e.preventDefault();
    if (!formData.employeeId || !formData.name || !formData.department || !formData.designation || !formData.validUntil || !formData.photo) {
      toast.error('Please fill all required fields and upload a photo before previewing.');
      return;
    }
    setLoading(true);
    try {
      const canvas = await generateCardCanvas(formData);
      setPreviewImageUrl(canvas.toDataURL('image/png', 1.0));
      setPreviewMode(true);
    } catch (err) {
      console.error('Preview generation failed:', err);
      toast.error('Error generating preview. Please ensure all data is correct.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, status: 'Generated' };

      const url = editingId ? `${API}/api/id-cards/${editingId}` : `${API}/api/id-cards`;
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
        fetchIdCards();
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to process ID Card.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Download: uses pure Canvas 2D ──
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = await generateCardCanvas(formData);
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `ID_Card_${formData.employeeId || 'card'}.png`;
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

  // ── Share: uses pure Canvas 2D ──
  const handleShare = async () => {
    setSharing(true);
    try {
      const canvas = await generateCardCanvas(formData);
      canvas.toBlob(async (blob) => {
        if (!blob) { setSharing(false); return; }
        const file = new File([blob], `${formData.employeeId}-IDCard.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `${formData.name} ID Card`,
              text: `ID Card for ${formData.name} (${formData.employeeId})`,
              files: [file]
            });
          } catch (e) {
            console.warn('Native share cancelled or failed', e);
            fallbackShare(canvas);
          }
        } else {
          fallbackShare(canvas);
        }
        setSharing(false);
      }, 'image/png');
    } catch (err) {
      console.error('Share failed:', err);
      setSharing(false);
    }
  };

  const fallbackShare = (canvas) => {
    // Download the image + copy text
    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `ID_Card_${formData.employeeId || 'card'}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const verifyUrl = `${window.location.origin}/company/employee-id/${formData.employeeId}`;
    const shareText = `Official ID Card for ${formData.name}\nID: ${formData.employeeId}\nRole: ${formData.designation}\nVerify at: ${verifyUrl}`;
    navigator.clipboard.writeText(shareText).catch(() => { });
    toast.success('The ID Card image has been downloaded. Official verification link and details copied to clipboard — paste them in your message!');
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBulkLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        let successCount = 0;
        const prefixCounters = {};

        for (const row of data) {
          try {
            // Map common column names
            const name = row.Name || row.full_name || row.name;
            const category = row.Category || row.category || 'Employee';
            const department = row.Department || row.department;
            const designation = row.Designation || row.designation;
            const email = row.Email || row.email;
            const contactNumber = row.Phone || row.phone || row.contactNumber;
            const bloodGroup = row.BloodGroup || row['Blood Group'] || row.blood_group;

            if (!name || !department) continue;

            // Generate unique ID for this record
            const prefix = PREFIX_MAP[category] || 'OTH';
            const year = new Date().getFullYear();
            const deptCode = department.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 3);
            const idPrefix = `${prefix}${year}${deptCode}`;

            // Track sequence for this specific prefix
            if (!prefixCounters[idPrefix]) {
              const samePrefixIds = idCards.map(c => c.employeeId).filter(id => id.startsWith(idPrefix));
              prefixCounters[idPrefix] = samePrefixIds.length + 1;
            } else {
              prefixCounters[idPrefix]++;
            }

            const employeeId = `${idPrefix}${prefixCounters[idPrefix].toString().padStart(3, '0')}`;

            // Auto Validity
            const months = VALIDITY_MAP[category] || 12;
            const vDate = new Date();
            vDate.setMonth(vDate.getMonth() + months);

            const payload = {
              employeeId, name, category, department, designation, email,
              contactNumber, bloodGroup,
              validUntil: vDate.toISOString().split('T')[0],
              cardColor: DEPARTMENT_COLORS[department] || '#1e5cdc',
              status: 'Generated',
              photo: 'https://via.placeholder.com/150' // Placeholder for bulk
            };

            await fetch(`${API}/api/id-cards`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${admin?.token}` },
              body: JSON.stringify(payload)
            });
            successCount++;
          } catch (err) {
            console.error('Bulk row failed:', err);
          }
        }
        toast.success(`Bulk Upload Complete! ${successCount} cards generated.`);
        fetchIdCards();
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      console.error('Bulk Upload Error:', err);
      toast.error('Failed to process bulk upload.');
    }
    setBulkLoading(false);
  };

  const handleView = async (card) => {
    setFormData({
      employeeId: card.employeeId || '',
      name: card.name || '',
      category: card.category || 'Employee',
      department: card.department || '',
      designation: card.designation || '',
      bloodGroup: card.bloodGroup || '',
      contactNumber: card.contactNumber || '',
      email: card.email || '',
      photo: card.photo || '',
      validUntil: card.validUntil ? new Date(card.validUntil).toISOString().split('T')[0] : '',
      cardColor: card.cardColor || '#1e5cdc'
    });
    setEditingId(card._id);

    // Generate preview image for existing card
    setLoading(true);
    try {
      const dateStr = card.validUntil ? new Date(card.validUntil).toISOString().split('T')[0] : '';
      const canvas = await generateCardCanvas({
        ...card,
        validUntil: dateStr
      });
      setPreviewImageUrl(canvas.toDataURL('image/png', 1.0));
      setPreviewMode(true);
      setSuccess(true);
      setIsModalOpen(true);
    } catch (err) {
      console.error('View generation failed:', err);
      toast.error('Unable to load card preview. Please check if the record is valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">ID Card Management</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">Generate and manage identity cards</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search ID/Name..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-48 bg-white transition-all shadow-sm"
            />
          </div>
          <input type="file" id="bulk-upload" className="hidden" accept=".xlsx, .xls, .csv" onChange={handleBulkUpload} />
          <div className="flex gap-2">
            <button onClick={downloadTemplate} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors" title="Download Bulk Template">
              <Download size={18} />
            </button>
            <label htmlFor="bulk-upload" className={`flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer shrink-0 ${bulkLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              {bulkLoading ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />} Bulk Onboarding
            </label>
          </div>
          <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="flex items-center justify-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0">
            <Plus size={16} /> Generate New ID
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Generated</div>
          <div className="text-3xl font-black text-gray-800">{idCards.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Active Cards</div>
          <div className="text-3xl font-black text-emerald-600">
            {idCards.filter(c => new Date(c.validUntil) > new Date()).length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Expiring Soon (30d)</div>
          <div className="text-3xl font-black text-orange-500">
            {idCards.filter(c => {
              const diff = new Date(c.validUntil) - new Date();
              return diff > 0 && diff < (30 * 24 * 60 * 60 * 1000);
            }).length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Expired Cards</div>
          <div className="text-3xl font-black text-red-500">
            {idCards.filter(c => new Date(c.validUntil) <= new Date()).length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm col-span-1 sm:col-span-2 lg:col-span-4 xl:col-span-1">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Reports & Export</div>
          <div className="flex gap-2 mt-1">
            <button onClick={exportToExcel} className="p-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors" title="Export Excel Report"><FileSpreadsheet size={18} /></button>
            <button onClick={exportToCSV} className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors" title="Export CSV Report"><Filter size={18} /></button>
            <button onClick={exportToPDF} className="p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors" title="Download Data Table PDF"><FileText size={18} /></button>
            <button onClick={exportCardsAsPDF} disabled={downloading} className={`ml-auto p-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors ${downloading ? 'opacity-50' : ''}`} title="Download All Card Images as PDF">
              {downloading ? <Loader2 size={18} className="animate-spin" /> : <IdCardIcon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Verification Activity Section */}
      {scanLogs.length > 0 && (
        <div className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> Recent Verification Logs
            </h3>
            <div className="flex items-center gap-3">
              <button onClick={fetchIdCards} className="p-1.5 text-gray-400 hover:text-[#1e5cdc] transition-colors" title="Refresh Logs"><Loader2 size={14} className={loading ? 'animate-spin' : ''} /></button>
              <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100 uppercase tracking-tighter">Live Audit</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID No.</th>
                  <th className="text-left px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {scanLogs.slice(0, 5).map(log => (
                  <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 text-xs font-medium text-gray-500">{new Date(log.scannedAt).toLocaleString()}</td>
                    <td className="px-6 py-3 text-xs font-bold text-gray-800 uppercase">{log.employeeName}</td>
                    <td className="px-6 py-3 text-xs font-mono font-bold text-blue-600">{log.employeeId}</td>
                    <td className="px-6 py-3 text-xs font-medium text-gray-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            {[...new Set(idCards.map(c => new Date(c.issueDate || c.createdAt).getFullYear()))].sort((a, b) => b - a).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            className="px-3 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white transition-all shadow-sm"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {[...new Set(idCards.map(c => c.department))].filter(Boolean).sort().map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {(filterYear || filterMonth || filterCategory || filterDepartment || search) && (
            <button onClick={resetFilters} className="text-red-500 hover:text-red-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 px-2">
              <X size={14} /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-[#1e5cdc] text-white px-6 py-4 rounded-2xl mb-6 flex items-center justify-between shadow-lg shadow-blue-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <span className="font-bold">{selectedIds.length} Records Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCardsAsPDF(idCards.filter(c => selectedIds.includes(c._id)))}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
            >
              <Download size={16} /> Export Selected
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} /> Delete Selected
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-3 py-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredCards.length && filteredCards.length > 0}
                    onChange={() => toggleSelectAll(filteredCards)}
                    className="w-4 h-4 rounded border-gray-300 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                  />
                </th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Employee ID</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Name</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm hidden lg:table-cell">Category</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm hidden sm:table-cell">Issue Date</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Valid Till</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm hidden sm:table-cell">Status</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm hidden lg:table-cell">Issued By</th>
                <th className="text-right text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="9" className="text-center py-8 text-gray-500">Loading data...</td></tr>
              ) : filteredCards.length === 0 ? (
                <tr><td colSpan="9" className="text-center py-8 text-gray-500">No ID Cards generated yet.</td></tr>
              ) : (
                filteredCards.map(c => (
                  <tr key={c._id} className={`hover:bg-gray-50/80 transition-colors ${selectedIds.includes(c._id) ? 'bg-blue-50/50' : ''}`}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(c._id)}
                        onChange={() => toggleSelect(c._id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1e5cdc] focus:ring-[#1e5cdc]"
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono font-medium text-gray-700 text-xs sm:text-sm">{c.employeeId}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={c.photo} alt={c.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-200 shrink-0" />
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm hidden lg:table-cell">{c.category}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                      {new Date(c.issueDate || c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">
                      <div className={`font-bold ${new Date(c.validUntil) < new Date() ? 'text-red-500' : 'text-gray-700'}`}>
                        {new Date(c.validUntil).toLocaleDateString()}
                      </div>
                      {new Date(c.validUntil) < new Date() && (
                        <div className="text-[10px] text-red-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                          <X size={10} /> Expired
                        </div>
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                      <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap ${c.status === 'Generated' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell">
                      <span className="text-xs font-bold text-gray-600">{c.issuedBy || 'The Contractum'}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                        <button onClick={() => handleRenew(c)} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors" title="Renew Validity"><RefreshCw size={16} className="sm:w-5 sm:h-5" /></button>
                        <button onClick={() => window.open(`mailto:${c.email}?subject=Your Official ID Card - The Contractum&body=Hello ${c.name},%0D%0A%0D%0AYour official ID card (${c.employeeId}) has been generated. You can verify it here: ${window.location.origin}/company/employee-id/${c.employeeId}%0D%0A%0D%0ARegards,%0D%0AThe Contractum Team`)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Send to Employee Email"><Mail size={16} className="sm:w-5 sm:h-5" /></button>
                        <button onClick={() => window.open(`/company/employee-id/${c.employeeId}`, '_blank')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Live Verification Link"><Share2 size={16} className="sm:w-5 sm:h-5" /></button>
                        <button onClick={() => handleView(c)} className="p-1.5 text-[#1e5cdc] hover:bg-blue-50 rounded-md transition-colors" title="View & Download Card"><Eye size={16} className="sm:w-5 sm:h-5" /></button>
                        <button onClick={() => handleDelete(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Record"><Trash2 size={16} className="sm:w-5 sm:h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh] animate-in fade-in zoom-in duration-200">

            {/* Form Section */}
            {!previewMode ? (
              <div className="flex-1 flex flex-col overflow-y-auto max-h-[calc(100vh-2rem)]">
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Generate ID Card</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handlePreview} className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Employee ID *</label>
                      <input readOnly type="text" value={formData.employeeId} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none bg-gray-50 uppercase font-mono text-gray-500 cursor-not-allowed" placeholder="Generating..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                      <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value, department: '', designation: '' })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Department *</label>
                      <select required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value, designation: '' })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white">
                        <option value="">Select Department</option>
                        {(DEPARTMENTS_BY_CATEGORY[formData.category] || []).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Designation *</label>
                      <select
                        required
                        value={formData.designation}
                        onChange={e => setFormData({ ...formData, designation: e.target.value })}
                        className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white ${!formData.department ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!formData.department}
                      >
                        <option value="">{formData.department ? 'Select Designation' : 'Select Department First'}</option>
                        {(DESIGNATIONS_MAPPING[formData.category]?.[formData.department] || []).map(des => (
                          <option key={des} value={des}>{des}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Group</label>
                      <select value={formData.bloodGroup} onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] bg-white">
                        <option value="">Select Blood Group</option>
                        {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number *</label>
                      <input required type="text" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="+1 234 567 890" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="john@company.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Valid Until *</label>
                      <input required type="date" value={formData.validUntil} onChange={e => setFormData({ ...formData, validUntil: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Issued By</label>
                      <input type="text" value={formData.issuedBy} onChange={e => setFormData({ ...formData, issuedBy: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e5cdc]" placeholder="The Contractum" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Card Theme Color</label>
                    <div className="flex flex-wrap gap-2 p-1">
                      {COLORS.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setFormData({ ...formData, cardColor: color })}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${formData.cardColor === color ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Photo Upload *</label>
                    <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload size={24} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="id-photo-upload"
                          required={!formData.photo}
                        />
                        <label htmlFor="id-photo-upload" className="cursor-pointer bg-blue-50 text-[#1e5cdc] px-4 py-2.5 sm:py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors block sm:inline-block text-center w-full sm:w-auto">
                          Upload Face Photo
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 mt-4 border-t border-gray-100 pb-6">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-all shadow-sm inline-flex items-center gap-2">
                      <IdCardIcon size={16} /> Preview Card
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 border-l border-gray-100 p-4 sm:p-8 overflow-y-auto max-h-[calc(100vh-2rem)] relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all p-2 bg-white rounded-full shadow-sm border border-gray-100 z-50">
                  <X size={20} />
                </button>

                {success ? (
                  /* ── SUCCESS STATE ── */
                  <div className="flex flex-col items-center justify-center text-center w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-100">
                      <CheckCircle size={52} className="text-emerald-500" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">ID Card Generated!</h3>
                    <p className="text-gray-500 text-sm mb-8">The record has been stored successfully.<br />You can now download or share the ID card.</p>

                    {/* Generated card thumbnail (Hybrid Preview) */}
                    <div className="w-[280px] h-[448px] bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between border border-gray-200 mb-8 transition-all duration-500">
                      {previewImageUrl ? (
                        <img src={previewImageUrl} alt="ID Card Final" className="w-full h-full object-contain animate-in fade-in duration-500" />
                      ) : (
                        /* Classic Fallback Mockup */
                        <div className="w-full h-full flex flex-col justify-between opacity-90 scale-95 transition-all duration-300">
                          <div className="h-[94px] relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${formData.cardColor}, ${formData.cardColor}dd)` }}>
                            <div className="absolute inset-0 opacity-10 bg-white/10"></div>
                            <div className="absolute top-4 text-white font-black text-[0.8rem] tracking-wider uppercase z-10 w-full text-center px-2 leading-tight drop-shadow-md">The Contractum</div>
                            <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 320" style={{ transform: "rotateY(180deg) rotateZ(180deg)" }}>
                              <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                          </div>
                          <div className="flex flex-col items-center -mt-12 z-20">
                            <img src={formData.photo || 'https://via.placeholder.com/150'} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                            <span className="mt-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white rounded-full" style={{ backgroundColor: formData.cardColor }}>{formData.category}</span>
                          </div>
                          <div className="flex-1 flex flex-col items-center pt-1 px-4 text-center">
                            <h1 className="text-sm font-bold text-gray-900 leading-tight uppercase">{formData.name}</h1>
                            <p className="font-semibold text-[10px] mt-0.5 uppercase tracking-wide" style={{ color: formData.cardColor }}>{formData.designation}</p>
                            <p className="text-gray-500 text-[9px] font-medium">{formData.department}</p>
                            <div className="w-full mt-2 flex flex-col gap-0.5 text-[9px] text-left bg-gray-50 p-2 rounded-lg border border-gray-100">
                              <div className="flex justify-between border-b border-gray-200 pb-0.5"><span className="text-gray-500 font-semibold">ID No.</span><span className="font-bold text-gray-800">{formData.employeeId.toUpperCase()}</span></div>
                              {formData.bloodGroup && <div className="flex justify-between border-b border-gray-200 py-0.5"><span className="text-gray-500 font-semibold">Blood</span><span className="font-bold text-red-600">{formData.bloodGroup}</span></div>}
                              <div className="flex justify-between pt-0.5"><span className="text-gray-500 font-semibold">Valid</span><span className="font-bold text-gray-800">{formData.validUntil ? new Date(formData.validUntil).toLocaleDateString() : ''}</span></div>
                            </div>
                          </div>
                          <div className="h-4 mt-auto" style={{ background: `linear-gradient(to right, ${formData.cardColor}, ${formData.cardColor}aa)` }}></div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 w-full print:hidden">
                      <div className="flex gap-3 w-full">
                        <button onClick={handleDownload} disabled={downloading} className={`flex-1 py-3 text-sm font-bold text-white bg-gray-900 rounded-xl hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2 ${downloading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                          {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} Download
                        </button>
                        <button onClick={() => handlePrintCard(formData)} className="flex-1 py-3 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                          <FileText size={18} /> Print
                        </button>
                      </div>

                      <div className="flex gap-3 w-full">
                        <button onClick={handleShare} disabled={sharing} className={`flex-1 py-3 text-sm font-bold text-white bg-[#1e5cdc] rounded-xl hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 ${sharing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                          {sharing ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />} Share
                        </button>
                        <button onClick={() => window.open(`/company/employee-id/${formData.employeeId}`, '_blank')} className="flex-1 py-3 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors shadow-sm flex items-center justify-center gap-2">
                          <Eye size={18} /> Verify Link
                        </button>
                      </div>

                      <div className="flex gap-3 w-full">
                        <button onClick={() => { setSuccess(false); setPreviewMode(false); }} className="flex-1 py-3 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 border border-emerald-100">
                          <Edit2 size={18} /> Edit Details
                        </button>
                        <button onClick={() => { setIsModalOpen(false); resetForm(); setSuccess(false); }} className="flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200 flex items-center justify-center gap-2">
                          <X size={16} /> Close
                        </button>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Share</p>
                        <div className="flex justify-center gap-4">
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`ID Card for ${formData.name}\nID: ${formData.employeeId}\nDesignation: ${formData.designation}\nDownload it here: ${window.location.origin}`)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            title="Share on WhatsApp"
                          >
                            <MessageCircle size={20} />
                          </a>
                          <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${encodeURIComponent(`Generated ID Card for ${formData.name}`)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            title="Share on LinkedIn"
                          >
                            <Linkedin size={20} />
                          </a>
                          <a
                            href={`mailto:?subject=ID Card Generated - ${formData.name}&body=The ID card for ${formData.name} (${formData.employeeId}) has been generated.`}
                            className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            title="Share via Email"
                          >
                            <Mail size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── PREVIEW STATE ── */
                  <div className="flex flex-col items-center w-full max-w-sm mt-4">
                    <h3 className="text-lg text-gray-500 font-medium mb-6 uppercase tracking-widest flex items-center gap-2">
                      <IdCardIcon /> Card Preview
                    </h3>

                    {/* THE ID CARD DESIGN (Hybrid Preview) */}
                    <div className="w-[300px] h-[480px] bg-white rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between border border-gray-200 mb-2 transition-all duration-500">
                      {previewImageUrl ? (
                        <img src={previewImageUrl} alt="ID Card Preview" className="w-full h-full object-contain animate-in fade-in duration-500" />
                      ) : (
                        /* Classic Fallback Mockup */
                        <div className="w-full h-full flex flex-col justify-between transition-all duration-300">
                          <div className="h-32 relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${formData.cardColor}, ${formData.cardColor}dd)` }}>
                            <div className="absolute inset-0 opacity-10 bg-white/10"></div>
                            <div className="absolute top-6 text-white font-black text-[1.1rem] tracking-wider uppercase z-10 w-full text-center px-4 leading-tight drop-shadow-md">
                              The Contractum
                            </div>
                            {/* Wave SVG overlay maybe */}
                            <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 320" style={{ transform: "rotateY(180deg) rotateZ(180deg)" }}>
                              <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                          </div>

                          {/* Photo & Category */}
                          <div className="flex flex-col items-center -mt-16 z-20">
                            <img src={formData.photo || 'https://via.placeholder.com/150'} alt="Profile" className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                            <span className="mt-2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full" style={{ backgroundColor: formData.cardColor }}>
                              {formData.category}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col items-center pt-2 px-6 text-center">
                            <h1 className="text-xl font-bold text-gray-900 leading-tight uppercase">{formData.name}</h1>
                            <p className="font-semibold text-sm mt-0.5 uppercase tracking-wide" style={{ color: formData.cardColor }}>{formData.designation}</p>
                            <p className="text-gray-500 text-xs font-medium">{formData.department}</p>
                            <div className="w-full mt-4 flex flex-col gap-1 text-xs text-left bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <div className="flex justify-between border-b border-gray-200 pb-1">
                                <span className="text-gray-500 font-semibold">ID No.</span>
                                <span className="font-bold text-gray-800">{formData.employeeId.toUpperCase()}</span>
                              </div>
                              {formData.bloodGroup && (
                                <div className="flex justify-between border-b border-gray-200 py-1">
                                  <span className="text-gray-500 font-semibold">Blood Group</span>
                                  <span className="font-bold text-red-600">{formData.bloodGroup}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-1">
                                <span className="text-gray-500 font-semibold">Valid Till</span>
                                <span className="font-bold text-gray-800">{formData.validUntil ? new Date(formData.validUntil).toLocaleDateString() : ''}</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer Bar */}
                          <div className="h-6 mt-auto" style={{ background: `linear-gradient(to right, ${formData.cardColor}, ${formData.cardColor}aa)` }}></div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-8 mb-4 w-full print:hidden">
                      <button onClick={() => setPreviewMode(false)} className="flex-1 py-3 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        Edit Details
                      </button>
                      <button onClick={handleSubmit} className="flex-1 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2">
                        <CheckCircle size={18} /> Confirm & Generate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
