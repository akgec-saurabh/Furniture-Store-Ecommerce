import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <NavLink to="products">Product Page</NavLink>
        </li>
        <li>
          <NavLink to="/add-product">Add Product</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
