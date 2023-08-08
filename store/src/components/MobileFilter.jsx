import React, { useState } from "react";
import {
  categoryData,
  colors,
  priceRanges,
  sortOptions,
  tagsData,
} from "../filterData";
import MobileDropDown from "./MobileDropDown";

function MobileFilter({
  onCategoryHandler,
  onClearCategoryHandler,
  onSortFilterHandler,
  onClearSortHandler,
  onPriceFilterHandler,
  onPriceClearHandler,
  onTagHandler,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onCategoryOpenHandler = () => {
    setIsCategoryOpen((prv) => !prv);
    setIsFilterOpen(false);
  };
  const onFilterOpenHandler = () => {
    setIsFilterOpen((prv) => !prv);
    setIsCategoryOpen(false);
  };
  return (
    <div className="mobileFilter">
      <div className="mobileFilterWrapper">
        <div className="category">
          <div
            onClick={onCategoryOpenHandler}
            className={`head ${isCategoryOpen ? "active" : ""}`}
          >
            Categories
          </div>
        </div>
        <div className="filter">
          <div
            onClick={onFilterOpenHandler}
            className={`head ${isFilterOpen ? "active" : ""}`}
          >
            Filter
          </div>
        </div>
      </div>
      <div className="mobileFilterList">
        {isCategoryOpen && (
          <div className="items">
            <div
              onClick={() => {
                onCategoryOpenHandler();
                onClearCategoryHandler();
              }}
              className="category-item"
            >
              All
            </div>
            {categoryData.map((item) => (
              <div
                onClick={() => {
                  onCategoryOpenHandler();
                  onCategoryHandler(item.url);
                }}
                className="category-item"
              >
                {item.text}
              </div>
            ))}
          </div>
        )}
        {isFilterOpen && (
          <div className="filter-items">
            <MobileDropDown
              name="Sory by"
              items={sortOptions}
              onClick={(e) => {
                onSortFilterHandler(e);
                onFilterOpenHandler();
              }}
            />
            <MobileDropDown
              name="Price"
              items={priceRanges}
              onClick={(e) => {
                onPriceFilterHandler(e.min_price, e.max_price);
                onFilterOpenHandler();
              }}
            />
            <MobileDropDown name="Colors" items={colors} />
            <MobileDropDown
              onClick={(e) => {
                onTagHandler(e);
                onCategoryOpenHandler();
              }}
              name="Tags"
              items={tagsData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileFilter;
