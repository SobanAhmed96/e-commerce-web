import React, { useState } from "react";
import axios from "axios";
import MessageShow from "../../../components/MessageShow";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("second");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [instructions, setinstructions] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/checkOut", { name,phone,address,city,zip,instructions ,state});
      toast.success("Order placed successfully");
      setname("");
      setphone("");
      setaddress("");
      setcity("");
      setstate("");
      setzip("");
      setinstructions("");
      navigate('/');
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 flex justify-center">
      <MessageShow/>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Delivery Information</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setphone(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e)=> setcity(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={state}
          onChange={(e)=> setstate(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => setzip(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <textarea
          name="instructions"
          placeholder="Delivery Instructions (Optional)"
          value={instructions}
          onChange={(e)=> setinstructions(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Delivery;
