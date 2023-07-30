import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const backVariant = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 0.5,
    transition: {
      duration: 0.5,
    },
  },
};

const Backdrop = ({ onConfirm }) => {
  return (
    <motion.div
      variants={backVariant}
      initial="hide"
      animate="show"
      exit="hide"
      onClick={onConfirm}
      className="backdrop"
    ></motion.div>
  );
};

function Modal({ onConfirm }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById("backdrop")
      )}
    </>
  );
}

export default Modal;
