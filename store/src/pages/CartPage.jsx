import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import SideCartItem from "../components/SideCartItem";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { saveCart } from "../store/cart-actions";
function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    //Saving Cart to database
    if (token) {
      dispatch(
        saveCart({
          userId,
          products: cart.map((product) => {
            return {
              productId: product.id,
              quantity: product.qty,
            };
          }),
        })
      );
    }
  }, [cart.length]);

  useEffect(() => {
    getTotal();
    console.log("redered Cart");
  }, [cart.length]);

  const onUpdateHandler = () => {
    // setTotal(tempTotal);
    getTotal();
    dispatch(
      saveCart({
        userId: "64c5a93cfe443cf3bd99374a",
        products: cart.map((product) => {
          return {
            productId: product.id,
            quantity: product.qty,
          };
        }),
      })
    );
  };

  console.log("rendering cartPage");

  return (
    <>
      {!token && <p>Login to Save To Cart</p>}
      {token && (
        <div className="cartpage">
          <div className="cartpage_container">
            {cart.length === 0 && (
              <div className="se_empty">
                <CloseCircleOutlined className="icon" />
                <div>No products in the cart.</div>

                <button
                  onClick={onContinueShoppingHandler}
                  className="btn cp-btn"
                >
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
                    <button
                      onClick={onContinueShoppingHandler}
                      className="btnw"
                    >
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
      )}
    </>
  );
}

export default CartPage;
