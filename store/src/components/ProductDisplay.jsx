import React, { useState } from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../store/cart-slice";
import { sideCartSliceActions } from "../store/sideCart-slice";
import Ratings from "./Ratings";

function ProductDisplay({ product }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const onAddToCartHandler = () => {
    dispatch(cartSliceActions.addToCart({ ...product, qty: count }));
    dispatch(sideCartSliceActions.toggleSideCart());
    dispatch(cartSliceActions.setCart());
  };

  return (
    <div className="productDisplay_container">
      <div className="productDisplay_container_wrapper">
        {/* // TODO Adding the preview image */}
        {/* <div className="image_list">
          {product.colorVariant[0].images.map((i) => (
            <img
              onClick={(e) => {
                setSelected(i);
                console.log(i);
              }}
              className={`image_list_img ${selected !== i ? "selected" : ""}`}
              src={i}
            />
          ))} 
        </div>
          */}
        <div className="pd_data_container">
          <div className="pd_data_img_wrapper">
            <ShareAltOutlined className="share_icon" />
            <img className="pd_data_img" src={product.mainImage} alt="" />
          </div>
          <div className="pd_data">
            <div className="pd_data_wrapper">
              <div className="pd_name">{product.name}</div>
              <div className="pd_price">${product.price}.00</div>
              <div className="pd_sdesc">{product.shortDescription}</div>
              <Ratings rating={4} />

              <div className="pd_btns">
                <div className="pd_btns_color">
                  Color
                  {product.colorVariant && (
                    <div className="pd_btns_color_wrapper">
                      {product.colorVariant.map((c, i) => (
                        <div
                          key={i}
                          className={`pd_btns_color_item ${
                            i === 0 ? "active" : ""
                          }`}
                        >
                          <div
                            className="ccode"
                            style={{ backgroundColor: `${c.colorCode}` }}
                          ></div>
                          {/* <img src={c.images[0]} alt="" /> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="pd_btns_quantity">
                  Quantity
                  <div className="pd_btns_quantity_wrapper">
                    <CaretLeftOutlined
                      className="icon"
                      onClick={() => {
                        if (count === 1) return;
                        setCount((prv) => prv - 1);
                      }}
                    />
                    <div className="count"> {count}</div>
                    <CaretRightOutlined
                      className="icon"
                      onClick={() => {
                        setCount((prv) => prv + 1);
                      }}
                    />
                  </div>
                </div>

                <button className="btn" onClick={onAddToCartHandler}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
