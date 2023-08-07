import React from "react";
import Product from "./Product";
import Error from "./Error";
import Pagination from "./Pagination";
import Loading from "./Loading";

const Products = ({ data, isError, isLoading, isSuccess }) => {
  console.log(data);
  return (
    <div className="products_container">
      {isSuccess && !isLoading && (
        <div className="products_wrapper">
          {data &&
            data.products.map((product) => (
              <Product
                isLoading={isLoading}
                product={product}
                key={product.id}
              />
            ))}
        </div>
      )}
      {/* {isSuccess && <Pagination />} */}
      {isError && <Error />}
      {isLoading && <Loading />}
    </div>
  );
};

export default Products;
