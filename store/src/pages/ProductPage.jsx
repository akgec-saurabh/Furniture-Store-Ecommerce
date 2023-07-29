import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";

import Detail from "../components/Detail";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/products-actions";
function ProductPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.activeProduct);

  const params = useParams();
  useEffect(() => {
    const pid = params.productId;
    dispatch(getProductById(pid));
  }, [dispatch, params.productId]);

  return (
    <div className="productpage_container">
      {product && (
        <div className="productpage_container_wrapper">
          <ProductDisplay product={product} />
          <Detail product={product} />
          <ScrollRestoration />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
