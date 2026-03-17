import React, { useEffect ,useState } from 'react'
import { FaTheRedYeti } from 'react-icons/fa'
import axios from 'axios';
export const NewsCard = ({data}) => {
  
  return (
    <div className='glass-card-premium p-4 flex flex-col gap-y-4 hover:translate-y-[-4px] cursor-pointer group' onClick={() => window.open(data.url, '_blank')}>
        <div className='h-40 overflow-hidden rounded-xl'>
          <img src={data.urlToImage} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
        </div>
        <div className='space-y-2'>
          <h3 className='text-base font-bold leading-tight group-hover:text-primary-blue transition-colors'>{data.title}</h3>
          <div className='flex justify-between items-center'>
            <span className='text-[11px] text-text-secondary font-medium italic'>- {data.author || 'Market News'}</span>
            <span className='text-[10px] text-primary-blue font-bold uppercase tracking-widest'>Read More</span>
          </div>
        </div>
    </div>
  )
}
