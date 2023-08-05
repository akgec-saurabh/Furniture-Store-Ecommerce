import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  HeartOutlined,
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Badge from "../components/Badge";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { Link } from "react-router-dom";
import { authSliceActions } from "../store/auth-slice";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const NavBar = () => {
  const isMobile = window.matchMedia("(max-width: 960px)").matches;
  return (
    <>
      <div className="nav_container">
        <div className="nav_container_wrapper">
          {!isMobile && <DesktopNavbar />}
          {isMobile && <MobileNavbar />}
        </div>
      </div>
    </>
  );
};

export default NavBar;
