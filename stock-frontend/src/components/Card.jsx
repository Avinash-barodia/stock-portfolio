import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import axios from 'axios';

export const Card = ({ data }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState(1);
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch initial history from Binance (30 points of 1m data)
      const symbol = data.toUpperCase();
      const res = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=30`);
      const formattedHistory = res.data.map(item => ({
        value: parseFloat(item[4]), // Close price
      }));
      setHistory(formattedHistory);
      if (formattedHistory.length > 0) {
        setPrice(formattedHistory[formattedHistory.length - 1].value);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const setupWebSocket = () => {
    try {
      const binance = new WebSocket(`wss://stream.binance.com:9443/ws/${data.toLowerCase()}@trade`);
      binance.onmessage = (event) => {
        let obj = JSON.parse(event.data);
        const currentPrice = parseFloat(obj.p);
        
        setPrice(prevPrice => {
          setColor(currentPrice >= prevPrice ? 1 : 0);
          return currentPrice;
        });
        setQuantity(obj.q);

        // Update sparkline history
        setHistory(prevHistory => {
          const newHistory = [...prevHistory, { value: currentPrice }];
          return newHistory.slice(-30); // Keep last 30 points
        });
      };
      return binance;
    } catch (error) {
      console.error('WebSocket error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const ws = setupWebSocket();
    return () => {
      if (ws) ws.close();
    };
  }, [data]);

  return (
    <div 
      className='glass-card-premium group' 
      onClick={() => navigate(`/technical/${data}`)}
    >
      <div className='flex justify-between items-start'>
        <div className='flex flex-col gap-y-0.5'>
          <h3 className='text-sm font-bold tracking-tight text-white group-hover:text-primary-blue transition-colors'>
            {data.replace("USDT", "").toUpperCase()}
          </h3>
          <span className='text-[10px] text-text-secondary font-bold uppercase tracking-widest'>Crypto</span>
        </div>
        <div className='w-24 h-12'>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id={`gradient-${data}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color ? '#22C55E' : '#EF4444'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color ? '#22C55E' : '#EF4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis domain={['auto', 'auto']} hide />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color ? '#22C55E' : '#EF4444'} 
                fillOpacity={1} 
                fill={`url(#gradient-${data})`} 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='flex flex-col gap-y-1'>
        <p className={`text-2xl font-extrabold tracking-tighter ${color ? 'text-profit' : 'text-loss'}`}>
          ${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className='flex justify-between items-center'>
          <span className='text-[11px] font-medium text-text-secondary'>Vol: {parseFloat(quantity).toFixed(4)}</span>
          <span className={`text-[10px] font-bold ${color ? 'text-profit bg-profit/10' : 'text-loss bg-loss/10'} px-1.5 py-0.5 rounded transition-colors`}>
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
};
