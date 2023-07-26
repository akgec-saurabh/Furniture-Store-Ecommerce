import { DownOutlined, EnvironmentOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

function CartTotal({ total }) {
  const [shipping, setShipping] = useState(10);
  useEffect(() => {}, [shipping]);
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
                  type="radio"
                  name="shipping"
                  defaultChecked
                  id="standard"
                  onChange={() => {
                    setShipping(10);
                  }}
                />
                <span>Standard:</span>
              </div>
              <div className="ct-shipping-value">$10.00</div>
            </div>
            <div className="express">
              <div className="ct-shipping-label">
                <input
                  onChange={() => {
                    setShipping(19);
                  }}
                  type="radio"
                  name="shipping"
                  id="express"
                />
                <span>Express:</span>
              </div>
              <div className="ct-shipping-value">$19.00</div>
            </div>
          </div>
          <div className="address">
            <div className="ct-head">
              Shipping to <span>CA.</span>
            </div>
            <div className="change">
              <EnvironmentOutlined className="icon" />
              Change address
              <DownOutlined className="icon" />
            </div>
          </div>
        </div>
        <div className="ct-total">
          <div className="t-label">Total</div>
          <div className="t-value">${total + shipping}.00</div>
        </div>
      </div>
      <button className="btn ct-btn">Proceed to checkout</button>
    </>
  );
}

export default CartTotal;
