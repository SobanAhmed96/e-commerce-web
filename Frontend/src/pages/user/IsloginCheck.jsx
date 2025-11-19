import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IsloginCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const check = async () => {
        
      try {
        const res = await axios.get("/api/v1/isLogin", { withCredentials: true });
        console.log("Login check response:", res.data);

        if (res.data?.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate("/login"); // redirect if not logged in
        }
      } catch (error) {
        console.error("Login check error:", error);
        setIsLoggedIn(false);
        navigate("/login");
      }
    };
    check();
  }, [navigate]);

  if (isLoggedIn === null) {
    return <p className="text-center mt-10">Checking login status...</p>;
  }

  return null;
};

export default IsloginCheck;
