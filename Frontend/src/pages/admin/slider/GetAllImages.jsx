import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import EditSliderImage from "./EditSliderImage";
import { useNavigate, useParams } from "react-router-dom";

const GetAllImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoding] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      setLoding(true);
      try {
        const res = await axios.get("/api/v1/getSliderImage");
        const imgSet = res.data?.data[0]?.images;
        console.log(imgSet);
        setImages(imgSet);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoding(false);
      }
    };
    getData();
  }, []);

  const handelEdit = (id) => {
    navigate(`/adminDashboard/sliderImageEdit/${id}`);
  };

  const handelDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/v1/deleteSliderImg/${id}`);

      alert("Image deleted successfully!");

      setImages((pre) => pre.filter((img) => img._id !== id));
    } catch (error) {
      console.log(`Deleting Error: ${error}`);
      alert("Failed to delete image. Try again.");
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-3xl font-bold text-center">All SLider Images</h1>
      {loading ? (
        <div className="text-center text-gray-800">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="text-center text-gray-800">Not Images Found.</div>
      ) : (
        <div className="m-6 grid md:grid-cols-4 sm:grid-cols-2">
          {images.map((img, index) => {
            return (
              <div
                key={index}
                className="flex flex-col m-4 p-2 items-center bg-gray-300 justify-center rounded-2xl cursor-pointer"
              >
                <div className="cflex items-center m-4 sm:mt-6">
                  <img
                    src={img.url}
                    alt={`Slider ${index}`}
                    width={300}
                    height={300}
                    className="rounded-3xl"
                  />
                </div>
                <div className="mt-4 flex w-full justify-center">
                  <Button
                    children="Edit"
                    onClick={() => handelEdit(img._id)}
                    variant="primary"
                    className="mr-4"
                  />
                  <Button
                    children="Delete"
                    variant="danger"
                    onClick={() => handelDelete(img._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GetAllImages;
