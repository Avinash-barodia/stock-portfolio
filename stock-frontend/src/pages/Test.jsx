import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { StockCard } from '../components/StockCard';
import {nifty} from "../assets/nifty500"
export const Test = () => {
    const [data,setData]=useState([]);
    nifty.splice(4);
    
    console.log('Data in text',nifty);

    useEffect(()=>{
      setData(nifty);
    },[])


  return (
    <div className='flex gap-x-10'>
       {
        data.map((name,index)=>(
          <StockCard data={name} key={index}/>
        ))

       }

    </div>
  )
}
