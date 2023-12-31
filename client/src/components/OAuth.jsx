import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess,setAccesstoken } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {BiLogoGoogle} from "react-icons/bi";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      const {token,rest}=data;
    
      dispatch(setAccesstoken(token));
      dispatch(signInSuccess(rest));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button onClick={handleGoogleClick} type='button' className=' text-black flex items-center bg-blue-700 gap-3 rounded-lg uppercase hover:opacity-95 p-3 shadow-md font-semibold' >
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className='bg-white p-1' alt="Google Icon" />
      <p className='ml-3 text-white '> Continue with google</p> 
       </button>

    
  );
}