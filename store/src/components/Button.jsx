import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { LayoutGroup, motion } from "framer-motion";

import { basicVariants } from "../helpers/framer-variants";

function Button({ text, onClick, isLoading, border = false, ...props }) {
  return (
    <motion.button
      layout
      variants={basicVariants}
      onClick={onClick}
      className={`button  ${border ? "border-button" : ""} `}
      {...props}
    >
      <div className="button-text-wrapper">
        <span className={isLoading ? "loading-text" : ""}>{text}</span>
        {isLoading && (
          <motion.div className="loading-icon">
            <LoadingOutlined />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

export default Button;
