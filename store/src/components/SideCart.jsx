import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SideCartItem from "./SideCartItem";
import { AnimatePresence, motion } from "framer-motion";
import { useGetUserCartQuery } from "../store/product-api";
import Loading from "./Loading";
import Button from "./Button";

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
  const token = useSelector((state) => state.auth.token);
  const { data, isFetching, isSuccess, isLoading } = useGetUserCartQuery(
    token,
    {
      skip: !token,
    }
  );

  const sideCartOpen = useSelector((state) => state.sideCart.open);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onGoToCheckoutHandler = () => {
    navigate("/checkout");
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

          {(data?.cart.products?.length === 0 || !token) && (
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

          {data?.cart.products?.length !== 0 && (
            <div className="sidecart_full">
              <div className="sidecart_full_container">
                {data?.cart.products?.map((product, i) => (
                  <SideCartItem
                    product={product.productId}
                    quantity={product.quantity}
                    key={i}
                  />
                ))}
              </div>

              <div className="btnTotalWrapper">
                <div className="subTotal">
                  <span>SubTotal:</span>
                  <span>${data?.total}.00</span>
                </div>
                <Button onClick={onViewCartHandler} text="View Cart" />
                <Button
                  onClick={onGoToCheckoutHandler}
                  margin
                  border
                  text="Checkout"
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SideCart;
