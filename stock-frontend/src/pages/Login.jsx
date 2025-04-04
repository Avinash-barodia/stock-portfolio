import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import login from "../assets/login.jpg"
import { LoginForm } from '../components/LoginForm';
import axios from 'axios';
import { SignupForm } from '../components/SignupForm';
  export const Login = () => {
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}}=useForm();
   // const background =  "bg-[url(" + "../assets/login.jpg"+ ")]"
    const [bg,setBg]=useState("https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2020_12/3279436/200322-new-york-stock-exchange-coronavirus-cs-1144a.jpg");

    const[flag,setFlag]=useState(1);
 

return (

    <div className='w-full h-screen pt-16 ' style={{backgroundImage:`url(${bg})`}}>
       
       
       <div className='flex justify-center w-full gap-x-6 pb-10 '>
        <div className='bg-slate-100 flex space-x-10 p-4'>
            <div className={`text-black font-bold font-mono text-3xl cursor-pointer ${flag ?" border-b-4 border-b-blue-600" :""}`} onClick={()=>setFlag(1)}>Signup</div>
              <div className={`text-black font-bold font-mono text-3xl cursor-pointer ${!flag ?" border-b-4 border-b-blue-600" :""}`} onClick={()=>setFlag(0)}>Login</div>
            </div>
        </div>
         
       
     { flag? <LoginForm />:<SignupForm/>

} 

     <button onClick={()=>localStorage.clear()} className='font-mono text-xl font-bold px-2 py-3 bg-blue-500'>logout</button>
    </div>
  )
}
