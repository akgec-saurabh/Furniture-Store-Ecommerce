import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
function CartPage() {
  const cart = useSelector((state) => state.cart.cart);

  const [total, setTotal] = useState();
  const navigate = useNavigate();

  const getTotal = () => {
    let tempTotal = 0;
    for (let item of cart) {
      tempTotal += item.qty * item.price;
    }
    setTotal(tempTotal);
  };

  const onContinueShoppingHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    getTotal();
    console.log("redered Cart");
  }, [cart.length]);

  const onUpdateHandler = () => {
    // setTotal(tempTotal);
    getTotal();
  };

  console.log("rendering cartPage");

  return (
    <div className="cartpage">
      <div className="cartpage_container">
        {cart.length === 0 && (
          <div className="se_empty">
            <CloseCircleOutlined className="icon" />
            <div>No products in the cart.</div>

            <button onClick={onContinueShoppingHandler} className="btn cp-btn">
              Continue Shopping
            </button>
          </div>
        )}
        {cart.length !== 0 && (
          <>
            <div className="shoppingCart">
              <div className="shoppingCart_head">Shopping Cart</div>
              {cart.map((item) => (
                <div className="sideCartItem_wrapper">
                  <SideCartItem product={item} />
                </div>
              ))}
              <div className="btn_container">
                <button onClick={onContinueShoppingHandler} className="btnw">
                  Continue Shopping
                </button>
                <button onClick={onUpdateHandler} className="btnw">
                  Update Cart
                </button>
              </div>
            </div>
            <div className="cartpage-carttotal-container">
              <div className="shoppingCart_head">Cart Total</div>

              <CartTotal total={total} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
