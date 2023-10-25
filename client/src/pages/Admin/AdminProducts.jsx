import React, { useState ,useEffect,useRef} from 'react'
import { Link, useLocation ,NavLink} from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu.jsx';
import {useSelector} from "react-redux";
import {AiOutlineAlignLeft} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProducts() {
  const{currentUser}=useSelector((state)=>state.user);
  const [products,setProducts]=useState([]);
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
  // getAllProducts using Fetch API
const getAllProducts = async () => {
  try {
    const response = await fetch("/api/product/get-product");
    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }
};
useEffect(() => {
  getAllProducts();
}, []);
  return (
    <div className="flex h-screen ">
      <div className={` w-80 md:block ${isvisible ? 'block' : 'hidden'}`} ref={sidebarRef}>
        <AdminMenu closeSidebar={closeSidebar} />
      </div>

    

  <div className="flex-1 bg-white" >
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
        <div className="grid grid-cols-2 sm:grid-cols-3  sm:gap-4 md:grid-cols-4 gap-2  p-3">
        {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                
              >
                <div className="flex flex-col  space-y-2 items-center hover:shadow-lg p-5">
                     <img src={p.imageUrls[0]} alt=""  className='w-80'/>

                  <p className="text-md text-[#edb932] line-clamp-1">{p.name}</p>
                  <p className="text-md text-gray-600">${p.price}</p>
                </div>

                </Link>
            ))}
        </div>
         
 </div>
</div>
  )
}
