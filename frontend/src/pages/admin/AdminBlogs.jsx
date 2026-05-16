import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, CheckCircle, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';



export default function AdminBlogs() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [imageMode, setImageMode] = useState('url'); // 'url' | 'upload'
  const [uploading, setUploading] = useState(false);

  // New Post Form State
  const [newPost, setNewPost] = useState({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '' });

  useEffect(() => { fetchBlogs(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
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
        setNewPost(prev => ({ ...prev, image: `${API}${data.imageUrl}` }));
      } else {
        toast.error('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    }
    setUploading(false);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/cms/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(`${API}/api/cms/blogs/${id}`, { method: 'DELETE', headers });
        if(res.ok) fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditModal = (blog) => {
    setEditingId(blog._id);
    setNewPost({
      title: blog.title,
      author: blog.author,
      category: blog.category || 'Technology',
      status: blog.status || 'Draft',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      readTime: blog.readTime || '',
      image: blog.image || ''
    });
    setIsModalOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if(!newPost.title || !newPost.author) return toast.error("Please fill title and author");
    
    try {
      const categoryValue = newPost.category === '__custom__' ? customCategory.trim() : newPost.category;
      if (newPost.category === '__custom__' && !categoryValue) return toast.error('Please enter a custom category');
      const payload = { ...newPost, category: categoryValue };
      let res;
      if (editingId) {
        res = await fetch(`${API}/api/cms/blogs/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API}/api/cms/blogs`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }
      if(res.ok) {
        setSuccess(true);
        fetchBlogs();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setEditingId(null);
          setCustomCategory('');
          setNewPost({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '' });
        }, 1500);
      } else {
        toast.error(editingId ? "Failed to update post." : "Failed to create post.");
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Blog Posts</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">Manage your website's articles and publications</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
          <button onClick={() => { setEditingId(null); setNewPost({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '' }); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add New Post
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Title</th>
                <th className="text-left text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden md:table-cell text-xs sm:text-sm">Author</th>
                <th className="text-center text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell text-xs sm:text-sm">Category</th>
                <th className="text-center text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 hidden lg:table-cell text-xs sm:text-sm">Date</th>
                <th className="text-center text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Status</th>
                <th className="text-right text-gray-500 font-semibold px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                 <tr><td colSpan="6" className="text-center py-8 text-gray-500">Loading blogs...</td></tr>
              ) : filteredBlogs.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8 text-gray-500">No blog posts found.</td></tr>
              ) : (
                filteredBlogs.map(b => (
                  <tr key={b._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px] xl:max-w-xs">{b.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 md:hidden">{b.author}</p>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-500 hidden md:table-cell text-xs sm:text-sm">{b.author}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center hidden sm:table-cell">
                      <span className="px-2 sm:px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] sm:text-xs font-semibold">{b.category}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-gray-500 hidden lg:table-cell text-xs sm:text-sm">{new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                      <span className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${b.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button onClick={() => openEditModal(b)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors" title="Edit Post"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(b._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Post"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Screen Blog Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-2 md:p-3">
          <div className="bg-white sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:w-[96%] lg:w-[94%] xl:w-[92%] flex flex-col" style={{ maxHeight: '100vh' }}>
            {/* Header */}
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-[#1e5cdc]/5 to-blue-50 sm:rounded-t-2xl shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{editingId ? '✏️ Edit Blog Post' : '✍️ Add New Blog Post'}</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">Fields marked * are required.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <X size={22} />
              </button>
            </div>

            {success ? (
              <div className="p-10 sm:p-16 md:p-20 flex flex-col items-center justify-center text-center flex-1">
                <CheckCircle size={48} className="text-emerald-500 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{editingId ? 'Post Updated!' : 'Post Published!'}</h3>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">The blog post is now live on the website.</p>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable form body */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 space-y-4 sm:space-y-5">

                  {/* Row 1: Title & Author */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Post Title *</label>
                      <input
                        required type="text"
                        value={newPost.title}
                        onChange={e => setNewPost({...newPost, title: e.target.value})}
                        placeholder="e.g. The Future of AI in Healthcare"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Author Name *</label>
                      <input
                        required type="text"
                        value={newPost.author}
                        onChange={e => setNewPost({...newPost, author: e.target.value})}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base transition-colors"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Excerpt <span className="font-normal text-gray-400 hidden sm:inline">(Short summary for blog listing)</span></label>
                    <textarea
                      value={newPost.excerpt}
                      onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                      placeholder="Write a short 1-2 sentence summary..."
                      rows={2}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base resize-none transition-colors"
                    />
                  </div>

                  {/* Content — big editor */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Full Blog Content *</label>
                    <textarea
                      required
                      value={newPost.content}
                      onChange={e => setNewPost({...newPost, content: e.target.value})}
                      placeholder="Write the full blog post content here..."
                      rows={10}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base font-mono leading-relaxed resize-y transition-colors"
                    />
                  </div>

                  {/* Row: Category, Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Category *</label>
                      <select
                        value={newPost.category}
                        onChange={e => setNewPost({...newPost, category: e.target.value})}
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
                      {newPost.category === '__custom__' && (
                        <input
                          type="text"
                          value={customCategory}
                          onChange={e => setCustomCategory(e.target.value)}
                          placeholder="Type your custom category..."
                          className="mt-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-[#1e5cdc] rounded-lg sm:rounded-xl focus:outline-none text-sm sm:text-base"
                          autoFocus
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Status *</label>
                      <select
                        value={newPost.status}
                        onChange={e => setNewPost({...newPost, status: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base bg-white"
                      >
                        <option value="Draft">📝 Draft (hidden from website)</option>
                        <option value="Published">✅ Published (live on website)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row: Read Time, Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">Read Time</label>
                      <input
                        type="text"
                        value={newPost.readTime}
                        onChange={e => setNewPost({...newPost, readTime: e.target.value})}
                        placeholder="e.g. 5 min read"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base"
                      />
                    </div>

                    {/* Image: URL or Upload */}
                    <div>
                      <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                        <label className="text-xs sm:text-sm font-semibold text-gray-700">Cover Image</label>
                        <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
                          <button type="button" onClick={() => setImageMode('url')} className={`px-2.5 sm:px-3 py-1 rounded-md transition-colors ${imageMode === 'url' ? 'bg-white text-[#1e5cdc] shadow-sm' : 'text-gray-500'}`}>URL</button>
                          <button type="button" onClick={() => setImageMode('upload')} className={`px-2.5 sm:px-3 py-1 rounded-md transition-colors ${imageMode === 'upload' ? 'bg-white text-[#1e5cdc] shadow-sm' : 'text-gray-500'}`}>Upload</button>
                        </div>
                      </div>

                      {imageMode === 'url' ? (
                        <input
                          type="url"
                          value={newPost.image}
                          onChange={e => setNewPost({...newPost, image: e.target.value})}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-[#1e5cdc] text-sm sm:text-base"
                        />
                      ) : (
                        <label className={`flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dashed rounded-lg sm:rounded-xl cursor-pointer transition-colors ${uploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-[#1e5cdc] hover:bg-blue-50/50'}`}>
                          <Upload size={18} className="text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-500 font-medium">{uploading ? 'Uploading...' : 'Click to choose an image'}</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                        </label>
                      )}

                      {newPost.image && (
                        <img src={newPost.image} alt="preview" className="mt-2 h-16 sm:h-20 w-full object-cover rounded-lg sm:rounded-xl border border-gray-200" onError={e => e.target.style.display='none'} />
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer — fixed */}
                <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/80 sm:rounded-b-2xl shrink-0">
                  <span className="text-xs text-gray-400 hidden sm:inline">* Required fields</span>
                  <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors border border-gray-200">Cancel</button>
                    <button type="submit" className="px-5 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg sm:rounded-xl transition-colors shadow-lg shadow-blue-500/25">
                      {editingId ? '💾 Save Changes' : '🚀 Publish Post'}
                    </button>
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

