import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  return (
    <div className='container mx-auto px-5 m-24 flex justify-center'>
      <div className='border border-slate-400 rounded-lg p-5 w-[32rem]'>
        <h2 className='text-center mb-5 text-slate-600 font-bold'>REGISTER</h2>
        <form>
          <label class="block mb-4">
            <span class="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Username</span>
            <input type="text" placeholder='Username' className='form-data' />
          </label>
          <label class="block mb-4">
            <span class="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">E-mail</span>
            <input type="email" placeholder='you@example.com' className='form-data'/>
          </label>
          <label class="block mb-4">
            <span class="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Password</span>
            <input type="password" placeholder='Password' className='form-data' />
          </label>
          <label class="block mb-4">
            <span class="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Confirm Password</span>
            <input type="password" placeholder='Password' className='form-data' />
          </label>
          <p className='text-right mx-1'>Punya Akun? <span className='text-sky-500 font-bold cursor-pointer' onClick={() => navigate('/login')}>Masuk</span></p>
          <button className='btn-primary' type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register