import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import EditSliderImage from "./admin/slider/EditSliderImage";
import Home from "./user/Home";
import Dashboard from "./admin/Dashboard";
import AddSliderImage from "./admin/slider/AddSliderImage";
import GetAllImages from "./admin/slider/GetAllImages";
import AddProduct from "./admin/product/AddProduct";
import DashboardScreen from "./admin/DashboardScreen";
import AdminGetAllProduct from "./admin/product/AdminGetAllProduct";
import ProductEdit from "./admin/product/ProductEdit";
import Signup from "../auth/Signup";
import Navbar from "../components/Navbar";
import Login from "../auth/Login";
import Product_details from "./user/Product_details";
import Cart from "./user/Cart";
import Delivery from "./user/checkout/Delivery";
import Category from "./user/pages/category";
import AboutUs from "./user/pages/AboutUs";
import Blog from "./user/pages/Blog";
import Faqs from "./user/pages/Faqs";
import PrivacyPolicy from "./user/pages/PrivacyPolicy";
import GetAllOrder from "./admin/order/GetAllOrder";
import OrderDetails from "./admin/order/OrderDetails";
import MyOrder from "./user/myOrder/myOrder";
import OrderDetail from "./user/myOrder/OrderDetail";
import Profile from "./user/profile/Profile";
import EditProfile from "./user/profile/EditProfile";
import MyWishlist from "./user/wishlist/MyWishlist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<App />} />
        <Route path="/productDetails/:id" element={<Product_details />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/checkOut" element={<Delivery />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/my-orders" element={<MyOrder />} />
        <Route path="/orderDetails/:id" element={<OrderDetail />} />
        <Route path="/my-wishlist" element={<MyWishlist />} />

         
        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Manage Account */}
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/editProfile/:id" element={<EditProfile/>}/>
      </Route>
      {/* Admin */}
      <Route path="/adminDashboard" element={<Dashboard />}>
        <Route path="/adminDashboard" element={<DashboardScreen />} />
        {/* SLider */}
        <Route
          path="/adminDashboard/addSliderImages"
          element={<AddSliderImage />}
        />
        <Route
          path="/adminDashboard/getAllSliderImage"
          element={<GetAllImages />}
        />
        <Route
          path="/adminDashboard/sliderImageEdit/:id"
          element={<EditSliderImage />}
        />
        {/* Product */}
        <Route path="/adminDashboard/addProduct" element={<AddProduct />} />
        <Route
          path="/adminDashboard/getAllProduct"
          element={<AdminGetAllProduct />}
        />
        <Route
          path="/adminDashboard/editProduct/:id"
          element={<AddProduct />}
        />
        {/* Orders */}
        <Route
          path="/adminDashboard/allOrders"
          element={<GetAllOrder />}
        />
        <Route
          path="/adminDashboard/orderDetails/:id"
          element={<OrderDetails />}
        />
      </Route>
    </>
  )
);

export default router;
