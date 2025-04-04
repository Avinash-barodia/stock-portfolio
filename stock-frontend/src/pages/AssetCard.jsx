import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AssetCard = ({data}) => {
  const navigate=useNavigate();
    // useEffect(()=>{
    //   console.log('first',data);
    // },[])
  return (
    <div onClick={()=>navigate  ('test')} className="flex flex-col w-48 h-48 space-y-4 p-6 rounded-md bg-gradient-to-r from-gray-900 to-blue-900 hover:scale-110 transition-all duration-200">
       
       <div className='text-blue-600 font-mono font-bold text-3xl'>{data.name}</div>

       <div  className='text-blue-600 font-mono font-bold text-3xl'>{data.currentPrice}</div>

       <div  className='text-blue-600 font-mono font-bold text-xl'>{((data.currentPrice-data.buyingPrice)/data.buyingPrice)*100}</div>

    </div>

  )
}
