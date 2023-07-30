import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import SideCart from "../components/SideCart";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { cartSliceActions } from "../store/cart-slice";
import Modal from "../components/Modal";
import Auth from "../components/Auth";
import { authSliceActions } from "../store/auth-slice";
import { sideCartSliceActions } from "../store/sideCart-slice";
import ErrorModal from "../components/ErrorModal";
import { errorSliceActions } from "../store/error-slice";
import { AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";

function RootLayout() {
  const authModalOpen = useSelector((state) => state.auth.authModalOpen);
  const sideCartOpen = useSelector((state) => state.sideCart.open);

  const error = useSelector((state) => state.error.message);
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

  const onErrorCloseHandler = () => {
    dispatch(errorSliceActions.clearError());
  };

  return (
    <div className="root_layout">
      <div className="main_wrapper">
        <NavBar />
        <Outlet />
        <Footer />
      </div>

      {/* SIDE-CART-MODAL  */}
      <AnimatePresence>
        {sideCartOpen && (
          <Modal onConfirm={onConfirmSideCartModalHandler}></Modal>
        )}
      </AnimatePresence>
      {ReactDOM.createPortal(<SideCart />, document.getElementById("overlay"))}

      {/* AUTH-MODAL  */}
      <AnimatePresence>
        {authModalOpen && <Modal onConfirm={onConfirmAuthModalHandler}></Modal>}
      </AnimatePresence>
      {ReactDOM.createPortal(<Auth />, document.getElementById("overlay"))}

      {/* ERROR MODAL*/}
      <AnimatePresence>
        {error && <Modal onConfirm={onErrorCloseHandler}></Modal>}
        {ReactDOM.createPortal(
          <ErrorModal message={error} onClick={onErrorCloseHandler} />,
          document.getElementById("overlay")
        )}
      </AnimatePresence>
    </div>
  );
}

export default RootLayout;
