import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SideCartItem from "./SideCartItem";

function SideCart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(sideCartSliceActions.toggleSideCart());
    }
  }, [cart]);

  const onViewCartHandler = () => {
    navigate("/cart");
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  const onCloseHandler = () => {
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  const onContinueShoppingHandler = () => {
    navigate("/");
    dispatch(sideCartSliceActions.toggleSideCart());
  };
  return (
    <div className="sidecart">
      <div className="sidecart_close">
        <span onClick={onCloseHandler}>Close</span>
      </div>

      {/* if cart is empty */}

      {cart.length === 0 && (
        <div className="sidecart_empty">
          <div className="se_empty">
            <CloseCircleOutlined className="icon" />
            <div>No products in the cart.</div>
          </div>
          <button
            className="sidecart_continueShopBtn btn"
            onClick={onContinueShoppingHandler}
          >
            Continue Shopping
          </button>
        </div>
      )}

      {cart.length !== 0 && (
        <div className="sidecart_full">
          <div className="sidecart_full_container">
            {cart.map((product, i) => (
              <SideCartItem product={product} key={i} />
            ))}
          </div>

          <div className="slidefull_btn">
            <button onClick={onViewCartHandler} className="btn viewCartBtn">
              View Cart
            </button>
            <button className="btn checkOutBtn">CheckOut</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideCart;
