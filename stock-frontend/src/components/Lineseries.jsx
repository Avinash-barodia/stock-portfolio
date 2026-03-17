import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import api from '../utils/api';

const RangeSwitcherChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [dySeries, setDySeries] = useState([]);
  const areaSeriesRef = useRef(null);

  const intervalColors = {
    '1D': '#2962FF',
    '1W': 'rgb(225, 87, 90)',
    '1M': 'rgb(242, 142, 44)',
    '1Y': 'rgb(164, 89, 209)',
  };

  const seriesesData = new Map([
    ['1D', dySeries],
    ['1W', [{ time: '2022-01-01', value: 50 }, { time: '2022-01-07', value: 70 }]],
    ['1M', [{ time: '2022-01-01', value: 50 }, { time: '2022-01-31', value: 60 }]],
    ['1Y', [{ time: '2022-01-01', value: 50 }, { time: '2022-12-31', value: 80 }]],
  ]);

  const [currentInterval, setCurrentInterval] = useState('1D');

  const getDailyData = async () => {
    try {
      const res = await api.post('/daily', { name: data });
      setDySeries(res.data.data);
    } catch (err) {
      console.error('Daily data fetch error:', err);
    }
  }

  useEffect(() => {
    getDailyData();
  }, []);

  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: '#9CA3AF',
        background: { type: 'solid', color: 'transparent' },
        fontFamily: 'Inter',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      height: 600,
    };
    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const areaSeries = chart.addAreaSeries({
      topColor: intervalColors['1D'],
      bottomColor: intervalColors['1D'] + '77',
      lineColor: intervalColors['1D'],
    });
    areaSeriesRef.current = areaSeries;

    setChartInterval('1D');

    return () => {
      chart.remove();
    };
  }, [dySeries]);

  const setChartInterval = (interval) => {
    const areaSeries = areaSeriesRef.current;
    if (!areaSeries) return;

    areaSeries.setData(seriesesData.get(interval));
    areaSeries.applyOptions({
      topColor: intervalColors[interval],
      bottomColor: intervalColors[interval] + '77',
      lineColor: intervalColors[interval],
    });
    chartRef.current.timeScale().fitContent();
  };

  useEffect(() => {
    setChartInterval(currentInterval);
  }, [currentInterval]);

  return (
    <div className='bg-[#121826] p-6 rounded-2xl border border-white/10 shadow-xl overflow-hidden'>
      <div ref={chartContainerRef} className='w-full' />
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 mt-6 w-fit mx-auto">
        {['1D', '1W', '1M', '1Y'].map((interval) => (
          <button
            key={interval}
            onClick={() => setCurrentInterval(interval)}
            className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${currentInterval === interval ? 'bg-primary-blue text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}
          >
            {interval}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RangeSwitcherChart;
