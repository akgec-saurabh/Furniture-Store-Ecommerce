import React from "react";
import "./Products.scss";
import Product from "../Product/Product";
import LoadMore from "../UI/LoadMore/LoadMore";

const Products = () => {
  return (
    <div className="products_container">
      <div className="products_container_wrapper">
        <div className="products_wrapper">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>

        <LoadMore />
      </div>
    </div>
  );
};

export default Products;
