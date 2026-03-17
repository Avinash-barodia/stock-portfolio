import React, { useEffect, useState } from 'react'
import { Card } from './Card';
// import  WebSocket  from 'ws';
import { StockCard } from '../components/StockCard';
import {nifty} from "../assets/nifty500"
export const MarketUpdate = () => {  
   const [active, setActive] = useState(1);
   const [cryptoList] = useState(['btcusdt', 'ethusdt', 'dogeusdt', 'adausdt']);
   const [stockList] = useState(nifty.slice(0, 4));

   const marketIndicators = [
     { name: 'NIFTY 50', value: '22,410.50', change: '+0.65%', positive: true },
     { name: 'SENSEX', value: '73,420.15', change: '+0.41%', positive: true },
     { name: 'BANK NIFTY', value: '47,850.30', change: '-0.12%', positive: false },
     { name: 'NIFTY IT', value: '35,210.80', change: '+1.15%', positive: true },
   ];

   return (
     <div className='flex flex-col gap-y-6'>
        
        {/* Indicators Row */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {marketIndicators.map((ind, idx) => (
            <div key={idx} className='glass-card-premium p-4 flex flex-col gap-y-1 hover:scale-[1.03] transition-transform cursor-default'>
              <span className='text-[10px] font-bold text-text-secondary uppercase tracking-widest'>{ind.name}</span>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-bold text-white'>{ind.value}</span>
                <span className={`text-xs font-bold ${ind.positive ? 'text-profit' : 'text-loss'}`}>{ind.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className='glass-card-premium p-6 flex flex-col gap-y-6'>
           <div className='flex items-center justify-between'>
              <h2 className='text-xl font-bold tracking-tight text-white'>Market Assets</h2>
              <div className='flex bg-white/5 p-1 rounded-xl border border-white/5'>
                <button 
                  onClick={() => setActive(0)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${active === 0 ? 'bg-primary-blue text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}
                >
                  Crypto
                </button>
                <button 
                  onClick={() => setActive(1)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${active === 1 ? 'bg-primary-blue text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}
                >
                  Stocks
                </button>
              </div>
           </div>

           <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
             {active === 0 ?
               cryptoList.map((symbol, index) => (
                 <Card data={symbol} key={index} />
               )) :
               stockList.map((name, index) => (
                 <StockCard data={name} key={index} />
               ))
             }
           </div>
        </div>
     </div>
   );
}
