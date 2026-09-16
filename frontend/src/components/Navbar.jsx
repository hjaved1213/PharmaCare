import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Plus, LogOut, Info } from 'lucide-react'; // Info icon yahan add kiya hai

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  // Navigation Links ki array aik hi baar define karein
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Inventory', path: '/inventory', icon: <Package size={18} /> },
    { name: 'POS', path: '/pos', icon: <ShoppingBag size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> }
  ];

  return (
    <nav className="sticky top-4 z-50 flex items-center justify-between rounded-[24px] p-4 mx-6 mt-4 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
      
      {/* Brand with Glowing Effect */}
      <div className="flex items-center gap-3 ml-4 group">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/30 group-hover:rotate-12 transition-transform">
          <Plus className="text-white" size={20} strokeWidth={3} />
        </div>
        <h1 className="text-xl font-bold tracking-tighter text-white">
          PHARMA<span className="text-blue-500">CARE</span>
        </h1>
      </div>

      {/* Glass Navigation Tabs - Clean Loop */}
      <div className="hidden lg:flex items-center gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${
              location.pathname === link.path 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.icon} {link.name}
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mr-2">
        <div className="flex items-center gap-4 pl-4 border-l border-white/10 group cursor-pointer">
           <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-white leading-tight uppercase tracking-tighter">
                {user?.name || "Abdullah"}
              </p>
              <button 
                onClick={onLogout} 
                className="text-[10px] text-red-400 font-bold uppercase tracking-widest hover:text-red-500 flex items-center gap-1 mt-1 transition-colors"
              >
                <LogOut size={10} /> Logout
              </button>
           </div>
           <div className="relative">
             <img 
               src={user?.profilePic || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0D8ABC&color=fff`} 
               alt="User" 
               className="w-11 h-11 rounded-full border-2 border-blue-500 p-0.5 object-cover shadow-lg transition-transform group-hover:scale-110" 
             />
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0b1437] rounded-full shadow-lg shadow-green-500/50"></div>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;