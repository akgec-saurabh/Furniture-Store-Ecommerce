import {
  CaretLeftFilled,
  CaretRightFilled,
  FacebookOutlined,
  HeartFilled,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import Rating from "./Rating";

const colors = ["#00ff7a", "#b4009e", "#f7c520"];

function ProductDisplayDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(0);

  const onColorSelectHandler = (i) => {
    setActiveColor(i);
  };

  const onIncreaseQuantityHandler = () => {
    setQuantity((prv) => {
      return prv + 1;
    });
  };

  const onDecreaseQuantityHandler = () => {
    setQuantity((prv) => {
      if (prv === 1) {
        return 1;
      }
      return prv - 1;
    });
  };

  return (
    <div className="productDisplayDetail">
      <div className="name">Modern Shell Chair</div>
      <div className="price">$208.00</div>
      <div className="shortDescription">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex possimus
        quos blanditiis voluptatem sapiente libero eos sint, ab nihil ad.
      </div>
      <div className="ratingContainer">
        <Rating value={4} />
      </div>
      <div className="buttonContainer">
        <div className="colorContainer">
          <span>Color</span>
          <span>
            {colors.map((color, i) => (
              <span
                className={`colorBorder ${activeColor === i ? "active" : ""}`}
                key={i}
              >
                <span
                  className="color"
                  onClick={() => onColorSelectHandler(i)}
                  style={{ backgroundColor: color }}
                ></span>
              </span>
            ))}
          </span>
        </div>
        <div className="quantity">
          <span>Quantity</span>
          <span>
            <CaretLeftFilled
              onClick={onDecreaseQuantityHandler}
              className="icon"
            />
            <span>{quantity}</span>
            <CaretRightFilled
              onClick={onIncreaseQuantityHandler}
              className="icon"
            />
          </span>
        </div>
        <div className="button">Add to cart</div>
      </div>
      <div className="social">
        <HeartFilled className="icon" />
        <FacebookOutlined className="icon" />
        <TwitterOutlined className="icon" />
        <WhatsAppOutlined className="icon" />
      </div>
    </div>
  );
}

export default ProductDisplayDetail;
