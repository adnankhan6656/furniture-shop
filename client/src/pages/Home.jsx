import React, { useState } from 'react'
import Navbar from '../components/Navbar'


export default function Home() {
  
  return (
   <main>
         <div className="h-[100vh] font-Poppins  max-w-full opacity-90 bg-no-repeat bg-cover"  style={{ 
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/furniture-store-hero-bg.jpg")'
}}>
        <Navbar/>
        {/* Hero section starts */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2 mt-9 p-5 md:mt-20 md:px-16" >
          <p className="text-sm text-[#edb932]  tracking-widest">KAYUU FURNITURE STORE</p>
          <h2 className="text-3xl text-white font-semibold md:text-4xl">Make Yourself At Home</h2>
          <p className="text-sm text-white leading-7">Vestibulum, diam vulputate amet cras in diam quis turpis curabitur tellus aliquet tellus iaculis tempus, sollicitudin massa duis eleifend egestas turpis sit etiam commodo viverra lacinia ipsum convallis sed augue purus scelerisque non vestibulum elementum mi, pellentesque leo tincidunt integer.
</p>
     <button className="bg-[#edb932] w-28 text-black hover:bg-white p-3">
      Shop Now
     </button>

        </div>
         </div>
         <div>
     {/* Hero section ends */}
     

           <div className="max-w-full py-9 px-6 flex flex-col md-custom:flex-row  sm:py-16 sm:px-8 md:gap-3">
            <img src="https://websitedemos.net/home-decor-04/wp-content/uploads/sites/644/2020/08/new-collection-furniture-img.jpg" alt="" className='flex-1 md-custom:w-1/2'/>
            <div className='p-3 flex flex-col  gap-4  md:gap-4 md-custom:py-16 md-custom:px-8  flex-1'>
              <h1 className="text-2xl  md-custom:text-[42px] md-custom:leading-tight font-semibold">A Perfect Set For Your Living Room</h1>
              <p className="text-md md-custom:text-lg">Massa cras egestas laoreet montes, dapibus eu sit etiam curabitur faucibus habitasse lectus vestibulum leo, odio dolor quis maecenas faucibus vulputate pharetra nunc sed maecenas diam quisque habitasse.</p>
              <button className="bg-[#edb932] w-28 text-black hover:bg-white p-3">
      Shop Now
     </button>
            </div>
           </div>
        
         </div>
        
   </main>
  )
}
