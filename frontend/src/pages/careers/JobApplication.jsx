import { useParams, useNavigate } from "react-router-dom";
import {
    MapPin, Briefcase, Clock, DollarSign, Award, GraduationCap,
    TrendingUp, Gift, FileText, ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { COUNTRIES } from "../../constants/countries";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Common static content shown on every job application page ───
const STATIC_BENEFITS = [
    'Comprehensive Health Insurance (Medical, Dental, Vision)',
    'Flexible working hours and hybrid/remote work options',
    'Annual professional development & certification budget',
    'Performance bonuses and growth-linked incentives',
    'Collaborative culture with regular team events & outings',
];

const STATIC_APPLICATION_PROCESS = [
    'Submit your application with resume and cover letter',
    'Initial screening call with our HR team (15–20 mins)',
    'Technical / domain-specific assessment or case study',
    'Interview round with the hiring manager / team lead',
    'Final round with leadership and culture-fit discussion',
    'Offer letter and onboarding within 7 business days',
];

const JOB_DETAIL_TEMPLATES = [
    {
        match: /business development manager/i,
        roles: [
            'Identify and create new business opportunities',
            'Build long-term client relationships and partnerships',
            'Work with internal teams to convert leads into revenue',
            'Prepare proposals, pitches, and sales follow-ups',
            'Track pipeline progress and hit monthly targets',
        ],
        skills: ['Sales Strategy', 'Client Communication', 'Lead Generation', 'Negotiation', 'CRM Tools'],
        qualification: 'Bachelor’s degree in Business, Marketing, or a related field',
        experience: '1–5 years of experience in business development or sales',
        salary: 'Competitive salary with incentives based on performance',
    },
    {
        match: /content writer/i,
        roles: [
            'Write engaging blogs, website copy, and campaign content',
            'Research topics and create SEO-friendly drafts',
            'Collaborate with designers and marketers on content plans',
            'Edit and proofread for clarity, tone, and accuracy',
        ],
        skills: ['Content Writing', 'SEO', 'Editing', 'Research', 'Storytelling'],
        qualification: 'Any undergraduate degree with strong writing skills',
        experience: 'Freshers and early-career writers can apply',
        salary: 'Stipend or project-based compensation depending on experience',
    },
    {
        match: /corporate ambassador/i,
        roles: [
            'Represent TheContractum across college and community events',
            'Drive brand awareness and student engagement',
            'Coordinate outreach campaigns with the marketing team',
            'Share opportunities and collect referrals',
        ],
        skills: ['Communication', 'Networking', 'Brand Representation', 'Event Coordination'],
        qualification: 'Current student or recent graduate with strong communication skills',
        experience: 'No prior work experience required',
        salary: 'Performance incentives with certificate and recommendation support',
    },
    {
        match: /social media marketer/i,
        roles: [
            'Plan and manage daily social media content',
            'Grow engagement across Instagram, LinkedIn, and other channels',
            'Track performance metrics and optimize campaigns',
            'Create content ideas that align with brand goals',
        ],
        skills: ['Social Media', 'Content Creation', 'Analytics', 'Canva', 'Campaign Planning'],
        qualification: 'Any degree; marketing or media background is a plus',
        experience: '0–2 years of social media or digital marketing experience',
        salary: 'Stipend plus performance-based growth opportunities',
    },
    {
        match: /social media internship/i,
        roles: [
            'Support day-to-day social media execution',
            'Create posts, captions, and simple creatives',
            'Engage with audiences and monitor responses',
            'Learn campaign tracking and performance analysis',
        ],
        skills: ['Social Media', 'Content Creation', 'Learning Mindset', 'Analytics'],
        qualification: 'Open to students and recent graduates',
        experience: 'No experience required',
        salary: 'Internship with certificate and mentorship support',
    },
    {
        match: /software development engineer \(sde i\)/i,
        roles: [
            'Build and ship front-end and back-end features',
            'Write clean, maintainable code',
            'Participate in code reviews and debugging',
            'Collaborate with product and design teams',
        ],
        skills: ['React.js', 'JavaScript', 'Node.js', 'MongoDB', 'REST APIs'],
        qualification: 'B.Tech / B.E. in Computer Science or equivalent',
        experience: '0–2 years of software development experience',
        salary: 'Competitive full-time compensation',
    },
    {
        match: /software development engineer \(sde ii\)/i,
        roles: [
            'Lead the delivery of complex features end-to-end',
            'Mentor junior engineers and improve code quality',
            'Design scalable backend and frontend systems',
            'Drive technical discussions and architecture decisions',
        ],
        skills: ['System Design', 'React.js', 'Node.js', 'Databases', 'AWS'],
        qualification: 'B.Tech / M.Tech in Computer Science or equivalent',
        experience: '2–5 years of relevant development experience',
        salary: 'Competitive compensation with growth opportunities',
    },
    {
        match: /backend developer|sde iii/i,
        roles: [
            'Architect scalable backend services and APIs',
            'Optimize performance, reliability, and observability',
            'Lead backend development standards and reviews',
            'Work closely with product teams on technical feasibility',
        ],
        skills: ['Backend Architecture', 'Microservices', 'Node.js', 'Kubernetes', 'Databases'],
        qualification: 'B.Tech / M.Tech / MCA in Computer Science or equivalent',
        experience: '5+ years of backend engineering experience',
        salary: 'Senior-level compensation with leadership growth',
    },
];

const getJobDetailTemplate = (title = '', department = '') => {
    const source = `${title} ${department}`;
    return JOB_DETAIL_TEMPLATES.find(template => template.match.test(source)) || null;
};

// Static job bios for the hardcoded careers (ids 1-9)
const staticJobsData = {
    1: {
        title: "Senior Business Development Manager (BDM)",
        company: "TheContractum",
        location: "India",
        type: "Full-Time",
        roles: [
            "Identify and develop new business opportunities",
            "Build and maintain strong client relationships",
            "Lead contract negotiations and deal closures",
            "Collaborate with internal teams to deliver solutions",
            "Achieve monthly and quarterly revenue targets",
        ],
        skills: ["Sales Strategy", "Enterprise Sales", "CRM Tools", "Negotiation", "Leadership", "Market Research"],
        qualification: "Bachelor's degree in Business, Management, or related field",
        experience: "5+ years in BD/Sales with 2+ years in a senior role",
        salary: "₹10,00,000 – ₹16,00,000 per annum + incentives",
        benefits: [
            "Performance-based incentives",
            "Health Insurance",
            "Travel allowances",
            "Professional development budget",
            "Flexible working hours",
        ],
    },
    2: {
        title: "Junior Business Development Manager (BDM)",
        company: "TheContractum",
        location: "India",
        type: "Full-Time",
        roles: [
            "Assist in identifying new business opportunities",
            "Support senior BDM in maintaining client relationships",
            "Conduct market research and competitor analysis",
            "Prepare proposals and presentations",
            "Achieve assigned sales targets",
        ],
        skills: ["B2B Sales", "Networking", "Communication", "Research", "MS Office"],
        qualification: "Bachelor's degree in Business or related field",
        experience: "1–3 years of sales or business development experience",
        salary: "₹5,00,000 – ₹8,00,000 per annum + incentives",
        benefits: [
            "Performance bonuses",
            "Health Insurance",
            "Learning & development support",
            "Collaborative work environment",
        ],
    },
    3: {
        title: "Content Writer (YTDP)",
        company: "TheContractum",
        location: "Remote",
        type: "Part-Time",
        roles: [
            "Create engaging and SEO-optimized content",
            "Write blogs, articles, and social media posts",
            "Support the Young Talent Development Program content needs",
            "Proofread and edit content for accuracy and clarity",
        ],
        skills: ["Creative Writing", "SEO", "Research", "Editing", "Content Strategy"],
        qualification: "Pursuing or completed any undergraduate degree",
        experience: "Fresher or up to 1 year of writing experience",
        salary: "Stipend based (Part-Time / YTDP)",
        benefits: [
            "Remote work flexibility",
            "Certificate of internship",
            "Mentorship from professionals",
            "Portfolio-building opportunity",
        ],
    },
    4: {
        title: "Corporate Ambassador (YTDP)",
        company: "TheContractum",
        location: "Remote",
        type: "Part-Time",
        roles: [
            "Represent TheContractum in college events and platforms",
            "Build brand awareness among student communities",
            "Coordinate with the marketing team for campaigns",
            "Generate leads through referrals and networking",
        ],
        skills: ["Branding", "Communication", "Networking", "Social Media", "Presentation"],
        qualification: "Currently enrolled in any undergraduate program",
        experience: "No prior experience required",
        salary: "Stipend + performance incentives",
        benefits: [
            "Flexible schedule",
            "Certificate + letter of recommendation",
            "Opportunity for pre-placement offer",
        ],
    },
    5: {
        title: "Social Media Marketer (YTDP)",
        company: "TheContractum",
        location: "Remote",
        type: "Part-Time",
        roles: [
            "Manage and grow social media profiles",
            "Create creative content for Instagram, LinkedIn, Twitter",
            "Track engagement metrics and produce reports",
            "Run targeted social media campaigns",
        ],
        skills: ["Social Media Marketing", "Content Creation", "Analytics", "Canva", "Engagement Strategy"],
        qualification: "Pursuing any degree; marketing background preferred",
        experience: "0–1 year; personal social media presence is a plus",
        salary: "Stipend + performance bonus",
        benefits: [
            "Remote & flexible working",
            "Certificate of completion",
            "Learn from experienced marketers",
        ],
    },
    6: {
        title: "Social Media Internship Program (YTDP)",
        company: "TheContractum",
        location: "Worldwide",
        type: "Internship",
        roles: [
            "Assist in social media strategy and execution",
            "Create multimedia content for global platforms",
            "Engage with international audiences",
            "Analyse and report performance metrics",
        ],
        skills: ["Social Media", "Content Writing", "Canva / Adobe Tools", "Analytics", "Research"],
        qualification: "Open to students worldwide (undergraduate / postgraduate)",
        experience: "No experience required — training provided",
        salary: "Unpaid internship with certificate",
        benefits: [
            "Global exposure and networking",
            "Certificate + LOR",
            "Mentorship program",
            "Flexible time commitment",
        ],
    },
    7: {
        title: "Software Development Engineer (SDE I)",
        company: "TheContractum",
        location: "Kota, Rajasthan",
        type: "Full-Time",
        roles: [
            "Build and maintain front-end and back-end features",
            "Write clean, well-documented code",
            "Participate in code reviews",
            "Collaborate with product and design teams",
            "Debug and fix production issues",
        ],
        skills: ["React.js", "JavaScript", "Node.js", "MongoDB", "REST APIs", "Git"],
        qualification: "B.Tech / B.E. in Computer Science or related field",
        experience: "0–2 years of professional experience",
        salary: "₹6,00,000 – ₹10,00,000 per annum",
        benefits: [
            "Health Insurance",
            "Learning & certification budget",
            "Modern tech stack",
            "5-day work week",
        ],
    },
    8: {
        title: "Software Development Engineer (SDE II)",
        company: "TheContractum",
        location: "Kota, Rajasthan",
        type: "Full-Time",
        roles: [
            "Lead development of complex features end-to-end",
            "Mentor SDE I engineers",
            "Design scalable system architectures",
            "Drive technical discussions and code quality",
        ],
        skills: ["System Design", "Node.js", "React.js", "PostgreSQL / MongoDB", "AWS", "Docker"],
        qualification: "B.Tech / M.Tech in Computer Science or equivalent",
        experience: "2–5 years of relevant development experience",
        salary: "₹10,00,000 – ₹18,00,000 per annum",
        benefits: [
            "Health & wellness benefits",
            "Remote work options",
            "Performance bonuses",
            "Stock options",
            "Professional development",
        ],
    },
    9: {
        title: "SDE III - Backend Developer",
        company: "TheContractum",
        location: "Kota, Rajasthan",
        type: "Full-Time",
        roles: [
            "Architect and build highly scalable backend systems",
            "Define technical standards and best practices",
            "Lead backend team and review critical code",
            "Optimise database performance and infrastructure",
            "Collaborate with product on technical feasibility",
        ],
        skills: ["Scalability", "System Architecture", "Node.js", "Microservices", "Kubernetes", "AWS", "Redis"],
        qualification: "B.Tech / M.Tech / MCA in CS or equivalent",
        experience: "5+ years with 2+ years in senior backend role",
        salary: "₹20,00,000 – ₹30,00,000 per annum",
        benefits: [
            "Executive health coverage",
            "Flexible / hybrid work",
            "ESOP / stock options",
            "Conference & training budget",
            "Relocation assistance",
        ],
    },
};

export default function JobApplication() {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [jobLoading, setJobLoading] = useState(true);
    const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", countryIndex: 0, resume: null, coverLetter: "" });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    useEffect(() => {
        const loadJob = async () => {
            setJobLoading(true);

            // Only treat a purely numeric route param as a static job id.
            const isStaticJobId = /^\d+$/.test(jobId);
            if (isStaticJobId && staticJobsData[jobId]) {
                setJob({ ...staticJobsData[jobId], _isStatic: true });
                setJobLoading(false);
                return;
            }

            // Otherwise try to fetch from DB (dynamic job posted from admin)
            try {
                const res = await fetch(`${API}/api/cms/jobs/${jobId}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                const template = getJobDetailTemplate(data.title, data.department) || {};
                setJob({
                    ...template,
                    ...data,
                    roles: data.roles?.length ? data.roles : template.roles || [],
                    skills: data.skills?.length ? data.skills : template.skills || [],
                    qualification: data.qualification || template.qualification || '',
                    experience: data.experience || template.experience || '',
                    salary: data.salary || template.salary || '',
                    benefits: data.benefits?.length ? data.benefits : template.benefits || [],
                    company: 'TheContractum',
                    _isStatic: false,
                });
            } catch {
                setJob(null);
            }
            setJobLoading(false);
        };
        loadJob();
    }, [jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Add phone number validation
        if (name === "phone" && value.length > 10) {
            return; // Prevent updating if phone number exceeds 10 digits
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        const phoneWithCode = `${COUNTRIES[formData.countryIndex].code} ${formData.phone}`;

        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', phoneWithCode);
        data.append('jobTitle', job?.title);
        data.append('coverLetter', formData.coverLetter);
        if (formData.resume) {
            data.append('resume', formData.resume);
        }

        try {
            const res = await fetch(`${API}/api/cms/applications`, {
                method: 'POST',
                body: data
            });
            if (!res.ok) throw new Error('Submission failed');
            setStatus({ loading: false, success: true, error: null });
            setTimeout(() => navigate("/careers/jobs"), 2000);
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message });
        }
    };

    // Loading state
    if (jobLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                    <p className="text-gray-500 font-medium">Loading job details...</p>
                </div>
            </div>
        );
    }

    // Not found state
    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
                    <p className="text-gray-500 mb-6">The job you're looking for may have been removed or the link is invalid.</p>
                    <button onClick={() => navigate("/careers/jobs")} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all">
                        Back to Job Openings
                    </button>
                </div>
            </div>
        );
    }

    const hasBio = (job.roles?.length > 0) || job.qualification || job.experience || job.salary;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 text-white py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <button
                        onClick={() => navigate("/careers/jobs")}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Job Openings
                    </button>
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-blue-100">
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} />
                            <span>{job.company || 'TheContractum'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>{job.type}</span>
                        </div>
                        {job.department && (
                            <div className="flex items-center gap-2">
                                <Briefcase size={18} />
                                <span>{job.department}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* If no bio yet — show a message */}
                        {!hasBio && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                                <p className="text-amber-700 font-semibold text-lg mb-1">Job details coming soon</p>
                                <p className="text-amber-600 text-sm">The admin is still filling in the details for this role. Check back shortly!</p>
                            </div>
                        )}

                        {/* Roles & Responsibilities */}
                        {job.roles?.length > 0 && (
                            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase className="text-blue-600" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900">Roles & Responsibilities</h2>
                                </div>
                                <ul className="space-y-2">
                                    {job.roles.map((role, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-700">
                                            <span className="text-blue-600 font-bold">•</span>
                                            <span>{role}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Required Skills */}
                        {job.skills?.length > 0 && (
                            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <Award className="text-blue-600" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900">Required Skills</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, idx) => (
                                        <span key={idx} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Qualification */}
                        {job.qualification && (
                            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <GraduationCap className="text-blue-600" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900">Qualification</h2>
                                </div>
                                <p className="text-gray-700">{job.qualification}</p>
                            </section>
                        )}

                        {/* Experience */}
                        {job.experience && (
                            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="text-blue-600" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                                </div>
                                <p className="text-gray-700">{job.experience}</p>
                            </section>
                        )}

                        {/* Salary */}
                        {job.salary && (
                            <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <DollarSign className="text-blue-600" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900">Salary / Compensation</h2>
                                </div>
                                <p className="text-gray-700 font-semibold text-lg">{job.salary}</p>
                            </section>
                        )}

                        {/* Benefits — always shown (static/common) */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Gift className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
                            </div>
                            <ul className="space-y-2">
                                {(job.benefits?.length > 0 ? job.benefits : STATIC_BENEFITS).map((benefit, idx) => (
                                    <li key={idx} className="flex gap-3 text-gray-700">
                                        <span className="text-green-600 font-bold">✓</span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Application Process — always shown (static/common) */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Application Process</h2>
                            </div>
                            <ol className="space-y-3">
                                {STATIC_APPLICATION_PROCESS.map((step, idx) => (
                                    <li key={idx} className="flex gap-3 text-gray-700">
                                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{idx + 1}</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>

                    </div>

                    {/* Application Form Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this position</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {status.success && (
                                    <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-3">
                                        <CheckCircle2 size={20} />
                                        <p className="font-semibold text-sm">Application submitted!</p>
                                    </div>
                                )}
                                {status.error && (
                                    <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3">
                                        <AlertCircle size={20} />
                                        <p className="font-semibold text-sm">{status.error}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="John Doe" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                                    <div>
                                        <select
                                            name="countryIndex"
                                            value={formData.countryIndex}
                                            onChange={handleInputChange}
                                            className="w-full mb-2 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold appearance-none cursor-pointer"
                                        >
                                            {COUNTRIES.map((c, i) => (
                                                <option key={i} value={i}>{c.code} ({c.iso})</option>
                                            ))}
                                        </select>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="98765 43210" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Resume/CV *</label>
                                    <input type="file" name="resume" onChange={handleFileChange} required accept=".pdf,.doc,.docx"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                                    <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                        placeholder="Tell us why you're a great fit..." />
                                </div>

                                <button disabled={status.loading} type="submit"
                                    className={`w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 ${status.loading ? 'opacity-70' : ''}`}>
                                    {status.loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    ) : (
                                        <><Send size={18} /> Submit Application</>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center">
                                    By submitting, you agree to our Terms & Privacy Policy
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
