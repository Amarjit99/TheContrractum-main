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
        type: 'Employee',
        description: 'Full-time employment agreement covering compensation, duties, and termination.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #1e5cdc;padding-bottom:12px;color:#1e5cdc;">EMPLOYMENT AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Employment Agreement ("Agreement") is entered into as of <strong>{{start_date}}</strong>, by and between:</p>
<p><strong>The Contractum Private Limited</strong>, a company incorporated under the laws of India, having its registered office at {{company_address}} (hereinafter referred to as the <em>"Company"</em>), and</p>
<p><strong>{{employee_name}}</strong>, residing at {{employee_address}} (hereinafter referred to as the <em>"Employee"</em>).</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">1. POSITION AND DUTIES</h2>
<p>The Company hereby employs the Employee in the capacity of <strong>{{position}}</strong> within the <strong>{{department}}</strong> department. The Employee agrees to perform all duties and responsibilities as assigned by the Company from time to time, adhering to the Company's policies and code of conduct.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">2. COMMENCEMENT AND DURATION</h2>
<p>This Agreement shall commence on <strong>{{start_date}}</strong> and shall continue unless terminated by either party in accordance with the provisions herein.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">3. COMPENSATION</h2>
<p>The Employee shall receive a gross monthly salary of <strong>{{salary}}</strong>, subject to applicable tax deductions and statutory contributions. Salary shall be disbursed on or before the last working day of each month.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">4. WORKING HOURS</h2>
<p>The Employee shall work a standard of 8 hours per day, 5 days a week, Monday through Friday. Overtime, if required, shall be compensated per Company policy.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">5. CONFIDENTIALITY</h2>
<p>The Employee agrees to maintain strict confidentiality regarding all proprietary information, trade secrets, business strategies, and client data acquired during the term of employment. This obligation shall survive the termination of this Agreement.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">6. INTELLECTUAL PROPERTY</h2>
<p>All work products, inventions, software, or intellectual property developed by the Employee in the course of employment shall be the exclusive property of the Company.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">7. TERMINATION</h2>
<p>Either party may terminate this Agreement with a written notice of <strong>30 days</strong>. The Company reserves the right to terminate immediately for gross misconduct, breach of policy, or dishonesty, without notice or severance.</p>

<h2 style="color:#1e5cdc;font-size:15px;margin-top:24px;">8. GOVERNING LAW</h2>
<p>This Agreement shall be governed by and construed in accordance with the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in {{company_city}}.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Employee Signature</p></div>
</div>
</div>`
    },
    {
        name: 'Internship Agreement',
        type: 'Intern',
        description: 'Educational internship terms covering duration, stipend, and learning objectives.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #7c3aed;padding-bottom:12px;color:#7c3aed;">INTERNSHIP AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Internship Agreement is made on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> (the "Company") and <strong>{{employee_name}}</strong> (the "Intern").</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">1. INTERNSHIP ROLE</h2>
<p>The Intern will serve as a <strong>{{position}}</strong> intern in the <strong>{{department}}</strong> department from <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong>.</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">2. LEARNING OBJECTIVES</h2>
<p>The internship is designed to provide practical exposure and skill development. The Intern will work under a designated mentor and receive guidance on real-world projects aligned with their field of study.</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">3. STIPEND</h2>
<p>The Intern shall receive a monthly stipend of <strong>{{salary}}</strong>. This stipend does not constitute a salary and the Intern is not entitled to employment benefits.</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">4. WORKING HOURS</h2>
<p>The Intern is expected to work 6–8 hours per day during regular business days. Flexible arrangements may be discussed with the reporting manager.</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">5. CONDUCT AND CONFIDENTIALITY</h2>
<p>The Intern agrees to maintain professional conduct and treat all Company information as strictly confidential during and after the internship period.</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">6. CERTIFICATION</h2>
<p>Upon successful completion, the Intern will receive an official internship certificate and letter of recommendation, subject to performance review.</p>

<h2 style="color:#7c3aed;font-size:15px;margin-top:24px;">7. TERMINATION</h2>
<p>Either party may terminate this agreement with 7 days written notice. Termination for misconduct may be immediate.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Intern Signature</p></div>
</div>
</div>`
    },
    {
        name: 'Freelancer / NDA Agreement',
        type: 'Freelancer',
        description: 'Freelance service agreement with NDA clause, scope of work, and payment terms.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #d97706;padding-bottom:12px;color:#d97706;">FREELANCE SERVICE & NON-DISCLOSURE AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Agreement is entered into on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> (the "Client") and <strong>{{employee_name}}</strong> (the "Freelancer").</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">1. SCOPE OF WORK</h2>
<p>The Freelancer agrees to deliver services as defined in the Statement of Work (SOW) for the role of <strong>{{position}}</strong>. Work must meet agreed quality standards and timelines.</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">2. ENGAGEMENT PERIOD</h2>
<p>This engagement shall be effective from <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong> unless extended in writing by both parties.</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">3. PAYMENT TERMS</h2>
<p>The agreed compensation is <strong>{{salary}}</strong> payable upon milestone completion or as per the agreed payment schedule. Late delivery may result in proportional deductions.</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">4. CONFIDENTIALITY (NDA)</h2>
<p>The Freelancer agrees that all information shared by the Client — including business strategies, source code, client data, pricing, and proprietary methodologies — is confidential. The Freelancer shall not disclose, reproduce, or use such information for any purpose other than fulfilling this Agreement. This clause remains in effect for <strong>3 years</strong> post-termination.</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">5. INTELLECTUAL PROPERTY</h2>
<p>All deliverables, including designs, code, and content, created under this Agreement shall become the exclusive property of the Client upon final payment.</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">6. INDEPENDENT CONTRACTOR</h2>
<p>The Freelancer is an independent contractor and not an employee of the Client. The Freelancer is solely responsible for their own taxes and insurance.</p>

<h2 style="color:#d97706;font-size:15px;margin-top:24px;">7. TERMINATION</h2>
<p>Either party may terminate with 14 days notice. Work completed up to termination date shall be compensated on a pro-rata basis.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Freelancer Signature</p></div>
</div>
</div>`
    },
    {
        name: 'Vendor Service Agreement',
        type: 'Vendor',
        description: 'Vendor/supplier contract covering deliverables, SLA, payment, and liability.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #0d9488;padding-bottom:12px;color:#0d9488;">VENDOR SERVICE AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Vendor Agreement ("Agreement") is entered into on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> (the "Company") and <strong>{{employee_name}}</strong> (the "Vendor").</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">1. SERVICES</h2>
<p>The Vendor agrees to provide <strong>{{position}}</strong> services as described in the attached Statement of Work. Services must conform to agreed specifications and delivery schedules.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">2. CONTRACT PERIOD</h2>
<p>This Agreement is effective from <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong> and may be renewed by mutual written consent.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">3. PAYMENT TERMS</h2>
<p>The Company shall pay the Vendor <strong>{{salary}}</strong> per the agreed schedule. Invoices must be submitted with supporting documentation. Payment shall be processed within 30 days of invoice approval.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">4. SERVICE LEVEL AGREEMENT (SLA)</h2>
<p>The Vendor shall maintain a minimum uptime/delivery rate of 99% for all contracted services. Penalties for SLA breach shall be as outlined in the SLA Addendum.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">5. CONFIDENTIALITY</h2>
<p>The Vendor shall treat all Company data, processes, and client information as strictly confidential and shall implement appropriate technical and organizational security measures.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">6. COMPLIANCE</h2>
<p>The Vendor shall comply with all applicable laws, regulations, and data protection requirements, including the Information Technology Act, 2000 and its amendments.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">7. LIABILITY</h2>
<p>The Vendor's total liability shall not exceed the total fees paid in the 3 months preceding the claim. Neither party shall be liable for indirect, consequential, or incidental damages.</p>

<h2 style="color:#0d9488;font-size:15px;margin-top:24px;">8. TERMINATION</h2>
<p>Either party may terminate with 30 days written notice. The Company may terminate immediately for material breach without liability.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Vendor Representative</p></div>
</div>
</div>`
    },
    {
        name: 'Consulting Agreement',
        type: 'Freelancer',
        description: 'Professional consulting services agreement with deliverables and IP clauses.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #6366f1;padding-bottom:12px;color:#6366f1;">CONSULTING SERVICES AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Consulting Services Agreement ("Agreement") is made on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> ("Client") and <strong>{{employee_name}}</strong> ("Consultant").</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">1. CONSULTING SERVICES</h2>
<p>The Consultant shall provide expert advisory and consulting services in the capacity of <strong>{{position}}</strong> for the <strong>{{department}}</strong> division. Services include strategic analysis, recommendations, and deliverables as mutually agreed in writing.</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">2. TERM</h2>
<p>This Agreement shall be effective from <strong>{{start_date}}</strong> through <strong>{{end_date}}</strong> and may be renewed upon written mutual consent prior to expiry.</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">3. FEES & INVOICING</h2>
<p>The Client agrees to pay the Consultant a fee of <strong>{{salary}}</strong> as agreed. Invoices shall be submitted monthly with an itemized activity log and paid within 15 business days of receipt.</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">4. INDEPENDENT CONTRACTOR STATUS</h2>
<p>The Consultant is an independent contractor. Nothing in this Agreement shall create an employment, agency, or partnership relationship. The Consultant bears sole responsibility for taxes and statutory deductions.</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">5. CONFIDENTIALITY & NON-COMPETE</h2>
<p>The Consultant agrees to keep all Client information strictly confidential for a period of <strong>2 years</strong> following the termination of this Agreement. The Consultant shall not engage with direct competitors during the engagement period.</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">6. DELIVERABLES & IP</h2>
<p>All reports, analyses, presentations, or tools produced under this Agreement are the intellectual property of the Client upon final payment.</p>

<h2 style="color:#6366f1;font-size:15px;margin-top:24px;">7. TERMINATION</h2>
<p>Either party may terminate this Agreement with 14 days written notice. The Client may terminate immediately for breach of confidentiality without further obligation.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Consultant Signature</p></div>
</div>
</div>`
    },
    {
        name: 'Probationary Employment Contract',
        type: 'Employee',
        description: 'Employment contract for probation period with performance review clause.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #f59e0b;padding-bottom:12px;color:#f59e0b;">PROBATIONARY EMPLOYMENT AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Probationary Employment Agreement is entered into on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> (the "Company") and <strong>{{employee_name}}</strong> (the "Employee").</p>

<h2 style="color:#f59e0b;font-size:15px;margin-top:24px;">1. POSITION & PROBATION PERIOD</h2>
<p>The Employee is appointed as <strong>{{position}}</strong> in the <strong>{{department}}</strong> department on a probationary basis commencing <strong>{{start_date}}</strong> for a period of <strong>90 days</strong>, ending on <strong>{{end_date}}</strong>.</p>

<h2 style="color:#f59e0b;font-size:15px;margin-top:24px;">2. PERFORMANCE REVIEW</h2>
<p>The Employee's performance will be formally reviewed at the end of the probation period. Confirmation of employment is subject to satisfactory performance, attendance, and conduct during this period.</p>

<h2 style="color:#f59e0b;font-size:15px;margin-top:24px;">3. COMPENSATION DURING PROBATION</h2>
<p>During the probation period, the Employee shall receive a gross monthly salary of <strong>{{salary}}</strong>. Benefits and increments applicable to confirmed employees shall apply only upon successful confirmation.</p>

<h2 style="color:#f59e0b;font-size:15px;margin-top:24px;">4. DUTIES & RESPONSIBILITIES</h2>
<p>The Employee is expected to perform all assigned duties diligently, comply with Company policies, maintain professional conduct, and meet performance benchmarks set by the reporting manager.</p>

<h2 style="color:#f59e0b;font-size:15px;margin-top:24px;">5. TERMINATION DURING PROBATION</h2>
<p>Either party may terminate this Agreement during the probation period with <strong>7 days</strong> written notice, or immediately in cases of gross misconduct. The Company reserves the right to extend the probation period by up to 30 additional days if required.</p>

<h2 style="color:#f59e0b;font-size:15px;margin-top:24px;">6. CONFIDENTIALITY</h2>
<p>The Employee agrees to maintain complete confidentiality of all Company data, processes, and client information both during and after the probation period.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">HR / Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Employee Signature</p></div>
</div>
</div>`
    },
    {
        name: 'Remote Work Agreement',
        type: 'Employee',
        description: 'Work-from-home policy agreement covering equipment, security, and productivity expectations.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #10b981;padding-bottom:12px;color:#10b981;">REMOTE WORK AGREEMENT</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Remote Work Agreement ("Agreement") is made on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> ("Company") and <strong>{{employee_name}}</strong> ("Employee") employed as <strong>{{position}}</strong> in the <strong>{{department}}</strong> department.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">1. REMOTE WORK ARRANGEMENT</h2>
<p>The Company authorizes the Employee to work remotely from their home or a pre-approved location effective <strong>{{start_date}}</strong>. This arrangement may be modified or revoked with 7 days notice.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">2. WORKING HOURS & AVAILABILITY</h2>
<p>The Employee shall maintain regular working hours of 9:00 AM to 6:00 PM IST, Monday through Friday, and shall be available via designated communication channels (email, Slack, video calls) during these hours.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">3. PRODUCTIVITY & DELIVERABLES</h2>
<p>The Employee is expected to meet all KPIs, deadlines, and deliverables as assigned. Weekly check-ins with the reporting manager are mandatory. Performance metrics shall be tracked via the Company's project management tools.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">4. EQUIPMENT & EXPENSES</h2>
<p>The Employee is responsible for maintaining a reliable internet connection and appropriate workspace. Company-provided equipment must be used solely for business purposes and returned upon termination of employment.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">5. DATA SECURITY</h2>
<p>The Employee shall ensure all Company data is protected using approved security tools (VPN, encrypted storage). Sharing of credentials or Company data with unauthorized persons is strictly prohibited.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">6. COMPENSATION</h2>
<p>The Employee shall continue to receive a monthly salary of <strong>{{salary}}</strong> as per existing employment terms. No additional allowances for remote work are provided unless separately agreed in writing.</p>

<h2 style="color:#10b981;font-size:15px;margin-top:24px;">7. REVIEW & TERMINATION OF ARRANGEMENT</h2>
<p>This remote work arrangement shall be reviewed quarterly. The Company reserves the right to require office attendance at any time with reasonable notice.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Employee Signature</p></div>
</div>
</div>`
    },
    {
        name: 'MOU – Partnership Agreement',
        type: 'Vendor',
        description: 'Memorandum of Understanding for institutional or business partnerships.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #ec4899;padding-bottom:12px;color:#ec4899;">MEMORANDUM OF UNDERSTANDING (MOU)</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p>This Memorandum of Understanding is entered into on <strong>{{start_date}}</strong> between <strong>The Contractum Private Limited</strong> ("Party A") and <strong>{{employee_name}}</strong> ("Party B").</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">1. PURPOSE</h2>
<p>The parties intend to collaborate in the area of <strong>{{position}}</strong> to achieve mutual business objectives, share resources, and leverage combined expertise for the benefit of both organizations.</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">2. SCOPE OF COLLABORATION</h2>
<p>The collaboration shall include joint initiatives, co-branding opportunities, knowledge sharing, and resource pooling as mutually agreed. Specific deliverables and timelines shall be defined in separate Statements of Work.</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">3. DURATION</h2>
<p>This MOU shall be effective from <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong> and may be renewed by written mutual agreement. Either party may withdraw with 30 days written notice.</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">4. FINANCIAL TERMS</h2>
<p>Unless separately agreed, each party shall bear its own costs. Revenue sharing, if applicable, shall be defined at <strong>{{salary}}</strong> or as per a separately executed commercial agreement.</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">5. CONFIDENTIALITY</h2>
<p>Both parties agree to maintain strict confidentiality regarding all shared information, strategies, client data, and proprietary materials. This obligation shall survive for 3 years post-termination.</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">6. NON-BINDING NATURE</h2>
<p>This MOU represents a statement of intent and does not constitute a legally binding contract unless supplemented by a formal agreement. Neither party shall have any legal obligation to the other solely on the basis of this MOU.</p>

<h2 style="color:#ec4899;font-size:15px;margin-top:24px;">7. DISPUTE RESOLUTION</h2>
<p>Any disputes arising from this MOU shall be resolved through mutual discussion and mediation before resorting to legal proceedings.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized Signatory</p></div>
  <div><p><strong>{{employee_name}}</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Partner Representative</p></div>
</div>
</div>`
    },
    {
        name: 'Official Offer Letter',
        type: 'Employee',
        description: 'Standard professional offer letter with compensation, role details, and joining requirements.',
        content: `<div style="font-family:Georgia,serif;max-width:800px;margin:0 auto;color:#1a1a1a;line-height:1.8;">
<h1 style="text-align:center;font-size:22px;font-weight:700;border-bottom:2px solid #3b82f6;padding-bottom:12px;color:#3b82f6;">OFFICIAL OFFER LETTER</h1>
<p style="text-align:center;color:#666;font-size:13px;">The Contractum Private Limited</p>
<br/>
<p><strong>Date:</strong> {{start_date}}</p>
<p><strong>To:</strong> {{employee_name}}</p>
<p><strong>Address:</strong> {{employee_address}}</p>
<br/>
<p>Dear <strong>{{employee_name}}</strong>,</p>
<p>We are thrilled to offer you the full-time position of <strong>{{position}}</strong> in our <strong>{{department}}</strong> department at <strong>The Contractum Private Limited</strong>. We were incredibly impressed by your background and are confident you will make a fantastic addition to our team!</p>

<h2 style="color:#3b82f6;font-size:15px;margin-top:24px;">1. POSITION & START DATE</h2>
<p>You will be reporting to the Department Head. Your anticipated start date is <strong>{{start_date}}</strong>, and your primary work location will be our main office in {{company_city}} (or Remote as mutually agreed).</p>

<h2 style="color:#3b82f6;font-size:15px;margin-top:24px;">2. COMPENSATION & BENEFITS</h2>
<p>Your starting salary will be <strong>{{salary}}</strong> per annum/month, subject to applicable tax deductions. In addition, you will be eligible for standard company benefits including health insurance, paid time off, and performance bonuses as detailed in the Employee Handbook.</p>

<h2 style="color:#3b82f6;font-size:15px;margin-top:24px;">3. CONDITIONS OF EMPLOYMENT</h2>
<p>This offer is contingent upon the successful completion of a background check, reference checks, and your ability to provide proof of identity and eligibility to work in the relevant jurisdiction. You will also be required to sign a Confidentiality and Non-Disclosure Agreement (NDA) on your start date.</p>

<h2 style="color:#3b82f6;font-size:15px;margin-top:24px;">4. AT-WILL EMPLOYMENT (If Applicable)</h2>
<p>Please note that this offer letter is not a contract of guaranteed employment for any specific duration. Your employment will be subject to a standard probation period as per company policy.</p>

<br/>
<p>If you choose to accept this offer, please sign and return this letter by <strong>{{end_date}}</strong>. If we do not receive your signed acceptance by this date, the offer will be automatically withdrawn.</p>
<p>We are very excited to welcome you to the team and look forward to a mutually rewarding professional relationship.</p>

<br/><br/>
<div style="display:flex;justify-content:space-between;margin-top:48px;">
  <div><p><strong>For The Contractum Pvt. Ltd.</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">Authorized HR Signatory</p></div>
  <div><p><strong>Accepted By:</strong></p><br/><br/><p style="border-top:1px solid #333;padding-top:4px;width:200px;">{{employee_name}}</p></div>
</div>
</div>`
    }
];

// ---------- Templates ----------

// Get all templates (returns all for admin, seeds professional ones if DB is empty)
router.get('/templates', protect, checkSubRole(['Legal', 'HR', 'Manager']), async (req, res) => {
    try {
        let templates = await ContractTemplate.find({ isActive: true });
        if (templates.length < PROFESSIONAL_TEMPLATES.length) {
            // Use bulkWrite with upsert to avoid duplicate key errors
            const bulkOps = PROFESSIONAL_TEMPLATES.map(template => ({
                updateOne: {
                    filter: { name: template.name },
                    update: { $setOnInsert: { ...template, isActive: true } },
                    upsert: true
                }
            }));
            await ContractTemplate.bulkWrite(bulkOps);
            // Fix any existing templates that missed the default value
            await ContractTemplate.updateMany({ isActive: { $exists: false } }, { $set: { isActive: true } });
            templates = await ContractTemplate.find({ isActive: true });
        }
        res.json(templates);
    } catch (err) {
        console.error("Error fetching/seeding templates:", err);
        res.status(500).json({ message: 'Error fetching templates', error: err.message });
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
router.post('/', protect, adminOnly, async (req, res) => {
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
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        let query = {};
        const category = getContractRoleCategory(req.user);

        // Filter based on what the role needs to see ONLY if pendingOnly or pendingFinal is specified
        if (req.query.pendingOnly === 'true') {
            if (category === 'Manager') query.status = 'Pending_Manager';
            else if (category === 'HR') query.status = 'Pending_HR';
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
router.put('/:id/approve', protect, adminOnly, async (req, res) => {
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
router.put('/:id/reject', protect, adminOnly, async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) return res.status(404).json({ message: 'Contract not found' });

        contract.status = 'Rejected';
        contract.approvals.push({
            role: req.user.role === 'super-admin' ? 'SuperAdmin' : req.user.adminSubRole,
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

// Get a single contract by ID
router.get('/:id', protect, adminOnly, async (req, res) => {
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
router.put('/:id', protect, adminOnly, async (req, res) => {
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

// Delete a contract (only Draft or Rejected)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) return res.status(404).json({ message: 'Contract not found' });
        if (!['Draft', 'Rejected'].includes(contract.status)) {
            return res.status(403).json({ message: 'Only Draft or Rejected contracts can be deleted.' });
        }
        await Contract.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contract deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ── Email a contract to the employee ────────────────────────────
router.post('/:id/send-email', protect, adminOnly, async (req, res) => {
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
router.post('/bulk-generate', protect, adminOnly, async (req, res) => {
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
                type: type || template.type || 'Employee',
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
router.get('/expiry-alerts', protect, adminOnly, async (req, res) => {
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
            }
            
            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

async function sendContractEmailHelper(contract) {
    let employee = null;
    if (contract.employeeId && contract.employeeId.email) {
        employee = contract.employeeId;
    } else {
        const User = require('../models/User');
        employee = await User.findById(contract.employeeId);
    }
    if (!employee || !employee.email) return false;
    
    const toEmail = employee.email;
    const employeeName = employee.name || `${employee.firstName || ''} ${employee.lastName || ''}`.trim() || 'Employee';
    
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    
    const pdfBuffer = await generateContractPDF(contract, employeeName);
    const pdfName = `${contract.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    
    let subject = `Your Contract: ${contract.title}`;
    let introText = `Please find your contract document attached below. Review it carefully and contact HR if you have any questions.`;
    
    if (contract.status === 'Pending_Signature') {
        subject = `Awaiting Your Signature: ${contract.title}`;
        introText = `Your contract is ready for your signature. Please log into the portal to sign it digitally. A copy of the contract is attached as a PDF.`;
    } else if (contract.status === 'Active') {
        subject = `Contract Executed & Active: ${contract.title}`;
        introText = `Congratulations! Your contract has been signed and is now active. A copy of the executed contract with digital signature verification is attached as a PDF.`;
    }
    
    await transporter.sendMail({
        from: `"The Contractum" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: subject,
        html: `
<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:16px;">
  <div style="background:#1e5cdc;color:white;padding:24px 32px;border-radius:12px 12px 0 0;margin:-32px -32px 32px;">
    <h1 style="margin:0;font-size:20px;">The Contractum</h1>
    <p style="margin:4px 0 0;opacity:0.8;font-size:13px;">Official Contract Notification</p>
  </div>
  <p style="font-size:16px;">Dear <strong>${employeeName}</strong>,</p>
  <p>${introText}</p>
  <div style="background:white;border-radius:12px;padding:24px;margin:20px 0;border:1px solid #e5e7eb;">
    <h2 style="color:#1e5cdc;font-size:16px;margin:0 0 8px;">${contract.title}</h2>
    <p style="color:#6b7280;font-size:13px;margin:0;">Type: ${contract.type} | Status: ${contract.status}</p>
  </div>
  <div style="background:white;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin:20px 0;line-height:1.6;max-height: 400px; overflow-y: auto;">
    ${contract.content}
  </div>
  <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:32px;">
    This is an automated email from The Contractum system. Please do not reply to this email.
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
