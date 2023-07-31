import { StarFilled, StarOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

function Rating({ value, enable }) {
  const [rating, setRating] = useState(value || null);
  const [star, setStar] = useState(value);

  const onRatingSelectHandler = (value) => {
    console.log(value);
    if (enable) {
      setRating(value);
    }
  };

  const renderStar = () => {
    if (!rating) {
      console.log(rating);
      const star = [];
      for (let i = 1; i <= 5; i++) {
        star.push(
          <StarOutlined
            className="icon"
            onClick={() => onRatingSelectHandler(i)}
          />
        );
      }
      return star;
    }
    if (rating) {
      const star = [];
      for (let i = 1; i <= 5; i++) {
        const temp =
          i <= rating ? (
            <StarFilled
              className="icon"
              onClick={() => onRatingSelectHandler(i)}
            />
          ) : (
            <StarOutlined
              className="icon"
              onClick={() => onRatingSelectHandler(i)}
            />
          );
        star.push(temp);
      }
      return star;
    }
  };

  return <div className="rating">{renderStar()}</div>;
}

export default Rating;
