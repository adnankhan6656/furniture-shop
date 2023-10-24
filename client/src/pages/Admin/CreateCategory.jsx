import React, { useState ,useEffect,useRef} from 'react'
import { Link, useLocation ,NavLink} from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu';
import {useSelector} from "react-redux";
import {AiOutlineAlignLeft,AiOutlineClose} from "react-icons/ai"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateCategory() {
  const{currentUser}=useSelector((state)=>state.user);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [updatedName, setUpdatedName] = useState("");
  const [isvisible,setIsvisible]=useState(false);
  const [selected, setSelected] = useState(null);
  const sidebarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  
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

  // code for handling Create Category

  useEffect(() => {
    getAllCategory();
  }, [categories]);
  const apiUrl = "/api/category"; // Base URL for the API


  const handleEdit = () => {
    setIsModalOpen(true);
    // Additional logic for editing (if needed)
  };
const getAllCategory = async () => {
  try {
    const response = await fetch(`${apiUrl}/get-category`);
    const data = await response.json();
     
    if (data.success) {
      setCategories(data.category);
      
    }
  } catch (error) {
    toast.error("Something went wrong in getting category");
   
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${apiUrl}/create-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();

  
    if (data?.success) {
      toast.success(`${name} is created`);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    
    toast.error("Something went wrong in input form");
  }
};

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${apiUrl}/update-category/${selected._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    });
    const data = await response.json();

    if (data.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      getAllCategory();
      
    } else {
      toast.error(data.message);
    }
  } catch (error) {
   
    toast.error("Something went wrong");
  }
};

const handleDelete = async (pId) => {
  try {
    const response = await fetch(`${apiUrl}/delete-category/${pId}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.success) {
      toast.success(`Category is deleted`);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    
    toast.error("Something went wrong");
  }
};

  return (
    <div className="flex h-screen ">
      <div className={` w-80 md:block ${isvisible ? 'block' : 'hidden'}`} ref={sidebarRef}>
        <AdminMenu closeSidebar={closeSidebar} />
      </div>

    

    {/* Main Content */}

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
          <div className="max-w-lg mx-auto mt-12 bg-white p-3 rounded-md">
             <form onSubmit={handleSubmit} className='flex gap-3 items-center'>
              <input type="text" name="category" placeholder='Enter new Category' id="category" className='border p-3 rounded-md outline-none  w-52 sm:w-80 ' onChange={(e) => setName(e.target.value)}/>
              <button  type='submit' className='bg-[#1d1f30] text-white rounded-md px-2 py-2'>Submit</button>
             </form>
          
              {/* to show contents */}
<div className="relative overflow-x-auto mt-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
               
            </tr>
        </thead>
        <tbody>
        {categories?.map((c) => (
  <tr key={c._id} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {c.name}
    </td>
    <td className="space-x-2">
      <button
        className="bg-green-500 text-white p-2 rounded-sm "
        onClick={() => {
          handleEdit();
          setUpdatedName(c.name);
          setSelected(c);
        }}
         
      >
        Edit
      </button>
      <button
        className="bg-red-500 rounded-sm p-2 text-white"
        onClick={() => {
          handleDelete(c._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
))}

           
           
        </tbody>
    </table>
    {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50 overflow-y-auto">
      {/* Modal content */}
      <div className="modal-content p-4 ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        <AiOutlineClose  onClick={() => setIsModalOpen(false)} className='w-6 h-6 cursor-pointer'/>
      </div>

        
        <form onSubmit={handleUpdate} className='flex gap-3 items-center'>
              <input type="text" name="category" placeholder='Enter new Category' id="category" className='border p-3 rounded-md outline-none' onChange={(e) => setUpdatedName(e.target.value)}/>
              <button  type='submit' className='bg-[#1d1f30] text-white rounded-md px-2 py-2'>Submit</button>
             </form>
      </div>
    </div>
    {/* Overlay */}
    <div className="modal-overlay fixed inset-0 bg-black opacity-50">
   
    </div>
  </div>
)}

</div>

             </div>
          </div>


         
 </div>

  )
}
