import React from 'react'
import { FaPlusCircle } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import api from '../utils/api';
import { useSelector } from 'react-redux';
export const CryptoUpdates = ({data}) => {
  const user=useSelector(state=>state.user);
  const token=user.token;
  const handleBuy=async()=>{
    const target={
      name:data.symbol,
      buyingPrice:1000,
      currentPrice:5200,
      quantity:100,
      token: token
   }
       try{
        console.log('token',token)
        const res = await api.post('/buy', target, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       }
       catch(error){
        console.log('error',error.message)
       }
  }
  return (
    <div className='bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-y-4 w-[18rem] group hover:scale-[1.03] transition-all duration-300'>
        {/* Name and add symbol */}
        <div className='flex justify-between items-center'>
             <div className='text-white font-bold tracking-tight'>{data.symbol}</div>
             <div className='cursor-pointer text-text-secondary hover:text-primary-blue transition-colors'>
               <FaPlusCircle onClick={handleBuy} size={20} />
             </div>
        </div>

        <div className='flex justify-between items-center'>
           <div className='text-white text-xl font-extrabold flex items-center gap-x-3'>
             ${parseFloat(data.weightedAvgPrice).toFixed(2)} 
             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${data.priceChangePercent > 0 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"}`}>
               {data.priceChangePercent > 0 ? '+' : ''}{data.priceChangePercent}%
             </span>
           </div>
        </div>

        <div className='flex flex-col gap-y-2 mt-2'>
          <div className='flex justify-between items-center'>
            <p className='text-[10px] font-bold text-text-secondary uppercase tracking-widest'>vs. High Price</p>
            <p className='text-[10px] font-bold text-white'>{parseFloat(100 - ((data.highPrice - data.weightedAvgPrice) / data.highPrice)).toFixed(2)}%</p>
          </div>
          <ProgressBar 
            completed={(100 - ((data.highPrice - data.weightedAvgPrice) / data.highPrice))} 
            maxCompleted={100} 
            height='4px' 
            isLabelVisible={false} 
            bgColor='#22C55E' 
            baseBgColor='rgba(255,255,255,0.05)'
          />
        </div>
    </div>
  )
}
