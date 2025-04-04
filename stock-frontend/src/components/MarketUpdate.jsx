import React, { useEffect, useState } from 'react'
import { Card } from './Card';
// import  WebSocket  from 'ws';
import { StockCard } from '../components/StockCard';
import {nifty} from "../assets/nifty500"
export const MarketUpdate = () => {  
     
   const [toFetch,setToFetch]=useState([]);
   const[active,setActive]=useState(1);
   useEffect(()=>{
    toFetch.push('btcusdt');
    toFetch.push('ethusdt');
    toFetch.push('dogeusdt');
    toFetch.push('adausdt');
   },[]);
  toFetch.splice(4);


  const [data,setData]=useState([]);
  nifty.splice(4);
  
  console.log('Data in text',nifty);

  useEffect(()=>{
    setData(nifty);
  },[])



  return (
    <div className='bg-slate-800  w-full mx-auto p-4 rounded-md'>
       
       <div className='flex gap-x-5 mx-auto w-[90%]'>
        <p className={`text-white cursor-pointer ${active===0?"underline decoration-blue-500 decoration-2":""}` } onClick={()=>setActive(0)} >Crypto</p>
        <p  className={`text-white cursor-pointer ${active===1?"underline decoration-blue-500 decoration-2":""}`} onClick={()=>setActive(1)} >Stocks</p>
        
       </div>
       <hr className='opacity-20'/>

       <div className='flex w-full justify-evenly pt-8'>

         {
         active===0 ?
         toFetch.map((symbol,index)=>(
          <Card data={symbol} key={index}/>
         )):
         data.map((name,index)=>(
          <StockCard data={name} key={index}/>
        ))
         }


       </div>

    </div>
  )
}
