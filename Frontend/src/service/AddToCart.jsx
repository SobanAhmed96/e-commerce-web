import axios from "axios";

export const addToCart = async (id, navigate) => {
  try {
    const reslogdata = await axios.get(`/api/v1/isLogin`);
    const isLogin = reslogdata.data.success === true;

    if (isLogin) {
      const res = await axios.post("/api/v1/addToCart/", { productId: id });
      console.log("Add To Cart Response:", res.data);
      return res.data;
    } else {
      navigate("/login");
    }
  } catch (error) {
    console.log("Add To Cart Error:", error);
    if (error.response?.status === 401) {
      navigate("/login");
    }
  }
};
