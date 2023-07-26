import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { sideCartSliceActions } from "../store/sideCart-slice";

function Backdrop( {onConfirm}) {
  const dispatch = useDispatch();
  const onBackDropClickHandler = () => {
    //toggling sideCart
    dispatch(sideCartSliceActions.toggleSideCart());
  };
  return ReactDOM.createPortal(
    <div onClick={onBackDropClickHandler} className="backdrop"></div>,
    document.getElementById("backdrop")
  );
}

export default Backdrop;
