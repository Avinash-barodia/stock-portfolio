import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, User, LayoutDashboard, Briefcase, TrendingUp, Menu } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full h-16 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between transition-premium">
      {/* Left: Logo & Nav Links */}
      <div className="flex items-center gap-x-8">
        <Link to="/" className="flex items-center gap-x-2 group active-depress">
          <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center shadow-lg shadow-primary-blue/20 group-hover:scale-110 transition-premium">
            <TrendingUp size={18} className="text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase italic">StockPro</span>
        </Link>

        <div className="hidden md:flex items-center gap-x-1">
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-white hover:bg-white/5 rounded-lg btn-premium flex items-center gap-x-2"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </button>
          <button 
            onClick={() => navigate('/Portfolio')}
            className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-white hover:bg-white/5 rounded-lg btn-premium flex items-center gap-x-2"
          >
            <Briefcase size={16} />
            Portfolio
          </button>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative group transition-premium">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary-blue transition-premium" />
          <input 
            type="text" 
            placeholder="Search stocks, crypto, or news..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm font-medium text-white focus:outline-none focus:border-primary-blue/50 focus:ring-1 focus:ring-primary-blue/20 transition-premium placeholder:text-text-secondary/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-text-secondary">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-text-secondary">K</kbd>
          </div>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-x-4">
        <button className="relative p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg btn-premium">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-loss rounded-full border-2 border-[#0B0F19]"></span>
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-x-3 p-1.5 pl-3 hover:bg-white/5 rounded-full btn-premium group">
          <div className="flex flex-col items-end hidden sm:flex transition-premium group-hover:translate-x-[-2px]">
            <span className="text-xs font-bold text-white leading-none">Alex Rivera</span>
            <span className="text-[10px] text-profit font-bold uppercase tracking-tighter mt-1">Pro Plan</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-blue to-purple-600 flex items-center justify-center border-2 border-white/10 shadow-lg group-hover:border-primary-blue/50 group-hover:scale-105 transition-premium">
            <span className="text-sm font-black text-white">AR</span>
          </div>
        </button>

        <button className="md:hidden p-2 text-text-secondary hover:text-white">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};
