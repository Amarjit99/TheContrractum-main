import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import newsBrain from "../../assets/news_brain.png";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function NewsArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [article, setArticle] = useState(null);
    const [recentNews, setRecentNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch current article
                const resArt = await fetch(`${API}/api/news/${id}`);
                if (resArt.ok) {
                    const data = await resArt.json();
                    setArticle(data);
                }

                // Fetch all news for sidebar
                const resAll = await fetch(`${API}/api/news`);
                if (resAll.ok) {
                    const allData = await resAll.json();
                    // Filter out current article and take latest 5
                    setRecentNews(allData.filter(n => n._id !== id).slice(0, 5));
                }
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return newsBrain;
        if (imagePath.startsWith("http")) return imagePath;
        return `${API}${imagePath}`;
    };

    const getCategoryColor = (category) => {
        const colors = {
            Health: "bg-red-600",
            Sport: "bg-blue-600",
            Politics: "bg-indigo-600",
            Business: "bg-emerald-600",
            World: "bg-amber-600",
            Technology: "bg-cyan-600",
            Entertainment: "bg-pink-600"
        };
        return colors[category] || "bg-slate-600";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Loading News...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Article Not Found</h1>
                    <p className="text-slate-500 mb-8 font-medium">The news article you are looking for might have been moved or deleted.</p>
                    <button
                        onClick={() => navigate('/resources/news')}
                        className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                    >
                        Back to News
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-12 md:pb-20">
                    <button
                        onClick={() => navigate('/resources/news')}
                        className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                        <span className="font-bold tracking-widest uppercase text-xs">Back to News</span>
                    </button>

                    <div className="space-y-4">
                        <span className={`inline-block px-4 py-1.5 ${getCategoryColor(article.category)} text-white text-xs font-black rounded-full shadow-lg uppercase tracking-widest`}>
                            {article.category}
                        </span>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight max-w-4xl">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm font-bold tracking-wide pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">
                                    NX
                                </div>
                                <span>Nexus News Desk</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDate(article.date)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className="max-w-5xl mx-auto px-6 py-12 md:py-24">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-12">
                            {(() => {
                                let content = article.description;
                                if (typeof content === 'string') {
                                    try {
                                        if (content.startsWith('{') || content.startsWith('[')) {
                                            content = JSON.parse(content);
                                        }
                                    } catch (e) {
                                        content = article.description;
                                    }
                                }

                                return typeof content === 'object' && content !== null ? (
                                    <div className="space-y-12">
                                        {content.intro && (
                                            <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium border-l-4 border-blue-600 pl-8 italic">
                                                {content.intro}
                                            </p>
                                        )}

                                        <div className="space-y-16">
                                            {content.sections && content.sections.map((section, idx) => (
                                                <div key={idx} className="space-y-6">
                                                    {section.heading && (
                                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                                            {section.heading}
                                                        </h3>
                                                    )}

                                                    {section.image && (
                                                        <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                                            <img
                                                                src={section.image.startsWith('http') ? section.image : `${API}${section.image}`}
                                                                alt={section.heading || 'Section image'}
                                                                className="w-full h-auto object-cover"
                                                            />
                                                        </div>
                                                    )}

                                                    {section.text && (
                                                        <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                                                            {section.text}
                                                        </p>
                                                    )}

                                                    {section.buttonText && section.buttonUrl && (
                                                        <div className="pt-4">
                                                            <a 
                                                                href={section.buttonUrl.startsWith('http') ? section.buttonUrl : `https://${section.buttonUrl}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase tracking-widest text-[10px]"
                                                            >
                                                                {section.buttonText}
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l7 7m-7-7H3" />
                                                                </svg>
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {content.conclusion && (
                                            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100/50 mt-12">
                                                <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Conclusion</h4>
                                                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                                    {content.conclusion}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium mb-12 border-l-4 border-blue-600 pl-8 italic">
                                            {content}
                                        </p>

                                        <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6 font-medium">
                                            <p>
                                                Detailed coverage and analysis of this breaking news story continues as more information becomes available from official sources and our team on the ground.
                                            </p>
                                            <p>
                                                Stay tuned for further updates on this developing situation. Our commitment remains to provide accurate, timely, and comprehensive reporting on the matters that impact our community and industry sectors.
                                            </p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        {/* Share & Tags */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-12 border-y border-slate-100">
                            <div className="flex flex-wrap gap-2">
                                {['NexusNews', 'Updates', article.category].map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share this story</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-all shadow-sm"
                                        title="Share on Facebook"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                                        className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-all shadow-sm"
                                        title="Share on Twitter"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`, '_blank')}
                                        className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366] transition-all shadow-sm"
                                        title="Share on WhatsApp"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
                                        className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E4405F] hover:border-[#E4405F] transition-all shadow-sm"
                                        title="Share on Instagram"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-all shadow-sm"
                                        title="Share on LinkedIn"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                            <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Newsletter</h3>
                            <p className="text-sm text-slate-500 font-medium mb-6">Join our community of over 50k subscribers getting daily news updates.</p>
                            <form className="space-y-3">
                                <input type="email" placeholder="Email address" className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold" />
                                <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                                    Subscribe Now
                                </button>
                            </form>
                        </div>

                        <div className="sticky top-24">
                            <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Recent Stories</h3>
                            <div className="space-y-6">
                                {recentNews.length > 0 ? (
                                    recentNews.map((news) => (
                                        <div
                                            key={news._id}
                                            onClick={() => {
                                                navigate(`/resources/news/${news._id}`);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="group cursor-pointer flex gap-4"
                                        >
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-slate-100">
                                                <img
                                                    src={getImageUrl(news.image)}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                                                    alt={news.title}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{news.category || 'Industry News'}</span>
                                                <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                                    {news.title}
                                                </h4>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-400 font-medium">No other recent stories available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Scroll to Top */}
            {showScrollTop && (
                <button onClick={scrollToTop} className="fixed bottom-10 right-10 w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-all z-50 border border-slate-100 group">
                    <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            )}
        </div>
    );
}
