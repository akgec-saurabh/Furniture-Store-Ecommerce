import React from "react";
import ReactDOM from "react-dom";
import "./Backdrop.scss";

function Backdrop() {
  return ReactDOM.createPortal(
    <div className="backdrop"></div>,
    document.getElementById("overlay")
  );
}

export default Backdrop;
