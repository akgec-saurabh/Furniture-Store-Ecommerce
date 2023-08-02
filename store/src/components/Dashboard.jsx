import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/auth-slice";

function Dashboard() {
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(authSliceActions.clearToken());
  };
  const { firstname, email } = useSelector((state) => state.auth);
  return (
    <div className="dashboard">
      <UserOutlined className="icon" />
      <div className="firstname">
        <span>Name :</span>
        <span>{firstname}</span>
      </div>
      <div className="email">
        <span>Email :</span>
        <span>{email}</span>
      </div>
      <button onClick={onLogoutHandler} className="btn">
        Logout
        <LogoutOutlined className="icon" />
      </button>
    </div>
  );
}

export default Dashboard;
