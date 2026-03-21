import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock, DollarSign, Award, GraduationCap, TrendingUp, Gift, FileText, ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

export default function JobApplication() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: ""
    });

    // Job data (in real app, fetch from API using jobId)
    const jobsData = {
        1: {
            title: "Senior Full Stack Engineer",
            company: "TheContrractum",
            location: "Bangalore, India",
            type: "Full-Time",
            roles: [
                "Design, develop, and maintain scalable web applications",
                "Collaborate with cross-functional teams to define and ship new features",
                "Write clean, maintainable, and efficient code",
                "Participate in code reviews and mentor junior developers",
                "Optimize applications for maximum speed and scalability"
            ],
            skills: ["React.js", "Node.js", "AWS", "MongoDB", "RESTful APIs", "Git", "Agile/Scrum"],
            qualification: "Bachelor's or Master's degree in Computer Science, Engineering, or related field",
            experience: "5+ years of professional software development experience",
            salary: "₹18,00,000 - ₹25,00,000 per annum",
            benefits: [
                "Health Insurance (Medical, Dental, Vision)",
                "Flexible working hours and remote work options",
                "Professional development and training budget",
                "Paid time off and holidays",
                "Performance bonuses and stock options",
                "Gym membership and wellness programs"
            ],
            applicationProcess: [
                "Submit your application with resume and cover letter",
                "Initial screening call with HR (15-20 mins)",
                "Technical assessment or coding challenge",
                "Technical interview with engineering team",
                "Final round with leadership team",
                "Offer and onboarding"
            ]
        },
        2: {
            title: "Machine Learning Architect",
            company: "TheContrractum",
            location: "Remote",
            type: "Full-Time",
            roles: [
                "Design and implement ML models and algorithms",
                "Lead the development of AI/ML solutions",
                "Build scalable ML pipelines and infrastructure",
                "Collaborate with data engineers and product teams",
                "Research and implement state-of-the-art ML techniques"
            ],
            skills: ["Python", "TensorFlow", "PyTorch", "Kubernetes", "Docker", "AWS/GCP", "MLOps"],
            qualification: "Master's or Ph.D. in Computer Science, Machine Learning, or related field",
            experience: "6+ years in ML/AI with 2+ years in architecture role",
            salary: "₹25,00,000 - ₹35,00,000 per annum",
            benefits: [
                "Comprehensive health insurance",
                "100% remote work flexibility",
                "Annual conference and learning budget",
                "Latest hardware and tools",
                "Stock options and performance bonuses",
                "Unlimited PTO policy"
            ],
            applicationProcess: [
                "Submit application with resume and portfolio",
                "HR screening call",
                "Technical deep-dive interview",
                "ML system design round",
                "Leadership and culture fit interview",
                "Offer and negotiation"
            ]
        },
        3: {
            title: "Product Designer (UI/UX)",
            company: "TheContrractum",
            location: "Mumbai, India",
            type: "Full-Time",
            roles: [
                "Create user-centered designs for web and mobile applications",
                "Conduct user research and usability testing",
                "Develop wireframes, prototypes, and high-fidelity mockups",
                "Collaborate with product managers and developers",
                "Maintain and evolve design systems and guidelines"
            ],
            skills: ["Figma", "User Research", "Prototyping", "UI Design", "UX Design", "Design Systems", "HTML/CSS"],
            qualification: "Bachelor's degree in Design, HCI, or related field",
            experience: "3-5 years of product design experience",
            salary: "₹12,00,000 - ₹18,00,000 per annum",
            benefits: [
                "Health and wellness benefits",
                "Flexible work arrangements",
                "Design tools and software licenses",
                "Learning and development opportunities",
                "Team outings and events",
                "Competitive salary with annual reviews"
            ],
            applicationProcess: [
                "Submit application with portfolio",
                "Portfolio review",
                "Design challenge (take-home)",
                "Presentation and discussion of challenge",
                "Team fit and final interview",
                "Offer"
            ]
        },
        4: {
            title: "DevOps Engineer",
            company: "TheContrractum",
            location: "Bangalore, India",
            type: "Full-Time",
            roles: [
                "Manage and optimize CI/CD pipelines",
                "Maintain cloud infrastructure (AWS/Azure/GCP)",
                "Implement monitoring, logging, and alerting systems",
                "Automate deployment and infrastructure provisioning",
                "Ensure system reliability, security, and performance"
            ],
            skills: ["Docker", "Kubernetes", "CI/CD", "Linux", "AWS", "Terraform", "Jenkins", "Git"],
            qualification: "Bachelor's degree in Computer Science or related field",
            experience: "3-5 years of DevOps or Infrastructure experience",
            salary: "₹15,00,000 - ₹22,00,000 per annum",
            benefits: [
                "Health insurance coverage",
                "Remote work flexibility",
                "Certification and training support",
                "Paid time off",
                "Performance bonuses",
                "Latest tech stack and tools"
            ],
            applicationProcess: [
                "Submit application with resume",
                "HR screening",
                "Technical assessment",
                "System design and troubleshooting round",
                "Final interview with team lead",
                "Offer and onboarding"
            ]
        },
        5: {
            title: "Marketing Manager",
            company: "TheContrractum",
            location: "Delhi, India",
            type: "Full-Time",
            roles: [
                "Develop and execute marketing strategies",
                "Manage digital marketing campaigns (SEO, SEM, Social Media)",
                "Create compelling content and marketing materials",
                "Analyze marketing metrics and ROI",
                "Lead and mentor marketing team members"
            ],
            skills: ["SEO", "Content Strategy", "Google Analytics", "Social Media Marketing", "Marketing Automation", "Copywriting"],
            qualification: "Bachelor's degree in Marketing, Business, or related field",
            experience: "4-6 years of marketing experience with 2+ years in management",
            salary: "₹10,00,000 - ₹16,00,000 per annum",
            benefits: [
                "Health insurance benefits",
                "Flexible working hours",
                "Professional development budget",
                "Performance-based incentives",
                "Travel opportunities",
                "Collaborative work environment"
            ],
            applicationProcess: [
                "Submit application with resume",
                "Initial HR discussion",
                "Marketing case study presentation",
                "Interview with marketing leadership",
                "Final round with executive team",
                "Offer"
            ]
        }
    };

    const job = jobsData[jobId];

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
                    <button
                        onClick={() => navigate("/careers/jobs")}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Job Openings
                    </button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Application submitted successfully! We will contact you soon.");
        navigate("/careers/jobs");
    };

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
                            <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            <span>{job.type}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Roles & Responsibilities */}
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

                        {/* Required Skills */}
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

                        {/* Qualification */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <GraduationCap className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Qualification</h2>
                            </div>
                            <p className="text-gray-700">{job.qualification}</p>
                        </section>

                        {/* Experience */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                            </div>
                            <p className="text-gray-700">{job.experience}</p>
                        </section>

                        {/* Salary */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <DollarSign className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Salary / Compensation</h2>
                            </div>
                            <p className="text-gray-700 font-semibold text-lg">{job.salary}</p>
                        </section>

                        {/* Benefits */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Gift className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Benefits</h2>
                            </div>
                            <ul className="space-y-2">
                                {job.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex gap-3 text-gray-700">
                                        <span className="text-green-600 font-bold">✓</span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Application Process */}
                        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Application Process</h2>
                            </div>
                            <ol className="space-y-3">
                                {job.applicationProcess.map((step, idx) => (
                                    <li key={idx} className="flex gap-3 text-gray-700">
                                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>

                    {/* Application Form Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this position</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Resume/CV *
                                    </label>
                                    <input
                                        type="file"
                                        name="resume"
                                        onChange={handleFileChange}
                                        required
                                        accept=".pdf,.doc,.docx"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                        placeholder="Tell us why you're a great fit..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Submit Application
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
