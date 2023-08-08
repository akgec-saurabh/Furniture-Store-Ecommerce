import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropDownDesktop = ({ name, items }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
      className="menu"
    >
      <div className="head">{name}</div>
      {isHover && (
        <div className="subMenu">
          {items.map((subMenu) => (
            <Link
              to={
                name === "Category"
                  ? subMenu.value === ""
                    ? "/"
                    : `/?category=${subMenu.value}`
                  : `/${subMenu.value}`
              }
              key={subMenu.value}
              className="item"
            >
              {subMenu.text}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default DropDownDesktop;
