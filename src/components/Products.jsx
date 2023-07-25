import React from "react";
import Product from "./Product";
import data from "../data";

const Products = () => {
  return (
    <div className="products_container">
      <div className="products_container_wrapper">
        <div className="products_wrapper">
          {data.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
