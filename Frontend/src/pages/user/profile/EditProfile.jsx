import React, { useEffect, useState } from "react";
import IsloginCheck from "../IsloginCheck";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import axios from "axios";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const [oldpassword, setOldPassword] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/v1/getUserById");
        const data = response.data.data;

        setUsername(data.username);
        setEmail(data.email);
        setFile(data.profileImage); // string URL
        setPreview(data.profileImage);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const handlefileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("newpassword", newpassword);
      formData.append("email", email);
      formData.append("oldpassword", oldpassword);

      if (file instanceof File) {
        formData.append("profileImage", file);
      }

      const res = await axios.put("/api/v1/updateUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      console.log(res.data);

    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Error updating profile!");
    }
  };

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <IsloginCheck />
      <h1 className="text-2xl font-bold pt-20">Edit Profile</h1>

      <div className="mt-10 max-w-md bg-grey-100 p-6 rounded shadow">
        {preview && (
          <img
            src={preview}
            alt="Profile Preview"
            className="mb-4 w-32 h-32 rounded-full object-cover"
          />
        )}

        <InputField
          label="Profile Image"
          type="file"
          className="mb-4"
          onChange={handlefileChange}
        />

        <InputField
          label="Profile Name"
          type="text"
          className="mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputField
          label="Profile Email"
          type="text"
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          label="Profile Previous Password"
          type="password"
          className="mb-4"
          placeholder="Enter your previous password"
          value={oldpassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <InputField
          label="Profile New Password"
          type="password"
          className="mb-4"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          children="Update Profile"
          className="w-full bg-blue-400 hover:bg-blue-500"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditProfile;
