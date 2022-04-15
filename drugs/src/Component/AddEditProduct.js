import React, {useState} from 'react'
import { Modal, Text } from "@nextui-org/react";
import { addProduct, getProducts } from '../Redux/ProductFilters/index';
import { useDispatch } from "react-redux";
import moment from "moment";

function AddEditProduct({editMode, editProduct, closeAddForm}) {
  const dispatch = useDispatch();
  const [drugs, setdrugs] = useState(localStorage.getItem("productList")
  ? JSON.parse(localStorage.getItem("productList"))
  : [])
  const [productName, setproductName] = useState(editProduct?.name === "" ? "" : editProduct?.name)
  const [productPrice, setproductPrice] = useState(editProduct?.prices?.length > 0 ? editProduct?.prices[0]?.price : "")
  const [priceId, setpriceId] = useState(1)

  
  // logic to add/edit mobile subscribers
  const addEditProduct = () => {
    if (editMode) {
      //editMobileSubs();
    } else {
      addNewProduct();
    }
  };

  const addNewProduct = async() => {
    try {
      
        //declaring an array to hold new product added by user
        let newProduct = [
          ...drugs,
          {
            id: drugs.length + 1,
            name: productName,
            prices: [
              {
                id: priceId,
                date: moment().format(),
                price: productPrice
              }
            ]
          }
        ];
      await dispatch(addProduct(newProduct))
      setTimeout(async() => {
        await dispatch(getProducts())
      }, 300)
    }catch(error){

    }

    
    // setpriceId(priceId + 1)
    closeAddForm()
    window.location.reload()
  
  } 
  return (
    <div>
    <Modal.Header>
      <Text id="modal-title" size={18}>
        <Text b size={18}>
          {editMode ? `Edit Product ` : `Add Product`}
        </Text>
      </Text>
    </Modal.Header>
    <Modal.Body>
      <div className="grid md:grid-cols-2 grid-cols-1 ">
        <div className="mx-1 mb-2">
        <input
            type="text"
            required
            defaultValue={productName || ""}
            placeholder="Name*"
            onChange={(e) => setproductName(e.target.value)}
            className="w-full h-10 rounded-lg border-2 px-2 focus:outline-gray-400"
          />
        </div>
        <div className="mx-1 mb-2">
        <input
            type="number"
            required
            defaultValue={productPrice || ""}
            placeholder="Price*"
            onChange={(e) => setproductPrice(e.target.value)}
            className="w-full h-10 rounded-lg border-2 px-2 focus:outline-gray-400"
          />
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <button
        className="bg-blue-700 md:w-40 w-full rounded-lg h-10 text-white"
        onClick={addEditProduct}
      >
        {editMode ? `Save` : `Add Product`}
      </button>
    </Modal.Footer>
  </div>
  )
}

export default AddEditProduct