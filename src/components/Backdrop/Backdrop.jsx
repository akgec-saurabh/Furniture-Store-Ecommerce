import React from "react";
import ReactDOM from "react-dom";
import "./Backdrop.scss";
import { useDispatch } from "react-redux";
import { sideCartSliceActions } from "../../store/sideCart-slice";

function Backdrop() {
  const dispatch = useDispatch();
  const onBackDropClickHandler = () => {
    //toggling sideCart
    dispatch(sideCartSliceActions.toggleSideCart());
  };
  return ReactDOM.createPortal(
    <div onClick={onBackDropClickHandler} className="backdrop"></div>,
    document.getElementById("overlay")
  );
}

export default Backdrop;
