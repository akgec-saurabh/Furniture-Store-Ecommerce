import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth-slice";
import { register, startLogin } from "../store/auth-actions";

import { AnimatePresence, easeInOut, motion } from "framer-motion";

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
  const [login, setlogin] = useState(true);
  const [authData, setAuthData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const authModalOpen = useSelector((state) => state.auth.authModalOpen);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAuthData((prv) => {
      return { ...prv, [name]: value };
    });
  };
  const dispatch = useDispatch();

  const onAuthSubmitHandler = () => {
    console.log(authData);
    if (login) {
      dispatch(
        startLogin({ email: authData.email, password: authData.password })
      );
    } else {
      dispatch(register(authData));
    }
  };

  const onCloseAuthHandler = () => {
    dispatch(authSliceActions.toggleAuthModal());
  };

  const toggleAuthHandler = () => {
    setlogin((prv) => !prv);
  };
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
          onExitComplete={() => {
            // Perform any necessary clean-up or unmount the component here
            dispatch(authSliceActions.toggleAuthModal());
          }}
        >
          <CloseOutlined className="auth-close" onClick={onCloseAuthHandler} />
          <h2 className="auth-head">{login ? "Login" : "Register"}</h2>
          {!login && (
            <div className="name">
              <div className="firstname">
                <label htmlFor="firstname">First Name</label>
                <input
                  onChange={onChangeHandler}
                  className="input"
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={authData.firstname}
                  placeholder="First Name"
                />
              </div>
              <div className="lastname">
                <label htmlFor="lastname">Last Name</label>
                <input
                  onChange={onChangeHandler}
                  className="input"
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={authData.lastname}
                  placeholder="last Name"
                />
              </div>
            </div>
          )}
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              onChange={onChangeHandler}
              className="input"
              type="text"
              name="email"
              id="email"
              value={authData.email}
              placeholder="Email"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              onChange={onChangeHandler}
              className="input"
              type="password"
              name="password"
              id="password"
              value={authData.password}
              placeholder="Password"
            />
          </div>
          <button onClick={onAuthSubmitHandler} className="btn authBtn">
            {login ? "Log In" : "Register"}
          </button>
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
