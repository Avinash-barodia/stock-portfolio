import React, { useEffect, useState } from 'react'
import { Ticker } from './Ticker';

export const Slider = () => {
    const arr=['BTCUSDT','ETCUSDT','ADAUSDT','DOGEUSDT'];

    const [names,setNames]=useState([]);
     const set=()=>{
        setNames(arr);
     }
    useEffect(()=>{
     set();
    },[])
  

  return (
    <div className='relative w-full h-16 bg-gradient-to-r from-gray-900 to-blue-900 overflow-hidden'>

        <div className='w-full flex justify-evenly items-center h-full  animate-scroll overflow-hidden'>
            {
            
               names.map((name,index)=>(
                 <Ticker data={name} key={index} />
               ))
            }
        </div>
      
       
        
    </div>
  )
}
