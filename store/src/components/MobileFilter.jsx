import React, { useState } from "react";
import {
  categoryData,
  colors,
  priceRanges,
  sortOptions,
  tagsData,
} from "../filterData";
import MobileDropDown from "./MobileDropDown";

function MobileFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const onCategoryOpenHandler = () => {
    setIsCategoryOpen((prv) => !prv);
  };
  const onFilterOpenHandler = () => {
    setIsFilterOpen((prv) => !prv);
  };
  return (
    <div className="mobileFilter">
      <div className="category">
        <div onClick={onCategoryOpenHandler} className="head">
          Categories
        </div>
        {isCategoryOpen && (
          <div className="items">
            {categoryData.map((item) => (
              <div className="item">{item.text}</div>
            ))}
          </div>
        )}
      </div>
      <div className="filter">
        <div onClick={onFilterOpenHandler} className="head">
          Filter
        </div>
        {isFilterOpen && (
          <div className="items">
            <MobileDropDown name="Sory by" items={sortOptions} />
            <MobileDropDown name="Price" items={priceRanges} />
            <MobileDropDown name="Colors" items={colors} />
            <MobileDropDown name="Tags" items={tagsData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileFilter;
