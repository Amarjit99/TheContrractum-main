import AdminLayout from '../../components/admin/AdminLayout';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">System Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage core website configurations</p>
        </div>
        <button onClick={() => toast.success('Settings saved successfully!')}
          className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm max-w-3xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">General Information</h2>
          <p className="text-gray-500 text-sm">Update your basic site details and SEO meta information.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
              <input type="text" defaultValue="The Contractum" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Support Email</label>
              <input type="email" defaultValue="info@thecontractum.com" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">SEO Meta Description</label>
            <textarea rows="3" defaultValue="Passionately focused on delivering innovative solutions and fostering lasting relationships for over a decade." className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent outline-none resize-none" />
          </div>
        </div>

        <div className="p-6 border-b border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Contact Details</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input type="text" defaultValue="+91 96805-34740" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1e5cdc] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Office Address</label>
              <input type="text" defaultValue="Plot No 169, Ground Floor, Rangbari Road, Kota" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#1e5cdc] outline-none" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
