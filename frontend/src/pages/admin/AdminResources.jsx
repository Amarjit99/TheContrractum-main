import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Search, Plus, Edit, Trash2, X, CheckCircle, Upload,
  BookOpen, BarChart2, TrendingUp, Eye, FileText,
  Newspaper, Calendar, MapPin, Users, Loader2, ChevronRight, LayoutDashboard, Image as ImageIcon, Heart, Star,
  Download, ArrowLeft, Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SIDEBAR_TABS = [
  { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
  { id: 'blogs', label: 'Blogs & Articles', icon: BookOpen },
  { id: 'news', label: 'News Management', icon: Newspaper },
  { id: 'events', label: 'Events & Webinars', icon: Calendar },
  { id: 'whitepapers', label: 'Whitepapers', icon: FileText },
  { id: 'reports', label: 'Reports', icon: BarChart2 },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'subscribers', label: 'Newsletter Subs', icon: Users },
  { id: 'csr', label: 'CSR Initiatives', icon: Heart }
];

export default function AdminResources() {
  const { admin } = useAdminAuth();
  const headers = useMemo(() => ({
    Authorization: `Bearer ${admin?.token}`,
    'Content-Type': 'application/json'
  }), [admin?.token]);

  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (message, type = 'success') => {
    toast[type](message);
  };

  // ==========================================
  // BLOGS STATE & LOGIC
  // ==========================================
  const [blogs, setBlogs] = useState([]);
  const [searchBlogs, setSearchBlogs] = useState('');
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogSuccess, setBlogSuccess] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [blogImageMode, setBlogImageMode] = useState('url'); 
  const [uploadingBlogImg, setUploadingBlogImg] = useState(false);

  const [newBlog, setNewBlog] = useState({
    title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '',
    content: '', readTime: '', image: '', intro: '',
    sections: [{ heading: '', text: '', image: '' }],
    conclusion: '', isProfessional: false
  });

  const fetchBlogs = useCallback(async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch(`${API}/api/cms/blogs`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoadingBlogs(false);
  }, []);

  const handleBlogImageUpload = async (e, sectionIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingBlogImg(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/cms/blogs/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        const imageUrl = `${API}${data.imageUrl}`;
        if (sectionIndex !== null) {
          const updatedSections = [...newBlog.sections];
          updatedSections[sectionIndex].image = imageUrl;
          setNewBlog(prev => ({ ...prev, sections: updatedSections }));
        } else {
          setNewBlog(prev => ({ ...prev, image: imageUrl }));
        }
      } else {
        showToast('Upload failed: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Image upload failed', 'error');
    }
    setUploadingBlogImg(false);
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(`${API}/api/cms/blogs/${id}`, { method: 'DELETE', headers });
        if (res.ok) fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openBlogEditModal = (blog) => {
    setEditingBlogId(blog._id);
    const isProf = typeof blog.content === 'object' && blog.content !== null;
    setNewBlog({
      title: blog.title,
      author: blog.author,
      category: blog.category || 'Technology',
      status: blog.status || 'Draft',
      excerpt: blog.excerpt || '',
      content: isProf ? '' : (blog.content || ''),
      readTime: blog.readTime || '',
      image: blog.image || '',
      intro: isProf ? (blog.content.intro || '') : '',
      sections: isProf ? (blog.content.sections || [{ heading: '', text: '', image: '' }]) : [{ heading: '', text: '', image: '' }],
      conclusion: blog.conclusion || (isProf ? (blog.content.conclusion || '') : ''),
      isProfessional: isProf
    });
    setIsBlogModalOpen(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author) return showToast("Please fill title and author", "error");

    try {
      const categoryValue = newBlog.category === '__custom__' ? customCategory.trim() : newBlog.category;
      if (newBlog.category === '__custom__' && !categoryValue) return showToast('Please enter a custom category', 'error');

      const payload = {
        ...newBlog,
        category: categoryValue,
        content: newBlog.isProfessional ? {
          intro: newBlog.intro,
          sections: newBlog.sections,
          conclusion: newBlog.conclusion
        } : newBlog.content,
        conclusion: newBlog.conclusion || (newBlog.isProfessional ? newBlog.conclusion : '')
      };
      
      let res;
      if (editingBlogId) {
        res = await fetch(`${API}/api/cms/blogs/${editingBlogId}`, { method: 'PUT', headers, body: JSON.stringify(payload) });
      } else {
        res = await fetch(`${API}/api/cms/blogs`, { method: 'POST', headers, body: JSON.stringify(payload) });
      }
      
      if (res.ok) {
        setBlogSuccess(true);
        fetchBlogs();
        setTimeout(() => {
          setIsBlogModalOpen(false);
          setBlogSuccess(false);
          setEditingBlogId(null);
          setCustomCategory('');
          setNewBlog({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '', intro: '', sections: [{ heading: '', text: '', image: '' }], conclusion: '', isProfessional: false });
        }, 1500);
      } else {
        showToast(editingBlogId ? "Failed to update post." : "Failed to create post.", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlogs = blogs.filter(b => (b.title || '').toLowerCase().includes(searchBlogs.toLowerCase()) || (b.author || '').toLowerCase().includes(searchBlogs.toLowerCase()));


  // ==========================================
  // NEWS STATE & LOGIC
  // ==========================================
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [searchNews, setSearchNews] = useState('');
  const [editingNewsId, setEditingNewsId] = useState(null);
  
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Business');
  const [newsDescription, setNewsDescription] = useState('');
  const [newsDate, setNewsDate] = useState(new Date().toISOString().split('T')[0]);
  const [newsFeatured, setNewsFeatured] = useState(false);
  const [newsImagePreview, setNewsImagePreview] = useState(null);
  
  const [newsIsProfessional, setNewsIsProfessional] = useState(false);
  const [newsIntro, setNewsIntro] = useState('');
  const [newsSections, setNewsSections] = useState([{ heading: '', text: '', image: '', buttonText: '', buttonUrl: '' }]);
  const [newsConclusion, setNewsConclusion] = useState('');
  const [uploadingNewsImg, setUploadingNewsImg] = useState(false);
  
  const newsFileInputRef = useRef(null);
  const newsCategories = ["Health", "Sport", "Politics", "Business", "World", "Technology", "Entertainment"];

  const fetchNews = useCallback(async () => {
    setLoadingNews(true);
    try {
      const res = await fetch(`${API}/api/admin/news`, { headers: { Authorization: `Bearer ${admin?.token}` } });
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setNews([]);
    }
    setLoadingNews(false);
  }, [admin?.token]);

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsTitle('');
    setNewsCategory('Business');
    setNewsDescription('');
    setNewsDate(new Date().toISOString().split('T')[0]);
    setNewsFeatured(false);
    setNewsImagePreview(null);
    setNewsIsProfessional(false);
    setNewsIntro('');
    setNewsSections([{ heading: '', text: '', image: '', buttonText: '', buttonUrl: '' }]);
    setNewsConclusion('');
    if (newsFileInputRef.current) newsFileInputRef.current.value = '';
  };

  const handleNewsFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewsImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setNewsImagePreview(null);
    }
  };

  const handleNewsSectionImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingNewsImg(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/news/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        const updatedSections = [...newsSections];
        updatedSections[index].image = `${API}${data.imageUrl}`;
        setNewsSections(updatedSections);
      } else {
        showToast('Upload failed: ' + (data.message || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Image upload failed', 'error');
    }
    setUploadingNewsImg(false);
  };

  const handleNewsEdit = (article) => {
    setEditingNewsId(article._id);
    setNewsTitle(article.title);
    setNewsCategory(article.category);
    if (typeof article.description === 'object' && article.description !== null) {
      setNewsIsProfessional(true);
      setNewsIntro(article.description.intro || '');
      setNewsSections(article.description.sections || [{ heading: '', text: '', image: '', buttonText: '', buttonUrl: '' }]);
      setNewsConclusion(article.description.conclusion || '');
      setNewsDescription('');
    } else {
      setNewsIsProfessional(false);
      setNewsDescription(article.description || '');
      setNewsIntro('');
      setNewsSections([{ heading: '', text: '', image: '', buttonText: '', buttonUrl: '' }]);
      setNewsConclusion('');
    }
    setNewsDate(new Date(article.date).toISOString().split('T')[0]);
    setNewsFeatured(article.featured || false);
    setNewsImagePreview(article.image.startsWith('http') ? article.image : `${API}${article.image}`);
    setIsNewsModalOpen(true);
  };

  const handleNewsDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news article?")) return;
    try {
      const res = await fetch(`${API}/api/admin/news/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${admin?.token}` } });
      if (res.ok) {
        showToast("News article deleted.");
        fetchNews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newsTitle);
    formData.append('category', newsCategory);
    
    if (newsIsProfessional) {
      formData.append('description', JSON.stringify({ intro: newsIntro, sections: newsSections, conclusion: newsConclusion }));
    } else {
      formData.append('description', newsDescription);
    }
    
    formData.append('date', newsDate);
    formData.append('featured', newsFeatured);

    if (newsFileInputRef.current && newsFileInputRef.current.files[0]) {
      formData.append('image', newsFileInputRef.current.files[0]);
    } else if (!editingNewsId) {
      return showToast('Please select an image.', 'error');
    }

    try {
      let res;
      if (editingNewsId) {
        res = await fetch(`${API}/api/admin/news/${editingNewsId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${admin?.token}` },
          body: formData
        });
      } else {
        res = await fetch(`${API}/api/admin/news`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${admin?.token}` },
          body: formData
        });
      }

      if (res.ok) {
        showToast(editingNewsId ? "News updated." : "News published.");
        setIsNewsModalOpen(false);
        resetNewsForm();
        fetchNews();
      } else {
        const data = await res.json();
        showToast(data.message || "Something went wrong.", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNews = news.filter(n => n.title.toLowerCase().includes(searchNews.toLowerCase()) || n.category.toLowerCase().includes(searchNews.toLowerCase()));


  // ==========================================
  // EVENTS STATE & LOGIC
  // ==========================================
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchEvents, setSearchEvents] = useState('');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [eventFormData, setEventFormData] = useState({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '', featured: true, type: 'upcoming' });
  const [processingEvent, setProcessingEvent] = useState(false);
  const [eventImageMode, setEventImageMode] = useState('url');
  const [uploadingEventImg, setUploadingEventImg] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      const res = await fetch(`${API}/api/mini-events`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoadingEvents(false);
  }, []);

  const fetchParticipants = async (eventId) => {
    setLoadingParticipants(true);
    setIsParticipantsModalOpen(true);
    try {
      const res = await fetch(`${API}/api/mini-events/${eventId}/participants`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      const data = await res.json();
      setParticipants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoadingParticipants(false);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setProcessingEvent(true);
    try {
      const url = editingEvent ? `${API}/api/mini-events/${editingEvent._id}` : `${API}/api/mini-events`;
      const method = editingEvent ? 'PUT' : 'POST';
      const payload = { ...eventFormData };
      if (!editingEvent) payload.type = 'upcoming'; // Ensure new events are always upcoming

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin?.token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchEvents();
        setIsEventModalOpen(false);
        setEventFormData({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '', featured: true, type: 'upcoming' });
        setEditingEvent(null);
        showToast(editingEvent ? "Event updated" : "Event created");
      }
    } catch (err) {
      console.error(err);
    }
    setProcessingEvent(false);
  };

  const handleEventDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
    try {
      const res = await fetch(`${API}/api/mini-events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventDemote = async (event) => {
    try {
      const res = await fetch(`${API}/api/mini-events/${event._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin?.token}` },
        body: JSON.stringify({ ...event, featured: false })
      });
      if (res.ok) fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingEventImg(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/cms/blogs/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setEventFormData(prev => ({ ...prev, imageUrl: `${API}${data.imageUrl}` }));
      } else {
        showToast('Upload failed: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error uploading image', 'error');
    }
    setUploadingEventImg(false);
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchEvents.toLowerCase()) ||
    e.location.toLowerCase().includes(searchEvents.toLowerCase())
  ).map(e => {
    const isPast = new Date(e.dateTime) < new Date();
    return {
      ...e,
      type: isPast ? 'past' : e.type,
      featured: isPast ? false : e.featured
    };
  });


  // ==========================================
  // WHITEPAPERS, REPORTS, MEDIA & SUBSCRIBERS STATE
  // ==========================================  // Whitepapers State
  const [whitepapers, setWhitepapers] = useState([]);
  const [whitepaperRequests, setWhitepaperRequests] = useState([]);
  const [loadingWhitepapers, setLoadingWhitepapers] = useState(true);
  const [loadingWhitepaperRequests, setLoadingWhitepaperRequests] = useState(false);
  const [showWhitepaperRequests, setShowWhitepaperRequests] = useState(false);
  const [searchWhitepapers, setSearchWhitepapers] = useState('');
  const [reports, setReports] = useState([]);
  const [reportRequests, setReportRequests] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingReportRequests, setLoadingReportRequests] = useState(false);
  const [showReportRequests, setShowReportRequests] = useState(false);
  const [searchReports, setSearchReports] = useState('');

  const [media, setMedia] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [searchMedia, setSearchMedia] = useState('');
  
  const [mediaImageMode, setMediaImageMode] = useState('url');
  const [uploadingMediaImg, setUploadingMediaImg] = useState(false);

  const handleMediaImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingMediaImg(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/cms/blogs/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMediaForm(prev => ({ ...prev, image: `${API}${data.imageUrl}` }));
      } else {
        showToast('Upload failed: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Image upload error', 'error');
    }
    setUploadingMediaImg(false);
  };

  const [mediaRelationsRequests, setMediaRelationsRequests] = useState([]);
  const [loadingMediaRelations, setLoadingMediaRelations] = useState(false);
  const [showMediaRelations, setShowMediaRelations] = useState(false);

  const [mediaKitRequests, setMediaKitRequests] = useState([]);
  const [loadingMediaKitRequests, setLoadingMediaKitRequests] = useState(false);
  const [showMediaKitRequests, setShowMediaKitRequests] = useState(false);

  const [subscribers, setSubscribers] = useState([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [searchSubscribers, setSearchSubscribers] = useState('');
  // --- Whitepapers Actions ---
  const fetchWhitepapers = useCallback(async () => {
    setLoadingWhitepapers(true);
    try {
      const res = await fetch(`${API}/api/whitepapers`);
      const data = await res.json();
      setWhitepapers(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingWhitepapers(false);
  }, []);

  const fetchWhitepaperRequests = useCallback(async () => {
    setLoadingWhitepaperRequests(true);
    try {
      const res = await fetch(`${API}/api/whitepapers/requests`, { headers });
      const data = await res.json();
      setWhitepaperRequests(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingWhitepaperRequests(false);
  }, [headers]);

  const fetchReports = useCallback(async () => {
    setLoadingReports(true);
    try {
      const res = await fetch(`${API}/api/reports`);
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoadingReports(false);
  }, []);

  const fetchReportRequests = useCallback(async () => {
    setLoadingReportRequests(true);
    try {
      const res = await fetch(`${API}/api/reports/requests`, { headers });
      const data = await res.json();
      setReportRequests(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingReportRequests(false);
  }, [headers]);

  const fetchMedia = useCallback(async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch(`${API}/api/media/items`);
      const data = await res.json();
      setMedia(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoadingMedia(false);
  }, []);

  const fetchMediaRelations = useCallback(async () => {
    setLoadingMediaRelations(true);
    try {
      const res = await fetch(`${API}/api/media/relations-requests`, { headers });
      const data = await res.json();
      setMediaRelationsRequests(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingMediaRelations(false);
  }, [headers]);

  const fetchMediaKits = useCallback(async () => {
    setLoadingMediaKitRequests(true);
    try {
      const res = await fetch(`${API}/api/media/kit-requests`, { headers });
      const data = await res.json();
      setMediaKitRequests(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingMediaKitRequests(false);
  }, [headers]);

  const fetchSubscribers = useCallback(async () => {
    setLoadingSubscribers(true);
    try {
      const res = await fetch(`${API}/api/admin/submissions/newsletter`, { headers });
      const data = await res.json();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
    setLoadingSubscribers(false);
  }, [headers]);

  const filteredWhitepapers = whitepapers.filter(w => (w.title || '').toLowerCase().includes(searchWhitepapers.toLowerCase()));
  const filteredReports = reports.filter(r => (r.title || '').toLowerCase().includes(searchReports.toLowerCase()));
  const filteredMedia = media.filter(m => (m.title || '').toLowerCase().includes(searchMedia.toLowerCase()));
  const filteredSubscribers = subscribers.filter(s => (s.email || '').toLowerCase().includes(searchSubscribers.toLowerCase()) || (s.fullName || '').toLowerCase().includes(searchSubscribers.toLowerCase()));

  // CRUD STATES
  const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState(false);
  const [editingWhitepaper, setEditingWhitepaper] = useState(null);
  const [whitepaperForm, setWhitepaperForm] = useState({ title: '', category: 'Technology', publicationDate: '', authors: '', pages: 10, fileSize: '1.2 MB', image: '', abstract: '', keyTopics: '', featured: false, year: new Date().getFullYear().toString(), pdfUrl: '' });
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [reportForm, setReportForm] = useState({ title: '', type: 'Industry Report', category: 'Technology', publicationDate: '', year: new Date().getFullYear().toString(), image: '', description: '', pages: 10, fileSize: '1.5 MB', format: 'PDF', highlights: '', featured: false });

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [mediaForm, setMediaForm] = useState({ title: '', type: 'Photo', category: 'Events', date: new Date().toISOString().split('T')[0], image: '', description: '', duration: '', tags: '', featured: false });

  // DELETE HANDLERS
  const handleDeleteWhitepaper = async (id) => {
    if (!window.confirm("Delete whitepaper?")) return;
    try {
      const res = await fetch(`${API}/api/whitepapers/${id}`, { method: 'DELETE', headers });
      if (res.ok) { showToast('Whitepaper deleted'); fetchWhitepapers(); }
    } catch (err) { console.error(err); }
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Delete report?")) return;
    try {
      const res = await fetch(`${API}/api/reports/${id}`, { method: 'DELETE', headers });
      if (res.ok) { showToast('Report deleted'); fetchReports(); }
    } catch (err) { console.error(err); }
  };

  const handleDeleteMedia = async (id) => {
    if (!window.confirm("Delete media?")) return;
    try {
      const res = await fetch(`${API}/api/media/${id}`, { method: 'DELETE', headers });
      if (res.ok) { showToast('Media deleted'); fetchMedia(); }
    } catch (err) { console.error(err); }
  };

  // SAVE HANDLERS
  const handleSaveWhitepaper = async (e) => {
    e.preventDefault();
    const payload = { ...whitepaperForm, authors: Array.isArray(whitepaperForm.authors) ? whitepaperForm.authors : whitepaperForm.authors.split(',').map(a => a.trim()), keyTopics: Array.isArray(whitepaperForm.keyTopics) ? whitepaperForm.keyTopics : whitepaperForm.keyTopics.split(',').map(k => k.trim()) };
    try {
      const url = editingWhitepaper ? `${API}/api/whitepapers/${editingWhitepaper._id}` : `${API}/api/whitepapers`;
      const res = await fetch(url, { method: editingWhitepaper ? 'PUT' : 'POST', headers, body: JSON.stringify(payload) });
      if (res.ok) { 
        showToast('Whitepaper saved'); 
        fetchWhitepapers(); 
        setIsWhitepaperModalOpen(false); 
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.message || 'Failed to save whitepaper', 'error');
      }
    } catch (err) { 
      console.error(err); 
      showToast('An error occurred while saving', 'error');
    }
  };

  const handleSaveReport = async (e) => {
    e.preventDefault();
    const payload = { ...reportForm, highlights: Array.isArray(reportForm.highlights) ? reportForm.highlights : reportForm.highlights.split('\n').map(h => h.trim()) };
    try {
      const url = editingReport ? `${API}/api/reports/${editingReport._id}` : `${API}/api/reports`;
      const res = await fetch(url, { method: editingReport ? 'PUT' : 'POST', headers, body: JSON.stringify(payload) });
      if (res.ok) { 
        showToast('Report saved'); 
        fetchReports(); 
        setIsReportModalOpen(false); 
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.message || 'Failed to save report', 'error');
      }
    } catch (err) { 
      console.error(err); 
      showToast('An error occurred while saving report', 'error');
    }
  };

  const handleSaveMedia = async (e) => {
    e.preventDefault();
    const payload = { ...mediaForm, tags: Array.isArray(mediaForm.tags) ? mediaForm.tags : mediaForm.tags.split(',').map(t => t.trim()) };
    try {
      const url = editingMedia ? `${API}/api/media/${editingMedia._id}` : `${API}/api/media`;
      const res = await fetch(url, { method: editingMedia ? 'PUT' : 'POST', headers, body: JSON.stringify(payload) });
      if (res.ok) { 
        showToast('Media saved'); 
        fetchMedia(); 
        setIsMediaModalOpen(false); 
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.message || 'Failed to save media', 'error');
      }
    } catch (err) { 
      console.error(err); 
      showToast('An error occurred while saving media', 'error');
    }
  };


  // ==========================================
  // CSR INITIATIVES STATE & LOGIC
  // ==========================================
  const [csrs, setCsrs] = useState([]);
  const [searchCsrs, setSearchCsrs] = useState('');
  const [isCsrModalOpen, setIsCsrModalOpen] = useState(false);
  const [loadingCsrs, setLoadingCsrs] = useState(true);
  const [editingCsr, setEditingCsr] = useState(null);
  const [csrImageMode, setCsrImageMode] = useState('url');
  const [uploadingCsrImg, setUploadingCsrImg] = useState(false);
  
  // CSR Report Downloads State
  const [csrDownloads, setCsrDownloads] = useState([]);
  const [showCsrDownloads, setShowCsrDownloads] = useState(false);
  const [loadingCsrDownloads, setLoadingCsrDownloads] = useState(false);

  const fetchCsrDownloads = useCallback(async () => {
    setLoadingCsrDownloads(true);
    try {
      const res = await fetch(`${API}/api/csr/report-downloads`, { headers });
      const data = await res.json();
      setCsrDownloads(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingCsrDownloads(false);
  }, [headers]);

  const [csrForm, setCsrForm] = useState({
    title: '', category: 'Social', status: 'Active', startDate: '', image: '', description: '',
    impact: { beneficiaries: '', locations: '', investment: '', outcomes: '' },
    goals: '', featured: true, sdgGoals: '', partnerOrganizations: ''
  });

  const handleCsrImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCsrImg(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API}/api/cms/blogs/upload-image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${admin?.token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setCsrForm(prev => ({ ...prev, image: `${API}${data.imageUrl}` }));
      } else {
        showToast('Upload failed: ' + (data.error || 'Unknown error'), 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Image upload error', 'error');
    }
    setUploadingCsrImg(false);
  };

  const fetchCsrs = useCallback(async () => {
    setLoadingCsrs(true);
    try {
      const res = await fetch(`${API}/api/csr`);
      const data = await res.json();
      setCsrs(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setLoadingCsrs(false);
  }, []);

  const handleDeleteCsr = async (id) => {
    if (!window.confirm("Delete this CSR Initiative?")) return;
    try {
      const res = await fetch(`${API}/api/csr/${id}`, { method: 'DELETE', headers });
      if (res.ok) { showToast('CSR Initiative deleted'); fetchCsrs(); }
    } catch (err) { console.error(err); }
  };

  const handleSaveCsr = async (e) => {
    e.preventDefault();
    const payload = {
      ...csrForm,
      goals: typeof csrForm.goals === 'string' ? csrForm.goals.split(',').map(s => s.trim()) : csrForm.goals,
      sdgGoals: typeof csrForm.sdgGoals === 'string' ? csrForm.sdgGoals.split(',').map(s => s.trim()) : csrForm.sdgGoals,
      partnerOrganizations: typeof csrForm.partnerOrganizations === 'string' ? csrForm.partnerOrganizations.split(',').map(s => s.trim()) : csrForm.partnerOrganizations,
    };
    try {
      const url = editingCsr ? `${API}/api/csr/${editingCsr._id}` : `${API}/api/csr`;
      const res = await fetch(url, { method: editingCsr ? 'PUT' : 'POST', headers, body: JSON.stringify(payload) });
      if (res.ok) { showToast('CSR Initiative saved'); fetchCsrs(); setIsCsrModalOpen(false); }
    } catch (err) { console.error(err); }
  };
  
  const handleToggleCsrFeatured = async (csr) => {
    try {
      const res = await fetch(`${API}/api/csr/${csr._id}/toggle-featured`, { method: 'PATCH', headers });
      if (res.ok) { showToast(csr.featured ? 'Moved to All Initiatives' : 'Moved to Flagship'); fetchCsrs(); }
    } catch (err) { console.error(err); }
  };

  const filteredCsrs = useMemo(() => 
    csrs.filter(c => c.title.toLowerCase().includes(searchCsrs.toLowerCase()) || c.category.toLowerCase().includes(searchCsrs.toLowerCase())),
  [csrs, searchCsrs]);

  // ==========================================
  // INITIALIZATION
  // ==========================================
  useEffect(() => {
    fetchBlogs();
    fetchNews();
    fetchEvents();
    fetchWhitepapers();
    fetchReports();
    fetchMedia();
    fetchSubscribers();
    fetchCsrs();
  }, [fetchBlogs, fetchNews, fetchEvents, fetchWhitepapers, fetchReports, fetchMedia, fetchSubscribers, fetchCsrs]);

  // Analytics Computation (Mocked + Real data)
  const stats = useMemo(() => {
    const totalBlogs = blogs.length || 0;
    const publishedBlogs = blogs.filter(b => b.status === 'Published').length || 0;
    const draftBlogs = totalBlogs - publishedBlogs;
    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalViews: (totalBlogs * 245) + 1205,
      totalNews: news.length,
      totalEvents: events.length,
      totalEventParticipants: events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0),
      totalWhitepapers: whitepapers.length,
      totalReports: reports.length,
      totalMedia: media.length,
      totalSubscribers: subscribers.length
    };
  }, [blogs, news, events, whitepapers, reports, media, subscribers]);

  // Mock Data for Charts
  const viewsData = [
    { date: 'Mon', Views: 120 }, { date: 'Tue', Views: 250 }, { date: 'Wed', Views: 180 },
    { date: 'Thu', Views: 300 }, { date: 'Fri', Views: 280 }, { date: 'Sat', Views: 410 },
    { date: 'Sun', Views: 390 }
  ];
  
  const categoryData = useMemo(() => {
    const counts = {};
    blogs.forEach(b => {
      counts[b.category || 'Other'] = (counts[b.category || 'Other'] || 0) + 1;
    });
    if (Object.keys(counts).length === 0) {
      return [{ name: 'Technology', value: 10 }, { name: 'Business', value: 5 }];
    }
    return Object.keys(counts).map(c => ({ name: c, value: counts[c] }));
  }, [blogs]);
  const COLORS = ['#1e5cdc', '#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];


  return (
    <AdminLayout>
      {/* Toast Notifier */}
      {toastMsg && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3.5 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toastMsg.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <span>{toastMsg.type === 'success' ? '✓' : '✗'}</span>
          {toastMsg.message}
        </div>
      )}

      {/* Resources Sub-sidebar and Main layout wrapper */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Resources Left Sidebar (Dark Blue theme) */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-[#0f172a] text-slate-100 flex flex-col p-5 shrink-0 border-r border-slate-800 transition-all duration-300`}>
          <div className="mb-6 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'hidden' : 'flex'}`}>
              <div className="p-2.5 bg-blue-600 rounded-xl">
                <BookOpen size={22} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm leading-tight uppercase tracking-wider text-blue-400">The Contractum</h2>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Resource Management</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 cursor-pointer"
            >
              <ChevronRight size={18} className={`transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            <div>
              {!sidebarCollapsed && <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2">Resource Management Suite</p>}
              <nav className="space-y-1">
                {SIDEBAR_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      activeSubTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                    title={tab.label}
                  >
                    <tab.icon size={18} />
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
                <p className="text-slate-300 font-bold text-xs mt-1 truncate">{admin?.name || 'Admin User'}</p>
                <p className="text-blue-400 font-bold text-[9px] uppercase tracking-wider truncate">{admin?.adminSubRole || 'System Admin'}</p>
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
          <header className="border-b border-gray-100 px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-20 shadow-xs">
             <div>
                <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  Resources Dashboard
                </h1>
                <p className="text-gray-500 text-[11px] mt-0.5">Manage Blogs, Articles, News, Events, and more.</p>
             </div>
          </header>

          <div className="p-6 flex-1 overflow-y-auto">
          
          {/* OVERVIEW & ANALYTICS */}
          {activeSubTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Blogs</p>
                      <h3 className="text-2xl font-black text-gray-800 mt-1">{stats.totalBlogs}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><FileText size={20} /></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total News</p>
                      <h3 className="text-2xl font-black text-gray-800 mt-1">{stats.totalNews}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><Newspaper size={20} /></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Events</p>
                      <h3 className="text-2xl font-black text-gray-800 mt-1">{stats.totalEvents}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Calendar size={20} /></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Attendees</p>
                      <h3 className="text-2xl font-black text-gray-800 mt-1">{stats.totalEventParticipants}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Users size={20} /></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <TrendingUp size={18} className="text-blue-500" /> Resource Views (7 Days)
                  </h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={viewsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="Views" stroke="#1e5cdc" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
                  <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <BarChart2 size={18} className="text-indigo-500" /> Blogs by Category
                  </h3>
                  <div className="flex-1 min-h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BLOGS & ARTICLES */}
          {activeSubTab === 'blogs' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchBlogs} onChange={e => setSearchBlogs(e.target.value)} placeholder="Search articles..."
                    className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white shadow-sm"
                  />
                </div>
                <button
                  onClick={() => { setEditingBlogId(null); setNewBlog({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '', intro: '', sections: [{ heading: '', text: '', image: '' }], conclusion: '', isProfessional: false }); setIsBlogModalOpen(true); }}
                  className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                >
                  <Plus size={16} /> Add New Post
                </button>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-[#f8fafc] border-b border-gray-100">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500">Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-xs sm:text-sm font-semibold text-gray-500">Author</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell text-xs sm:text-sm font-semibold text-gray-500 text-center">Category</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 text-center">Status</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingBlogs ? (
                        <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading blogs...</td></tr>
                      ) : filteredBlogs.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-8 text-gray-500">No blog posts found.</td></tr>
                      ) : (
                        filteredBlogs.map(b => (
                          <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px] xl:max-w-xs">{b.title}</p>
                                {typeof b.content === 'object' && <span className="bg-purple-100 text-purple-600 text-[10px] px-1.5 py-0.5 rounded-md font-bold">PRO</span>}
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden md:table-cell text-xs sm:text-sm">{b.author}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center hidden sm:table-cell">
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-semibold">{b.category}</span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${b.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => openBlogEditModal(b)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                                <button onClick={() => handleDeleteBlog(b._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* NEWS MANAGEMENT */}
          {activeSubTab === 'news' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchNews} onChange={e => setSearchNews(e.target.value)} placeholder="Search news..."
                    className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white shadow-sm"
                  />
                </div>
                <button
                  onClick={() => { resetNewsForm(); setIsNewsModalOpen(true); }}
                  className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                >
                  <Plus size={16} /> Post News Update
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {loadingNews ? (
                  <div className="col-span-full py-12 text-center text-gray-500">Loading news...</div>
                ) : filteredNews.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-gray-500">No news articles found.</div>
                ) : (
                  filteredNews.map(n => (
                    <div key={n._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full">
                      <div className="h-40 sm:h-48 relative overflow-hidden bg-slate-100 shrink-0">
                        <img src={n.image.startsWith('http') ? n.image : `${API}${n.image}`} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-white/90 backdrop-blur text-[#1e5cdc] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow">{n.category}</span>
                          {typeof n.description === 'object' && n.description !== null && <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow">PRO</span>}
                          {n.featured && <span className="bg-yellow-400/90 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow">Featured</span>}
                        </div>
                      </div>
                      <div className="p-3 sm:p-5 flex flex-col flex-grow">
                        <p className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1 mb-2"><Calendar size={12} /> {new Date(n.date).toLocaleDateString()}</p>
                        <h3 className="font-black text-slate-800 text-base sm:text-lg leading-tight mb-2 line-clamp-2">{n.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                          {typeof n.description === 'object' && n.description !== null ? n.description.intro : n.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <button onClick={() => handleNewsEdit(n)} className="text-[#1e5cdc] text-sm font-bold flex items-center gap-1 hover:underline"><Edit size={14} /> Edit</button>
                          <button onClick={() => handleNewsDelete(n._id)} className="text-red-400 text-sm font-bold flex items-center gap-1 hover:text-red-600 transition"><Trash2 size={14} /> Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* EVENTS & WEBINARS */}
          {activeSubTab === 'events' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchEvents} onChange={e => setSearchEvents(e.target.value)} placeholder="Search events..."
                    className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white shadow-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/admin/event-registrations"
                    className="flex items-center gap-2 bg-white text-[#1e5cdc] border border-[#1e5cdc] hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                  >
                    <Users size={16} /> User Registrations
                  </Link>
                  <button
                    onClick={() => { setEditingEvent(null); setEventFormData({ title: '', description: '', dateTime: '', location: '', capacity: 10, imageUrl: '', featured: true, type: 'upcoming' }); setIsEventModalOpen(true); }}
                    className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                  >
                    <Plus size={16} /> Create New Event
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#f8fafc] border-b border-gray-100">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Event Detail</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Date & Location</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden md:table-cell">Occupancy</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right sm:text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingEvents ? (
                        <tr><td colSpan="4" className="py-8 text-center text-gray-500">Loading events...</td></tr>
                      ) : filteredEvents.length === 0 ? (
                        <tr><td colSpan="4" className="py-8 text-center text-gray-500">No events found.</td></tr>
                      ) : (
                        [
                          { title: 'Featured Events', items: filteredEvents.filter(e => e.featured), bg: 'bg-blue-50/50', text: 'text-blue-800' },
                          { title: 'Standard Events', items: filteredEvents.filter(e => e.type !== 'past'), bg: 'bg-slate-50', text: 'text-slate-700' },
                          { title: 'Past Events', items: filteredEvents.filter(e => e.type === 'past'), bg: 'bg-gray-100', text: 'text-gray-500' }
                        ].map(group => (
                          <React.Fragment key={group.title}>
                            <tr className={group.bg}>
                              <td colSpan="4" className={`px-3 sm:px-6 py-2 text-xs font-black uppercase tracking-widest ${group.text}`}>{group.title} ({group.items.length})</td>
                            </tr>
                            {group.items.length === 0 && (
                              <tr><td colSpan="4" className="py-4 text-center text-gray-400 text-sm">No {group.title.toLowerCase()} found.</td></tr>
                            )}
                            {group.items.map(event => (
                              <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                      {event.imageUrl ? <img src={event.imageUrl} className="w-full h-full object-cover" /> : <Calendar className="text-gray-300 w-5 h-5" />}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-800 text-sm truncate max-w-[150px] lg:max-w-[250px]">{event.title}</p>
                                      <p className="text-[10px] text-gray-500 line-clamp-1 max-w-[150px] lg:max-w-[250px]">{event.description}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                      <Calendar size={12} className="text-blue-500" />
                                      <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                      <MapPin size={12} className="text-blue-500" />
                                      <span className="truncate max-w-[120px]">{event.location}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell">
                                  <div className="flex items-center gap-3">
                                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div className={`h-full ${(event.registeredCount || 0) >= event.capacity ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(((event.registeredCount || 0) / event.capacity) * 100, 100)}%` }} />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-700">{event.registeredCount || 0}/{event.capacity}</span>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center justify-end sm:justify-start gap-1">
                                    <button onClick={() => fetchParticipants(event._id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                                    {event.featured && (
                                        <button onClick={() => handleEventDemote(event)} title="Demote to Standard" className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                        </button>
                                    )}
                                    <button onClick={() => { setEditingEvent(event); setEventFormData({ ...event, dateTime: new Date(event.dateTime).toISOString().slice(0, 16) }); setIsEventModalOpen(true); }} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleEventDelete(event._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* WHITEPAPERS MANAGEMENT */}
          {activeSubTab === 'whitepapers' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-sm">
                  {!showWhitepaperRequests && (
                    <>
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={searchWhitepapers} onChange={e => setSearchWhitepapers(e.target.value)} placeholder="Search whitepapers..."
                        className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full bg-white shadow-sm"
                      />
                    </>
                  )}
                  {showWhitepaperRequests && (
                    <h3 className="text-lg font-bold text-gray-800">Whitepaper Downloads ({whitepaperRequests.length})</h3>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (!showWhitepaperRequests) fetchWhitepaperRequests();
                      setShowWhitepaperRequests(!showWhitepaperRequests);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-2 ${showWhitepaperRequests ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {showWhitepaperRequests ? <ArrowLeft size={16} /> : <Download size={16} />}
                    {showWhitepaperRequests ? 'Back to Whitepapers' : 'Report Downloads'}
                  </button>
                  {!showWhitepaperRequests && (
                    <button
                      onClick={() => { setEditingWhitepaper(null); setWhitepaperForm({ title: '', category: 'Technology', publicationDate: '', authors: '', pages: 10, fileSize: '1.2 MB', image: '', abstract: '', keyTopics: '', featured: false, year: new Date().getFullYear().toString(), pdfUrl: '' }); setIsWhitepaperModalOpen(true); }}
                      className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                    >
                      <Plus size={16} /> Add Whitepaper
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  {showWhitepaperRequests ? (
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fafc] border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Email</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Company</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Whitepaper</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingWhitepaperRequests ? (
                          <tr><td colSpan="6" className="py-8 text-center text-gray-500">Loading downloads...</td></tr>
                        ) : whitepaperRequests.length === 0 ? (
                          <tr><td colSpan="6" className="py-8 text-center text-gray-500">No downloads yet.</td></tr>
                        ) : (
                          whitepaperRequests.map(d => (
                            <tr key={d._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-bold text-gray-800">{d.fullName}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.contact}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.company}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.whitepaperId?.title || 'Unknown'}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left">
                    <thead className="bg-[#f8fafc] border-b border-gray-100">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Title & Category</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Details</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingWhitepapers ? (
                        <tr><td colSpan="3" className="py-8 text-center text-gray-500">Loading whitepapers...</td></tr>
                      ) : filteredWhitepapers.length === 0 ? (
                        <tr><td colSpan="3" className="py-8 text-center text-gray-500">No whitepapers found.</td></tr>
                      ) : (
                        [
                          { title: 'Featured Whitepapers', items: filteredWhitepapers.filter(w => w.featured), bg: 'bg-blue-50/50', text: 'text-blue-800' },
                          { title: 'Standard Whitepapers', items: filteredWhitepapers.filter(w => !w.featured), bg: 'bg-slate-50', text: 'text-slate-700' }
                        ].map(group => (
                          <React.Fragment key={group.title}>
                            <tr className={group.bg}>
                              <td colSpan="3" className={`px-3 sm:px-6 py-2 text-xs font-black uppercase tracking-widest ${group.text}`}>{group.title} ({group.items.length})</td>
                            </tr>
                            {group.items.length === 0 && (
                              <tr><td colSpan="3" className="py-4 text-center text-gray-400 text-sm">No {group.title.toLowerCase()} found.</td></tr>
                            )}
                            {group.items.map(w => (
                              <tr key={w._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                      {w.image ? <img src={w.image} className="w-full h-full object-cover" /> : <FileText className="text-gray-300 w-5 h-5" />}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-800 text-sm truncate max-w-[150px] lg:max-w-[250px]">{w.title}</p>
                                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">{w.category}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                  <div className="text-xs font-semibold text-gray-500">
                                    <p>Year: {w.year}</p>
                                    <p>Downloads: {w.downloadCount}</p>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => { setEditingWhitepaper(w); setWhitepaperForm({ ...w, authors: w.authors.join(', '), keyTopics: w.keyTopics.join(', ') }); setIsWhitepaperModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteWhitepaper(w._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* REPORTS MANAGEMENT */}
          {activeSubTab === 'reports' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-sm">
                  {!showReportRequests && (
                    <>
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={searchReports} onChange={e => setSearchReports(e.target.value)} placeholder="Search reports..."
                        className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full bg-white shadow-sm"
                      />
                    </>
                  )}
                  {showReportRequests && (
                    <h3 className="text-lg font-bold text-gray-800">Report Downloads ({reportRequests.length})</h3>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (!showReportRequests) fetchReportRequests();
                      setShowReportRequests(!showReportRequests);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-2 ${showReportRequests ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {showReportRequests ? <ArrowLeft size={16} /> : <Download size={16} />}
                    {showReportRequests ? 'Back to Reports' : 'Report Downloads'}
                  </button>
                  {!showReportRequests && (
                    <button
                      onClick={() => { setEditingReport(null); setReportForm({ title: '', type: 'Industry Report', category: 'Technology', publicationDate: '', year: new Date().getFullYear().toString(), image: '', description: '', pages: 10, fileSize: '1.5 MB', format: 'PDF', highlights: '', featured: false }); setIsReportModalOpen(true); }}
                      className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                    >
                      <Plus size={16} /> Add Report
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  {showReportRequests ? (
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fafc] border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Email</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Company</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Report</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingReportRequests ? (
                          <tr><td colSpan="6" className="py-8 text-center text-gray-500">Loading downloads...</td></tr>
                        ) : reportRequests.length === 0 ? (
                          <tr><td colSpan="6" className="py-8 text-center text-gray-500">No downloads yet.</td></tr>
                        ) : (
                          reportRequests.map(d => (
                            <tr key={d._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-bold text-gray-800">{d.fullName}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.contact}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.company}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.reportId?.title || 'Unknown'}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left">
                    <thead className="bg-[#f8fafc] border-b border-gray-100">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Report Title & Type</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Meta Data</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingReports ? (
                        <tr><td colSpan="3" className="py-8 text-center text-gray-500">Loading reports...</td></tr>
                      ) : filteredReports.length === 0 ? (
                        <tr><td colSpan="3" className="py-8 text-center text-gray-500">No reports found.</td></tr>
                      ) : (
                        [
                          { title: 'Featured Reports', items: filteredReports.filter(r => r.featured), bg: 'bg-blue-50/50', text: 'text-blue-800' },
                          { title: 'Standard Reports', items: filteredReports.filter(r => !r.featured), bg: 'bg-slate-50', text: 'text-slate-700' }
                        ].map(group => (
                          <React.Fragment key={group.title}>
                            <tr className={group.bg}>
                              <td colSpan="3" className={`px-3 sm:px-6 py-2 text-xs font-black uppercase tracking-widest ${group.text}`}>{group.title} ({group.items.length})</td>
                            </tr>
                            {group.items.length === 0 && (
                              <tr><td colSpan="3" className="py-4 text-center text-gray-400 text-sm">No {group.title.toLowerCase()} found.</td></tr>
                            )}
                            {group.items.map(r => (
                              <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                      {r.image ? <img src={r.image} className="w-full h-full object-cover" /> : <BarChart2 className="text-gray-300 w-5 h-5" />}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-800 text-sm truncate max-w-[150px] lg:max-w-[250px]">{r.title}</p>
                                      <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">{r.type}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                  <div className="text-xs font-semibold text-gray-500">
                                    <p>Category: {r.category}</p>
                                    <p>Downloads: {r.downloads}</p>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center justify-end gap-1">
                                    <button onClick={() => { setEditingReport(r); setReportForm({ ...r, highlights: r.highlights.join(', ') }); setIsReportModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteReport(r._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MEDIA MANAGEMENT */}
          {activeSubTab === 'media' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-sm">
                  {!showMediaRelations && !showMediaKitRequests && (
                    <>
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={searchMedia} onChange={e => setSearchMedia(e.target.value)} placeholder="Search media..."
                        className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full bg-white shadow-sm"
                      />
                    </>
                  )}
                  {showMediaRelations && (
                    <h3 className="text-lg font-bold text-gray-800">Media Relations ({mediaRelationsRequests.length})</h3>
                  )}
                  {showMediaKitRequests && (
                    <h3 className="text-lg font-bold text-gray-800">Media Kit Downloads ({mediaKitRequests.length})</h3>
                  )}
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => {
                      if (!showMediaRelations) fetchMediaRelations();
                      setShowMediaRelations(!showMediaRelations);
                      setShowMediaKitRequests(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-1.5 ${showMediaRelations ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'}`}
                  >
                    {showMediaRelations ? <ArrowLeft size={16} /> : <Mail size={16} />}
                    {showMediaRelations ? 'Back' : 'Relations'}
                  </button>
                  <button
                    onClick={() => {
                      if (!showMediaKitRequests) fetchMediaKits();
                      setShowMediaKitRequests(!showMediaKitRequests);
                      setShowMediaRelations(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-1.5 ${showMediaKitRequests ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {showMediaKitRequests ? <ArrowLeft size={16} /> : <Download size={16} />}
                    {showMediaKitRequests ? 'Back' : 'Kits'}
                  </button>
                  {!showMediaRelations && !showMediaKitRequests && (
                    <button
                      onClick={() => { setEditingMedia(null); setMediaForm({ title: '', type: 'Photo', category: 'Events', date: new Date().toISOString().split('T')[0], image: '', description: '', duration: '', tags: '', featured: false }); setIsMediaModalOpen(true); }}
                      className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                    >
                      <Plus size={16} /> Add Media
                    </button>
                  )}
                </div>
              </div>

              {showMediaRelations ? (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fafc] border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Email</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Outlet</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Subject</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingMediaRelations ? (
                          <tr><td colSpan="5" className="py-8 text-center text-gray-500">Loading inquiries...</td></tr>
                        ) : mediaRelationsRequests.length === 0 ? (
                          <tr><td colSpan="5" className="py-8 text-center text-gray-500">No inquiries yet.</td></tr>
                        ) : (
                          mediaRelationsRequests.map(d => (
                            <tr key={d._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-bold text-gray-800">{d.fullName}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.outlet}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.subject}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : showMediaKitRequests ? (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fafc] border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Email</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Company</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingMediaKitRequests ? (
                          <tr><td colSpan="4" className="py-8 text-center text-gray-500">Loading downloads...</td></tr>
                        ) : mediaKitRequests.length === 0 ? (
                          <tr><td colSpan="4" className="py-8 text-center text-gray-500">No downloads yet.</td></tr>
                        ) : (
                          mediaKitRequests.map(d => (
                            <tr key={d._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-bold text-gray-800">{d.fullName}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.company}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {loadingMedia ? (
                  <div className="col-span-full py-12 text-center text-gray-500">Loading media...</div>
                ) : filteredMedia.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-gray-500">No media found.</div>
                ) : (
                  filteredMedia.map(m => (
                    <div key={m._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group flex flex-col h-full">
                      <div className="h-40 relative overflow-hidden bg-slate-100 shrink-0">
                        {m.type === 'Photo' ? (
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 group-hover:bg-slate-300 transition duration-500">
                            <ImageIcon size={32} />
                          </div>
                        )}
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="bg-black/70 backdrop-blur text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest">{m.type}</span>
                        </div>
                      </div>
                      <div className="p-3 flex flex-col flex-grow">
                        <p className="text-[10px] font-bold text-gray-400 mb-1">{m.category} • {m.date}</p>
                        <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2">{m.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{m.description}</p>
                        
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                          <button onClick={() => { setEditingMedia(m); setMediaForm({ ...m, tags: (m.tags || []).join(', ') }); setIsMediaModalOpen(true); }} className="text-[#1e5cdc] text-xs font-bold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteMedia(m._id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              )}
            </div>
          )}

          {/* SUBSCRIBERS MANAGEMENT */}
          {activeSubTab === 'subscribers' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchSubscribers} onChange={e => setSearchSubscribers(e.target.value)} placeholder="Search subscribers..."
                    className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white shadow-sm"
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#f8fafc] border-b border-gray-100">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Subscriber</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Source</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingSubscribers ? (
                        <tr><td colSpan="3" className="py-8 text-center text-gray-500">Loading subscribers...</td></tr>
                      ) : filteredSubscribers.length === 0 ? (
                        <tr><td colSpan="3" className="py-8 text-center text-gray-500">No subscribers found.</td></tr>
                      ) : (
                        filteredSubscribers.map(s => (
                          <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                                  <span className="text-blue-700 font-bold text-lg">{s.fullName ? s.fullName.charAt(0).toUpperCase() : s.email.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                  <p className="font-bold text-gray-800 text-sm truncate">{s.fullName || 'Subscriber'}</p>
                                  <span className="text-xs text-gray-500">{s.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4">
                              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{s.source || 'Unknown'}</span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                              <span className="text-xs font-semibold text-gray-500">{new Date(s.createdAt || s.subscribedAt).toLocaleDateString()}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* CSR INITIATIVES MANAGEMENT */}
          {activeSubTab === 'csr' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-sm">
                  {!showCsrDownloads && (
                    <>
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={searchCsrs} onChange={e => setSearchCsrs(e.target.value)} placeholder="Search CSR initiatives..."
                        className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full bg-white shadow-sm"
                      />
                    </>
                  )}
                  {showCsrDownloads && (
                    <h3 className="text-lg font-bold text-gray-800">CSR Report Downloads ({csrDownloads.length})</h3>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (!showCsrDownloads) fetchCsrDownloads();
                      setShowCsrDownloads(!showCsrDownloads);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0 flex items-center gap-2 ${showCsrDownloads ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {showCsrDownloads ? <ArrowLeft size={16} /> : <Download size={16} />}
                    {showCsrDownloads ? 'Back to Initiatives' : 'Report Downloads'}
                  </button>
                  {!showCsrDownloads && (
                    <button
                      onClick={() => { setEditingCsr(null); setCsrForm({ title: '', category: 'Social', status: 'Active', startDate: '', image: '', description: '', impact: { beneficiaries: '', locations: '', investment: '', outcomes: '' }, goals: '', featured: true, sdgGoals: '', partnerOrganizations: '' }); setCsrImageMode('url'); setIsCsrModalOpen(true); }}
                      className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                    >
                      <Plus size={16} /> Add CSR Initiative
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  {showCsrDownloads ? (
                    <table className="w-full text-left">
                      <thead className="bg-[#f8fafc] border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Email</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Country</th>
                          <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingCsrDownloads ? (
                          <tr><td colSpan="5" className="py-8 text-center text-gray-500">Loading downloads...</td></tr>
                        ) : csrDownloads.length === 0 ? (
                          <tr><td colSpan="5" className="py-8 text-center text-gray-500">No downloads yet.</td></tr>
                        ) : (
                          csrDownloads.map(d => (
                            <tr key={d._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-bold text-gray-800">{d.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.email}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.contact}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{d.country || 'N/A'}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left">
                    <thead className="bg-[#f8fafc] border-b border-gray-100">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Initiative Detail</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden sm:table-cell">Impact</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest text-center">Status</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {loadingCsrs ? (
                        <tr><td colSpan="4" className="py-8 text-center text-gray-500">Loading initiatives...</td></tr>
                      ) : filteredCsrs.length === 0 ? (
                        <tr><td colSpan="4" className="py-8 text-center text-gray-500">No initiatives found.</td></tr>
                      ) : (
                        [
                          { title: 'Flagship Initiatives', items: filteredCsrs.filter(c => c.featured), bg: 'bg-blue-50/50', text: 'text-blue-800' },
                          { title: 'All CSR Initiatives', items: filteredCsrs.filter(c => !c.featured), bg: 'bg-slate-50', text: 'text-slate-700' }
                        ].map(group => (
                          <React.Fragment key={group.title}>
                            <tr className={group.bg}>
                              <td colSpan="4" className={`px-3 sm:px-6 py-2 text-xs font-black uppercase tracking-widest ${group.text}`}>{group.title} ({group.items.length})</td>
                            </tr>
                            {group.items.length === 0 && (
                              <tr><td colSpan="4" className="py-4 text-center text-gray-400 text-sm">No {group.title.toLowerCase()} found.</td></tr>
                            )}
                            {group.items.map(c => (
                              <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                      {c.image ? <img src={c.image} className="w-full h-full object-cover" /> : <Heart className="text-gray-300 w-5 h-5" />}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-800 text-sm truncate max-w-[150px] lg:max-w-[250px]">{c.title}</p>
                                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{c.category}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                                  <div className="text-xs font-semibold text-gray-500">
                                    <p>Beneficiaries: {c.impact?.beneficiaries || 'N/A'}</p>
                                    <p>Investment: {c.impact?.investment || 'N/A'}</p>
                                  </div>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4">
                                  <div className="flex items-center justify-end gap-1">
                                    {c.featured ? (
                                      <button onClick={() => handleToggleCsrFeatured(c)} title="Move to All Initiatives" className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg"><TrendingUp size={16} /></button>
                                    ) : (
                                      <button onClick={() => handleToggleCsrFeatured(c)} title="Make Flagship" className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Star size={16} /></button>
                                    )}
                                    <button onClick={() => { setEditingCsr(c); setCsrForm({ ...c, goals: c.goals.join(', '), sdgGoals: c.sdgGoals.join(', '), partnerOrganizations: c.partnerOrganizations.join(', '), impact: c.impact || { beneficiaries: '', locations: '', investment: '', outcomes: '' } }); setIsCsrModalOpen(true); }} className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteCsr(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          )}

          </div>
        </main>
      </div>
      {/* ========================================================================= */}
      {/* MODALS SECTION */}
      {/* ========================================================================= */}
      
      {/* 1. Blog Edit/Create Modal (Re-used structure from previous AdminResources) */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-[#1e5cdc]/5 to-blue-50 sm:rounded-t-2xl shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                  {editingBlogId ? '✏️ Edit Post' : (newBlog.isProfessional ? '🚀 Add Professional Post' : '✍️ Add Simple Post')}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Fields marked * are required.</p>
                  <div className="flex bg-gray-200 rounded-lg p-0.5 text-[10px] sm:text-xs font-bold">
                    <button type="button" onClick={() => setNewBlog(p => ({ ...p, isProfessional: false }))} className={`px-2 sm:px-3 py-1 rounded-md transition-all ${!newBlog.isProfessional ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>Simple</button>
                    <button type="button" onClick={() => setNewBlog(p => ({ ...p, isProfessional: true }))} className={`px-2 sm:px-3 py-1 rounded-md transition-all ${newBlog.isProfessional ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>Professional</button>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsBlogModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <X size={22} />
              </button>
            </div>
            {/* The rest of the form body goes here, similar to what we implemented, to keep file short, basic structure is retained */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 space-y-6">
              <form id="blog-form" onSubmit={handleBlogSubmit} className="flex flex-col flex-1 min-h-0 space-y-6">
                
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Post Title *</label>
                      <input
                        required type="text"
                        value={newBlog.title}
                        onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                        placeholder="e.g. The Future of AI in Healthcare"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Author Name *</label>
                      <input
                        required type="text"
                        value={newBlog.author}
                        onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Excerpt (Short Summary)</label>
                    <textarea
                      value={newBlog.excerpt}
                      onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                      placeholder="Write a short 1-2 sentence summary for listings..."
                      rows={2}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base resize-none transition-colors"
                    />
                  </div>
                </div>

                {/* Professional Fields */}
                {newBlog.isProfessional ? (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-50 pb-2">Professional Content Sections</h3>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Introduction Paragraph</label>
                      <textarea
                        value={newBlog.intro}
                        onChange={e => setNewBlog({ ...newBlog, intro: e.target.value })}
                        placeholder="Write a powerful introduction for your article..."
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-blue-100 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 text-sm sm:text-base transition-colors"
                      />
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-700">Article Sections</label>
                        <button type="button" onClick={() => setNewBlog(prev => ({...prev, sections: [...prev.sections, { heading: '', text: '', image: '' }]}))} className="text-xs font-bold text-white hover:text-gray-700 flex items-center gap-1 bg-blue-500 px-3 py-1.5 rounded-lg transition-colors">
                          <Plus size={14} /> Add Section
                        </button>
                      </div>

                      {newBlog.sections.map((section, idx) => (
                        <div key={idx} className="relative p-4 sm:p-6 bg-gray-50/50 rounded-2xl border-2 border-gray-100 space-y-4">
                          <button type="button" onClick={() => { if(newBlog.sections.length <= 1) return; const updated = [...newBlog.sections]; updated.splice(idx, 1); setNewBlog(prev => ({ ...prev, sections: updated })); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                            <h4 className="text-sm font-bold text-gray-700">Section {idx + 1}</h4>
                          </div>

                          <input
                            type="text"
                            value={section.heading}
                            onChange={e => { const updated = [...newBlog.sections]; updated[idx].heading = e.target.value; setNewBlog(prev => ({ ...prev, sections: updated })); }}
                            placeholder="Section Heading (e.g. Key Challenges)"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm"
                          />

                          <textarea
                            value={section.text}
                            onChange={e => { const updated = [...newBlog.sections]; updated[idx].text = e.target.value; setNewBlog(prev => ({ ...prev, sections: updated })); }}
                            placeholder="Section Content Text..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-sm resize-none"
                          />

                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <input
                              type="text"
                              value={section.image}
                              onChange={e => { const updated = [...newBlog.sections]; updated[idx].image = e.target.value; setNewBlog(prev => ({ ...prev, sections: updated })); }}
                              placeholder="Section Image URL"
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 text-xs"
                            />
                            <label className="shrink-0 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 text-xs font-semibold text-gray-600">
                              <Upload size={14} />
                              {uploadingBlogImg ? '...' : 'Upload'}
                              <input type="file" className="hidden" onChange={(e) => handleBlogImageUpload(e, idx)} />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Conclusion Paragraph</label>
                      <textarea
                        value={newBlog.conclusion}
                        onChange={e => setNewBlog({ ...newBlog, conclusion: e.target.value })}
                        placeholder="Summarize the article with a final conclusion..."
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-blue-100 rounded-lg sm:rounded-xl focus:outline-none focus:border-blue-500 text-sm sm:text-base transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider border-b border-blue-50 pb-2">Simple Content</h3>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Full Blog Content *</label>
                      <textarea
                        required={!newBlog.isProfessional}
                        value={newBlog.content}
                        onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                        placeholder="Write the full blog post content here..."
                        rows={12}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base leading-relaxed resize-y transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Settings Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider pb-2">Settings & Metadata</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Category *</label>
                      <select
                        value={newBlog.category}
                        onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base bg-white"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="AI & ML">AI &amp; ML</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Digital Transformation">Digital Transformation</option>
                        <option value="Innovation">Innovation</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Leadership">Leadership</option>
                        <option value="GIS & Mapping">GIS &amp; Mapping</option>
                        <option value="Telecom">Telecom</option>
                        <option value="HR Tech">HR Tech</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="__custom__">+ Custom Category...</option>
                      </select>
                      {newBlog.category === '__custom__' && (
                        <input
                          type="text"
                          value={customCategory}
                          onChange={e => setCustomCategory(e.target.value)}
                          placeholder="Type your custom category..."
                          className="mt-2 w-full px-3 py-2 border-2 border-[#1e5cdc] rounded-lg focus:outline-none text-sm"
                          autoFocus
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Status *</label>
                      <select
                        value={newBlog.status}
                        onChange={e => setNewBlog({ ...newBlog, status: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base bg-white"
                      >
                        <option value="Draft">📝 Draft</option>
                        <option value="Published">✅ Published</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Read Time</label>
                      <input
                        type="text"
                        value={newBlog.readTime}
                        onChange={e => setNewBlog({ ...newBlog, readTime: e.target.value })}
                        placeholder="e.g. 5 min read"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700">Cover Image URL</label>
                      <div className="flex bg-gray-100 rounded-lg p-0.5 text-[10px] font-semibold">
                        <button type="button" onClick={() => setBlogImageMode('url')} className={`px-2 py-0.5 rounded-md ${blogImageMode === 'url' ? 'bg-white text-[#1e5cdc] shadow-sm' : 'text-gray-500'}`}>URL</button>
                        <button type="button" onClick={() => setBlogImageMode('upload')} className={`px-2 py-0.5 rounded-md ${blogImageMode === 'upload' ? 'bg-white text-[#1e5cdc] shadow-sm' : 'text-gray-500'}`}>Upload</button>
                      </div>
                    </div>
                    {blogImageMode === 'url' ? (
                      <input
                        type="url"
                        value={newBlog.image}
                        onChange={e => setNewBlog({ ...newBlog, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#1e5cdc] text-sm"
                      />
                    ) : (
                      <label className={`flex items-center justify-center gap-2 w-full px-3 py-2 border-2 border-dashed rounded-lg cursor-pointer ${uploadingBlogImg ? 'bg-blue-50' : 'hover:bg-blue-50/50 hover:border-blue-400'}`}>
                        <Upload size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{uploadingBlogImg ? 'Uploading...' : 'Choose File'}</span>
                        <input type="file" className="hidden" onChange={handleBlogImageUpload} />
                      </label>
                    )}
                  </div>
                </div>

              </form>
            </div>
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-gray-100 bg-gray-50 sm:rounded-b-2xl shrink-0">
              <span className="text-xs text-gray-400 hidden sm:inline">* Required fields</span>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">Cancel</button>
                <button type="submit" form="blog-form" className="px-6 sm:px-10 py-2 text-xs sm:text-sm font-bold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-all shadow-lg shadow-blue-500/25">
                  {editingBlogId ? '💾 Save Changes' : '🚀 Publish Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. News Edit/Create Modal */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">{editingNewsId ? 'Edit News' : 'Add News'}</h2>
              <button onClick={() => setIsNewsModalOpen(false)} className="text-gray-400 hover:bg-gray-200 p-2 rounded-lg"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
                <form id="news-form" onSubmit={handleNewsSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Headline</label>
                      <input required value={newsTitle} onChange={e=>setNewsTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Category</label>
                      <select required value={newsCategory} onChange={e=>setNewsCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                        {newsCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Description / Content</label>
                    <textarea required value={newsDescription} onChange={e=>setNewsDescription(e.target.value)} rows={6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Image</label>
                        <input type="file" ref={newsFileInputRef} onChange={handleNewsFileChange} accept="image/*" className="w-full px-4 py-2 border rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Date</label>
                        <input type="date" value={newsDate} onChange={e=>setNewsDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </form>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsNewsModalOpen(false)} className="px-6 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg">Cancel</button>
              <button type="submit" form="news-form" className="px-8 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">{editingNewsId ? 'Save' : 'Publish'}</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Event Edit/Create Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h4 className="text-lg sm:text-xl font-black text-slate-800">{editingEvent ? 'Edit Event' : 'Create New Event'}</h4>
                    <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} className="sm:w-6 sm:h-6" /></button>
                </div>
                <form onSubmit={handleEventSubmit} className="p-4 sm:p-8 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
                        <input required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm font-bold" value={eventFormData.title} onChange={e => setEventFormData({...eventFormData, title: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date & Time</label>
                            <input required type="datetime-local" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs font-bold" value={eventFormData.dateTime} onChange={e => setEventFormData({...eventFormData, dateTime: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
                            <input required type="number" min="1" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm font-bold" value={eventFormData.capacity} onChange={e => setEventFormData({...eventFormData, capacity: e.target.value})} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                        <input required className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm font-bold" value={eventFormData.location} onChange={e => setEventFormData({...eventFormData, location: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL</label>
                              <div className="flex bg-slate-100 rounded-lg p-0.5 text-[10px] font-semibold">
                                <button type="button" onClick={() => setEventImageMode('url')} className={`px-2 py-0.5 rounded-md ${eventImageMode === 'url' ? 'bg-white text-[#1e5cdc] shadow-sm' : 'text-slate-500'}`}>URL</button>
                                <button type="button" onClick={() => setEventImageMode('upload')} className={`px-2 py-0.5 rounded-md ${eventImageMode === 'upload' ? 'bg-white text-[#1e5cdc] shadow-sm' : 'text-slate-500'}`}>Upload</button>
                              </div>
                            </div>
                            {eventImageMode === 'url' ? (
                                <input className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-[10px] sm:text-xs font-mono" value={eventFormData.imageUrl} onChange={e => setEventFormData({...eventFormData, imageUrl: e.target.value})} placeholder="https://..." />
                            ) : (
                                <label className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 sm:py-3 border-2 border-dashed rounded-xl cursor-pointer ${uploadingEventImg ? 'bg-blue-50' : 'hover:bg-blue-50/50 hover:border-blue-400'} border-slate-200 bg-slate-50`}>
                                  <Upload size={16} className="text-slate-400" />
                                  <span className="text-xs text-slate-500">{uploadingEventImg ? 'Uploading...' : 'Choose Image File'}</span>
                                  <input type="file" className="hidden" onChange={handleEventImageUpload} accept="image/*" />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-1">
                        <input type="checkbox" id="evFeatured" checked={eventFormData.featured} onChange={e => setEventFormData({...eventFormData, featured: e.target.checked})} className="w-4 h-4 text-[#1e5cdc] bg-slate-100 border-slate-300 rounded focus:ring-[#1e5cdc]" />
                        <label htmlFor="evFeatured" className="text-xs font-black text-slate-600 uppercase tracking-wider">Featured Event</label>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea required rows={3} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#1e5cdc] text-xs sm:text-sm resize-none" value={eventFormData.description} onChange={e => setEventFormData({...eventFormData, description: e.target.value})} />
                    </div>

                    <button disabled={processingEvent} type="submit" className="w-full py-3 sm:py-4 bg-[#1e5cdc] text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4">
                        {processingEvent ? <Loader2 className="animate-spin" size={20}/> : editingEvent ? 'Update Event' : 'Publish Event'}
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* 4. Event Participants Modal */}
      {isParticipantsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                      <div>
                          <h4 className="text-lg sm:text-xl font-black text-slate-800">Event Attendees</h4>
                          <p className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider">REAL-TIME PARTICIPANT LIST</p>
                      </div>
                      <button onClick={() => setIsParticipantsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} className="sm:w-6 sm:h-6" /></button>
                  </div>
                  <div className="p-4 sm:p-8 max-h-[70vh] sm:max-h-[500px] overflow-y-auto custom-scrollbar">
                      {loadingParticipants ? (
                          <div className="py-10 sm:py-20 text-center">
                              <Loader2 size={24} className="animate-spin mx-auto text-blue-600 mb-4 sm:w-8 sm:h-8" />
                              <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Retrieving Audience Data...</p>
                          </div>
                      ) : participants.length === 0 ? (
                          <div className="py-10 sm:py-20 text-center text-slate-300">
                              <Users className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 opacity-20" />
                              <p className="font-bold text-xs sm:text-sm">No participants have RSVPed yet.</p>
                          </div>
                      ) : (
                          <table className="w-full text-left">
                              <thead className="bg-slate-50/50">
                                  <tr>
                                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                  {participants.map(p => (
                                      <tr key={p._id} className="hover:bg-slate-50/30">
                                          <td className="px-3 sm:px-4 py-2 sm:py-3">
                                              <div className="flex items-center gap-2 sm:gap-3">
                                                  <img src={`https://ui-avatars.com/api/?name=${p.firstName}+${p.lastName}&background=random`} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-slate-100 shrink-0" />
                                                  <span className="text-xs sm:text-sm font-bold text-slate-700 truncate max-w-[100px] sm:max-w-none">{p.firstName} {p.lastName}</span>
                                              </div>
                                          </td>
                                          <td className="px-3 sm:px-4 py-2 sm:py-3">
                                              <p className="text-[10px] sm:text-xs font-medium text-slate-600 truncate max-w-[120px] sm:max-w-none">{p.email}</p>
                                              <p className="text-[8px] sm:text-[10px] text-slate-400">{p.mobile}</p>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}
                  </div>
              </div>
          </div>
      )}
      {/* 5. Whitepaper Modal */}
      {isWhitepaperModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
              <h2 className="text-xl font-bold text-gray-800">{editingWhitepaper ? 'Edit Whitepaper' : 'Add Whitepaper'}</h2>
              <button onClick={() => setIsWhitepaperModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSaveWhitepaper} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.title} onChange={e => setWhitepaperForm({...whitepaperForm, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.category} onChange={e => setWhitepaperForm({...whitepaperForm, category: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Publication Date</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.publicationDate} onChange={e => setWhitepaperForm({...whitepaperForm, publicationDate: e.target.value})} placeholder="e.g. October 2026" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.year} onChange={e => setWhitepaperForm({...whitepaperForm, year: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Authors (comma separated)</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.authors} onChange={e => setWhitepaperForm({...whitepaperForm, authors: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Key Topics (comma separated)</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.keyTopics} onChange={e => setWhitepaperForm({...whitepaperForm, keyTopics: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pages</label>
                    <input required type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.pages} onChange={e => setWhitepaperForm({...whitepaperForm, pages: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">File Size</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.fileSize} onChange={e => setWhitepaperForm({...whitepaperForm, fileSize: e.target.value})} placeholder="e.g. 2.4 MB" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">PDF URL</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.pdfUrl} onChange={e => setWhitepaperForm({...whitepaperForm, pdfUrl: e.target.value})} />
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <input type="checkbox" id="wpFeatured" checked={whitepaperForm.featured} onChange={e => setWhitepaperForm({...whitepaperForm, featured: e.target.checked})} />
                    <label htmlFor="wpFeatured" className="text-sm font-semibold text-gray-700">Featured</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image URL</label>
                  <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.image} onChange={e => setWhitepaperForm({...whitepaperForm, image: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Abstract / Description</label>
                  <textarea required rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={whitepaperForm.abstract} onChange={e => setWhitepaperForm({...whitepaperForm, abstract: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-[#1e5cdc] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Whitepaper</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 6. Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
              <h2 className="text-xl font-bold text-gray-800">{editingReport ? 'Edit Report' : 'Add Report'}</h2>
              <button onClick={() => setIsReportModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSaveReport} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.title} onChange={e => setReportForm({...reportForm, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                    <div className="flex flex-col gap-2">
                      <select required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" value={['Annual Report', 'Quarterly Report', 'Industry Report', 'Technical Report', 'Market Report', 'Sustainability Report', 'Research Report', 'HR Report'].includes(reportForm.type) || reportForm.type === '' ? reportForm.type : 'Other'} onChange={e => {
                        if (e.target.value === 'Other') setReportForm({...reportForm, type: 'Other'});
                        else setReportForm({...reportForm, type: e.target.value});
                      }}>
                        <option value="" disabled>Select Type</option>
                        <option value="Annual Report">Annual Report</option>
                        <option value="Quarterly Report">Quarterly Report</option>
                        <option value="Industry Report">Industry Report</option>
                        <option value="Technical Report">Technical Report</option>
                        <option value="Market Report">Market Report</option>
                        <option value="Sustainability Report">Sustainability Report</option>
                        <option value="Research Report">Research Report</option>
                        <option value="HR Report">HR Report</option>
                        <option value="Other">Add New Type...</option>
                      </select>
                      {(!['Annual Report', 'Quarterly Report', 'Industry Report', 'Technical Report', 'Market Report', 'Sustainability Report', 'Research Report', 'HR Report', ''].includes(reportForm.type) || reportForm.type === 'Other') && (
                        <input required placeholder="Enter new type" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm animate-in fade-in slide-in-from-top-2" value={reportForm.type === 'Other' ? '' : reportForm.type} onChange={e => setReportForm({...reportForm, type: e.target.value})} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <div className="flex flex-col gap-2">
                      <select required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" value={['Technical', 'Quarterly', 'Industry', 'Annual', 'Research', 'Sustainability', 'Market', 'HR'].includes(reportForm.category) || reportForm.category === '' ? reportForm.category : 'Other'} onChange={e => {
                        if (e.target.value === 'Other') setReportForm({...reportForm, category: 'Other'});
                        else setReportForm({...reportForm, category: e.target.value});
                      }}>
                        <option value="" disabled>Select Category</option>
                        <option value="Technical">Technical</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Industry">Industry</option>
                        <option value="Annual">Annual</option>
                        <option value="Research">Research</option>
                        <option value="Sustainability">Sustainability</option>
                        <option value="Market">Market</option>
                        <option value="HR">HR</option>
                        <option value="Other">Add New Category...</option>
                      </select>
                      {(!['Technical', 'Quarterly', 'Industry', 'Annual', 'Research', 'Sustainability', 'Market', 'HR', ''].includes(reportForm.category) || reportForm.category === 'Other') && (
                        <input required placeholder="Enter new category" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm animate-in fade-in slide-in-from-top-2" value={reportForm.category === 'Other' ? '' : reportForm.category} onChange={e => setReportForm({...reportForm, category: e.target.value})} />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Publication Date</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.publicationDate} onChange={e => setReportForm({...reportForm, publicationDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                    <input required list="report-years" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.year} onChange={e => setReportForm({...reportForm, year: e.target.value})} />
                    <datalist id="report-years">
                      {[...new Set(reports.map(r => r.year).filter(Boolean))].sort((a, b) => b.localeCompare(a)).map(y => <option key={y} value={y} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Pages</label>
                    <input required type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.pages} onChange={e => setReportForm({...reportForm, pages: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">File Size</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.fileSize} onChange={e => setReportForm({...reportForm, fileSize: e.target.value})} />
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <input type="checkbox" id="rpFeatured" checked={reportForm.featured} onChange={e => setReportForm({...reportForm, featured: e.target.checked})} />
                    <label htmlFor="rpFeatured" className="text-sm font-semibold text-gray-700">Featured</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image URL</label>
                  <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.image} onChange={e => setReportForm({...reportForm, image: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Highlights (new line separated)</label>
                  <textarea required rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.highlights} onChange={e => setReportForm({...reportForm, highlights: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea required rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={reportForm.description} onChange={e => setReportForm({...reportForm, description: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-[#1e5cdc] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Report</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 7. Media Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
              <h2 className="text-xl font-bold text-gray-800">{editingMedia ? 'Edit Media' : 'Add Media'}</h2>
              <button onClick={() => setIsMediaModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSaveMedia} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.title} onChange={e => setMediaForm({...mediaForm, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.type} onChange={e => setMediaForm({...mediaForm, type: e.target.value})}>
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.category} onChange={e => setMediaForm({...mediaForm, category: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.date} onChange={e => setMediaForm({...mediaForm, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (if Video)</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.duration} onChange={e => setMediaForm({...mediaForm, duration: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.tags} onChange={e => setMediaForm({...mediaForm, tags: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Media Source (Image/Thumbnail)</label>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="mediaSource" checked={mediaImageMode === 'url'} onChange={() => setMediaImageMode('url')} className="text-[#1e5cdc] focus:ring-[#1e5cdc]" />
                      URL Link
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="mediaSource" checked={mediaImageMode === 'upload'} onChange={() => setMediaImageMode('upload')} className="text-[#1e5cdc] focus:ring-[#1e5cdc]" />
                      Upload File
                    </label>
                  </div>
                  
                  {mediaImageMode === 'url' ? (
                    <input 
                      required={!mediaForm.image}
                      type="url"
                      placeholder="Paste Google URL or any image URL here..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      value={mediaForm.image} 
                      onChange={e => setMediaForm({...mediaForm, image: e.target.value})} 
                    />
                  ) : (
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-gray-200">
                        {uploadingMediaImg ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {uploadingMediaImg ? 'Uploading...' : 'Choose File'}
                        <input type="file" className="hidden" accept="image/*,video/*" onChange={handleMediaImageUpload} disabled={uploadingMediaImg} />
                      </label>
                      <span className="text-xs text-gray-500">Supported: JPG, PNG, GIF, MP4</span>
                    </div>
                  )}

                  {mediaForm.image && (
                    <div className="mt-3 relative w-full h-40 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                      <img src={mediaForm.image} alt="Preview" className="max-h-full max-w-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-xs text-gray-400">Preview not available (invalid URL or Video)</span>'; }} />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea required rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={mediaForm.description} onChange={e => setMediaForm({...mediaForm, description: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-[#1e5cdc] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Media</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* CSR Edit/Create Modal */}
      {isCsrModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">{editingCsr ? 'Edit CSR Initiative' : 'Add CSR Initiative'}</h2>
              <button onClick={() => setIsCsrModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg"><X size={20} /></button>
            </div>
            <div className="overflow-y-auto p-4 sm:p-6 custom-scrollbar">
              <form id="csr-form" onSubmit={handleSaveCsr} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Title *</label>
                    <input required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.title} onChange={e => setCsrForm({...csrForm, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.category} onChange={e => setCsrForm({...csrForm, category: e.target.value})}>
                      {['Education', 'Environment', 'Healthcare', 'Social', 'Infrastructure', 'Emergency'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.status} onChange={e => setCsrForm({...csrForm, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-gray-700">Image URL / Upload</label>
                      <div className="flex bg-gray-100 rounded-md p-0.5">
                        <button type="button" onClick={() => setCsrImageMode('url')} className={`px-2 py-1 text-[10px] font-bold rounded ${csrImageMode === 'url' ? 'bg-white shadow-sm text-[#1e5cdc]' : 'text-gray-500 hover:text-gray-700'}`}>URL</button>
                        <button type="button" onClick={() => setCsrImageMode('upload')} className={`px-2 py-1 text-[10px] font-bold rounded ${csrImageMode === 'upload' ? 'bg-white shadow-sm text-[#1e5cdc]' : 'text-gray-500 hover:text-gray-700'}`}>Upload</button>
                      </div>
                    </div>
                    {csrImageMode === 'url' ? (
                      <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" placeholder="https://example.com/image.jpg" value={csrForm.image} onChange={e => setCsrForm({...csrForm, image: e.target.value})} />
                    ) : (
                      <div className="flex items-center gap-3">
                        <input type="file" accept="image/*" onChange={handleCsrImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        {uploadingCsrImg && <Loader2 size={16} className="animate-spin text-blue-600 shrink-0" />}
                        {csrForm.image && !uploadingCsrImg && <CheckCircle size={16} className="text-green-500 shrink-0" />}
                      </div>
                    )}
                    {csrForm.image && (
                      <div className="mt-2 text-[10px] text-gray-500 truncate">Current: {csrForm.image}</div>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Description *</label>
                    <textarea required rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.description} onChange={e => setCsrForm({...csrForm, description: e.target.value})}></textarea>
                  </div>
                  
                  {/* Impact */}
                  <div className="sm:col-span-2"><h4 className="font-bold text-sm text-slate-800 border-b pb-1 mt-2">Impact Metrics</h4></div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Beneficiaries</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.impact.beneficiaries} onChange={e => setCsrForm({...csrForm, impact: {...csrForm.impact, beneficiaries: e.target.value}})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Investment</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.impact.investment} onChange={e => setCsrForm({...csrForm, impact: {...csrForm.impact, investment: e.target.value}})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Locations</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.impact.locations} onChange={e => setCsrForm({...csrForm, impact: {...csrForm.impact, locations: e.target.value}})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Key Outcomes</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.impact.outcomes} onChange={e => setCsrForm({...csrForm, impact: {...csrForm.impact, outcomes: e.target.value}})} />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Strategic Objectives (Comma Separated)</label>
                    <textarea rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.goals} onChange={e => setCsrForm({...csrForm, goals: e.target.value})}></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 mb-1 block">UN SDG Goals (Comma Separated)</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.sdgGoals} onChange={e => setCsrForm({...csrForm, sdgGoals: e.target.value})} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 mb-1 block">Partners (Comma Separated)</label>
                    <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#1e5cdc] outline-none" value={csrForm.partnerOrganizations} onChange={e => setCsrForm({...csrForm, partnerOrganizations: e.target.value})} />
                  </div>
                  {!editingCsr && (
                    <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                      <input type="checkbox" id="csr-featured" checked={csrForm.featured} onChange={e => setCsrForm({...csrForm, featured: e.target.checked})} className="w-4 h-4 rounded text-[#1e5cdc] focus:ring-[#1e5cdc] border-gray-300" />
                      <label htmlFor="csr-featured" className="text-sm font-semibold text-gray-700">Add to Flagship Initiatives (Featured)</label>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsCsrModalOpen(false)} className="px-4 py-2 text-gray-500 font-semibold hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
              <button type="submit" form="csr-form" className="px-4 py-2 bg-[#1e5cdc] text-white font-semibold rounded-lg text-sm hover:bg-blue-700 shadow-sm">Save Initiative</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
