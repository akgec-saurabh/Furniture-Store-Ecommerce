import React from "react";
import Product from "./Product";
import Error from "./Error";
import Pagination from "./Pagination";
import Loading from "./Loading";

const Products = ({ data, isError, isLoading, isSuccess, error }) => {
  console.log("products container rendered");
  return (
    <div className="products_container">
      {isSuccess && !isLoading && (
        <>
          <div className="total_count_product">
            ( No of Products : &nbsp;{data?.total_count})
          </div>
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
        </>
      )}
      {/* {isSuccess && <Pagination />} */}
      {isError && <Error status={error.status} message={error.data.message} />}
      {isLoading && <Loading />}
    </div>
  );
};

export default Products;
