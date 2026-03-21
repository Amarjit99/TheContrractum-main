import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LabelList, BarChart, Bar, Legend
} from 'recharts';
import { Activity, Users, MousePointer2, Target, TrendingUp, Calendar } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const visitorData = [
  { day: 'Mon', visitors: 400, pageViews: 2400 },
  { day: 'Tue', visitors: 300, pageViews: 1398 },
  { day: 'Wed', visitors: 200, pageViews: 9800 },
  { day: 'Thu', visitors: 278, pageViews: 3908 },
  { day: 'Fri', visitors: 189, pageViews: 4800 },
  { day: 'Sat', visitors: 239, pageViews: 3800 },
  { day: 'Sun', visitors: 349, pageViews: 4300 },
];

const categoryData = [
  { name: 'Technology', value: 45 },
  { name: 'Business', value: 30 },
  { name: 'Innovation', value: 15 },
  { name: 'Others', value: 10 },
];

export default function AdminAnalytics() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: { Authorization: `Bearer ${admin?.token}` } })
      .then(r => r.json()).then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 mt-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Advanced Analytics</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium italic">Deep dive into your traffic and conversion metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-600">
            <Calendar size={16} /> Last 7 Days
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Bounce Rate</span>
            <div className="p-2 bg-blue-50 text-[#1e5cdc] rounded-xl"><Activity size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">24.5%</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 2.1%</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Avg. Session</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">4m 12s</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 15s</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Page / Visit</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><MousePointer2 size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">3.8</h3>
            <span className="text-xs font-bold text-red-500 flex items-center gap-0.5">▼ 0.2</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Goal Conversions</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Target size={20} /></div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">89</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> 12</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Traffic Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Live Traffic Telemetry</h3>
            <div className="flex items-center gap-4">
               <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-[#1e5cdc]"></span> Visitors
               </span>
               <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase">
                 <span className="w-2.5 h-2.5 rounded-full bg-blue-200"></span> Pageviews
               </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e5cdc" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e5cdc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontSize: '12px', fontWeight: 800}}
                />
                <Area type="monotone" dataKey="visitors" stroke="#1e5cdc" strokeWidth={3} fillOpacity={1} fill="url(#colorVis)" />
                <Area type="monotone" dataKey="pageViews" stroke="#bfdbfe" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Breakdown Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Content Popularity Index</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 800, fill: '#1e293b'}} />
                <Tooltip cursor={{fill: '#f8fafc', radius: 8}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Bar dataKey="value" fill="#1e5cdc" radius={[0, 10, 10, 0]} barSize={32}>
                  <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} style={{fontSize: '12px', fontWeight: 800, fill: '#64748b'}} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-gray-400 font-medium text-center">Data represents engagement distribution across site categories</p>
        </div>
      </div>
    </AdminLayout>
  );
}

