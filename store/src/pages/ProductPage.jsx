import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";

import Detail from "../components/Detail";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/products-actions";
import { useGetProductByIdQuery } from "../store/product-api";
function ProductPage() {
  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.products.activeProduct);

  const params = useParams();
  const pid = params.productId;
  const { data: product } = useGetProductByIdQuery(pid);

  return (
    <div className="productpage_container">
      {product && product && (
        <div className="productpage_container_wrapper">
          <ProductDisplay product={product} />
          <Detail product={product} />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
