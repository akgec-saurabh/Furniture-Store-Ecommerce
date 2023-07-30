import { BugOutlined } from "@ant-design/icons";
import React from "react";
import { motion } from "framer-motion";
const errorVariants = {
  hide: {
    opacity: 0,
    y: "-100%",
    x: "-50%",
    transition: {
      ease: "easeInOut",
      //   duration: 0.4,
    },
  },
  show: {
    y: "-50%",
    x: "-50%",
    opacity: 1,
    transition: {
      ease: "easeInOut",

      //   duration: 0.4,
    },
  },
};
function ErrrModal({ message, onClick }) {
  return (
    <motion.div
      variants={errorVariants}
      initial="hide"
      animate="show"
      exit="hide"
      className="errorModal"
    >
      <div className="errorHead">
        <BugOutlined className="icon" /> Error
      </div>
      <div className="errorMessage">{message}</div>
      <button onClick={onClick} className="btn">
        Close
      </button>
    </motion.div>
  );
}

export default ErrrModal;
