import React, { useEffect } from "react";
import Product from "./Product";
import { useSearchParams } from "react-router-dom";
import {
  useGetProductByCategoryQuery,
  useGetProductsByPageQuery,
} from "../store/product-api";

const Products = () => {
  // const products = useSelector((state) => state.products.products);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const { data, isLoading } = useGetProductsByPageQuery(page);
  const { data: categoryData } = useGetProductByCategoryQuery(category, {
    skip: true,
  });

  useEffect(() => {
    console.log(page);
    console.log(category);

    console.log(category, categoryData);
  }, [page, category]);
  searchParams.get("category");

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
