import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { TrendingUp, TrendingDown, Wallet, PieChart as PieIcon, ArrowUpRight } from 'lucide-react';

export const AccountSummary = ({ invested, worth, profit, percent }) => {
  const isProfit = profit >= 0;

  const allocationData = [
    { id: 0, value: 40, label: 'Technology', color: '#3B82F6' },
    { id: 1, value: 30, label: 'Banking', color: '#8B5CF6' },
    { id: 2, value: 20, label: 'Energy', color: '#22C55E' },
    { id: 3, value: 10, label: 'Crypto', color: '#F59E0B' },
  ];

  return (
    <div className="flex flex-col gap-y-6 h-full">
      {/* Hero Portfolio Card */}
      <div className="surface-premium p-8 flex flex-col gap-y-8 shadow-2xl relative overflow-hidden group">
        {/* Background Decorative Element */}
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary-blue/5 rounded-full blur-3xl group-hover:bg-primary-blue/10 transition-colors duration-500" />
        
        <div>
          <div className="flex items-center gap-x-2 mb-3">
            <Wallet size={14} className="text-primary-blue" />
            <span className="text-[10px] font-bold text-text-secondary tracking-[0.2em] uppercase">Total Portfolio Value</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-white">
              ₹{worth?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0'}
              <span className="text-xl font-medium text-text-secondary ml-1">.{worth?.toFixed(2).split('.')[1] || '00'}</span>
            </h1>
            <div className="flex items-center gap-x-3 mt-1">
              <div className={`flex items-center gap-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${isProfit ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>
                {isProfit ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isProfit ? '+' : ''}₹{Math.abs(profit)?.toLocaleString() || '0'}
              </div>
              <span className={`text-sm font-bold ${isProfit ? 'text-profit' : 'text-loss'}`}>
                {isProfit ? '+' : ''}{percent || '0.00'}%
              </span>
              <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">All Time</span>
            </div>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
          <div className="flex flex-col gap-y-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Net Invested</span>
            <div className="flex items-baseline gap-x-1">
              <span className="text-xl font-bold text-white">₹{invested?.toLocaleString() || '0'}</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 items-end text-right">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Net Returns</span>
            <div className={`flex items-baseline gap-x-1 text-xl font-bold ${isProfit ? 'text-profit' : 'text-loss'}`}>
              <span>{isProfit ? '+' : ''}₹{Math.abs(profit)?.toLocaleString() || '0'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Section */}
      <div className="surface-premium p-6 flex flex-col gap-y-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <PieIcon size={16} className="text-primary-blue" />
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Asset Allocation</h3>
          </div>
          <button className="text-[10px] font-bold text-text-secondary hover:text-white transition-colors flex items-center gap-x-1 uppercase tracking-wider">
            Details <ArrowUpRight size={12} />
          </button>
        </div>
        
        <div className="flex justify-center items-center h-[180px] w-full mt-2">
          <PieChart
            series={[
              {
                data: allocationData,
                innerRadius: 50,
                outerRadius: 80,
                paddingAngle: 4,
                cornerRadius: 6,
                startAngle: -90,
                endAngle: 270,
                cx: 80,
                cy: 90,
              },
            ]}
            slotProps={{
              legend: {
                direction: 'column',
                position: { vertical: 'middle', horizontal: 'right' },
                labelStyle: {
                  fontSize: 10,
                  fill: '#9CA3AF',
                  fontWeight: 600,
                },
                itemMarkWidth: 8,
                itemMarkHeight: 8,
                markGap: 8,
                itemGap: 10,
              },
            }}
            width={260}
            height={180}
          />
        </div>
      </div>
    </div>
  );
};
