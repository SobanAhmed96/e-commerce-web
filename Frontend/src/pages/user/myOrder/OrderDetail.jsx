import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Button";
import MessageShow from "../../../components/MessageShow";
import toast from "react-hot-toast";
import IsloginCheck from "../IsloginCheck";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/getOrderById/${id}`);
      setOrder(res.data.data);
    } catch (error) {
      console.error("Fetch Order Error:", error);
      if (error.status == 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) return <p className="text-center pt-20">Loading order...</p>;
  if (!order) return <p className="text-center pt-20">Order not found</p>;

  const { deliveryInfo, products, totalAmount, status, createdAt } = order;
  const handelCancelled = async () => {
    try {
      if (window.confirm("Are you sure")) {
        if(status == "cancelled"){
          toast.error("Already Cancelled");
        }
        else{
        await axios.put(`/api/v1/statusUpdate/${id}`, { status: "cancelled" });
        toast.success("Product Cancelled Successfully");
        fetchOrder();        
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 pt-20 bg-gray-50 min-h-screen">
      <IsloginCheck/>
      <MessageShow />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h1>

        {/* Order Info */}
        <div className="mb-6 border-b pb-4">
          <p>
            <span className="font-semibold">Order ID:</span> {order._id}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-bold ${
                status === "pending"
                  ? "text-yellow-500"
                  : status === "delivered"
                  ? "text-green-600"
                  : status === "cancelled"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {status.toUpperCase()}
            </span>
          </p>
        </div>

        {/* Delivery Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Delivery Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-2 text-gray-600">
            <p>
              <strong>Name:</strong> {deliveryInfo.name}
            </p>
            <p>
              <strong>Phone:</strong> {deliveryInfo.phone}
            </p>
            <p>
              <strong>Address:</strong> {deliveryInfo.address}
            </p>
            <p>
              <strong>City:</strong> {deliveryInfo.city}
            </p>
            <p>
              <strong>State:</strong> {deliveryInfo.state}
            </p>
            <p>
              <strong>ZIP:</strong> {deliveryInfo.zip}
            </p>
            <p>
              <strong>Instructions:</strong> {deliveryInfo.instructions}
            </p>
          </div>
        </div>

        {/* Products List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Products</h2>
          <div className="space-y-4">
            {products.map((p, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.productId?.images?.[0]}
                    alt={p.productId?.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {p.productId?.productName}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {p.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  Rs {p.productId?.price - p.productId?.discountPrice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total and Canelled */}
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <Button children="Cancelled" onClick={handelCancelled} />
          <p className="text-xl font-bold text-gray-800">
            Total Amount: Rs {totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
