import React from 'react'
import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="max-w-lg font-Poppins mx-auto bg-white sm:shadow-custom  mt-6 p-3 sm:p-6 rounded-lg">
      <h1 className="text-3xl text-center font-semibold">Signup</h1>
       <form  onSubmit={handleSubmit} className="flex flex-col gap-5 my-5">
        <input type="text" placeholder="username" className="p-2 border-gray-300 border-b-[1px] outline-none" id="username" onChange={handleChange} />
        <input type="email" placeholder="email" className="p-2 border-b-[1px] outline-none" id="email" onChange={handleChange} />
        <input type="password" placeholder="password" className="p-2 border-b-[1px] outline-none" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-[#EDB932]  mt-2 rounded-md p-2">Signup</button>
       </form>
       <div className="flex gap-2">
       <p>Have an account?</p>
       <Link to={'/sign-in'}>
       <span className='text-blue-700'>Sign in</span>
       </Link>
       </div>
       
       
       {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
