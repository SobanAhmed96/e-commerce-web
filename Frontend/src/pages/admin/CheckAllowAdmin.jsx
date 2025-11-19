import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CheckAllowAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const token = Cookies.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("/api/v1/isLogin");
        const userEmail = res.data?.data?.email;

        if (userEmail !== "soban@gmail.com") {
          navigate("/");
        }
      } catch (error) {
        console.log("Error verifying admin:", error);
        navigate("/login");
      }
    };

    check();
  }, [navigate]);

  return null;
};

export default CheckAllowAdmin;
