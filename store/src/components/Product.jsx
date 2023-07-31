import React, { lazy, useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import loaderImage from "../assets/loaderImage.svg";

const Product = ({ product, isLoading }) => {
  const [hovered, setHoverd] = useState(false);
  const [heartHovered, setHeartHoverd] = useState(false);
  return (
    <>
      <div className="product">
        <div className="availabe_color_container">
          {product.colorVariant.map((p) => (
            <div
              className="availabe_color"
              style={{ backgroundColor: `${p.colorCode}` }}
            ></div>
          ))}
        </div>
        <Link
          to={`/product/${product.id}`}
          onMouseEnter={() => {
            setHoverd(true);
          }}
          onMouseLeave={() => setHoverd(false)}
        >
          {!hovered && (
            <img
              className="product_image"
              src={product.mainImage}
              alt="product"
              loading="lazy"
            />
          )}
          {hovered && (
            <img
              className="product_image"
              src={product.hoverImage}
              alt="product"
              loading="lazy"
            />
          )}
        </Link>

        <div className="data">
          <div className="info">
            <Link className="name" to={`/product/${product.id}`}>
              <div>{product.name}</div>
            </Link>

            <Link
              to={`/product/${product.id}`}
              className="price"
              onMouseEnter={() => {
                setHoverd(true);
              }}
              onMouseLeave={() => setHoverd(false)}
            >
              {hovered ? (
                <span className="more">Show More</span>
              ) : (
                `$${product.price}.00`
              )}
            </Link>
          </div>
          <div
            onMouseEnter={() => setHeartHoverd(true)}
            onMouseLeave={() => setHeartHoverd(false)}
            className="heart"
          >
            {!heartHovered && <HeartOutlined />}
            {heartHovered && <HeartFilled />}
          </div>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default Product;
