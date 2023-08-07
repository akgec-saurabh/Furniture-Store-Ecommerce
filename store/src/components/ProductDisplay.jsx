import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from "../store/cart-slice";
import { sideCartSliceActions } from "../store/sideCart-slice";
import Ratings from "./Ratings";
import { saveCart } from "../store/cart-actions";
import Button from "./Button";
import { useAddItemToCartMutation } from "../store/product-api";

function ProductDisplay({ product }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.auth.token);
  const [addToCart, { isSuccess, isLoading, data }] =
    useAddItemToCartMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(sideCartSliceActions.openSideCart());
    }
    
  }, [isSuccess]);

  const onAddToCartHandler = () => {
    addToCart({
      productId: product.id,
      qty: count,
      token,
    });
    // dispatch(cartSliceActions.addToCart({ ...product, qty: count }));
    // dispatch(sideCartSliceActions.toggleSideCart());
    // dispatch(cartSliceActions.setCart());
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
            <Swiper
              className="swiper"
              spaceBetween={0}
              slidesPerView={1}
              navigation={true}
              modules={[Navigation]}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide className="sslide">
                <img className="swiper_img" src={product.mainImage} alt="" />
              </SwiperSlide>
              <SwiperSlide className="sslide">
                <img className="swiper_img" src={product.hoverImage} alt="" />
              </SwiperSlide>
            </Swiper>
            <ShareAltOutlined className="share_icon" />
            {/* <img className="pd_data_img" src={product.mainImage} alt="" /> */}
          </div>
          <div className="pd_data">
            <div className="pd_data_wrapper">
              <div className="pd_name">{product.name}</div>
              <div className="pd_price">${product.price}.00</div>
              <div className="pd_sdesc">{product.shortDescription}</div>
              <Ratings rating={4} />

              <div className="pd_btns">
                {/* //TODO ADD COLORS  */}
                {/* <div className="pd_btns_color">
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
                          <img src={c.images[0]} alt="" /> 
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}
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

                <Button
                  isLoading={isLoading}
                  onClick={onAddToCartHandler}
                  text="Add to cart"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
