import React, { useState, useEffect } from "react";
import { Modal, Text } from "@nextui-org/react";
import { addProduct, getProducts } from "../../Redux/ProductFilters/index";
import { useDispatch } from "react-redux";
import moment from "moment";

function AddEditProduct({ editMode, editProduct }) {
  const dispatch = useDispatch();
  const [drugs, setdrugs] = useState(
    localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []
  );
  const [productName, setproductName] = useState(
    editProduct?.name === "" ? "" : editProduct?.name
  );
  const [productPrice, setproductPrice] = useState(
    editProduct?.prices?.length > 0 ? editProduct?.prices.slice(-1).pop().price : ""
  );
  const [priceId, setpriceId] = useState(7);

  // logic to add/edit mobile subscribers
  const addEditProduct = () => {
    if (editMode) {
      editProductList();
    } else {
      addNewProduct();
    }
    window.location.reload();
  };


  // function to add new products
  const addNewProduct = () => {

    // running checks to see if both fields are empty
    if(productName === "" || productPrice === ""){
      alert("Both fields required")
    }else{
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
                price: productPrice,
              },
            ],
          },
        ];
  
        // this is where the adding of new products happens
        dispatch(addProduct(newProduct));
  
        // this is where we fetch all the products
        dispatch(getProducts());
        setpriceId(priceId + 1)
      } catch (error) {
        alert("There was en error adding a new product. Try again");
      }

    }

  };

  // function to edit product
  const editProductList = () => {
    // running checks to see if both fields are empty
    if(productName === "" || productPrice === ""){
      alert("Both fields required")
    }else{
      try {
        const updateProduct = drugs.find((item) => item.id === editProduct.id);
        //declaring an array to hold new product added by user
        let updatedProduct = {
          id: updateProduct.id,
          name: productName,
          prices: [
            ...updateProduct.prices,
            {
              id: updateProduct.prices.pop().id + 1,
              date: moment().format(),
              price: productPrice,
            },
          ],
        };
  
        // this is where decision is taken on where to slot the new updated data
        drugs.splice(updateProduct.id - 1, 1, updatedProduct);
        // this is where the adding of new products happens
        dispatch(addProduct(drugs));
  
        // this is where we fetch all the products
        dispatch(getProducts());
      } catch (error) {
        alert("There was en error editing a new product. Try again");
      }
    }

  };

  useEffect(() => {

  }, [priceId])
  
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
          <span className="form-label">
            Name
          </span>
            <input
              type="text"
              required
              defaultValue={productName || ""}
              onChange={(e) => setproductName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="mx-1 mb-2">
          <span className="form-label">
            Price
          </span>
            <input
              type="number"
              required
              defaultValue={productPrice || ""}
              onChange={(e) => setproductPrice(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="add-edit-button"
          onClick={addEditProduct}
        >
          {editMode ? `Save` : `Add Product`}
        </button>
      </Modal.Footer>
    </div>
  );
}

export default AddEditProduct;
