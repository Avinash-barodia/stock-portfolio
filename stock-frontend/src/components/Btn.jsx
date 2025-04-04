import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Btn = ({text,color}) => {
  const navigate=useNavigate();
  return (
    <div>
        <div className='bg-white font-mono text-blue-950 rounded-full px-2 py-1' >
           {text}
        </div>
    </div>
  )
}
