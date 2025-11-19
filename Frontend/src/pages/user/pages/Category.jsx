import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { addToCart } from "../../../service/AddToCart";

const Category = () => {
  const { category } = useParams();
  const [cateData, setcateData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const cateData = await axios.get(`/api/v1/getProductCate/${category}`);
        console.log(cateData.data);
        setcateData(cateData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [category]);

  const handelDetails = async (id) => {
     navigate(`/productDetails/${id}`)
  }

  return  <div className="p-10">
      <h2 className="text-2xl font-bold mb-4 capitalize mt-10">{category} Products</h2>

      {cateData.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className=" flex-col grid grid-cols-2 md:grid-cols-4 gap-4">
          {cateData.map((item) => (
            <button key={item._id} onClick={() => handelDetails(item._id)} className="cursor-pointer">
            <div
              className="border rounded-lg p-3 shadow hover:shadow-lg transition"
            >
              <img
                src={item.images[0]}
                alt={item.productName}
                className="w-full h-40 object-fill rounded-md"
              />
              <h3 className="mt-2 font-semibold">{item.productName}</h3>
              {item.discountPrice ? <div>
              <p className="text-sm text-green-500">Rs:{item.price - item.discountPrice}</p>
              <p className="text-sm text-gray-500 line-through">Rs:{item.price}</p>
              </div>: 
              <p className="text-sm text-green-500">Rs:{item.price}</p>
              }
            </div>
            </button>
          ))}
        </div>
      )}
    </div>
};

export default Category;
