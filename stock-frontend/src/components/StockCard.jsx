import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cardProfit from '../assets/card-profit.jpg';
import cardLoss from '../assets/card-loss.jpg';

export const StockCard = ({ data }) => {
  const [price, setPrice] = useState(0);
  const [prev, setPrev] = useState(null);
  const [col, setCol] = useState(1);
  const [volume, setVolume] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/fetch/${data}`);
      console.log('res from docker',res);
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
    <div className='flex gap-x-4 bg-gradient-to-r from-gray-900 to-blue-900 w-[16rem] rounded'>
      <div className='flex flex-col gap-y-4 p-4'>
        <h1 className='text-white text-2xl font-bold'>{data}</h1>
        <p className={`${col ? 'text-green-500' : 'text-red-600'} font-bold text-xl`}>
          ${parseFloat(price).toFixed(2)}
        </p>
        <p className='text-white'>{parseFloat(volume).toFixed(2)}</p>
      </div>

      <div className='flex flex-col justify-center transition-all duration-1000'>
        <img src={col > 0 ? cardProfit : cardLoss} width={100} className='rounded-md' />
      </div>
    </div>
  );
};
