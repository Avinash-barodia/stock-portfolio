import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export const AccountSummary = ({ invested, worth, profit, percent }) => {
  const isProfit = profit >= 0;

  const data = [
    { id: 0, value: 40, label: 'Technology', color: '#3B82F6' },
    { id: 1, value: 30, label: 'Banking', color: '#8B5CF6' },
    { id: 2, value: 20, label: 'Energy', color: '#22C55E' },
    { id: 3, value: 10, label: 'Crypto', color: '#F59E0B' },
  ];

  return (
    <div className="p-6 flex flex-col gap-y-6 overflow-y-auto custom-scrollbar h-full">
      <div>
        <h3 className="text-xs font-semibold text-text-secondary tracking-widest uppercase mb-2">Portfolio Value</h3>
        <div className="flex flex-col gap-y-1">
          <span className="text-4xl font-extrabold tracking-tighter text-text-primary">
            ₹{worth?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
          </span>
          <div className="flex items-center gap-x-2">
            <span className={`text-[13px] font-bold px-2 py-0.5 rounded-lg ${isProfit ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>
              {isProfit ? '▲' : '▼'} {isProfit ? '+' : ''}₹{Math.abs(profit)?.toLocaleString() || '0'} ({percent || '0.00'}%)
            </span>
            <span className="text-[11px] text-text-secondary font-medium uppercase">Today</span>
          </div>
        </div>
      </div>

      {/* Allocation Chart */}
      <div className="py-4 border-t border-white/5">
        <h3 className="text-[10px] font-bold text-text-secondary tracking-wider uppercase mb-4">Asset Allocation</h3>
        <div className="flex justify-center h-[160px] w-full">
          <PieChart
            series={[
              {
                data,
                innerRadius: 40,
                outerRadius: 65,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 75,
                cy: 75,
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
                markGap: 5,
                itemGap: 8,
              },
            }}
            width={240}
            height={160}
          />
        </div>
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex justify-between items-center px-1">
          <div className="flex flex-col gap-y-0.5">
            <p className="text-[11px] text-text-secondary font-semibold uppercase tracking-wider">Invested</p>
            <p className="text-lg font-bold text-text-primary">₹{invested?.toLocaleString() || '0'}</p>
          </div>
          <div className="flex flex-col items-end gap-y-0.5">
            <p className="text-[11px] text-text-secondary font-semibold uppercase tracking-wider">Returns</p>
            <p className={`text-lg font-bold ${isProfit ? 'text-profit' : 'text-loss'}`}>
              {isProfit ? '+' : ''}{percent || '0'}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
