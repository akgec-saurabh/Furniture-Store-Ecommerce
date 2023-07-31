import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SecondaryNav = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchCategory, setSearchCategory] = useSearchParams({});

  const onCategoryHandler = (e) => {
    setActiveCategory(e.target.outerText);
    console.log(e.target.outerText);
    setSearchCategory({ category: encodeURIComponent(e.target.outerText) });
  };
  return (
    <div className="secondaryNav">
      <div className="categoryContainer">
        <div className="categoryHead">Category</div>
        <div className="category">
          <span
            onClick={(e) => onCategoryHandler(e)}
            className={activeCategory === "All" ? "active" : ""}
          >
            All
          </span>
          <span className="categoryDivide">/</span>
          <span
            onClick={(e) => onCategoryHandler(e)}
            className={activeCategory === "Bags & Backpacks" ? "active" : ""}
          >
            Bags & Backpacks
          </span>
          <span className="categoryDivide">/</span>
          <span
            onClick={(e) => onCategoryHandler(e)}
            className={activeCategory === "Decoration" ? "active" : ""}
          >
            Decoration
          </span>
          <span className="categoryDivide">/</span>
          <span
            onClick={(e) => onCategoryHandler(e)}
            className={activeCategory === "Essentials" ? "active" : ""}
          >
            Essentials
          </span>
          <span className="categoryDivide">/</span>
          <span
            onClick={(e) => onCategoryHandler(e)}
            className={activeCategory === "Interior" ? "active" : ""}
          >
            Interior
          </span>
        </div>
      </div>
      <div className="filter">
        <div className="filterContainer">
          <div className="filterHead">Filter</div>
          <div className="filter"></div>
        </div>
        <div>/</div>
        <div className="search">
          Search <SearchOutlined />
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
