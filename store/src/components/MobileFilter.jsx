import React, { useState } from "react";
import {
  categoryData,
  colors,
  priceRanges,
  sortOptions,
  tagsData,
} from "../filterData";
import MobileDropDown from "./MobileDropDown";
import ActiveFilter from "./ActiveFilter";

function MobileFilter({
  onCategoryHandler,
  onClearCategoryHandler,
  onSortFilterHandler,
  onClearSortHandler,
  onPriceFilterHandler,
  onPriceClearHandler,
  onTagHandler,
  onClearTagHandler,
  onClearHandler,
  onColorFilterHandler,
  query,
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
                  // onCategoryOpenHandler();
                  onCategoryHandler(item.url);
                  setIsCategoryOpen(false);
                  setIsFilterOpen(false);
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
              onClick={(obj) => {
                onSortFilterHandler(obj.value);

                setIsCategoryOpen(false);
                setIsFilterOpen(false);
              }}
            />
            <MobileDropDown
              name="Price"
              items={priceRanges}
              //obj contains value and (name of head)
              onClick={(obj) => {
                onPriceFilterHandler(obj.value.min_price, obj.value.max_price);
                setIsCategoryOpen(false);
                setIsFilterOpen(false);
              }}
            />
            <MobileDropDown
              name="Colors"
              items={colors}
              onClick={(obj) => {
                onColorFilterHandler(obj.value);
                setIsCategoryOpen(false);
                setIsFilterOpen(false);
              }}
            />
            <MobileDropDown
              onClick={(obj) => {
                onTagHandler(obj.value);
                setIsCategoryOpen(false);
                setIsFilterOpen(false);
              }}
              name="Tags"
              items={tagsData}
            />
          </div>
        )}
      </div>

      <div className="activeFilterWrapper">
        {(query.category ||
          query.orderby ||
          query.color ||
          query.min_price) && (
          <ActiveFilter
            onClear={onClearHandler}
            text={Object.keys(query).length}
            label="Filter active"
          />
        )}
        {query.tag && (
          <ActiveFilter
            onClear={onClearTagHandler}
            text={`"${query.tag}"`}
            label="Product Tagged"
          />
        )}
      </div>
    </div>
  );
}

export default MobileFilter;
