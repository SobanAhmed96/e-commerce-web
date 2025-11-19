import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import axios from "axios";

const EditSliderImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loding, setLoding] = useState(false);
  const handelChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
       console.log(id);

    try {
      setLoding(true);
       
      const res = await axios.put(`/api/v1/updateSliderImg/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });   
      alert("Image updated successfully!");
      navigate("/adminDashboard/getAllSliderImage");
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image. Check console for details.");
    } finally {
      setLoding(false);
    }
  };
  return (
    <div className="mt-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl text-center">EditSliderImage</h1>
      <form onSubmit={handelSubmit} className="m-4">
        <input
          type="file"
          onChange={handelChange}
          className="w-full border pl-4 pr-4 pt-2 pb-2 rounded"
        />
        <div className="flex flex-col m-5 items-center justify-center">
          {preview && <img src={preview} alt="" className="" width={300} />}
          <Button
            children={`${loding ? "Updating..." : "Update Image"}`}
            className="w-full mt-4"
            disabled={loding}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSliderImage;
