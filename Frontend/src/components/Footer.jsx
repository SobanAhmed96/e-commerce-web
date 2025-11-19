import React, { useEffect, useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [cateData, setcate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/getAllProduct`);
        if (res.data.data) {
          const resdata = res.data.data;

          const uniqueData = [];
          const set = new Set();
          resdata.forEach((item) => {
            if (!set.has(item.category)) {
              set.add(item.category);
              uniqueData.push(item);
            }
          });
          setcate(uniqueData);
          console.log(uniqueData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);
  const handelCate = async (cate) => {
    try {
      const category = cate;
      navigate(`/category/${category}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-6 md:px-16 mb-0">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">My Shop</h2>
          <p className="text-sm leading-6">
            My Shop brings you the latest fashion, gadgets, and lifestyle
            products at unbeatable prices. Enjoy fast delivery and excellent
            support.
          </p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Category</h3>
          {cateData.map((cate) => {
            return (
              <button
                key={cate._id}
                className="flex flex-col"
                onClick={() => handelCate(cate.category)}
              >
                {cate.category}
              </button>
            );
          })}
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => navigate("/")} className="hover:text-white">
                Shop
              </button>
            </li>
            <li>
             <button onClick={() => navigate("/about-us")} className="hover:text-white">
                About-Us
              </button>
            </li>
            <li>
             <button onClick={() => navigate("/blog")} className="hover:text-white">
                Blog
              </button>
            </li>
           
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
               <button onClick={() => navigate("/faqs")} className="hover:text-white">
                FAQS
              </button>
            </li>
            <li>
               <button onClick={() => navigate("/privacy-policy")} className="hover:text-white">
                Privacy-Policy
              </button>
            </li>
            <li>
              <a href="/returns" className="hover:text-white">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:text-white">
                Shipping Info
              </a>
            </li>
            
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <p className="text-center text-gray-500 text-sm">
          Designed & Developed by{" "}
          <span className="font-bold text-indigo-600">Soban Ahmed</span>
        </p>  
      </div>
    </footer>
  );
};

export default Footer;
