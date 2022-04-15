import React, { useState } from "react";
import EditIcon from "./Icons/EditIcon";
import DeletIcon from "./Icons/DeleteIcon";
import AddEditProduct from "./AddEditProduct";
import { Modal } from "@nextui-org/react";
import {productFiltersRuducer} from "../Redux/ProductFilters/productfilter"
import { useSelector } from "react-redux";

function Products() {
    const productLists = useSelector(productFiltersRuducer);
  const [initialProducts, setinitialProducts] = useState(
    localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []
  );

  const [openEditForm, setopenEditForm] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editProduct, seteditProduct] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const productToDisplay = productLists?.data?.length > 0 ? productLists?.data : initialProducts

    // open edit from modal
    const showEditForm = () => {
        setopenEditForm(true);
        seteditMode(true);
      };
    
      // open delete modal
      const openDelete = () => {
        setShowDelete(true);
      };
    
      // close delete modal
      const closeDelete = () => {
        setShowDelete(false);
      };
    
      // close edit form modal
      const closeEditForm = () => {
        setopenEditForm(false);
      };


      console.log("productLists", productLists)
  return (
    <div>
      <div className="table-head">
        <div className="text-center">NAME</div>
        <div className="text-center">PRICE HISTORY</div>
        <div className="text-center">ACTIONS</div>
      </div>
      {productToDisplay?.map((product, index) => {
        return (
          <div className="product-card" key={index}>
            <div className="text-center">{product.name}</div>
            <div className="flex flex-col">
                  <div className="text-center">
                    {product.prices[0].price}{" "}
                  </div>
            </div>
            <div className="text-center">
              <div className="flex justify-evenly">
                <div
                  onClick={() => {
                    showEditForm();
                    seteditProduct(product);
                  }}
                >
                  <EditIcon />
                </div>
                <div>
                  <DeletIcon />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Modal
        preventClose
        width="600px"
        closeButton
        aria-labelledby="modal-title"
        open={openEditForm}
        onClose={closeEditForm}
      >
        <AddEditProduct editMode={editMode} editProduct={editProduct} />
      </Modal>
    </div>
  );
}

export default Products;
