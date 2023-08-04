import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth-slice";
import { register, startLogin } from "../store/auth-actions";

import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  useLoginGuestQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../store/product-api";

const authVariants = {
  hide: {
    opacity: 0,
    y: "-100%",
    x: "-50%",
    transition: {
      ease: easeInOut,
      //   duration: 0.4,
    },
  },
  show: {
    y: "-50%",
    x: "-50%",
    opacity: 1,
    transition: {
      ease: easeInOut,

      //   duration: 0.4,
    },
  },
};

function Auth() {
  const [
    loginUser,
    { data: loginData, isLoading: loginLoding, isSuccess: loginSuccess },
  ] = useLoginUserMutation();
  const [
    regUser,
    { data: registerData, isLoading: registerLoading, isSuccess: regSuccess },
  ] = useRegisterUserMutation();

  const [enableGuest, setEnableGuest] = useState(false);

  const {
    data: guestData,
    isLoading,
    isSuccess,
  } = useLoginGuestQuery({ skip: !enableGuest });
  const [login, setlogin] = useState(true);

  const authModalOpen = useSelector((state) => state.auth.authModalOpen);

  const dispatch = useDispatch();

  const onCloseAuthHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };

  const toggleAuthHandler = () => {
    setlogin((prv) => !prv);
  };

  const onGuestLoginHandler = () => {
    setEnableGuest(true);
  };

  useEffect(() => {
    if (regSuccess || loginSuccess || guestData) {
      const data = regSuccess
        ? registerData
        : loginSuccess
        ? loginData
        : guestData;
      try {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: data.email,
            firstname: data.firstname,
            token: data.token,
          })
        );
      } catch (error) {
        console.log(error);
      }
      console.log(guestData);

      //Sharing State across app
      dispatch(
        authSliceActions.updateUserData({
          email: data.email,
          firstname: data.firstname,
          token: data.token,
        })
      );

      dispatch(authSliceActions.toggleAuthModal());
    }
  }, [loginSuccess, regSuccess, enableGuest]);

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          variants={authVariants}
          initial="hide"
          animate="show"
          key="auth"
          exit="hide"
          className="auth"
        >
          <CloseOutlined className="auth-close" onClick={onCloseAuthHandler} />
          <h2 className="auth-head">{login ? "Login" : "Register"}</h2>

          {/* FOR REGISTER  */}

          <div className="auth-or">
            <span className="auth-l"></span>
            <span>or</span>
            <span className="auth-l"></span>
          </div>
          <button onClick={toggleAuthHandler} className="btnw authToggleBtn">
            {login ? "Register" : "Log In"}
          </button>
          <button className="btn" onClick={onGuestLoginHandler}>
            Guest Login
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Auth;
