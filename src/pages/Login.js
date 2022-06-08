import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto px-5 m-24 flex justify-center'>
      <div className='border border-slate-400 rounded-lg p-5 w-[32rem]'>
        <h2 className='text-center mb-5 text-slate-600 font-bold'>Login</h2>
        <form>
          <label class="block mb-4">
            <span class="block font-medium text-slate-700">E-mail</span>
            <input type="email" placeholder='you@example.com' className='form-data'/>
          </label>
          <label class="block mb-4">
            <span class="block font-medium text-slate-700">Password</span>
            <input type="password" placeholder='Password' className='form-data' />
          </label>
          <p className='text-right mx-1'>Belum punya akun? <span className='text-sky-500 font-bold cursor-pointer' onClick={() => navigate('/register')}>Daftar</span></p>
          <button className='btn-primary' type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Login