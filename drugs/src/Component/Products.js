import React, { useState } from "react";

function Products() {
  const [initialProducts, setinitialProducts] = useState(
    localStorage.getItem("productList")
      ? JSON.parse(localStorage.getItem("productList"))
      : []
  );
  return (
    <div>
        {
            initialProducts.map((product, index) => {
                return (
                    <div className="product-card" key={index}>
                        <div className="text-center">{product.name}</div>
                        <div className="flex flex-col">
                         {
                            product.prices.map((prices, index) => {
                                return (
                                    <div className="text-center" key={index}>{prices.price} </div>
                                )
                            })
                        }
                        </div>
                        <div className="text-center">
                           <div className="flex justify-evenly">
                           <div>EDIT</div>
                            <div>DELETE</div>
                           </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
  );
}

export default Products;
