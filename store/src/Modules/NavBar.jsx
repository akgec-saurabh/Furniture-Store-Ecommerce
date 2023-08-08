import React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useGetUserCartQuery } from "../store/product-api";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isMobile = window.matchMedia("(max-width: 960px)").matches;
  const token = useSelector((state) => state.auth.token);
  const { data } = useGetUserCartQuery(token, {
    skip: !token,
  });

  return (
    <div className="nav_container">
      <div className="nav_container_wrapper">
        {!isMobile && <DesktopNavbar cartValue={data?.cart.products.length} />}
        {isMobile && <MobileNavbar cartValue={data?.cart.products.length} />}
      </div>
    </div>
  );
};

export default NavBar;
