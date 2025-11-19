import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/getCart", { withCredentials: true });
        setProducts(res.data.find || []); // Assuming cartItems contains product info
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Remove item from cart
  const handleRemove = async (cartId) => {
    try {
      await axios.delete(`/api/v1/removeCart/${cartId}`, { withCredentials: true });
      setProducts((prev) => prev.filter((item) => item._id !== cartId));
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total price
  const getTotal = () => {
      return products.reduce((acc,item) => {
        const price = item.productId.price - item.productId.discountPrice;
        
      return  acc + price * item.quantity;
    }, 0)
  };
  
  const handleQuantityChange = async (id,quantity) => {
    if (quantity < 1) return;
    try {
        const res = await axios.put(`/api/v1/updateCartQuantity/${id}`, { quantity}, { withCredentials: true });
        console.log(res.data);
         setProducts((prev) =>
        prev.map((item) => (item._id === id ? { ...item, quantity: quantity } : item))
      );
    } catch (error) {
        console.log(error);
    }
  }
  if (loading) return <div className="text-center py-20 text-lg">Loading cart...</div>;
  if (products.length === 0) return <div className="text-center py-20 text-lg">Your cart is empty</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      <div className="space-y-6">
        {products.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-5 p-5 bg-white rounded-xl shadow">
            <img
              src={item.productId.images[0]}
              alt={item.productId.productName}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.productId.productName}</h2>
              <p className="text-gray-500">{item.productId.category}</p>
              <p className="mt-1 text-gray-700">
                Price: Rs:{item.productId.price - item.productId.discountPrice }
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-lg font-semibold">
              Rs:{(item.productId.price - item.productId.discountPrice) * item.quantity}
            </div>
            <button
              onClick={() => handleRemove(item._id)}
              className="ml-4 mt-2 md:mt-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total and Checkout */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow">
        <p className="text-2xl font-bold">Total: Rs:{getTotal()}</p>
        <button onClick={() => navigate("/checkOut")} className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
