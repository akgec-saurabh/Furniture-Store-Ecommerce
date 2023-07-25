import React, { useEffect } from "react";
import Products from "../components/Products";
import Slider from "../components/Slider";

function Homepage() {
  return (
    <>
      <Slider />
      <Products />
    </>
  );
}

export default Homepage;
