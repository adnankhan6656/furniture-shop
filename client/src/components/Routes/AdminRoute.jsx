import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const {token }= useSelector((state) => state.user); 
  const {currentUser}= useSelector((state) => state.user); 
  const [ok, setOk] = useState(false);
 
  useEffect(() => {
    const authCheck = async () => {
      try {
        if (token) {
          const response = await fetch(`/api/user/admin-auth/${currentUser._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
            
          const data = await response.json();
          if (data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        }
      } catch (error) {
        // Handle errors, e.g., network issues
        console.error(error);
        setOk(false);
      }
    };

    authCheck();
  }, [token]);

  return ok ? <Outlet /> : "HI";
}
