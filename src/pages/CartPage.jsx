import React from "react";

import { useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className="cartpage">
      <div className="cartpage_container">
        <div className="shoppingCart">
          <div className="shoppingCart_head">Shopping Cart</div>
          {cart.map((item) => (
            <div className="sideCartItem_wrapper">
              <SideCartItem product={item} />
            </div>
          ))}
          <div className="btn_container">
            <button className="btnw">Continue Shopping</button>
            <button className="btnw">Update Cart</button>
          </div>
        </div>
        <div className="cartTotal">
          <div className="shoppingCart_head">Cart Total</div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
