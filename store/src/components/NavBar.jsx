import React, { useEffect, useState } from "react";
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Badge from "./Badge";
import menu from "../navMenuData";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import { authSliceActions } from "../store/auth-slice";

const NavBar = () => {
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const onSideCartHandler = () => {
    console.log("opening sidecart");
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  const onSignInHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };
  return (
    <>
      <div className="nav_container">
        <div className="nav_container_wrapper">
          {!isMobile && (
            <ul className="nav_list">
              <li>
                <DropDown name={"Shop"} item={menu.shop} />
              </li>
              <li>
                <DropDown name={"Category"} item={menu.categories} />{" "}
              </li>
              <li>
                <DropDown name={"Pages"} item={menu.pages} />
              </li>
              <li>
                <DropDown name={"Elements"} item={menu.elements} />
              </li>
            </ul>
          )}
          {isMobile && <MenuOutlined className="mobile-menu" />}
          <div className="logo">
            <Link to="/">FurniZen</Link>
          </div>
          <ul className="nav_icons">
            {!isMobile && (
              <li>
                <HeartOutlined />
              </li>
            )}
            {!isMobile && <li onClick={onSignInHandler}>Sign In</li>}
            <li onClick={onSideCartHandler} className="nav_cart">
              <Badge className="nav_badge" value={cart.length}>
                <ShoppingOutlined />
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
