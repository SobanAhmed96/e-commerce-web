import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import MessageShow from "../../../components/MessageShow";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/getOrderById/${id}`);
        console.log("Order Details:", res.data.data);
        setOrder(res.data.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-lg mt-10">Loading order details...</p>
    );
  }

  if (!order) {
    return (
      <p className="text-center text-lg text-red-500 mt-10">Order not found.</p>
    );
  }

  const { deliveryInfo, products, totalAmount, status, createdAt } = order;
  const handelProcessing = async (id) => {
    try {
      if (status === "processing") {
        toast.error("Already Status Update");
      } else {
        await axios.put(`/api/v1/statusUpdate/${id}`, { status: "processing" });
        toast.success("Status Update Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelShipped = async (id) => {
    try {
      if (status === "shipped") {
        toast.error("Already Status Update");
      } else {
          await axios.put(`/api/v1/statusUpdate/${id}`, { status: "shipped" });
        toast.success("Status Update Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelivered = async (id) => {
    try {
      if (status === "delivered") {
        toast.error("Already Status Update");
      } else {
          await axios.put(`/api/v1/statusUpdate/${id}`, { status: "delivered" });
        toast.success("Status Update Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelCancelled = async (id) => {
    try {
      if (status === "cancelled") {
        toast.error("Already Status Update");
      } else {
          await axios.put(`/api/v1/statusUpdate/${id}`, { status: "cancelled" });
        toast.success("Status Update Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <MessageShow />
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Order ID: <span className="text-gray-600">{order._id}</span>
        </h1>

        <p className="text-gray-700 mb-2">
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              status === "pending"
                ? "text-yellow-600"
                : status === "delivered"
                ? "text-green-600" : status === "cancelled"? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {status.toUpperCase()}
          </span>
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Order Date:</strong> {new Date(createdAt).toLocaleString()}
        </p>

        <div className="border-t my-4"></div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Delivery Information
        </h2>
        <p>
          <strong>Name:</strong> {deliveryInfo?.name}
        </p>
        <p>
          <strong>Phone:</strong> {deliveryInfo?.phone}
        </p>
        <p>
          <strong>Address:</strong> {deliveryInfo?.address},{" "}
          {deliveryInfo?.city}, {deliveryInfo?.state}
        </p>
        <p>
          <strong>Zip:</strong> {deliveryInfo?.zip}
        </p>

        <div className="border-t my-4"></div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Ordered Products
        </h2>
        <div className="space-y-3">
          {products.map((p, i) => (
            <div
              key={i}
              className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <img
                src={p.productId?.images?.[0] || "/placeholder.png"}
                alt={p.productId?.productName}
                className="w-20 h-20 object-cover rounded-lg mr-4 border"
              />
              <div>
                <p className="font-semibold">{p.productId?.productName}</p>
                <p>Qty: {p.quantity}</p>
                <p>Price: {p.productId.price - p.productId.discountPrice}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-green-600">Rs {totalAmount}</span>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold">
          <Button
            children="Processing"
            onClick={() => handelProcessing(order._id)}
          />
          <Button children="Shipped" 
            onClick={() => handelShipped(order._id)}

          />
          <Button children="Delivered" 
            onClick={() => handelDelivered(order._id)}
          />
          <Button children="Cancelled" className="bg-red-500"
            onClick={() => handelCancelled(order._id)}

           />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
