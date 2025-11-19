import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import IsloginCheck from '../IsloginCheck';

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get user details
        const res = await axios.get(`/api/v1/getUserById`);
        setData(res.data.data);

        // Get user orders
        const orderRes = await axios.get(`/api/v1/getUserOrder`);
        setOrder(orderRes.data.data || []);
        console.log("User Orders:", orderRes.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [id]);
   const handleEdite = () => {
    navigate(`/editProfile/${id}`)
   }
  if (!data) {
    return (
      <h1 className="text-center pt-20 text-xl font-bold text-gray-600">
        Loading Profile...
      </h1>
    );
  }

  return (
    <div>
        <IsloginCheck />
      <h1 className='text-2xl text-center font-bold pt-20'>
        Manage My Account
      </h1>

      {/* ---------- TOP SECTION ---------- */}
      <div className='flex flex-wrap gap-5 justify-center p-10'>

        {/* LEFT — USER PROFILE */}
        <div className='bg-gray-300 p-6 rounded w-96 shadow'>
          <h1 className='text-xl font-semibold mb-4'>Personal Profile</h1>

          <div className='flex gap-3 items-center'>
            <img
              src={data.profileImage}
              alt="profile"
              className='rounded-full w-20 h-20 object-cover shadow'
            />

            <div>
              <p><span className='font-bold'>Username:</span> {data.username}</p>
              <p><span className='font-bold'>Email:</span> {data.email}</p>
            </div>
          </div>

          <Button
            children="Edit Profile"
            className="mt-5 w-full bg-blue-400 hover:bg-blue-500"
            onClick={handleEdite}
          />
        </div>

        {/* RIGHT — LAST DELIVERY INFO */}
        <div className='bg-gray-300 p-6 rounded w-96 shadow'>
          <h1 className='text-xl font-semibold mb-4'>Delivery Info</h1>

          {order.length > 0 ? (
            <div>
              <p><span className='font-bold'>Name:</span> {order[0].deliveryInfo?.name}</p>
              <p><span className='font-bold'>Phone:</span> {order[0].deliveryInfo?.phone}</p>
              <p><span className='font-bold'>Address:</span> {order[0].deliveryInfo?.address}</p>
              <p><span className='font-bold'>City:</span> {order[0].deliveryInfo?.city}</p>
              <p><span className='font-bold'>State:</span> {order[0].deliveryInfo?.state}</p>
              <p><span className='font-bold'>Zip:</span> {order[0].deliveryInfo?.zip}</p>
            </div>
          ) : (
            <p className="text-gray-700">No orders found.</p>
          )}
        </div>

      </div>

      {/* ---------- ORDERS LIST SECTION ---------- */}
      <div className='px-10 pb-20'>
        <h1 className="text-2xl font-bold text-gray-800 mb-5">Your Orders</h1>

        {order.length === 0 ? (
          <p className="text-gray-600">You have not placed any orders yet.</p>
        ) : (
          <div className='space-y-4'>

            {order.map((o, i) => (
              <div
                key={i}
                className='bg-white p-5 rounded shadow hover:shadow-md border'
              >
                <div className='flex justify-between items-center border-b pb-3 mb-3'>
                  <div>
                    <p className='text-gray-600 text-sm'>
                      Order ID: <span className='font-mono'>{o._id}</span>
                    </p>
                    <p className='text-gray-600 text-sm'>
                      Date: {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className={`font-semibold ${
                    o.status === "pending"
                      ? "text-yellow-500"
                      : o.status === "delivered"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                    {o.status.toUpperCase()}
                  </p>
                </div>

                <div className='flex gap-3 items-center'>
                  {/* only show first product image */}
                  <img
                    src={o.products[0].productId?.images?.[0]}
                    alt="product"
                    className='w-16 h-16 object-cover rounded'
                  />

                  <p className='font-medium text-gray-700'>
                    {o.products[0].productId?.productName}
                  </p>

                  {o.products.length > 1 && (
                    <span className='text-gray-500 text-sm'>
                      + {o.products.length - 1} more items
                    </span>
                  )}
                </div>

                <div className='mt-4 flex justify-between'>
                  <p className='font-semibold'>
                    Total: Rs {o.totalAmount}
                  </p>

                  <button
                    onClick={() => navigate(`/orderDetails/${o._id}`)}
                    className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
