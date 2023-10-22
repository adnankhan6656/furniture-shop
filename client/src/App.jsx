import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import SignUp from './pages/Signup';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute.jsx';

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
      </Routes>
    </BrowserRouter>
  );
}