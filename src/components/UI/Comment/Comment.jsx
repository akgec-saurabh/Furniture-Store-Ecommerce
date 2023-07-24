import React from "react";
import "./Comment.scss";
import Ratings from "../Ratings/Ratings";

function Comment() {
  return (
    <div className="comment_container">
      <div className="userPic_wrapper">
        <img
          className="userPic"
          src="https://secure.gravatar.com/avatar/fb411414965058214f1a1d7cf15be210?s=60&d=mm&r=g"
          alt="user Pic"
        />
      </div>
      <div className="comment_data">
        <div className="comment_detail">
          <div>
            <div className="name">Saurabh</div>
            <div className="time">September 26, 2020</div>
          </div>
          <Ratings rating={5} />
        </div>
        <div className="comment_container_comment">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis quod
          autem voluptates aspernatur. Sint nam a odit minima quasi
          consequuntur?
        </div>
      </div>
    </div>
  );
}

export default Comment;
