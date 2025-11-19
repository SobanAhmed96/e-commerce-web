import axios from 'axios';
import React, { useEffect } from 'react'

export const GetAllProducts =async () => {
            try {
              const res = await axios.get(`/api/v1/getAllProduct`);
              if(res.data.data){
                 const data = res.data.data;
                 return data;
              }else{
                return [];
              }
            } catch (error) {
                console.log(error);
            }
}
