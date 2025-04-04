import React, { useEffect ,useState} from 'react'
import cardProfit from '../assets/card-profit.jpg'
import cardLoss from "../assets/card-loss.jpg"
import { useNavigate } from 'react-router-dom'
export const Card = ({data}) => {
    
  const navigate=useNavigate();
  
   const[price,setPrice]=useState(0);
   const[quantity,setQuantity]=useState(0);
   const[color,setColor]=useState(0);
   //console.log('first from card',data)
    const getData=()=>{
        try{
           const binance=new WebSocket(`wss://stream.binance.com:9443/ws/${data}@trade`);
            binance.onmessage=(event)=>{
            let obj=JSON.parse(event.data);
         //  console.log('from card',obj.p);
         price<=obj.p ?(setColor(1)):(setColor(0));
           setPrice(obj.p);
           setQuantity(obj.q);
        } 
}
catch(error){
  // console.log(error);
}
   
   
}

useEffect(()=>{
  getData();
},[])

  return ( 
    <div className='flex gap-x-4 bg-gradient-to-r from-gray-900 to-blue-900  w-[16rem] rounded cursor-pointer' onClick={()=>navigate(`/technical/${data}`)} >
       <div className='flex flex-col gap-y-4 p-4'>
       <p className='text-white text-2xl font-bold'>{data}</p>
        <p className={`${color?"text-green-500":"text-red-600"} font-bold text-xl `} >$ {parseFloat(price).toFixed(2)}</p>
        <p className='text-white'>{parseFloat(quantity).toFixed(2)}</p>
       </div>

       <div className='flex flex-col justify-center transition-all duration-1000'>
        <img src={ color>0 ?cardProfit:cardLoss} width={100} className='rounded-md' />
       </div>
        
    </div>
  )
}
