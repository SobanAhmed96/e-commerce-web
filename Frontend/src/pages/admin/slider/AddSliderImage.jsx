import React, { useState } from "react";
import axios from "axios";

const AddSliderImage = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  // 🧩 Handle file select + preview
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(urls);
  };

  // 🧩 Handle upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one image!");
      return;
    }
    if (files.length > 15) {
      alert("You can only upload a maximum of 15 images at once!");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      files.map((file) => formData.append("imagesSlider", file));

      const res = await axios.post("/api/v1/addSliderImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Upload Successfully");
      console.log(res.data);
      setFiles([]);
      setPreview([]);
    } catch (error) {
      console.error("Add Slider Image Error:", error);
      alert(error?.response.data?.message ||"Something went wrong while uploading. Please try again.");
    }finally{
        setUploading(false);
    }
  };
  // 🧩 JSX UI
  return (
    <div className="bg-white p-8 w-10/12 mt-10 mx-auto flex flex-col rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold font-serif text-center text-gray-800">
        Add Slider Images
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-6">
        <label className="text-gray-700 font-medium mb-2">
          Select Images (You can choose multiple)
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />

        {preview.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 h-80 overflow-y-auto p-2 border rounded">
            {preview.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="w-full h-48 object-cover rounded border"
                />
                <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full absolute top-2 right-2">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className={`w-full rounded-3xl mt-6 p-2 text-white text-lg font-semibold transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </form>
    </div>
  );
};

export default AddSliderImage;
