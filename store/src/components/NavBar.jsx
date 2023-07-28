import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
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
import DropDownMobile from "./DropDownMobile";

const NavBar = () => {
  const isMobile = window.matchMedia("(max-width: 960px)").matches;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onSideCartHandler = () => {
    console.log("opening sidecart");
    dispatch(sideCartSliceActions.toggleSideCart());
  };

  const onSignInHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };

  const onMobileMenuClickHandler = () => {
    setIsMobileMenuOpen((prv) => !prv);
  };
  return (
    <>
      <div className="nav_container">
        <div className="nav_container_wrapper">
          {!isMobile && (
            <ul className="nav_list-desktop">
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

          {isMobile && !isMobileMenuOpen && (
            <MenuOutlined
              onClick={onMobileMenuClickHandler}
              className="mobile-menu"
            />
          )}
          {isMobile && isMobileMenuOpen && (
            <CloseOutlined
              onClick={onMobileMenuClickHandler}
              className="mobile-menu"
            />
          )}
          {isMobile && isMobileMenuOpen && (
            <ul className="nav_list-mobile">
              <li>
                <DropDownMobile name={"Shop"} item={menu.shop} />
              </li>
              <li>
                <DropDownMobile name={"Category"} item={menu.categories} />{" "}
              </li>
              <li>
                <DropDownMobile name={"Pages"} item={menu.pages} />
              </li>
              <li>
                <DropDownMobile name={"Elements"} item={menu.elements} />
              </li>
            </ul>
          )}
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
