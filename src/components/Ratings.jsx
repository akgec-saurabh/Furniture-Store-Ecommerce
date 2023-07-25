import { StarFilled, StarOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function Ratings({ rating, cangive }) {
  const [currentRating, setCurrentRating] = useState(rating || 0);
  const [interact, setInteract] = useState(cangive || false);

  const handleRatingChange = (i) => {
    if (cangive) {
      setCurrentRating(i);
    }
    setInteract(false);
  };

  const onMouseEnterHandler = (i) => {
    console.log("enter set " + i);
    if (interact) {
      setCurrentRating(i);
    }
  };
  const onMouseLeaveHandler = (i) => {
    if (interact) {
      setCurrentRating(0);
    }
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      const starIcon =
        i <= currentRating ? (
          <StarFilled
            className="icon"
            key={i}
            onClick={() => {
              handleRatingChange(i);
            }}
            onMouseLeave={onMouseLeaveHandler}
          />
        ) : (
          <StarOutlined
            className="icon"
            key={i}
            onMouseEnter={() => {
              onMouseEnterHandler(i);
            }}
            onClick={() => {
              handleRatingChange(i);
            }}
          />
        );
      stars.push(starIcon);
    }
    return stars;
  };

  // useEffect(() => {
  //   renderStars();
  // }, [rating]);

  return <div className="rating">{renderStars()}</div>;
}

export default Ratings;
