import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import EditSliderImage from "./admin/slider/EditSliderImage.jsx";
import Home from "./user/Home.jsx";
import Dashboard from "./admin/Dashboard";
import AddSliderImage from "./admin/slider/AddSliderImage.jsx";
import GetAllImages from "./admin/slider/GetAllImages.jsx";
import AddProduct from "./admin/product/AddProduct.jsx";
import DashboardScreen from "./admin/DashboardScreen.jsx";
import AdminGetAllProduct from "./admin/product/AdminGetAllProduct.jsx";
import ProductEdit from "./admin/product/ProductEdit.jsx";
import Signup from "../auth/Signup.jsx";
import Navbar from "../components/Navbar.jsx";
import Login from "../auth/Login.jsx";
import Product_details from "./user/Product_details.jsx";
import Cart from "./user/Cart.jsx";
import Delivery from "./user/checkout/Delivery.jsx";
import Category from "./user/pages/category.jsx";
import AboutUs from "./user/pages/AboutUs.jsx";
import Blog from "./user/pages/Blog.jsx";
import Faqs from "./user/pages/Faqs.jsx";
import PrivacyPolicy from "./user/pages/PrivacyPolicy.jsx";
import GetAllOrder from "./admin/order/GetAllOrder.jsx";
import OrderDetails from "./admin/order/OrderDetails.jsx";
import MyOrder from "./user/myOrder/myOrder.jsx";
import OrderDetail from "./user/myOrder/OrderDetail.jsx";
import Profile from "./user/profile/Profile.jsx";
import EditProfile from "./user/profile/EditProfile.jsx";
import MyWishlist from "./user/wishlist/MyWishlist.jsx";

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
