import React, { useEffect, useState } from "react";
import { addProduct, getProducts } from "../../Redux/ProductFilters/index";
import { useAppDispatch } from "../../Redux/ProductFilters/reduxHooks";

function DeleteProduct({ editProduct, closeDelete }) {
  const dispatch = useAppDispatch();

  const [drugs, setdrugs] = useState(
    localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []
  );

  // get the deleted item to update it rather than deleting where the name
  // is set to empty string and price left intact
  const getDeletedItem = () => {
    try {
      const updateProduct = drugs.find((item) => item.id === editProduct.id);
      let updatedProduct = {
        id: updateProduct.id,
        name: "",
        prices: [...updateProduct.prices],
      };

      // this is where decision is taken on where to slot the new updated data
      drugs.splice(updateProduct.id - 1, 1, updatedProduct);
      // this is where the adding of new products happens
      dispatch(addProduct(drugs));

      // this is where we fetch all the products
      setTimeout(() => {
        dispatch(getProducts());
        closeDelete();
        window.location.reload();
      }, 300);
    } catch (error) {
      alert("There was en error deleting product. Try again");
    }
  };


  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div data-testid="prompt" className="flex justify-center text-xl">
        Are you sure you want to delete?
      </div>
      <div className="grid grid-cols-2 p-5">
        <div>
          <button
            data-testid="yesButton"
            className="delete-yes-button"
            onClick={getDeletedItem}
          >
            YES
          </button>
        </div>
        <div>
          <button
            data-testid="noButton"
            className="delete-no-button"
            onClick={closeDelete}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
