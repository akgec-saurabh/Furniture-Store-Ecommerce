import React from "react";
import Ratings from "./Ratings";

function Comment({
  review = {
    name: "",
    date: "",
    review: "",
    star: "",
  },
}) {
  console.log(review);
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
          <div className="cd-info">
            <div className="name">{review.name && review.name}</div>
            <div className="time">
              {new Date(review.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="cd-rating">
            <Ratings rating={review.star} />
          </div>
        </div>
        <div className="comment_container_comment">{review.review}</div>
      </div>
    </div>
  );
}

export default Comment;
