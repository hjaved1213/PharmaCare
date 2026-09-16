import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShieldCheck, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto px-6 pb-8 transition-all duration-300">
      <div className="glass-card rounded-[30px] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
                <Plus className="text-white" size={20} strokeWidth={3} />
              </div>
              <h1 className="text-xl font-bold tracking-tighter text-white uppercase">
                PHARMA<span className="text-blue-500">CARE</span>
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">Aapki Sehat, <br /> Hamari Tarjeeh</h2>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Quick Access</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/inventory" className="hover:text-blue-400 transition-colors">Inventory</Link></li>
              <li><Link to="/pos" className="hover:text-blue-400 transition-colors">POS System</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li className="hover:text-blue-400 cursor-pointer">Help Center</li>
              <li className="hover:text-blue-400 cursor-pointer">Editorial Policy</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li className="flex items-center gap-3 text-white"><Mail size={16} className="text-blue-500" /> info@pharmacare.com</li>
              <li className="flex items-center gap-3 text-white"><Phone size={16} className="text-blue-500" /> +92 326 0362326</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">© PharmaCare 2024-{currentYear} | Made by Hamza Javed</p>
          <div className="bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 tracking-widest">SECURED SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;