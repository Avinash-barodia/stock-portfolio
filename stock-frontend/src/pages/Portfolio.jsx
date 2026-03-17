import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import { AssetCard } from './AssetCard';
import { PieChart } from '@mui/x-charts/PieChart';
import ElementHighlights from '../components/Piechart';

export const Portfolio = () => {
    const user = useSelector((state) => state.user);
    const token = user.token;

    const [assets, setAssets] = useState([]);
    const [profit, setProfit] = useState(0);
    const [invested, setInvested] = useState(0);
    const [percent, setPercent] = useState(0);
    const [worth, setWorth] = useState(0);
    const [send, setSend] = useState([]);
    
    const fetchAssets = async () => {
        try {
            const res = await api.get('/getStocks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let temp = [];
            res.data.data.forEach(el => temp.push(el.data));
            setAssets(temp);
        } catch (error) {
            console.log('Error fetching stocks from user', error.message);
        }
    }
    
    const calculatePortfolio = async () => {
        let inv = 0;
        assets.forEach(element => {
            inv += parseFloat(element.buyingPrice);
        });
        setInvested(inv);
        let rev = 0;
        assets.forEach(element => {
            rev += parseFloat(element.currentPrice);
        })
        setWorth(rev);
        let perc = 0;
        assets.forEach(element => {
            perc += parseFloat(((element.currentPrice - element.buyingPrice) / element.buyingPrice) * 100);
        })

        if (assets.length > 0) {
            perc /= assets.length;
            perc = parseFloat(perc).toFixed(2);
            setPercent(perc);
        }
        
        let pro = 0;
        assets.forEach(element => {
            pro += parseFloat(element.currentPrice - element.buyingPrice);
        })
        setProfit(pro);
        let temp = [];
        assets.forEach(element => {
            temp.push({ value: element.quantity });
        })
        setSend(temp);
    }

    useEffect(() => {
        if (token) {
            fetchAssets();
        }
    }, [token]); 
    
    useEffect(() => {
        calculatePortfolio();
    }, [assets]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B0F19] to-[#111827] text-text-primary w-full p-6'>
        <div className="max-w-7xl mx-auto flex flex-col gap-y-6">
            <div className='flex flex-col md:flex-row gap-6 items-stretch'>
                {/* Metrics Grid */}
                <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='surface-premium p-6 flex flex-col gap-y-2 group hover:scale-[1.02] transition-all'>
                        <p className='text-text-secondary font-bold text-xs uppercase tracking-wider'>Net Investment</p>
                        <p className='text-white font-black text-3xl'>₹{invested.toLocaleString()}</p>
                    </div>

                    <div className='surface-premium p-6 flex flex-col gap-y-2 group hover:scale-[1.02] transition-all'>
                        <p className='text-text-secondary font-bold text-xs uppercase tracking-wider'>Current Worth</p>
                        <p className='text-white font-black text-3xl'>₹{worth.toLocaleString()}</p>
                    </div>

                    <div className='surface-premium p-6 flex flex-col gap-y-2 group hover:scale-[1.02] transition-all'>
                        <p className='text-text-secondary font-bold text-xs uppercase tracking-wider'>Growth</p>
                        <p className={`font-black text-3xl ${parseFloat(percent) >= 0 ? 'text-profit' : 'text-loss'}`}>{percent}%</p>
                    </div>

                    <div className='surface-premium p-6 flex flex-col gap-y-2 group hover:scale-[1.02] transition-all'>
                        <p className='text-text-secondary font-bold text-xs uppercase tracking-wider'>Net Gains</p>
                        <p className={`font-black text-3xl ${parseFloat(profit) >= 0 ? 'text-profit' : 'text-loss'}`}>₹{profit.toLocaleString()}</p>
                    </div>
                </div>

                {/* Chart Section */}
                <div className='surface-premium p-6 flex items-center justify-center min-w-[300px]'>
                    <ElementHighlights data={send}/>
                </div>
            </div>

            {/* Assets Header */}
            <div className="flex items-center justify-between px-1 mt-4">
                <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Your Assets</h2>
                <div className="flex items-center gap-x-2">
                    <span className="w-2 h-2 bg-profit rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-text-secondary uppercase">Live Portfolio</span>
                </div>
            </div>

            {/* Cards section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {assets.map((symbol, index) => (
                    <AssetCard key={index} data={symbol} />
                ))}
            </div>
        </div>
    </div>
  )
}
