import React from "react";
import DropDown from "./DropDown";
import navData from "./../navMenuData";
import {
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

function NavBar() {
  return (
    <div className="navBar">
      <ul className="leftMenu">
        <li>
          <DropDown head="Shop" item={navData.shop} />
        </li>
        <li>
          <DropDown head="Category" item={navData.categories} />
        </li>
        <li>
          <DropDown head="Pages" item={navData.pages} />
        </li>
        <li>
          <DropDown head="Elements" item={navData.elements} />
        </li>
      </ul>
      <div className="logo">FURNIZEN</div>
      <ul className="rightMenu">
        <li>
          <HeartOutlined />
        </li>
        <li>
          Sign In <UserOutlined />
        </li>
        <li>
          <ShoppingOutlined />
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
