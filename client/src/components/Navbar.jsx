import React, { useState } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {RxHamburgerMenu} from "react-icons/rx"
import {AiOutlineShoppingCart} from "react-icons/ai";

export default function Navbar() {
    const [isvisible,setIsvisible]=useState(false);
 const handlesidebar=()=>{
         setIsvisible(!isvisible);
 }
  return (
    <div className="flex items-center space-between  p-6 sm:px-10  sm:p-4 justify-between border-gray-500 border-b-[0.1px] md:px-16">
        <img src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/kayuu-logo-white.svg" alt="" className='max-w-[120px] sm:max-w-[100px]' />
  
        {isvisible && (
            <ul className="flex flex-col items-center gap-4 rounded-br-lg rounded-bl-lg px-1 text-white bg-white text-black h-[250px] shadow-lg absolute top-0 left-0 w-full  transition-all duration-300  z-10 sm:hidden">
              <button className="absolute top-2 right-2 border bg-[#edb932] text-2xl p-2">

              <AiOutlineClose
                
                
                onClick={handlesidebar}
                />
                </button>
              <li className="text-md text-black mt-11 border-b-[1px] p-3 w-full">Home</li>
              <li className="text-md  text-black border-b-[1px] p-3 w-full">Products</li>
              <li className="text-md p-3 text-black w-full">Login</li>
            </ul>
          )}     
    



    <div className=' flex items-center gap-3 text-white text-2xl sm:hidden '>
    <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center  text-white focus:outline-none">
    <button className='text-2xl focus:outline-none'> 
    <AiOutlineShoppingCart/>
    </button>
  <span class="sr-only">Notifications</span>
  <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-[#edb932] border-2  rounded-full -top-2 -right-2 dark:border-gray-900">6</div>
</button>
<RxHamburgerMenu  onClick={handlesidebar} className=' focus:outline-none'/>
    </div>
  
  
    {/* For Desktop navigation */}
       <ul className="hidden sm:flex sm:items-center gap-6 text-white">

       <li className="text-md cursor-pointer">Home</li>
              <li className="text-md cursor-pointer">Products</li>
              <li className="text-md cursor-pointer">Login</li>
              <li>
                
<button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center  text-white  focus:ring-4 focus:outline-none">
    <button className='text-2xl'> 
    <AiOutlineShoppingCart/>
    </button>
  <span class="sr-only">Notifications</span>
  <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-[#edb932] border-2  rounded-full -top-2 -right-2 dark:border-gray-900">6</div>
</button>
     </li>
       </ul>
       </div>
  )
}
