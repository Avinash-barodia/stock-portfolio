import React, { useState, useEffect } from 'react';
import { Wallet, Zap, ShieldCheck, Search, BarChart3, Info } from 'lucide-react';

export const QuickTrade = ({ selectedSymbol }) => {
  const [type, setType] = useState('buy');
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');
  const [mockPrice, setMockPrice] = useState(0);

  useEffect(() => {
    if (selectedSymbol) {
      setSymbol(selectedSymbol);
      setType('buy');
    }
  }, [selectedSymbol]);

  // Mock price fetch effect
  useEffect(() => {
    if (symbol) {
      // Simulate fetching a price for the symbol
      const randomPrice = Math.random() * 500 + 100;
      setMockPrice(randomPrice);
    } else {
      setMockPrice(0);
    }
  }, [symbol]);

  const estimatedTotal = (parseFloat(qty) || 0) * mockPrice;

  return (
    <div className="flex flex-col h-full">
      <div className="surface-premium p-6 flex flex-col gap-y-6 shadow-xl h-full">
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2'>
            <Zap size={18} className="text-primary-blue" />
            <h3 className="text-lg font-bold text-white tracking-tight">Quick Trade</h3>
          </div>
          <button className="text-text-secondary hover:text-white transition-colors">
            <Info size={16} />
          </button>
        </div>
        
        {/* Segmented Control Toggle */}
        <div className="relative flex bg-[#0f172a] rounded-xl p-1 border border-white/5 transition-premium">
          {/* Sliding Background */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-0 ${
              type === 'buy' ? 'left-1 bg-profit shadow-lg shadow-profit/20' : 'left-[calc(50%+2px)] bg-loss shadow-lg shadow-loss/20'
            }`}
          />
          <button 
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-premium z-10 btn-premium ${type === 'buy' ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setType('buy')}
          >
            Buy
          </button>
          <button 
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-premium z-10 btn-premium ${type === 'sell' ? 'text-white' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setType('sell')}
          >
            Sell
          </button>
        </div>

        {/* Form Controls */}
        <div className="flex flex-col gap-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-1">Asset Symbol</label>
            <div className="relative group transition-premium">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary-blue transition-premium" />
              <input 
                type="text" 
                placeholder="BTC or AAPL" 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-primary-blue/50 focus:ring-1 focus:ring-primary-blue/20 transition-premium placeholder:text-white/10 group-hover:border-white/20"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-1">Order Quantity</label>
            <div className="relative group transition-premium">
              <BarChart3 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary-blue transition-premium" />
              <input 
                type="number" 
                placeholder="0.00" 
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-primary-blue/50 focus:ring-1 focus:ring-primary-blue/20 transition-premium placeholder:text-white/10 group-hover:border-white/20"
              />
            </div>
          </div>

          {/* Dynamic Feedback Panel */}
          <div className="mt-2 p-5 bg-[#0f172a]/50 border border-white/[0.03] rounded-2xl space-y-3 transition-premium hover:border-white/10">
             <div className="flex justify-between items-center transition-premium group">
               <span className="text-[11px] text-text-secondary font-bold uppercase tracking-wider">Est. Price</span>
               <span className="text-sm font-bold text-white transition-premium group-hover:text-primary-blue">
                 {symbol ? `₹${mockPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
               </span>
             </div>
             <div className="h-px bg-white/5 w-full" />
             <div className="flex justify-between items-center transition-premium group">
               <span className="text-[11px] text-text-secondary font-bold uppercase tracking-wider">Estimated Total</span>
               <span className={`text-lg font-black transition-premium group-hover:scale-105 origin-right ${type === 'buy' ? 'text-profit' : 'text-loss'}`}>
                 ₹{estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </span>
             </div>
          </div>

          <button className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl btn-premium flex items-center justify-center gap-x-2 ${
            type === 'buy' 
              ? 'bg-profit shadow-profit/20 hover:bg-green-600' 
              : 'bg-loss shadow-loss/20 hover:bg-red-600'
          }`}>
            <ShieldCheck size={16} />
            Execute {type}
          </button>
        </div>
      </div>
    </div>
  );
};
