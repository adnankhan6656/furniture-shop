import React from 'react'
import { Link, useLocation ,NavLink} from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu';
import {useSelector} from "react-redux";
export default function AdminDashboard() {
  const{currentUser}=useSelector((state)=>state.user);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-900 text-white' : '';
  };

  return (
    <div className="flex h-screen ">
     <div className=" w-1/5">
     <AdminMenu/>
     </div>

     

   <div className="flex-1 bg-[#ebedef]" >
          <div className="max-w-full bg-white text-right shadow-md p-3 flex justify-end">
          <NavLink to="/profile" className="shadow-lg" >
              {currentUser ? (
              <img src={currentUser.avatar} alt=""  className='w-11 h-11 rounded-md object-cover'/>

              ) : (
                <li className='text-md text-black p-3 w-full'>Login</li>
              )}
            </NavLink>
          </div>

          <div className="admininfo max-w-lg mx-auto bg-white mt-10 p-3 rounded-md">
            <h1 className="text-2xl font-semibold text-center mb-5">Personal Admin Information</h1>
                <div className="flex flex-col">
                  <div className='flex gap-2 items-center '>
                  <p className="text-lg font-medium">Admin Name :</p>
                  <p className="text-md">{currentUser.username}</p>
                  </div>
                  <div className='flex  gap-2 items-center '>
                  <p className="text-lg font-medium">Email :</p>
                  <p className="text-md">{currentUser.email}</p>
                  </div>
                  
                  

                </div>
          </div>
  </div>
</div>
  );
}
