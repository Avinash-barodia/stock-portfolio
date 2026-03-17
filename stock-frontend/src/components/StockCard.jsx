import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cardProfit from '../assets/card-profit.jpg';
import cardLoss from '../assets/card-loss.jpg';
import { useNavigate } from 'react-router-dom';

export const StockCard = ({ data }) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [prev, setPrev] = useState(null);
  const [col, setCol] = useState(1);
  const [volume, setVolume] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/fetch/${data}`);
      setPrice(res.data.price);
      setCol(price >= prev ? 1 : 0);
      setVolume(res.data.volume);
      setPrev(price);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 3000);  

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className='glass-card-premium p-5 flex flex-col gap-y-4 hover:translate-y-[-4px] cursor-pointer group'
      onClick={() => navigate(`/technical/${data}`)}
    >
      <div className='flex justify-between items-start'>
        <div className='flex flex-col gap-y-0.5'>
          <h3 className='text-sm font-bold tracking-tight text-white group-hover:text-primary-blue transition-colors'>{data}</h3>
          <span className='text-[10px] text-text-secondary font-bold uppercase tracking-widest'>NSE (India)</span>
        </div>
        <div className='w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center'>
           <img src={col > 0 ? cardProfit : cardLoss} className='w-full h-full object-cover rounded-xl' alt="" />
        </div>
      </div>

      <div className='flex flex-col gap-y-1'>
        <p className={`text-2xl font-extrabold tracking-tighter ${col ? 'text-profit' : 'text-loss'}`}>
          ₹{parseFloat(price).toFixed(2)}
        </p>
        <div className='flex justify-between items-center'>
          <span className='text-[11px] font-medium text-text-secondary'>Vol: {parseFloat(volume).toFixed(2)}</span>
          <span className='text-[10px] font-bold text-profit bg-profit/10 px-1.5 py-0.5 rounded'>OPEN</span>
        </div>
      </div>
    </div>
  );
};
