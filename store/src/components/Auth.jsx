import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth-slice";
import { register, startLogin } from "../store/auth-actions";

import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
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

  const [login, setlogin] = useState(true);

  const authModalOpen = useSelector((state) => state.auth.authModalOpen);

  const dispatch = useDispatch();

  const onCloseAuthHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };

  const toggleAuthHandler = () => {
    setlogin((prv) => !prv);
  };

  useEffect(() => {
    if (regSuccess || loginSuccess) {
      const data = regSuccess ? registerData : loginSuccess ? loginData : null;
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
  }, [loginSuccess, regSuccess]);

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

          {!login && (
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                firstname: Yup.string()
                  .max(20, "Must be 20 character or less")
                  .required("Required"),

                lastname: Yup.string()
                  .max(20, "Must be 20 character or less")
                  .required("Required"),

                email: Yup.string()
                  .email("Invalid Email Address")
                  .required("Required"),

                password: Yup.string()
                  .min(8, "Password must be 8 characters long")
                  .matches(/[0-9]/, "Password requires a number")
                  .matches(/[a-z]/, "Password requires a lowercase letter")
                  .matches(/[A-Z]/, "Password requires an uppercase letter")
                  .required("Required"),

                confirmpassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Password do not match")
                  .required("Required"),
              })}
              onSubmit={(values) => {
                regUser({ ...values });
              }}
            >
              <Form>
                <div className="inputFirstnameBox">
                  <label htmlFor="firstname">First Name</label>
                  <Field name="firstname" type="text" />
                  <ErrorMessage name="firstname" />
                </div>

                <div className="inputLastnameBox">
                  <label htmlFor="lastname">Last Name</label>
                  <Field name="lastname" type="text" />
                  <ErrorMessage name="lastname" />
                </div>

                <div className="inputEmailBox">
                  <label htmlFor="email">Email</label>
                  <Field type="text" name="email" />
                  <ErrorMessage name="email" />
                </div>

                <div className="inputPasswordBox">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" />
                </div>

                <div className="inputConfirmPasswordBox">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <Field type="password" name="confirmpassword" />
                  <ErrorMessage name="confirmpassword" />
                </div>

                <button className="btn" type="submit">
                  Register
                </button>
              </Form>
            </Formik>
          )}

          {/* FOR LOGIN  */}
          {login && (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid Email Address")
                  .required("Required"),

                password: Yup.string()
                  // .min(8, "Password must be 8 characters long")
                  // .matches(/[0-9]/, "Password requires a number")
                  // .matches(/[a-z]/, "Password requires a lowercase letter")
                  // .matches(/[A-Z]/, "Password requires an uppercase letter")
                  .required("Required"),
              })}
              onSubmit={(values) => {
                loginUser({ ...values });
              }}
            >
              <Form>
                <div className="inputEmailBox">
                  <label htmlFor="email">Email</label>
                  <Field type="text" name="email" />
                  <ErrorMessage name="email" />
                </div>

                <div className="inputPasswordBox">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" />
                </div>

                <button className="btn" type="submit">
                  Login
                </button>
              </Form>
            </Formik>
          )}

          <div className="auth-or">
            <span className="auth-l"></span>
            <span>or</span>
            <span className="auth-l"></span>
          </div>
          <button onClick={toggleAuthHandler} className="btnw authToggleBtn">
            {login ? "Register" : "Log In"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Auth;
