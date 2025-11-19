import React, { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import axios from "axios";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import MessageShow from "../../../components/MessageShow";
import toast from "react-hot-toast";

const AddProduct = () => {
  // states
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("active");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // handle images

  useEffect(() => {
    if (id) {
      const prodact = async () => {
        try {
          const findProduct = await axios.get(`/api/v1/getProduct/${id}`);
          console.log(findProduct.data.data);
          const found = findProduct.data.data;
          setProductName(found.productName);
          setCategory(found.category);
          setBrand(found.brand);
          setDescription(found.description);
          setPrice(found.price);
          setDiscountPrice(found.discountPrice);
          setQuantity(found.quantity);
          setStatus(found.status);
          setPreview(found.images || []);
        } catch (error) {
          console.log(error);
        }
      };
      prodact();
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFIle = Array.from(e.target.files);
    if (selectedFIle.length > 5) {
      alert("You can upload a maximum of 5 images.");
      e.target.value = "";
      return;
    }
    setImages(selectedFIle);
    const url = selectedFIle.map((url) => URL.createObjectURL(url));
    setPreview(url);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    formData.append("quantity", quantity);
    formData.append("status", status);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      let res;
      if(id){
          res = await axios.post(`/api/v1/updateProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product Update successfully!");

setTimeout(() => navigate("/adminDashboard/getAllProduct"), 1500);
      }
      else{
       res = await axios.post("/api/v1/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
    }
      console.log("Server response:", res.data);

      setProductName("");
      setCategory("");
      setBrand("");
      setDescription("");
      setPrice("");
      setDiscountPrice("");
      setQuantity("");
      setStatus("active");
      setImages([]);
    } catch (err) {
      console.error("Error uploading product:", err);
      setMessage("❌ Failed to add product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <MessageShow />
      <h1 className="text-3xl font-bold mb-5">Add New Product</h1>
      <div className="text-left max-w-4xl w-full p-6 bg-white shadow-lg rounded-lg">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <InputField
            label="Product Name"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <InputField
            label="Category"
            placeholder="Enter Product Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <InputField
            label="Brand"
            placeholder="Enter Product Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <InputField
            label="Description"
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <InputField
            type="number"
            label="Price"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <InputField
            type="number"
            label="Discount Price"
            placeholder="Enter Discount Price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />

          <InputField
            type="number"
            label="Quantity"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          {/* Status dropdown */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
            />
            {preview.length > 0 && (
              <div className="grid grid-cols-3 mt-2 rounded p-2 border-1">
                {preview.map((src, key) => (
                  <div key={key}>
                    <img
                      src={src}
                      alt={src}
                      className="w-65 mt-2 h-40 rounded object-fill ms-2 me-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 w-full rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
