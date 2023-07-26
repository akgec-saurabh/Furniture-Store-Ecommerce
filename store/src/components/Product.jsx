import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const [hovered, setHoverd] = useState(false);
  const [heartHovered, setHeartHoverd] = useState(false);
  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => {
        setHoverd(true);
      }}
      onMouseLeave={() => setHoverd(false)}
      className="product_container"
    >
      <div className="product_container_wrapper">
        <div className="availabe_color_container">
          {product.colorVariant.map((p) => (
            <div
              className="availabe_color"
              style={{ backgroundColor: `${p.colorCode}` }}
            ></div>
          ))}
        </div>
        {!hovered && (
          <img
            className="product_image"
            src={product.mainImage}
            alt="product"
          />
        )}
        {hovered && (
          <img
            className="product_image"
            src={product.hoverImage}
            alt="product"
          />
        )}

        <div className="product_data">
          <div className="data_info">
            <div className="product_name">{product.name}</div>
            <div className="product_price">
              {hovered ? "Show More" : `${product.price}`}
            </div>
          </div>
          <div
            onMouseEnter={() => setHeartHoverd(true)}
            onMouseLeave={() => setHeartHoverd(false)}
            className="data_heart"
          >
            {!heartHovered && <HeartOutlined />}
            {heartHovered && <HeartFilled />}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
