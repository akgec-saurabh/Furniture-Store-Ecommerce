import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Backdrop from "./Backdrop";
import SideCart from "./SideCart";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import { cartSliceActions } from "../store/cart-slice";

function RootLayout() {
  const sideCartOpen = useSelector((state) => state.sideCart.open);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartSliceActions.getCart());
  }, []);
  return (
    <div className="root_layout">
      <div className="main_wrapper">
        <NavBar />
        <Outlet />
        <Footer />
      </div>

      {sideCartOpen && (
        <>
          <Backdrop />
          <SideCart />
        </>
      )}
    </div>
  );
}

export default RootLayout;
