import React, { useEffect, useState } from "react";
import { GetAllProducts } from "../../../service/GetAllProducts";
import { useNavigate } from "react-router-dom";

const AllCategory = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await GetAllProducts();
      console.log("Fetched Products:", data);
      const uniqueData = [];
      const set = new Set();
      data.forEach((item) => {
        if(!set.has(item.category)){
            set.add(item.category);
            uniqueData.push(item);
        }
      });
      setProducts(uniqueData);

    };
    fetchProducts();
  }, []); 
  const handelCate =async (category) => {
    navigate(`/category/${category}`);
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded p-3 shadow-black hover:shadow-xs transition cursor-pointer"
            onClick={() => handelCate(item.category)}
          >
            <img
              src={item.images[0]}
              alt={item.category}
              className="w-full h-40 object-fill rounded-md"
            />
            <h3 className="mt-2 font-semibold text-gray-800 truncate w-full">
  {item.category}
</h3>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
