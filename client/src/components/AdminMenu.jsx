import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BiCategory } from "react-icons/bi"
import { BsFillBoxFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

export default function AdminMenu({ closeSidebar }) {
    const location = useLocation();
    return (
        <div className="bg-gradient-to-r from-[#222538] to-[#1d1f30] text-white h-screen w-80 fixed left-0 top-0 z-20">
            <h1 className="text-2xl font-bold mb-4 bg-[#1d1f30] p-3 w-full">Admin Dashboard</h1>
            <ul className="space-y-2 flex flex-col gap-2 p-3">
                <NavLink
                    to="/dashboard/admin/create-category"
                    className={`flex items-center gap-2 p-3 hover:bg-[#21243b] ${location.pathname.includes('create-category') ? 'bg-[#21243b]' : ''
                        }`}
                        onClick={closeSidebar}
                >
                    <BiCategory className="w-6 h-6" />
                    <p className='text-md'>Create Category</p>
                </NavLink>

                <NavLink
                    to="/dashboard/admin/create-product"
                    className={`flex items-center gap-2 p-3 hover:bg-[#21243b] ${
                        location.pathname.includes('create-product') ? 'bg-[#21243b]' : ''
                      }`}
                      onClick={closeSidebar}
                >
                    <BsFillBoxFill className="w-6 h-6" />
                    <p className='text-md' >Create Product</p>

                </NavLink>
                <NavLink
                    to="/dashboard/admin/users"
                    className={`flex items-center gap-2 p-3 hover:bg-[#21243b] ${
                        location.pathname.includes('users') ? 'bg-[#21243b]' : ''
                      }`}
                      onClick={closeSidebar}
                >
                    <FiUsers className="w-6 h-6" />
                    <p className="text-md"> Users</p>

                </NavLink>

                <NavLink
                    to="/dashboard/admin/products"
                    className={`flex items-center gap-2 p-3 hover:bg-[#21243b] ${
                        location.pathname.includes('products') ? 'bg-[#21243b]' : ''
                      }`}
                      onClick={closeSidebar}
                >
                    <BsFillBoxFill className="w-6 h-6" />
                    <p className='text-md' >All Products</p>

                </NavLink>
            </ul>
        </div>
    )
}
