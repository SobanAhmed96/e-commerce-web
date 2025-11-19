import { Search, ShoppingCart, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Footer from "./Footer";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [searchShowMobile, setSearchShowMobile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [profile, setprofile] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDataa, setsearchData] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const searchData = async () => {
    try {
      const res = await axios.get("/api/v1/getAllProduct");
      console.log(res.data.data);
      const filterd = res.data.data.filter((iteam) =>
        iteam.productName.toLowerCase().includes(search.toLowerCase())
      );
      setsearchData(filterd);
    } catch (error) {
      console.log(error);
    }
  };
  const token = Cookies.get("token");
  useEffect(() => {
    setIsLogin(!!token);
    const getUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/api/v1/isLogin");
          console.log(res.data);
          setprofile(res.data.data);
          console.log(profile);
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }
    };
    getUser();
     const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLogin(false);
    navigate("/");
  };

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  return (
    <div className="w-full">
      <div className="w-full fixed z-50">
        {/* Navbar */}
        <nav className="bg-blue-500 w-full h-15 flex justify-between items-center px-5">
          <h1
            className="text-2xl font-bold font-mono text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            MyShop
          </h1>

          {/* Desktop Search + Cart */}
          <div className="flex flex-col justify-center items-center relative">
            <div className="hidden md:flex bg-white rounded-lg overflow-hidden">
              <input
                type="text"
                className="w-120 p-2 border-none focus:outline-none"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button
                className="bg-gray-400 p-3 hover:cursor-pointer"
                onClick={searchData}
              >
                <Search size={20} className="text-blue-500" />
              </button>
            </div>

            {searchDataa && searchDataa.length > 0 && (
              <div className="hidden md:flex flex-col absolute top-11 w-full mt-1 rounded bg-white shadow-lg max-h-60 overflow-y-auto z-50">
                {searchDataa.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/productDetails/${item._id}`);
                      setsearchData([]); // hide dropdown
                      setSearch(""); // clear input
                    }}
                  >
                    {item.productName}
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Desktop Login / Profile + Logout */}
          {!isLogin ? (
            <div className="hidden md:flex items-center">
              <Button
                onClick={handleLogin}
                className="px-2 font-semibold text-white hover:cursor-pointer me-4"
              >
                Login
              </Button>
              <Button
                onClick={handleSignup}
                className="px-2 font-semibold text-white hover:cursor-pointer"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              {/* Cart */}

              {isLogin && (
                <button
                  className="hidden md:flex hover:cursor-pointer ms-5"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart size={30} color="white" />
                </button>
              )}
              {/* Profile Avatar */}
              <div className="relative" ref={menuRef}>
                {profile.profileImage && (
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <img
                      src={profile.profileImage || ""}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Dropdown Menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(`/profile/${profile._id}`);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Manage Account
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/my-orders");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/my-wishlist");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Wishlist
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Icons */}
          <div className="flex md:hidden">
            <button onClick={() => setSearchShowMobile(!searchShowMobile)}>
              <Search size={25} />
            </button>
            <button className="ms-4" onClick={() => setMenu(!menu)}>
              {menu ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </nav>

        {/* Mobile Search */}
        {searchShowMobile && (
          <div className="flex md:hidden bg-blue-600 h-15 items-center py-10 px-3">
            <div className="flex w-full bg-white ps-3 items-center rounded-lg">
              <input
                type="text"
                className="w-full focus:outline-none text-2xl"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button className="bg-gray-400 py-4 px-4" onClick={searchData}>
                <Search />
              </button>
              {searchDataa && searchDataa.length > 0 && (
                <div className="absolute top-30 left-0 bg-white shadow-lg rounded-lg w-full max-h-60 overflow-y-auto z-50">
                  {searchDataa.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/productDetails/${item._id}`);
                        setsearchData([]); // hide dropdown
                        setSearch(""); // clear input
                      }}
                    >
                      {item.productName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menu && (
          <div className="flex md:hidden w-full bg-blue-400 gap-3">
            <div className="p-4 w-full">
              {isLogin ? (
                <div>
                  <Button
                    className="flex items-center mt-5 w-full justify-center gap-2"
                    size="lg"
                    onClick={() => navigate("/cart")}
                  >
                    <ShoppingCart size="30" />
                    Cart
                  </Button>
                  <Button
                    children="Manage My Account"
                    size="md"
                    className="mt-3 w-full"
                    onClick={() => navigate("/profile")}
                  />
                  <Button
                    children="Logout"
                    size="md"
                    className="mt-3 w-full"
                    onClick={handleLogout}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    children="Login"
                    size="lg"
                    className=" text-black w-full"
                    onClick={handleLogin}
                  />
                  <Button
                    children="Sign Up"
                    size="lg"
                    className="bg-yellow-300 text-black w-full mt-3"
                    onClick={handleSignup}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Outlet />
      <Footer/>
    </div>
  );
};

export default Navbar;
