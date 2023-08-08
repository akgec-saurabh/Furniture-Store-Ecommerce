import React from "react";
import MobileDropDown from "./MobileDropDown";
import { LayoutGroup, motion } from "framer-motion";
import DropDown from "./MobileDropDown";
import menu from "../menuData";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authSliceActions } from "../store/auth-slice";

function MobileMenu({ onMenuToggleHandler, menuRef }) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // MENU ITEM CLICKED
  const onMenuClickHandler = (obj) => {
    if (obj.name === "Shop") {
      navigate(`/${obj.value}`);
      // CLOSE MENU
      onMenuToggleHandler();
    } else if (obj.name === "Category") {
      // FIRST NAVIGATE TO HOMEPAGE AND SEARCH QUERY PARAMS
      navigate("/");
      setSearchParams({
        category: obj.value,
      });
      // CLOSE MENU
      onMenuToggleHandler();
    } else if (obj.name === "Pages") {
      navigate(`/${obj.value}`);
      onMenuToggleHandler();
    }
  };

  //ON LOGOUT HANDLER
  const onLogoutHandler = () => {
    try {
      localStorage.removeItem("userData");
    } catch (error) {
      console.log(error);
    }
    dispatch(authSliceActions.clearToken());
    onMenuToggleHandler();
  };

  //ON MY ACCOUNT PAGE
  const onMyAccountPageHandler = () => {
    navigate("/wishlist");
    onMenuToggleHandler();
  };
  return (
    <div ref={menuRef} className="mobileMenu">
      {menu.map((dropdown) => (
        <DropDown
          key={dropdown.text}
          onClick={(obj) => {
            onMenuClickHandler(obj);
          }}
          name={dropdown.text}
          items={dropdown.subMenu}
        />
      ))}
      {token && <Button onClick={onLogoutHandler} text="Logout" />}
      {token && (
        <Button border onClick={onMyAccountPageHandler} text="Wishlist" />
      )}
    </div>
  );
}

export default MobileMenu;
