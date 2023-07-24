import React from "react";
import "./Button.scss";

function Button({ children }) {
  return <div className="button_container">{children}</div>;
}

export default Button;
