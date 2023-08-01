import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SideCartItem from "./SideCartItem";
import { AnimatePresence, motion } from "framer-motion";

const sideVariants = {
  hide: {
    x: "100vw",

    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
  show: {
    x: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
};

function SideCart() {
  const { cart, total, shipping } = useSelector((state) => state.cart);
  const sideCartOpen = useSelector((state) => state.sideCart.open);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      // dispatch(sideCartSliceActions.toggleSideCart());
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
    <AnimatePresence>
      {sideCartOpen && (
        <motion.div
          variants={sideVariants}
          initial="hide"
          animate="show"
          exit="hide"
          className="sidecart"
        >
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

              <div className="subTotal">
                <span>SubTotal:</span>
                <span>${total - shipping}.00</span>
              </div>

              <div className="slidefull_btn">
                <button onClick={onViewCartHandler} className="btn viewCartBtn">
                  View Cart
                </button>
                <button className="btn checkOutBtn">CheckOut</button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SideCart;
