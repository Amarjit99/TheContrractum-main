import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Save, Building2, Link2, Phone, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [settings, setSettings] = useState({
    companyName: 'The Contractum',
    companyLogo: '',
    companySeal: '',
    authorizedSignature: '',
    signatoryDesignation: 'Authorized Authority',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      youtube: ''
    },
    contactDetails: {
      email: 'info@thecontractum.com',
      phone: '+91 96805-34740',
      address: 'Plot No 169, Ground Floor, Rangbari Road, Kota, Rajasthan 324005'
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API}/api/settings`);
      const data = await res.json();
      if (res.ok && data) {
        setSettings({
          companyName: data.companyName || 'The Contractum',
          companyLogo: data.companyLogo || '',
          companySeal: data.companySeal || '',
          authorizedSignature: data.authorizedSignature || '',
          signatoryDesignation: data.signatoryDesignation || 'Authorized Authority',
          socialLinks: {
            linkedin: data.socialLinks?.linkedin || '',
            twitter: data.socialLinks?.twitter || '',
            facebook: data.socialLinks?.facebook || '',
            youtube: data.socialLinks?.youtube || ''
          },
          contactDetails: {
            email: data.contactDetails?.email || 'info@thecontractum.com',
            phone: data.contactDetails?.phone || '+91 96805-34740',
            address: data.contactDetails?.address || 'Plot No 169, Ground Floor, Rangbari Road, Kota, Rajasthan 324005'
          }
        });
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const token = adminUser?.token;
      const res = await fetch(`${API}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update settings');
      toast.success('All settings saved successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const network = name.replace('social_', '');
      setSettings(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [network]: value } }));
    } else if (name.startsWith('contact_')) {
      const field = name.replace('contact_', '');
      setSettings(prev => ({ ...prev, contactDetails: { ...prev.contactDetails, [field]: value } }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-[#1e5cdc] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  const SectionHeader = ({ icon: Icon, title, desc, color = 'text-[#1e5cdc]', bg = 'bg-blue-100' }) => (
    <div className="p-6 border-b border-gray-100 bg-gray-50/80 flex items-start gap-3">
      <div className={`${bg} p-2 rounded-xl mt-0.5`}>
        <Icon size={18} className={color} />
      </div>
      <div>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );

  const Field = ({ label, name, value, type = 'text', placeholder = '' }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1e5cdc] focus:border-transparent outline-none font-medium text-gray-700 bg-gray-50 focus:bg-white transition-all"
      />
    </div>
  );

  return (
    <AdminLayout>
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-gray-500 text-sm mt-1">All changes are saved to the database and reflected live on the website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-[#1e5cdc] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Saving...</>
          ) : (
            <><Save size={16} /> Save All Changes</>
          )}
        </button>
      </div>

      <div className="space-y-6 max-w-4xl pb-12">

        {/* ── Section 1: General Branding ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader
            icon={Building2}
            title="General Branding"
            desc="Company name, logo, seal, and signatory details used on certificates and ID cards."
          />
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Company Name" name="companyName" value={settings.companyName} placeholder="The Contractum" />
              <Field label="Signatory Designation" name="signatoryDesignation" value={settings.signatoryDesignation} placeholder="Authorized Authority" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Field label="Company Logo URL" name="companyLogo" value={settings.companyLogo} type="url" placeholder="https://..." />
                {settings.companyLogo && (
                  <img src={settings.companyLogo} alt="Logo" className="mt-2 h-12 object-contain rounded-lg border border-gray-100 bg-gray-50 p-1" />
                )}
              </div>
              <div>
                <Field label="Company Seal URL" name="companySeal" value={settings.companySeal} type="url" placeholder="https://..." />
                {settings.companySeal && (
                  <img src={settings.companySeal} alt="Seal" className="mt-2 h-12 object-contain rounded-lg border border-gray-100 bg-gray-50 p-1" />
                )}
              </div>
            </div>
            <div>
              <Field label="Authorized Signature URL" name="authorizedSignature" value={settings.authorizedSignature} type="url" placeholder="https://..." />
              {settings.authorizedSignature && (
                <img src={settings.authorizedSignature} alt="Signature" className="mt-2 h-14 object-contain rounded-lg border border-gray-100 bg-white p-2" />
              )}
            </div>
          </div>
        </div>

        {/* ── Section 2: Social Media Links ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader
            icon={Link2}
            title="Footer Social Media Links"
            desc="Edit these links — they update the social icons in the website footer live for all visitors."
            color="text-violet-600"
            bg="bg-violet-100"
          />
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Linkedin size={15} className="text-blue-600" /> LinkedIn URL
                </label>
                <input type="url" name="social_linkedin" value={settings.socialLinks.linkedin} onChange={handleChange}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-400 outline-none text-gray-600 bg-gray-50 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Twitter size={15} className="text-sky-500" /> Twitter (X) URL
                </label>
                <input type="url" name="social_twitter" value={settings.socialLinks.twitter} onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-400 outline-none text-gray-600 bg-gray-50 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Facebook size={15} className="text-blue-700" /> Facebook URL
                </label>
                <input type="url" name="social_facebook" value={settings.socialLinks.facebook} onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-400 outline-none text-gray-600 bg-gray-50 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Youtube size={15} className="text-red-600" /> YouTube URL
                </label>
                <input type="url" name="social_youtube" value={settings.socialLinks.youtube} onChange={handleChange}
                  placeholder="https://youtube.com/@..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-400 outline-none text-gray-600 bg-gray-50 focus:bg-white transition-all" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
              Saved changes will appear in the footer for all visitors immediately after next page load.
            </p>
          </div>
        </div>

        {/* ── Section 3: Contact Details ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <SectionHeader
            icon={Phone}
            title="Contact Details"
            desc="Phone, email, and address shown in the website footer. Edit and save to update them live."
            color="text-emerald-600"
            bg="bg-emerald-100"
          />
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Support Email</label>
                <input type="email" name="contact_email" value={settings.contactDetails.email} onChange={handleChange}
                  placeholder="info@thecontractum.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none text-gray-700 bg-gray-50 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input type="text" name="contact_phone" value={settings.contactDetails.phone} onChange={handleChange}
                  placeholder="+91 XXXXX-XXXXX"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none text-gray-700 bg-gray-50 focus:bg-white transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Office Address</label>
              <textarea name="contact_address" value={settings.contactDetails.address} onChange={handleChange}
                rows={3} placeholder="Full office address..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none text-gray-700 bg-gray-50 focus:bg-white transition-all resize-none" />
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
