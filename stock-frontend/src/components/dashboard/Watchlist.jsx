import React, { useState } from 'react';
import { TrendingUp, TrendingDown, PlusCircle, Activity, Search, X } from 'lucide-react';

const Sparkline = ({ data, color }) => {
  // Simple fake sparkline paths based on character hash/variation
  const points = data.split('').map((c, i) => (c.charCodeAt(0) % 10) * 2);
  const path = points.map((p, i) => `${i * 6},${20 - p}`).join(' L ');
  
  return (
    <svg width="40" height="20" className="opacity-60 overflow-visible">
      <path d={`M 0,10 L ${path}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Watchlist = ({ data, active, setActive, onQuickBuy }) => {  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => {
    const symbol = active === 0 ? item.symbol : item;
    return symbol.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='flex flex-col h-full'>
      <div className='p-6 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2'>
            <Activity size={18} className="text-primary-blue animate-pulse" />
            <h2 className='text-lg font-bold tracking-tight text-white'>Live Watchlist</h2>
          </div>
          <div className='flex bg-white/5 p-1 rounded-lg border border-white/5'>
            <button 
              onClick={() => setActive(0)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all btn-premium ${active === 0 ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/30' : 'text-text-secondary hover:text-white'}`}
            >
              Crypto
            </button>
            <button 
              onClick={() => setActive(1)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all btn-premium ${active === 1 ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/30' : 'text-text-secondary hover:text-white'}`}
            >
              Stocks
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className='relative group'>
          <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary-blue transition-colors' />
          <input 
            type="text" 
            placeholder={`Search ${active === 0 ? 'Crypto' : 'Stocks'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-xs text-text-primary focus:outline-none focus:border-primary-blue focus:bg-white/[0.08] transition-all placeholder:text-text-secondary/50'
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors'
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className='flex flex-col gap-y-1 mt-2 custom-scrollbar overflow-y-auto max-h-[70vh]'>
          {filteredData.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center opacity-40">
               {searchTerm ? <Search size={40} className="mb-2" /> : <Activity size={40} className="mb-2" />}
               <span className="text-xs font-medium">{searchTerm ? 'No results found' : 'Fetching market data...'}</span>
            </div>
          ) : filteredData.map((item, index) => {
            const isCrypto = active === 0;
            const symbol = isCrypto ? item.symbol : item;
            const cleanSymbol = isCrypto ? symbol.replace("USDT","") : symbol;
            const price = isCrypto ? parseFloat(item.lastPrice || item.weightedAvgPrice).toFixed(2) : (Math.random() * 1000 + 500).toFixed(2);
            const change = isCrypto ? parseFloat(item.priceChangePercent).toFixed(2) : (Math.random() * 5 - 2).toFixed(2);
            const isPositive = parseFloat(change) >= 0;

            return (
              <div 
                key={index} 
                className='flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/[0.04] hover:translate-x-1 transition-all cursor-pointer group'
              >
                <div className='flex items-center gap-x-3'>
                  <div className='flex flex-col gap-y-0.5'>
                    <span className='font-bold text-sm text-text-primary group-hover:text-primary-blue transition-colors uppercase'>
                      {cleanSymbol}
                    </span>
                    <span className='text-[10px] text-text-secondary font-bold uppercase tracking-wider flex items-center gap-x-1'>
                      {isCrypto ? 'Binance' : 'NSE'}
                      {isPositive ? <TrendingUp size={10} className="text-profit" /> : <TrendingDown size={10} className="text-loss" />}
                    </span>
                  </div>
                  <Sparkline data={symbol} color={isPositive ? 'var(--profit)' : 'var(--loss)'} />
                </div>
                
                <div className='flex items-center gap-x-4'>
                  <div className='flex flex-col items-end gap-y-0.5'>
                    <span className='font-bold text-sm text-text-primary group-hover:scale-110 transition-transform origin-right'>
                      {isCrypto ? '$' : '₹'}{parseFloat(price).toLocaleString()}
                    </span>
                    <span className={`text-[11px] font-bold ${isPositive ? 'text-profit' : 'text-loss'}`}>
                      {isPositive ? '+' : ''}{change}%
                    </span>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickBuy(cleanSymbol);
                    }}
                    className='opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center transition-all btn-premium shadow-lg shadow-primary-blue/30 hover:bg-blue-600'
                  >
                    <PlusCircle size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
