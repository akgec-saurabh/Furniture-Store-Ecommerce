import React, { useEffect } from "react";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { ScrollRestoration } from "react-router-dom";
import Pagination from "../components/Pagination";
import SecondaryNav from "../components/SecondaryNav";

function Homepage() {
  return (
    <>
      <Slider />
      <SecondaryNav />
      <Products />
      {/*  How to give Dynamically this page range  */}
      <Pagination maxPageRange={2} />
    </>
  );
}

export default Homepage;
