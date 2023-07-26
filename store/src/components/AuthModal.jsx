import React from "react";
import ReactDOM from "react-dom";
import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/auth-slice";

const Backdrop = ({ onConfirm }) => {
  return <div onClick={onConfirm} className="auth-backdrop"></div>;
};

function AuthModal() {
  const dispatch = useDispatch();
  const onConfirmHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirmHandler} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(<Auth />, document.getElementById("overlay"))}
    </>
  );
}

export default AuthModal;
