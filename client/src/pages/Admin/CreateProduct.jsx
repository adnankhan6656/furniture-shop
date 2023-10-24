import React, { useState ,useEffect,useRef} from 'react'
import { Link, useLocation ,NavLink} from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu';
import {useSelector} from "react-redux";
import {AiOutlineAlignLeft} from "react-icons/ai"

export default function CreateProduct() {
  const{currentUser}=useSelector((state)=>state.user);
  const [isvisible,setIsvisible]=useState(false);
  const sidebarRef = useRef(null);

  const handlesidebar=()=>{
     setIsvisible(!isvisible);
  }
  const closeSidebar = () => {
    setIsvisible(false);
  };
  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsvisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <div className="flex h-screen ">
      <div className={` w-80 md:block ${isvisible ? 'block' : 'hidden'}`} ref={sidebarRef}>
        <AdminMenu closeSidebar={closeSidebar} />
      </div>

    

  <div className="flex-1 bg-[#ebedef]" >
         <div className="max-w-full bg-white text-right shadow-md p-3 flex items-center justify-between md:justify-end  ">
             <AiOutlineAlignLeft className='w-6 h-6 md:hidden' onClick={handlesidebar}/>

         <NavLink to="/profile" className="shadow-lg" >
             {currentUser ? (
             <img src={currentUser.avatar} alt=""  className='w-11 h-11 rounded-md object-cover'/>

             ) : (
               <li className='text-md text-black p-3 w-full'>Login</li>
             )}
           </NavLink>
         </div>

         
 </div>
</div>
  )
}
