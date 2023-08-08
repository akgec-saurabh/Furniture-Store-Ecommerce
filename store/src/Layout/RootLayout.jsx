import React, { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import SideCart from "../components/SideCart";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import { cartSliceActions } from "../store/cart-slice";
import Modal from "../HOC/Modal";
import { authSliceActions } from "../store/auth-slice";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { AnimatePresence } from "framer-motion";
import AuthForm from "../Modules/AuthForm";
import NavBar from "../Modules/NavBar";

function RootLayout() {
  const authModalIsOpen = useSelector((state) => state.auth.authModalIsOpen);
  const sideCartOpen = useSelector((state) => state.sideCart.open);
  const toast = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(cartSliceActions.removeCart());
    // dispatch(cartSliceActions.getCart());
  }, []);

  const onConfirmAuthModalHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };

  const onConfirmSideCartModalHandler = () => {
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  const onCloseAuthModalHandler = () => {
    dispatch(authSliceActions.closeAuthModal());
  };

  //CLOSE SIDE CART
  const onCloseSideCartHandler = () => {
    dispatch(sideCartSliceActions.closeSideCart());
  };

  useEffect(() => {
    console.log("root rendered");
  }, []);

  return (
    <div className="root_layout">
      <div className="main_wrapper">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
      {authModalIsOpen && (
        <Modal center={true} onConfirm={onCloseAuthModalHandler}>
          <AuthForm />
        </Modal>
      )}
      {/* SIDE-CART-MODAL */}

      {sideCartOpen && (
        <Modal center={false} onConfirm={onCloseSideCartHandler}>
          <SideCart />
        </Modal>
      )}
      {/* <AnimatePresence>
        {sideCartOpen && (
          <Modal onConfirm={onConfirmSideCartModalHandler}>
            <SideCart />
            </Modal>
        )}
      </AnimatePresence> */}
      {/* AUTH-MODAL 
      <AnimatePresence>
        {authModalOpen && <Modal onConfirm={onConfirmAuthModalHandler}></Modal>}
      </AnimatePresence>
      {ReactDOM.createPortal(<Auth />, document.getElementById("overlay"))} */}
    </div>
  );
}

export default RootLayout;
