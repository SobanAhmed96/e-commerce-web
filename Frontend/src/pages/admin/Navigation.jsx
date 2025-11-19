import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,       // Dashboard
  MdAddBox,          // Add Product
  MdImage,           // Add Slider Image
  MdCollections,
  MdLogout,     // Get Slider Images
} from "react-icons/md";
import axios from "axios";

const Navigation = () => {
  const navigate = useNavigate();
  const handelLogout = async () => {
    try {
      await axios.get('/api/v1/logout');
      setInterval(() => {
        navigate('/login');
      },3000)
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <nav className="m-4">
      <ul>
        {/* Dashboard */}
        <li className="pb-4 flex">
          <NavLink
            to="/adminDashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-600 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-amber-300 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-amber-300"
            }
          >
            <MdDashboard size={22} /> Dashboard
          </NavLink>
        </li>

        {/* Add Product */}
        {/* 1st */}
        <li className="pb-4 flex">
          <NavLink
            to="/adminDashboard/addProduct"
            className={({ isActive }) =>
              isActive
                ? "bg-green-400 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-amber-300 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-amber-300"
            }
          >
            <MdAddBox size={22} /> Add Product
          </NavLink>
        </li>
        {/* 2nd */}
        <li className="pb-4 flex">
          <NavLink
            to="/adminDashboard/getAllProduct"
            className={({ isActive }) =>
              isActive
                ? "bg-green-400 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-amber-300 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-amber-300"
            }
          >
            <MdCollections size={22} /> Get All Product
          </NavLink>
        </li>

        {/* Add Slider Images */}
        <li className="pb-4 flex">
          <NavLink
            to="/adminDashboard/addSliderImages"
            className={({ isActive }) =>
              isActive
                ? "bg-green-400 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-amber-300 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-amber-300"
            }
          >
            <MdAddBox size={22} /> Add Slider Images
          </NavLink>
        </li>

        {/* Get Slider Images */}
        <li className="pb-4 flex">
          <NavLink
            to="/adminDashboard/getAllSliderImage"
            className={({ isActive }) =>
              isActive
                ? "bg-green-400 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-amber-300 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-amber-300"
            }
          >
            <MdCollections size={22} /> Get Slider Images
          </NavLink>
        </li>
        {/* Get All Orders */}
        <li className="pb-4 flex">
          <NavLink
            to="/adminDashboard/allOrders"
            className={({ isActive }) =>
              isActive
                ? "bg-green-400 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-amber-300 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-amber-300"
            }
          >
            <MdCollections size={22} /> Get All Orders
          </NavLink>
        </li>
        {/* Logout */}
        <li className="pb-4 flex">
          <NavLink
            onClick={handelLogout}
            
            className={({ isActive }) =>
              isActive
                ? "bg-red-400 p-2 ps-4 pe-4 flex gap-3 items-center w-full rounded hover:bg-red-500 duration-300"
                : "p-2 ps-4 pe-4 flex gap-3 items-center w-full hover:bg-red-400"
            }
          >
            <MdLogout size={22} /> Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
