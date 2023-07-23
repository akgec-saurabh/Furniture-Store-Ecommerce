import React from "react";
import "./Badge.scss";

const Badge = ({ children, value }) => {
  return (
    <div className="badge_container">
      <div className="badge">{value}</div>
      {children}
    </div>
  );
};

export default Badge;
