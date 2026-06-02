import { useState } from "react";
import { Link } from "react-router-dom";
import { 
    Rocket, GitBranch, Code, Cpu, ChevronDown, ChevronUp,
    Building, ShieldCheck, Landmark, CheckCircle2, AlertCircle, Loader2, FileText, Trash2, Plus
} from "lucide-react";
import running from "../../assets/running.png";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const countryCodes = [
    { code: "+91", label: "+91 (IN)" },
    { code: "+1", label: "+1 (US)" },
    { code: "+44", label: "+44 (GB)" },
    { code: "+61", label: "+61 (AU)" },
    { code: "+1", label: "+1 (CA)" },
    { code: "+971", label: "+971 (AE)" },
    { code: "+966", label: "+966 (SA)" },
    { code: "+65", label: "+65 (SG)" },
    { code: "+64", label: "+64 (NZ)" },
    { code: "+27", label: "+27 (ZA)" },
    { code: "+93", label: "+93 (AF)" },
    { code: "+880", label: "+880 (BD)" },
    { code: "+975", label: "+975 (BT)" },
    { code: "+86", label: "+86 (CN)" },
    { code: "+62", label: "+62 (ID)" },
    { code: "+98", label: "+98 (IR)" },
    { code: "+964", label: "+964 (IQ)" },
    { code: "+972", label: "+972 (IL)" },
    { code: "+81", label: "+81 (JP)" },
    { code: "+962", label: "+962 (JO)" },
    { code: "+965", label: "+965 (KW)" },
    { code: "+60", label: "+60 (MY)" },
    { code: "+960", label: "+960 (MV)" },
    { code: "+977", label: "+977 (NP)" },
    { code: "+968", label: "+968 (OM)" },
    { code: "+92", label: "+92 (PK)" },
    { code: "+63", label: "+63 (PH)" },
    { code: "+974", label: "+974 (QA)" },
    { code: "+82", label: "+82 (KR)" },
    { code: "+94", label: "+94 (LK)" },
    { code: "+66", label: "+66 (TH)" },
    { code: "+90", label: "+90 (TR)" },
    { code: "+84", label: "+84 (VN)" },
    { code: "+355", label: "+355 (AL)" },
    { code: "+43", label: "+43 (AT)" },
    { code: "+32", label: "+32 (BE)" },
    { code: "+359", label: "+359 (BG)" },
    { code: "+385", label: "+385 (HR)" },
    { code: "+357", label: "+357 (CY)" },
    { code: "+420", label: "+420 (CZ)" },
    { code: "+45", label: "+45 (DK)" },
    { code: "+358", label: "+358 (FI)" },
    { code: "+33", label: "+33 (FR)" },
    { code: "+49", label: "+49 (DE)" },
    { code: "+30", label: "+30 (GR)" },
    { code: "+36", label: "+36 (HU)" },
    { code: "+354", label: "+354 (IS)" },
    { code: "+353", label: "+353 (IE)" },
    { code: "+39", label: "+39 (IT)" },
    { code: "+31", label: "+31 (NL)" },
    { code: "+47", label: "+47 (NO)" },
    { code: "+48", label: "+48 (PL)" },
    { code: "+351", label: "+351 (PT)" },
    { code: "+40", label: "+40 (RO)" },
    { code: "+7", label: "+7 (RU)" },
    { code: "+34", label: "+34 (ES)" },
    { code: "+46", label: "+46 (SE)" },
    { code: "+41", label: "+41 (CH)" },
    { code: "+380", label: "+380 (UA)" },
    { code: "+213", label: "+213 (DZ)" },
    { code: "+20", label: "+20 (EG)" },
    { code: "+251", label: "+251 (ET)" },
    { code: "+233", label: "+233 (GH)" },
    { code: "+254", label: "+254 (KE)" },
    { code: "+212", label: "+212 (MA)" },
    { code: "+234", label: "+234 (NG)" },
    { code: "+255", label: "+255 (TZ)" },
    { code: "+256", label: "+256 (UG)" },
    { code: "+54", label: "+54 (AR)" },
    { code: "+55", label: "+55 (BR)" },
    { code: "+56", label: "+56 (CL)" },
    { code: "+57", label: "+57 (CO)" },
    { code: "+52", label: "+52 (MX)" },
    { code: "+51", label: "+51 (PE)" },
    { code: "+58", label: "+58 (VE)" },
    { code: "+679", label: "+679 (FJ)" },
    { code: "+675", label: "+675 (PG)" }
];

export default function Projects() {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Vendor form state
    const [vendorData, setVendorData] = useState({
        companyName: "",
        vendorName: "",
        vendorContact: "",
        vendorCountryCode: "+91",
        gstNumber: "",
        panNumber: "",
        contactPerson: "",
        businessAddress: "",
        servicesOffered: "",
        companyType: "Single Proprietor", // 'Single Proprietor' or 'Private Limited'
        directors: [{ name: "", contactNumber: "", email: "", countryCode: "+91" }],
        authorizedDirectorName: "",
        authorizationDetails: "",
        bankName: "",
        accountNumber: "",
        ifscCode: ""
    });
    
    // Multiple document attachments state
    const [documents, setDocuments] = useState({
        gstCertificate: "",
        panCard: "",
        cancelledCheque: "",
        authorizationLetter: ""
    });

    const [fileNames, setFileNames] = useState({
        gstCertificate: "",
        panCard: "",
        cancelledCheque: "",
        authorizationLetter: ""
    });

    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const projects = [
        {
            id: 1,
            title: "Project Nova",
            category: "R&D - Artificial Intelligence",
            desc: "A next-generation predictive analytics engine designed to optimize supply chain logistics in real-time using reinforcement learning.",
            status: "Active Development",
            tech: ["Python", "PyTorch", "AWS Sagemaker"],
            icon: <Cpu className="w-8 h-8 text-purple-500" />,
            details: [
                "Real-time supply chain optimization mapping.",
                "Advanced reinforcement learning simulation environments.",
                "Scalable AWS infrastructure for global deployment.",
                "Interactive predictive analytics performance dashboard."
            ]
        },
        {
            id: 2,
            title: "Project Aegis",
            category: "Cybersecurity",
            desc: "An automated threat detection system that uses behavioral analysis to identify zero-day vulnerabilities in enterprise networks.",
            status: "Beta Testing",
            tech: ["Go", "Kafka", "ElasticSearch"],
            icon: <Code className="w-8 h-8 text-blue-500" />,
            details: [
                "Behavioral analysis threat detection engine.",
                "Zero-day vulnerability identification protocols.",
                "Kafka-based real-time event streaming architecture.",
                "Automated network remediation and containment."
            ]
        },
        {
            id: 3,
            title: "Project Helios",
            category: "Renewable Energy Tech",
            desc: "IoT-based monitoring platform for solar farms to maximize efficiency and predict maintenance needs.",
            status: "Concept Phase",
            tech: ["IoT", "React Native", "MQTT"],
            icon: <Rocket className="w-8 h-8 text-orange-500" />,
            details: [
                "IoT-based remote sensor monitoring network.",
                "Solar farm efficiency optimization algorithms.",
                "Predictive maintenance and anomaly alerting.",
                "Secure MQTT communication protocol for devices."
            ]
        }
    ];

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVendorData(prev => ({ ...prev, [name]: value }));
    };

    const handleCompanyTypeChange = (e) => {
        const type = e.target.value;
        setVendorData(prev => {
            let dirs = [...prev.directors];
            if (type === "Private Limited" && dirs.length < 2) {
                while (dirs.length < 2) {
                    dirs.push({ name: "", contactNumber: "", email: "", countryCode: "+91" });
                }
            }
            return {
                ...prev,
                companyType: type,
                directors: dirs,
                authorizedDirectorName: type === "Single Proprietor" ? "" : prev.authorizedDirectorName
            };
        });
    };

    const handleDirectorChange = (index, field, value) => {
        const updated = [...vendorData.directors];
        updated[index][field] = value;
        setVendorData(prev => ({ ...prev, directors: updated }));
    };

    const addDirector = () => {
        setVendorData(prev => ({
            ...prev,
            directors: [...prev.directors, { name: "", contactNumber: "", email: "", countryCode: "+91" }]
        }));
    };

    const removeDirector = (index) => {
        const updated = [...vendorData.directors];
        updated.splice(index, 1);
        setVendorData(prev => ({ ...prev, directors: updated }));
    };

    const handleDocumentUpload = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            setFileNames(prev => ({ ...prev, [docType]: file.name }));
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setDocuments(prev => ({ ...prev, [docType]: reader.result }));
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                setStatus(prev => ({ ...prev, error: `Failed to read ${docType}. Please try again.` }));
            };
        }
    };

    const handleVendorSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        // Validate multiple required documents
        if (!documents.gstCertificate || !documents.panCard || !documents.cancelledCheque) {
            setStatus({ loading: false, success: false, error: "GST Certificate, PAN Card, and Cancelled Cheque are mandatory documents." });
            return;
        }

        // Validate Private Limited minimum 2 directors
        if (vendorData.companyType === "Private Limited" && vendorData.directors.length < 2) {
            setStatus({ loading: false, success: false, error: "For a Private Limited Company, details of at least 2 Directors are mandatory." });
            return;
        }

        // Validate that director info fields are filled
        for (let i = 0; i < vendorData.directors.length; i++) {
            const dir = vendorData.directors[i];
            if (!dir.name || !dir.contactNumber || !dir.email) {
                setStatus({ loading: false, success: false, error: `Please fill in all details for Director #${i + 1}.` });
                return;
            }
        }

        // Validate authorized director selection if Private Limited
        if (vendorData.companyType === "Private Limited" && !vendorData.authorizedDirectorName) {
            setStatus({ loading: false, success: false, error: "Please specify which Director is authorized for this registration." });
            return;
        }

        const payload = {
            companyName: vendorData.companyName,
            vendorName: vendorData.vendorName,
            vendorContact: `${vendorData.vendorCountryCode || "+91"} ${vendorData.vendorContact}`,
            gstNumber: vendorData.gstNumber,
            panNumber: vendorData.panNumber,
            contactPerson: vendorData.contactPerson,
            businessAddress: vendorData.businessAddress,
            servicesOffered: vendorData.servicesOffered,
            companyType: vendorData.companyType,
            directors: vendorData.directors.map(dir => ({
                name: dir.name,
                email: dir.email,
                contactNumber: `${dir.countryCode || "+91"} ${dir.contactNumber}`
            })),
            authorizedDirectorName: vendorData.authorizedDirectorName,
            authorizationDetails: vendorData.authorizationDetails,
            bankDetails: {
                bankName: vendorData.bankName,
                accountNumber: vendorData.accountNumber,
                ifscCode: vendorData.ifscCode
            },
            documents: documents
        };

        try {
            const res = await fetch(`${API}/api/vendor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Submission failed');
            }

            setStatus({ loading: false, success: true, error: null });
            setVendorData({
                companyName: "",
                vendorName: "",
                vendorContact: "",
                vendorCountryCode: "+91",
                gstNumber: "",
                panNumber: "",
                contactPerson: "",
                businessAddress: "",
                servicesOffered: "",
                companyType: "Single Proprietor",
                directors: [{ name: "", contactNumber: "", email: "", countryCode: "+91" }],
                authorizedDirectorName: "",
                authorizationDetails: "",
                bankName: "",
                accountNumber: "",
                ifscCode: ""
            });
            setDocuments({
                gstCertificate: "",
                panCard: "",
                cancelledCheque: "",
                authorizationLetter: ""
            });
            setFileNames({
                gstCertificate: "",
                panCard: "",
                cancelledCheque: "",
                authorizationLetter: ""
            });
            
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 4000);
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[500px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${running})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center h-full flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 mx-auto">
                        <GitBranch size={18} className="text-yellow-300" />
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <div className="inline-block bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                        Current Projects
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">What We're Building</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        These are the live projects that our teams are actively working on. Each represents an opportunity to learn, innovate, and make impact.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-violet-500 flex flex-col group h-fit">
                            <div className="flex justify-between items-start mb-6">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-xl group-hover:scale-110 transition-transform">
                                    {project.icon}
                                </div>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${project.status === "Active Development" ? "bg-green-100 text-green-700" :
                                    project.status === "Beta Testing" ? "bg-blue-100 text-blue-700" :
                                        "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">{project.title}</h3>
                            <div className="text-violet-600 font-bold text-sm mb-4 uppercase tracking-wide">{project.category}</div>
                            <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown(project.id)}
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        View Details {openDropdown === project.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {openDropdown === project.id && (
                                        <div className="mt-4 bg-violet-50 rounded-xl p-4 border border-violet-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <ul className="space-y-2">
                                                {project.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-violet-800">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0"></div>
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vendor Registration Module */}
            <div className="bg-white border-t border-b border-gray-200 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Info Column */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                Partners & Affiliates
                            </div>
                            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
                                Vendor Registration Program
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Join our network of certified vendors supporting our running projects worldwide. We seek high-quality suppliers, technical service providers, and expert teams to accelerate our core initiatives.
                            </p>
                            
                            <div className="space-y-4 pt-6">
                                <div className="flex gap-4 items-start p-4 bg-violet-50/50 rounded-xl border border-violet-100/50">
                                    <Building className="text-violet-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Direct Collaboration</h4>
                                        <p className="text-gray-600 text-sm">Work alongside our leading project teams on high-impact initiatives.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-violet-50/50 rounded-xl border border-violet-100/50">
                                    <ShieldCheck className="text-violet-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Secured Payments</h4>
                                        <p className="text-gray-600 text-sm">Timely settlements and clear milestones contracts routed directly via finance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-violet-50/50 rounded-xl border border-violet-100/50">
                                    <Landmark className="text-violet-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Compliant Auditing</h4>
                                        <p className="text-gray-600 text-sm">Proper transparent processing with full GST, PAN and bank auditing.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-8 bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-200 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
                            
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Vendor Registration Form</h3>
                            <p className="text-gray-500 text-sm mb-6">Provide your legal business credentials, director details and banking info below to register.</p>

                            <form onSubmit={handleVendorSubmit} className="space-y-6">
                                {status.success && (
                                    <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 flex items-center gap-3 animate-pulse">
                                        <CheckCircle2 size={24} className="flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-sm">Vendor application submitted successfully!</p>
                                            <p className="text-xs opacity-90">An admin has been notified and will review your business credentials shortly.</p>
                                        </div>
                                    </div>
                                )}
                                
                                {status.error && (
                                    <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center gap-3">
                                        <AlertCircle size={24} className="flex-shrink-0" />
                                        <p className="font-bold text-sm">{status.error}</p>
                                    </div>
                                )}

                                {/* SECTION 1: Vendor Details */}
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-150 pb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-3 bg-violet-600 rounded"></div> 1. Vendor Details
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Vendor Company Name *</label>
                                            <input type="text" name="companyName" value={vendorData.companyName} onChange={handleInputChange} required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold"
                                                placeholder="Acme Solutions Private Limited" />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Vendor Name *</label>
                                            <input type="text" name="vendorName" value={vendorData.vendorName} onChange={handleInputChange} required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold"
                                                placeholder="Jane Doe" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Vendor Contact Number *</label>
                                            <div className="flex gap-2">
                                                <select name="vendorCountryCode" value={vendorData.vendorCountryCode || "+91"} onChange={handleInputChange}
                                                    className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold cursor-pointer text-sm">
                                                    {countryCodes.map((c, i) => (
                                                        <option key={i} value={c.code}>{c.label}</option>
                                                    ))}
                                                </select>
                                                <input type="tel" name="vendorContact" value={vendorData.vendorContact} onChange={handleInputChange} required
                                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold"
                                                    placeholder="98765 43210" />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Contact Person (Auditor/Liaison) *</label>
                                            <input type="text" name="contactPerson" value={vendorData.contactPerson} onChange={handleInputChange} required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold"
                                                placeholder="Mr. Jane Doe" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">GST Number *</label>
                                            <input type="text" name="gstNumber" value={vendorData.gstNumber} onChange={handleInputChange} required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold uppercase font-mono"
                                                placeholder="29AAAAA1111A1Z1" />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">PAN Number *</label>
                                            <input type="text" name="panNumber" value={vendorData.panNumber} onChange={handleInputChange} required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold uppercase font-mono"
                                                placeholder="ABCDE1234F" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Business Address *</label>
                                        <textarea name="businessAddress" value={vendorData.businessAddress} onChange={handleInputChange} required rows="2"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold resize-none"
                                            placeholder="Suite 404, Tech Park, Bangalore, India" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Services / Products Offered *</label>
                                        <textarea name="servicesOffered" value={vendorData.servicesOffered} onChange={handleInputChange} required rows="2"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold resize-none"
                                            placeholder="e.g. IT support, Hardware logistics, Cybersecurity consulting..." />
                                    </div>
                                </div>

                                {/* SECTION 2: Company Type Validation & Directors info */}
                                <div className="space-y-6 border-t border-gray-150 pt-6">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-150 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <div className="w-1.5 h-3 bg-violet-600 rounded"></div> 2. Company Type & Directors
                                        </span>
                                        <select name="companyType" value={vendorData.companyType} onChange={handleCompanyTypeChange}
                                            className="bg-violet-50 text-violet-700 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-violet-100 outline-none cursor-pointer">
                                            <option value="Single Proprietor">Single Proprietor Company</option>
                                            <option value="Private Limited">Private Limited Company</option>
                                        </select>
                                    </h4>

                                    {/* Warnings based on company type selection */}
                                    <div className="p-3 rounded-xl text-xs font-semibold flex items-start gap-2 bg-blue-50 text-blue-700 border border-blue-100">
                                        <Building size={16} className="flex-shrink-0 mt-0.5" />
                                        <p>
                                            {vendorData.companyType === "Single Proprietor" 
                                                ? "For Single Proprietor Company: Details of the single owner/proprietor are sufficient."
                                                : "For Private Limited Company: Details of a minimum of 2 Directors are mandatory."
                                            }
                                        </p>
                                    </div>

                                    {/* Director details fields mapping */}
                                    <div className="space-y-4">
                                        {vendorData.directors.map((director, index) => (
                                            <div key={index} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-250/60 space-y-4 relative">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        {vendorData.companyType === "Single Proprietor" ? "Proprietor/Owner Details" : `Director #${index + 1} Details`}
                                                    </span>
                                                    {vendorData.directors.length > 1 && (
                                                        <button type="button" onClick={() => removeDirector(index)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                     <div className="min-w-0">
                                                         <label className="block text-[10px] font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                                                         <input type="text" value={director.name} onChange={(e) => handleDirectorChange(index, "name", e.target.value)} required
                                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-800 bg-white"
                                                             placeholder="John Doe" />
                                                     </div>
                                                     <div className="min-w-0">
                                                         <label className="block text-[10px] font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">Contact Number *</label>
                                                         <div className="flex gap-1.5">
                                                             <select value={director.countryCode || "+91"} onChange={(e) => handleDirectorChange(index, "countryCode", e.target.value)}
                                                                 className="w-20 sm:w-24 px-1.5 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-800 bg-white cursor-pointer flex-shrink-0">
                                                                 {countryCodes.map((c, i) => (
                                                                     <option key={i} value={c.code}>{c.label}</option>
                                                                 ))}
                                                             </select>
                                                             <input type="tel" value={director.contactNumber} onChange={(e) => handleDirectorChange(index, "contactNumber", e.target.value)} required
                                                                 className="min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-800 bg-white"
                                                                 placeholder="99999 88888" />
                                                         </div>
                                                     </div>
                                                     <div className="min-w-0">
                                                         <label className="block text-[10px] font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">Email Address *</label>
                                                         <input type="email" value={director.email} onChange={(e) => handleDirectorChange(index, "email", e.target.value)} required
                                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-800 bg-white"
                                                             placeholder="john@example.com" />
                                                     </div>
                                                 </div>
                                            </div>
                                        ))}

                                        {/* Button to add more directors */}
                                        <button type="button" onClick={addDirector}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700 hover:bg-violet-50 px-3 py-2 rounded-xl transition-all border border-dashed border-violet-200">
                                            <Plus size={14} /> Add Director Details
                                        </button>
                                    </div>
                                </div>

                                {/* SECTION 3: Authorized Director Information */}
                                <div className="space-y-6 border-t border-gray-150 pt-6">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-150 pb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-3 bg-violet-600 rounded"></div> 3. Authorized Signatory / Person
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Authorized Signatory Name *</label>
                                            <select name="authorizedDirectorName" value={vendorData.authorizedDirectorName} onChange={handleInputChange} required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold cursor-pointer">
                                                <option value="">Select Authorized Person</option>
                                                {vendorData.directors.map((d, i) => (
                                                    d.name && <option key={i} value={d.name}>{d.name} ({vendorData.companyType === "Single Proprietor" ? "Proprietor" : `Director #${i + 1}`})</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Authorization Details / Notes</label>
                                            <input type="text" name="authorizationDetails" value={vendorData.authorizationDetails} onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all font-semibold"
                                                placeholder="e.g. Authorized via Board Resolution dated Jan 12, 2026" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 4: Bank Details for Payouts */}
                                <div className="space-y-6 border-t border-gray-150 pt-6">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-150 pb-2 flex items-center gap-1.5">
                                        <Landmark size={16} className="text-violet-600" /> 4. Bank Account Details
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-gray-600 uppercase tracking-wider mb-1.5">Bank Name *</label>
                                            <input type="text" name="bankName" value={vendorData.bankName} onChange={handleInputChange} required
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-800"
                                                placeholder="HDFC Bank" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-gray-600 uppercase tracking-wider mb-1.5">Account Number *</label>
                                            <input type="text" name="accountNumber" value={vendorData.accountNumber} onChange={handleInputChange} required
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-800 font-mono"
                                                placeholder="50100222333444" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-extrabold text-gray-600 uppercase tracking-wider mb-1.5">IFSC Code *</label>
                                            <input type="text" name="ifscCode" value={vendorData.ifscCode} onChange={handleInputChange} required
                                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-xs font-semibold text-gray-850 uppercase font-mono"
                                                placeholder="HDFC0000123" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECTION 5: Document Upload Section */}
                                <div className="space-y-6 border-t border-gray-150 pt-6">
                                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider border-b border-gray-150 pb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-3 bg-violet-600 rounded"></div> 5. Document Upload Section (Multiple files supported)
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* GST Certificate */}
                                        <div className="border border-gray-200 p-4 rounded-2xl relative bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">GST Certificate *</label>
                                            <div className="flex items-center gap-3">
                                                <input type="file" required onChange={(e) => handleDocumentUpload(e, "gstCertificate")} accept=".pdf,.png,.jpg,.jpeg"
                                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-semibold">
                                                {fileNames.gstCertificate ? `Attached: ${fileNames.gstCertificate}` : "Upload official GST certificate"}
                                            </p>
                                        </div>

                                        {/* PAN Card */}
                                        <div className="border border-gray-200 p-4 rounded-2xl relative bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">PAN Card *</label>
                                            <div className="flex items-center gap-3">
                                                <input type="file" required onChange={(e) => handleDocumentUpload(e, "panCard")} accept=".pdf,.png,.jpg,.jpeg"
                                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-semibold">
                                                {fileNames.panCard ? `Attached: ${fileNames.panCard}` : "Upload company PAN card"}
                                            </p>
                                        </div>

                                        {/* Cancelled Cheque */}
                                        <div className="border border-gray-200 p-4 rounded-2xl relative bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Cancelled Cheque *</label>
                                            <div className="flex items-center gap-3">
                                                <input type="file" required onChange={(e) => handleDocumentUpload(e, "cancelledCheque")} accept=".pdf,.png,.jpg,.jpeg"
                                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-semibold">
                                                {fileNames.cancelledCheque ? `Attached: ${fileNames.cancelledCheque}` : "Upload cancelled cheque for payout audit"}
                                            </p>
                                        </div>

                                        {/* Authorization Document (optional/mandatory for Private Limited) */}
                                        <div className="border border-gray-200 p-4 rounded-2xl relative bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">
                                                Authorization Letter {vendorData.companyType === "Private Limited" ? "*" : "(Optional)"}
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <input type="file" required={vendorData.companyType === "Private Limited"} onChange={(e) => handleDocumentUpload(e, "authorizationLetter")} accept=".pdf,.png,.jpg,.jpeg"
                                                    className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-2 font-semibold">
                                                {fileNames.authorizationLetter ? `Attached: ${fileNames.authorizationLetter}` : "Supporting authorization document"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button disabled={status.loading} type="submit"
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-extrabold hover:from-violet-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100">
                                    {status.loading ? (
                                        <Loader2 className="animate-spin text-white" size={20} />
                                    ) : (
                                        <><FileText size={20} /> Submit Vendor Registration</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hackathon Teaser */}
            <div className="bg-gradient-to-br from-gray-50 to-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl overflow-hidden shadow-2xl relative">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                        <div className="relative z-10 px-6 py-20 md:py-24 text-center">
                            <div className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                                <Rocket className="inline-block w-4 h-4 mr-2 mb-0.5" />
                                Live Event
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">Internal Hackathon 2026</h2>
                            <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                                48 hours. Unlimited coffee. One goal: Build something awesome.
                                Currently open for employee registration.
                            </p>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <Link to="/contact/touch">
                                    <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl">
                                        Register Team
                                    </button>
                                </Link>
                                <Link to="/careers/themes">
                                    <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105">
                                        View Themes
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
