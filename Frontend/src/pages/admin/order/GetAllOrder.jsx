import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const GetAllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/v1/getOrder");
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, []);

  const handelOrder = (id) => {
    navigate(`/adminDashboard/orderDetails/${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Orders
      </h1>

      {loading ? (
        <p className="text-center text-lg">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
          <table className="min-w-full text-left text-gray-700">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-mono text-sm truncate max-w-[120px]">
                    {order._id}
                  </td>
                  <td className="py-3 px-4">
                    {order.products.map((p, i) => (
                      <div key={i} className="text-sm text-gray-800">
                        • {p.productName} ({p.quantity})
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    Rs {order.totalAmount}
                  </td>
                  <td
                    className={`py-3 px-4 font-medium ${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "delivered"
                        ? "text-green-600"
                        : "text-blue-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.deliveryInfo?.address}, {order.deliveryInfo?.city}
                  </td>
                  <td>
                    <Button
                      onClick={() => handelOrder(order._id)}
                      className="cursor-pointer"
                      children="Details"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllOrder;
