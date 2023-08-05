import { MenuOutlined, ShoppingOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../components/Logo";
import MobileMenu from "../components/MobileMenu";
import Modal from "../HOC/Modal";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const onMenuToggleHandler = () => {
    setIsOpen((prv) => !prv);
  };

  return (
    <div className="mobile-nav">
      <MenuOutlined onClick={onMenuToggleHandler} />
      <Logo />

      <ShoppingOutlined />
      {isOpen && (
        <Modal mobileNavOverlay onConfirm={onMenuToggleHandler}>
          <MobileMenu menuRef={menuRef} />
        </Modal>
      )}
    </div>
  );
}

export default MobileNavbar;
