import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockData = {
  '1D': [
    { time: '09:00', value: 42000 },
    { time: '10:00', value: 42500 },
    { time: '11:00', value: 42300 },
    { time: '12:00', value: 43000 },
    { time: '13:00', value: 43500 },
    { time: '14:00', value: 43200 },
    { time: '15:00', value: 44000 },
  ],
  '1W': [
    { time: 'Mon', value: 40000 },
    { time: 'Tue', value: 41000 },
    { time: 'Wed', value: 40500 },
    { time: 'Thu', value: 42000 },
    { time: 'Fri', value: 43000 },
    { time: 'Sat', value: 43500 },
    { time: 'Sun', value: 44000 },
  ],
  '1M': [
    { time: 'Week 1', value: 38000 },
    { time: 'Week 2', value: 40000 },
    { time: 'Week 3', value: 42000 },
    { time: 'Week 4', value: 44000 },
  ],
  '1Y': [
    { time: 'Jan', value: 30000 },
    { time: 'Mar', value: 35000 },
    { time: 'May', value: 32000 },
    { time: 'Jul', value: 38000 },
    { time: 'Sep', value: 41000 },
    { time: 'Nov', value: 43000 },
    { time: 'Dec', value: 44000 },
  ],
};

export const PortfolioHero = ({ stats }) => {
  const [timeframe, setTimeframe] = useState('1M');
  const data = mockData[timeframe];
  const isProfit = parseFloat(stats.profit) >= 0;
  const lastUpdated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`surface-premium p-8 flex flex-col gap-y-8 transition-premium border-white/10 ${isProfit ? 'hero-glow-profit' : 'hero-glow-loss'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-x-3">
             <div className="flex items-center px-2 py-1 bg-white/5 rounded-full border border-white/5">
                <span className="heartbeat-live">
                  <span className="heartbeat-live-ring"></span>
                  <span className="heartbeat-live-core"></span>
                </span>
                <span className="text-[10px] font-bold text-profit uppercase tracking-widest">Live Markets</span>
             </div>
             <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded-full border border-white/5 flex items-center gap-x-1.5">
               <span className="w-1 h-1 bg-white/40 rounded-full"></span>
               Updated {lastUpdated}
             </span>
          </div>

          <div className="space-y-1">
            <span className="text-text-secondary text-xs font-bold uppercase tracking-widest ml-1 opacity-80">Total Net Worth</span>
            <div className="flex flex-col">
              <h2 className="text-hero py-2">₹{parseFloat(stats.worth || 44000).toLocaleString()}</h2>
              <div className="flex items-center gap-x-2 mt-1 px-1">
                <span className={`text-xl font-black tracking-tight ${isProfit ? 'text-profit' : 'text-loss'}`}>
                  {isProfit ? '+' : ''}{stats.percent}%
                </span>
                <span className="text-sm font-bold text-text-secondary">Global Return</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex bg-black/20 p-1.5 rounded-2xl border border-white/5 shadow-inner transition-premium">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2.5 text-xs font-black rounded-xl btn-premium transition-premium ${
                timeframe === tf
                  ? 'bg-primary-blue text-white shadow-2xl shadow-primary-blue/30 scale-105'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2962FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2962FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              hide={true}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #ffffff10', 
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#fff'
              }}
              itemStyle={{ color: '#fff' }}
              cursor={{ stroke: '#2962FF', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2962FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
