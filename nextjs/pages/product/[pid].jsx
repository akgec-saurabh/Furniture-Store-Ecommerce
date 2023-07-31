import NavBar from "@/components/NavBar";
import ProductDisplayDetail from "@/components/ProductDisplayDetail";
import ProductDisplaySlider from "@/components/ProductDisplaySlider";
import React from "react";

function ProductPage() {
  return (
    <div className="productPage">
      <NavBar />
      <div className="main">
        <ProductDisplaySlider />
        <ProductDisplayDetail />
      </div>
    </div>
  );
}

export default ProductPage;
