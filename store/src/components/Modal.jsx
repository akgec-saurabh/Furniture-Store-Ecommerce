import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onConfirm }) => {
  return <div onClick={onConfirm} className="backdrop"></div>;
};

function Modal({ onConfirm, children }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <>{children}</>,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Modal;
