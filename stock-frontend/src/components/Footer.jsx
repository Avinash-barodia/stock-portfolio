import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";


export const Footer = () => {
  return (
    <div className='pl-16 pr-16 pb-16 pt-10 relative bg-gradient-to-r from-gray-900 to-blue-900'>

        <div className='flex pb-10'>
         <div><img src="" alt="" /></div>
            <p className='text-center mx-auto text-4xl text-white'>Name</p> 
        </div>

        <div className='flex justify-evenly items-baseline'>
            
            
            {/* 1st col div */}
            <div className='flex flex-col space-y-5'>
                <p className='text-white text-3xl'>Product</p>
                <ul className='flex flex-col space-y-3'>
                    <li className='text-white'>Home Page</li>
                    <li className='text-white'>Portfolio</li>
                    <li className='text-white'>About Us</li>
                    <li className='text-white'>Contact</li>
                </ul>
            </div>


            {/* 2nd col div */}
            <div className='flex flex-col space-y-5'>
                <p className='text-white text-3xl'>Use Case</p>
                <ul className='flex flex-col space-y-3' >
                    <li className='text-white'>Management</li>
                    <li className='text-white'>News</li>
                    <li className='text-white'>Updates</li>
                </ul>
            </div>


          {/* 3rd col div */}
            <div className='flex flex-col space-y-5'>
                <p className='text-white  text-3xl'>Company</p>
                <ul className='flex flex-col space-y-3'>
                    <li className='text-white'>Careers</li>
                    <li className='text-white'>FAQ's</li>
                    <li className='text-white'>Teams</li>
                </ul>
            </div>

            {/* 4th Col div */}

            <div className='flex flex-col space-y-5'>
                <p className='text-white text-3xl'>Contact Us</p>
                <ul className='flex flex-col space-y-3'>
                    <li className='flex space-x-2 items-center'><CiLocationOn className='text-white' />
                    
                    <p className='text-white'>Wisconsin Ave , Suite 700 <br/>Chevy Chase , Maryland 20815</p>
                    </li>
                    <li className='flex space-x-2 items-center'>
                     <MdOutlineMailOutline className='text-white'/>
                     <p className='text-white'>Company@gmail.com</p>
                    </li>
                </ul>
            </div>
            
        </div>


          {/* div for the icons of React */}

          <div className='flex gap-12 mt-10 pl-[50rem]'>
            <p className='text-white font-mono text-xl'>Follow us at:</p>
            <div className='text-white text-3xl transition-all hover:scale-125 duration:200 cursor-pointer'><FaSquareXTwitter/></div>
            <div className='text-white text-3xl  transition-all hover:scale-125 duration:200 cursor-pointer'><FaSquareInstagram/></div>
            <div className='text-white text-3xl  transition-all hover:scale-125 duration:200 cursor-pointer'><FaWhatsapp/></div>
            <div className='text-white text-3xl  transition-all hover:scale-125 duration:200 cursor-pointer'><FaTelegram/></div>
          </div>

        
    </div>
  )
}
