import React, { useEffect } from "react";
import Product from "./Product";
import data from "../data";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/products-actions";

const Products = () => {
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    console.log(products);
  }, []);

  return (
    <div className="products_container">
      <div className="products_container_wrapper">
        <div className="products_wrapper">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
