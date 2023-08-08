import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onConfirm }) => {
  return <div onClick={onConfirm} className="backdrop"></div>;
};

const Overlay = ({ children, mobileNavOverlay, center }) => {
  return (
    <div
      className={`overlay ${center ? "authOverlay" : ""} ${
        mobileNavOverlay ? "mobileNavOverlay" : ""
      }`}
    >
      {children}
    </div>
  );
};

function Modal({
  center = true,
  onConfirm,
  children,
  mobileNavOverlay = false,
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop")
      )}

      {ReactDOM.createPortal(
        <Overlay
          center={center}
          mobileNavOverlay={mobileNavOverlay}
          children={children}
        />,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Modal;
