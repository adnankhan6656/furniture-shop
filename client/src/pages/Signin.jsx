import React from 'react'
import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from "../components/OAuth.jsx"

export default function Signup() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
     
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="max-w-lg font-Poppins mx-auto bg-white sm:shadow-custom  mt-6 p-3 sm:p-8 rounded-lg">
      <h1 className="text-3xl text-center font-semibold">SignIn</h1>
       <form  onSubmit={handleSubmit} className="flex flex-col gap-5 my-5">
        
        <input type="email" placeholder="email" className="p-2 border-b-[1px] outline-none" id="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="p-2 border-b-[1px] outline-none" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-[#EDB932] text-black uppercase mt-2 rounded-md p-2"> {loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth/>
       </form>
       <div className="flex gap-2">
       <p>Don't Have an Account? </p>
       <Link to={'/sign-in'}>
       <span className='text-blue-700'>
         Signup
       </span>
       </Link>
       </div>
       
       
       {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
