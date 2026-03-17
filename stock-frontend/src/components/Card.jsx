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
    <div className='glass-card-premium p-5 flex flex-col gap-y-4 hover:translate-y-[-4px] cursor-pointer group' onClick={() => navigate(`/technical/${data}`)}>
       <div className='flex justify-between items-start'>
         <div className='flex flex-col gap-y-0.5'>
           <h3 className='text-sm font-bold tracking-tight text-white group-hover:text-primary-blue transition-colors'>{data.replace("USDT","")}</h3>
           <span className='text-[10px] text-text-secondary font-bold uppercase tracking-widest'>Crypto</span>
         </div>
         <div className='w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center'>
            <img src={color > 0 ? cardProfit : cardLoss} className='w-full h-full object-cover rounded-xl' alt="" />
         </div>
       </div>

       <div className='flex flex-col gap-y-1'>
         <p className={`text-2xl font-extrabold tracking-tighter ${color ? 'text-profit' : 'text-loss'}`}>
           ${parseFloat(price).toFixed(2)}
         </p>
         <div className='flex justify-between items-center'>
           <span className='text-[11px] font-medium text-text-secondary'>Vol: {parseFloat(quantity).toFixed(2)}</span>
           <span className='text-[10px] font-bold text-primary-blue bg-primary-blue/10 px-1.5 py-0.5 rounded'>LIVE</span>
         </div>
       </div>
    </div>
  )
}
