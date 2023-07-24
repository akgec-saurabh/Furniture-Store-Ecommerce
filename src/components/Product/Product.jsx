import React, { useState } from "react";
import "./Product.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const color = ["#33A0FF", "#DA33FF", "#FF33E6"];
const Product = () => {
  const [hovered, setHoverd] = useState(false);
  const [heartHovered, setHeartHoverd] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHoverd(true);
      }}
      onMouseLeave={() => setHoverd(false)}
      className="product_container"
    >
      <div className="product_container_wrapper">
        <div className="availabe_color_container">
          {color.map((c) => (
            <div
              className="availabe_color"
              style={{ backgroundColor: `${c}` }}
            ></div>
          ))}
        </div>
        {!hovered && (
          <img
            className="product_image"
            src="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-classic-chair-300x372.jpg"
            alt="product"
          />
        )}
        {hovered && (
          <img
            className="product_image"
            src="https://savoy.nordicmade.com/wp-content/uploads/2020/10/product-classic-chair-3.jpg"
            alt="product"
          />
        )}

        <div className="product_data">
          <div className="data_info">
            <div className="product_name">Modern Shell Chair</div>
            <div className="product_price">
              {hovered ? "Show More" : "$208.00"}
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
    </div>
  );
};

export default Product;
