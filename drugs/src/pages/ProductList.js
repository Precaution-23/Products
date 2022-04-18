import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {getInitialProductList} from "../Redux/ProductFilters/index"
import Products from "../Component/Products/Products";
import { Modal } from "@nextui-org/react";
import AddEditProduct from "../Component/AddEditProduct/AddEditProduct";

function ProductList() {
  const dispatch = useDispatch();
  const [editMode, seteditMode] = useState(false)
  const [loading, setloading] = useState(false)
  const [initialProducts, setinitialProducts] = useState(
    localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []
  );

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
        setloading(true)
        const products = await dispatch(getInitialProductList())
        setinitialProducts(products.payload.data.products)
        localStorage.setItem("productList", JSON.stringify(products.payload.data.products))
        setloading(false)
      }catch(error){
       alert("There was an error trying to fetch data. Please try again")
      }
  }

  useEffect(() => {
      // checks if initial product list is already loaded and set into local storage or not
      if(initialProducts.length > 0){
      }else {
        getproduct()
      }
  }, [])
  
  return (
    <div>
    <div className="page-heading">List Of Products</div>

    <div className="flex md:justify-end justify-center mt-5 mb-5">
          <button className="add-button" onClick={openAddForm}>
            Add Product
          </button>
        </div>

    <Products loading={loading} initialProducts={initialProducts}  />

    <Modal
          preventClose
          width="600px"
          closeButton
          aria-labelledby="modal-title"
          open={openForm}
          onClose={closeAddForm}
        >
            <AddEditProduct editMode={editMode} closeAddForm={closeAddForm} />
        </Modal>
  </div>
  )
}

export default ProductList;
