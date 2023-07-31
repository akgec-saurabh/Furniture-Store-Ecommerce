import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/products-actions";
import { useSearchParams } from "react-router-dom";
import { useGetProductsByPageQuery } from "../store/api-slice";

const Products = () => {
  // const products = useSelector((state) => state.products.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { data, isLoading } = useGetProductsByPageQuery(page);

  console.log(searchParams.get("page"));

  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getProducts(page));
    // console.log(data, isLoading);
  }, [page]);

  return (
    <div className="products_container">
      <div className="products_wrapper">
        {!isLoading &&
          data.products.map((product) => (
            <Product isLoading={isLoading} product={product} key={product.id} />
          ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Products;
