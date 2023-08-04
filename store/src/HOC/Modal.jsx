import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { backdropVariants, overlayVariants } from "../helpers/framer-variants";

const Backdrop = ({ onConfirm }) => {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hide"
      animate="show"
      exit="hide"
      onClick={onConfirm}
      className="backdrop"
    ></motion.div>
  );
};

const Overlay = ({ children }) => {
  useEffect(() => {
    console.log("overlay rendered");
  }, []);
  return (
    <motion.div
      variants={overlayVariants}
      initial="hide"
      animate="show"
      exit="hide"
      className="overlay"
    >
      {children}
    </motion.div>
  );
};

function Modal({ onConfirm, children }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop")
      )}

      {ReactDOM.createPortal(
        <Overlay children={children} />,
        document.getElementById("overlay")
      )}
    </>
  );
}

export default Modal;
