import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { AssetCard } from './AssetCard'
import { PieChart } from '@mui/x-charts/PieChart';
import ElementHighlights from '../components/Piechart';
export const Portfolio = () => {
    const user =useSelector((state)=>state.user)
    const token=user.token;


    const [assets,setAssets]=useState([]);
    const [profit,setProfit]=useState(0);
    const [invested,setInvested]=useState(0);
    const [percent,setPercent]=useState(0);
    const [worth,setWorth]=useState(0);
    const [send,setSend]=useState([]);
    
    const fetchAssets=async()=>{
        try{
          //  console.log('token',token)
            const res = await axios.get('http://localhost:4900/api/v1/getStocks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
         // console.log('res',res);
          let temp=[];
          res.data.data.forEach(el=>temp.push(el.data));
         // console.log('temp',temp);
          setAssets(temp);
          
         // console.log('assets',assets);
        }
        catch(error){
            console.log('Error fteching stocks from user',error.message);
        }
    }
    
    const calculatePortfolio=async()=>{
        let inv=0;
        assets.forEach(element => {
            inv+=parseFloat(element.buyingPrice);
        });
        setInvested(inv);
        let rev=0;
        assets.forEach(element=>{
         rev+=parseFloat(element.currentPrice);
        })
        setWorth(rev);
        let perc=0;
        assets.forEach(element=>{
         perc+=parseFloat(((element.currentPrice-element.buyingPrice)/element.buyingPrice)*100);
        })

        perc/=assets.length;
        perc=parseFloat(perc).toFixed(2)
        setPercent(perc);
        let pro=0;
        assets.forEach(element=>{
            pro+=parseFloat(element.currentPrice-element.buyingPrice);
        })
        setProfit(pro);
        let temp=[];
        assets.forEach(element=>{
            console.log('q:',element.quantity);
          temp.push({value:element.quantity});
        })
        setSend(temp);
        //console.log('send data',send);

    }

    useEffect(() => {
        fetchAssets();
      }, []); 
    
      useEffect(() => {
        calculatePortfolio();
      }, [assets]);

  return (
    <div className='bg-black w-full'>
   {/* Section-1 */}
        <div className='flex justify-evenly items-center'>
            

            {/* leftDiv */}
            <div className='flex flex-col gap-12 '>

                <div className='flex justify-center gap-7'>
                   <div className='flex flex-col'>
                     
                     <p className='text-blue-600 font-bold text-3xl'>Net Investment</p>
                     <p className='text-blue-600 font-bold text-3xl' >$  {invested}</p>
                    
                    </div>

                    <div className='flex flex-col'>
                     
                     <p className='text-blue-600 font-bold text-3xl'>Current Worth</p>
                     <p className='text-blue-600 font-bold text-3xl'>$  {worth}</p>
                    
                    </div>
                </div>



                <div className='flex justify-center gap-7'>
                   <div className='flex flex-col '>
                     
                     <p className='text-blue-600 font-bold text-3xl pr-16'>Percent Growth</p>
                     <p className='text-blue-600 font-bold text-3xl'> {percent} %</p>
                    
                    </div>

                    <div className='flex flex-col -translate-x-16'>
                     
                     <p className='text-blue-600 font-bold text-3xl'>Net Gains</p>
                     <p className='text-blue-600 font-bold text-3xl'>$  {profit}</p>
                    
                    </div>
                </div>

                


            </div>



            {/* rightDiv */}
            <div>
            <ElementHighlights data={send}/>
            </div>



        </div>

        {/* Cards section */}
        
        <div className='grid grid-cols-3 mx-auto w-9/12 pl-16 pb-4 gap-y-4 '>
            {
            
            assets.map((symbol,index)=>(
                <AssetCard data={symbol}  />
            ))
            }
        </div>
        
    </div>
  )
}
