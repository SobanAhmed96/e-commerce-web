import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import MessageShow from "../../components/MessageShow";
import { FaHeart } from "react-icons/fa";
const Product_details = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loding, setloding] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [favStatus, setfavStatus] = useState();
  const [favProductId, setfavProductId] = useState();
  const navigate = useNavigate();
  const check = async () => {
    try {
      const res = await axios.get("/api/v1/isLogin");
      setIsLogin(res.data.success === true);
    } catch (error) {
      setIsLogin(false);
      console.log(error);
    }
  };
  const getFav = async () => {
    try {
      const res = await axios.get(`/api/v1/getFavourite/${id}`);
      console.log(res.data);
      if (res.data.success === true) {
        setfavStatus(true);
        setfavProductId(res.data?.data[0]?._id);
      }else{
      setfavStatus(false)
      setfavProductId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProductData = async () => {
    try {
      const res = await axios.get(`/api/v1/getProduct/${id}`);
      setProductData(res.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    if (id) {
      getProductData();
    check();
    getFav();}
  }, [id]);

  if (!productData) {
    return (
      <div className="text-center text-gray-500 py-20 text-lg">
        Loading product details...
      </div>
    );
  }

  const handelAddToCart = async () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      try {
        setloding(true);
        const res = await axios.post("/api/v1/addToCart", { productId: id });
        console.log(res.data);
        toast.success("Successfully Add To Cart!");
      } catch (error) {
        console.log(error);
      } finally {
        setloding(false);
      }
    }
  };
  const handelBuy = () => {
    if (!isLogin) {
      navigate("/login");
    } else {
      navigate("/checkOut");
    }
  };

  const handelAddFav = async () => {
    try {
      if (!favStatus) {
        setfavStatus(true);
        await axios.post(`/api/v1/addFavourite`, { productId: id });
        toast.success("Added Favourite");
        getFav();
      } else{
        setfavStatus(false);
        if(favProductId){
          await axios.delete(`/api/v1/deleteFavourite/${favProductId}`);
          setfavProductId(null);
          toast.success("Unfavourite");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <MessageShow />
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Carousel Section */}
          <div className="w-full">
            {productData.images?.length > 0 ? (
              <Carousel
                showArrows
                showThumbs={true}
                infiniteLoop
                autoPlay
                interval={3000}
                className="rounded-2xl overflow-hidden shadow-md"
              >
                {productData.images.slice(0, 5).map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={`${productData.productName} ${idx + 1}`}
                      className="h-[400px] w-full object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="h-[400px] bg-gray-100 flex items-center justify-center rounded-2xl shadow-inner">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {productData.productName}
              </h1>
            </div>

            {/* Price Section */}
            {productData.discountPrice ? (
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-semibold text-green-600">
                  Rs:{productData.price - productData.discountPrice}
                </p>
                {productData.discountPrice && (
                  <p className="text-lg text-gray-400 line-through">
                    Rs: {productData.price}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-2xl font-semibold text-green-600">
                Rs:{productData.price}
              </p>
            )}

            {/* Info */}
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Brand:</strong> {productData.brand}
              </p>
              <p>
                <strong>Description:</strong> {productData.description}
              </p>
              <p>
                Add Favourite:{" "}
                <FaHeart
                  onClick={() => handelAddFav()}
                  className={`inline cursor-pointer `}
                  color={favStatus ? "red" : "gray"}
                  size="22"
                />
              </p>
            </div>

            {/* Add to Cart Button */}

            <Button
              onClick={handelAddToCart}
              variant="outline"
              className="bg-yellow-500 text-white hover:text-black"
              disabled={loding}
            >
              {loding ? "Add To Cart..." : "Add to Cart"}
            </Button>
            <Button onClick={handelBuy}>Buy Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_details;
