import React from "react";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import { Outlet } from "react-router-dom";
import GetAllProduct from "./pages/GetAllProduct";
import Cookies from "js-cookie";
import Footer from "../../components/Footer";
import AllCategory from "./pages/AllCategory";
import MessageShow from "../../components/MessageShow";
const Home = () => {
    const token = Cookies.get();
  return (
    <div className="min-h-screen flex flex-col p-5">
      <MessageShow/>
          <div className="flex justify-center mb-8 mt-10 px-4">
            <Slider />
          </div>
          <AllCategory />
          <GetAllProduct />
          <Outlet />
    </div>
  );
};

export default Home;
