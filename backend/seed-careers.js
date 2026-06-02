const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');
const JobApplication = require('./models/JobApplication');

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is not defined in backend/.env!");
  process.exit(1);
}

const JOBS_DATA = [
  {
    title: "Software Development Engineer (SDE II)",
    department: "Technology",
    location: "Remote / Bengaluru",
    type: "Full-Time",
    posted: "2 days ago",
    tags: ["React.js", "Node.js", "MongoDB", "AWS / Cloud"],
    applications: 8,
    status: "Active",
    jobId: "JB-TECH-021",
    roles: [
      "Design, build and maintain scalable full-stack web applications.",
      "Write high-quality, reusable, and testable code.",
      "Collaborate with product managers and UI/UX designers to translate requirements to interactive features.",
      "Optimize application performance and database queries."
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "AWS"],
    qualification: "B.Tech/B.E. in Computer Science or equivalent field",
    experience: "3 - 5 years of professional experience",
    salary: "₹12,00,000 - ₹18,00,000 P.A.",
    benefits: ["Comprehensive Medical Insurance", "Flexible Working Hours", "Skill Development Budget", "Annual Performance Bonuses"],
    startDate: "2026-05-15",
    endDate: "2026-06-15"
  },
  {
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "Hybrid (Delhi NCR)",
    type: "Full-Time",
    posted: "5 days ago",
    tags: ["Figma / UI Design", "Prototyping", "User Research", "Wireframing"],
    applications: 5,
    status: "Active",
    jobId: "JB-DSGN-003",
    roles: [
      "Lead user research sessions to gather user insights and requirements.",
      "Create high-fidelity wireframes, UI mockups, and interactive prototypes in Figma.",
      "Establish and expand the enterprise design system.",
      "Conduct usability testing and iterate designs based on real user feedback."
    ],
    skills: ["Figma", "Adobe XD", "User Research", "Interaction Design", "Prototyping"],
    qualification: "Bachelor's/Master's in Graphic Design, UI/UX, or related area",
    experience: "4+ years of UX design experience for SaaS products",
    salary: "₹10,00,000 - ₹15,00,000 P.A.",
    benefits: ["High-end workstation setup", "Work from Home allowance", "Mental health wellness programs"],
    startDate: "2026-05-10",
    endDate: "2026-06-10"
  },
  {
    title: "SEO Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-Time",
    posted: "Yesterday",
    tags: ["SEO Specialist", "Google Analytics", "Keyword Research", "Link Building"],
    applications: 4,
    status: "Active",
    jobId: "JB-MKT-087",
    roles: [
      "Perform ongoing keyword discovery, expansion, and optimization.",
      "Track, report, and analyze website analytics and PPC campaigns.",
      "Optimize copy and landing pages for search engine optimization.",
      "Implement SEO recommendations and link building strategies."
    ],
    skills: ["SEO", "Google Analytics", "Ahrefs", "Semrush", "Keyword Research"],
    qualification: "Any Graduate with certification in Digital Marketing/SEO",
    experience: "2 - 4 years of SEO experience",
    salary: "₹6,00,000 - ₹9,00,000 P.A.",
    benefits: ["Internet & co-working allowance", "Flexible hours", "Paid certifications"],
    startDate: "2026-05-20",
    endDate: "2026-06-20"
  },
  {
    title: "HR Executive",
    department: "HR",
    location: "Bengaluru, India",
    type: "Full-Time",
    posted: "1 week ago",
    tags: ["Recruitment Assistance", "Employee Coordination", "HR Documentation"],
    applications: 3,
    status: "Active",
    jobId: "JB-HR-009",
    roles: [
      "Manage end-to-end recruitment lifecycle for various job profiles.",
      "Coordinate interview schedules and communicate with shortlisted candidates.",
      "Prepare HR documentation, offer letters, and onboarding files.",
      "Maintain employee records and assist in employee engagement activities."
    ],
    skills: ["Recruitment", "HR Coordination", "Communication", "Sourcing", "Onboarding"],
    qualification: "MBA in HR / Post-Graduation in Human Resource Management",
    experience: "1 - 3 years of HR operations/recruitment experience",
    salary: "₹5,00,000 - ₹7,50,000 P.A.",
    benefits: ["Corporate discounts", "Comprehensive healthcare package", "Annual company retreats"],
    startDate: "2026-05-08",
    endDate: "2026-06-08"
  },
  {
    title: "Operations Executive",
    department: "Operations",
    location: "Mumbai, India",
    type: "Full-Time",
    posted: "3 days ago",
    tags: ["Workflow Execution", "Operations Support", "Process Coordination"],
    applications: 3,
    status: "Active",
    jobId: "JB-OPS-012",
    roles: [
      "Monitor daily business workflows and coordinate between departments.",
      "Assist the operations manager in process supervision and audits.",
      "Compile daily operational reports and identify bottlenecks.",
      "Maintain vendor databases and coordinate service deliveries."
    ],
    skills: ["Operations Support", "Workflow Coordination", "MS Excel", "Reporting"],
    qualification: "Bachelor's Degree in Business Administration, Commerce, or related fields",
    experience: "1 - 2 years of business operations support",
    salary: "₹4,50,000 - ₹6,00,000 P.A.",
    benefits: ["Overtime compensations", "Free daily catered lunches", "Transport allowance"],
    startDate: "2026-05-18",
    endDate: "2026-06-18"
  },
  {
    title: "Sales Executive",
    department: "Sales",
    location: "Remote",
    type: "Full-Time",
    posted: "4 days ago",
    tags: ["Lead Follow-Up", "Client Communication", "Sales Conversion"],
    applications: 2,
    status: "Active",
    jobId: "JB-SLS-044",
    roles: [
      "Follow up on leads generated through digital marketing campaigns.",
      "Schedule and conduct platform demos for prospective enterprise clients.",
      "Negotiate and close contracts to meet monthly sales targets.",
      "Update client communication logs in the CRM platform."
    ],
    skills: ["B2B Sales", "Client Communication", "CRM", "Negotiation", "Lead Conversion"],
    qualification: "Any graduate with strong verbal communication skills",
    experience: "2 - 5 years in software/SaaS B2B sales",
    salary: "₹6,00,000 - ₹10,00,000 P.A. + Uncapped Commissions",
    benefits: ["Performance commissions", "Internet expense reimbursement", "Medical benefits"],
    startDate: "2026-05-12",
    endDate: "2026-06-12"
  },
  {
    title: "Legal Associate (Compliance)",
    department: "Legal",
    location: "Hybrid (Bengaluru)",
    type: "Full-Time",
    posted: "10 days ago",
    tags: ["Legal Documentation", "Contract Management", "Compliance Monitoring"],
    applications: 3,
    status: "Active",
    jobId: "JB-LGL-002",
    roles: [
      "Draft, review, and negotiate enterprise SaaS and non-disclosure contracts.",
      "Ensure business operations comply with data privacy laws and regulations.",
      "Assist in preparation of legal audits and risk assessment reports.",
      "Organize and maintain the internal contract templates repository."
    ],
    skills: ["Contract Drafting", "Legal Compliance", "Privacy Laws", "Risk Assessment"],
    qualification: "LL.B. or LL.M. from a recognized law school",
    experience: "2+ years of corporate legal/compliance experience",
    salary: "₹8,00,000 - ₹12,00,000 P.A.",
    benefits: ["Legal bar association fees covered", "Flexible hybrid schedule", "Life insurance"],
    startDate: "2026-05-05",
    endDate: "2026-06-05"
  },
  {
    title: "Web Developer Intern",
    department: "Technology",
    location: "Remote",
    type: "Internship",
    posted: "Today",
    tags: ["React.js", "JavaScript", "HTML & CSS", "Git & CI/CD"],
    applications: 5,
    status: "Active",
    jobId: "JB-INT-102",
    roles: [
      "Develop and test front-end features in React.js under mentor guidance.",
      "Fix bugs, write clean code, and participate in code reviews.",
      "Assist in website SEO updates and portal optimizations.",
      "Create documentation for components and API integrations."
    ],
    skills: ["React.js", "JavaScript", "HTML/CSS", "Git", "Responsive Design"],
    qualification: "Pursuing or recently completed B.E./B.Tech/MCA in CS/IT",
    experience: "Prior academic/personal projects in React are required",
    salary: "₹15,000 - ₹25,000 per month (Stipend)",
    benefits: ["Internship Certificate", "Pre-Placement Offer (PPO) opportunities", "One-on-one mentorship"],
    startDate: "2026-05-25",
    endDate: "2026-06-25"
  }
];

const APPLICATIONS_DATA = [
  {
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    jobTitle: "Software Development Engineer (SDE II)",
    resume: "/uploads/resumes/mock_resume_1.pdf",
    coverLetter: "I have 4 years of experience building Node.js microservices and React dashboards. I'd love to join The Contractum team.",
    status: "Shortlisted",
    category: "Technology",
    subcategory: "Software Developer",
    rating: 4,
    assignedHR: "HR Administrator",
    hrNotes: "Solid technical background. Deep understanding of MERN stack. Ready for technical round.",
    interviewDate: "2026-06-01",
    interviewTime: "11:00 AM",
    interviewStatus: "Scheduled",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [
      { type: "Email", message: "Congratulations! You have been shortlisted for SDE II. Let's schedule an interview.", sender: "System / HR", sentAt: new Date(Date.now() - 48 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 3600000)
  },
  {
    fullName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    jobTitle: "Software Development Engineer (SDE II)",
    resume: "/uploads/resumes/mock_resume_2.pdf",
    coverLetter: "I'm a full stack developer with 3.5 years of experience in AWS, React, and Node.js.",
    status: "Interview Scheduled",
    category: "Technology",
    subcategory: "Software Developer",
    rating: 5,
    assignedHR: "HR Administrator",
    hrNotes: "Excellent resume. Scored 95% in coding test. High communication capability.",
    interviewDate: "2026-05-30",
    interviewTime: "02:30 PM",
    interviewStatus: "Scheduled",
    documentVerificationStatus: "Verified",
    offerLetterStatus: "Not Sent",
    communicationLogs: [
      { type: "Email", message: "Interview scheduled on 30th May at 2:30 PM. Meet link sent.", sender: "System / HR", sentAt: new Date(Date.now() - 24 * 3600000) },
      { type: "WhatsApp", message: "Hi Priya, just a reminder about your interview tomorrow.", sender: "HR Executive", sentAt: new Date(Date.now() - 12 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 4 * 24 * 3600000)
  },
  {
    fullName: "Rohan Das",
    email: "rohan.das@example.com",
    phone: "+91 76543 21098",
    jobTitle: "Software Development Engineer (SDE II)",
    resume: "/uploads/resumes/mock_resume_3.pdf",
    coverLetter: "Keen to apply my engineering skills to build contract management systems.",
    status: "New",
    category: "Technology",
    subcategory: "Web Developer",
    rating: 0,
    assignedHR: "",
    hrNotes: "",
    interviewDate: "",
    interviewTime: "",
    interviewStatus: "Pending",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [],
    createdAt: new Date(Date.now() - 2 * 3600000)
  },
  {
    fullName: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "+91 99887 76655",
    jobTitle: "Senior UI/UX Designer",
    resume: "/uploads/resumes/mock_resume_4.pdf",
    coverLetter: "Attached is my design portfolio. I love working on glassmorphic and minimal SaaS interfaces.",
    status: "HR Discussion",
    category: "Design",
    subcategory: "UI/UX Designer",
    rating: 4,
    assignedHR: "HR Manager",
    hrNotes: "Design portfolio is stunning. Finished technical interview, now discussing salary and benefits.",
    interviewDate: "2026-05-28",
    interviewTime: "10:00 AM",
    interviewStatus: "Completed",
    documentVerificationStatus: "Verified",
    offerLetterStatus: "Not Sent",
    communicationLogs: [
      { type: "Email", message: "Great speaking with you. We are reviewing compensation package now.", sender: "HR Manager", sentAt: new Date(Date.now() - 3 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 8 * 24 * 3600000)
  },
  {
    fullName: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 88776 65544",
    jobTitle: "Senior UI/UX Designer",
    resume: "/uploads/resumes/mock_resume_5.pdf",
    coverLetter: "My designs focus on design systems and developer handoff efficiency.",
    status: "Selected",
    category: "Design",
    subcategory: "UI/UX Designer",
    rating: 5,
    assignedHR: "HR Manager",
    hrNotes: "Unanimous Yes from the interview panel. Outstanding designer. Release offer letter.",
    interviewDate: "2026-05-26",
    interviewTime: "04:00 PM",
    interviewStatus: "Completed",
    documentVerificationStatus: "Verified",
    offerLetterStatus: "Sent",
    communicationLogs: [
      { type: "Email", message: "Offer letter generated and sent to email. Please accept within 3 days.", sender: "System / HR", sentAt: new Date(Date.now() - 6 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 3600000)
  },
  {
    fullName: "Neha Mehta",
    email: "neha.m@example.com",
    phone: "+91 77665 54433",
    jobTitle: "SEO Specialist",
    status: "Under Review",
    category: "Marketing",
    subcategory: "SEO Specialist",
    rating: 3,
    assignedHR: "HR Executive",
    hrNotes: "Has good knowledge of on-page optimization. Portfolio lists 3 high traffic blogs.",
    interviewDate: "",
    interviewTime: "",
    interviewStatus: "Pending",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [],
    createdAt: new Date(Date.now() - 1 * 24 * 3600000)
  },
  {
    fullName: "Karan Singh",
    email: "karan.singh@example.com",
    phone: "+91 66554 43322",
    jobTitle: "SEO Specialist",
    status: "Rejected",
    category: "Marketing",
    subcategory: "SEO Specialist",
    rating: 2,
    assignedHR: "HR Executive",
    hrNotes: "Mainly worked on black-hat techniques and link farming. Not a good fit for quality branding.",
    interviewDate: "2026-05-27",
    interviewTime: "12:00 PM",
    interviewStatus: "Completed",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [
      { type: "Email", message: "Thank you for your application, however we have decided to pursue other profiles.", sender: "System / HR", sentAt: new Date(Date.now() - 12 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 3600000)
  },
  {
    fullName: "Sanjana Roy",
    email: "sanjana.roy@example.com",
    phone: "+91 95544 33221",
    jobTitle: "HR Executive",
    status: "Shortlisted",
    category: "HR",
    subcategory: "HR Executive",
    rating: 4,
    assignedHR: "HR Manager",
    hrNotes: "Smart recruiter. Sourced profiles for key technical roles. Strong communication.",
    interviewDate: "2026-06-02",
    interviewTime: "12:30 PM",
    interviewStatus: "Scheduled",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [
      { type: "Email", message: "We would like to call you for a round of HR interview. Confirm availability.", sender: "System / HR", sentAt: new Date(Date.now() - 20 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 6 * 24 * 3600000)
  },
  {
    fullName: "Amit Verma",
    email: "amit.verma@example.com",
    phone: "+91 84433 22110",
    jobTitle: "Operations Executive",
    status: "New",
    category: "Operations",
    subcategory: "Operations Executive",
    rating: 0,
    assignedHR: "",
    hrNotes: "",
    interviewDate: "",
    interviewTime: "",
    interviewStatus: "Pending",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [],
    createdAt: new Date(Date.now() - 12 * 3600000)
  },
  {
    fullName: "Rajesh Rao",
    email: "rajesh.r@example.com",
    phone: "+91 73322 11009",
    jobTitle: "Sales Executive",
    status: "On Hold",
    category: "Sales",
    subcategory: "Sales Executive",
    rating: 3,
    assignedHR: "HR Manager",
    hrNotes: "Good background, but currently on hold due to sales head availability.",
    interviewDate: "",
    interviewTime: "",
    interviewStatus: "Pending",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [],
    createdAt: new Date(Date.now() - 7 * 24 * 3600000)
  },
  {
    fullName: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 92211 00998",
    jobTitle: "Legal Associate (Compliance)",
    status: "Selected",
    category: "Legal",
    subcategory: "Compliance Executive",
    rating: 5,
    assignedHR: "HR Manager",
    hrNotes: "Has excellent knowledge of SaaS contracts and legal documentation verification. Accepted offer.",
    interviewDate: "2026-05-24",
    interviewTime: "11:00 AM",
    interviewStatus: "Completed",
    documentVerificationStatus: "Verified",
    offerLetterStatus: "Accepted",
    communicationLogs: [
      { type: "Email", message: "Welcome to The Contractum! Your onboarding is scheduled for next Monday.", sender: "System / HR", sentAt: new Date(Date.now() - 24 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 12 * 24 * 3600000)
  },
  {
    fullName: "Saurabh Mishra",
    email: "saurabh.m@example.com",
    phone: "+91 81100 99887",
    jobTitle: "Web Developer Intern",
    status: "Shortlisted",
    category: "Internship Programs",
    subcategory: "Web Developer",
    rating: 4,
    assignedHR: "HR Executive",
    hrNotes: "React self-taught intern. Built a beautiful portfolio website. Eager to learn.",
    interviewDate: "2026-05-29",
    interviewTime: "04:30 PM",
    interviewStatus: "Scheduled",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [
      { type: "Email", message: "Your coding test was successful. Shortlisted for final interview round.", sender: "System / HR", sentAt: new Date(Date.now() - 15 * 3600000) }
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 3600000)
  },
  {
    fullName: "Divya Shah",
    email: "divya.shah@example.com",
    phone: "+91 90088 77665",
    jobTitle: "Web Developer Intern",
    status: "New",
    category: "Internship Programs",
    subcategory: "UI/UX Designer",
    rating: 0,
    assignedHR: "",
    hrNotes: "",
    interviewDate: "",
    interviewTime: "",
    interviewStatus: "Pending",
    documentVerificationStatus: "Pending",
    offerLetterStatus: "Not Sent",
    communicationLogs: [],
    createdAt: new Date(Date.now() - 4 * 3600000)
  }
];

async function seed() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(mongoUri);
    console.log("✅ Database Connected.");

    console.log("Clearing existing Jobs...");
    await Job.deleteMany({});
    console.log("Clearing existing Job Applications...");
    await JobApplication.deleteMany({});

    console.log(`Seeding ${JOBS_DATA.length} Jobs...`);
    const seededJobs = await Job.insertMany(JOBS_DATA);
    console.log(`✅ Seeded ${seededJobs.length} Jobs successfully.`);

    console.log(`Seeding ${APPLICATIONS_DATA.length} Applications...`);
    const seededApps = await JobApplication.insertMany(APPLICATIONS_DATA);
    console.log(`✅ Seeded ${seededApps.length} Applications successfully.`);

    console.log("🎉 Seeding Completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed with error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
}

seed();
