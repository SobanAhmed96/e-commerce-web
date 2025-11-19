import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const GetAllProduct = () => {
  const [cardData, setCardData] = useState([]);
  const [loding, setLoding] = useState(false);
  const [pagenum, setPageNumber] = useState(1);
  const [totalPage, setTotalpage] = useState(1);
  const  navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoding(true);
        const res = await axios.get(`/api/v1/getAllProduct?pagenum=${pagenum}&limit=6`);
        const dataFilter = res.data?.data;
        setCardData(dataFilter);
        setTotalpage(res.data?.totalPages || 1);
        
      } catch (error) {
        console.log(`Get All Product Error: ${error}`);
      } finally {
        setLoding(false);
      }
    };
    getData();
  }, [pagenum]);

  const handelClick  = (id) =>{
    navigate(`/productDetails/${id}`)
  };

  const handelpre = () => {
    if(pagenum > 1){
      setPageNumber((prev) => prev - 1);
    }
  }
  const handelNext = () => {
    if(pagenum < totalPage){
      setPageNumber((prev) => prev + 1);
    }
  }
  return (
    <div className="mt-5 flex flex-col justify-center items-center m-5">
      <h1 className="text-3xl font-bold font-serif">
        Just For You
      </h1>
      {loding ? (
        <h1 className="text-2xl font-bold">Loding....</h1>
      ) : cardData.length === 0 ? (
        <h1 className="text-2xl font-bold font-serif">Not Found</h1>
      ) : (
        <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5  mb-5">
          {cardData.map((iteam, key) => (
            <button onClick={() => handelClick(iteam._id)} key={key}>
            <div
              className=" bg-gray-100 rounded-xl hover:shadow shadow-black transition p-6"
            >
              <div className="flex justify-center">
                <img
                  src={iteam.images[0]}
                  alt={`Image-${key}`}
                  className="rounded-2xl w-full h-40 object-fill"
                />
              </div>
              <div className="mt-5 text-left">
                <h1 className="font-semibold truncate text-gray-800">
                  {iteam.productName}
                </h1>
                {iteam.discountPrice ? (
                  <div>
                    <h1 className="text-green-600 font-bold">
                      Rs:{iteam.price - iteam.discountPrice}
                    </h1>
                    <h1 className="line-through text-gray-500">Rs:{iteam.price}</h1>
                  </div>
                ) : (
                  <h1 className="text-green-600 font-medium">Rs:{iteam.price}</h1>
                )}
              </div>
            </div>
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2 justify-center items-center">
      <Button children="Prev" onClick={handelpre} disabled={pagenum === 1}/>
       <span>
        Page {pagenum} of {totalPage}
       </span>
      <Button children="Next" onClick={handelNext} disabled={pagenum === totalPage}/>
      </div>
    </div>
  );
};

export default GetAllProduct;