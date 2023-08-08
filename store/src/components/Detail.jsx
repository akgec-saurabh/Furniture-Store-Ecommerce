import React, { useState } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";

function Detail({ product }) {
  console.log(product.reviews);
  const [active, setActiveState] = useState(0);
  return (
    <div className="details">
      <div className="head">
        <div
          onClick={() => {
            setActiveState(0);
          }}
          className={`head_text ${active === 0 ? "active" : ""}`}
        >
          Description
        </div>
        <div
          onClick={() => {
            setActiveState(1);
          }}
          className={`head_text ${active === 1 ? "active" : ""}`}
        >
          Additional Information
        </div>
        <div
          onClick={() => {
            setActiveState(2);
          }}
          className={`head_text ${active === 2 ? "active" : ""}`}
        >
          Reviews
        </div>
      </div>

      <div className="detail_data">
        {active === 0 && (
          <div className="description">{product.longDescription}</div>
        )}
        {active === 1 && (
          <div className="additional_detail">
            <div>
              <div>Weight</div>
              <div>{product.additionalInformation.weightInKg}</div>
            </div>
            <div>
              <div>Dimensions</div>
              <div>{product.additionalInformation.dimensions}</div>
            </div>
            <div>
              <div>Materials</div>
              <div>{product.additionalInformation.materials}</div>
            </div>
            <div>
              <div>Other Info</div>
              <div>{product.additionalInformation.otherInfo}</div>
            </div>
            <div>
              <div>Size</div>
              <div>{product.additionalInformation.size}</div>
            </div>
          </div>
        )}
        {active === 2 && (
          <>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, k) => (
                <Comment key={k} review={review} />
              ))
            ) : (
              <p>No reviews available.</p>
            )}
            <AddComment />
          </>
        )}
      </div>
      <div>
        <div className="more_details">
          <div className="md_sku">
            <div>SKU :&nbsp;</div>
            <div> {product.sku}</div>
          </div>
          <div className="md_category">
            <div>Category :&nbsp;</div>
            <Link className="category" to={`/?category=${product.category}`}>
              {product.category}
            </Link>
          </div>
          <div className="md_tags">
            <div>Tags :&nbsp;</div>
            {product.tag.map((tag) => (
              <Link className="tag" to={`/?tag=${tag}`}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
