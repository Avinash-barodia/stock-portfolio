import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {login} from "../services/functions"
import {useDispatch} from "react-redux"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}}=useForm();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const formSubmit= async(data)=>{
      // console.log('data in formSubmit',data);
      // console.log('going to the function');
      const resp=await axios.post("http://localhost:4900/api/v1/signup",data);
      console.log('first',resp);
       }
 
  return (
    
    <div>
        
      
        <form onSubmit={handleSubmit(formSubmit)} className='w-1/2  bg-gradient-to-r from-slate-50 to-zinc-100 mx-auto rounded-lg 
        pt-5 p-16 flex flex-col gap-y-8'>    


        
        
         <div className='flex gap-x-10 justify-center pt-2'>
           
        <div className='flex flex-col w-full'> 
        <label htmlFor="firstName">FirstName</label>
        <input type="text" className='rounded-3xl border-x-0 border-y-0  bg-light-blue-50 p-2' placeholder='First Name'
         {...register('firstName',{required:true})} />
        {errors.firstName && <p>FirstName is required</p>}
        </div>

        <div className='flex flex-col w-full'>
          <label htmlFor="lastName">LastName</label>
           <input className='rounded-3xl border-none p-2 bg-light-blue-50'  type="text" {...register('lastName',{required:true})} />
           {errors.lastName && <p>LastName is required</p>}
        </div>
         </div>









        <div className='flex flex-col w-full '>
          <label htmlFor="email">Email</label>
          <input type="text" className='rounded-3xl border-none p-2 bg-light-blue-50'  {...register('email',{require:true})} />
           {errors.email && <p>Email is required</p>}
        </div>
        


       <div className='flex justify-center gap-x-10'>
     

       <div className='flex flex-col w-full'>
          <label htmlFor="password">Enter Password</label>
          <input type="password" {...register('password',{required:true})} className=' border-none p-2 bg-light-blue-50 rounded-3xl  '  />
          {errors.password && <span>Password is required</span>}
        </div>

        <div className='flex flex-col w-full'>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className='rounded-3xl border-none p-2 bg-light-blue-50'  />
        </div>


       </div>

        

        <div className='flex justify-center pr-8' >
        <button type='sumbit' className='bg-blue-500 px-3 py-2 rounded-lg text-white font-bold '>sumbit</button>
        </div>



      </form>
       
    </div>
  )
}
