import React, { useEffect ,useState } from 'react'
import { FaTheRedYeti } from 'react-icons/fa'
import axios from 'axios';
export const NewsCard = ({data}) => {
  
  return (
    <div className='p-4 flex flex-col justify-evenly space-y-7  bg-gradient-to-r from-gray-900 to-blue-900 hover:scale-110 transition-all duration-200 rounded-md  ' onClick={()=>window.open(data.url,'_blank')}>
        <div className='w-8rem'><img src={data.urlToImage} alt="" /></div>
        <div className='text-white text-2xl font-bold '>{data.title}</div>
        <p className='text-white pl-[9rem]'>- {data.author}</p>
    </div>
  )
}
