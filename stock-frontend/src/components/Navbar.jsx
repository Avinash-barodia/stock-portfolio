import {React} from 'react'
import { Btn } from './Btn'
import { Link, useNavigate } from 'react-router-dom'
import { Home } from '../pages/Home';
import { Portfolio } from '../pages/Portfolio';

export const Navbar = () => {
   const navigate=useNavigate();


  return (
    <div className='w-full overflow-x-hidden bg-[#141416] h-12 flex justify-between pt-2 p-7'>

        {/* div for logo and 4 sections */}
        <div className='text-white flex gap-x-12'>
            <div>logo</div>
            <div className='flex gap-x-4'>
                <div className='cursor-pointer' onClick={()=>navigate('/')}>Home</div>
                <div className='cursor-pointer' onClick={()=>navigate('Portfolio')} >Portfolio</div>
                <div className='cursor-pointer' onClick={()=>navigate('Updates')}>Recomendations</div>
            </div>
        </div>

        {/* div for user button */}
        <div className='cursor-pointer'>
            <Btn text={'User'} color={'bg-white'} /> 
        </div>

    </div>
  )
}
