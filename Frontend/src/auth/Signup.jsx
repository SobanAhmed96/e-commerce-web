import React, { useState } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handelChange = (e) => {
    const image = e.target.files[0];
    setProfile(image);
    setPreview(URL.createObjectURL(image));
  };
  const handleSubmit = async () => {
    setMessage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("file", profile);
      const res = await axios.post("/api/v1/signUp",formData,{
        headers: {"Content-Type": "multipart/form-data"}
      });
      console.log(res.data);
      setMessage("✅ User created successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      setProfile(""),
      setPreview("")
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
            Create an Account
          </h1>

          <div className="flex flex-col gap-5">
            <InputField
              placeholder="Enter Username"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
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
            <InputField
              placeholder="Enter Profile Image"
              label="Profile Image"
              type="file"
              onChange={handelChange}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {preview && (
              <div className="w-full h-30 ms-auto">
                <img src={preview} alt="" className="w-30 h-30 object-cover" />
              </div>
            )}
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
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-500 hover:underline">
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
