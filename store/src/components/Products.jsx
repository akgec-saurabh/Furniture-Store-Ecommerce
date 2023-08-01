import React, { useEffect } from "react";
import Product from "./Product";
import { useSearchParams } from "react-router-dom";
import { useGetProductsByPageQuery } from "../store/product-api";

const Products = () => {
  // const products = useSelector((state) => state.products.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { data, isLoading } = useGetProductsByPageQuery(page);

  console.log(searchParams.get("page"));

  // const dispatch = useDispatch();

  return (
    <div className="products_container">
      <div className="products_wrapper">
        {!isLoading &&
          data &&
          data.products.map((product) => (
            <Product isLoading={isLoading} product={product} key={product.id} />
          ))}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Products;
