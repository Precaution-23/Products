import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getInitialProductList} from "../Redux/ProductFilters/index"
import { productFiltersRuducer } from "../Redux/ProductFilters/productfilter";
import Products from "../Component/Products";
import { Modal } from "@nextui-org/react";
import AddEditProduct from "../Component/AddEditProduct";

function ProductList() {
  const dispatch = useDispatch();
  const [editMode, seteditMode] = useState(false)
//   const filters = useSelector(productfilter);

const [openForm, setOpenForm] = useState(false)

//open add/edit product form
const openAddForm = () => {
  setOpenForm(true)
  seteditMode(false)
}

 //close add/edit product form
 const closeAddForm = () => setOpenForm(false)

 // fetching of initial product lists
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

    <div className="flex md:justify-end justify-center mt-10 mb-10">
          <button className="bg-blue-700 md:w-40 w-full ipad-pro:w-[32%] ipad:w-[32%] next-hub:w-[32%] rounded-lg h-10 text-white" onClick={openAddForm}>
            Add Product
          </button>
        </div>

    <Products />

    <Modal
          preventClose
          width="600px"
          closeButton
          aria-labelledby="modal-title"
          open={openForm}
          onClose={closeAddForm}
        >
            <AddEditProduct editMode={editMode} />
        </Modal>
  </div>
  )
}

export default ProductList;
