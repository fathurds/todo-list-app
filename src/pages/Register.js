import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('success');

  const navigate = useNavigate();

  const fieldHandler = (e) => {
    const dataName = e.target.getAttribute('name');

    setFields({
      ...fields,
      [dataName]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const body = {
      username: fields.username,
      email: fields.email,
      password: fields.password
    }

    axios.post('https://peaceful-citadel-71310.herokuapp.com/signup', body)
      .then(data => {
        setMessage(data.data.message);
        setColor('success');
        navigate("/login");
      })
      .catch(err => {
        setMessage(err.response.data.message);
        setColor('danger');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className='container mx-auto px-5 m-24 flex justify-center'>
      <div className='border border-slate-400 rounded-xl p-5 w-[32rem]'>
        {message && (
          <div className={color === 'success' ? "bg-teal-100 border text-center border-teal-400 text-teal-700 px-4 py-3 rounded relative" : "bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"} role="alert">
            <span className="block sm:inline capitalize">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className={color === 'success' ? "fill-current h-6 w-6 text-teal-500" : "fill-current h-6 w-6 text-red-500"} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setMessage(null)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
          </div>
        )}
        <h2 className='text-center mb-5 text-slate-600 font-bold'>REGISTER</h2>
        <form onSubmit={handleSubmit.bind(this)}>
          <label className="block mb-4">
            <span className="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Username</span>
            <input name='username' type="text" placeholder='Username' className='form-data' onChange={fieldHandler.bind(this)} />
          </label>
          <label className="block mb-4">
            <span className="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500" >E-mail</span>
            <input name='email' type="email" placeholder='you@example.com' className='form-data' onChange={fieldHandler.bind(this)} />
          </label>
          <label className="block mb-4">
            <span className="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Password</span>
            <input name='password' type="password" placeholder='Password' className='form-data' onChange={fieldHandler.bind(this)} />
          </label>
          <label className="block mb-4">
            <span className="block font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">Confirm Password</span>
            <input name='confirmPassword' type="password" placeholder='Password' className={fields.confirmPassword.length === 0 || fields.confirmPassword === fields.password ? 'form-data' : 'form-data border-pink-500 focus:border-pink-500 focus:ring-pink-500'} onChange={fieldHandler.bind(this)} />
          </label>
          <p className='text-right mx-1'>Punya Akun? <span className='text-sky-500 font-bold cursor-pointer' onClick={() => navigate('/login')}>Masuk</span></p>
          <button className='btn-primary w-full' type='submit' disabled={isLoading || fields.password !== fields.confirmPassword || !fields.username || !fields.email || !fields.password ? true : false} >Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register