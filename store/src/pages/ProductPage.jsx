import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";

import Detail from "../components/Detail";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../store/products-actions";
import { useGetProductByIdQuery } from "../store/product-api";
import Loading from "../components/Loading";
function ProductPage() {
  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.products.activeProduct);

  const params = useParams();
  const pid = params.productId;
  const { data, isFetching, isError, isSuccess } = useGetProductByIdQuery(pid);

  return (
    <div className="productpage_container">
      {!isFetching && isSuccess && (
        <div className="productpage_container_wrapper">
          <ProductDisplay product={data} />
          <Detail product={data} />
        </div>
      )}
      {isFetching && <Loading />}
    </div>
  );
}

export default ProductPage;
