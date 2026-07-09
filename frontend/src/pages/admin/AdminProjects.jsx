import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
    FolderKanban, Plus, Search, RefreshCw, X, Image as ImageIcon, Briefcase, Calendar,
    CheckSquare, Settings2, Trash2, Award, TrendingUp, Menu, LayoutDashboard, BarChart2,
    Star, DollarSign, Activity, FileText, ArrowUpRight, Users, ChevronDown, ChevronRight, ChevronLeft,
    UserCheck, Play, Upload, Mail, CheckCircle
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import AdminLayout from "../../components/admin/AdminLayout";

const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    if (/^\d{4}-\d{2}$/.test(dateStr)) return `${dateStr}-01`;

    try {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }
    } catch (e) { }
    return "";
};

const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        try {
            const d = new Date(dateStr);
            if (!isNaN(d.getTime())) {
                return d.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
            }
        } catch (e) { }
    }
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
        try {
            const d = new Date(`${dateStr}-01`);
            if (!isNaN(d.getTime())) {
                return d.toLocaleDateString("en-US", { year: 'numeric', month: 'long' });
            }
        } catch (e) { }
    }
    return dateStr;
};

export default function AdminProjects() {
    const { admin } = useAdminAuth();
    const [projects, setProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [researchList, setResearchList] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCompleted, setLoadingCompleted] = useState(false);
    const [loadingCaseStudies, setLoadingCaseStudies] = useState(false);
    const [loadingResearch, setLoadingResearch] = useState(false);
    const [loadingTestimonials, setLoadingTestimonials] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "overview";
    const setActiveTab = (tabVal) => {
        setSearchParams({ tab: tabVal });
    };
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Helpers to parse and calculate metrics
    const parseMoney = (val) => {
        if (!val) return 0;
        const clean = val.toString().replace(/[^0-9.]/g, "");
        return parseFloat(clean) || 0;
    };

    const stats = useMemo(() => {
        const ongoingCount = projects.length;
        const completedCount = completedProjects.length;
        const caseStudiesCount = caseStudies.length;
        const researchCount = researchList.length;
        const testimonialsCount = testimonials.length;

        // Budgets/Funding
        const ongoingBudget = projects.reduce((sum, p) => sum + parseMoney(p.budget), 0);
        const completedBudget = completedProjects.reduce((sum, p) => sum + parseMoney(p.budget), 0);
        const researchFunding = researchList.reduce((sum, r) => sum + parseMoney(r.fundingAmount), 0);
        const totalBudget = ongoingBudget + completedBudget + researchFunding;

        // Ratings & CSAT
        const completedRatingsSum = completedProjects.reduce((sum, p) => sum + (p.rating || 5), 0);
        const testimonialRatingsSum = testimonials.reduce((sum, t) => sum + (t.rating || 5), 0);
        const ratedItemsCount = completedProjects.length + testimonials.length;
        const averageRating = ratedItemsCount > 0 
            ? ((completedRatingsSum + testimonialRatingsSum) / ratedItemsCount).toFixed(1)
            : "5.0";

        return {
            totalProjects: ongoingCount + completedCount,
            ongoingCount,
            completedCount,
            caseStudiesCount,
            researchCount,
            testimonialsCount,
            totalBudget,
            averageRating
        };
    }, [projects, completedProjects, caseStudies, researchList, testimonials]);

    // Robust date parser: handles "January 2026", "31-12-25" (DD-MM-YY), "2026-01-15" (ISO)
    const toMonthKey = (dateStr) => {
        if (!dateStr) return null;
        const s = String(dateStr).trim();
        // ISO: "2026-01-15" or "2026-01"
        if (/^\d{4}-\d{2}/.test(s)) return s.slice(0, 7);
        // DD-MM-YY or DD-MM-YYYY: "31-12-25" or "31-01-2026"
        const ddmmyy = s.match(/^(\d{1,2})-(\d{2})-(\d{2,4})$/);
        if (ddmmyy) {
            const mm = ddmmyy[2].padStart(2, '0');
            let yr = ddmmyy[3];
            if (yr.length === 2) yr = parseInt(yr, 10) < 50 ? `20${yr}` : `19${yr}`;
            return `${yr}-${mm}`;
        }
        // "Month YYYY" or "Month YY": "January 2026", "Jan 26"
        const MONTH_MAP = {
            january:'01',february:'02',march:'03',april:'04',may:'05',june:'06',
            july:'07',august:'08',september:'09',october:'10',november:'11',december:'12',
            jan:'01',feb:'02',mar:'03',apr:'04',jun:'06',jul:'07',
            aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'
        };
        const parts = s.split(/[\s,]+/);
        if (parts.length >= 2) {
            const mm = MONTH_MAP[parts[0].toLowerCase()];
            if (mm) {
                let yr = parts[parts.length - 1];
                if (yr.length === 2) yr = parseInt(yr, 10) < 50 ? `20${yr}` : `19${yr}`;
                return `${yr}-${mm}`;
            }
        }
        return null;
    };

    const monthlyData = useMemo(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const last6Months = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            last6Months.push({
                monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
                monthName: `${months[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`,
                Ongoing: 0,
                Completed: 0,
                Research: 0
            });
        }

        projects.forEach(p => {
            const mKey = toMonthKey(p.startDate);
            const match = last6Months.find(m => m.monthKey === mKey);
            if (match) match.Ongoing += 1;
        });

        completedProjects.forEach(p => {
            const mKey = toMonthKey(p.completedDate);
            const match = last6Months.find(m => m.monthKey === mKey);
            if (match) match.Completed += 1;
        });

        researchList.forEach(r => {
            const mKey = toMonthKey(r.startDate);
            const match = last6Months.find(m => m.monthKey === mKey);
            if (match) match.Research += 1;
        });

        return last6Months;
    }, [projects, completedProjects, researchList]);

    const industryData = useMemo(() => {
        const counts = {};
        [...projects, ...completedProjects].forEach(p => {
            const cat = p.category || "Enterprise";
            counts[cat] = (counts[cat] || 0) + 1;
        });
        caseStudies.forEach(cs => {
            const ind = cs.industry || "Other";
            counts[ind] = (counts[ind] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value })).slice(0, 6);
    }, [projects, completedProjects, caseStudies]);

    const techData = useMemo(() => {
        const counts = {};
        const extract = (techStrOrArr) => {
            if (!techStrOrArr) return;
            let arr = [];
            if (Array.isArray(techStrOrArr)) {
                arr = techStrOrArr;
            } else if (typeof techStrOrArr === 'string') {
                arr = techStrOrArr.split(',').map(s => s.trim());
            }
            arr.forEach(t => {
                if (!t) return;
                const normalized = t.toLowerCase();
                let display = t;
                if (normalized === 'react' || normalized === 'reactjs') display = 'React';
                else if (normalized === 'node' || normalized === 'nodejs') display = 'Node.js';
                else if (normalized === 'mongodb') display = 'MongoDB';
                else if (normalized === 'python') display = 'Python';
                else if (normalized === 'aws') display = 'AWS';
                else if (normalized === 'typescript') display = 'TypeScript';
                else if (normalized === 'javascript') display = 'JavaScript';
                else if (normalized === 'docker') display = 'Docker';
                else if (normalized === 'ai' || normalized === 'ml') display = 'AI/ML';
                
                counts[display] = (counts[display] || 0) + 1;
            });
        };

        projects.forEach(p => extract(p.technologies));
        completedProjects.forEach(p => extract(p.technologies));
        caseStudies.forEach(cs => extract(cs.technologies));
        researchList.forEach(r => extract(r.technologies));

        return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 7);
    }, [projects, completedProjects, caseStudies, researchList]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [viewingProject, setViewingProject] = useState(null);

    const [finishData, setFinishData] = useState({
        completedDate: "",
        duration: "",
        rating: 5,
        achievements: "",
        impact: ""
    });

    const emptyForm = {
        title: "", client: "", category: "Enterprise", startDate: "", expectedCompletion: "",
        status: "In Progress", progress: 50, teamSize: 5, budget: "100,000",
        technologies: "", image: "", description: "", keyFeatures: "", priority: "High",
        objectives: "", challenges: "", milestones: []
    };

    const emptyCompletedForm = {
        title: "", client: "", category: "Enterprise", completedDate: "", duration: "",
        teamSize: 5, budget: "100,000", rating: 5, technologies: "", image: "",
        description: "", fullDescription: "", achievements: "", impact: "",
        challenges: "", results: "", roi: "",
        clientTestimonial: { quote: "", author: "", position: "" }
    };

    const emptyCaseStudyForm = {
        title: "", client: "", industry: "Healthcare", duration: "12 months",
        teamSize: 5, image: "", challenge: "", solution: "", fullDescription: "",
        results: "", technologies: "", testimonial: "", testimonialAuthor: "",
        impact: "", featured: false,
        implementation: "", keyObjectives: "", metrics: "",
        businessValue: { roi: "", costSavings: "", revenueImpact: "", efficiency: "" },
        challenges_detailed: ""
    };

    const emptyResearchForm = {
        title: "", category: "Artificial Intelligence", status: "Published",
        startDate: "", completionDate: "", team: "", collaborators: "",
        image: "", description: "", keyFindings: "", publications: "",
        patents: "", technologies: "", impact: "", citation: "",
        featured: false, fundingAmount: ""
    };

    const emptyTestimonialForm = {
        name: "", position: "", company: "", industry: "Healthcare",
        image: "", rating: 5, project: "", testimonial: "",
        beforeContext: "", afterResults: "", projectDuration: "",
        videoTestimonial: false, featured: false, date: ""
    };

    const [formData, setFormData] = useState(emptyForm);
    const [newMilestone, setNewMilestone] = useState({ name: "", status: "Pending", date: "" });

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects`, {
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) {
            console.error("Failed to fetch projects", err);
        }
        setLoading(false);
    }, [admin]);

    const fetchCompletedProjects = useCallback(async () => {
        setLoadingCompleted(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects`, {
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setCompletedProjects(data);
            }
        } catch (err) {
            console.error("Failed to fetch completed projects", err);
        }
        setLoadingCompleted(false);
    }, [admin]);

    const fetchCaseStudies = useCallback(async () => {
        setLoadingCaseStudies(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/case-studies`, {
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setCaseStudies(data);
            }
        } catch (err) {
            console.error("Failed to fetch case studies", err);
        }
        setLoadingCaseStudies(false);
    }, [admin]);

    const fetchResearch = useCallback(async () => {
        setLoadingResearch(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/research`, {
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setResearchList(data);
            }
        } catch (err) {
            console.error("Failed to fetch research", err);
        }
        setLoadingResearch(false);
    }, [admin]);

    const fetchTestimonials = useCallback(async () => {
        setLoadingTestimonials(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/testimonials`, {
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
            }
        } catch (err) {
            console.error("Failed to fetch testimonials", err);
        }
        setLoadingTestimonials(false);
    }, [admin]);

    useEffect(() => {
        Promise.resolve().then(() => {
            fetchProjects();
            fetchCompletedProjects();
            fetchCaseStudies();
            fetchResearch();
            fetchTestimonials();
        });
    }, [fetchProjects, fetchCompletedProjects, fetchCaseStudies, fetchResearch, fetchTestimonials]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFormData({ ...formData, image: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleOpenAdd = () => {
        if (activeTab === "completed") {
            setFormData(emptyCompletedForm);
        } else if (activeTab === "casestudies") {
            setFormData(emptyCaseStudyForm);
        } else if (activeTab === "research") {
            setFormData(emptyResearchForm);
        } else if (activeTab === "testimonials") {
            setFormData(emptyTestimonialForm);
        } else {
            setFormData(emptyForm);
        }
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (e, project) => {
        e.stopPropagation();
        if (activeTab === "completed") {
            setFormData({
                ...project,
                technologies: project.technologies?.join(", ") || "",
                achievements: project.achievements?.join(", ") || "",
                challenges: project.challenges?.join(", ") || "",
                results: project.results?.join(", ") || "",
                clientTestimonial: {
                    quote: project.clientTestimonial?.quote || "",
                    author: project.clientTestimonial?.author || "",
                    position: project.clientTestimonial?.position || ""
                }
            });
        } else if (activeTab === "casestudies") {
            setFormData({
                ...project,
                technologies: project.technologies?.join(", ") || "",
                results: project.results?.join(", ") || "",
                keyObjectives: project.keyObjectives?.join("\n") || "",
                implementation: project.implementation?.map(p => `${p.phase} | ${p.duration} | ${p.description}`).join("\n") || "",
                metrics: project.metrics?.map(m => `${m.label} | ${m.value} | ${m.icon}`).join("\n") || "",
                businessValue: {
                    roi: project.businessValue?.roi || "",
                    costSavings: project.businessValue?.costSavings || "",
                    revenueImpact: project.businessValue?.revenueImpact || "",
                    efficiency: project.businessValue?.efficiency || ""
                },
                challenges_detailed: project.challenges_detailed?.join("\n") || ""
            });
        } else if (activeTab === "research") {
            setFormData({
                ...project,
                team: project.team?.join(", ") || "",
                collaborators: project.collaborators?.join(", ") || "",
                keyFindings: project.keyFindings?.join("\n") || "",
                publications: project.publications?.join("\n") || "",
                patents: project.patents?.join(", ") || "",
                technologies: project.technologies?.join(", ") || ""
            });
        } else if (activeTab === "testimonials") {
            setFormData({
                ...project
            });
        } else {
            setFormData({
                ...project,
                technologies: project.technologies?.join(", ") || "",
                keyFeatures: project.keyFeatures?.join(", ") || "",
                objectives: project.objectives?.join(", ") || "",
                challenges: project.challenges?.join(", ") || "",
                milestones: project.milestones || []
            });
        }
        setEditingId(project.id || project._id);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let formattedData;
        let url;
        let method;

        if (activeTab === "completed") {
            formattedData = {
                ...formData,
                technologies: typeof formData.technologies === "string" ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean) : formData.technologies,
                achievements: typeof formData.achievements === "string" ? formData.achievements.split(",").map(a => a.trim()).filter(Boolean) : formData.achievements,
                challenges: typeof formData.challenges === "string" ? formData.challenges.split(",").map(c => c.trim()).filter(Boolean) : formData.challenges,
                results: typeof formData.results === "string" ? formData.results.split(",").map(r => r.trim()).filter(Boolean) : formData.results,
                teamSize: parseInt(formData.teamSize),
                rating: parseInt(formData.rating)
            };
            url = editingId
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects/${editingId}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects`;
            method = editingId ? "PUT" : "POST";
        } else if (activeTab === "casestudies") {
            formattedData = {
                ...formData,
                technologies: typeof formData.technologies === "string" ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean) : formData.technologies,
                results: typeof formData.results === "string" ? formData.results.split(",").map(r => r.trim()).filter(Boolean) : formData.results,
                teamSize: parseInt(formData.teamSize),
                featured: !!formData.featured,
                keyObjectives: typeof formData.keyObjectives === "string" ? formData.keyObjectives.split("\n").map(o => o.trim()).filter(Boolean) : (formData.keyObjectives || []),
                challenges_detailed: typeof formData.challenges_detailed === "string" ? formData.challenges_detailed.split("\n").map(c => c.trim()).filter(Boolean) : (formData.challenges_detailed || []),
                implementation: typeof formData.implementation === "string" ? formData.implementation.split("\n").map(line => {
                    const cleanLine = line.trim();
                    if (!cleanLine) return null;
                    let parts = [];
                    if (cleanLine.includes('|')) {
                        parts = cleanLine.split('|').map(p => p.trim());
                    } else if (cleanLine.includes(' - ')) {
                        parts = cleanLine.split(' - ').map(p => p.trim());
                    } else if (cleanLine.includes(':')) {
                        parts = cleanLine.split(':').map(p => p.trim());
                    } else {
                        parts = [cleanLine];
                    }
                    if (parts.length >= 1 && parts[0]) {
                        return {
                            phase: parts[0],
                            duration: parts[1] || "",
                            description: parts[2] || ""
                        };
                    }
                    return null;
                }).filter(Boolean) : (formData.implementation || []),
                metrics: typeof formData.metrics === "string" ? formData.metrics.split("\n").map(line => {
                    const cleanLine = line.trim();
                    if (!cleanLine) return null;
                    let parts = [];
                    if (cleanLine.includes('|')) {
                        parts = cleanLine.split('|').map(p => p.trim());
                    } else if (cleanLine.includes(' - ')) {
                        parts = cleanLine.split(' - ').map(p => p.trim());
                    } else if (cleanLine.includes(':')) {
                        parts = cleanLine.split(':').map(p => p.trim());
                    } else {
                        parts = [cleanLine];
                    }
                    if (parts.length >= 1 && parts[0]) {
                        return {
                            label: parts[0],
                            value: parts[1] || "",
                            icon: parts[2] || "🎯"
                        };
                    }
                    return null;
                }).filter(Boolean) : (formData.metrics || [])
            };
            url = editingId
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/case-studies/${editingId}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/case-studies`;
            method = editingId ? "PUT" : "POST";
        } else if (activeTab === "research") {
            formattedData = {
                ...formData,
                image: formData.image || "https://placehold.co/600x400/png?text=Research+Image",
                team: typeof formData.team === "string" ? formData.team.split(",").map(t => t.trim()).filter(Boolean) : (formData.team || []),
                collaborators: typeof formData.collaborators === "string" ? formData.collaborators.split(",").map(c => c.trim()).filter(Boolean) : (formData.collaborators || []),
                keyFindings: typeof formData.keyFindings === "string" ? formData.keyFindings.split("\n").map(f => f.trim()).filter(Boolean) : (formData.keyFindings || []),
                publications: typeof formData.publications === "string" ? formData.publications.split("\n").map(p => p.trim()).filter(Boolean) : (formData.publications || []),
                patents: typeof formData.patents === "string" ? formData.patents.split(",").map(p => p.trim()).filter(Boolean) : (formData.patents || []),
                technologies: typeof formData.technologies === "string" ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean) : (formData.technologies || []),
                featured: !!formData.featured
            };
            url = editingId
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/research/${editingId}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/research`;
            method = editingId ? "PUT" : "POST";
        } else if (activeTab === "testimonials") {
            formattedData = {
                ...formData,
                rating: parseInt(formData.rating),
                videoTestimonial: !!formData.videoTestimonial,
                featured: !!formData.featured
            };
            url = editingId
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/testimonials/${editingId}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/testimonials`;
            method = editingId ? "PUT" : "POST";
        } else {
            formattedData = {
                ...formData,
                startDate: formatDisplayDate(formData.startDate),
                expectedCompletion: formatDisplayDate(formData.expectedCompletion),
                technologies: typeof formData.technologies === "string" ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean) : formData.technologies,
                keyFeatures: typeof formData.keyFeatures === "string" ? formData.keyFeatures.split(",").map(k => k.trim()).filter(Boolean) : formData.keyFeatures,
                objectives: typeof formData.objectives === "string" ? formData.objectives.split(",").map(k => k.trim()).filter(Boolean) : formData.objectives,
                challenges: typeof formData.challenges === "string" ? formData.challenges.split(",").map(k => k.trim()).filter(Boolean) : formData.challenges,
                progress: parseInt(formData.progress),
                teamSize: parseInt(formData.teamSize)
            };
            url = editingId
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${editingId}`
                : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects`;
            method = editingId ? "PUT" : "POST";
        }

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${admin?.token}`
                },
                body: JSON.stringify(formattedData)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData(activeTab === "completed" ? emptyCompletedForm : activeTab === "casestudies" ? emptyCaseStudyForm : activeTab === "research" ? emptyResearchForm : activeTab === "testimonials" ? emptyTestimonialForm : emptyForm);
                setEditingId(null);
                if (activeTab === "completed") {
                    fetchCompletedProjects();
                } else if (activeTab === "casestudies") {
                    fetchCaseStudies();
                } else if (activeTab === "research") {
                    fetchResearch();
                } else if (activeTab === "testimonials") {
                    fetchTestimonials();
                } else {
                    fetchProjects();
                }
            }
        } catch (err) {
            console.error("Failed to save", err);
        }
        setIsSubmitting(false);
    };

    const handleFinishProject = async (e) => {
        e.preventDefault();
        if (!editingId) return;
        setIsSubmitting(true);

        const finalPayload = {
            ...formData, // gets title, client, category, teamSize, budget, technologies, image, description
            technologies: typeof formData.technologies === 'string' ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean) : formData.technologies,
            completedDate: finishData.completedDate,
            duration: finishData.duration,
            rating: parseInt(finishData.rating),
            achievements: finishData.achievements.split(',').map(a => a.trim()).filter(Boolean),
            impact: finishData.impact
        };

        try {
            // 1. Send to Completed Projects
            const res1 = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${admin?.token}` },
                body: JSON.stringify(finalPayload)
            });

            if (res1.ok) {
                // 2. Delete from Ongoing Projects
                await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${editingId}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${admin?.token}` }
                });

                setIsFinishModalOpen(false);
                setFormData(emptyForm);
                setFinishData({ completedDate: "", duration: "", rating: 5, achievements: "", impact: "" });
                setEditingId(null);
                fetchProjects();
                fetchCompletedProjects();
            }
        } catch (err) {
            console.error("Failed to finish project", err);
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm(`Are you sure you want to delete this ${activeTab === 'casestudies' ? 'case study' : activeTab === 'research' ? 'research project' : activeTab === 'testimonials' ? 'testimonial' : 'project'}?`)) return;
        const url = activeTab === "completed"
            ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/completed-projects/${id}`
            : activeTab === "casestudies"
                ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/case-studies/${id}`
                : activeTab === "research"
                    ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/research/${id}`
                    : activeTab === "testimonials"
                        ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/testimonials/${id}`
                        : `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/projects/${id}`;
        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${admin?.token}` }
            });
            if (res.ok) {
                if (activeTab === "completed") {
                    fetchCompletedProjects();
                } else if (activeTab === "casestudies") {
                    fetchCaseStudies();
                } else if (activeTab === "research") {
                    fetchResearch();
                } else if (activeTab === "testimonials") {
                    fetchTestimonials();
                } else {
                    fetchProjects();
                }
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const filteredProjects = projects
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (b.id || b._id || "").toString().localeCompare((a.id || a._id || "").toString()));
    const filteredCompletedProjects = completedProjects
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (b.id || b._id || "").toString().localeCompare((a.id || a._id || "").toString()));
    const filteredCaseStudies = caseStudies
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (b.id || b._id || "").toString().localeCompare((a.id || a._id || "").toString()));
    const filteredResearchList = researchList
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (b.id || b._id || "").toString().localeCompare((a.id || a._id || "").toString()));
    const filteredTestimonials = testimonials
        .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.company.toLowerCase().includes(searchTerm.toLowerCase()) || t.project.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (b.id || b._id || "").toString().localeCompare((a.id || a._id || "").toString()));

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#374151'];

    return (
        <AdminLayout>
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                {/* Left Sidebar (Dark Blue theme) */}
                <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-[#0f172a] text-slate-100 flex flex-col p-5 shrink-0 border-r border-slate-800 transition-all duration-300`}>
                    <div className="mb-6 flex items-center justify-between">
                        <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'hidden' : 'flex'}`}>
                            <div className="p-2.5 bg-blue-600 rounded-xl">
                                <FolderKanban size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-sm leading-tight uppercase tracking-wider text-blue-400">The Contractum</h2>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Projects</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 cursor-pointer"
                        >
                            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                        <div>
                            {!sidebarCollapsed && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Projects Management</p>}
                            <nav className="space-y-1">
                                {[
                                    { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Dashboard Overview' },
                                    { id: 'ongoing', icon: <FolderKanban size={18} />, label: 'Ongoing Projects' },
                                    { id: 'completed', icon: <CheckSquare size={18} />, label: 'Completed Projects' },
                                    { id: 'casestudies', icon: <FileText size={18} />, label: 'Case Studies' },
                                    { id: 'research', icon: <Award size={18} />, label: 'Research & Innovation' },
                                    { id: 'testimonials', icon: <Users size={18} />, label: 'Client Testimonials' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => { setActiveTab(tab.id); setSearchTerm(""); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                                            activeTab === tab.id
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                                        }`}
                                        title={tab.label}
                                    >
                                        {tab.icon}
                                        {!sidebarCollapsed && <span className="truncate">{tab.label}</span>}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-semibold">
                        {!sidebarCollapsed ? (
                            <>
                                Logged in as:
                                <p className="text-slate-300 font-bold text-xs mt-1 truncate">{admin?.name || 'Admin Officer'}</p>
                                <p className="text-blue-400 font-bold text-[9px] uppercase tracking-wider truncate">{admin?.adminSubRole || 'Projects Admin'}</p>
                            </>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs mx-auto">
                                {(admin?.name || 'A')[0]}
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content Workspace */}
                <main className="flex-1 flex flex-col min-w-0 bg-white">
                    {/* Top Custom Header */}
                    <header className="border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-20 shadow-xs">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <FolderKanban className="text-blue-600" size={28} />
                                {activeTab === "overview" ? "Projects Dashboard" : activeTab === "casestudies" ? "Case Studies Management" : activeTab === "completed" ? "Completed Projects Management" : activeTab === "research" ? "Research & Innovation Management" : activeTab === "testimonials" ? "Client Testimonials Management" : "Ongoing Projects Management"}
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">
                                {activeTab === "overview"
                                    ? "Interactive analytics and metrics overview of your projects."
                                    : activeTab === "casestudies"
                                        ? "Manage and update case studies shown on the public Case Studies page."
                                        : activeTab === "completed"
                                            ? "Manage and update completed projects shown on the public Completed Projects page."
                                            : activeTab === "research"
                                                ? "Manage and update research and innovation projects shown on the Research & Innovation page."
                                                : activeTab === "testimonials"
                                                    ? "Manage and update client testimonials shown on the public Client Testimonials page."
                                                    : "Add and handle projects displayed on the public Ongoing Projects page."}
                            </p>
                        </div>

                        {activeTab !== "overview" && (
                            <div className="flex gap-3 items-center">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder={activeTab === "casestudies" ? "Search case studies..." : activeTab === "completed" ? "Search completed projects..." : activeTab === "research" ? "Search research projects..." : activeTab === "testimonials" ? "Search testimonials..." : "Search projects..."}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all w-60"
                                    />
                                </div>
                                <button
                                    onClick={handleOpenAdd}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs rounded-xl shadow-sm font-bold transition flex items-center gap-1.5"
                                >
                                    <Plus size={16} /> {activeTab === "casestudies" ? "Add Case Study" : activeTab === "completed" ? "Add Completed Project" : activeTab === "research" ? "Add Research Project" : activeTab === "testimonials" ? "Add Testimonial" : "Add Project"}
                                </button>
                            </div>
                        )}
                    </header>

                    {/* Workspace Body */}
                    <div className="flex-1 flex flex-col lg:flex-row min-w-0 overflow-y-auto">
                        <div className="flex-1 p-6 overflow-y-auto">
                            {/* Dashboard Overview tab */}
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    {/* KPI Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Projects</p>
                                                <h3 className="text-2xl font-black text-gray-900 mt-2">{stats.totalProjects}</h3>
                                                <p className="text-[10px] text-gray-400 mt-1">Ongoing: {stats.ongoingCount} | Completed: {stats.completedCount}</p>
                                            </div>
                                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                                <FolderKanban size={24} />
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Case Studies</p>
                                                <h3 className="text-2xl font-black text-gray-900 mt-2">{stats.caseStudiesCount}</h3>
                                                <p className="text-[10px] text-gray-400 mt-1">Published to company portal</p>
                                            </div>
                                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                                <FileText size={24} />
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Research Projects</p>
                                                <h3 className="text-2xl font-black text-gray-900 mt-2">{stats.researchCount}</h3>
                                                <p className="text-[10px] text-emerald-600 font-semibold mt-1">Funding: ${stats.totalBudget.toLocaleString()}</p>
                                            </div>
                                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                                <Award size={24} />
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client CSAT / Rating</p>
                                                <h3 className="text-2xl font-black text-gray-900 mt-2">{stats.averageRating} <span className="text-sm font-semibold text-gray-400">/ 5.0</span></h3>
                                                <p className="text-[10px] text-gray-400 mt-1">From {stats.testimonialsCount} client reviews</p>
                                            </div>
                                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                                <Star size={24} className="fill-amber-400 text-amber-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visualizations Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs lg:col-span-2">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-blue-600" /> Projects Lifecycle Growth (Last 6 Months)</h4>
                                            <div className="h-80">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                        <defs>
                                                            <linearGradient id="colorOngoing" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                            </linearGradient>
                                                            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                        <XAxis dataKey="monthName" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                                        <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                                        <Tooltip contentStyle={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                                                        <Area name="Ongoing Active" type="monotone" dataKey="Ongoing" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorOngoing)" />
                                                        <Area name="Completed Projects" type="monotone" dataKey="Completed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity size={18} className="text-indigo-600" /> Sector & Category Distribution</h4>
                                            <div className="h-64 relative flex items-center justify-center">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={industryData}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={60}
                                                            outerRadius={80}
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {industryData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                <div className="absolute text-center">
                                                    <p className="text-xs text-gray-400 font-bold uppercase">Sectors</p>
                                                    <p className="text-xl font-black text-gray-800">{industryData.length}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold text-gray-600">
                                                {industryData.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 truncate">
                                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                                        <span className="truncate">{item.name} ({item.value})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lower Charts Section */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs lg:col-span-2">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><BarChart2 size={18} className="text-orange-500" /> Technology Stack Count</h4>
                                            <div className="h-64">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={techData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                                        <XAxis type="number" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                                        <YAxis dataKey="name" type="category" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                                                        <Tooltip />
                                                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                                                            {techData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-xs flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Lifecycle Status Pipeline</h4>
                                                <p className="text-xs text-gray-400 mb-4">Total projects across operational funnels.</p>
                                            </div>
                                            <div className="space-y-4">
                                                {[
                                                    { label: "Ongoing", count: stats.ongoingCount, color: "bg-blue-500", pct: stats.totalProjects > 0 ? (stats.ongoingCount / stats.totalProjects) * 100 : 0 },
                                                    { label: "Completed", count: stats.completedCount, color: "bg-green-500", pct: stats.totalProjects > 0 ? (stats.completedCount / stats.totalProjects) * 100 : 0 },
                                                    { label: "Research Phase", count: stats.researchCount, color: "bg-purple-500", pct: stats.researchCount > 0 ? 100 : 0 },
                                                    { label: "Case Study Published", count: stats.caseStudiesCount, color: "bg-indigo-500", pct: stats.caseStudiesCount > 0 ? 100 : 0 }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="space-y-1">
                                                        <div className="flex justify-between text-xs font-bold">
                                                            <span className="text-gray-700">{item.label}</span>
                                                            <span className="text-gray-900">{item.count}</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }}></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-4 border-t border-gray-100 text-center">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">Operational efficiency</p>
                                                <p className="text-xs font-bold text-emerald-600 mt-1">98.5% Client satisfaction index</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab !== "overview" && (
                                <>
                    {activeTab === "casestudies" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loadingCaseStudies ? (
                                <div className="col-span-full py-12 text-center text-gray-500">
                                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                                    Loading case studies...
                                </div>
                            ) : filteredCaseStudies.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                                    No case studies found. Add one now!
                                </div>
                            ) : (
                                filteredCaseStudies.map((study) => (
                                    <div key={study.id || study._id} onClick={() => setViewingProject(study)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                            {study.featured && (
                                                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                    Featured
                                                </span>
                                            )}
                                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {study.industry}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{study.title}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{study.client}</p>

                                            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100 text-xs">
                                                <div>
                                                    <p className="text-gray-400">Duration</p>
                                                    <p className="font-semibold text-gray-700">{study.duration}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Team Size</p>
                                                    <p className="font-semibold text-gray-700">{study.teamSize} Members</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-2">
                                                <div className="text-xs text-blue-600 font-bold max-w-[150px] truncate">
                                                    {study.impact}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={(e) => handleOpenEdit(e, study)} className="text-blue-500 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Edit
                                                    </button>
                                                    <button onClick={(e) => handleDelete(e, study.id || study._id)} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : activeTab === "completed" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loadingCompleted ? (
                                <div className="col-span-full py-12 text-center text-gray-500">
                                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                                    Loading completed projects...
                                </div>
                            ) : filteredCompletedProjects.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                                    No completed projects found. Add one now!
                                </div>
                            ) : (
                                filteredCompletedProjects.map((project) => (
                                    <div key={project.id} onClick={() => setViewingProject(project)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                            <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                <CheckSquare size={12} /> Completed
                                            </span>
                                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-1 mb-2 text-yellow-500">
                                                {Array.from({ length: project.rating || 5 }).map((_, i) => (
                                                    <span key={i}>⭐</span>
                                                ))}
                                                <span className="text-xs text-gray-500 font-bold ml-1">{project.rating}/5 Rating</span>
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{project.title}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{project.client}</p>

                                            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100 text-xs">
                                                <div>
                                                    <p className="text-gray-400">Completed Date</p>
                                                    <p className="font-semibold text-gray-700">{project.completedDate}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Duration</p>
                                                    <p className="font-semibold text-gray-700">{project.duration}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Team Size</p>
                                                    <p className="font-semibold text-gray-700">{project.teamSize} Members</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Budget</p>
                                                    <p className="font-semibold text-gray-700">{project.budget && !project.budget.toString().startsWith('$') ? `$${project.budget}` : project.budget}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-2">
                                                <div className="text-xs text-blue-600 font-bold max-w-[150px] truncate">
                                                    {project.impact}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={(e) => handleOpenEdit(e, project)} className="text-blue-500 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Edit
                                                    </button>
                                                    <button onClick={(e) => handleDelete(e, project.id)} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : activeTab === "research" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loadingResearch ? (
                                <div className="col-span-full py-12 text-center text-gray-500">
                                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                                    Loading research projects...
                                </div>
                            ) : filteredResearchList.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                                    No research projects found. Add one now!
                                </div>
                            ) : (
                                filteredResearchList.map((research) => (
                                    <div key={research.id || research._id} onClick={() => setViewingProject(research)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer animate-in fade-in duration-200">
                                        <div className="h-48 overflow-hidden relative bg-slate-100">
                                            {research.image ? (
                                                <img src={research.image} alt={research.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-lg p-4 text-center">
                                                    {research.title}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                            {research.featured && (
                                                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                    Featured
                                                </span>
                                            )}
                                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {research.category}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-1 mb-2 text-cyan-600 font-semibold text-xs uppercase tracking-wider">
                                                <span>{research.status}</span>
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight line-clamp-2">{research.title}</h3>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{research.description}</p>

                                            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100 text-xs">
                                                <div>
                                                    <p className="text-gray-400">Funding</p>
                                                    <p className="font-semibold text-gray-700">{research.fundingAmount || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Timeline</p>
                                                    <p className="font-semibold text-gray-700">
                                                        {research.startDate || "N/A"} - {research.completionDate || "Ongoing"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-2">
                                                <div className="text-xs text-blue-600 font-bold max-w-[150px] truncate">
                                                    {research.impact}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={(e) => handleOpenEdit(e, research)} className="text-blue-500 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Edit
                                                    </button>
                                                    <button onClick={(e) => handleDelete(e, research.id || research._id)} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : activeTab === "testimonials" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loadingTestimonials ? (
                                <div className="col-span-full py-12 text-center text-gray-500">
                                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                                    Loading testimonials...
                                </div>
                            ) : filteredTestimonials.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                                    No testimonials found. Add one now!
                                </div>
                            ) : (
                                filteredTestimonials.map((t) => (
                                    <div key={t.id || t._id} onClick={() => setViewingProject(t)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer animate-in fade-in duration-200">
                                        <div className="h-48 overflow-hidden relative bg-slate-100">
                                            {t.image ? (
                                                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg p-4 text-center">
                                                    {t.name}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                            {t.featured && (
                                                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                    Featured
                                                </span>
                                            )}
                                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {t.industry}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-1 mb-2 text-yellow-500">
                                                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                                    <span key={i}>⭐</span>
                                                ))}
                                                <span className="text-xs text-gray-500 font-bold ml-1">{t.rating}/5 Rating</span>
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight line-clamp-1">{t.name}</h3>
                                            <p className="text-sm text-blue-600 font-semibold mb-2">{t.position} at {t.company}</p>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-3">"{t.testimonial}"</p>

                                            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100 text-xs">
                                                <div>
                                                    <p className="text-gray-400">Project</p>
                                                    <p className="font-semibold text-gray-700 truncate">{t.project || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400">Duration</p>
                                                    <p className="font-semibold text-gray-700">{t.projectDuration || "N/A"}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-2 pt-2">
                                                <button onClick={(e) => handleOpenEdit(e, t)} className="text-blue-500 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                    Edit
                                                </button>
                                                <button onClick={(e) => handleDelete(e, t.id || t._id)} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full py-12 text-center text-gray-500">
                                    <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-blue-500" />
                                    Loading projects...
                                </div>
                            ) : filteredProjects.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-200">
                                    No projects found. Add your first project!
                                </div>
                            ) : (
                                filteredProjects.map((project) => (
                                    <div key={project.id} onClick={() => setViewingProject(project)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer">
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                            <span className="absolute top-4 left-4 bg-white backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">
                                                {project.priority} Priority
                                            </span>
                                            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{project.title}</h3>
                                            <p className="text-sm text-gray-500 mb-4">{project.client}</p>

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="text-sm font-semibold text-gray-700">Progress: {project.progress}%</div>
                                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                                                <div className="text-xs font-semibold text-gray-500">
                                                    {project.teamSize} Members • {project.budget && !project.budget.toString().startsWith('$') ? `$${project.budget}` : project.budget}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={(e) => handleOpenEdit(e, project)} className="text-blue-500 font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Edit
                                                    </button>
                                                    <button onClick={(e) => handleDelete(e, project.id)} className="text-red-500 font-bold hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                                </>
                            )}
                        </div>

                        {/* Right Dashboard Widget Sidebar (only visible when activeTab === "overview") */}
                        {activeTab === "overview" && (
                            <aside className="w-full lg:w-80 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100 p-6 space-y-6 overflow-y-auto shrink-0">
                                {/* Widget 1: Ongoing Projects Progress */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center justify-between">
                                        <span>Active Milestones</span>
                                        <span className="text-blue-600 font-extrabold text-[10px]">Ongoing</span>
                                    </h4>
                                    <div className="space-y-3">
                                        {projects.slice(0, 4).map((p, idx) => (
                                            <div key={p.id || p._id} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs space-y-2">
                                                <div className="flex justify-between items-start gap-2">
                                                    <h5 className="font-bold text-xs text-gray-800 truncate flex-1">{p.title}</h5>
                                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold shrink-0">{p.progress}%</span>
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-semibold">{p.client}</p>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                        {projects.length === 0 && (
                                            <p className="text-xs text-gray-400 text-center py-4">No ongoing projects active.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Widget 2: Recent Testimonials */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-955 uppercase tracking-widest flex items-center justify-between">
                                        <span>Recent CSAT Reviews</span>
                                        <span className="text-amber-500 font-extrabold text-[10px] flex items-center gap-0.5"><Star size={10} className="fill-amber-400 text-amber-500" /> Rated</span>
                                    </h4>
                                    <div className="space-y-3">
                                        {testimonials.slice(0, 3).map((t, idx) => (
                                            <div key={t.id || t._id} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs space-y-2">
                                                <div className="flex justify-between items-start gap-1">
                                                    <div>
                                                        <h5 className="font-bold text-xs text-gray-800">{t.name}</h5>
                                                        <p className="text-[10px] text-gray-400">{t.position}, {t.company}</p>
                                                    </div>
                                                    <div className="flex text-amber-400 shrink-0">
                                                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                                            <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-[10px] text-gray-500 line-clamp-2 italic leading-relaxed">"{t.testimonial}"</p>
                                            </div>
                                        ))}
                                        {testimonials.length === 0 && (
                                            <p className="text-xs text-gray-400 text-center py-4">No testimonials logged.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Widget 3: Academic/Research Citations */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-955 uppercase tracking-widest">Research Outputs</h4>
                                    <div className="space-y-3">
                                        {researchList.slice(0, 3).map((r, idx) => (
                                            <div key={r.id || r._id} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs space-y-1">
                                                <h5 className="font-bold text-xs text-slate-800 truncate">{r.title}</h5>
                                                <div className="flex justify-between text-[9px] text-gray-400 font-semibold pt-1">
                                                    <span>{r.category}</span>
                                                    <span className="text-emerald-600">Fund: {r.fundingAmount ? (String(r.fundingAmount).startsWith('$') ? r.fundingAmount : `$${r.fundingAmount}`) : 'N/A'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </main>
            </div>

                {/* View Details Modal */}
                 {viewingProject && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
                            <button onClick={() => setViewingProject(null)} className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black p-2 rounded-full z-10 transition">
                                <X size={20} />
                            </button>
                            <div className="h-64 relative w-full">
                                <img src={viewingProject.image} alt={viewingProject.title || viewingProject.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-6 left-8">
                                    {viewingProject.testimonial !== undefined && viewingProject.name !== undefined ? (
                                        <>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block bg-indigo-600">
                                                Client Testimonial
                                            </span>
                                            <h2 className="text-3xl font-black text-white">{viewingProject.name}</h2>
                                            <p className="text-gray-300 font-medium">{viewingProject.position} at {viewingProject.company}</p>
                                        </>
                                    ) : (
                                        <>
                                            {viewingProject.publications !== undefined ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block bg-cyan-600">
                                                    Research & Innovation
                                                </span>
                                            ) : viewingProject.industry !== undefined ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block bg-purple-600">
                                                    Case Study
                                                </span>
                                            ) : viewingProject.completedDate !== undefined ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block bg-green-600">
                                                    Completed Project
                                                </span>
                                            ) : (
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block ${viewingProject.priority === 'Critical' ? 'bg-red-500' : viewingProject.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                                    {viewingProject.priority} Priority
                                                </span>
                                            )}
                                            <h2 className="text-3xl font-black text-white">{viewingProject.title}</h2>
                                            <p className="text-gray-300 font-medium">{viewingProject.client}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                {viewingProject.testimonial !== undefined && viewingProject.name !== undefined ? (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Industry</p>
                                                <p className="font-semibold">{viewingProject.industry}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Project</p>
                                                <p className="font-semibold truncate">{viewingProject.project}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Duration</p>
                                                <p className="font-semibold">{viewingProject.projectDuration || "N/A"}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Rating</p>
                                                <p className="font-semibold">{viewingProject.rating || 5} / 5</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Testimonial Quote</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm italic">"{viewingProject.testimonial}"</p>
                                        </div>

                                        {viewingProject.beforeContext && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Before Context (Challenge)</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.beforeContext}</p>
                                            </div>
                                        )}

                                        {viewingProject.afterResults && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">After Results (Impact)</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.afterResults}</p>
                                            </div>
                                        )}
                                    </>
                                ) : viewingProject.publications !== undefined ? (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Category</p>
                                                <p className="font-semibold">{viewingProject.category}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Status</p>
                                                <p className="font-semibold">{viewingProject.status}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Timeline</p>
                                                <p className="font-semibold">{viewingProject.startDate || "N/A"} - {viewingProject.completionDate || "Ongoing"}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Funding</p>
                                                <p className="font-semibold">{viewingProject.fundingAmount || "N/A"}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Description</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.description}</p>
                                        </div>

                                        {viewingProject.keyFindings?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Key Findings</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.keyFindings.map((f, i) => <li key={i}>{f}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.publications?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Publications</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.publications.map((p, i) => <li key={i}>{p}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.patents?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Patents</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.patents.map((p, i) => <li key={i}>{p}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.technologies?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Technologies Used</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {viewingProject.technologies.map((t, i) => <span key={i} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>)}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.team?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Research Team</h3>
                                                <p className="text-gray-600 text-sm">{viewingProject.team.join(", ")}</p>
                                            </div>
                                        )}

                                        {viewingProject.collaborators?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Collaborators</h3>
                                                <p className="text-gray-600 text-sm">{viewingProject.collaborators.join(", ")}</p>
                                            </div>
                                        )}

                                        {viewingProject.citation && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Citation</h3>
                                                <p className="text-gray-600 italic text-sm">{viewingProject.citation}</p>
                                            </div>
                                        )}

                                        {viewingProject.impact && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Impact</h3>
                                                <p className="text-gray-600 text-sm">{viewingProject.impact}</p>
                                            </div>
                                        )}
                                    </>
                                ) : viewingProject.industry !== undefined ? (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Industry</p>
                                                <p className="font-semibold">{viewingProject.industry}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Duration</p>
                                                <p className="font-semibold">{viewingProject.duration}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Team Size</p>
                                                <p className="font-semibold">{viewingProject.teamSize} Members</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Type</p>
                                                <p className="font-semibold">{viewingProject.featured ? "Featured Case" : "Standard Case"}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Challenge</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.challenge}</p>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Solution</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.solution}</p>
                                        </div>

                                        {viewingProject.implementation?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Implementation Timeline</h3>
                                                <div className="space-y-4">
                                                    {viewingProject.implementation.map((phase, index) => (
                                                        <div key={index} className="relative pl-6 pb-2 border-l-2 border-purple-300 last:border-l-0 last:pb-0">
                                                            <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-600 border-2 border-white"></div>
                                                            <div className="bg-purple-50/50 rounded-xl p-3 border border-purple-100/50 text-xs">
                                                                <div className="flex justify-between font-bold text-gray-900 mb-1">
                                                                    <span>{phase.phase}</span>
                                                                    <span className="text-purple-600">{phase.duration}</span>
                                                                </div>
                                                                <p className="text-gray-600">{phase.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.keyObjectives?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Projects objectives</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.keyObjectives.map((o, i) => <li key={i}>{o}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.metrics?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Key Matrics</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {viewingProject.metrics.map((m, i) => (
                                                        <div key={i} className="bg-gray-50/50 p-3 rounded-xl border border-gray-100/50 flex justify-between items-center text-xs">
                                                            <div>
                                                                <p className="text-gray-500 font-bold">{m.label}</p>
                                                                <p className="font-semibold text-gray-900">{m.value}</p>
                                                            </div>
                                                            <span className="text-2xl">{m.icon}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.fullDescription && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Full Description</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.fullDescription}</p>
                                            </div>
                                        )}

                                        {viewingProject.results?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Measurable Results</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.results.map((r, i) => <li key={i}>{r}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.technologies?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Technologies Used</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {viewingProject.technologies.map((t, i) => <span key={i} className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>)}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.impact && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Global Impact</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.impact}</p>
                                            </div>
                                        )}

                                        {viewingProject.testimonial && (
                                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 space-y-3">
                                                <h3 className="font-bold text-lg text-blue-900">Client Testimonial</h3>
                                                <p className="text-gray-700 italic text-sm">"{viewingProject.testimonial}"</p>
                                                <div className="text-xs text-gray-500 font-semibold">
                                                    — {viewingProject.testimonialAuthor}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Category</p>
                                                <p className="font-semibold">{viewingProject.category}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">
                                                    {viewingProject.completedDate !== undefined ? "Completed Date" : "Timeline"}
                                                </p>
                                                <p className="font-semibold">
                                                    {viewingProject.completedDate !== undefined ? viewingProject.completedDate : viewingProject.startDate}
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">Budget</p>
                                                <p className="font-semibold">{viewingProject.budget && !viewingProject.budget.toString().startsWith('$') ? `$${viewingProject.budget}` : viewingProject.budget}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 font-bold">
                                                    {viewingProject.completedDate !== undefined ? "Duration" : "Team"}
                                                </p>
                                                <p className="font-semibold">
                                                    {viewingProject.completedDate !== undefined ? viewingProject.duration : `${viewingProject.teamSize} Members`}
                                                </p>
                                            </div>
                                        </div>

                                        {viewingProject.completedDate !== undefined && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <p className="text-xs text-gray-500 font-bold">Team Size</p>
                                                    <p className="font-semibold">{viewingProject.teamSize} Members</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <p className="text-xs text-gray-500 font-bold">Client Rating</p>
                                                    <p className="font-semibold">⭐ {viewingProject.rating}/5</p>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="font-bold text-lg mb-2">Description</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.description}</p>
                                        </div>

                                        {viewingProject.completedDate !== undefined && viewingProject.fullDescription && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Full Description</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.fullDescription}</p>
                                            </div>
                                        )}

                                        {viewingProject.completedDate !== undefined && viewingProject.achievements?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Key Achievements</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {viewingProject.achievements.map((a, i) => (
                                                        <span key={i} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <Award size={12} /> {a}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.completedDate !== undefined && viewingProject.impact && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Impact / Summary Statement</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm">{viewingProject.impact}</p>
                                            </div>
                                        )}

                                        {viewingProject.completedDate === undefined && viewingProject.keyFeatures?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Key Features</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {viewingProject.keyFeatures.map((f, i) => <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{f}</span>)}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.technologies?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Technologies Used</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {viewingProject.technologies.map((t, i) => <span key={i} className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>)}
                                                </div>
                                            </div>
                                        )}

                                        {viewingProject.completedDate !== undefined && viewingProject.roi && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Return on Investment (ROI)</h3>
                                                <p className="text-gray-600 leading-relaxed text-sm font-semibold">{viewingProject.roi}</p>
                                            </div>
                                        )}

                                        {viewingProject.completedDate !== undefined && viewingProject.results?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Measurable Results</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.results.map((r, i) => <li key={i}>{r}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.completedDate === undefined && viewingProject.objectives?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Objectives</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.objectives.map((o, i) => <li key={i}>{o}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.challenges?.length > 0 && (
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">Challenges</h3>
                                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                    {viewingProject.challenges.map((o, i) => <li key={i}>{o}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        {viewingProject.completedDate !== undefined && viewingProject.clientTestimonial?.quote && (
                                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 space-y-3">
                                                <h3 className="font-bold text-lg text-blue-900">Client Testimonial</h3>
                                                <p className="text-gray-700 italic text-sm">"{viewingProject.clientTestimonial.quote}"</p>
                                                <div className="text-xs text-gray-500 font-semibold">
                                                    — {viewingProject.clientTestimonial.author}, <span className="text-gray-400 font-medium">{viewingProject.clientTestimonial.position}</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {viewingProject.completedDate === undefined && viewingProject.industry === undefined && viewingProject.publications === undefined && viewingProject.milestones?.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">Milestones</h3>
                                        <div className="space-y-3">
                                            {viewingProject.milestones.map((m, i) => (
                                                <div key={i} className="flex justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <div>
                                                        <p className="font-semibold text-sm">{m.name}</p>
                                                        <p className="text-xs text-gray-500">{m.date}</p>
                                                    </div>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded h-fit ${m.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{m.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Project Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                {editingId ? <Settings2 className="text-blue-600" /> : <Plus className="text-blue-600" />}
                                {activeTab === "completed"
                                    ? (editingId ? "Edit Completed Project" : "Add Completed Project")
                                    : activeTab === "casestudies"
                                        ? (editingId ? "Edit Case Study" : "Add Case Study")
                                        : activeTab === "research"
                                            ? (editingId ? "Edit Research Project" : "Add Research Project")
                                            : (editingId ? "Edit Project" : "Add New Project")
                                }
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {activeTab === "completed" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column (Completed Project) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Project Image Map/Cover</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative overflow-hidden h-40">
                                                    {formData.image ? (
                                                        <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                                    ) : (
                                                        <div className="space-y-1 text-center flex flex-col items-center">
                                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="font-medium text-blue-600">Upload a file</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input required={!editingId} type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Smart City GIS System" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Client/Partner Name</label>
                                                <input required type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Government Infra Dept" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category (Sector)</label>
                                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option>Government</option>
                                                        <option>Enterprise</option>
                                                        <option>Healthcare</option>
                                                        <option>Finance</option>
                                                        <option>Education</option>
                                                        <option>E-Commerce</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Final Client Rating (1-5)</label>
                                                    <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
                                                <textarea required rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Brief overview shown on cards..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Description</label>
                                                <textarea rows="4" value={formData.fullDescription} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="In-depth details for case study page..."></textarea>
                                            </div>
                                        </div>

                                        {/* Right Column (Completed Project) */}
                                        <div className="space-y-4">
                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><Calendar size={18} /> Project Timeline & Budget</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Completed Date (DD-MM-YY)</label>
                                                        <input required type="text" value={formData.completedDate} onChange={e => setFormData({ ...formData, completedDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 31-12-25" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                                                        <input required type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 12 months" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Team Size (Members)</label>
                                                        <input required type="number" min="1" value={formData.teamSize} onChange={e => setFormData({ ...formData, teamSize: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Budget (without $)</label>
                                                        <input required type="text" value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="450,000" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><Settings2 size={18} /> Deliverables & Impact</h4>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Technologies Used (Comma Separated)</label>
                                                    <input required type="text" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="React, Node.js, Postgres..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Key Achievements (Comma Separated)</label>
                                                    <input required type="text" value={formData.achievements} onChange={e => setFormData({ ...formData, achievements: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="500+ Users, 2M+ Transactions..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Global Impact / Statement</label>
                                                    <input required type="text" value={formData.impact} onChange={e => setFormData({ ...formData, impact: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Transformed municipal administration..." />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">ROI Summary</label>
                                                        <input type="text" value={formData.roi} onChange={e => setFormData({ ...formData, roi: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="40% efficiency gains" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Results (Comma Separated)</label>
                                                        <input type="text" value={formData.results} onChange={e => setFormData({ ...formData, results: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="10x speed, 99.9% uptime..." />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Challenges (Comma Separated)</label>
                                                    <input type="text" value={formData.challenges} onChange={e => setFormData({ ...formData, challenges: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Legacy systems integration..." />
                                                </div>
                                            </div>

                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><Award size={18} /> Client Testimonial</h4>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Quote</label>
                                                    <textarea rows="2" value={formData.clientTestimonial?.quote} onChange={e => setFormData({ ...formData, clientTestimonial: { ...formData.clientTestimonial, quote: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Quote from the client..."></textarea>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Author</label>
                                                        <input type="text" value={formData.clientTestimonial?.author} onChange={e => setFormData({ ...formData, clientTestimonial: { ...formData.clientTestimonial, author: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Jane Doe" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Position / Title</label>
                                                        <input type="text" value={formData.clientTestimonial?.position} onChange={e => setFormData({ ...formData, clientTestimonial: { ...formData.clientTestimonial, position: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="CTO, Smart City" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : activeTab === "casestudies" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column (Case Study) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Project Image Map/Cover</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative overflow-hidden h-40">
                                                    {formData.image ? (
                                                        <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                                    ) : (
                                                        <div className="space-y-1 text-center flex flex-col items-center">
                                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="font-medium text-blue-600">Upload a file</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input required={!editingId} type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Case Study Title</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Smart City GIS System" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Client/Partner Name</label>
                                                <input required type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Government Infra Dept" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Industry</label>
                                                    <select value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option>Government</option>
                                                        <option>Enterprise</option>
                                                        <option>Healthcare</option>
                                                        <option>Finance</option>
                                                        <option>Education</option>
                                                        <option>E-Commerce</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
                                                    <input required type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. 12 months" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Team Size (Members)</label>
                                                    <input required type="number" min="1" value={formData.teamSize} onChange={e => setFormData({ ...formData, teamSize: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                                                </div>
                                                <div className="flex items-center pt-6">
                                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer">
                                                        <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
                                                        Featured Case Study
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column (Case Study) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Challenge</label>
                                                <textarea required rows="2" value={formData.challenge} onChange={e => setFormData({ ...formData, challenge: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="The key challenge..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Key Challenges</label>
                                                <textarea rows="3" value={formData.challenges_detailed} onChange={e => setFormData({ ...formData, challenges_detailed: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Enter each key challenge on a new line..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Solution</label>
                                                <textarea required rows="2" value={formData.solution} onChange={e => setFormData({ ...formData, solution: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="The solution implemented..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Implementation Timeline</label>
                                                <textarea rows="4" value={formData.implementation} onChange={e => setFormData({ ...formData, implementation: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Format: Phase Name | Duration | Description (One per line)&#10;e.g. Discovery & Planning | 2 months | Conducted research..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Projects objectives</label>
                                                <textarea rows="3" value={formData.keyObjectives} onChange={e => setFormData({ ...formData, keyObjectives: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Enter each objective on a new line..."></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Key Matrics</label>
                                                <textarea rows="3" value={formData.metrics} onChange={e => setFormData({ ...formData, metrics: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Format: Label | Value | Icon (One per line)&#10;e.g. Diagnostic Accuracy | 95% | 🎯"></textarea>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Description</label>
                                                <textarea rows="3" value={formData.fullDescription} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Detailed case description..."></textarea>
                                            </div>
                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp size={18} /> Business Value Delivered</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Return on Investment</label>
                                                        <input type="text" value={formData.businessValue?.roi || ""} onChange={e => setFormData({ ...formData, businessValue: { ...formData.businessValue, roi: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 450% ROI" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Cost Savings</label>
                                                        <input type="text" value={formData.businessValue?.costSavings || ""} onChange={e => setFormData({ ...formData, businessValue: { ...formData.businessValue, costSavings: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. $85M annual savings" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Revenue Impact</label>
                                                        <input type="text" value={formData.businessValue?.revenueImpact || ""} onChange={e => setFormData({ ...formData, businessValue: { ...formData.businessValue, revenueImpact: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 30% more patients" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Efficiency Gain</label>
                                                        <input type="text" value={formData.businessValue?.efficiency || ""} onChange={e => setFormData({ ...formData, businessValue: { ...formData.businessValue, efficiency: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 98% time reduction" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Measurable Results (Comma Separated)</label>
                                                <input type="text" value={formData.results} onChange={e => setFormData({ ...formData, results: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. 99.9% uptime, 40% cost reduction" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Technologies Used (Comma Separated)</label>
                                                <input required type="text" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="React, Node.js, Postgres..." />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Global Impact / Statement</label>
                                                <input type="text" value={formData.impact} onChange={e => setFormData({ ...formData, impact: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Transformed municipal administration..." />
                                            </div>
                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><Award size={18} /> Client Testimonial</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Quote</label>
                                                        <textarea rows="2" value={formData.testimonial} onChange={e => setFormData({ ...formData, testimonial: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Quote from the client..."></textarea>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Author Name / Title</label>
                                                        <input type="text" value={formData.testimonialAuthor} onChange={e => setFormData({ ...formData, testimonialAuthor: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Jane Doe, CTO" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : activeTab === "research" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column (Research Project) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Project Image Map/Cover</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative overflow-hidden h-40">
                                                    {formData.image ? (
                                                        <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                                    ) : (
                                                        <div className="space-y-1 text-center flex flex-col items-center">
                                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="font-medium text-blue-600">Upload a file</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input required={false} type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Research Project Title</label>
                                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Advanced AI for Medical Diagnosis..." />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                        <option value="Blockchain">Blockchain</option>
                                                        <option value="Cybersecurity">Cybersecurity</option>
                                                        <option value="IoT & Edge Computing">IoT & Edge Computing</option>
                                                        <option value="Robotics & AI">Robotics & AI</option>
                                                        <option value="Cloud Computing">Cloud Computing</option>
                                                        <option value="Natural Language Processing">Natural Language Processing</option>
                                                        <option value="AR/VR & Healthcare">AR/VR & Healthcare</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option value="Published">Published</option>
                                                        <option value="Ongoing">Ongoing</option>
                                                        <option value="Patent Pending">Patent Pending</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                                                    <input type="text" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="2024-03" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Completion Date</label>
                                                    <input type="text" value={formData.completionDate} onChange={e => setFormData({ ...formData, completionDate: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="2025-11 (or leave blank)" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Funding Amount</label>
                                                    <input type="text" value={formData.fundingAmount} onChange={e => setFormData({ ...formData, fundingAmount: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="$2.5M" />
                                                </div>
                                                <div className="flex items-center pt-6">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5" />
                                                        <span className="text-sm font-bold text-gray-700">Featured Project</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Technologies (comma separated)</label>
                                                <input type="text" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="TensorFlow, PyTorch, PySpark" />
                                            </div>
                                        </div>

                                        {/* Right Column (Research Project) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Research Team (comma separated)</label>
                                                <input type="text" value={formData.team} onChange={e => setFormData({ ...formData, team: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Dr. Emily Chen, Dr. Rajesh Kumar" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Collaborators (comma separated)</label>
                                                <input type="text" value={formData.collaborators} onChange={e => setFormData({ ...formData, collaborators: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="MIT Medical Research, Harvard Labs" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Brief Description</label>
                                                <textarea required rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Brief project abstract..."></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Key Findings (one per line)</label>
                                                <textarea rows="2" value={formData.keyFindings} onChange={e => setFormData({ ...formData, keyFindings: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="97.3% accuracy in early cancer detection&#10;Reduced false positives by 65%"></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Publications (one per line)</label>
                                                <textarea rows="2" value={formData.publications} onChange={e => setFormData({ ...formData, publications: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Published in Nature Medicine (2025)&#10;Presented at ICML 2025"></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Patents (comma separated)</label>
                                                <input type="text" value={formData.patents} onChange={e => setFormData({ ...formData, patents: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="AI-Powered Medical Imaging Analysis System (US Patent 12,345,678)" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Citation</label>
                                                <input type="text" value={formData.citation} onChange={e => setFormData({ ...formData, citation: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Chen et al. (2025). 'Advanced Deep Learning...', Nature Medicine" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Global Impact Statement</label>
                                                <textarea rows="2" value={formData.impact} onChange={e => setFormData({ ...formData, impact: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Our AI models are now being used to diagnose 100,000+ patients monthly..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ) : activeTab === "testimonials" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column (Testimonial Details) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Author Image/Photo</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative overflow-hidden h-40">
                                                    {formData.image ? (
                                                        <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                                    ) : (
                                                        <div className="space-y-1 text-center flex flex-col items-center">
                                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                 <span className="font-medium text-blue-600">Upload a file</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input required={!editingId} type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Client Name</label>
                                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. John Doe" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Position / Title</label>
                                                    <input required type="text" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. CTO" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Company</label>
                                                    <input required type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Tech Corp" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Industry</label>
                                                    <select value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option value="Healthcare">Healthcare</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Government">Government</option>
                                                        <option value="Education">Education</option>
                                                        <option value="Enterprise">Enterprise</option>
                                                        <option value="E-Commerce">E-Commerce</option>
                                                        <option value="Logistics">Logistics</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Rating (1-5)</label>
                                                    <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                                                </div>
                                            </div>

                                            <div className="flex gap-6 pt-2">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5" />
                                                    <span className="text-sm font-bold text-gray-700">Featured Testimonial</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" checked={formData.videoTestimonial} onChange={e => setFormData({ ...formData, videoTestimonial: e.target.checked })} className="rounded text-blue-600 focus:ring-blue-500 w-5 h-5" />
                                                    <span className="text-sm font-bold text-gray-700">Video Testimonial Available</span>
                                                </label>
                                            </div>
                                            {formData.videoTestimonial && (
                                                <div className="mt-2">
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">YouTube Video Link</label>
                                                    <input type="text" value={formData.videoUrl || ""} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="https://www.youtube.com/watch?v=..." />
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column (Testimonial Details) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Associated Project</label>
                                                <input required type="text" value={formData.project} onChange={e => setFormData({ ...formData, project: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Smart City GIS Development" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Project Duration</label>
                                                    <input type="text" value={formData.projectDuration} onChange={e => setFormData({ ...formData, projectDuration: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. 6 months" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                                                    <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. June 2026" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Testimonial Quote</label>
                                                <textarea required rows="4" value={formData.testimonial} onChange={e => setFormData({ ...formData, testimonial: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Client's review/feedback..."></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Before Context (Challenge faced by client)</label>
                                                <textarea rows="2" value={formData.beforeContext} onChange={e => setFormData({ ...formData, beforeContext: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Describe client's initial state/challenge..."></textarea>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">After Results (Impact/Results achieved)</label>
                                                <textarea rows="2" value={formData.afterResults} onChange={e => setFormData({ ...formData, afterResults: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Describe the outcome/results achieved..."></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column (Ongoing Project) */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Project Image Map/Cover</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer relative overflow-hidden h-40">
                                                    {formData.image ? (
                                                        <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                                    ) : (
                                                        <div className="space-y-1 text-center flex flex-col items-center">
                                                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                            <div className="flex text-sm text-gray-600">
                                                                <span className="font-medium text-blue-600">Upload a file</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input required={!editingId} type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Smart City GIS System" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Client/Partner Name</label>
                                                <input required type="text" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Government Infra Dept" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category (Sector)</label>
                                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option>Government</option>
                                                        <option>Enterprise</option>
                                                        <option>Healthcare</option>
                                                        <option>Finance</option>
                                                        <option>Education</option>
                                                        <option>E-Commerce</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-1">Priority Badge</label>
                                                    <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                                                        <option>Critical</option>
                                                        <option>High</option>
                                                        <option>Medium</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                                <textarea required rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Project overview..."></textarea>
                                            </div>
                                        </div>

                                        {/* Right Column (Ongoing Project) */}
                                        <div className="space-y-4">
                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><Calendar size={18} /> Timeline & Progress</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                                                        <input required type="date" value={formatDateForInput(formData.startDate)} onChange={e => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Target Completion</label>
                                                        <input required type="date" value={formatDateForInput(formData.expectedCompletion)} onChange={e => setFormData({ ...formData, expectedCompletion: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Progress Percentage ({formData.progress}%)</label>
                                                    <input type="range" min="0" max="100" value={formData.progress} onChange={e => setFormData({ ...formData, progress: e.target.value })} className="w-full accent-blue-600" />
                                                </div>
                                            </div>

                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><Settings2 size={18} /> Resources & Output</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Team Size (Members)</label>
                                                        <input required type="number" min="1" value={formData.teamSize} onChange={e => setFormData({ ...formData, teamSize: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-gray-700 mb-1">Budget (without $)</label>
                                                        <input required type="text" value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="450,000" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Technologies Used (Comma Separated)</label>
                                                    <input required type="text" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="React, Node.js, Postgres..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Key Features (Comma Separated)</label>
                                                    <input required type="text" value={formData.keyFeatures} onChange={e => setFormData({ ...formData, keyFeatures: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="AI Models, Real-time mapping..." />
                                                </div>
                                            </div>
                                            <div className="border border-gray-100 bg-gray-50 p-4 rounded-2xl space-y-4 mt-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2"><CheckSquare size={18} /> Expanded Details</h4>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Objectives (Comma Separated)</label>
                                                    <input type="text" value={formData.objectives} onChange={e => setFormData({ ...formData, objectives: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Target 1, Target 2..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Challenges (Comma Separated)</label>
                                                    <input type="text" value={formData.challenges} onChange={e => setFormData({ ...formData, challenges: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="Challenge 1, Challenge 2..." />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-2">Milestones</label>
                                                    <div className="flex gap-2 mb-2">
                                                        <input type="text" value={newMilestone.name} onChange={e => setNewMilestone({ ...newMilestone, name: e.target.value })} placeholder="Milestone Name" className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                                        <select value={newMilestone.status} onChange={e => setNewMilestone({ ...newMilestone, status: e.target.value })} className="w-32 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white">
                                                            <option>Pending</option>
                                                            <option>In Progress</option>
                                                            <option>Completed</option>
                                                        </select>
                                                        <input type="month" value={newMilestone.date} onChange={e => setNewMilestone({ ...newMilestone, date: e.target.value })} className="w-32 px-2 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                                        <button type="button" onClick={() => {
                                                            if (newMilestone.name) {
                                                                setFormData({ ...formData, milestones: [...formData.milestones, { ...newMilestone }] });
                                                                setNewMilestone({ name: "", status: "Pending", date: "" });
                                                            }
                                                        }} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-bold hover:bg-blue-200">Add</button>
                                                    </div>
                                                    {formData.milestones.length > 0 && (
                                                        <div className="space-y-2 mt-2">
                                                            {formData.milestones.map((m, i) => (
                                                                <div key={i} className="flex justify-between items-center bg-white p-2 border border-gray-200 rounded-md text-xs">
                                                                    <span className="font-semibold">{m.name} <span className="text-gray-400 font-normal ml-2">{m.date}</span></span>
                                                                    <div className="flex gap-2 items-center">
                                                                        <span className="bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600 font-bold">{m.status}</span>
                                                                        <button type="button" onClick={() => setFormData({ ...formData, milestones: formData.milestones.filter((_, idx) => idx !== i) })} className="text-red-500 hover:text-red-700 font-bold">X</button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 flex justify-between items-center border-t border-gray-100">
                                    {editingId && activeTab !== "completed" && activeTab !== "casestudies" && activeTab !== "testimonials" && (
                                        <button type="button" onClick={() => { setIsModalOpen(false); setIsFinishModalOpen(true); }} className="px-6 py-3 rounded-xl font-bold bg-green-100 text-green-700 hover:bg-green-200 transition flex items-center gap-2">
                                            <CheckSquare size={18} /> Mark as Finished
                                        </button>
                                    )}
                                    {((editingId && (activeTab === "completed" || activeTab === "casestudies" || activeTab === "testimonials")) || !editingId) && <div></div>}
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                                        <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all">
                                            {isSubmitting ? "Saving..." : editingId ? "Save Changes" : activeTab === "casestudies" ? "Add Case Study" : activeTab === "completed" ? "Add Completed Project" : activeTab === "testimonials" ? "Add Testimonial" : "Add Project"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Finalize Completion Modal */}
                {isFinishModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                            <button onClick={() => setIsFinishModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-black text-green-700 mb-2 flex items-center gap-2">
                                <CheckSquare className="text-green-600" /> Finalize Completion
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">You are moving <strong>{formData.title}</strong> to Completed Projects. Provide final metrics.</p>

                            <form onSubmit={handleFinishProject} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Completed Date</label>
                                        <input required type="text" value={finishData.completedDate} onChange={e => setFinishData({ ...finishData, completedDate: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. December 2025" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Total Duration</label>
                                        <input required type="text" value={finishData.duration} onChange={e => setFinishData({ ...finishData, duration: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="e.g. 12 months" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Final Client Rating (1-5)</label>
                                        <input required type="number" min="1" max="5" value={finishData.rating} onChange={e => setFinishData({ ...finishData, rating: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Key Achievements (Comma separated)</label>
                                        <input required type="text" value={finishData.achievements} onChange={e => setFinishData({ ...finishData, achievements: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" placeholder="500+ Users, 2M+ Transactions..." />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Global Impact / Summary Statement</label>
                                        <textarea required value={finishData.impact} onChange={e => setFinishData({ ...finishData, impact: e.target.value })} className="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none resize-none" placeholder="Describe the overall business impact delivered..."></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                    <button type="button" onClick={() => setIsFinishModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                                    <button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all">
                                        {isSubmitting ? "Finalizing..." : "Save and Update Database"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </AdminLayout>
    );
}
