import React, { useState } from "react";
import "./AddComment.scss";
import "./AddComment.scss";
import Ratings from "../UI/Ratings/Ratings";
import Form from "../Form/Form";
function AddComment() {
  const [givenRating, setGivenRating] = useState(0);

  const onRatingHandler = (i) => {
    setGivenRating(i);
  };
  return (
    <div className="addcomment_container">
      <div className="head">Add a review</div>
      <div className="imp">
        Your email address will not be published. Required fields are marked *
      </div>
      <div className="your_rating">
        <div className="your_rating_head">Your rating *</div>
        <Ratings cangive />
        <Form />
      </div>
    </div>
  );
}

export default AddComment;
