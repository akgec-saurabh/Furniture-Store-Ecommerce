import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Backdrop from "./Backdrop";
import SideCart from "./SideCart";
import { useSelector } from "react-redux";
import Footer from "./Footer";

function RootLayout() {
  const sideCartOpen = useSelector((state) => state.sideCart.open);
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
