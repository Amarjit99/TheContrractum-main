import { useState, useEffect } from 'react';
import { Search, Download, ExternalLink, Award, FileText, Calendar, User, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import internship from "../../assets/internship.png";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function EmployeeCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            console.log('Fetching certificates from:', `${API}/api/certificates/all`);
            const res = await fetch(`${API}/api/certificates/all`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            console.log('Fetched Data:', data);
            setCertificates(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching certificates:', err);
            // Fallback: try relative path if absolute fails
            try {
                const res = await fetch('/api/certificates/all');
                if (res.ok) {
                    const data = await res.json();
                    setCertificates(Array.isArray(data) ? data : []);
                }
            } catch (innerErr) {
                console.error('Relative fetch also failed:', innerErr);
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredCerts = certificates.filter(c => {
        const matchesSearch = (c.name?.toLowerCase().includes(search.toLowerCase()) || 
                              c.certificateId?.toLowerCase().includes(search.toLowerCase()));
        const matchesType = (filterType === 'all' || c.type?.toLowerCase() === filterType.toLowerCase());
        return matchesSearch && matchesType;
    });

    const handleDownload = async (fileUrl, fileName) => {
        try {
            const response = await fetch(`${API}${fileUrl}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName || 'certificate.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
            // Fallback to direct link if blob fetch fails
            window.open(`${API}${fileUrl}`, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="relative text-white h-[400px] overflow-hidden bg-gray-900" style={{
                backgroundImage: `url(${internship})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-gray-900/90"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
                        <Award size={20} className="text-yellow-400" />
                        <span className="font-bold text-xs uppercase tracking-[0.2em]">Registry of Achievement</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">Employee Certificates</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Verify and download official credentials issued by The Contractum. Our digital registry ensures the integrity of every professional milestone.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-20 w-full mb-20">
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-4 mb-12">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by Name or Certificate ID (e.g. TC-XXXX)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium text-gray-700"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {['all', 'internship', 'hackathon', 'other'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filterType === type 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Accessing Digital Archives...</p>
                    </div>
                ) : filteredCerts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <FileText size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Records Found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any matching certificates in our registry. Please check the spelling or ID.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
                        {filteredCerts.map(cert => (
                            <div key={cert._id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col group h-full">
                                {/* Certificate Thumbnail */}
                                <div className="relative aspect-[1.38/1] overflow-hidden bg-gray-100">
                                    <img 
                                        src={`${API}${cert.fileUrl}`} 
                                        alt={cert.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                        <Link 
                                            to={`/verify/${cert._id}`}
                                            className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white py-3 rounded-xl text-center font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all"
                                        >
                                            View Full details
                                        </Link>
                                    </div>
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-blue-600">
                                        {cert.type}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{cert.name}</h3>
                                            <p className="text-xs font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                                                <Briefcase size={12} className="text-blue-500" /> {cert.designation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8 flex-1">
                                        <div className="flex items-center justify-between text-[11px] py-2 border-b border-gray-50">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest">Certificate ID</span>
                                            <span className="font-mono font-bold text-blue-600">{cert.certificateId}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px] py-2 border-b border-gray-50">
                                            <span className="text-gray-400 font-bold uppercase tracking-widest">Issue Date</span>
                                            <span className="text-gray-700 font-bold uppercase tracking-widest">{new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handleDownload(cert.fileUrl, `${cert.certificateId}.png`)}
                                            className="flex-1 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all group/btn shadow-sm"
                                        >
                                            <Download size={14} className="group-hover/btn:translate-y-0.5 transition-transform" /> Download
                                        </button>
                                        <Link 
                                            to={`/verify/${cert._id}`}
                                            className="p-4 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl transition-all shadow-xl shadow-gray-200"
                                            title="Verify Credential"
                                        >
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Verification CTA */}
            <section className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Award size={32} className="text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mb-6 uppercase tracking-tight">Need to verify a credential?</h2>
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        If you are an employer or academic institution looking to verify the authenticity of a certificate, please use our secure verification portal with the unique Certificate ID.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/contact/support" className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200">
                            Contact Verification Team
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
