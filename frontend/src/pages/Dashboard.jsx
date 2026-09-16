import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { AlertTriangle, Cpu, DollarSign, Package } from 'lucide-react';

// Assets paths
const sliderImages = [
  "/assets/pic1.png",
  "/assets/pic2.png"
];
const staticKioskImage = "/assets/pic3.png";

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, lowStock: 0, totalMedicines: 0, aiStatus: 'Active' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [aiCommand, setAiCommand] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/inventory/stats/summary');
      setStats({
        revenue: res.data.revenue || 0,
        totalMedicines: res.data.totalMedicines || 0,
        lowStock: res.data.lowStock || 0,
        aiStatus: res.data.aiStatus || 'Active'
      });
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiCommand) return;
    setLoading(true);
    setAiResponse('Neural Engine processing...');
    try {
      const res = await axios.post('/ai/command', { prompt: aiCommand });
      setAiResponse(res.data.message);
      setAiCommand('');
    } catch (error) { setAiResponse('Error: Local LLM unreachable.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 md:p-10 mx-auto max-w-7xl transition-all duration-500">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
          PHARMACARE <span className="text-blue-500 underline decoration-blue-500/30">DASHBOARD</span>
        </h1>
        <p className="text-gray-400 text-xs font-bold tracking-[0.4em] mt-2 uppercase">Operational Command Center</p>
      </div>

      {/* 1. TOP SLIDER SECTION (Fixed: Perfect Center) */}
      <div className="relative group glass-card rounded-[40px] overflow-hidden h-[300px] border border-white/10 shadow-2xl mb-10 flex items-center justify-center bg-[#0b1437]/50">
        {sliderImages.map((img, index) => (
          <div key={index} className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src={img} 
              alt="Promo" 
              className="max-w-full max-h-full object-contain p-2" 
            />
            {/* Subtle bottom gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1437]/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ))}
        {/* Indicators */}
        <div className="absolute bottom-6 left-10 flex gap-3 z-10">
          {sliderImages.map((_, i) => (
            <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-10 bg-blue-500' : 'w-3 bg-white/20'}`}></div>
          ))}
        </div>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Revenue', value: `Rs. ${stats.revenue.toLocaleString()}`, icon: <DollarSign />, color: 'text-blue-400', glow: 'from-blue-500/20 to-transparent' },
          { label: 'Inventory', value: `${stats.totalMedicines} Units`, icon: <Package />, color: 'text-purple-400', glow: 'from-purple-500/20 to-transparent' },
          { label: 'Low Stock', value: `${stats.lowStock} Critical`, icon: <AlertTriangle />, color: 'text-red-400', glow: 'from-red-500/20 to-transparent' },
          { label: 'System AI', value: stats.aiStatus, icon: <Cpu />, color: 'text-green-400', glow: 'from-green-500/20 to-transparent' }
        ].map((s, i) => (
          <div key={i} className="relative group glass-card p-6 rounded-[32px] flex items-center gap-5 transition-all border border-white/5 hover:-translate-y-2">
            <div className={`p-4 rounded-2xl bg-white/5 ${s.color} shadow-lg`}>{s.icon}</div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
              <h3 className="text-xl font-bold text-white mt-1">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Console Section */}
      <div className="glass-card rounded-[45px] p-8 border border-white/5 shadow-2xl relative overflow-hidden mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white uppercase tracking-widest">
          <Cpu className="text-blue-400 animate-pulse" /> Neural Command Console
        </h2>
        <div className="glass-input p-6 rounded-[30px] mb-6 min-h-[220px] text-gray-200 shadow-inner overflow-y-auto max-h-[400px] border border-white/5 font-mono text-sm">
           <div className="flex gap-2 mb-4 border-b border-white/5 pb-2 text-blue-500">
             <span>system@pharmacare:~$</span>
             <span className="text-gray-500 italic">Analysis active...</span>
           </div>
           {aiResponse || "Awaiting input for system-wide analysis..."}
        </div>
        <form onSubmit={handleAiSubmit} className="flex gap-4">
          <input 
            type="text" 
            value={aiCommand} 
            onChange={(e) => setAiCommand(e.target.value)} 
            disabled={loading}
            className="flex-1 glass-input rounded-[22px] p-4 outline-none border border-white/10 text-white" 
            placeholder="Query system stats..." 
          />
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-[22px] font-black uppercase text-xs transition-all">
            {loading ? "Thinking..." : "Execute"}
          </button>
        </form>
      </div>

      {/* 4. STATIC BRANDING SECTION (Fixed: Full View & Center) */}
      <div className="glass-card rounded-[45px] overflow-hidden h-[300px] border border-white/10 shadow-2xl group relative flex items-center justify-center bg-[#0b1437]/50">
        <img 
          src={staticKioskImage} 
          alt="Branding Anchor" 
          className="max-w-full max-h-full object-contain p-6 transition-transform duration-1000 group-hover:scale-105" 
        />
        
        {/* Subtle Overlay Label */}
        <div className="absolute bottom-4 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Standardized Architecture</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;