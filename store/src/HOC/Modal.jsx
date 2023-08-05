import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onConfirm }) => {
  return <div onClick={onConfirm} className="backdrop"></div>;
};

const Overlay = ({ children, mobileNavOverlay = false }) => {
  return (
    <div className={`overlay ${mobileNavOverlay ? "mobileNavOverlay" : ""}`}>
      {children}
    </div>
  );
};

function Modal({ onConfirm, children, mobileNavOverlay = false }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop")
      )}

      {ReactDOM.createPortal(
        <Overlay mobileNavOverlay={mobileNavOverlay} children={children} />,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Modal;
