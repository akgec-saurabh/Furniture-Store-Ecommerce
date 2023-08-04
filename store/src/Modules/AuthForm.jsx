import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Button from "../components/Button";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth-slice";
import { basicVariants } from "../helpers/framer-variants";

function AuthForm() {
  const disaptch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const onAuthToggleHandler = () => {
    setIsLogin((prv) => !prv);
  };

  const onAuthCloseHandler = () => {
    disaptch(authSliceActions.toggleAuthModal());
  };
  return (
    <div className="authForm">
      <CloseOutlined onClick={onAuthCloseHandler} className="close-icon" />

      {isLogin && <LoginForm />}
      {!isLogin && <RegisterForm />}

      {isLogin && (
        <Button onClick={onAuthToggleHandler} border text="Create account" />
      )}

      {!isLogin && <Button onClick={onAuthToggleHandler} border text="Login" />}
    </div>
  );
}

export default AuthForm;
