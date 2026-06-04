import { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, Clock, Filter, ArrowRight, CheckCircle2, Star, Users, Zap, Coffee, Shirt, PartyPopper, Lightbulb, GraduationCap, Send } from "lucide-react";
import { Link } from "react-router-dom";
import join from "../../assets/join.png";

export default function JobOpenings() {
    const [filterDepartment, setFilterDepartment] = useState("All");
    const [filterLocation, setFilterLocation] = useState("All");
    const [liveJobs, setLiveJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);

    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API}/api/cms/jobs`);
                const data = await res.json();
                setLiveJobs(Array.isArray(data) ? data.filter(j => j.status === 'Active') : []);
            } catch (err) {
                console.error('Failed to fetch jobs:', err);
            } finally {
                setJobsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const staticJobs = [
        {
            id: 1,
            title: "Senior Business Development Manager (BDM)",
            department: "Marketing",
            location: "India",
            type: "Full-Time",
            posted: "Active",
            tags: ["Sales Strategy", "Enterprise", "Leadership"]
        },
        {
            id: 2,
            title: "Junior Business Development Manager (BDM)",
            department: "Marketing",
            location: "India",
            type: "Full-Time",
            posted: "Active",
            tags: ["Networking", "B2B Sales"]
        },
        {
            id: 3,
            title: "Content Writer (YTDP)",
            department: "YTDP",
            location: "Remote",
            type: "Part-Time",
            posted: "Active",
            tags: ["Creative Writing", "SEO", "Student"]
        },
        {
            id: 4,
            title: "Corporate Ambassador (YTDP)",
            department: "YTDP",
            location: "Remote",
            type: "Part-Time",
            posted: "Active",
            tags: ["Branding", "Communication"]
        },
        {
            id: 5,
            title: "Social Media Marketer (YTDP)",
            department: "YTDP",
            location: "Remote",
            type: "Part-Time",
            posted: "Active",
            tags: ["Social Media", "Engagement"]
        },
        {
            id: 6,
            title: "Social Media Internship Program (YTDP)",
            department: "YTDP",
            location: "Worldwide",
            type: "Internship",
            posted: "Active",
            tags: ["Global", "Learning", "Student"]
        },
        {
            id: 7,
            title: "Software Development Engineer (SDE I)",
            department: "Software Developer",
            location: "Kota, Rajasthan",
            type: "Full-Time",
            posted: "Active",
            tags: ["React", "JavaScript", "Entry Level"]
        },
        {
            id: 8,
            title: "Software Development Engineer (SDE II)",
            department: "Software Developer",
            location: "Kota, Rajasthan",
            type: "Full-Time",
            posted: "Active",
            tags: ["System Design", "Node.js"]
        },
        {
            id: 9,
            title: "SDE III - Backend Developer",
            department: "Software Developer",
            location: "Kota, Rajasthan",
            type: "Full-Time",
            posted: "Active",
            tags: ["Scalability", "Architecture"]
        },
    ];

    // Merge live (admin-posted) jobs first, then static
    const dynamicJobTitles = new Set(liveJobs.map(j => (j.title || '').toLowerCase()));
    const filteredStaticJobs = staticJobs.filter(j => !dynamicJobTitles.has((j.title || '').toLowerCase()));
    const allJobs = [
        ...liveJobs.map(j => ({ ...j, id: j._id, isLive: true })),
        ...filteredStaticJobs
    ];

    // Dynamic filter options (include values from live jobs)
    const liveDepts = liveJobs.map(j => j.department).filter(Boolean);
    const liveLocs = liveJobs.map(j => j.location).filter(Boolean);
    const departments = ["All", ...new Set(["Marketing", "Software Developer", "YTDP", ...liveDepts])];
    const locations = ["All", ...new Set(["India", "Kota, Rajasthan", "Remote", "Worldwide", ...liveLocs])];

    const filteredJobs = allJobs.filter(job => {
        const matchDept = filterDepartment === "All" || job.department === filterDepartment;
        const matchLoc = filterLocation === "All" || job.location === filterLocation;
        return matchDept && matchLoc;
    });

    const perks = [
        { icon: Clock, title: "Flexible Hours", desc: "The number of hours doesn't matter as long as you deliver excellence." },
        { icon: Users, title: "Great Team", desc: "Work with some of the best minds. Voted as a top startup to work for." },
        { icon: Lightbulb, title: "Constant Learning", desc: "Get your hands dirty and learn everything needed to start your own company one day." },
        { icon: Shirt, title: "No Dress Code", desc: "Wear what you want – we won't judge your pyjamas if you deliver the goods." },
        { icon: PartyPopper, title: "Work Hard, Party Harder", desc: "From sports clubs to poker nights, we have the party bit sorted." },
        { icon: Coffee, title: "Great Food", desc: "Fresh juice, fruits, and snacks. We keep the balance between healthy and yummy." },
    ];

    const interviewSteps = [
        { step: "1", title: "Email Screening", desc: "A few initial questions sent to you via email." },
        { step: "2", title: "Telephonic Round", desc: "A quick sync to discuss shared expectations." },
        { step: "3", title: "Peer/Manager Rounds", desc: "2-3 rounds of detailed conversations." },
        { step: "4", title: "Office Visit", desc: "Spent time at the office becoming part of the vibe." },
        { step: "5", title: "The Offer", desc: "If the vibe matches, we make you an official offer." },
        { step: "6", title: "Glory", desc: "Welcome to the team! Time to shine." },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative text-white h-[550px] flex items-center" style={{ backgroundImage: `url(${join})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center sm:text-left">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-white text-sm font-bold uppercase tracking-widest mb-6 border border-red-500/30 backdrop-blur-md">
                            We are hiring!
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white drop-shadow-2xl">
                            Are you ready to do the <span className="text-red-500">best work</span> of your life?
                        </h1>
                        <p className="text-gray-100 text-lg sm:text-xl leading-relaxed drop-shadow-2xl font-medium">
                            We aren't looking for ninjas or rockstars. We're looking for normal humans with empathy who love building great products and experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch md:items-center border border-gray-100">
                    <div className="flex-1 w-full md:w-auto flex items-center gap-3 border border-gray-100 rounded-2xl px-5 py-4 bg-gray-50">
                        <Search className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Find your dream role..."
                            className="bg-transparent border-none outline-none w-full text-gray-700 font-bold"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <select
                            className="w-full sm:flex-1 md:w-56 px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 font-bold text-gray-700 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
                            value={filterDepartment}
                            onChange={(e) => setFilterDepartment(e.target.value)}
                        >
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <select
                            className="w-full sm:flex-1 md:w-56 px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 font-bold text-gray-700 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer"
                            value={filterLocation}
                            onChange={(e) => setFilterLocation(e.target.value)}
                        >
                            {locations.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Jobs List */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900">
                        {jobsLoading ? 'Loading...' : `${filteredJobs.length} ${filteredJobs.length === 1 ? 'Open Position' : 'Open Positions'}`}
                    </h2>
                    {liveJobs.length > 0 && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                            {liveJobs.length} New {liveJobs.length === 1 ? 'Position' : 'Positions'} Added
                        </span>
                    )}
                </div>

                {jobsLoading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-red-100 transition-all duration-500 md:flex items-center justify-between group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                {job.isLive && (
                                    <span className="absolute top-4 right-4 text-xs font-black bg-emerald-500 text-white px-2.5 py-1 rounded-full uppercase tracking-wide">New</span>
                                )}
                                <div className="mb-6 md:mb-0 relative z-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-500 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                                                <Briefcase size={16} />
                                            </div>
                                            <span>{job.department}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                                                <MapPin size={16} />
                                            </div>
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                                                <Clock size={16} />
                                            </div>
                                            <span>{job.type || job.posted}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Skills:</span>
                                        {(job.tags || []).slice(0, 3).map(tag => (
                                            <span key={tag} className="text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative z-10 shrink-0">
                                    <Link to={`/careers/job-application/${job.id}`}>
                                        <button className="w-full md:w-auto bg-slate-900 hover:bg-red-600 text-white font-black py-4 px-10 rounded-xl transition-all shadow-lg transform group-hover:scale-105 active:scale-95">
                                            Apply Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {filteredJobs.length === 0 && (
                            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                <Filter className="mx-auto h-16 w-16 text-gray-300 mb-6" />
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No positions found</h3>
                                <p className="text-gray-500 text-lg">Try adjusting your filters or check back later.</p>
                                <button
                                    onClick={() => { setFilterDepartment("All"); setFilterLocation("All"); }}
                                    className="mt-8 bg-red-50 text-red-600 font-black px-8 py-3 rounded-xl hover:bg-red-100 transition-all border border-red-100"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Perks Section */}
            <div className="bg-slate-900 py-24 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-black uppercase tracking-widest mb-4 border border-red-500/30">
                            Why TheContractum?
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black mb-6 italic">Life at TheContractum</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We believe in delivering results, not just hours. Join a culture that celebrates growth and work-life harmony.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {perks.map((perk, i) => {
                            const Icon = perk.icon;
                            return (
                                <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-600/20 group-hover:rotate-6 transition-transform">
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-4 italic uppercase">{perk.title}</h3>
                                    <p className="text-gray-400 font-medium leading-relaxed">{perk.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* YTDP Highlight */}
            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="bg-[#001f3f] rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 text-center md:text-left">
                                <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mb-8 mx-auto md:mx-0">
                                    <GraduationCap size={48} className="text-blue-300" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-6 italic font-serif">Young Talent Development Program</h2>
                                <p className="text-blue-100 text-xl font-medium mb-10 leading-relaxed">
                                    Are you an undergraduate or postgraduate student? Join our 6-12 month training program designed for part-time student enthusiasts to accelerate their career.
                                </p>
                                <Link to="/careers/ytdp" className="bg-blue-600 text-white font-black px-12 py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl text-lg flex items-center gap-3 w-fit mx-auto md:mx-0">
                                    Read More <ArrowRight size={22} />
                                </Link>
                            </div>
                            <div className="hidden lg:block w-72 h-72 border-8 border-blue-500/10 rounded-full absolute -right-10 bottom-0 opacity-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interview Process */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-black uppercase tracking-widest mb-4">
                            Our Method
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 font-serif underline decoration-red-600 decoration-8 underline-offset-8">How We Hire</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 opacity-50"></div>

                        {interviewSteps.map((step, i) => (
                            <div key={i} className="relative z-10 group">
                                <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-3xl mb-8 shadow-xl group-hover:scale-110 transition-transform">
                                        {step.step}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-slate-500 font-semibold leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 mb-12">
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full blur-[100px]"></div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 italic">Don't see a perfect fit?</h2>
                        <p className="text-gray-400 text-xl font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
                            We're always looking for exceptional humans who share our values. Send us your CV anyway and let's have a coffee.
                        </p>
                        <Link to="/contact/touch">
                            <button className="bg-red-600 hover:bg-red-700 text-white font-black py-5 px-14 rounded-2xl transition-all shadow-2xl text-xl flex items-center gap-3 mx-auto">
                                <Send size={24} /> Get in Touch
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}