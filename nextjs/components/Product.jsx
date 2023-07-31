import { HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function Product() {
  const [isHover, setIsHover] = useState(false);
  const productRef = useRef(null);
  const imagePath = isHover
    ? "https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-classic-chair.jpg"
    : "https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-classic-chair-2.jpg";
  const price = isHover ? "Show More" : "$208.00";

  useEffect(() => {
    const onMouseEnterHandler = () => {
      setIsHover(true);
    };

    const onMouseLeaveHandler = () => {
      setIsHover(false);
    };

    productRef.current.addEventListener("mouseenter", onMouseEnterHandler);
    productRef.current.addEventListener("mouseleave", onMouseLeaveHandler);

    return () => {
      productRef.current.removeEventListener("mouseenter", onMouseEnterHandler);
      productRef.current.removeEventListener("mouseleave", onMouseLeaveHandler);
    };
  }, []);

  return (
    <div ref={productRef} className="product">
      <div className="imgWrapper">
        <Image src={imagePath} alt="product" fill={true} sizes="20vw" />
      </div>
      <div className="detail">
        <div className="left">
          <div className="name">Mordern Shell Chair</div>
          <div className="price">{price}</div>
        </div>

        <div className="right">
          <HeartOutlined />
        </div>
      </div>
    </div>
  );
}

export default Product;
