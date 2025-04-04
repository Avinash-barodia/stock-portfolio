import React, { useEffect, useState } from 'react'
import homeimg from '../assets/home-1.png'
import { MarketUpdate } from '../components/MarketUpdate'
import { CryptoUpdates } from '../components/CryptoUpdates';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { NewsCard } from '../components/NewsCard';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const token1=useSelector(state=>state.user);
  const token=token1.token;
  const toFetch=['BTCUSDT','ETHUSDT','ADAUSDT','DOGEUSDT']
  const [data,setData]=useState([]);
  const navigate=useNavigate();
  
   const getData=async()=>{
   
    toFetch.forEach(async(symbol)=>{
      const res=await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
    //console.log('res',res.data.symbol);
   
    
    setData((old)=>[...old,res.data]);

    })

   }
   useEffect(()=>{
    getData();
     
   
   },[]);

   data.filter(el =>el.type===Object);
   data.splice(4);
  // console.log('data ',data);

   const [prices,setPrices]=useState([]);
  const dataToUpdate=async(req,res)=>{
       try{
         const res1=await axios.get('https://api.binance.com/api/v3/ticker/price?symbols=[%22BTCUSDT%22,%22ETHUSDT%22]');
         console.log('Response of daily ticker prices',res1);
         const res2=await axios.get('https://api.binance.com/api/v3/ticker/price?symbols=[%22DOGEUSDT%22,%22ADAUSDT%22]');
         let arr=[...res1.data,...res2.data];
         setPrices(arr);
           
       }
       catch(error){
        console.log('Error in the daily price udpate function',error.message);
       }
  }
  useState(()=>{
    dataToUpdate();
  },[])
 



  const updateDates=async(req,res)=>{
    try{
    const res=await axios.post('http://localhost:4900/api/v1/getStocks2');
  //  console.log('res in app.js is as follows',res);
    const today=Date().split(" ")[2];
     console.log('Date in home.js',today);
    const sz=res.data.data[0].update.length;
    const lastUpdate= res.data.data[0].update[sz-1].time[8]+res.data.data[0].update[sz-1].time[9];
    console.log('The date in home.js derived is : ',lastUpdate);

    if(parseInt(lastUpdate)!==parseInt(today)){
      try{
        //console.log('token while updating the daily data is ',token);
     const rest= await axios.post('http://localhost:4900/api/v1/update',{prices:prices},
       
      );
      console.log('a call was made')
    // console.log('the data received while updating is : ',rest);
    }
    catch(err){
      console.log(err.message);
    }
    }
    else{
      console.log('A call was not made')
    }

    }
    catch(error){
      console.log('Error',error.message);

    }
}

useEffect(()=>{
updateDates();
},[]);

 

const [news,setNews]=useState([]);
const fetchNews=async()=>{
   
    try{
     const res=await axios.get('https://newsapi.org/v2/top-headlines?q=crypto&apiKey=8075c84ab48e4466afb3804ee54f0039'); 
     let arr=res.data.articles;
     const res2=await axios.get('https://newsapi.org/v2/top-headlines?q=stock&apiKey=8075c84ab48e4466afb3804ee54f0039'); 
     res2.data.articles.forEach(element => {
        arr.push(element);
        console.log('News',news)
        setNews(arr);
     });
    console.log('News in home ',news);

    }
    catch(error){
        console.log('Error',error);
    }
}
useEffect(()=>{
    fetchNews();
},[])


  return (
    <div className='overflow-hidden relative'>
      {/* section-1 */}

  
      <div className='relative bg-[#18191D] p-8 pb-16'>
       <div className='w-9/12 flex justify-between mx-auto'>
         
         {/* div for the content on left */}
       <div className='flex flex-col text-white gap-y-7 pt-9'>
        <h1 className='font-bold text-5xl'>Daily Update of Your <br /> Portfolio</h1>
        <p>Get expert recommendations regarding leading stocks and crypto
            <br /> currency</p>
        <button className='text-white bg-blue-700 py-2 px-3 rounded-full'>Get Started Now</button>
       </div>

       <div className='w-[28rem]'>
        <img src={homeimg} alt="img" />
       </div>

       </div>
       </div>
       

       
       <div className='w-9/12 mx-auto absolute  left-[12rem] -translate-y-7'>
        <MarketUpdate/>

       </div>











       {/* Section-2 div */}
      <div className='bg-[#141416] '>

        {/* Width Div */}
        <div className='w-9/12 mx-auto pt-[17rem]'>
        
        <h2 className='text-white text-5xl font-bold'>Market Update</h2>
   
       {/* div for the three selection buttons and the input tag */}

        <div className='flex justify-between mt-8'>
           
          <div className='flex gap-x-6'>
               <div className='text-white'>Gainer</div>
               <div className='text-white'>Loser</div>
               <div className='text-white'>Top Sectors</div>
          </div>

          <div>
            <input type="text" className='bg-[#23262F] rounded-full p-1' placeholder='search' />
          </div>
           

        </div>
         
         
         {/* div for table */}
         <div className='mx-auto  pt-4 pb-6 '>
            
         
      <table className='w-full mx-auto '>
        <thead >
          <tr  >
            <th  scope='col' className='text-white pr-[25rem] pt-10'>Symbol</th>
            <td scope='col' className='text-white pr-16 pt-10'>Price</td>
            <td scope='col' className='text-white pr-16 pt-10'>24h</td>
            <td scope='col' className='text-white pr-16 pt-10'>Volume</td>
            <td scope='col' className='text-white pr-16 pt-10'>Change</td>
          </tr>
        </thead>
        <tbody > 
          {
            data.map((curr,index)=>(
              <tr key={index} itemScope='row'  className=" border-t   dark:border-[#23262F]">
                <th scope='col' className={`text-white text-sm pr-[25rem] pt-10 ` }>{curr.symbol}</th>
                <td  className={`text-white pr-16 pt-10 `}>{parseFloat(curr.weightedAvgPrice).toFixed(2)}</td>
                <td  className={` pr-16 pt-10 ${curr.priceChangePercent>0 ?"text-green-400":"text-red-400"} `}>{curr.priceChangePercent}</td>
                <td  className={`text-white pr-16 pt-10  `}>{parseFloat(curr.volume).toFixed(2)}</td>
                <td  className={` pr-16 pt-10 ${curr.priceChange > 0 ?"text-green-400":"text-red-400"} `}>{parseFloat(curr.priceChange).toFixed(2)}</td>
              </tr>
            ))
          }
        </tbody>
          
      </table>

         </div>






        </div>

      </div>

      {/* Section-3 */}
        <div className='bg-[#18191D] pt-12 pb-8'>
           
           <div className='w-9/12 mx-auto pt-4'>
              
           <h2 className='text-3xl text-center text-white font-mono font-bold'>Trending Commodity</h2>
           <p className='text-[#B1B5C3] text-center pt-3'>Take a look at the commodity in news</p>
              
              <div className='flex justify-evenly pt-12'>
                {
                  data.map((curr,index)=>(
                    <CryptoUpdates data={curr} key={index} />

                  ))
                }

              </div>

           </div>


        </div>

        {/* section-4 */}

        <div className='bg-[#141416] pt-[4rem] pb-10 flex flex-col space-y-10'>
          <div className='flex justify-between items-baseline'>
          <h2 className='text-center mx-auto  text-5xl text-white'>Highlights</h2>
          <p className='text-blue-600 pr-[4rem] cursor-pointer transition-all hover:scale-110 duration-200' onClick={()=>navigate('/updates')}>See More &gt;</p>
          </div>
          <div className='w-9/12 mx-auto grid grid-cols-3 gap-7'>
           
          {
            news.map((block,index)=>(
              <NewsCard key={index} data={block}  />
            ))
          }
          
          </div>
         
        </div>


   {/* section-5 */}
        <div className='bg-[#18191D] pt-[6rem] p-6'>

          <div className='w-9/12 mx-auto flex  justify-between'>
            
            {/* Left-side image div */}
            <div className=''>
                <img src="https://wallpapers.com/images/hd/stock-market-monitor-in-sideview-slbivda3m82w17f9.jpg" alt="" width={500} />
            </div>

            {/* Right-Side div for content */}

            <div className='flex flex-col space-y-6 w-[40%]'>
              <h2 className='text-4xl text-white '>Who are We!</h2>
              <p className='text-white text-xl'>At Your Company Name, we combine expert insights with innovative technology to help you succeed in the stock market.</p>
              <p className='text-white text-xl'>Our focus on continuous improvement ensures you receive the most effective investment advice. Join us to achieve financial growth and turn your aspirations into reality.</p>
            </div>





          </div>


        </div>
       
       <Footer/>
   
    </div>
  )
}
