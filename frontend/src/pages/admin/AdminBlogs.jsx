import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Plus, Edit, Trash2, X, CheckCircle } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialBlogs = [
  { _id: 'static-1', title: "Artificial Intelligence: Transforming Business Operations", author: "Rahul Sharma", createdAt: "2026-02-15T00:00:00.000Z", category: "AI & ML", status: "Published" },
  { _id: 'static-2', title: "Cloud Computing: The Backbone of Modern Infrastructure", author: "Priya Patel", createdAt: "2026-02-12T00:00:00.000Z", category: "Technology", status: "Published" },
  { _id: 'static-3', title: "Strategic Innovation: Staying Ahead in a Competitive Market", author: "Amit Kumar", createdAt: "2026-02-10T00:00:00.000Z", category: "Business", status: "Draft" },
  { _id: 'static-4', title: "Cybersecurity Best Practices for 2026", author: "Neha Singh", createdAt: "2026-02-08T00:00:00.000Z", category: "Technology", status: "Published" },
  { _id: 'static-5', title: "The Rise of Remote Work: Building Digital-First Teams", author: "Vikram Malhotra", createdAt: "2026-02-05T00:00:00.000Z", category: "Business", status: "Published" },
];

export default function AdminBlogs() {
  const { admin } = useAdminAuth();
  const headers = { Authorization: `Bearer ${admin?.token}`, 'Content-Type': 'application/json' };

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // New Post Form State
  const [newPost, setNewPost] = useState({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '' });

  useEffect(() => { fetchBlogs(); }, []);

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

  const allBlogs = [...blogs, ...initialBlogs];
  const filteredBlogs = allBlogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = async (id) => {
    if (typeof id === 'string' && id.startsWith('static-')) return alert("Cannot delete demo data.");
    if(window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await fetch(`${API}/api/cms/blogs/${id}`, { method: 'DELETE', headers });
        if(res.ok) fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if(!newPost.title || !newPost.author) return alert("Please fill title and author");
    
    try {
      const res = await fetch(`${API}/api/cms/blogs`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...newPost })
      });
      if(res.ok) {
        setSuccess(true);
        fetchBlogs();
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
          setNewPost({ title: '', author: '', category: 'Technology', status: 'Draft', excerpt: '', content: '', readTime: '', image: '' });
        }, 1500);
      } else {
        alert("Failed to create post.");
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your website's articles and publications</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 border border-gray-200 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5cdc] w-full sm:w-64 bg-white" 
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            <Plus size={16} /> Add New Post
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#f8fafc] border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-6 py-4">Title</th>
                <th className="text-left text-gray-500 font-semibold px-6 py-4 hidden md:table-cell">Author</th>
                <th className="text-center text-gray-500 font-semibold px-6 py-4">Category</th>
                <th className="text-center text-gray-500 font-semibold px-6 py-4 hidden sm:table-cell">Date</th>
                <th className="text-center text-gray-500 font-semibold px-6 py-4">Status</th>
                <th className="text-right text-gray-500 font-semibold px-6 py-4">Actions</th>
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
                    <td className="px-6 py-4 font-semibold text-gray-800 truncate max-w-[200px] xl:max-w-xs">{b.title}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{b.author}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold">{b.category}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 hidden sm:table-cell">{new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${b.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(b._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Add New Blog Post</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            {success ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <CheckCircle size={48} className="text-emerald-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">Post Created Successfully!</h3>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Post Title</label>
                    <input required type="text" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Author Name</label>
                    <input required type="text" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt</label>
                  <textarea value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                  <textarea value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={6} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Read Time (e.g. 5 min)</label>
                    <input type="text" value={newPost.readTime} onChange={e => setNewPost({...newPost, readTime: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                    <input type="text" value={newPost.image} onChange={e => setNewPost({...newPost, image: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Technology</option><option>Business</option><option>AI & ML</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <select value={newPost.status} onChange={e => setNewPost({...newPost, status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Draft</option><option>Published</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-[#1e5cdc] hover:bg-blue-700 rounded-lg transition-colors shadow-sm">Save Post</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
