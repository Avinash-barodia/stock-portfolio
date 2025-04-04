import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const RangeSwitcherChart = ({data}) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const[dySeries,setDySeries]=useState([]);
  const areaSeriesRef = useRef(null);

  const intervalColors = {
    '1D': '#2962FF',
    '1W': 'rgb(225, 87, 90)',
    '1M': 'rgb(242, 142, 44)',
    '1Y': 'rgb(164, 89, 209)',
  };

  const seriesesData = new Map([
    ['1D',dySeries],
    ['1W', [{ time: '2022-01-01', value: 50 }, { time: '2022-01-07', value: 70 }]],
    ['1M', [{ time: '2022-01-01', value: 50 }, { time: '2022-01-31', value: 60 }]],
    ['1Y', [{ time: '2022-01-01', value: 50 }, { time: '2022-12-31', value: 80 }]],
  ]);

  const [currentInterval, setCurrentInterval] = useState('1D');


  const getDailyData=async()=>{
      const res=await axios.post('http://localhost:4900/api/v1/daily',{name:data});
     //console.log('resdata',res.data.data);
      setDySeries(res.data.data);
  }
  useEffect(()=>{
     getDailyData();
     

  },[])

  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'black' },
      },
      grid: {
        vertLines: {
          visible: false,  // Make vertical grid lines invisible
        },
        horzLines: {
          visible: false,  // Make horizontal grid lines invisible
        },
      },
      height: 600,
    };
    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const areaSeries = chart.addAreaSeries({
      topColor: intervalColors['1D'],
      bottomColor: intervalColors['1D'] + '77', // Adding transparency
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
      bottomColor: intervalColors[interval] + '77', // Adding transparency
      lineColor: intervalColors[interval],
    });
    chartRef.current.timeScale().fitContent();
  };

  useEffect(() => {
    setChartInterval(currentInterval);
  }, [currentInterval]);

  return (
    <div className='bg-black p-10'>
      <div ref={chartContainerRef} />
      <div className="flex space-x-2 mt-4">
        {['1D', '1W', '1M', '1Y'].map((interval) => (
          <button
            key={interval}
            onClick={() => setCurrentInterval(interval)}
            className="px-6 py-2 font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300"
          >
            {interval}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RangeSwitcherChart;
