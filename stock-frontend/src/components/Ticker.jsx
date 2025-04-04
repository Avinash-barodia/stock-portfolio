import React, { useState,useEffect} from 'react'
import axios from 'axios';
export const Ticker = ({data}) => {
    const[price,setPrice]=useState(0);

    const fetchChange=async()=>{
        try{
          //  console.log('reached here');
          const res=await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${data}`)
         // console.log('The res of percentage change is :',res.data.priceChangePercent);
         setPrice(res.data.priceChangePercent)
        }
        catch(error){
           console.log('error',error.message)
        }
    }

    useEffect(()=>{
        fetchChange();
    },[])

  return (
    <div className='flex items-baseline space-x-4 overflow-y-hidden' >

        <div className='text-white text-xl font-mono'>{data}</div>
         <div className='text-green-500'>+{price}%</div>
        
    </div>
  )
}
