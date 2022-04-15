import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getInitialProductList} from "../Redux/ProductFilters/index"
import { productFiltersRuducer } from "../Redux/ProductFilters/productfilter";
import Products from "../Component/Products";

function ProductList() {
  const dispatch = useDispatch();
//   const filters = useSelector(productfilter);

  const getproduct = async() => {
      try {
        const products = await dispatch(getInitialProductList())
        localStorage.setItem("productList", JSON.stringify(products.payload.data.products))
      }catch(error){
        console.log("error", error)
      }
  }

  useEffect(() => {
    getproduct()
  }, [])
  
  return (
    <div>
    <div className="text-3xl font-bold text-gray-600 flex justify-center my-5">List Of Products</div>

    <Products />
  </div>
  )
}

export default ProductList;
