import React, { useState } from "react";
import "./NavBar.scss";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import Badge from "../UI/Badge";
import DropDown from "../UI/DropDown/DropDown";

import menu from "../../navMenuData";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../../store/sideCart-slice";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const onSideCartHandler = () => {
    console.log("opening sidecart");
    dispatch(sideCartSliceActions.toggleSideCart());
  };
  return (
    <div className="nav_container">
      <div className="nav_container_wrapper">
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
        <div className="logo">
          <Link to="/">FurniZen</Link>
        </div>
        <ul className="nav_icons">
          <li>
            <HeartOutlined />
          </li>
          <li>Sign In</li>
          <li onClick={onSideCartHandler} className="nav_cart">
            <Badge className="nav_badge" value={cart.length}>
              <ShoppingOutlined />
            </Badge>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
