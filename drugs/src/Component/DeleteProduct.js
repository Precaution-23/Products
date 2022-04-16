import React, { useEffect, useState } from "react";
import { productFiltersRuducer } from "../Redux/ProductFilters/productfilter";
import {
  addProduct,
  getProducts,
  getDeletedProducts,
} from "../Redux/ProductFilters/index";
import { useSelector, useDispatch } from "react-redux";

function DeleteProduct({ deleteId, closeDelete }) {
  const dispatch = useDispatch();
  // declaring of the value that holds the data from the store
  const productLists = useSelector(productFiltersRuducer);

  const [deletedProducts, setDeletedProducts] = useState([]);

  let deletedItems = [];

  // get the deleted item to keep track of all deleted products
  const getDeletedItem = () => {
    const deletedItem = productLists.data.filter(
      (item) => item.id === deleteId
    );
    let deletedItems = [...deletedProducts, ...deletedItem];

    // updating the deleted items state
    setDeletedProducts(deletedItems);

    // console.log("deletedItems", deletedItems)
    localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
  };

//   console.log("deletedProducts", deletedProducts);

  // function to delete an item from the list
  const deleteProduct = () => {
    const getUnDeletedProduct = productLists.data.filter(
      (item) => item.id !== deleteId
    );
    dispatch(addProduct(getUnDeletedProduct));
    // getDeletedItem();
    setTimeout(() => {
      dispatch(getProducts());
      closeDelete();
      window.location.reload();
    }, 300);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div className="flex justify-center text-xl">
        Are you sure you want to delete?
      </div>
      <div className="grid grid-cols-2 p-5">
        <div>
          <button className="delete-yes-button" onClick={deleteProduct}>
            YES
          </button>
        </div>
        <div>
          <button className="delete-no-button" onClick={closeDelete}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
