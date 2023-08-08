import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

function DropDown({ name, items, onClick }) {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  // Listen for click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
  }, []);

  // Toggle DropDown on Dropdown head click
  const onDropDownCloseHandler = () => {
    setIsOpen((prv) => !prv);
  };
  return (
    <div ref={dropDownRef} className="dropDown">
      <div onClick={onDropDownCloseHandler} className="head">
        {name}

        {!isOpen && <DownOutlined />}
        {isOpen && <UpOutlined />}
      </div>

      {isOpen &&
        items.map((item) => (
          <div
            onClick={() => onClick({ name: name, value: item.value })}
            key={item.text}
            className="item"
          >
            <div>{item.text}</div>
          </div>
        ))}
    </div>
  );
}

export default DropDown;
