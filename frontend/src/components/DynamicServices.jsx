import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DynamicServices = ({ category, subCategory }) => {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    fetch(`${API}/api/cms/services`)
      .then(r => r.json())
      .then(data => {
        const coreServices = [
          'CS & IT Services', 'GIS Solutions', 'MRAS Services',
          'E-Commerce Platforms', 'HR Tech Solutions', 'Digital Marketing', 'BPO Services',
          'Telecommunication', 'Network Infrastructure', 'Cloud Integration'
        ];
        const filtered = data.filter(s => {
          const matchCat = s.category === category;
          const matchSub = subCategory ? s.subCategory === subCategory : true;
          const notCore = !coreServices.includes(s.title);
          return matchCat && matchSub && s.status === 'Active' && notCore;
        });
        setServices(filtered);
      })
      .catch(console.error);
  }, [category, subCategory]);

  if (services.length === 0) return null;

  return (
    <div className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
           <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">Specialized <span className="text-blue-600">Offerings</span></h2>
           <p className="text-gray-500 max-w-2xl mx-auto">Explore our latest customized solutions designed specifically for your {category.toLowerCase()} needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <span className="text-2xl font-bold">{s.title.charAt(0)}</span>
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{s.title}</h3>
               <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{s.description}</p>
               <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                  {s.features?.slice(0, 3).map((f, idx) => (
                    <span key={idx} className="text-[10px] uppercase font-bold tracking-widest text-[#1e5cdc] bg-blue-50/50 px-2 py-1 rounded-md">{f}</span>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicServices;
