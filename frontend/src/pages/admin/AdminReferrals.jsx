import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Users, Search, RefreshCw, CheckCircle, Clock, XCircle, Award } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminReferrals() {
  const { admin } = useAdminAuth();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/referrals`, {
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);
      }
    } catch (err) {
      console.error("Failed to fetch referrals", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/referrals/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin?.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchReferrals();
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleApproveReward = async (id) => {
    if (!window.confirm("Are you sure you want to approve and send the reward payout?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/referrals/${id}/reward`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${admin?.token}` }
      });
      if (res.ok) {
        fetchReferrals();
      }
    } catch (err) {
      console.error("Failed to approve reward", err);
    }
  };

  const filteredReferrals = referrals.filter(r => 
      r.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referrerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto">
        {/* Header styling consistent with other admin pages */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight flex items-center gap-2 sm:gap-3">
              <Users className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8" />
              Referral Management
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">Approve candidates and manage employee referral payouts.</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search candidates/referrers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 sm:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none shadow-sm transition-all w-full sm:w-64 md:w-80 text-sm"
              />
            </div>
            <button 
              onClick={fetchReferrals}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:bg-gray-700 hover:text-indigo-600 transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Overview Stats (Optional visual enhancement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Users size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                    <p className="text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Total Referrals</p>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">{referrals.length}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                    <p className="text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Candidates Hired</p>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">{referrals.filter(r => r.status === 'Hired').length}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                    <p className="text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Pending Payouts</p>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
                        ${referrals.filter(r => r.status === 'Hired' && r.rewardStatus === 'Pending').reduce((acc, curr) => acc + curr.rewardAmount, 0)}
                    </p>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Award size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                    <p className="text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Paid Rewards</p>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100">
                        ${referrals.filter(r => r.rewardStatus === 'Rewarded').reduce((acc, curr) => acc + curr.rewardAmount, 0)}
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Candidate / Role</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider hidden sm:table-cell">Referred By</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 sm:py-4 px-3 sm:px-6 font-bold text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Reward Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                    <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-500">
                            <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-indigo-500" />
                            Loading records...
                        </td>
                    </tr>
                ) : filteredReferrals.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="py-12 text-center text-gray-500">
                            No referrals found.
                        </td>
                    </tr>
                ) : filteredReferrals.map((ref) => (
                  <tr key={ref._id} className="hover:bg-gray-50 dark:bg-gray-700/50 transition-colors">
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{ref.candidateName}</div>
                      <div className="text-[10px] sm:text-sm text-gray-500">{ref.jobRole}</div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 hidden sm:table-cell">
                      <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold">
                        {ref.referrerName}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm hidden md:table-cell">
                      <div className="text-gray-900 dark:text-gray-100 truncate max-w-[150px]">{ref.candidateEmail}</div>
                      <div className="text-gray-500">{ref.candidatePhone}</div>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <select 
                        value={ref.status}
                        onChange={(e) => handleStatusChange(ref._id, e.target.value)}
                        className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors ${
                            ref.status === 'Applied' ? 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300' :
                            ref.status === 'Interview' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300' :
                            ref.status === 'Hired' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300' :
                            'bg-red-50 text-red-700 border-red-200 hover:border-red-300'
                        }`}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </td>
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      {ref.status === 'Hired' ? (
                        ref.rewardStatus === 'Pending' ? (
                            <button
                                onClick={() => handleApproveReward(ref._id)}
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                            >
                                Approve ${ref.rewardAmount}
                            </button>
                        ) : (
                            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-emerald-600 font-bold text-[10px] sm:text-sm bg-emerald-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-emerald-100">
                                <CheckCircle size={14} className="sm:w-4 sm:h-4" /> Paid (${ref.rewardAmount})
                            </span>
                        )
                      ) : (
                        <span className="text-gray-400 text-[10px] sm:text-sm font-medium">
                            {ref.status === 'Declined' ? 'Not Eligible' : 'Awaiting Hire'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}
