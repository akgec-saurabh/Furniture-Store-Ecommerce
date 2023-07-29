import React, { useEffect } from "react";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { ScrollRestoration } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Slider />
      <Products />
      <ScrollRestoration />
    </>
  );
}

export default Homepage;
