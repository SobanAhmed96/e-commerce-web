import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const AdminGetAllProduct = () => {
  const [product, setProduct] = useState([]);
  const [loding, setLoding] = useState(false);
  const [totalpage, setTotalpage] = useState();
  const [pagenum, setPageNumber] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoding(true);
        const res = await axios.get(`/api/v1/getAllProduct?pagenum=${pagenum}&limit=10`);
        const data = res.data?.data;
        setProduct(data);
        console.log(res.data.totalPages);
        setTotalpage(res.data.totalPages);
      } catch (error) {
        console.log(`Get Product Error: ${error}`);
      } finally {
        setLoding(false);
      }
    };
    getData();
  }, [pagenum]);

  const handelEdit = (id) => {
    navigate(`/adminDashboard/editProduct/${id}`)
  }
  const handelDelete =async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if(!confirmDelete) return;
    setProduct((prev) => prev.filter((p) => p._id !== id));
    try {
      await axios.delete(`/api/v1/deleteProduct/${id}`);
      alert("Product Delete Successfully");
    } catch (error) {
      console.log(`Product Delete Error: ${error}`);
    }
  }
  const handelNext = () => {
    if(pagenum < totalpage){
      setPageNumber((next) => next + 1);
    }
  }
  const handelperv = () => {
    if(pagenum > 1){
      setPageNumber((prev) => prev - 1);
    }
  }
  return (
    <div className="w-full">
      {loding ? (
        <h1 className="text-2xl font-bold font-serif">Loding...</h1>
      ) : product.length === 0 ? (
        <h1 className="text-2xl font-bold font-serif">Not Found Product</h1>
      ) : (
        <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  mb-5">
          {product.map((iteam, key) => (
            <div
              key={key}
              className=" bg-gray-200 rounded-xl hover:shadow shadow-black transition p-4"
            >
              <div className="flex justify-center">
                <img
                  src={iteam.images[0]}
                  alt={`Image-${key}`}
                  className="rounded w-full h-40 object-fill"
                />
              </div>
              <div className="mt-5 text-left">
                <h1 className="font-semibold truncate text-gray-800">
                  {iteam.productName}
                </h1>
                {iteam.discountPrice ? (
                  <div>
                    <h1 className="text-green-600 font-bold">
                      Rs:${iteam.price - iteam.discountPrice}
                    </h1>
                    <h1 className="line-through text-gray-500">
                      Rs:${iteam.price}
                    </h1>
                  </div>
                ) : (
                  <h1 className="text-green-600 font-medium">
                    Rs:${iteam.price}
                  </h1>
                )}
                <div className="mt-4 flex gap-3">
                  <Button
                    children="Edit"
                    className="ps-4 pe-4"
                    onClick={() => handelEdit(iteam._id)}
                    variant="primary"
                  />
                  <Button
                    children="Delete"
                    className="ps-4 pe-4"
                    variant="danger"
                    onClick={() => handelDelete(iteam._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-4 items-center justify-center w-full">
        <Button onClick={handelperv} disabled={pagenum === 1}>Prev</Button>
        <h1>Page<span>{pagenum}</span>of <span>{totalpage}</span></h1>
        <Button onClick={handelNext} disabled={pagenum === totalpage}>Next</Button>
      </div>
    </div>
  );
};

export default AdminGetAllProduct;
