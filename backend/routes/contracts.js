const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const ContractTemplate = require('../models/ContractTemplate');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { adminOnly, checkSubRole } = require('../middleware/admin');

function getContractRoleCategory(user) {
  if (!user) return '';
  if (user.role === 'super-admin') return 'SuperAdmin';
  const subRole = (user.adminSubRole || '').toLowerCase().trim();
  if (subRole.includes('hr') || subRole.startsWith('hr ')) return 'HR';
  if (subRole.includes('legal') || subRole.includes('compliance')) return 'Legal';
  if (subRole.includes('manager') || user.role === 'manager') return 'Manager';
  return '';
}

// ---------- Templates ----------

const PROFESSIONAL_TEMPLATES = [
  {
    name: 'Standard Employment Contract',
    type: 'Employment Agreement',
    category: 'Employment & HR Contracts',
    description: 'Comprehensive full-time employment agreement covering duties, probation, intellectual property, confidentiality, and dispute resolution.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#1e5cdc;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Contract of Employment</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #1e5cdc, #6366f1);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Contract of Employment ("Agreement") is executed and made effective as of <strong>{{start_date}}</strong>, by and between:</p>

<div style="background-color:#f8fafc;border-left:4px solid #1e5cdc;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#0f172a;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">First Party (Employer):</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, a company incorporated under the laws of India, having its principal place of business at {{company_address}} (hereinafter referred to as the "Company").</p>
</div>

<div style="background-color:#f8fafc;border-left:4px solid #6366f1;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#0f172a;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">Second Party (Employee):</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the "Employee").</p>
</div>

<p><strong>WHEREAS</strong>, the Company wishes to employ the Employee, and the Employee wishes to accept employment with the Company, under the professional terms and conditions set forth herein.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">1. APPOINTMENT AND SCOPE OF DUTIES</h3>
<p>The Employee is hereby appointed in the capacity of <strong>{{position}}</strong> within the <strong>{{department}}</strong> department. The Employee's duties shall encompass all responsibilities associated with the role, including but not limited to project delivery, software implementation, administrative oversight, and any additional tasks assigned by the reporting manager. The Employee agrees to perform all duties faithfully, with diligence and to the best of their professional ability.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">2. COMMENCEMENT AND DURATION</h3>
<p>This employment arrangement shall commence on <strong>{{start_date}}</strong>. The first six (6) months of employment shall be considered a probationary period. Upon successful completion of probation, the Company will confirm the employment in writing, following which the contract shall continue indefinitely until terminated by either party in accordance with Section 7.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">3. COMPENSATION AND BENEFITS</h3>
<p>In consideration of the services rendered, the Employee shall receive a gross monthly salary of <strong>{{salary}}</strong>. Payments shall be disbursed on or before the last working day of each calendar month, subject to standard statutory tax deductions (TDS) and provident fund contributions. The Employee shall also be eligible for medical insurance benefits and annual performance reviews as per Company policy.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">4. HOURS OF WORK AND LEAVES</h3>
<p>The standard work week is 40 hours, scheduled from Monday through Friday, 9:00 AM to 6:00 PM. The Employee is entitled to 18 days of paid annual leaves, plus sick and casual leaves as outlined in the HR Manual. All annual leave requests must be submitted and pre-approved by the department manager.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">5. CONFIDENTIALITY AND NON-DISCLOSURE</h3>
<p>The Employee acknowledges that they will have access to proprietary trade secrets, software designs, client lists, business methodologies, and confidential datasets. The Employee agrees to maintain strict confidentiality during and indefinitely after their employment. Disclosure of any proprietary information to third parties without prior written consent from the Company's Board is strictly prohibited and constitutes a breach of contract.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">6. INTELLECTUAL PROPERTY</h3>
<p>The Employee agrees that all intellectual property rights, including software codes, database designs, patents, trademarks, and documentation developed, written, or created by the Employee during the course of employment shall be the sole and exclusive property of the Company from the moment of creation.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">7. TERMINATION AND NOTICE PERIOD</h3>
<p>During the probation period, either party may terminate this agreement with fifteen (15) days written notice. Post-confirmation, either party may terminate employment with thirty (30) days written notice or payment of base salary in lieu thereof. The Company reserves the absolute right to terminate this contract immediately and without severance pay in cases of gross misconduct, dishonesty, fraud, or violation of the NDA.</p>

<h3 style="color:#1e5cdc;font-size:16px;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-top:25px;">8. GOVERNING LAW AND JURISDICTION</h3>
<p>This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this contract shall be submitted to the exclusive jurisdiction of the competent courts in {{company_city}}.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For Contractum Integral Solution Pvt. Limited</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Title: Compliance Officer</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Employee Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Internship Agreement',
    type: 'Internship Agreement',
    category: 'Employment & HR Contracts',
    description: 'Educational internship terms covering duration, stipend, learning objectives, intellectual property, and non-disclosure obligations.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#7c3aed;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Internship Agreement</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #7c3aed, #a78bfa);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Internship Agreement ("Agreement") is made and entered into on <strong>{{start_date}}</strong>, by and between:</p>

<div style="background-color:#fcfaff;border-left:4px solid #7c3aed;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#5b21b6;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its principal place of business at {{company_address}} (hereinafter referred to as the "Company").</p>
</div>

<div style="background-color:#fcfaff;border-left:4px solid #a78bfa;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#5b21b6;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Intern:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the "Intern").</p>
</div>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">1. INTERNSHIP ROLE & SCOPE</h3>
<p>The Intern is appointed as a <strong>{{position}}</strong> intern in the <strong>{{department}}</strong> department. The primary focus of the internship is professional training, skill development, and assisting on real-world projects under the guidance of a designated Company mentor. The Intern agrees to adhere to the Company's operational guidelines, code of conduct, and work schedules.</p>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">2. DURATION OF INTERNSHIP</h3>
<p>This Agreement shall commence on <strong>{{start_date}}</strong> and shall conclude on <strong>{{end_date}}</strong>, spanning the designated learning duration. This internship represents a temporary learning arrangement and does not guarantee or imply any future offer of permanent employment with the Company.</p>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">3. Stipend</h3>
<p>The Company shall pay the Intern a monthly stipend of <strong>{{salary}}</strong>. This stipend is intended to support the Intern's educational expenses and does not constitute a regular employment salary. The Intern is not eligible for Company benefits, leaves, bonuses, or statutory insurance plans applicable to full-time employees.</p>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">4. CONFIDENTIALITY AND NON-DISCLOSURE</h3>
<p>The Intern will be exposed to proprietary databases, source codes, methodologies, and internal strategies. The Intern agrees to keep all such information strictly confidential and shall not reproduce, share, or store company data outside of the Company's authorized platforms.</p>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">5. INTELLECTUAL PROPERTY</h3>
<p>All software codes, designs, presentations, documentation, or other assets created by the Intern during the internship shall belong exclusively to the Company from the moment of inception.</p>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">6. TERMINATION</h3>
<p>Either party may terminate this internship agreement with seven (7) days written notice. The Company reserves the right to terminate the internship immediately without notice or stipend in lieu in the event of any professional misconduct, breach of NDA, or violation of internal policies.</p>

<h3 style="color:#7c3aed;font-size:16px;border-bottom:1px solid #f3e8ff;padding-bottom:6px;margin-top:25px;">7. GOVERNING LAW</h3>
<p>This agreement shall be governed by the laws of India. Courts of Bengaluru, India shall have exclusive jurisdiction over any disputes arising out of this internship arrangement.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For Contractum Integral Solution Pvt. Limited</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized HR Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Intern Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Freelancer / NDA Agreement',
    type: 'Freelance Contract',
    category: 'Employment & HR Contracts',
    description: 'Professional freelance services agreement with detailed Scope of Work, billing schedule, intellectual property assignment, and NDA clauses.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#d97706;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Freelance Services & NDA</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #d97706, #fbbf24);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Freelance Services & NDA Agreement ("Agreement") is executed on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#fffbeb;border-left:4px solid #d97706;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#78350f;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Client:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its registered office at {{company_address}} (hereinafter referred to as the "Client").</p>
</div>

<div style="background-color:#fffbeb;border-left:4px solid #fbbf24;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#78350f;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Freelancer:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the "Freelancer").</p>
</div>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">1. SCOPE OF SERVICES</h3>
<p>The Freelancer is engaged to perform strategic and engineering services in the capacity of a <strong>{{position}}</strong> for the <strong>{{department}}</strong> division. The specific deliverables, milestones, and timelines shall conform to the Statement of Work. The Freelancer shall determine the method, details, and means of performing these services, maintaining professional standards of quality.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">2. TERM AND ENGAGEMENT</h3>
<p>This Agreement is effective from <strong>{{start_date}}</strong> and shall remain in effect through <strong>{{end_date}}</strong>, unless terminated earlier in accordance with Section 7.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">3. COMPENSATION AND INVOICING</h3>
<p>The agreed compensation for the services is <strong>{{salary}}</strong>. The Freelancer shall submit detailed invoices upon milestone completion. The Client shall process approved invoice payments within fifteen (15) days of receipt. The Freelancer is an independent contractor and shall bear sole responsibility for all taxes, duties, and statutory filings.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">4. CONFIDENTIALITY AND NON-DISCLOSURE (NDA)</h3>
<p>The Freelancer agrees that all details of this engagement, including Client source code, database structures, business workflows, client lists, and pricing models, are strictly confidential. The Freelancer shall not disclose or use this information for any purpose other than executing the scope of services. This NDA obligation shall survive for three (3) years post-termination.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">5. INTELLECTUAL PROPERTY</h3>
<p>All software developments, design assets, research reports, or source codes created by the Freelancer under this Agreement shall belong solely and exclusively to the Client immediately upon payment of the corresponding milestone invoice.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">6. INDEPENDENT CONTRACTOR STATUS</h3>
<p>Nothing in this Agreement shall create an employer-employee relationship, agency, or joint venture. The Freelancer is not entitled to any Client leaves, insurance, provident fund, or other employee benefits.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">7. TERMINATION</h3>
<p>Either party may terminate this agreement with fourteen (14) days written notice. In the event of termination, the Freelancer shall be compensated pro-rata for all approved milestones completed up to the date of termination.</p>

<h3 style="color:#d97706;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">8. GOVERNING LAW</h3>
<p>This agreement shall be governed by the laws of India. Courts of Bengaluru, Karnataka shall have exclusive jurisdiction.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For Contractum Integral Solution Pvt. Limited</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Freelancer Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Vendor Service Agreement',
    type: 'Vendor Agreement',
    category: 'Business & Corporate Agreements',
    description: 'Corporate vendor agreement detailing service scope, strict SLA obligations, billing schedule, and liability limits.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#0d9488;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Vendor Service Agreement</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #0d9488, #2dd4bf);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Vendor Service Agreement ("Agreement") is executed on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f0fdfa;border-left:4px solid #0d9488;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#115e59;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its principal office at {{company_address}} (hereinafter referred to as the "Company").</p>
</div>

<div style="background-color:#f0fdfa;border-left:4px solid #2dd4bf;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#115e59;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Vendor:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing/located at {{employee_address}} (hereinafter referred to as the "Vendor").</p>
</div>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">1. SERVICES & STATEMENT OF WORK</h3>
<p>The Vendor agrees to supply and deliver <strong>{{position}}</strong> services supporting the <strong>{{department}}</strong> division, meeting the requirements outlined in the Statement of Work and SLA guidelines.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">2. TERM AND DURATION</h3>
<p>This Agreement is effective from <strong>{{start_date}}</strong> through <strong>{{end_date}}</strong> and may be renewed by written mutual consent prior to the expiration date.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">3. PAYMENT TERMS</h3>
<p>The agreed service fee is <strong>{{salary}}</strong>. The Vendor shall submit monthly timesheets and invoices. The Company will process payments within thirty (30) days of receiving approved invoices. The Vendor is responsible for all local GST and statutory tax filings.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">4. SERVICE LEVEL AGREEMENT (SLA) & PERFORMANCE</h3>
<p>The Vendor shall maintain a minimum service delivery / system uptime rate of 99% for all contracted services. Service interruptions or SLA breaches will result in fee credit adjustments as outlined in the SLA Addendum.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">5. CONFIDENTIALITY & DATA SECURITY</h3>
<p>The Vendor shall protect and maintain the strict confidentiality of all Customer data. The Vendor shall implement state-of-the-art security measures in compliance with the Information Technology Act, 2000 and data protection standards.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">6. LIABILITY AND INDEMNIFICATION</h3>
<p>The Vendor's total liability under this Agreement shall not exceed the total service fees paid in the three (3) months preceding the incident. Neither party shall be liable for consequential, indirect, or punitive damages.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">7. TERMINATION</h3>
<p>Either party may terminate this Agreement with thirty (30) days written notice. Immediate termination is permitted in the event of insolvency, material breach, or service disruption exceeding 48 hours.</p>

<h3 style="color:#0d9488;font-size:16px;border-bottom:1px solid #ccfbf1;padding-bottom:6px;margin-top:25px;">8. GOVERNING LAW</h3>
<p>This Agreement shall be governed by the laws of India. Disputes are subject to the exclusive jurisdiction of competent courts in Mumbai.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Company</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For: {{employee_name}}</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Vendor Representative</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Consulting Agreement',
    type: 'Consultant Agreement',
    category: 'Employment & HR Contracts',
    description: 'Professional consultant engagement contract detailing consulting terms, milestone invoicing, and IP assignment.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#6366f1;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Consulting Services Agreement</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #6366f1, #818cf8);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Consulting Services Agreement ("Agreement") is made on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f5f3ff;border-left:4px solid #6366f1;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#4338ca;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Client:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its registered office at {{company_address}} (hereinafter referred to as the "Client").</p>
</div>

<div style="background-color:#f5f3ff;border-left:4px solid #818cf8;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#4338ca;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Consultant:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the "Consultant").</p>
</div>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">1. CONSULTING SERVICES</h3>
<p>The Consultant agrees to provide consulting and expert advisory services in the capacity of a <strong>{{position}}</strong> within the <strong>{{department}}</strong> division, delivering strategic and technical advice as requested.</p>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">2. TERM OF ENGAGEMENT</h3>
<p>This Agreement shall commence on <strong>{{start_date}}</strong> and remain effective through <strong>{{end_date}}</strong>, unless extended by mutual written consent prior to expiration.</p>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">3. CONSULTING FEES & INVOICES</h3>
<p>The Client shall pay the Consultant a consulting fee of <strong>{{salary}}</strong>. Invoices shall be submitted monthly with detailed strategic activity logs and paid within fifteen (15) business days of approval.</p>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">4. CONFIDENTIALITY & NDA</h3>
<p>The Consultant agrees to keep all Client technologies, strategic details, client files, and software codes strictly confidential for a period of two (2) years following the termination of this contract.</p>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">5. INTELLECTUAL PROPERTY</h3>
<p>All work products, presentations, strategic models, or source codes developed by the Consultant under this Agreement shall belong solely and exclusively to the Client immediately upon payment of the corresponding fee.</p>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">6. TERMINATION</h3>
<p>Either party may terminate this Agreement with fourteen (14) days written notice. The Client may terminate immediately for breach of NDA without further obligation.</p>

<h3 style="color:#6366f1;font-size:16px;border-bottom:1px solid #e0e7ff;padding-bottom:6px;margin-top:25px;">7. GOVERNING LAW</h3>
<p>This Agreement is governed by the laws of India. Courts of Bengaluru, India shall have exclusive jurisdiction.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Client</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Consultant Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Probationary Employment Contract',
    type: 'Employment Agreement',
    category: 'Employment & HR Contracts',
    description: 'Employment contract for probation period with performance review and evaluation benchmarks.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#f59e0b;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Probationary Employment Contract</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #f59e0b, #fbbf24);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Probationary Employment Contract is entered into on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#fffbeb;border-left:4px solid #f59e0b;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#78350f;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its principal office at {{company_address}} (hereinafter referred to as the "Company").</p>
</div>

<div style="background-color:#fffbeb;border-left:4px solid #fbbf24;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#78350f;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Employee:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the "Employee").</p>
</div>

<h3 style="color:#f59e0b;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">1. APPOINTMENT & PROBATION PERIOD</h3>
<p>The Employee is appointed as <strong>{{position}}</strong> in the <strong>{{department}}</strong> department on a probationary basis commencing <strong>{{start_date}}</strong> for a period of 90 days, ending on <strong>{{end_date}}</strong>.</p>

<h3 style="color:#f59e0b;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">2. PERFORMANCE REVIEW & CONFIRMATION</h3>
<p>The Employee's performance, attendance, and conduct will be formally evaluated at the end of the probation period. Confirmation of employment is subject to satisfactory performance review.</p>

<h3 style="color:#f59e0b;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">3. COMPENSATION DURING PROBATION</h3>
<p>During the probation period, the Employee shall receive a monthly salary of <strong>{{salary}}</strong>. Standard confirmed employee benefits will apply only upon successful confirmation of employment.</p>

<h3 style="color:#f59e0b;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">4. NOTICE AND TERMINATION</h3>
<p>Either party may terminate this agreement during probation with seven (7) days written notice. The Company reserves the right to terminate immediately for gross misconduct.</p>

<h3 style="color:#f59e0b;font-size:16px;border-bottom:1px solid #fef3c7;padding-bottom:6px;margin-top:25px;">5. CONFIDENTIALITY</h3>
<p>The Employee agrees to maintain strict confidentiality of all Company data and processes both during and after their probation period.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Company</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Employee Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Remote Work Agreement',
    type: 'Remote Work Agreement',
    category: 'Employment & HR Contracts',
    description: 'Work-from-home policy agreement covering equipment, cybersecurity protocols, and productivity standards.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#10b981;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Remote Work Agreement</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #10b981, #34d399);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Remote Work Agreement ("Agreement") is made on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f0fdf4;border-left:4px solid #10b981;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#065f46;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong>, having its principal office at {{company_address}} (hereinafter referred to as the "Company").</p>
</div>

<div style="background-color:#f0fdf4;border-left:4px solid #34d399;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#065f46;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Employee:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the "Employee"), employed as <strong>{{position}}</strong> in the <strong>{{department}}</strong> department.</p>
</div>

<h3 style="color:#10b981;font-size:16px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-top:25px;">1. REMOTE WORK ARRANGEMENT</h3>
<p>The Company authorizes the Employee to work remotely from their home or a pre-approved location effective <strong>{{start_date}}</strong>. This arrangement is subject to quarterly evaluation and may be modified or revoked with seven (7) days written notice.</p>

<h3 style="color:#10b981;font-size:16px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-top:25px;">2. AVAILABILITY AND WORKING HOURS</h3>
<p>The Employee shall maintain regular working hours of 9:00 AM to 6:00 PM IST, Monday through Friday, and shall remain fully reachable via designated communication channels (Slack, Email, Video conferencing) during these hours.</p>

<h3 style="color:#10b981;font-size:16px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-top:25px;">3. DATA SECURITY PROTOCOLS</h3>
<p>The Employee shall ensure that all Client and Company data is protected using approved security tools. Remote access must always route through the Company's approved VPN. Sharing credentials or devices with unauthorized persons is strictly prohibited.</p>

<h3 style="color:#10b981;font-size:16px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-top:25px;">4. EQUIPMENT & WORK SPACE</h3>
<p>The Employee is responsible for maintaining a reliable internet connection. Company-provided devices must be used solely for business purposes and returned immediately upon termination of employment.</p>

<h3 style="color:#10b981;font-size:16px;border-bottom:1px solid #d1fae5;padding-bottom:6px;margin-top:25px;">5. COMPENSATION</h3>
<p>The Employee shall receive a monthly salary of <strong>{{salary}}</strong>. No additional allowances or expenses for remote work are provided unless separately agreed in writing.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Company</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Employee Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'MOU – Partnership Agreement',
    type: 'Memorandum of Understanding (MoU)',
    category: 'Business & Corporate Agreements',
    description: 'Memorandum of Understanding for institutional or business partnerships detailing areas of joint collaboration.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#ec4899;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Memorandum of Understanding</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #ec4899, #f472b6);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Memorandum of Understanding ("MOU") is entered into on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#fdf2f8;border-left:4px solid #ec4899;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#9d174d;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">First Party:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong> ("Party A"), having its registered office at {{company_address}}.</p>
</div>

<div style="background-color:#fdf2f8;border-left:4px solid #f472b6;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#9d174d;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">Second Party:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong> ("Party B"), residing/located at {{employee_address}}.</p>
</div>

<h3 style="color:#ec4899;font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">1. PURPOSE & COOPERATIVE SCOPE</h3>
<p>The parties intend to collaborate on <strong>{{position}}</strong> initiatives to enhance <strong>{{department}}</strong> research and business collaboration.</p>

<h3 style="color:#ec4899;font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">2. DURATION</h3>
<p>This MOU is effective from <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong>. Either party may terminate their participation with thirty (30) days written notice.</p>

<h3 style="color:#ec4899;font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">3. FINANCIAL TERMS</h3>
<p>This MOU is non-binding and carries no financial obligations. Any specific commercial projects or revenue sharing arrangements (such as <strong>{{salary}}</strong>) shall be governed by separate, legally binding agreements.</p>

<h3 style="color:#ec4899;font-size:16px;border-bottom:1px solid #fce7f3;padding-bottom:6px;margin-top:25px;">4. CONFIDENTIALITY</h3>
<p>Both parties agree to maintain strict confidentiality of all shared business models, strategies, and proprietary technologies during and for three (3) years post-termination.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For Party A</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For Party B</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Representative</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Official Offer Letter',
    type: 'Offer Letter',
    category: 'Employment & HR Contracts',
    description: 'Standard professional offer letter with compensation breakdown table, onboarding requirements, and acceptance conditions.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#3b82f6;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Official Offer of Employment</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #3b82f6, #60a5fa);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p style="margin:0;font-weight:700;color:#0f172a;">To,</p>
<p style="margin:0 0 3px 0;font-weight:700;color:#0f172a;">{{employee_name}}</p>
<p style="margin:0 0 20px 0;color:#475569;font-size:13px;line-height:1.4;">{{employee_address}}</p>

<p>Dear <strong>{{employee_name}}</strong>,</p>

<p>We are delighted to extend to you an offer of employment with <strong>Contractum Integral Solution Pvt. Limited</strong>. We were highly impressed by your qualifications, skills, and experience during the interview process, and we are confident that you will play a vital role in our growth and success.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">1. POSITION & REPORTING RELATIONSHIP</h3>
<p>You are offered the position of <strong>{{position}}</strong> within the <strong>{{department}}</strong> department. In this role, you will report directly to the Department Head or such other supervisor as designated by the Company. Your primary place of work will be our office in {{company_city}}. The standard working hours are from 9:00 AM to 6:00 PM, Monday through Friday.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">2. COMPENSATION & SALARY BREAKDOWN</h3>
<p>Your Total Cost to Company (CTC) will be <strong>{{salary}}</strong>, subject to applicable tax deductions (TDS) and statutory contributions. The detailed breakdown of your salary is structured as follows:</p>

<table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-family: sans-serif; font-size: 13px;">
  <thead>
    <tr style="background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
      <th style="padding: 10px; text-align: left; font-weight: 700; color: #1e3a8a;">Salary Component</th>
      <th style="padding: 10px; text-align: right; font-weight: 700; color: #1e3a8a;">Percentage / Detail</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px; color: #334155;">Basic Salary</td>
      <td style="padding: 10px; text-align: right; color: #334155;">50% of Base CTC</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px; color: #334155;">House Rent Allowance (HRA)</td>
      <td style="padding: 10px; text-align: right; color: #334155;">20% of Base CTC</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px; color: #334155;">Special Allowance</td>
      <td style="padding: 10px; text-align: right; color: #334155;">Balancing Component</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px; color: #334155;">Provident Fund (PF) Contribution</td>
      <td style="padding: 10px; text-align: right; color: #334155;">As per statutory guidelines</td>
    </tr>
    <tr style="border-bottom: 1px solid #cbd5e1; font-weight: 700;">
      <td style="padding: 10px; color: #0f172a;">Total CTC (Cost to Company)</td>
      <td style="padding: 10px; text-align: right; color: #0f172a;">{{salary}}</td>
    </tr>
  </tbody>
</table>

<p>You will also be eligible for standard medical insurance benefits, paid time off, and discretionary performance bonuses in accordance with the Company policy in force.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">3. PROBATION & REVIEW PERIOD</h3>
<p>You will be on probation for a period of six (6) months from your start date. Upon satisfactory completion of the probation period, your employment will be confirmed in writing. The notice period during probation shall be fifteen (15) days on either side, and thirty (30) days upon confirmation.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">4. ONBOARDING DOCUMENTS & CONTINGENCIES</h3>
<p>This offer is strictly contingent upon satisfactory background reference checks and submission of required self-attested documents: Past experience letters, relieves letters, last 3 months salary slips, educational certificates, and Government photo IDs.</p>

<p>Please confirm your acceptance of this offer by signing and returning a copy of this letter by <strong>{{end_date}}</strong>. Should you fail to submit your acceptance by this date, this offer will stand automatically withdrawn.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Company</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized HR Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Employee Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'Internship Offer Letter',
    type: 'Offer Letter',
    category: 'Employment & HR Contracts',
    description: 'Official Internship Offer Letter covering duration, stipend, key program components, expectations, and acceptance terms.',
    content: `{{company_logo}}
<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:24px;font-weight:800;color:#0284c7;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">Internship Offer Letter</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #0284c7, #38bdf8);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p style="margin:0;font-weight:700;color:#0f172a;">To,</p>
<p style="margin:0 0 3px 0;font-weight:700;color:#0f172a;">{{employee_name}}</p>
<p style="margin:0 0 20px 0;color:#475569;font-size:13px;line-height:1.4;">{{employee_address}}</p>

<p>Dear <strong>{{employee_name}}</strong>,</p>

<p>We are thrilled to extend an invitation for you to join <strong>The Contractum</strong> as an intern in our "Software Web Development Internship Program". This program is designed to provide hands-on experience and mentorship in the field of software development live projects, with a focus on web technologies. We believe that your passion for learning and dedication will make a valuable contribution to our team.</p>

<div style="background-color:#f0f9ff;border-left:4px solid #0284c7;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 5px 0;font-weight:700;color:#0369a1;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">Internship Details:</p>
  <p style="margin:0 0 5px 0;font-size:14px;"><strong>Position:</strong> {{position}}</p>
  <p style="margin:0;font-size:14px;"><strong>Duration:</strong> {{start_date}} – {{end_date}}</p>
</div>

<h3 style="color:#0284c7;font-size:16px;border-bottom:1px solid #e0f2fe;padding-bottom:6px;margin-top:25px;">Program Overview</h3>
<p>Our internship program is structured to provide interns with practical experience and the opportunity to develop skills in software web development through live projects. Interns will receive a monthly compensation of <strong>{{salary}}</strong>, based on performance. Exceptional performance may also lead to future employment opportunities, subject to demonstrated abilities and company requirements.</p>

<h3 style="color:#0284c7;font-size:16px;border-bottom:1px solid #e0f2fe;padding-bottom:6px;margin-top:25px;">Key Components</h3>
<ol style="padding-left:20px;margin:10px 0;">
  <li style="margin-bottom:8px;"><strong>Mode of Internship:</strong> The internship will be conducted in <strong>offline/online mode</strong>, requiring your active participation to encourage hands-on learning, real-time collaboration with the team, and direct interaction with mentors and trainers.</li>
  <li style="margin-bottom:8px;"><strong>Mentorship:</strong> You will be paired with an experienced mentor who will guide you through various projects and provide feedback on your work.</li>
  <li style="margin-bottom:8px;"><strong>Training:</strong> You will have access to trainers, guidance, and digital resources to enhance your understanding of web development technologies, including HTML, React, Tailwind CSS, Node.js, Express.js, MongoDB, and SQL. You will also receive training to prepare the drafting of the web portal.</li>
  <li style="margin-bottom:8px;"><strong>Hands-on Projects:</strong> Work on real-world projects under mentor supervision to gain practical experience.</li>
  <li style="margin-bottom:8px;"><strong>Collaboration:</strong> Collaborate with team members, fostering a supportive learning environment and exposure to industry-standard practices.</li>
  <li style="margin-bottom:8px;"><strong>Performance Evaluation:</strong> Regular evaluation with feedback to support improvement and growth.</li>
  <li style="margin-bottom:8px;"><strong>Potential for Employment:</strong> Exceptional interns may be considered for future employment opportunities depending on performance and business needs.</li>
</ol>

<h3 style="color:#0284c7;font-size:16px;border-bottom:1px solid #e0f2fe;padding-bottom:6px;margin-top:25px;">Expectations</h3>
<ul style="padding-left:20px;margin:10px 0;list-style-type:disc;">
  <li style="margin-bottom:8px;"><strong>Diligence:</strong> Professional conduct, meeting deadlines, and effective communication with mentors and team members.</li>
  <li style="margin-bottom:8px;"><strong>Continuous Learning:</strong> Proactive learning of new skills and technologies, seeking guidance and feedback when required.</li>
  <li style="margin-bottom:8px;"><strong>Compliance with Company Policies:</strong> The Intern shall strictly adhere to all Company policies, rules, regulations, codes of conduct, and operational guidelines as amended from time to time. Non-compliance may result in disciplinary action, including termination of the internship.</li>
  <li style="margin-bottom:8px;"><strong>Acceptance of Terms and Conditions:</strong> By accepting this offer, the Intern agrees to abide by all terms and conditions set forth in this letter and any additional policies communicated by the Company during the tenure of the internship.</li>
  <li style="margin-bottom:8px;"><strong>Professional Conduct Requirement:</strong> The Intern is expected to maintain the highest standards of professionalism, integrity, confidentiality, and ethical behavior in alignment with corporate practices.</li>
</ul>

<p>Please indicate your acceptance of this internship offer by signing and returning a copy of this letter by <strong>{{end_date}}</strong>.</p>

<p>We are excited to welcome you to our Software Web Development Program and look forward to supporting your growth and development as a web developer.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0;font-weight:700;color:#0f172a;">Sincerely,</p>
      <p style="margin:5px 0 35px 0;font-weight:600;color:#334155;">Contractum Integral Solution Pvt. Ltd.</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;"><strong>Narendra Singh</strong></p>
      <p style="margin:0;font-size:11px;color:#64748b;">Project Coordinator</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Phone: +91-96805-34740</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0;color:transparent;user-select:none;">Sincerely,</p>
      <p style="margin:5px 0 45px 0;font-weight:700;color:#0f172a;">Accepted By:</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Intern Signature</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Name: {{employee_name}}</p>
      <p style="margin:0;font-size:11px;color:#64748b;">Date: ______________________</p>
    </td>
  </tr>
</table>
</div>`
  },
  {
    name: 'SaaS Agreement',
    type: 'SaaS Agreement',
    category: 'Software & IT Contracts',
    description: 'Software-as-a-Service subscription agreement outlining access license, platform fees, billing schedule, and data security.',
    content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#3b82f6;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">SaaS Subscription Agreement</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Contractum Integral Solution Pvt. Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #3b82f6, #60a5fa);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This SaaS Subscription Agreement ("Agreement") is executed on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f0fdfa;border-left:4px solid #3b82f6;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#1e3a8a;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Provider:</p>
  <p style="margin:0;font-size:14px;"><strong>Contractum Integral Solution Pvt. Limited</strong> ("Provider"), having its principal office at {{company_address}}.</p>
</div>

<div style="background-color:#f0fdfa;border-left:4px solid #60a5fa;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#1e3a8a;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Customer:</p>
  <p style="margin:0;font-size:14px;"><strong>{{employee_name}}</strong> ("Customer"), residing/located at {{employee_address}}.</p>
</div>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">1. ACCESS LICENSE & SAAS SERVICES</h3>
<p>Provider grants Customer a non-exclusive, non-transferable subscription license to use the cloud-hosted platform for the role of <strong>{{position}}</strong> in the <strong>{{department}}</strong> division.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">2. SUBSCRIPTION FEES</h3>
<p>The agreed monthly subscription fee is <strong>{{salary}}</strong>. Payments are billed in advance at the start of each billing cycle. Customer agrees to pay all fees within thirty (30) days of the invoice date.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">3. DATA PRIVACY & DATA SECURITY</h3>
<p>Provider will maintain appropriate physical, administrative, and technical security measures to protect Customer data in compliance with standard regulations. Customer owns all database content entered.</p>

<h3 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #dbeafe;padding-bottom:6px;margin-top:25px;">4. TERMINATION AND SUSPENSION</h3>
<p>Customer may cancel the subscription at any time. Provider reserves the right to suspend platform access for payments overdue by more than fifteen (15) days.</p>

<br/><br/>
<table style="width:100%;border-collapse:collapse;border:none;margin-top:40px;">
  <tr>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Provider</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signatory</p>
    </td>
    <td style="width:10%;border:none;"></td>
    <td style="width:45%;vertical-align:top;border:none;padding:0;">
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Customer</p>
      <div style="border-bottom:1px solid #cbd5e1;width:80%;margin-bottom:6px;"></div>
      <p style="margin:0;font-size:11px;color:#64748b;">Authorized Signature</p>
    </td>
  </tr>
</table>
</div>`
  }
];


// ---------- Templates ----------

// Get all templates (returns all for admin, seeds professional ones if DB is empty)
router.get('/templates', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const bulkOps = PROFESSIONAL_TEMPLATES.map(template => {
      let contentWithLogo = template.content;
      if (!contentWithLogo.includes('{{company_logo}}')) {
        contentWithLogo = '{{company_logo}}\n' + contentWithLogo;
      }
      return {
        updateOne: {
          filter: { name: template.name },
          update: { $set: { ...template, content: contentWithLogo, isActive: true } },
          upsert: true
        }
      };
    });
    await ContractTemplate.bulkWrite(bulkOps);
    await ContractTemplate.updateMany({ isActive: { $exists: false } }, { $set: { isActive: true } });
    const templates = await ContractTemplate.find({ isActive: true });
    res.json(templates);
  } catch (err) {
    console.error("Error syncing templates:", err);
    res.status(500).json({ message: 'Error syncing templates', error: err.message });
  }
});

// Create a template
router.post('/templates', protect, checkSubRole(['Legal']), async (req, res) => {
  try {
    const template = await ContractTemplate.create(req.body);
    res.status(201).json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a template
router.put('/templates/:id', protect, checkSubRole(['Legal']), async (req, res) => {
  try {
    const template = await ContractTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a template
router.delete('/templates/:id', protect, checkSubRole(['Legal']), async (req, res) => {
  try {
    const template = await ContractTemplate.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json({ message: 'Template deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Contracts ----------

// Create a new contract instance (HR/Admin)
router.post('/', protect, checkSubRole(['HR', 'Legal', 'Manager']), async (req, res) => {
  try {
    // Handle empty date strings to prevent Mongoose validation errors
    const contractData = { ...req.body };
    if (contractData.validFrom === "") delete contractData.validFrom;
    if (contractData.validUntil === "") delete contractData.validUntil;

    const contract = new Contract({
      ...contractData,
      createdBy: req.user._id,
    });
    await contract.save();

    // If submitted for approval immediately
    if (contract.status === 'Pending_Manager') {
      await Notification.create({
        type: 'Contract Approval',
        title: 'New Contract for Review',
        message: `A new contract "${contract.title}" requires Manager review.`,
        link: '/admin/contracts'
      });
    }

    res.status(201).json(contract);
  } catch (err) {
    // Provide clearer validation errors
    const message = err.name === 'ValidationError'
      ? Object.values(err.errors).map(e => e.message).join(', ')
      : err.message;
    res.status(400).json({ error: message });
  }
});

// Get all contracts (Admin list with filtering)
router.get('/', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    let query = {};
    const category = getContractRoleCategory(req.user);

    // Filter based on what the role needs to see ONLY if pendingOnly or pendingFinal is specified
    if (req.query.pendingOnly === 'true') {
      if (category === 'Manager') query.status = 'Pending_Manager';
      else if (category === 'HR') query.status = { $in: ['Pending_HR', 'Draft', 'Rejected'] };
      else if (category === 'Legal') query.status = 'Pending_Legal';
      else if (category === 'SuperAdmin') query.status = 'Pending_Final';
    } else if (req.query.pendingFinal === 'true') {
      query.status = 'Pending_Final';
    }

    const contracts = await Contract.find(query)
      .populate('employeeId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contracts' });
  }
});

// Get user's own contracts
router.get('/my-contracts', protect, async (req, res) => {
  try {
    const contracts = await Contract.find({
      employeeId: req.user._id,
      status: { $in: ['Pending_Signature', 'Active', 'Expired'] }
    }).sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your contracts' });
  }
});

// Approve a contract
router.put('/:id/approve', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });

    const category = getContractRoleCategory(req.user);

    // Workflow state machine
    if (contract.status === 'Pending_Manager' && category === 'Manager') {
      contract.status = 'Pending_HR';
    } else if (contract.status === 'Pending_HR' && category === 'HR') {
      contract.status = 'Pending_Legal';
    } else if (contract.status === 'Pending_Legal' && category === 'Legal') {
      contract.status = 'Pending_Final';
    } else if (contract.status === 'Pending_Final' && category === 'SuperAdmin') {
      contract.status = 'Pending_Signature';
    } else {
      return res.status(403).json({ message: 'You are not authorized to approve this step.' });
    }

    contract.approvals.push({
      role: category,
      userId: req.user._id,
      status: 'Approved',
      comments: req.body.comments
    });

    await contract.save();

    // Notify next role
    let nextRole = '';
    if (contract.status === 'Pending_HR') nextRole = 'HR';
    else if (contract.status === 'Pending_Legal') nextRole = 'Legal';
    else if (contract.status === 'Pending_Final') nextRole = 'Super Admin';
    else if (contract.status === 'Pending_Signature') {
      // Notify Employee
      sendContractEmailHelper(contract).catch(err => console.error("Error sending auto-email on approval:", err));
    }

    if (nextRole) {
      await Notification.create({
        type: 'Contract Approval',
        title: 'Contract Approved (Next Step)',
        message: `Contract "${contract.title}" has been approved and moved to ${nextRole}.`,
        link: '/admin/contracts'
      });
    }

    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Reject a contract
router.put('/:id/reject', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });

    const category = getContractRoleCategory(req.user);

    contract.status = 'Rejected';
    contract.approvals.push({
      role: category,
      userId: req.user._id,
      status: 'Rejected',
      comments: req.body.comments
    });

    await contract.save();
    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sign a contract (Employee)
router.put('/:id/sign', protect, async (req, res) => {
  try {
    const contract = await Contract.findOne({
      _id: req.params.id,
      employeeId: req.user._id,
      status: 'Pending_Signature'
    });

    if (!contract) return res.status(404).json({ message: 'Contract not available for signing.' });

    contract.signature = {
      isSigned: true,
      signedAt: new Date(),
      signatureName: req.body.signatureName,
      signatureImage: req.body.signatureImage,
      signatureIp: req.ip
    };
    contract.status = 'Active';

    await contract.save();
    sendContractEmailHelper(contract).catch(err => console.error("Error sending auto-email on signature:", err));
    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PDF Download ───────────────────────────────────────────────
router.get('/:id/download-pdf', protect, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('employeeId', 'name firstName lastName email');
    if (!contract) return res.status(404).json({ message: 'Contract not found' });

    const isEmployee = contract.employeeId && req.user && contract.employeeId._id.toString() === req.user._id.toString();
    const category = getContractRoleCategory(req.user);
    const isAdmin = ['Manager', 'HR', 'Legal', 'SuperAdmin'].includes(category);

    if (!isAdmin && !isEmployee) {
      return res.status(403).json({ message: 'You are not authorized to download this contract.' });
    }

    const employeeName = contract.employeeId
      ? (contract.employeeId.name || `${contract.employeeId.firstName || ''} ${contract.employeeId.lastName || ''}`.trim())
      : (contract.customRecipient?.name || 'Recipient');

    const pdfBuffer = await generateContractPDF(contract, employeeName);
    const pdfName = `${contract.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${pdfName}"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF download error:', err);
    res.status(500).json({ message: 'Failed to download PDF', error: err.message });
  }
});

// Get a single contract by ID
router.get('/:id', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('employeeId', 'firstName lastName email');
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contract' });
  }
});

// Update a contract (edit draft)
router.put('/:id', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    if (!['Draft', 'Rejected', 'Pending_Manager', 'Pending_HR', 'Pending_Legal', 'Pending_Final', 'Pending_Signature', 'Active', 'Expired'].includes(contract.status)) {
      return res.status(403).json({ message: 'Only Draft, Rejected, Pending, Active, or Expired contracts can be edited.' });
    }
    const updates = { ...req.body };
    if (updates.validFrom === '') delete updates.validFrom;
    if (updates.validUntil === '') delete updates.validUntil;
    Object.assign(contract, updates);
    await contract.save();
    res.json(contract);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a contract
router.delete('/:id', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    await Contract.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contract deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── Email a contract to the employee ────────────────────────────
router.post('/:id/send-email', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });

    const sent = await sendContractEmailHelper(contract);
    if (!sent) return res.status(400).json({ message: 'Failed to send email. Receiver details missing.' });

    // Log the action in history
    contract.history = contract.history || [];
    contract.history.push({ action: 'Email Sent', by: req.user._id, timestamp: new Date(), comments: `Email sent with PDF attachment` });
    await contract.save();

    res.json({ message: `Contract successfully emailed with PDF attachment` });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
});

// ── Bulk Generate contracts ──────────────────────────────────────
router.post('/bulk-generate', protect, checkSubRole(['HR', 'Legal', 'Manager']), async (req, res) => {
  try {
    const { templateId, employeeIds, validFrom, validUntil, type } = req.body;
    if (!templateId || !employeeIds?.length) {
      return res.status(400).json({ message: 'Template and at least one employee are required' });
    }

    const template = await ContractTemplate.findById(templateId);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    const User = require('../models/User');
    const employees = await User.find({ _id: { $in: employeeIds } })
      .select('name firstName lastName email jobTitle department street city state country pincode');

    const created = [];
    for (const emp of employees) {
      const empName = emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
      const addressParts = [
        emp.street,
        emp.city,
        emp.state,
        emp.country,
        emp.pincode ? `PIN: ${emp.pincode}` : ''
      ].filter(Boolean);
      const employeeAddress = addressParts.length > 0 ? addressParts.join(', ') : 'India';

      let content = template.content;
      const replacements = {
        '{{employee_name}}': empName,
        '{{position}}': emp.jobTitle || 'Employee',
        '{{department}}': emp.department || 'General',
        '{{company_name}}': 'Contractum Integral Solution Pvt. Limited',
        '{{company_address}}': 'India',
        '{{start_date}}': validFrom ? new Date(validFrom).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '___',
        '{{end_date}}': validUntil ? new Date(validUntil).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '___',
        '{{salary}}': '___',
        '{{employee_address}}': employeeAddress,
        '{{company_city}}': 'India',
      };
      Object.entries(replacements).forEach(([k, v]) => {
        content = content.replace(new RegExp(k.replace(/[{}]/g, '\\$&'), 'g'), v);
      });

      const contractData = {
        title: `${template.name} – ${empName}`,
        category: template.category || 'Employment & HR Contracts',
        type: type || template.type || 'Employment Agreement',
        content,
        employeeId: emp._id,
        createdBy: req.user._id,
        status: 'Draft',
      };
      if (validFrom) contractData.validFrom = validFrom;
      if (validUntil) contractData.validUntil = validUntil;

      const contract = await Contract.create(contractData);
      created.push(contract._id);
    }

    res.status(201).json({ message: `${created.length} contracts created successfully`, contractIds: created });
  } catch (err) {
    res.status(500).json({ message: 'Bulk generation failed', error: err.message });
  }
});

// ── Expiry alerts ────────────────────────────────────────────────
router.get('/expiry-alerts', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const now = new Date();
    const threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const expiring = await Contract.find({
      status: 'Active',
      validUntil: { $gte: now, $lte: threshold }
    }).populate('employeeId', 'name firstName lastName email').sort({ validUntil: 1 });

    const expired = await Contract.find({
      status: { $ne: 'Expired' },
      validUntil: { $lt: now }
    }).populate('employeeId', 'name firstName lastName email');

    // Auto-mark expired ones
    if (expired.length > 0) {
      await Contract.updateMany(
        { _id: { $in: expired.map(c => c._id) } },
        { $set: { status: 'Expired' } }
      );
    }

    res.json({ expiring, expiredCount: expired.length, days });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expiry data', error: err.message });
  }
});

// Auto-migrate contracts and templates to add default category if missing
Promise.resolve().then(async () => {
  try {
    await Contract.updateMany({ category: { $exists: false } }, { $set: { category: 'Employment & HR Contracts' } });
    await ContractTemplate.updateMany({ category: { $exists: false } }, { $set: { category: 'Employment & HR Contracts' } });
    console.log("Contract & Template categories auto-migrated.");
  } catch (e) {
    console.error("Migration error:", e);
  }
});

// ── PDF and Email Helpers ────────────────────────────────────────
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

function propagateAlignment(html) {
  let result = html;
  const centerDivRegex = /<div[^>]*text-align:\s*center[^>]*>([\s\S]*?)<\/div>/gi;
  result = result.replace(centerDivRegex, (match, divContent) => {
    let updatedContent = divContent;
    updatedContent = updatedContent.replace(/<(p|h[1-6])([^>]*)>/gi, (m, tagName, attrs) => {
      if (attrs.includes('text-align')) {
        return m;
      }
      if (attrs.includes('style=')) {
        const quote = attrs.includes('style="') ? '"' : "'";
        const splitStr = `style=${quote}`;
        const parts = attrs.split(splitStr);
        return `<${tagName} style=${quote}text-align:center;${parts[1]}>`;
      } else {
        return `<${tagName} style="text-align:center;"${attrs}>`;
      }
    });
    return `<div style="text-align:center;">${updatedContent}</div>`;
  });
  return result;
}

function stripLetterhead(html) {
  if (!html) return '';
  const startIdx = html.indexOf('<div style="position:relative;');
  if (startIdx === -1) return html;

  let depth = 0;
  let pos = startIdx;
  while (pos < html.length) {
    const nextOpen = html.indexOf('<div', pos);
    const nextClose = html.indexOf('</div>', pos);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        return html.substring(0, startIdx) + html.substring(nextClose + 6);
      }
      pos = nextClose + 6;
    }
  }
  return html;
}

function extractColor(tagHtml, defaultColor) {
  const match = tagHtml.match(/color:\s*(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/i);
  return match ? match[1] : defaultColor;
}

function extractFontSize(tagHtml, defaultSize) {
  const match = tagHtml.match(/font-size:\s*(\d+)px/i);
  if (match) {
    return Math.round(parseInt(match[1], 10) * 0.75);
  }
  return defaultSize;
}

function parseStyledText(htmlText) {
  let text = (htmlText || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const tagRegex = /(<strong[^>]*>[\s\S]*?<\/strong>|<b[^>]*>[\s\S]*?<\/b>|<u[^>]*>[\s\S]*?<\/u>)/gi;
  const parts = text.split(tagRegex);

  const segments = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.toLowerCase().startsWith('<strong>') || part.toLowerCase().startsWith('<b')) {
      const innerText = part.replace(/<[^>]*>/g, '');
      if (innerText) {
        segments.push({ text: innerText, bold: true, underline: false });
      }
    } else if (part.toLowerCase().startsWith('<u')) {
      const innerText = part.replace(/<[^>]*>/g, '');
      if (innerText) {
        segments.push({ text: innerText, bold: false, underline: true });
      }
    } else {
      segments.push({ text: part, bold: false, underline: false });
    }
  }
  return segments;
}

function parseHTMLToPDFKitTokens(html) {
  const cleanHtmlWithAlignment = propagateAlignment(html || '');
  const tables = [];
  let htmlWithPlaceholders = cleanHtmlWithAlignment.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, tableContent) => {
    tables.push(tableContent);
    return `\n__TABLE_PLACEHOLDER_${tables.length - 1}__\n`;
  });

  const tokens = [];
  let cleanHtml = htmlWithPlaceholders
    .replace(/\r?\n/g, ' ')
    .replace(/<p[^>]*>\s*(?:&nbsp;|<br\s*\/?>|\s|&#160;)*\s*<\/p>/gi, '\n__BLANK_LINE__\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '</p>\n')
    .replace(/<\/h[1-6]>/gi, '</h1>\n')
    .replace(/<\/li>/gi, '</li>\n')
    .replace(/<ul[^>]*>/gi, '<ul>\n')
    .replace(/<\/ul>/gi, '</ul>\n')
    .replace(/<ol[^>]*>/gi, '<ol>\n')
    .replace(/<\/ol>/gi, '</ol>\n')
    .replace(/<div[^>]*?(?:background-color|border-left)[^>]*>/gi, m => `\n${m}\n`)
    .replace(/<\/div>/gi, '\n</div>\n');

  const lines = cleanHtml.split('\n');
  let listType = null;
  let listIndex = 1;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line === '__BLANK_LINE__' || line === '&nbsp;' || line === '<br>') {
      tokens.push({ type: 'blank-line' });
      continue;
    }

    if (line.includes('color:transparent') || line.includes('color: transparent')) {
      continue;
    }

    if (line.includes('<ul')) {
      listType = 'ul';
      continue;
    }
    if (line.includes('<ol')) {
      listType = 'ol';
      listIndex = 1;
      continue;
    }
    if (line.includes('</ul>') || line.includes('</ol>')) {
      listType = null;
      continue;
    }

    if (line.toLowerCase().startsWith('<div') && (line.toLowerCase().includes('background-color') || line.toLowerCase().includes('border-left'))) {
      const bgMatch = line.match(/background-color:\s*(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/i);
      const bgColor = bgMatch ? bgMatch[1] : '#f8fafc';
      const borderMatch = line.match(/border-left:\s*\d+px\s*solid\s*(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)/i);
      const borderColor = borderMatch ? borderMatch[1] : '#0284c7';
      tokens.push({ type: 'shaded-box-start', bgColor, borderColor });
      continue;
    }
    if (line.toLowerCase() === '</div>') {
      tokens.push({ type: 'shaded-box-end' });
      continue;
    }

    const tableMatch = line.match(/__TABLE_PLACEHOLDER_(\d+)__/);
    if (tableMatch) {
      const tableIdx = parseInt(tableMatch[1], 10);
      const tableContent = tables[tableIdx];
      const rows = [];
      const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      let trMatch;
      while ((trMatch = trRegex.exec(tableContent)) !== null) {
        const rowContent = trMatch[1];
        const cells = [];
        const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
        let tdMatch;
        while ((tdMatch = tdRegex.exec(rowContent)) !== null) {
          const cellContent = tdMatch[1].trim();
          const cellTokens = parseHTMLToPDFKitTokens(cellContent);
          cells.push(cellTokens);
        }
        if (cells.length > 0) {
          rows.push(cells);
        }
      }
      if (rows.length > 0) {
        tokens.push({ type: 'table', rows });
      }
      continue;
    }

    const dividerMatch = line.match(/<div[^>]*height:\s*\d+px[^>]*background:[^>]*width:\s*(\d+)px[^>]*>\s*<\/div>/i);
    if (dividerMatch) {
      const width = parseInt(dividerMatch[1], 10) || 150;
      let color = '#0284c7';
      if (line.includes('#1e5cdc')) color = '#1e5cdc';
      else if (line.includes('#0284c7')) color = '#0284c7';
      else if (line.includes('#3b82f6')) color = '#3b82f6';
      tokens.push({ type: 'divider', width, color });
      continue;
    }

    const liMatch = line.match(/<li[^>]*>([\s\S]*?)<\/li>/i);
    if (liMatch) {
      const text = cleanHtmlForTokens(liMatch[1]);
      const prefix = listType === 'ol' ? `${listIndex++}. ` : '• ';
      const align = line.toLowerCase().includes('text-align:center') || line.toLowerCase().includes('text-align: center') ? 'center' : 'left';
      const color = extractColor(line, '#1f2937');
      const size = extractFontSize(line, 10);
      tokens.push({ type: 'list-item', text, prefix, align, color, size });
      continue;
    }

    const headingMatch = line.match(/<(h[1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/i);
    if (headingMatch) {
      const tag = headingMatch[1].toLowerCase();
      const text = stripHtmlTags(headingMatch[2]);
      const isCentered = line.toLowerCase().includes('text-align:center') || line.toLowerCase().includes('text-align: center');
      const color = extractColor(line, '#0284c7');

      let defaultSize = 12;
      if (tag === 'h1') defaultSize = 18;
      else if (tag === 'h2') defaultSize = 15;

      const size = extractFontSize(line, defaultSize);
      if (text) {
        tokens.push({ type: 'heading', text, align: isCentered ? 'center' : 'left', color, size });
      }
      continue;
    }

    const pMatch = line.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    let pText = line;
    let align = 'justify';
    let color = '#1f2937';
    let size = 10;

    if (pMatch) {
      pText = pMatch[1];
      if (line.toLowerCase().includes('text-align:center') || line.toLowerCase().includes('text-align: center')) {
        align = 'center';
      } else if (line.toLowerCase().includes('text-align:right') || line.toLowerCase().includes('text-align: right')) {
        align = 'right';
      } else if (line.toLowerCase().includes('text-align:left') || line.toLowerCase().includes('text-align: left')) {
        align = 'left';
      }
      color = extractColor(line, '#1f2937');
      size = extractFontSize(line, 10);
    } else {
      if (line.toLowerCase().includes('text-align:center') || line.toLowerCase().includes('text-align: center')) {
        align = 'center';
      }
    }

    const text = cleanHtmlForTokens(pText);
    if (text) {
      tokens.push({ type: 'paragraph', text, align, color, size });
    }
  }
  return tokens;
}

function cleanHtmlForTokens(str) {
  let s = (str || '');
  s = s.replace(/<(?:p|div|br)\b[^>]*>/gi, '\n');
  s = s.replace(/<\/(?:p|div)>/gi, '\n');
  s = s.replace(/<(?!strong|\/strong|b|\/b|u|\/u)[^>]*>/gi, '');
  s = s.replace(/\n+/g, '\n');
  return s.trim();
}

function renderStyledText(doc, htmlText, colWidth, isHeading = false, align = null) {
  if (align === 'right') {
    const resolvedFont = isHeading ? 'CustomBold' : 'CustomRegular';
    try {
      doc.font(resolvedFont);
    } catch (e) {
      doc.font(isHeading ? 'Helvetica-Bold' : 'Helvetica');
    }
    doc.text(stripHtmlTags(htmlText), { align: 'right', lineGap: 4 });
    return;
  }
  const segments = parseStyledText(htmlText);
  if (segments.length === 0) return;

  for (let i = 1; i < segments.length; i++) {
    if (segments[i].text.startsWith(' ')) {
      segments[i].text = segments[i].text.substring(1);
      segments[i - 1].text += ' ';
    }
  }

  const finalSegments = segments.filter(s => s.text !== '');
  if (finalSegments.length === 0) return;

  for (let i = 0; i < finalSegments.length; i++) {
    const seg = finalSegments[i];
    const isLast = (i === finalSegments.length - 1);

    const resolvedFont = (seg.bold || isHeading) ? 'CustomBold' : 'CustomRegular';
    try {
      doc.font(resolvedFont);
    } catch (e) {
      doc.font((seg.bold || isHeading) ? 'Helvetica-Bold' : 'Helvetica');
    }

    const textOptions = {
      continued: !isLast,
      lineGap: 4,
      underline: seg.underline
    };
    if (colWidth) {
      textOptions.width = colWidth;
    } else {
      textOptions.align = align || (isHeading ? 'left' : 'justify');
    }

    doc.text(seg.text, textOptions);
  }
}

function stripHtmlTags(str) {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function generateContractPDF(contract, employeeName) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Register Windows Arial / Arial Bold fonts for rendering Rupee symbol (₹) and high quality unicode typography
      const path = require('path');
      const fs = require('fs');
      const winArialReg = 'C:/Windows/Fonts/arial.ttf';
      const winArialBold = 'C:/Windows/Fonts/arialbd.ttf';
      if (fs.existsSync(winArialReg) && fs.existsSync(winArialBold)) {
        try {
          doc.registerFont('CustomRegular', winArialReg);
          doc.registerFont('CustomBold', winArialBold);
        } catch (e) {
          console.error("Error registering custom fonts:", e);
        }
      }

      const drawLetterhead = (targetDoc) => {
        // Save text state manually using public properties/methods to avoid corrupting internal state
        const savedFontName = targetDoc._font ? targetDoc._font.name : null;
        const savedFontSize = targetDoc._fontSize;
        const savedColor = targetDoc._fillColor ? targetDoc._fillColor[0] : null;

        targetDoc.save()
          .moveTo(0, 0)
          .lineTo(130, 0)
          .lineTo(70, 110)
          .lineTo(0, 110)
          .closePath()
          .fill('#1a408c');

        targetDoc.moveTo(135, 0)
          .lineTo(155, 0)
          .lineTo(95, 110)
          .lineTo(75, 110)
          .closePath()
          .fill('#f1a80a')
          .restore();

        const circularLogoPath = path.join(__dirname, '..', 'uploads', 'main-logo.jpg');
        if (fs.existsSync(circularLogoPath)) {
          targetDoc.save();
          targetDoc.circle(86, 60, 36).clip();
          targetDoc.image(circularLogoPath, 50, 24, { width: 72, height: 72 });
          targetDoc.restore();

          targetDoc.circle(86, 60, 36)
            .lineWidth(3)
            .strokeColor('#ffffff')
            .stroke();
        }

        const rightMargin = 10;
        const textWidth = 340;
        const startX = targetDoc.page.width - rightMargin - textWidth;

        targetDoc.fillColor('#1a408c')
          .font('Helvetica-Bold')
          .fontSize(12)
          .text('Contractum Integral Solution Pvt. Limited', startX, 25, { align: 'right', width: textWidth })
          .font('Helvetica')
          .fontSize(8.5)
          .fillColor('#1a408c')
          .text('Head office: Plot No.169, Ground Floor, Ganesh Nagar, Kota Rajasthan', startX, 42, { align: 'right', width: textWidth })
          .text('Pin: 324005, Phone: +91-9216654754', startX, 56, { align: 'right', width: textWidth })
          .text('Email address: jitendra@thecontractum.com', startX, 68, { align: 'right', width: textWidth })
          .text('Website: www.thecontractum.com', startX, 80, { align: 'right', width: textWidth })
          .font('Helvetica-Bold')
          .text('CIN: U72900RJ2017PTC057530', startX, 92, { align: 'right', width: textWidth });

        targetDoc.strokeColor('#1a408c')
          .lineWidth(2)
          .moveTo(0, 115)
          .lineTo(targetDoc.page.width, 115)
          .stroke();

        const watermarkPath = path.join(__dirname, '..', 'uploads', 'main-logo.jpg');
        if (fs.existsSync(watermarkPath)) {
          targetDoc.save()
            .opacity(0.08);
          const wmWidth = 320;
          const wmHeight = 320;
          const wmX = (targetDoc.page.width - wmWidth) / 2;
          const wmY = (targetDoc.page.height - wmHeight) / 2;
          targetDoc.image(watermarkPath, wmX, wmY, { width: wmWidth, height: wmHeight });
          targetDoc.restore();
        }

        // Restore text state using public APIs to avoid corrupting text stream formatting state
        if (savedFontName) {
          try {
            targetDoc.font(savedFontName);
          } catch (e) {
            targetDoc.font('Helvetica');
          }
        }
        if (savedFontSize) {
          targetDoc.fontSize(savedFontSize);
        }
        if (savedColor) {
          try {
            targetDoc.fillColor(savedColor);
          } catch (e) {
            targetDoc.fillColor('#1f2937');
          }
        }

        targetDoc.x = 50;
        targetDoc.y = 135;
      };

      doc.on('pageAdded', () => {
        drawLetterhead(doc);
      });

      drawLetterhead(doc);

      let cleanContent = contract.content || '';
      cleanContent = cleanContent.replace(/\{\{company_logo\}\}/g, '');
      cleanContent = stripLetterhead(cleanContent);
      cleanContent = cleanContent.replace(/<h2[^>]*>Contractum Integral Solution Pvt\. Limited<\/h2>/gi, '');

      const tokens = parseHTMLToPDFKitTokens(cleanContent);

      let inShadedBox = false;
      let boxStartY = null;
      let boxBgColor = null;
      let boxBorderColor = null;

      for (const token of tokens) {
        if (token.type === 'shaded-box-start') {
          inShadedBox = true;
          boxBgColor = token.bgColor;
          boxBorderColor = token.borderColor;
          doc.moveDown(0.4);
          boxStartY = doc.y;
          continue;
        }

        if (token.type === 'shaded-box-end') {
          if (inShadedBox) {
            inShadedBox = false;
            doc.x = doc.page.margins.left;
            doc.moveDown(0.4);

            const boxX = doc.page.margins.left;
            const boxW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            const boxH = doc.y - boxStartY;

            doc.save();
            doc.fillColor(boxBgColor)
              .fillOpacity(0.08)
              .rect(boxX, boxStartY, boxW, boxH)
              .fill();

            doc.strokeColor(boxBorderColor)
              .lineWidth(4)
              .opacity(1.0)
              .moveTo(boxX, boxStartY)
              .lineTo(boxX, doc.y)
              .stroke();
            doc.restore();

            doc.moveDown(0.5);
          }
          continue;
        }

        if (token.type === 'blank-line') {
          doc.moveDown(0.6);
          continue;
        }

        if (token.type === 'heading') {
          doc.moveDown(0.5);

          const drawX = inShadedBox ? (doc.page.margins.left + 15) : doc.page.margins.left;
          const colWidth = inShadedBox ? (doc.page.width - doc.page.margins.left - doc.page.margins.right - 30) : null;
          doc.x = drawX;

          doc.fillColor(token.color || '#0284c7')
            .fontSize(token.size || 14);
          renderStyledText(doc, token.text, colWidth, true, token.align);

          if (token.size && token.size <= 13) {
            doc.moveDown(0.2);
            doc.strokeColor(token.color || '#cbd5e1')
              .lineWidth(0.5)
              .moveTo(doc.x, doc.y)
              .lineTo(doc.page.width - doc.page.margins.right, doc.y)
              .stroke();
          }

          doc.x = doc.page.margins.left;
          doc.moveDown(0.5);
        } else if (token.type === 'paragraph') {
          if (doc.y > 700) {
            doc.addPage();
          }
          const cleanStr = stripHtmlTags(token.text).trim();
          const isSalutation = /^(?:dear|respected|hi|hello)[\s,]/i.test(cleanStr);

          if (isSalutation) {
            doc.moveDown(1.2);
          }

          const drawX = inShadedBox ? (doc.page.margins.left + 15) : doc.page.margins.left;
          const colWidth = inShadedBox ? (doc.page.width - doc.page.margins.left - doc.page.margins.right - 30) : null;
          doc.x = drawX;

          doc.fillColor(token.color || '#1f2937')
            .fontSize(token.size || 10);
          renderStyledText(doc, token.text, colWidth, false, token.align);

          doc.x = doc.page.margins.left;

          const isShort = cleanStr.length < 80;
          const endsWithTerminator = /[.!?:]$/.test(cleanStr);

          if (isShort && !endsWithTerminator && !isSalutation) {
            doc.moveDown(0.25);
          } else {
            doc.moveDown(0.65);
          }
        } else if (token.type === 'list-item') {
          if (doc.y > 700) {
            doc.addPage();
          }
          const indent = inShadedBox ? 35 : 20;
          const drawX = doc.page.margins.left + indent;
          const colWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right - indent - (inShadedBox ? 15 : 0);

          doc.x = drawX;
          doc.fillColor(token.color || '#1f2937')
            .fontSize(token.size || 10);

          // Render bold list item prefix (bullet or index number)
          const resolvedBoldFont = 'CustomBold';
          try {
            doc.font(resolvedBoldFont);
          } catch (e) {
            doc.font('Helvetica-Bold');
          }
          doc.text(token.prefix, { continued: true });

          renderStyledText(doc, token.text, colWidth, false, token.align);

          doc.x = doc.page.margins.left;
          doc.moveDown(0.5);
        } else if (token.type === 'divider') {
          const drawWidth = token.width || 150;
          const startX = (doc.page.width - drawWidth) / 2;
          doc.moveDown(0.2);
          doc.strokeColor(token.color || '#0284c7')
            .lineWidth(3)
            .moveTo(startX, doc.y)
            .lineTo(startX + drawWidth, doc.y)
            .stroke();
          doc.moveDown(0.6);
        } else if (token.type === 'table') {
          doc.moveDown(1.0);
          if (doc.y > 680) {
            doc.addPage();
          }

          const totalWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

          for (const row of token.rows) {
            const startY = doc.y;
            let cellX = doc.page.margins.left;
            const cellsCount = row.length;

            const colWidths = [];
            if (cellsCount === 3) {
              colWidths.push(totalWidth * 0.45);
              colWidths.push(totalWidth * 0.10);
              colWidths.push(totalWidth * 0.45);
            } else {
              for (let i = 0; i < cellsCount; i++) {
                colWidths.push(totalWidth / cellsCount);
              }
            }

            // Detect signature row and find column indices for Sincerely and Accepted By
            let isSignatureRow = false;
            let sincerelyCellIndex = -1;
            let acceptedByCellIndex = -1;

            for (let idx = 0; idx < cellsCount; idx++) {
              const cellTokens = row[idx];
              if (cellTokens && cellTokens.length > 0) {
                const firstTokenText = cellTokens[0].text || '';
                if (typeof firstTokenText === 'string') {
                  if (firstTokenText.includes('Sincerely')) sincerelyCellIndex = idx;
                  if (firstTokenText.includes('Accepted By')) acceptedByCellIndex = idx;
                }
              }
            }

            if (sincerelyCellIndex !== -1 && acceptedByCellIndex !== -1) {
              isSignatureRow = true;
            }

            let maxEndY = startY;

            for (let i = 0; i < cellsCount; i++) {
              const cellTokens = row[i];
              const colWidth = colWidths[i];

              if (!cellTokens || cellTokens.length === 0) {
                cellX += colWidth;
                continue;
              }

              doc.x = cellX;
              doc.y = startY;

              if (isSignatureRow && i === acceptedByCellIndex) {
                // Shift "Accepted By:" down to align with the company name on the left (usually startY + 16)
                doc.y = startY + 16;
              }

              for (const cellToken of cellTokens) {
                if (cellToken.type === 'heading') {
                  doc.moveDown(0.2);
                  doc.fillColor(cellToken.color || '#0284c7')
                    .fontSize(cellToken.size || 10);
                  renderStyledText(doc, cellToken.text, colWidth - 10, true);
                  doc.moveDown(0.2);
                } else if (cellToken.type === 'paragraph' || cellToken.type === 'list-item') {
                  const text = cellToken.text.trim();

                  if (text.includes('Narendra Singh') || text.includes('Intern Signature') || text.includes('Employee Signature') || text.includes('Authorized HR Signatory')) {
                    if (doc.y < startY + 75) {
                      doc.y = startY + 75;
                    }
                    doc.strokeColor('#cbd5e1')
                      .lineWidth(1)
                      .moveTo(doc.x, doc.y + 2)
                      .lineTo(doc.x + colWidth - 20, doc.y + 2)
                      .stroke();
                    doc.moveDown(0.8);
                  }

                  doc.fillColor(cellToken.color || '#1f2937')
                    .fontSize(cellToken.size || 9.5);
                  renderStyledText(doc, cellToken.text, colWidth - 10);
                  doc.moveDown(0.4);
                }
              }

              if (doc.y > maxEndY) {
                maxEndY = doc.y;
              }
              cellX += colWidth;
            }

            doc.x = doc.page.margins.left;
            doc.y = maxEndY + 10;
          }
        }
      }

      if (contract.signature && contract.signature.isSigned) {
        doc.moveDown(2);
        doc.strokeColor('#e5e7eb')
          .lineWidth(1)
          .moveTo(50, doc.y)
          .lineTo(562, doc.y)
          .stroke();
        doc.moveDown(1);

        doc.fillColor('#1f2937')
          .fontSize(12)
          .text('DIGITAL SIGNATURE VERIFICATION', { bold: true });
        doc.fontSize(10)
          .fillColor('#4b5563')
          .text(`Signed By: ${contract.signature.signatureName}`)
          .text(`Signed At: ${new Date(contract.signature.signedAt).toLocaleString()}`)
          .text(`IP Address: ${contract.signature.signatureIp || 'N/A'}`);

        if (contract.signature.signatureImage) {
          try {
            doc.moveDown(1);
            doc.text('Signature Drawing:');
            doc.moveDown(0.5);
            const base64Data = contract.signature.signatureImage.replace(/^data:image\/\w+;base64,/, "");
            const dataBuffer = Buffer.from(base64Data, 'base64');
            doc.image(dataBuffer, { width: 150 });
          } catch (imageErr) {
            console.error('Failed to embed signature image in PDF:', imageErr);
          }
        }
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

async function sendContractEmailHelper(contract) {
  let employeeName = 'Recipient';
  let toEmail = null;

  if (contract.employeeId) {
    let employee = null;
    if (contract.employeeId.email) {
      employee = contract.employeeId;
    } else {
      const User = require('../models/User');
      employee = await User.findById(contract.employeeId);
    }
    if (employee && employee.email) {
      toEmail = employee.email;
      employeeName = employee.name || `${employee.firstName || ''} ${employee.lastName || ''}`.trim() || 'Employee';
    }
  } else if (contract.customRecipient && contract.customRecipient.email) {
    toEmail = contract.customRecipient.email;
    employeeName = contract.customRecipient.name || 'Recipient';
  }

  if (!toEmail) return false;

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  const pdfBuffer = await generateContractPDF(contract, employeeName);
  const pdfName = `${contract.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

  let subject = `Congratulations from The Contractum: ${contract.title}`;
  let congratulatoryHeader = "Congratulations & Warm Welcome!";
  let congratulatoryMessage = `We want to extend our heartfelt congratulations to you on this milestone in your professional association with <strong>The Contractum</strong>. We wish you the absolute best and look forward to a mutually beneficial and highly successful relationship.`;
  let actionInstructions = `Please find your contract/agreement document attached below. We request you to review it carefully. If you have any questions or require clarifications, please contact our Human Resources department.`;

  if (contract.status === 'Pending_Signature') {
    subject = `Congratulations & Action Required - Offer Letter: ${contract.title}`;
    congratulatoryHeader = "Congratulations & Warm Welcome!";
    congratulatoryMessage = `On behalf of the entire team at <strong>The Contractum</strong>, we want to congratulate you on your selection! We are absolutely thrilled about the prospect of you joining us. We believe your unique skills, background, and energy will be a fantastic addition to our organization, and we look forward to building a highly successful future together.`;
    actionInstructions = `Your official contract is ready for your signature. Please log into the portal to review the terms and sign the document digitally at your earliest convenience. A copy of the contract is attached below as a PDF for your convenience.`;
  } else if (contract.status === 'Active') {
    subject = `Warm Welcome to the Team! Contract Active: ${contract.title}`;
    congratulatoryHeader = "Welcome to The Contractum Family!";
    congratulatoryMessage = `It is with great pleasure that we officially welcome you to <strong>The Contractum</strong>! Your contract has been signed and is now fully executed and active. We wish you an incredibly rewarding, productive, and inspiring journey ahead with us. We are excited to collaborate and achieve new milestones together.`;
    actionInstructions = `A copy of your fully executed agreement with digital signature verification is attached to this email as a PDF for your official records.`;
  }

  await transporter.sendMail({
    from: `"The Contractum" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: subject,
    html: `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:650px;margin:0 auto;background-color:#f1f5f9;padding:40px 20px;">
  <div style="background:linear-gradient(135deg, #1e5cdc 0%, #4f46e5 100%);color:white;padding:32px;border-radius:16px 16px 0 0;text-align:center;box-shadow:0 4px 10px rgba(30,92,220,0.15);">
    <h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.5px;text-transform:uppercase;">The Contractum</h1>
    <p style="margin:6px 0 0;opacity:0.85;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Official Contract Notification</p>
  </div>
  
  <div style="background-color:#ffffff;padding:40px 32px;border-radius:0 0 16px 16px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);">
    <h2 style="color:#0f172a;font-size:20px;font-weight:700;margin-top:0;margin-bottom:20px;">Dear ${employeeName},</h2>
    
    <div style="background-color:#eff6ff;border-left:4px solid #1e5cdc;padding:20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
      <h3 style="margin:0 0 8px 0;color:#1e5cdc;font-size:15px;font-weight:700;">✨ ${congratulatoryHeader}</h3>
      <p style="margin:0;font-size:14px;color:#1e3a8a;line-height:1.6;text-align:justify;">
        ${congratulatoryMessage}
      </p>
    </div>

    <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:24px;text-align:justify;">
      ${actionInstructions}
    </p>

    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:28px;">
      <h4 style="color:#1e5cdc;font-size:15px;font-weight:700;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:0.5px;">Document Summary</h4>
      <table style="width:100%;font-size:13px;color:#475569;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;font-weight:600;color:#0f172a;width:120px;">Title:</td>
          <td style="padding:6px 0;">${contract.title}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:600;color:#0f172a;">Category:</td>
          <td style="padding:6px 0;">${contract.category}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:600;color:#0f172a;">Type:</td>
          <td style="padding:6px 0;">${contract.type}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-weight:600;color:#0f172a;">Status:</td>
          <td style="padding:6px 0;"><span style="background-color:#dcfce7;color:#15803d;padding:2px 8px;border-radius:9999px;font-weight:700;font-size:11px;text-transform:uppercase;">${contract.status.replace('_', ' ')}</span></td>
        </tr>
      </table>
    </div>

    <div style="text-align:center;margin:32px 0 16px 0;">
      <a href="http://localhost:5173" style="display:inline-block;background-color:#1e5cdc;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 4px 6px rgba(30,92,220,0.25);transition:background-color 0.2s;">
        Go to Portal
      </a>
    </div>

    <hr style="border:0;border-top:1px solid #e2e8f0;margin:32px 0 24px 0;" />

    <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 4px 0;">Warmest regards,</p>
    <p style="font-size:14px;color:#0f172a;font-weight:700;margin:0 0 2px 0;">The Talent Acquisition & HR Team</p>
    <p style="font-size:13px;color:#64748b;margin:0;">Contractum Integral Solution Pvt. Limited</p>
  </div>
  
  <p style="color:#94a3b8;font-size:11px;text-align:center;margin-top:24px;line-height:1.5;">
    This is an automated administrative notification from The Contractum platform.<br />
    Please do not reply directly to this email. For any support, contact hr@thecontractum.com.
  </p>
</div>
        `,
    attachments: [
      {
        filename: pdfName,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  });
  return true;
}

router.generateContractPDF = generateContractPDF;
module.exports = router;
