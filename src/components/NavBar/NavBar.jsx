import React, { useState } from "react";
import "./NavBar.scss";
import { HeartOutlined, ShoppingOutlined } from "@ant-design/icons";
import Badge from "../UI/Badge";
import DropDown from "../UI/DropDown/DropDown";

import menu from "../../navMenuData";

const NavBar = () => {
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
        <div className="logo">FurniZen</div>
        <ul className="nav_icons">
          <li>
            <HeartOutlined />
          </li>
          <li>Sign In</li>
          <li className="nav_cart">
            <Badge className="nav_badge" value={2}>
              <ShoppingOutlined />
            </Badge>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
