import React from "react";

const Badge = ({ children, value }) => {
  return (
    <div className="badge_container">
      {value !== 0 && <div className="badge">{value}</div>}
      {children}
    </div>
  );
};

export default Badge;
