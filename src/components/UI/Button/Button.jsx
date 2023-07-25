import React from "react";
import "./Button.scss";

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button_container">
      {children}
    </button>
  );
}

export default Button;
