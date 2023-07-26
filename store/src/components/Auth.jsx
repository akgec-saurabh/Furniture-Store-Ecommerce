import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/auth-slice";
import { register, startLogin } from "../store/auth-actions";

function Auth() {
  const [login, setlogin] = useState(true);
  const [authData, setAuthData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

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
    <div className="auth">
      <CloseCircleOutlined
        className="auth-close"
        onClick={onCloseAuthHandler}
      />
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
    </div>
  );
}

export default Auth;
