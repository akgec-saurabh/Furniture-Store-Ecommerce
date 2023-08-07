import React, { useEffect } from "react";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Pagination from "../components/Pagination";
import SecondaryNav from "../components/SecondaryNav";
import {
  useGetProductByCategoryQuery,
  useGetProductByTagsQuery,
  useGetProductsByPageQuery,
} from "../store/product-api";
import { useLocation } from "react-router-dom";

function Homepage() {
  const location = useLocation();
  // const category = searchParams.get("category");
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetProductsByPageQuery(location.search);

  return (
    <>
      <Slider />
      <SecondaryNav />
      {isSuccess && <div>No of Products :{data.total_count}</div>}
      <Products
        data={data}
        isSuccess={isSuccess}
        isLoading={isFetching}
        isError={isError}
      />

      {/*  How to give Dynamically this page range  */}
    </>
  );
}

export default Homepage;
