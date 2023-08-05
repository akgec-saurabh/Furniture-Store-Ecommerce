import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import {
  loadingContainerVariants,
  loadingErrorVariants,
} from "../helpers/framer-variants";

function Error() {
  return (
    <div className="error">
      <motion.h1 variants={loadingContainerVariants} animate="show">
        <motion.span variants={loadingErrorVariants}>4</motion.span>
        <motion.span variants={loadingErrorVariants}>0</motion.span>
        <motion.span variants={loadingErrorVariants}>4</motion.span>
      </motion.h1>
      <p>Some Error Occured</p>
      <Button s text="Go to Homepage" />
    </div>
  );
}

export default Error;
