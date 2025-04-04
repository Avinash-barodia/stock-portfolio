import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NewsCard } from '../components/NewsCard';
import { useNavigate } from 'react-router-dom';
export const Updates = () => {
    const [news,setNews]=useState([]);
    const navigate=useNavigate();
    let arr=[];
    const fetchNews=async()=>{
      
        try{
           
         const res1=await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8075c84ab48e4466afb3804ee54f0039');
        
         
         const res2=await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=8075c84ab48e4466afb3804ee54f0039');

         const res3=await axios.get('https://newsapi.org/v2/everything?q=crypto&apiKey=8075c84ab48e4466afb3804ee54f0039');

         const res4=await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8075c84ab48e4466afb3804ee54f0039');

         const res5=await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=stock&apiKey=8075c84ab48e4466afb3804ee54f0039');

         const res6=await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=8075c84ab48e4466afb3804ee54f0039');


          
         const all=[...res1.data.articles,...res2.data.articles,...res3.data.articles,...res4.data.articles,...res5.data.articles,...res6.data.articles];
         console.log('news',all);
         const properNews = all.filter(
            (article) => article.urlToImage !== null
          );
          setNews(properNews);
    
        }
        catch(error){
            console.log('Error in Updates',error);
        }
    }
    useEffect(()=>{
        fetchNews();
       
    },[]);
  return (

    <div className='relative flex flex-col bg-black '>
        <div className='w-10/12 mx-auto'>
       
        <h1 className='text-center text-4xl text-white font-mono'>Top Breaking </h1>
        <p className='text-[#B1B5C3] text-center'>Take a look at the happenings around the world</p>

        <div className='grid grid-cols-3 p-5 gap-10 '>

           {
            news.map((data,index)=>(
            
                <NewsCard data={data} key={index} onClick={()=>window.open(data.url,'_blank')}/>
            ))
           }




        </div>



        </div>
    </div>
  )
}
