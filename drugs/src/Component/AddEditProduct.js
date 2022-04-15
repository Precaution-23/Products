import React, {useState} from 'react'
import { Modal, Text } from "@nextui-org/react";

function AddEditProduct({editMode, editProduct}) {
  const [productName, setproductName] = useState(editProduct?.name === "" ? "" : editProduct?.name)
  const [productPrice, setproductPrice] = useState(editProduct?.prices?.length > 0 ? editProduct?.prices[0]?.price : "")
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
        // onClick={addEditForm}
      >
        {editMode ? `Save` : `Add Product`}
      </button>
    </Modal.Footer>
  </div>
  )
}

export default AddEditProduct