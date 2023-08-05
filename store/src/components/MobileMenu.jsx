import React from "react";
import MobileDropDown from "./MobileDropDown";
import { LayoutGroup, motion } from "framer-motion";
import DropDown from "./MobileDropDown";
import menu from "../menuData";

function MobileMenu({ menuRef }) {
  return (
    <div ref={menuRef} className="mobileMenu">
      {menu.map((dropdown) => (
        <DropDown name={dropdown.text} items={dropdown.subMenu} />
      ))}
    </div>
  );
}

export default MobileMenu;
