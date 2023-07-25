import React from "react";
import Product from "./Product";
import LoadMore from "./UI/LoadMore/LoadMore";
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

        <LoadMore>Load More</LoadMore>
      </div>
    </div>
  );
};

export default Products;
