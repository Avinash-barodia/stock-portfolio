import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {login} from "../services/functions"
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
    const{register,handleSubmit,formState:{errors,isSubmitSuccessful}}=useForm();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const formSubmit= async(data)=>{
      // console.log('data in formSubmit',data);
      // console.log('going to the function');
        dispatch(login(data.email,data.password,navigate));
       }
  return (
    <div className='w-1/2  bg-gradient-to-r from-slate-50 to-zinc-100 mx-auto rounded-lg 
    pt-5 p-16 flex flex-col gap-y-8'>
     <form onSubmit={handleSubmit(formSubmit)}>

     <div className='flex flex-col'>
        <label htmlFor="email">Email</label>
        <input type="text" className='rounded-3xl border-x-0 border-y-0  bg-light-blue-50 p-2' {...register('email',{required:true})} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="password">Password</label>
        <input type="password" className='rounded-3xl border-x-0 border-y-0  bg-light-blue-50 p-2' {...register('password',{required:true})} />
      </div>

      <div className='flex justify-center pr-8 mt-6' >
        <button type='sumbit' className='bg-blue-500 px-3 py-2 rounded-lg text-white font-bold '>sumbit</button>
        </div>
     </form>
    </div>
  )
}
