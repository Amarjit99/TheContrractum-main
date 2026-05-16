import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, CheckCircle2, Clock, Calendar, Flag, AlertCircle, FolderKanban, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminTasks() {
  const { admin } = useAdminAuth();
  const [tasks, setTasks] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
    relatedModule: 'General'
  });

  useEffect(() => {
    fetchTasks();
    fetchAdmins();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error('Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${API}/api/admin/users?role=admin&limit=100`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      const data = await res.json();
      const adminList = data.users || [];
      setAdmins(Array.isArray(adminList) ? adminList : []);
      // Auto-assign to self if creating new
      if (!formData.assignedTo && admin?._id) {
        setFormData(prev => ({ ...prev, assignedTo: admin._id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.assignedTo) {
      return toast.error("Title and Assignee are required.");
    }
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API}/api/tasks/${editingId}` : `${API}/api/tasks`;
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}` 
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success(editingId ? 'Task updated!' : 'Task created!');
        setShowModal(false);
        fetchTasks();
      } else {
        const err = await res.json();
        toast.error(err.message || 'Failed to save task');
      }
    } catch (err) {
      toast.error('Server error while saving task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`${API}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      if (res.ok) {
        toast.success('Task deleted');
        fetchTasks();
      } else {
        toast.error('Not authorized or failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting task');
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const res = await fetch(`${API}/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Task marked as ${newStatus}`);
        fetchTasks();
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      toast.error('Error updating task status');
    }
  };

  const openEdit = (task) => {
    setEditingId(task._id);
    setFormData({
      title: task.title,
      description: task.description || '',
      assignedTo: task.assignedTo?._id || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      relatedModule: task.relatedModule || 'General'
    });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      assignedTo: admin._id || '',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '',
      relatedModule: 'General'
    });
    setShowModal(true);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Low': return 'bg-gray-100 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
      default: return 'bg-gray-100 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  // Group tasks by status for Kanban view
  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  const Column = ({ title, statusGroup, icon, bg }) => (
    <div className={`flex flex-col bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-2xl h-full shadow-sm`}>
      <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${bg} rounded-t-2xl flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-bold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
        <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
          {statusGroup.length}
        </span>
      </div>
      <div className="p-4 flex-1 space-y-4 overflow-y-auto">
        {statusGroup.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8 italic">No tasks here</p>
        ) : (
          statusGroup.map(task => (
            <div key={task._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(task)} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-1">{task.title}</h4>
              <p className="text-gray-500 text-xs line-clamp-2 mb-3">{task.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-bold" title={task.assignedTo?.firstName}>
                    {task.assignedTo?.firstName?.charAt(0) || 'A'}
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {task.relatedModule}
                  </span>
                </div>
                
                <select 
                  className={`text-[11px] font-semibold rounded-md border py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${getStatusColor(task.status)}`}
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight flex items-center gap-3">
              <FolderKanban className="text-[#1e5cdc]" size={28} />
              Team Tasks
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage and assign tasks across the admin team.</p>
          </div>
          <button 
            onClick={openCreate}
            className="flex items-center gap-2 bg-[#1e5cdc] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={18} /> New Task
          </button>
        </div>

        {/* Kanban Board */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e5cdc]"></div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden pb-4">
            <Column title="Pending" statusGroup={pendingTasks} icon={<AlertCircle size={18} className="text-gray-500" />} bg="bg-gray-100" />
            <Column title="In Progress" statusGroup={inProgressTasks} icon={<Clock size={18} className="text-yellow-600" />} bg="bg-yellow-50" />
            <Column title="Completed" statusGroup={completedTasks} icon={<CheckCircle2 size={18} className="text-green-600" />} bg="bg-green-50" />
          </div>
        )}

        {/* Task Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                <h2 className="text-xl font-black text-gray-800 dark:text-gray-200">{editingId ? 'Edit Task' : 'Create New Task'}</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSave} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Task Title *</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({ ...formData, title: e.target.value })} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all" 
                      placeholder="e.g., Review pending certificates" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea 
                      value={formData.description} 
                      onChange={e => setFormData({ ...formData, description: e.target.value })} 
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all" 
                      rows={3} 
                      placeholder="Add details, steps, or context..." 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Assign To *</label>
                      <select 
                        required 
                        value={formData.assignedTo} 
                        onChange={e => setFormData({ ...formData, assignedTo: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all"
                      >
                        <option value="">Select Admin</option>
                        {admins.map(a => (
                          <option key={a._id} value={a._id}>{a.firstName} {a.lastName} ({a.adminSubRole || 'Admin'})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Related Module</label>
                      <select 
                        value={formData.relatedModule} 
                        onChange={e => setFormData({ ...formData, relatedModule: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all"
                      >
                        <option value="General">General</option>
                        <option value="Certificates">Certificates</option>
                        <option value="ID Cards">ID Cards</option>
                        <option value="Projects">Projects</option>
                        <option value="Careers">Careers</option>
                        <option value="Support">Support Tickets</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Status</label>
                      <select 
                        value={formData.status} 
                        onChange={e => setFormData({ ...formData, status: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                      <select 
                        value={formData.priority} 
                        onChange={e => setFormData({ ...formData, priority: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                      <input 
                        type="date" 
                        value={formData.dueDate} 
                        onChange={e => setFormData({ ...formData, dueDate: e.target.value })} 
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl focus:bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#1e5cdc]/20 focus:border-[#1e5cdc] transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-2.5 text-sm font-bold text-white bg-[#1e5cdc] rounded-xl hover:bg-blue-700 transition-colors shadow-md">
                      {editingId ? 'Update Task' : 'Create Task'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
