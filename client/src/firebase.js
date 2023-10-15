// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "furnitureshop-63ea3.firebaseapp.com",
  projectId: "furnitureshop-63ea3",
  storageBucket: "furnitureshop-63ea3.appspot.com",
  messagingSenderId: "320299317634",
  appId: "1:320299317634:web:22663d795e250e9033b79b",
  measurementId: "G-MKE111ZCB5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);