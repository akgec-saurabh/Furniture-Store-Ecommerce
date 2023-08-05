import { CloseOutlined } from "@ant-design/icons";
import React from "react";

function ActiveFilter({ label, text, onClear }) {
  return (
    <span onClick={onClear} className="activeFilter">
      <div className="linethrough"></div>
      <CloseOutlined className="icon" />
      <span className="label">
        {label}
        <span className="text">{text}</span>
      </span>
    </span>
  );
}

export default ActiveFilter;
