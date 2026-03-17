import React from 'react'
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const navigate=useNavigate();
    
    const formSubmit = async(data) => {
      try {
        const resp = await api.post("/signup", data);
        console.log('Signup success:', resp);
        navigate('/login');
      } catch (err) {
        console.error('Signup error:', err);
      }
    }
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F19] to-[#111827] flex items-center justify-center p-6">
        <form onSubmit={handleSubmit(formSubmit)} className='w-full max-w-xl surface-premium p-10 flex flex-col gap-y-8'>    
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h2>
            <p className="text-text-secondary text-sm">Join our premium trading community</p>
          </div>

          <div className='flex gap-x-6 justify-center'>
            <div className='flex flex-col w-full gap-y-2'> 
              <label htmlFor="firstName" className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">First Name</label>
              <input 
                id="firstName"
                type="text" 
                placeholder='First Name'
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-blue transition-colors"
                {...register('firstName',{required:true})} 
              />
              {errors.firstName && <p className="text-loss text-[10px] font-bold mt-1 pl-1">First name is required</p>}
            </div>

            <div className='flex flex-col w-full gap-y-2'>
              <label htmlFor="lastName" className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Last Name</label>
              <input 
                id="lastName"
                type="text" 
                placeholder='Last Name'
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-blue transition-colors"
                {...register('lastName',{required:true})} 
              />
              {errors.lastName && <p className="text-loss text-[10px] font-bold mt-1 pl-1">Last name is required</p>}
            </div>
          </div>

          <div className='flex flex-col w-full gap-y-2'>
            <label htmlFor="email" className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Email Address</label>
            <input 
              id="email"
              type="email" 
              placeholder='name@example.com'
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-blue transition-colors"
              {...register('email',{required:true})} 
            />
            {errors.email && <p className="text-loss text-[10px] font-bold mt-1 pl-1">Email is required</p>}
          </div>
          
          <div className='flex justify-center gap-x-6'>
            <div className='flex flex-col w-full gap-y-2'>
              <label htmlFor="password" title="Enter Password" data-testid="password-label" className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder='••••••••'
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-blue transition-colors"
                {...register('password',{required:true})} 
              />
              {errors.password && <p className="text-loss text-[10px] font-bold mt-1 pl-1">Password is required</p>}
            </div>

            <div className='flex flex-col w-full gap-y-2'>
              <label htmlFor="confirmPassword" title="Confirm Password" data-testid="confirm-password-label" className="text-xs font-bold text-text-secondary uppercase tracking-widest pl-1">Confirm Password</label>
              <input 
                id="confirmPassword"
                type="password" 
                placeholder='••••••••' 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary-blue transition-colors"
              />
            </div>
          </div>

          <div className='flex justify-center pt-4' >
            <button type='submit' className='w-full bg-primary-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-blue/20'>
              Create Account
            </button>
          </div>

          <div className="text-center">
            <p className="text-text-secondary text-sm">
              Already have an account? <span onClick={() => navigate('/login')} className="text-primary-blue hover:underline cursor-pointer">Log in</span>
            </p>
          </div>
        </form>
    </div>
  )
}
