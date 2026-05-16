import { useState, useEffect } from "react";
import { Copy, Gift, Users, CreditCard, ChevronRight, Share2, Plus, X, ArrowRight, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';

// Using a mock auth literal as asked by user for the dynamic UI representation
const MOCK_USER = {
    name: "Jane",
    refcode: "JANECOD8223"
};

export default function ReferralDashboard() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard"); // Dashboard, Tracking, Rewards
  const [formData, setFormData] = useState({
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      jobRole: ''
  });

  const fetchReferrals = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/referrals?referrerName=${MOCK_USER.name}`);
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

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/referrals`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...formData, referrerName: MOCK_USER.name })
          });
          if (res.ok) {
              setFormData({ candidateName: '', candidateEmail: '', candidatePhone: '', jobRole: '' });
              setIsModalOpen(false);
              fetchReferrals();
              setActiveView("Tracking"); // switch to tracking to see the newly added candidate
          }
      } catch (err) {
          console.error("Submission failed", err);
      }
  };

  const copyLink = () => {
      navigator.clipboard.writeText(`www.thecontractum.com/ref/${MOCK_USER.refcode}`);
      toast.success("Referral link copied!");
  };

  // Derive stats dynamically
  const rewardsPaid = referrals.filter(r => r.rewardStatus === 'Rewarded').reduce((a,c) => a + c.rewardAmount, 0) + 35.50; // Mock base + dynamic
  const pendingRewards = referrals.filter(r => r.rewardStatus === 'Pending' && r.status === 'Hired').reduce((a,c) => a + c.rewardAmount, 0) + 280; // Mock base + dynamic
  const totalEarned = rewardsPaid + pendingRewards; 
  const hiredCount = referrals.filter(r => r.status === 'Hired').length + 4; // Mock base
  
  const renderDashboardView = () => (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* Stats Overview */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 text-gray-500 mb-2">
                            <CreditCard size={20} className="text-indigo-500"/>
                            <span className="font-semibold text-sm uppercase tracking-wider">Earnings</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900">${totalEarned.toFixed(2)}</h2>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 text-gray-500 mb-2">
                            <Users size={20} className="text-emerald-500"/>
                            <span className="font-semibold text-sm uppercase tracking-wider">Candidates Hired</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900">{hiredCount}</h2>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 text-gray-500 mb-2">
                            <Gift size={20} className="text-amber-500"/>
                            <span className="font-semibold text-sm uppercase tracking-wider">Pending Rewards</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900">${pendingRewards.toFixed(2)}</h2>
                    </div>
                </div>
            </div>

            {/* Illustration Steps */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-8">How it works</h3>
                <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-10 md:gap-0">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 hidden md:block"></div>
                    
                    <div className="text-center w-full md:w-1/3 bg-white px-4">
                        <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
                            <Share2 className="text-indigo-500 w-10 h-10" />
                        </div>
                        <h4 className="font-bold text-gray-900">Share Your Link</h4>
                        <p className="text-sm text-gray-500 mt-1">Copy and send your referral link</p>
                    </div>

                    <div className="hidden md:block">
                        <ArrowRight className="text-indigo-200 w-8 h-8"/>
                    </div>

                    <div className="text-center w-full md:w-1/3 bg-white px-4">
                        <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 transform -rotate-3">
                            <ClipboardCheckIcon className="text-emerald-500 w-10 h-10" />
                        </div>
                        <h4 className="font-bold text-gray-900">Track Candidates</h4>
                        <p className="text-sm text-gray-500 mt-1">Monitor their application progress</p>
                    </div>

                    <div className="hidden md:block">
                        <ArrowRight className="text-indigo-200 w-8 h-8"/>
                    </div>

                    <div className="text-center w-full md:w-1/3 bg-white px-4">
                        <div className="w-20 h-20 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
                            <Gift className="text-amber-500 w-10 h-10" />
                        </div>
                        <h4 className="font-bold text-gray-900">Earn Rewards</h4>
                        <p className="text-sm text-gray-500 mt-1">Get paid when they are hired</p>
                    </div>
                </div>
            </div>

            {/* My Referrals Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">My Referrals Summary</h3>
                    <button onClick={() => setActiveView("Tracking")} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                        View All Tracking <ChevronRight size={16}/>
                    </button>
                </div>
                
                {referrals.length === 0 && !loading ? (
                    <div className="p-12 text-center text-gray-500">
                        <Gift size={48} className="mx-auto mb-4 text-gray-200" />
                        <p className="text-lg font-medium text-gray-900 mb-1">No referrals yet</p>
                        <p className="mb-6">Start referring your friends to earn rewards.</p>
                        <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-indigo-700 transition">
                            Refer Your First Candidate
                        </button>
                    </div>
                ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="py-4 px-8 font-semibold text-sm text-gray-500">Candidate</th>
                                <th className="py-4 px-8 font-semibold text-sm text-gray-500">Status</th>
                                <th className="py-4 px-8 font-semibold text-sm text-gray-500">Milestone</th>
                                <th className="py-4 px-8 font-semibold text-sm text-gray-500">Payout</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {/* Dummy data for UI richness */}
                            <tr className="hover:bg-gray-50/50 transition">
                                <td className="py-5 px-8">
                                    <div className="font-bold text-gray-900">Michael Jones</div>
                                    <div className="text-xs text-gray-500">Software Engineer</div>
                                </td>
                                <td className="py-5 px-8">
                                    <span className="flex items-center gap-2 text-sm font-bold text-amber-500">
                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Applied
                                    </span>
                                </td>
                                <td className="py-5 px-8">
                                    <div className="text-sm font-semibold text-indigo-600 bg-indigo-50/30 flex items-center gap-2 w-fit px-3 py-1 rounded-md border border-indigo-100">
                                        Submitted
                                    </div>
                                </td>
                                <td className="py-5 px-8 font-bold text-gray-300">
                                    $70.00
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50/50 transition">
                                <td className="py-5 px-8">
                                    <div className="font-bold text-gray-900">Sarah Lee</div>
                                    <div className="text-xs text-gray-500">Frontend Designer</div>
                                </td>
                                <td className="py-5 px-8">
                                    <span className="flex items-center gap-2 text-sm font-bold text-blue-500">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Scheduled
                                    </span>
                                </td>
                                <td className="py-5 px-8">
                                    <div className="text-sm font-semibold text-blue-600 bg-blue-50/50 flex items-center gap-2 w-fit px-3 py-1 rounded-md border border-blue-100">
                                        Scheduled Call
                                    </div>
                                </td>
                                <td className="py-5 px-8 font-bold text-gray-300">
                                    $70.00
                                </td>
                            </tr>

                            {/* Dynamic Real Data Limit 3 */}
                            {referrals.slice(0, 3).map(ref => (
                                <tr key={ref._id} className="hover:bg-gray-50/50 transition">
                                    <td className="py-5 px-8">
                                        <div className="font-bold text-gray-900">{ref.candidateName}</div>
                                        <div className="text-xs text-gray-500">{ref.jobRole}</div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <span className={`flex items-center gap-2 text-sm font-bold ${
                                            ref.status === 'Hired' ? 'text-emerald-500' :
                                            ref.status === 'Interview' ? 'text-blue-500' :
                                            ref.status === 'Applied' ? 'text-amber-500' : 'text-red-500'
                                        }`}>
                                            <span className={`w-2 h-2 rounded-full ${
                                                ref.status === 'Hired' ? 'bg-emerald-500' :
                                                ref.status === 'Interview' ? 'bg-blue-500' :
                                                ref.status === 'Applied' ? 'bg-amber-500' : 'bg-red-500'
                                            }`}></span> {ref.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className={`text-sm font-semibold flex items-center gap-2 w-fit px-3 py-1 rounded-md border ${
                                            ref.status === 'Hired' ? 'text-emerald-600 bg-emerald-50/50 border-emerald-100' :
                                            ref.status === 'Interview' ? 'text-blue-600 bg-blue-50/50 border-blue-100' :
                                            'text-indigo-600 bg-indigo-50/30 border-indigo-100'
                                        }`}>
                                            {ref.status === 'Hired' ? 'Offer Extended' : ref.status === 'Interview' ? 'Screening' : 'Submitted'}
                                        </div>
                                    </td>
                                    <td className={`py-5 px-8 font-bold ${ref.rewardStatus === 'Rewarded' ? 'text-gray-900' : 'text-gray-400'}`}>
                                        ${ref.rewardAmount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
      </div>
  );

  const renderTrackingView = () => {
      // Dynamic arrays mapping
      const applied = referrals.filter(r => r.status === 'Applied' || r.status === 'Declined'); // Grouping declined into applied column like kanban
      const interview = referrals.filter(r => r.status === 'Interview');
      const hired = referrals.filter(r => r.status === 'Hired');

      const CandidateCard = ({ name, role, status, reward }) => (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                    {name.charAt(0)}
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
                      <p className="text-xs text-gray-500">{role}</p>
                  </div>
              </div>
              <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-lg mb-3">
                  Applied 2 days ago
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                  <span className={`px-2 py-1 flex items-center gap-1 rounded-full ${
                      status === 'Hired' ? 'bg-emerald-50 text-emerald-600' : 
                      status === 'Interview' ? 'bg-blue-50 text-blue-600' : 
                      'bg-indigo-50 text-indigo-600'
                  }`}>
                     <div className={`w-1.5 h-1.5 rounded-full ${
                          status === 'Hired' ? 'bg-emerald-500' : 
                          status === 'Interview' ? 'bg-blue-500' : 
                          'bg-indigo-500'
                     }`}></div> {status === 'Hired' ? 'Offer Extended' : status === 'Interview' ? 'Scheduled Call' : 'Submitted'}
                  </span>
                  <span className="text-gray-500">${reward.toFixed(2)}</span>
              </div>
          </div>
      );

      return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Tracker Stats Header */}
              <div className="flex gap-6 items-center px-4">
                  <div className="flex flex-col">
                      <span className="text-2xl font-black text-gray-900">{applied.length + 12}</span>
                      <span className="text-sm font-semibold text-gray-500">Applied</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-2xl font-black text-gray-900">{interview.length + 6}</span>
                      <span className="text-sm font-semibold text-gray-500">Interview</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-2xl font-black text-gray-900">{hired.length + 4}</span>
                      <span className="text-sm font-semibold text-gray-500">Hired</span>
                  </div>
              </div>
              
              {/* Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Applied Column */}
                  <div className="bg-gray-50/50 rounded-3xl p-4 border border-gray-100">
                      <div className="flex justify-between items-center bg-indigo-600 text-white p-3 rounded-2xl mb-4">
                          <span className="font-bold text-sm">Applied</span>
                      </div>
                      <CandidateCard name="Michael Jones" role="Deferred Role" status="Applied" reward={70.00} />
                      <CandidateCard name="Rachel Lowes" role="Deferred Role" status="Applied" reward={70.00} />
                      {applied.map(ref => <CandidateCard key={ref._id} name={ref.candidateName} role={ref.jobRole} status={ref.status} reward={ref.rewardAmount} />)}
                  </div>
                  
                  {/* Interview Column */}
                  <div className="bg-gray-50/50 rounded-3xl p-4 border border-gray-100">
                      <div className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-2xl mb-4">
                          <span className="font-bold text-sm">Interview</span>
                      </div>
                      <CandidateCard name="Sarah Lee" role="Deferred Role" status="Interview" reward={120.00} />
                      <CandidateCard name="Emma Brown" role="Deferred Role" status="Interview" reward={70.00} />
                      {interview.map(ref => <CandidateCard key={ref._id} name={ref.candidateName} role={ref.jobRole} status={ref.status} reward={ref.rewardAmount} />)}
                  </div>
                  
                  {/* Hired Column */}
                  <div className="bg-gray-50/50 rounded-3xl p-4 border border-gray-100">
                      <div className="flex justify-between items-center bg-emerald-500 text-white p-3 rounded-2xl mb-4">
                          <span className="font-bold text-sm">Hired</span>
                      </div>
                      <CandidateCard name="David Kim" role="Deferred Role" status="Hired" reward={35.00} />
                      {hired.map(ref => <CandidateCard key={ref._id} name={ref.candidateName} role={ref.jobRole} status={ref.status} reward={ref.rewardAmount} />)}
                  </div>
              </div>

              {/* Activity Section */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-6">Last Activity</h4>
                      <div className="flex justify-between items-center pb-4 border-b border-gray-100 pointer-events-none">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">J</div>
                              <span className="text-sm font-semibold text-gray-900">Jane referred Sarah Lee</span>
                          </div>
                      </div>
                      <div className="flex justify-between items-center py-4">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                  <TrendingUp size={14} />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">PayPal Transfer Processed</span>
                          </div>
                          <span className="text-sm font-bold text-emerald-600">$70.00</span>
                      </div>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                      <h4 className="font-bold text-lg mb-2">Reward Trigger!</h4>
                      <p className="text-sm text-indigo-100 mb-6">Great mate! Sarah was recently hired. You've earned a $70 reward!</p>
                      <button onClick={() => setActiveView("Rewards")} className="bg-white text-indigo-600 font-bold text-sm px-6 py-2 rounded-full w-fit hover:bg-indigo-50 transition shadow-md block text-center">
                          View Reward Balance
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  const renderRewardsView = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                        <CreditCard size={120} />
                    </div>
                    <span className="text-sm font-bold tracking-wider uppercase text-gray-500">Total Rewards Balance</span>
                    <h2 className="text-5xl font-black text-gray-900 mt-2">${pendingRewards.toFixed(2)}</h2>
                    <div className="mt-8">
                        <svg className="w-full h-12 stroke-indigo-400 stroke-2 fill-none" viewBox="0 0 200 40" preserveAspectRatio="none">
                            <path d="M0,35 Q20,10 40,30 T80,20 T120,25 T160,10 T200,5" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="160" cy="10" r="3" className="fill-white stroke-indigo-500 stroke-2"/>
                            <circle cx="200" cy="5" r="3" className="fill-indigo-500 stroke-indigo-500 stroke-2"/>
                        </svg>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                        <CheckCircle size={120} />
                    </div>
                    <span className="text-sm font-bold tracking-wider uppercase text-gray-500">Payouts Sent</span>
                    <h2 className="text-5xl font-black text-gray-900 mt-2">${rewardsPaid.toFixed(2)}</h2>
                    <div className="mt-8">
                        <svg className="w-full h-12 stroke-emerald-400 stroke-2 fill-none" viewBox="0 0 200 40" preserveAspectRatio="none">
                            <path d="M0,20 Q20,35 40,25 T80,30 T120,15 T160,20 T200,10" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="20" cy="27" r="3" className="fill-white stroke-emerald-500 stroke-2"/>
                            <circle cx="200" cy="10" r="3" className="fill-emerald-500 stroke-emerald-500 stroke-2"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-6">Recent Activity</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold justify-center items-center flex text-sm">J</div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-sm">Jane Referred John</h5>
                                    <p className="text-xs text-gray-400">1 day ago</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-500">$70.00</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold justify-center items-center flex text-sm">E</div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-sm">Emma Wilson Hired!</h5>
                                    <p className="text-xs text-gray-400">3 days ago</p>
                                </div>
                            </div>
                            <span className="font-bold text-emerald-600">+$130.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold justify-center items-center flex text-sm">
                                    <Gift size={16}/>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900 text-sm">PayPal Transfer Processed</h5>
                                    <p className="text-xs text-gray-400">1 week ago</p>
                                </div>
                            </div>
                            <span className="font-bold text-emerald-600">+$125.00</span>
                        </div>
                    </div>
                </div>

                {/* Mobile visualization app promo graphic mock */}
                <div className="md:w-1/3 bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 border border-gray-100 relative">
                    <div className="w-48 h-80 bg-white rounded-3xl shadow-xl border-4 border-gray-900 relative overflow-hidden flex flex-col p-4 items-center text-center">
                        <div className="w-20 h-4 bg-gray-900 rounded-b-xl absolute top-0 -mt-1 mx-auto left-0 right-0"></div>
                        <Gift className="text-amber-400 w-16 h-16 mt-10 mb-4 animate-bounce" />
                        <h4 className="font-black text-gray-900 leading-tight">You've earned a $70 reward!</h4>
                        <p className="text-[10px] text-gray-500 mt-2">Emma was officially hired.</p>
                        <div className="mt-auto w-full bg-indigo-600 text-white rounded-full py-2 text-xs font-bold shadow-md">
                            View Balance
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header & Link Share */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Referral Platform</h1>
                    <p className="text-gray-500 mt-1 font-medium">Welcome Back, {MOCK_USER.name}</p>
                </div>
                
                <div className="bg-white p-2 pl-4 rounded-full shadow-sm border border-gray-200 flex items-center gap-4 w-full md:w-auto overflow-x-auto">
                    <span className="text-sm font-semibold text-indigo-600 truncate max-w-[200px]">www.thecontractum.com/ref/{MOCK_USER.refcode}</span>
                    <button onClick={copyLink} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-md whitespace-nowrap">
                        Copy link
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
                        <Plus size={16} /> New Candidate
                    </button>
                </div>
            </div>

            {/* Application Navigation Tabs mimicking the mobile/app header */}
            <div className="flex justify-center mb-8 relative z-10 w-full overflow-x-auto">
                <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-200 flex gap-2 w-max mx-auto">
                    <button onClick={() => setActiveView("Dashboard")} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === "Dashboard" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}>
                        Dashboard
                    </button>
                    <button onClick={() => setActiveView("Tracking")} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === "Tracking" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}>
                        Candidates & Tracking
                    </button>
                    <button onClick={() => setActiveView("Rewards")} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeView === "Rewards" ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}>
                        Rewards
                    </button>
                </div>
            </div>

            {/* Render the selected view */}
            {activeView === "Dashboard" && renderDashboardView()}
            {activeView === "Tracking" && renderTrackingView()}
            {activeView === "Rewards" && renderRewardsView()}

        </div>

        {/* Modal for new submission */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2"><Gift className="text-indigo-600"/> Refer a Candidate</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Candidate Name</label>
                            <input required type="text" value={formData.candidateName} onChange={e => setFormData({...formData, candidateName: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="John Doe"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                <input required type="email" value={formData.candidateEmail} onChange={e => setFormData({...formData, candidateEmail: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="john@example.com"/>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                                <input required type="text" value={formData.candidatePhone} onChange={e => setFormData({...formData, candidatePhone: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="+1 234 567 890"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Job Role</label>
                            <input required type="text" value={formData.jobRole} onChange={e => setFormData({...formData, jobRole: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. Senior Frontend Developer"/>
                        </div>
                        
                        <div className="pt-4">
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg transition-all text-lg">
                                Submit Referral
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
}

// Quick inline icon component to avoid an extra import if lucide-react doesn't export ClipboardCheck directly by that exact name in older versions, though it should. Let's just use it safely.
function ClipboardCheckIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="m9 14 2 2 4-4"/>
    </svg>
  );
}
