import {
  MenuOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import MobileMenu from "../components/MobileMenu";
import Modal from "../HOC/Modal";
import { useDispatch, useSelector } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";
import { authSliceActions } from "../store/auth-slice";
import Badge from "../components/Badge";

function MobileNavbar({ cartValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const menuBtnRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!menuBtnRef.current?.contains(e.target)) {
        if (!menuRef.current?.contains(e.target)) {
          console.log("clicked not contains menu ", isOpen);
          if (isOpen) {
            setIsOpen(false);
          }
        }
      }
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const onMenuToggleHandler = () => {
    setIsOpen((prv) => !prv);
  };

  //OPEN SIDECART
  const onOpenSideCartHandler = () => {
    dispatch(sideCartSliceActions.openSideCart());
  };

  //OPEN AUTHMODAL
  const onOpenAuthModalHandler = () => {
    dispatch(authSliceActions.openAuthModal());
  };

  return (
    <div className="mobile-nav">
      <MenuOutlined ref={menuBtnRef} onClick={onMenuToggleHandler} />
      <Logo />

      {token && (
        <Badge className="nav_badge" value={cartValue}>
          <ShoppingOutlined onClick={onOpenSideCartHandler} />
        </Badge>
      )}

      {!token && <UserOutlined onClick={onOpenAuthModalHandler} />}
      {isOpen && (
        <Modal mobileNavOverlay onConfirm={onMenuToggleHandler}>
          <MobileMenu
            onMenuToggleHandler={onMenuToggleHandler}
            menuRef={menuRef}
          />
        </Modal>
      )}
    </div>
  );
}

export default MobileNavbar;
