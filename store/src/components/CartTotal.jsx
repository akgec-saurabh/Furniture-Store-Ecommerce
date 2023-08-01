import { DownOutlined, EnvironmentOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSliceActions } from "../store/cart-slice";

function CartTotal({ total }) {
  const { shipping } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onShippingChangeHandler = (shippingPrice) => {
    dispatch(cartSliceActions.updateShipping(shippingPrice));
  };

  useEffect(() => {
    if (shipping === 0) {
      dispatch(cartSliceActions.updateShipping(10));
    }
  }, [total]);

  return (
    <>
      <div className="cartTotal">
        <div className="ct-subtotal">
          <div className="ct-subtotal-label">Subtotal</div>
          <div className="ct-subtotal-value">${total}.00</div>
        </div>
        <div className="ct-shipping">
          <div className="ct-head">Shipping</div>
          <div className="extra-charge">
            <div className="standard">
              <div className="ct-shipping-label">
                <input
                  name="shipping"
                  type="radio"
                  checked={shipping === 10 || shipping === 0}
                  id="standard"
                  onChange={() => onShippingChangeHandler(10)}
                />
                <span>Standard:</span>
              </div>
              <div className="ct-shipping-value">$10.00</div>
            </div>
            <div className="express">
              <div className="ct-shipping-label">
                <input
                  onChange={() => onShippingChangeHandler(19)}
                  type="radio"
                  name="shipping"
                  id="express"
                  checked={shipping === 19}
                />
                <span>Express:</span>
              </div>
              <div className="ct-shipping-value">$19.00</div>
            </div>
          </div>
          {/* <div className="address">
            <div className="ct-head">
              Shipping to <span>CA.</span>
            </div>
            <div className="change">
              <EnvironmentOutlined className="icon" />
              Change address
              <DownOutlined className="icon" />
            </div>
          </div> */}
        </div>
        <div className="ct-total">
          <div className="t-label">Total </div>
          <div className="t-value">${total}.00</div>
        </div>
      </div>
    </>
  );
}

export default CartTotal;
