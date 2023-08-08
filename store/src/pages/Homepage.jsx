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
import MobileFilter from "../components/MobileFilter";
import FilterNavbar from "../Modules/FilterNavbar";

function Homepage() {
  const location = useLocation();
  // const category = searchParams.get("category");
  const { data, isLoading, isError, isSuccess, isFetching, error } =
    useGetProductsByPageQuery(location.search);

  useEffect(() => {}, []);
  return (
    <div className="homepage">
      <Slider />
      <FilterNavbar />

      <Products
        data={data}
        isSuccess={isSuccess}
        isLoading={isFetching}
        isError={isError}
        error={error}
      />

      {/* {isSuccess && (
        <Pagination maxPageRange={Math.ceil(data?.total_count / 5)} />
      )} */}
      {/*  How to give Dynamically this page range  */}
    </div>
  );
}

export default Homepage;
