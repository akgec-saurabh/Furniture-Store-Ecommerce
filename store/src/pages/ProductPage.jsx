import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay";

import data from "../data";
import Detail from "../components/Detail";
function ProductPage() {
  const [product, setProduct] = useState({
    name: "",
    colorVariant: [{ images: [] }],
  });
  const params = useParams();
  useEffect(() => {
    const pid = params.productId;
    const p = data.filter((p) => p.id === pid);
    setProduct(...p);
    console.log(product);
  }, [params.productId]);

  return (
    <div className="productpage_container">
      <div className="productpage_container_wrapper">
        <ProductDisplay product={product} />
        <Detail />
      </div>
    </div>
  );
}

export default ProductPage;
