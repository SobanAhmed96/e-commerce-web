import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MessageShow from "../../../components/MessageShow";

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Wishlist Data
  const fetchWishList = async () => {
    try {
      const res = await axios.get("/api/v1/getAllFavourite");
      setWishlist(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Remove Favourite
  const handelRemove = async (id) => {
    try {
      await axios.delete(`/api/v1/deleteFavourite/${id}`);
      setWishlist(wishlist.filter((item) => item._id !== id));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove");
    }
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="text-center py-16 text-xl text-gray-500">
        Loading wishlist...
      </div>
    );
  }

  // If empty
  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No favourite products found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
        <MessageShow/>
      <h2 className="text-3xl font-bold mb-6">My Wishlist ❤️</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border"
          >
            <div
              onClick={() => navigate(`/productDetails/${item.productId._id}`)}
              className="cursor-pointer"
            >
              <img
                src={item.productId.images[0]}
                className="h-48 w-full object-cover"
                alt="product"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {item.productId.productName}
              </h3>

              <p className="text-green-600 font-bold mt-1">
                Rs: {item.productId.price - item.productId.discountPrice}
              </p>

              <button
                className="mt-4 bg-red-500 w-full py-2 rounded-lg text-white flex items-center justify-center gap-2 hover:bg-red-600"
                onClick={() => handelRemove(item._id)}
              >
                <FaHeart color="white" /> Remove
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default MyWishlist;
