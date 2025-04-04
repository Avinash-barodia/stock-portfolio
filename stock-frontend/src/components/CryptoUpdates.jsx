import React from 'react'
import { FaPlusCircle } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from 'axios';
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
        const res = await axios.post('http://localhost:4900/api/v1/buy', target, {
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
    <div className='relative bg-gradient-to-r from-gray-900 to-blue-900 p-6 flex flex-col gap-y-2 w-[16rem]'>
        {/* Name and add symbol */}
        <div className='flex justify-between'>
             <div className='text-white'>{data.symbol}</div>
             <div><FaPlusCircle onClick={handleBuy} /></div>
        </div>

        <div className='flex justify-between'>
           <div className='text-white flex gap-x-8'>{parseFloat(data.weightedAvgPrice).toFixed(2)} <span className={`${data.priceChangePercent>0?"bg-green-700 text-green-500":"bg-red-600 text-white"}  p-1 rounded-full opacity-70 `}>{data.priceChangePercent}</span></div>
        </div>

        <p className='text-white'>vs. High Price</p>

        <div >

          <div className='flex justify-between '> 
            <p className='text-white'>{parseFloat(100-((data.highPrice-data.weightedAvgPrice)/data.highPrice)).toFixed(2)}%</p>
            <p className='text-white'>100%</p>
          </div>
           <ProgressBar completed={(100-((data.highPrice-data.weightedAvgPrice)/data.highPrice))} maxCompleted={100} height='1px' isLabelVisible={false} 
          bgColor='#0BFF96' 
           />

           </div>



        



    </div>
  )
}
