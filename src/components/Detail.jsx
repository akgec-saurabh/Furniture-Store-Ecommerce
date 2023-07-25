import React, { useState } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import LoadMore from "./UI/LoadMore/LoadMore";

function Detail() {
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
          <div className="description">
            "Authentic keffiyeh master cleanse. Fingerstache semiotics PBR
            quinoa. Pop-up Godard kale chips, trust fund Neutra fingerstache
            paleo Wes Anderson. Deep v single-origin coffee cred Thundercats
            beard. Mumblecore before they sold out roof party biodiesel. Banksy
            swag Portland readymade synth messenger bag cliche."
          </div>
        )}
        {active === 1 && (
          <div className="additional_detail">
            <div>
              <div>Weight</div>
              <div>1.73</div>
            </div>
            <div>
              <div>Dimensions</div>
              <div>100 x 37 x 100 cm</div>
            </div>
            <div>
              <div>Materials</div>
              <div>80% cotton, 20% linen</div>
            </div>
            <div>
              <div>Other Info</div>
              <div>American heirloom jean shorts pug seitan letterpress.</div>
            </div>
            <div>
              <div>Size</div>
              <div>One Size, XL, L, M, S</div>
            </div>
          </div>
        )}
        {active === 2 && (
          <>
            <Comment />
            <AddComment />
          </>
        )}
      </div>
      <LoadMore>
        <div className="more_details">
          <div className="md_sku">
            <div>SKU :&nbsp;</div>
            <div> 73253-5</div>
          </div>
          <div className="md_category">
            <div>Category :&nbsp;</div>
            <div> Essentials</div>
          </div>
          <div className="md_tags">
            <div>Tags :&nbsp;</div>
            <div>Contemporary, Essentials, Minimal</div>
          </div>
        </div>
      </LoadMore>
    </div>
  );
}

export default Detail;
