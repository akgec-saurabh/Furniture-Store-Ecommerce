import React from "react";
import "./LoadMore.scss";
const LoadMore = ({ children }) => {
  return (
    <div className="loadmore_container">
      <div className="loadmore_container_wrapper">{children}</div>
    </div>
  );
};

export default LoadMore;
