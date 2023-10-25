import React, { useState ,useEffect,useRef} from 'react'
import { Link, useLocation ,NavLink,useNavigate, useParams} from 'react-router-dom';
import AdminMenu from '../../components/AdminMenu';
import {useSelector} from "react-redux";
import {AiOutlineAlignLeft} from "react-icons/ai"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';

export default function UpdateProduct() {
  const{currentUser}=useSelector((state)=>state.user);
  const [categories, setCategories] = useState([]);
  const [isvisible,setIsvisible]=useState(false);
  const sidebarRef = useRef(null);
  const [files,setFiles]=useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'',
    description:'',
    price:'',
    category:'',
    quantity:'',
    shipping:''
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  
    const navigate=useNavigate();
    const params=useParams();

    const getSingleProduct = async () => {
        try {
          const response = await fetch(`/api/product/get-product/${params.slug}`);
          if (response.ok) {
            const data = await response.json();
            const product = data.product;
      
            setId(product._id);
            setFormData({
                ...formData,
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                shipping: product.shipping,
                category: product.category._id,
                imageUrls:product.imageUrls,
            });
          } else {
            throw new Error("Network response was not ok.");
          }
        } catch (error) {
          console.error(error);
        }
      };
    // delete a product
    const handleDelete = async () => {
        try {
          let answer = window.prompt("Are You Sure want to delete this product ? ");
          if (!answer) return;
      
          const response = await fetch(`/api/product/delete-product/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            toast.success("Product Deleted Successfully");
            navigate("/dashboard/admin/products");
          } else {
            throw new Error("Network response was not ok.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      };
          
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  const handleChange = (e) => {
   
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

  

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const storeImage = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };


  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 4 images per Product');
      setUploading(false);
    }
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

 

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
 

  const apiUrl = "/api/category";
   //get all category
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

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`/api/product/update-product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        
      
      const data = await response.json();
  
      if (data.success==false) {
        toast.error(data.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
     
      }
    } catch (error) {
        console.log(error);
    }
  };
  
  return (
    <div className="flex  ">
      <div className={` w-80 md:block ${isvisible ? 'block' : 'hidden'}`} ref={sidebarRef}>
        <AdminMenu closeSidebar={closeSidebar} />
      </div>

    

  <div className="flex-1 bg-[#ebedef] " >
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
      {/* Main Content of Create Product */}
         <div className="max-w-3xl mx-auto p-5 rounded-md bg-white mt-7 mb-10">
          <h1 className="text-xl  text-center font-semibold mb-4">Update Product</h1>
          <div className="flex gap-3">
          <select
                
                placeholder="Select a category"
                 id='category'
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
              >
                <option selected >Choose Category</option>
                {categories?.map((c) => (
                  
                  <option key={c._id} >
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 id='shipping'
                 onChange={handleChange}
                >
                   <option selected>Select Shipping</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 '>
          <form  className=" lg:w-1/2 flex flex-col gap-3 mt-3">
          <input type="text" maxLength='62'
          id='name'
          minLength='10'
          required placeholder='Product Name' className="border rounded-lg p-3 bg-[#f1f1f1] outline-[#0073E1]"
          onChange={handleChange}
          value={formData.name} />
          
        <textarea
          type='text'
          placeholder=' Product Description'
          className='border p-3 rounded-lg  bg-[#f1f1f1] outline-[#0073E1]'
          id='description'
          required
          onChange={handleChange}
          value={formData.description}
          
        />
       <input
                  type="number"
                  id='price'
                  placeholder="write a Price"
                  className='border p-3 rounded-lg  bg-[#f1f1f1] outline-[#0073E1]'
                  onChange={handleChange}
                  value={formData.price}
                />
                <input
                  type="number"
                 id='quantity'
                  placeholder="write a quantity"
                  className='border p-3 rounded-lg  bg-[#f1f1f1] outline-[#0073E1]'
                 onChange={handleChange}
                 value={formData.quantity}
                  
                />
          </form>
          <div className=" lg:w-1/2  flex flex-col flex-1 gap-4 mt-3">
          <p className='font-semibold '>Images:
          <p className='font-normal text-gray-600 '>The first image will be the cover (max 4)</p>
          </p>
          <div className="flex gap-4">
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' onChange={(e) => setFiles(e.target.files)} />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' onClick={handleImageSubmit}>
            {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
                <div
                key={url}
                className='flex justify-between p-3 border items-center'
                >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                  />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            </div>
        </div>
            <div className="flex items-center  justify-center space around space-x-3 mt-6 ">

        <button className='p-3 bg-slate-700 text-white text-sm sm:text-md rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={handleUpdate}>Update Product</button>
        <button className='p-3 bg-slate-700 text-white text-sm sm:text-md rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={handleDelete}>Delete Product</button>
            </div>
              
              
         </div>
 </div>
</div>
  )
}
