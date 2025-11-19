import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setMessage(null);
    setLoading(true);

    try {
      const res = await axios.post("/api/v1/login", { email, password });
      console.log(res.data);

      setMessage("Login successfully!");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        if (res.data?.data.email == "soban@gmail.com") {
          navigate("/adminDashboard");
        } else {
            navigate('/');
        }

        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white">
      {/* Signup Box */}
      <div className="flex flex-1 justify-center items-center mt-24 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Login
          </h1>

          <div className="flex flex-col gap-5">
            <InputField
              placeholder="Enter Email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <InputField
              placeholder="Enter Password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {/* Error or Success Message */}
            {message && (
              <p
                className={`text-center text-sm font-medium ${
                  message.startsWith("✅") ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`mt-4 w-full ${
                loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
              } text-white py-3 rounded-lg font-semibold transition duration-200`}
            >
              {loading ? "Creating..." : "Log in"}
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Create New Account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
