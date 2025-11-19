import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IsloginCheck from "../IsloginCheck";
import Button from "../../../components/Button";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/getUserOrder"); // 👈 User token se apne orders
        setOrders(res.data.data || []);
        console.log(res.data);
        
      } catch (error) {
        console.error("Fetch orders error:", error);
        if(error.status == 401){
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filter]);
  const filterStatus = filter == "ALL" ? orders : orders.filter((o)=> o.status.toUpperCase() === filter);

  if(filterStatus.length == 0){
    return <div> 
      <div className="flex justify-center pt-20">
      <Button children="PROCESSING" className="m-3" onClick={() => setFilter("PROCESSING")}/>
      <Button children="SHIPPED" className="m-3" onClick={() => setFilter("SHIPPED")}/>
      <Button children="DELIVERED" className="m-3" onClick={() => setFilter("DELIVERED")}/>
      <Button children="CANCELLED" className="m-3" onClick={() => setFilter("CANCELLED")}/>
     </div>
      <p className="text-center pt-20 text-gray-600">
        No orders found for "{filter}"
      </p>
      </div>

  }
  if (loading)
    return <p className="text-center pt-20 text-lg">Loading your orders...</p>;

  if (orders.length === 0)
    return (
      <p className="text-center pt-20 text-gray-600">
        You haven’t placed any orders yet.
      </p>
    );

  return (
    <div className="pt-20 bg-gray-50 min-h-screen p-4">
      <IsloginCheck/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Orders
      </h1>
     <div className="flex justify-center m-4">
      <Button children="PROCESSING" className="m-3" onClick={() => setFilter("PROCESSING")}/>
      <Button children="SHIPPED" className="m-3" onClick={() => setFilter("SHIPPED")}/>
      <Button children="DELIVERED" className="m-3" onClick={() => setFilter("DELIVERED")}/>
      <Button children="CANCELLED" className="m-3" onClick={() => setFilter("CANCELLED")}/>
     </div>
      <div className="space-y-6">
        {filterStatus.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-lg p-5 hover:shadow-md transition"
          >
            {/* Order Info */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <div>
                <p className="text-gray-600 text-sm">
                  Order ID: <span className="font-mono">{order._id}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    order.status === "pending"
                      ? "text-yellow-500"
                      : order.status === "delivered"
                      ? "text-green-600"
                      : order.status === "red"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {order.status.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-2">
              {order.products.slice(0, 2).map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={p.productId?.images?.[0]}
                    alt={p.productId?.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {p.productId?.productName}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {p.quantity}</p>
                  </div>
                </div>
              ))}
              {order.products.length > 2 && (
                <p className="text-gray-500 text-sm">
                  +{order.products.length - 2} more items
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold text-gray-800">
                Total: Rs {order.totalAmount}
              </p>
              <button
                onClick={() => navigate(`/orderDetails/${order._id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
