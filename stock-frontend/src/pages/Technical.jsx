import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api';
import { calculateSMA, calculateRSI } from '../utils/indicators';
import { nifty } from '../assets/nifty500';

export const Technical = () => {
    const { name } = useParams();
    const cleanSymbol = name.toUpperCase().replace('.NS', '');
    const upperName = cleanSymbol; // Use clean symbol as the primary name
    const isStock = nifty.includes(cleanSymbol);
    
    // UI State
    const [price, setPrice] = useState(0);
    const [change, setChange] = useState(0);
    const [activeRange, setActiveRange] = useState('1d');
    const [interval, setIntervalParam] = useState('1m'); 
    const [showSMA, setShowSMA] = useState(false);
    const [showRSI, setShowRSI] = useState(false);

    // Refs
    const chartContainerRef = useRef(null);
    const rsiContainerRef = useRef(null);
    const chartRef = useRef(null);
    const rsiChartRef = useRef(null);
    const seriesRef = useRef(null);
    const smaSeriesRef = useRef(null);
    const rsiSeriesRef = useRef(null);
    const wsRef = useRef(null);
    const pollRef = useRef(null);
    const toolTipRef = useRef(null);

    // Fetch Historical Data
    const fetchHistory = async (intv, rng) => {
        try {
            let formattedData = [];
            if (isStock) {
                // Fetch from our backend proxy with range
                const response = await api.get(`/history/${upperName}?interval=${intv}&range=${rng}`);
                formattedData = response.data.data;
            } else {
                // Fetch from Binance for Crypto
                const binanceSymbol = upperName.endsWith('USDT') ? upperName : `${upperName}USDT`;
                const limitMap = { '1d': 1440, '1w': 1000, '1m': 1000, '1y': 500, 'max': 1000 };
                const limit = limitMap[rng] || 500;
                
                const { data } = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${intv}&limit=${limit}`);
                formattedData = data.map(coin => ({
                    time: coin[0] / 1000,
                    open: parseFloat(coin[1]),
                    high: parseFloat(coin[2]),
                    low: parseFloat(coin[3]),
                    close: parseFloat(coin[4]),
                }));
            }
            return formattedData;
        } catch (err) {
            console.error('Error fetching history:', err);
            return [];
        }
    };

    useEffect(() => {
        let isCancelled = false;

        const initializeCharts = async () => {
            const historicalData = await fetchHistory(interval, activeRange);
            if (isCancelled || !chartContainerRef.current) return;

            if (historicalData.length > 1) {
               setPrice(historicalData[historicalData.length - 1].close);
               const firstClose = historicalData[0].close;
               const lastClose = historicalData[historicalData.length - 1].close;
               setChange(((lastClose - firstClose) / firstClose * 100).toFixed(2));
            }

            // --- MAIN CHART ---
            const chartOptions = {
                layout: { textColor: '#9CA3AF', background: { type: 'solid', color: 'transparent' }, fontFamily: 'Inter' },
                grid: {
                    vertLines: { color: 'rgba(42, 52, 71, 0.5)' },
                    horzLines: { color: 'rgba(42, 52, 71, 0.5)' }
                },
                crosshair: { mode: CrosshairMode.Magnet },
                rightPriceScale: { borderColor: '#2A3447', borderVisible: false },
                timeScale: { borderColor: '#2A3447', timeVisible: true, borderVisible: false }
            };

            const chart = createChart(chartContainerRef.current, chartOptions);
            chartRef.current = chart;

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#22C55E', 
                downColor: '#EF4444',
                borderVisible: false,
                wickUpColor: '#22C55E', 
                wickDownColor: '#EF4444'
            });
            seriesRef.current = candlestickSeries;

            candlestickSeries.setData(historicalData);
            chart.timeScale().fitContent();

            // Tooltip logic
            chart.subscribeCrosshairMove(param => {
                if (!toolTipRef.current || isCancelled) return;
                if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > chartContainerRef.current.clientWidth || param.point.y < 0 || param.point.y > chartContainerRef.current.clientHeight) {
                    toolTipRef.current.style.display = 'none';
                } else {
                    const data = param.seriesData.get(candlestickSeries);
                    if (data) {
                        const dateStr = new Date(param.time * 1000).toLocaleString(undefined, { 
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        });
                        toolTipRef.current.style.display = 'block';
                        toolTipRef.current.innerHTML = `
                            <div style="font-size: 14px; font-weight: 800; color: #F9FAFB; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; display: flex; justify-between; align-center;">
                                <span>${upperName}</span>
                                <span style="font-size: 10px; color: #9CA3AF; margin-left: auto;">${dateStr}</span>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-family: 'Inter';">
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 9px; color: #9CA3AF; text-transform: uppercase; font-weight: 700;">Open</span>
                                    <span style="font-size: 13px; color: #F9FAFB; font-weight: 600;">${data.open.toFixed(2)}</span>
                                </div>
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 9px; color: #9CA3AF; text-transform: uppercase; font-weight: 700;">High</span>
                                    <span style="font-size: 13px; color: #22C55E; font-weight: 600;">${data.high.toFixed(2)}</span>
                                </div>
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 9px; color: #9CA3AF; text-transform: uppercase; font-weight: 700;">Low</span>
                                    <span style="font-size: 13px; color: #EF4444; font-weight: 600;">${data.low.toFixed(2)}</span>
                                </div>
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 9px; color: #9CA3AF; text-transform: uppercase; font-weight: 700;">Close</span>
                                    <span style="font-size: 13px; color: #F9FAFB; font-weight: 600;">${data.close.toFixed(2)}</span>
                                </div>
                            </div>
                            <div style="margin-top: 10px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 9px; color: #9CA3AF; text-transform: uppercase; font-weight: 700;">Volume</span>
                                <span style="font-size: 12px; color: #3B82F6; font-weight: 700;">${(data.value || 0).toLocaleString()}</span>
                            </div>
                        `;
                    }
                }
            });

            // SMA Overlay
            if (showSMA) {
                const smaData = calculateSMA(historicalData, 20);
                const smaSeries = chart.addLineSeries({ color: '#3B82F6', lineWidth: 2, crosshairMarkerVisible: false });
                smaSeries.setData(smaData);
                smaSeriesRef.current = smaSeries;
            }

            // --- RSI CHART ---
            if (showRSI && rsiContainerRef.current) {
                const rsiOptions = {
                    layout: { textColor: '#9CA3AF', background: { type: 'solid', color: 'transparent' } },
                    grid: { vertLines: { visible: false }, horzLines: { color: '#2A3447' } },
                    rightPriceScale: { borderColor: '#2A3447', autoScale: false, minValue: 0, maxValue: 100 },
                    timeScale: { visible: false } // Hide timescale to sync visually
                };
                
                const rsiChart = createChart(rsiContainerRef.current, rsiOptions);
                rsiChartRef.current = rsiChart;

                const rsiSeries = rsiChart.addLineSeries({ color: '#ba68c8', lineWidth: 1.5 });
                rsiSeriesRef.current = rsiSeries;
                
                // Add Overbought/Oversold lines
                rsiSeries.createPriceLine({ price: 70, color: '#ef5350', lineWidth: 1, lineStyle: 2, title: 'OB' });
                rsiSeries.createPriceLine({ price: 30, color: '#26a69a', lineWidth: 1, lineStyle: 2, title: 'OS' });

                const rsiData = calculateRSI(historicalData, 14);
                rsiSeries.setData(rsiData);
                rsiChart.timeScale().fitContent();

                // Sync timescales
                chart.timeScale().subscribeVisibleTimeRangeChange(range => {
                    if (rsiChartRef.current) {
                        rsiChart.timeScale().setVisibleRange(range);
                    }
                });
            }

            // --- LIVE UPDATES ---
            if (isStock) {
                // Polling for Stocks
                pollRef.current = setInterval(async () => {
                    try {
                        const res = await api.get(`/fetch/${upperName}`);
                        if (seriesRef.current && !isCancelled) {
                            const newPrice = parseFloat(res.data.price);
                            setPrice(newPrice);
                            // We don't have the full candle info from the scraper, 
                            // but we can update the last candle's close value for smoothness.
                            // In a real app, you'd fetch the latest 1m candle.
                            const lastTime = historicalData[historicalData.length - 1].time;
                            seriesRef.current.update({
                                time: lastTime,
                                open: historicalData[historicalData.length - 1].open,
                                high: Math.max(historicalData[historicalData.length - 1].high, newPrice),
                                low: Math.min(historicalData[historicalData.length - 1].low, newPrice),
                                close: newPrice
                            });
                        }
                    } catch (e) { console.error('Stock poll error', e); }
                }, 5000);
            } else {
                // WebSocket for Crypto
                const ws = new WebSocket(`wss://stream.binance.com/ws/${name.toLowerCase()}@kline_${interval}`);
                ws.onmessage = (event) => {
                    if (isCancelled) return;
                    const message = JSON.parse(event.data);
                    const candle = message.k;
                    const newCandle = {
                        time: parseInt(candle.t / 1000),
                        open: parseFloat(candle.o),
                        high: parseFloat(candle.h),
                        low: parseFloat(candle.l),
                        close: parseFloat(candle.c),
                    };
                    setPrice(newCandle.close);
                    if (seriesRef.current) {
                        seriesRef.current.update(newCandle);
                    }
                };
                wsRef.current = ws;
            }
        };

        initializeCharts();

        return () => {
            isCancelled = true;
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
            if (rsiChartRef.current) {
                rsiChartRef.current.remove();
                rsiChartRef.current = null;
            }
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
            if (pollRef.current) {
                clearInterval(pollRef.current);
                pollRef.current = null;
            }
        };
    }, [name, interval, activeRange, showSMA, showRSI]);

    const handleTimeframeChange = (range) => {
        setActiveRange(range);
        // Set appropriate intervals for each range
        if (range === '1d') setIntervalParam(isStock ? '1m' : '15m');
        else if (range === '1w') setIntervalParam('15m');
        else if (range === '1m') setIntervalParam('1h');
        else if (range === '1y') setIntervalParam('1d');
        else if (range === 'max') setIntervalParam(isStock ? '1w' : '1mo');
    };

    return (
        <div className='min-h-screen bg-background flex flex-col items-center pt-8 pb-12 w-full text-text-primary'>
            
            {/* Header & Controls */}
            <div className='w-full max-w-6xl px-6 mb-8 flex justify-between items-end'>
                <div className='flex items-center gap-x-6'>
                    <div className='w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center text-primary-blue font-bold text-2xl shadow-xl'>
                       {isStock ? upperName[0] : ''}
                       {!isStock && <img className='w-12 h-12 rounded-full' src={`https://assets.coincap.io/assets/icons/${name.replace("usdt","").toLowerCase()}@2x.png`} onError={(e) => {e.target.style.display='none'}} alt="" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className='text-3xl font-bold tracking-tight'>
                                {upperName} {isStock ? <span className="text-sm font-medium text-text-secondary align-middle ml-1">(NSE)</span> : ''}
                            </h1>
                            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${change >= 0 ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>
                                {change >= 0 ? '+' : ''}{change}%
                            </span>
                        </div>
                        <div className='text-3xl font-bold tracking-tighter'>
                            {isStock ? '₹' : '$'}{price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:isStock ? 2 : 4})}
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className='flex items-center gap-x-4'>
                    
                    {/* Timeframes */}
                    <div className='flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner'>
                        {[
                            { label: '1D', range: '1d' },
                            { label: '1W', range: '1w' },
                            { label: '1M', range: '1m' },
                            { label: '1Y', range: '1y' },
                            { label: 'MAX', range: 'max' }
                        ].map(tf => (
                            <button
                                key={tf.range}
                                onClick={() => handleTimeframeChange(tf.range)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeRange === tf.range ? 'bg-primary-blue text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>

                    {/* Indicators */}
                    <div className='flex bg-secondary p-1 rounded-xl border border-border shadow-inner'>
                        <button
                            onClick={() => setShowSMA(!showSMA)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${showSMA ? 'bg-[#ffb74d]/20 text-[#ffb74d]' : 'text-text-secondary hover:text-white'}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${showSMA ? 'bg-[#ffb74d]' : 'bg-transparent border border-text-secondary'}`}></span>
                            SMA
                        </button>
                        <button
                            onClick={() => setShowRSI(!showRSI)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${showRSI ? 'bg-[#ba68c8]/20 text-[#ba68c8]' : 'text-text-secondary hover:text-white'}`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${showRSI ? 'bg-[#ba68c8]' : 'bg-transparent border border-text-secondary'}`}></span>
                            RSI
                        </button>
                    </div>

                </div>
            </div>

            {/* Charts Container */}
            <div className='w-full max-w-6xl px-6 flex flex-col gap-6 relative'>
                
                {/* Custom Tooltip */}
                <div 
                    ref={toolTipRef} 
                    className='absolute top-4 left-10 z-[10] bg-secondary/90 backdrop-blur-xl border border-border p-4 rounded-xl shadow-2xl pointer-events-none min-w-[200px]'
                    style={{ display: 'none' }}
                ></div>

                {/* Main Candlestick Chart */}
                <div 
                    ref={chartContainerRef} 
                    className='w-full h-[550px] glass-card-premium rounded-2xl overflow-hidden shadow-2xl relative'
                ></div>

                {/* RSI Sub-chart */}
                {showRSI && (
                    <div 
                        ref={rsiContainerRef} 
                        className='w-full h-[180px] bg-secondary border border-border rounded-2xl overflow-hidden shadow-xl'
                    ></div>
                )}
            </div>
            
        </div>
    );
};

