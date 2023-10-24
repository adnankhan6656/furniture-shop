import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import {  useSelector } from 'react-redux';
import SignUp from './pages/Signup';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from "./pages/user/Dashboard.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Users from "./pages/Admin/Users.jsx";
import Orders from "./pages/user/Orders.jsx";
import ProfileUser from "./pages/user/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<Signin/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/products' element={<Products/>} />
       
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<ProfileUser />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center"/>
    </BrowserRouter>
  );
}