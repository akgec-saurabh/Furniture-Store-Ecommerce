import React, { useEffect, useState } from "react";
import Input from "./Input";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Button from "./Button";
import { easeInOut, motion } from "framer-motion";
import { useLoginUserMutation } from "../store/product-api";
import { useDispatch, useSelector } from "react-redux";
import { toastSliceActions } from "../store/toast-slice";
import { authSliceActions } from "../store/auth-slice";
import { CodeSandboxOutlined } from "@ant-design/icons";

function LoginForm({ loginUser, isLoading, isError, error }) {
  // const [loginUser, { data, isLoading, isSuccess, isError, error }] =
  // useLoginUserMutation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(data, isSuccess, isError, error);

  //   if (isSuccess) {
  //     dispatch(
  //       authSliceActions.updateUserData(data.message, data.head, data.token)
  //     );
  //   }
  // }, [isSuccess]);

  const [initialLoginValues, setInitialLoginValues] = useState({
    email: "",
    password: "",
  });

  const onGuestAccountHandler = () => {
    console.log("setting inital value");
    setInitialLoginValues({
      email: "guest@guest.com",
      password: "Password123",
    });
    console.log(initialLoginValues);
  };

  return (
    <div className="loginForm">
      <h2>Login Form</h2>
      <Formik
        enableReinitialize
        initialValues={initialLoginValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid Email Address")
            .required("Required"),

          password: Yup.string()
            .min(8, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password requires a number")
            .matches(/[a-z]/, "Password requires a lowercase letter")
            .matches(/[A-Z]/, "Password requires an uppercase letter")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          loginUser({ ...values });

          setSubmitting(false);
        }}
      >
        <Form>
          <Input label="Email" name="email" />
          <Input label="Password" type="password" name="password" />
          <Button isLoading={isLoading} type="submit" text="Login" />
          {isError && (
            <div className="error-login-text">
              ({error.error || error.data.message})
            </div>
          )}
        </Form>
      </Formik>
      <Button border onClick={onGuestAccountHandler} text={"Guest Account"} />
    </div>
  );
}

export default LoginForm;
