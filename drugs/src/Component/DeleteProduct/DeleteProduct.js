import React, { useEffect, useState } from "react";
import { productFiltersRuducer } from "../../Redux/ProductFilters/productfilter";
import {
  addProduct,
  getProducts,
} from "../../Redux/ProductFilters/index";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Redux/ProductFilters/reduxHooks";

function DeleteProduct({ deleteId, closeDelete }) {
  
  const dispatch = useAppDispatch();
  // declaring of the value that holds the data from the store
  const productLists = useSelector(productFiltersRuducer);

  const [deletedProducts, setDeletedProducts] = useState([]);

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


  // function to delete an item from the list
  const deleteProduct = () => {
      // filter through the list of products and take the selected one out
    const getUnDeletedProduct = productLists.data.filter(
      (item) => item.id !== deleteId
    );
    dispatch(addProduct(getUnDeletedProduct));
    setTimeout(() => {
      dispatch(getProducts());
      closeDelete();
      window.location.reload();
    }, 300);

    getDeletedItem()
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div data-testid="prompt"  className="flex justify-center text-xl">
        Are you sure you want to delete?
      </div>
      <div className="grid grid-cols-2 p-5">
        <div>
          <button data-testid="yesButton" className="delete-yes-button" onClick={deleteProduct}>
            YES
          </button>
        </div>
        <div>
          <button data-testid="noButton" className="delete-no-button" onClick={closeDelete}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
