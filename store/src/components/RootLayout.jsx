import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import SideCart from "./SideCart";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import { cartSliceActions } from "../store/cart-slice";
import Modal from "./Modal";
import Auth from "./Auth";
import { authSliceActions } from "../store/auth-slice";
import { sideCartSliceActions } from "../store/sideCart-slice";

function RootLayout() {
  const sideCartOpen = useSelector((state) => state.sideCart.open);
  const authModalOpen = useSelector((state) => state.auth.authModalOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartSliceActions.getCart());
  }, []);

  const onConfirmAuthModalHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };

  const onConfirmSideCartModalHandler = () => {
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  return (
    <div className="root_layout">
      <div className="main_wrapper">
        <NavBar />
        <Outlet />
        <Footer />
      </div>

      {sideCartOpen && (
        <Modal onConfirm={onConfirmSideCartModalHandler}>
          <SideCart />
        </Modal>
      )}

      {authModalOpen && (
        <Modal onConfirm={onConfirmAuthModalHandler}>
          <Auth />
        </Modal>
      )}
    </div>
  );
}

export default RootLayout;
