import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

export const StockCard = ({ data }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [col, setCol] = useState(1);
  const [volume, setVolume] = useState(0);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/history/${data}?interval=15m&range=1d`);
      if (res.data.success) {
        const formattedHistory = res.data.data.map(item => ({
          value: item.close,
        }));
        setHistory(formattedHistory);
      }
    } catch (err) {
      console.log('Error fetching history', err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await api.get(`/fetch/${data}`);
      const newPrice = res.data.price;
      setPrice(prevPrice => {
        setCol(newPrice >= prevPrice ? 1 : 0);
        return newPrice;
      });
      setVolume(res.data.volume);
      
      // Update history with new point
      setHistory(prevHistory => {
        const newHistory = [...prevHistory, { value: newPrice }];
        return newHistory.slice(-50); // Keep reasonable number of points
      });
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);  

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div 
      className='glass-card-premium group'
      onClick={() => navigate(`/technical/${data}`)}
    >
      <div className='flex justify-between items-start'>
        <div className='flex flex-col gap-y-0.5'>
          <h3 className='text-sm font-bold tracking-tight text-white group-hover:text-primary-blue transition-colors'>{data}</h3>
          <span className='text-[10px] text-text-secondary font-bold uppercase tracking-widest'>NSE (India)</span>
        </div>
        <div className='w-24 h-12'>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id={`gradient-stock-${data}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={col ? '#22C55E' : '#EF4444'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={col ? '#22C55E' : '#EF4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={['auto', 'auto']} hide />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={col ? '#22C55E' : '#EF4444'} 
                fillOpacity={1} 
                fill={`url(#gradient-stock-${data})`} 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='flex flex-col gap-y-1'>
        <p className={`text-2xl font-extrabold tracking-tighter ${col ? 'text-profit' : 'text-loss'}`}>
          ₹{parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className='flex justify-between items-center'>
          <span className='text-[11px] font-medium text-text-secondary'>Vol: {parseFloat(volume).toLocaleString()}</span>
          <span className={`text-[10px] font-bold ${col ? 'text-profit bg-profit/10' : 'text-loss bg-loss/10'} px-1.5 py-0.5 rounded transition-colors`}>
            OPEN
          </span>
        </div>
      </div>
    </div>
  );
};
