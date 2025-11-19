import axios from "axios";
import React, { useEffect, useState } from "react";

const Slider = () => {
  const [count, setCount] = useState(0);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/v1/getSliderImage");
        const url = res.data.data[0].images || [];
        setImgUrl(url);
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (imgUrl.length === 0) return;
    const interval = setInterval(() => {
      setCount((val) => (val + 1) % imgUrl.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [imgUrl]);

  return (
    <div className="relative w-300 h-[400px] overflow-hidden">
      {imgUrl.map((content, index) => (
        <img
          key={index}
          src={content.url}
          loading="lazy"
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000 ${
            index === count ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-4 flex items-center justify-center w-full">
        {imgUrl.map((_, index) => (
          <button
            key={index}
            onClick={() => setCount(index)}
            className={`h-3 w-3 m-1 rounded-full transition border ${
              index === count ? "bg-blue-600" : "bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
