import React, { useState, useEffect } from 'react';
import { Wallet, Zap, ShieldCheck } from 'lucide-react';

export const QuickTrade = ({ selectedSymbol }) => {
  const [type, setType] = useState('buy');
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');

  useEffect(() => {
    if (selectedSymbol) {
      setSymbol(selectedSymbol);
      setType('buy');
    }
  }, [selectedSymbol]);

  return (
    <div className="p-6 flex-1 flex flex-col">
      <div className='flex items-center gap-x-2 mb-6'>
        <Wallet size={20} className="text-primary-blue" />
        <h3 className="text-lg font-bold">Quick Trade</h3>
      </div>
      
      {/* Toggle */}
      <div className="flex bg-white/5 rounded-xl p-1 mb-6 border border-white/5">
        <button 
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all btn-premium ${type === 'buy' ? 'bg-profit text-white shadow-lg shadow-profit/20' : 'text-text-secondary hover:text-white'}`}
          onClick={() => setType('buy')}
        >
          Buy
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all btn-premium ${type === 'sell' ? 'bg-loss text-white shadow-lg shadow-loss/20' : 'text-text-secondary hover:text-white'}`}
          onClick={() => setType('sell')}
        >
          Sell
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-y-5 flex-1">
        <div>
          <label className="flex items-center gap-x-1.5 text-xs text-text-secondary mb-2 font-bold uppercase tracking-wider">
            <Zap size={12} className="text-yellow-500" />
            Asset Symbol
          </label>
          <input 
            type="text" 
            placeholder="e.g. AAPL or BTC" 
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-blue transition-all text-text-primary placeholder:text-text-secondary/40"
          />
        </div>
        
        <div>
          <label className="flex items-center gap-x-1.5 text-xs text-text-secondary mb-2 font-bold uppercase tracking-wider">
            <ShieldCheck size={12} className="text-primary-blue" />
            Quantity
          </label>
          <input 
            type="number" 
            placeholder="0.00" 
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-blue transition-all text-text-primary placeholder:text-text-secondary/40"
          />
        </div>

        <div className="mt-2 p-4 bg-white/[0.03] border border-white/5 rounded-xl">
           <div className="flex justify-between text-xs mb-1">
             <span className="text-text-secondary">Market Price</span>
             <span className="font-bold text-text-primary">$0.00</span>
           </div>
           <div className="flex justify-between text-sm pt-2 border-t border-white/5">
             <span className="text-text-secondary font-medium">Estimated Total</span>
             <span className="font-bold text-text-primary text-base">$0.00</span>
           </div>
        </div>

        <button className={`w-full mt-auto py-4 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-x-2 btn-premium ${type === 'buy' ? 'bg-profit shadow-profit/20 hover:bg-green-600' : 'bg-loss shadow-loss/20 hover:bg-red-600'}`}>
          {type === 'buy' ? 'Execute Buy' : 'Execute Sell'}
        </button>
      </div>
    </div>
  )
}
