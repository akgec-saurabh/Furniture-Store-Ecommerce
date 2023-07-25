import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Backdrop from "../Backdrop/Backdrop";
import SideCart from "../SideCart/SideCart";
import { useSelector } from "react-redux";

function RootLayout() {
  const sideCartOpen = useSelector((state) => state.sideCart.open);
  return (
    <>
      <div>
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
    </>
  );
}

export default RootLayout;
