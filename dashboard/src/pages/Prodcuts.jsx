import React, { useEffect } from "react";
import Product from "../components/Product";
import {
  useGetProductsByPageQuery,
  useGetProductsQuery,
} from "../store/product-api";

function Prodcuts() {
  const { data, isLoading, isSuccess } = useGetProductsQuery();
  useEffect(() => {
    // console.log(data.prodcuts);
  }, [data]);
  return (
    <div
      className="products"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
    >
      {isSuccess &&
        data.products &&
        data.products.map((product) => <Product product={product} />)}
    </div>
  );
}

export default Prodcuts;
