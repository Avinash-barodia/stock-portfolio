import React from 'react'

export const NewsCard = ({data}) => {
  return (
    <div 
      className='glass-card-premium p-3 flex flex-row gap-x-4 items-center hover:bg-white/[0.02] active:scale-[0.98] cursor-pointer group transition-all duration-300' 
      onClick={() => window.open(data.url, '_blank')}
    >
        <div className='w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-white/5'>
          <img 
            src={data.urlToImage || 'https://images.unsplash.com/photo-1611974717535-7c857700afde?w=200&h=200&fit=crop'} 
            alt="" 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100' 
          />
        </div>
        <div className='flex flex-col flex-1 justify-between h-full min-w-0'>
          <h3 className='text-sm font-bold leading-snug group-hover:text-primary-blue transition-colors line-clamp-2 text-text-primary'>
            {data.title}
          </h3>
          <div className='flex justify-between items-center mt-2'>
            <span className='text-[10px] text-text-secondary font-bold uppercase tracking-tight truncate max-w-[100px]'>
              {data.source?.name || data.author || 'Market News'}
            </span>
            <span className='text-[9px] text-primary-blue font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity'>
              Read
            </span>
          </div>
        </div>
    </div>
  )
}
