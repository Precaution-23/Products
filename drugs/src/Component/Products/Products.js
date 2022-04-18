import React, { useState, useEffect } from "react";
import EditIcon from "../Icons/EditIcon";
import DeletIcon from "../Icons/DeleteIcon";
import AddEditProduct from "../AddEditProduct/AddEditProduct";
import { Modal } from "@nextui-org/react";
import { productFiltersRuducer } from "../../Redux/ProductFilters/productfilter";
import { useSelector, useDispatch } from "react-redux";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import { getProducts } from "../../Redux/ProductFilters/index";

function Products({ loading, initialProducts }) {
  const dispatch = useDispatch();
  // declaring of the value that holds the data from the store
  const productLists = useSelector(productFiltersRuducer);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [editProduct, seteditProduct] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  // run checks to see if store has data to display or it should display
  // the initial products before new products are added
  const productToDisplay =
    productLists?.data?.length > 0 ? productLists?.data : initialProducts;

  // open edit from modal
  const showEditForm = () => {
    setOpenModal(true);
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
  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // this is where we fetch all the products
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div className="table-head">
        <div className="text-center">NAME</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">ACTIONS</div>
      </div>
      {loading ? (
        <div className="flex justify-center text-xl my-5">Loading...</div>
      ) : (
        productToDisplay?.map((product, index) => {
          return (
            <div className="product-card" key={index}>
              <div className="text-center">{product.name}</div>
              <div className="flex flex-col">
                <div className="text-center" key={index}>
                  {product.prices.slice(-1).pop().price}{" "}
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
                  <div
                    onClick={() => {
                      openDelete();
                      seteditProduct(product);
                    }}
                  >
                    <DeletIcon />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      <Modal
        preventClose
        width="600px"
        closeButton
        aria-labelledby="modal-title"
        open={openModal}
        onClose={closeModal}
      >
        <AddEditProduct
          editMode={editMode}
          editProduct={editProduct}
          closeModal={closeModal}
        />
      </Modal>

      <Modal
        preventClose
        width="400px"
        closeButton
        aria-labelledby="modal-title"
        open={showDelete}
        onClose={closeDelete}
      >
        <DeleteProduct deleteId={editProduct.id} closeDelete={closeDelete} />
      </Modal>
    </div>
  );
}

export default Products;
