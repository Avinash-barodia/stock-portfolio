import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import api from '../utils/api';

export const AssetCard = ({ data }) => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const isProfit = (data.currentPrice - data.buyingPrice) >= 0;

  const fetchHistory = async () => {
    try {
      // Try to fetch history for the asset symbol
      const res = await api.get(`/history/${data.name}?interval=1h&range=1w`);
      if (res.data.success) {
        setHistory(res.data.data.map(item => ({ value: item.close })));
      }
    } catch (err) {
      // Fallback: Generate dummy sparkline if history fails
      const dummyHistory = Array.from({ length: 20 }, (_, i) => ({
        value: parseFloat(data.buyingPrice) + (Math.random() - 0.4) * (parseFloat(data.currentPrice) / 10)
      }));
      setHistory(dummyHistory);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [data.name]);

  return (
    <div 
      onClick={() => navigate('test')} 
      className="glass-card-premium group"
    >
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-y-1'>
          <span className='text-[10px] font-bold text-text-secondary uppercase tracking-widest'>Asset Name</span>
          <div className='text-white font-bold text-2xl group-hover:text-primary-blue transition-colors'>{data.name}</div>
        </div>
        <div className='w-20 h-10 opacity-50 group-hover:opacity-100 transition-opacity'>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <YAxis domain={['auto', 'auto']} hide />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isProfit ? '#22C55E' : '#EF4444'} 
                fill={isProfit ? '#22C55E20' : '#EF444420'} 
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='flex flex-col gap-y-1'>
        <span className='text-[10px] font-bold text-text-secondary uppercase tracking-widest'>Current Value</span>
        <div className={`font-extrabold text-2xl ${isProfit ? 'text-profit' : 'text-loss'}`}>
          ₹{parseFloat(data.currentPrice).toLocaleString()}
        </div>
      </div>

      <div className='flex items-center justify-between pt-4 border-t border-white/5'>
        <div className='flex flex-col'>
          <span className='text-[10px] font-bold text-text-secondary uppercase'>Returns</span>
          <span className={`text-sm font-bold ${isProfit ? 'text-profit' : 'text-loss'}`}>
            {isProfit ? '+' : ''}{(((data.currentPrice - data.buyingPrice) / data.buyingPrice) * 100).toFixed(2)}%
          </span>
        </div>
        <div className='flex flex-col items-end'>
          <span className='text-[10px] font-bold text-text-secondary uppercase'>Quantity</span>
          <span className='text-sm font-bold text-white'>{data.quantity}</span>
        </div>
      </div>
    </div>
  )
}
