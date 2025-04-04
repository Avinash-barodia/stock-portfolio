import React, { useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { bitcoin } from "../assets/historical";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Technical = () => {
    const [chartInstance, setChartInstance] = useState(null);
    const [candlestickSeries, setCandlestickSeries] = useState(null);
    const [price, setPrice] = useState(0);
    const { name } = useParams();
    const upperName = name.toUpperCase();

    const fetchHistory = async () => {
        const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${upperName}&interval=3m&limit=150`);
        
        let formattedData = [];
        data.forEach(coin => {
            formattedData.push({
                time: coin[0] / 1000,
                open: parseFloat(coin[1]),
                high: parseFloat(coin[2]),
                low: parseFloat(coin[3]),
                close: parseFloat(coin[4]),
            });
        });
        return formattedData;
    };
     
    useEffect(() => {
        const initializeChart = async () => {
            const historicalData = await fetchHistory();
            const container = document.getElementById('container');
            container.innerHTML = '';

            const chartOptions = {
                layout: {
                    textColor: 'black',
                    background: { type: 'solid', color: 'transparent' } // Set background to transparent
                },
                timeScale: {
                    barSpacing: 15,
                    rightOffset: 5,
                    visibleTimeRange: { from: bitcoin[bitcoin.length - 30].time, to: bitcoin[bitcoin.length - 1].time }
                }
            };

            const newChart = createChart(container, chartOptions);
            const newCandlestickSeries = newChart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: false,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                priceLineWidth: 2,
                borderWidth: 2,
                barWidth: 0.9,
                barSpacing: 7
            });

            newCandlestickSeries.setData(historicalData);
            newChart.timeScale().fitContent();

            setChartInstance(newChart);
            setCandlestickSeries(newCandlestickSeries);
        };

        initializeChart();

        // Cleanup function to remove the chart instance on component unmount
        return () => {
            if (chartInstance) {
                chartInstance.remove();
                setChartInstance(null); // Clear reference to the disposed chart instance
                setCandlestickSeries(null); // Clear reference to the candlestick series
            }
        };
    }, []);  // Only run once on mount

    const display = (data) => {
        if (candlestickSeries) {
            candlestickSeries.update(data);
            chartInstance.timeScale().fitContent();
        }
    };

    const fetchData = async () => {
        console.log('name:', name);
        const candleData = new WebSocket(`wss://stream.binance.com/ws/${name}@kline_3m`);
        candleData.onmessage = (data1) => {
            const data2 = JSON.parse(data1.data);
            const data3 = data2.k;
            const { t, o, c, l, h } = data3;
            setPrice(c);
            display({
                open: parseFloat(o),
                high: parseFloat(h),
                low: parseFloat(l),
                close: parseFloat(c),
                time: parseInt(t / 1000),
            });
        };
    };

    useEffect(() => {
        if (candlestickSeries) {
            fetchData();
        }
    }, [candlestickSeries]);

    return (
        <div className='pt-8 flex flex-col w-full h-full justify-center bg-gradient-to-r from-gray-900 to-blue-900'>
            <div className='w-9 ml-[2rem] flex gap-x-4'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png" alt="Bitcoin" />
                <h1 className='text-4xl font-bold text-white'>
                    {name}
                </h1>
                <div className='text-3xl font-bold text-white'>
                    {"$" + parseFloat(price).toFixed(2)}
                </div>
            </div>
            <div id='container' className='w-[80%] h-[36rem] mx-auto mr-[18%] bg-gradient-to-r from-gray-900 to-blue-900 rounded-lg'></div>
        </div>
    );
};
