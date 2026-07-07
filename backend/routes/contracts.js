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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #1e5cdc, #6366f1);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Contract of Employment ("Agreement") is executed and made effective as of <strong>{{start_date}}</strong>, by and between:</p>

<div style="background-color:#f8fafc;border-left:4px solid #1e5cdc;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#0f172a;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">First Party (Employer):</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, a company incorporated under the laws of India, having its principal place of business at {{company_address}} (hereinafter referred to as the "Company").</p>
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
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Contractum Pvt. Ltd.</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #7c3aed, #a78bfa);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Internship Agreement ("Agreement") is made and entered into on <strong>{{start_date}}</strong>, by and between:</p>

<div style="background-color:#fcfaff;border-left:4px solid #7c3aed;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#5b21b6;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, having its principal place of business at {{company_address}} (hereinafter referred to as the "Company").</p>
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
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Contractum Pvt. Ltd.</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #d97706, #fbbf24);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Freelance Services & NDA Agreement ("Agreement") is executed on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#fffbeb;border-left:4px solid #d97706;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#78350f;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Client:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, having its registered office at {{company_address}} (hereinafter referred to as the "Client").</p>
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
      <p style="margin:0 0 45px 0;font-weight:700;color:#0f172a;">For The Contractum Pvt. Ltd.</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #0d9488, #2dd4bf);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Vendor Service Agreement ("Agreement") is executed on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f0fdfa;border-left:4px solid #0d9488;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#115e59;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, having its principal office at {{company_address}} (hereinafter referred to as the "Company").</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #6366f1, #818cf8);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Consulting Services Agreement ("Agreement") is made on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f5f3ff;border-left:4px solid #6366f1;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#4338ca;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Client:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, having its registered office at {{company_address}} (hereinafter referred to as the "Client").</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #f59e0b, #fbbf24);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Probationary Employment Contract is entered into on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#fffbeb;border-left:4px solid #f59e0b;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#78350f;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, having its principal office at {{company_address}} (hereinafter referred to as the "Company").</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #10b981, #34d399);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Remote Work Agreement ("Agreement") is made on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f0fdf4;border-left:4px solid #10b981;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#065f46;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Company:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong>, having its principal office at {{company_address}} (hereinafter referred to as the "Company").</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #ec4899, #f472b6);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This Memorandum of Understanding ("MOU") is entered into on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#fdf2f8;border-left:4px solid #ec4899;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#9d174d;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">First Party:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong> ("Party A"), having its registered office at {{company_address}}.</p>
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
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #3b82f6, #60a5fa);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>Dear <strong>{{employee_name}}</strong>,</p>

<p>We are delighted to extend to you an offer of employment with <strong>The Contractum Private Limited</strong>. We were highly impressed by your qualifications, skills, and experience during the interview process, and we are confident that you will play a vital role in our growth and success.</p>

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
        name: 'SaaS Agreement',
        type: 'SaaS Agreement',
        category: 'Software & IT Contracts',
        description: 'Software-as-a-Service subscription agreement outlining access license, platform fees, billing schedule, and data security.',
        content: `<div style="font-family:Georgia,serif;max-width:850px;margin:0 auto;color:#1e293b;line-height:1.8;padding:20px;">
<div style="text-align:center;margin-bottom:30px;">
  <h1 style="font-size:26px;font-weight:800;color:#3b82f6;margin:0;letter-spacing:-0.5px;text-transform:uppercase;">SaaS Subscription Agreement</h1>
  <p style="font-size:12px;color:#64748b;margin:5px 0 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">The Contractum Private Limited</p>
  <div style="height:3px;background:linear-gradient(to right, #3b82f6, #60a5fa);margin:15px auto 0 auto;width:150px;"></div>
</div>

<p style="text-align:right;font-size:14px;color:#64748b;"><strong>Date:</strong> {{start_date}}</p>

<p>This SaaS Subscription Agreement ("Agreement") is executed on <strong>{{start_date}}</strong> by and between:</p>

<div style="background-color:#f0fdfa;border-left:4px solid #3b82f6;padding:15px;margin:20px 0;border-radius:0 12px 12px 0;">
  <p style="margin:0 0 10px 0;font-weight:700;color:#1e3a8a;text-transform:uppercase;font-size:12px;letter-spacing:0.5px;">The Provider:</p>
  <p style="margin:0;font-size:14px;"><strong>The Contractum Private Limited</strong> ("Provider"), having its principal office at {{company_address}}.</p>
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
        const bulkOps = PROFESSIONAL_TEMPLATES.map(template => ({
            updateOne: {
                filter: { name: template.name },
                update: { $set: { ...template, isActive: true } },
                upsert: true
            }
        }));
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
            .select('name firstName lastName email jobTitle department');

        const created = [];
        for (const emp of employees) {
            const empName = emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
            let content = template.content;
            const replacements = {
                '{{employee_name}}': empName,
                '{{position}}': emp.jobTitle || 'Employee',
                '{{department}}': emp.department || 'General',
                '{{company_name}}': 'The Contractum Private Limited',
                '{{company_address}}': 'India',
                '{{start_date}}': validFrom ? new Date(validFrom).toLocaleDateString('en-IN', { year:'numeric',month:'long',day:'numeric'}) : '___',
                '{{end_date}}': validUntil ? new Date(validUntil).toLocaleDateString('en-IN', { year:'numeric',month:'long',day:'numeric'}) : '___',
                '{{salary}}': '___',
                '{{employee_address}}': '___',
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

function parseHTMLToPDFKitTokens(html) {
    const tokens = [];
    let cleanHtml = html
        .replace(/\r?\n/g, ' ')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/p>/gi, '</p>\n')
        .replace(/<\/h[1-6]>/gi, '</h1>\n');
        
    const lines = cleanHtml.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        const headingMatch = line.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
        if (headingMatch) {
            const text = stripHtmlTags(headingMatch[1]);
            if (text) tokens.push({ type: 'heading', text });
            continue;
        }
        
        const text = stripHtmlTags(line);
        if (text) {
            tokens.push({ type: 'paragraph', text });
        }
    }
    return tokens;
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
            
            // Header
            doc.fillColor('#1e5cdc')
               .fontSize(22)
               .text('THE CONTRACTUM', { align: 'center' });
            
            doc.fillColor('#4b5563')
               .fontSize(10)
               .text('Official Contract Document', { align: 'center' });
            
            doc.moveDown(1.5);
            
            doc.strokeColor('#e5e7eb')
               .lineWidth(1)
               .moveTo(50, doc.y)
               .lineTo(562, doc.y)
               .stroke();
            
            doc.moveDown(1);
            
            doc.fillColor('#1f2937')
               .fontSize(14)
               .text(`Title: ${contract.title}`, { bold: true });
               
            doc.fontSize(10)
               .fillColor('#4b5563')
               .text(`Recipient: ${employeeName}`)
               .text(`Type: ${contract.type}`)
               .text(`Category: ${contract.category || 'Employment & HR Contracts'}`)
               .text(`Status: ${contract.status}`)
               .text(`Date Generated: ${new Date().toLocaleDateString()}`);
            
            doc.moveDown(1);
            
            doc.strokeColor('#e5e7eb')
               .lineWidth(1)
               .moveTo(50, doc.y)
               .lineTo(562, doc.y)
               .stroke();
            
            doc.moveDown(1.5);
            
            const tokens = parseHTMLToPDFKitTokens(contract.content || '');
            for (const token of tokens) {
                if (token.type === 'heading') {
                    doc.moveDown(0.5);
                    doc.fillColor('#1e5cdc')
                       .fontSize(14)
                       .text(token.text, { bold: true });
                    doc.moveDown(0.5);
                } else if (token.type === 'paragraph') {
                    doc.fillColor('#1f2937')
                       .fontSize(10)
                       .text(token.text, { lineGap: 4, align: 'justify' });
                    doc.moveDown(0.8);
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
    <p style="font-size:13px;color:#64748b;margin:0;">The Contractum Private Limited</p>
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

module.exports = router;
