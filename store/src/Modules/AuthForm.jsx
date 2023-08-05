import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Button from "../components/Button";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth-slice";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../store/product-api";

function AuthForm() {
  const disaptch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [
    loginUser,
    {
      data: loginData,
      isError: loginIsError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isError: registerIsError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const onAuthToggleHandler = () => {
    setIsLogin((prv) => !prv);
  };

  const onAuthCloseHandler = () => {
    disaptch(authSliceActions.closeAuthModal());
  };

  useEffect(() => {
    //Getting User Data and closing authModal
    if (registerIsSuccess) {
      disaptch(
        authSliceActions.updateUserData({
          email: registerData.email,
          token: registerData.token,
          firstname: registerData.firstname,
        })
      );
      disaptch(authSliceActions.closeAuthModal());
    } else if (loginIsSuccess) {
      disaptch(
        authSliceActions.updateUserData({
          email: loginData.email,
          token: loginData.token,
          firstname: loginData.firstname,
        })
      );

      disaptch(authSliceActions.closeAuthModal());
    }
  }, [registerIsSuccess, loginIsSuccess]);
  return (
    <div className="authForm">
      <CloseOutlined onClick={onAuthCloseHandler} className="close-icon" />

      {isLogin && (
        <LoginForm
          loginUser={loginUser}
          isError={loginIsError}
          isLoading={loginIsLoading}
          error={loginError}
        />
      )}
      {!isLogin && (
        <RegisterForm
          registerUser={registerUser}
          isError={registerIsError}
          isLoading={registerIsLoading}
          error={registerError}
        />
      )}

      {isLogin && (
        <Button onClick={onAuthToggleHandler} border text="Create account" />
      )}

      {!isLogin && <Button onClick={onAuthToggleHandler} border text="Login" />}
    </div>
  );
}

export default AuthForm;
