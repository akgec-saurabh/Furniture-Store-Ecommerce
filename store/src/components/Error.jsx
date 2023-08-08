import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import {
  loadingContainerVariants,
  loadingErrorVariants,
} from "../helpers/framer-variants";
import { useNavigate } from "react-router-dom";

function Error({ status, message }) {
  const navigate = useNavigate();
  const onGoToHomePage = () => {
    navigate("/");
  };
  const code = status.toString().split("");
  return (
    <div className="errorComponent">
      <motion.h1 variants={loadingContainerVariants} animate="show">
        {code.map((char, i) => (
          <motion.span key={char + i} variants={loadingErrorVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <p>{message}</p>
      <Button margin onClick={onGoToHomePage} m text="Go to Homepage" />
    </div>
  );
}

export default Error;
