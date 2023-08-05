import React from "react";
import { easeInOut, motion, animate, useAnimate } from "framer-motion";
import {
  loadingContainerVariants,
  loadingDotVariants,
} from "../helpers/framer-variants";

function Loading() {
  return (
    <motion.div
      variants={loadingContainerVariants}
      initial="hide"
      animate="show"
      className="loading"
    >
      <motion.div variants={loadingDotVariants} className="dot"></motion.div>
      <motion.div variants={loadingDotVariants} className="dot"></motion.div>
      <motion.div variants={loadingDotVariants} className="dot"></motion.div>
    </motion.div>
  );
}

export default Loading;
