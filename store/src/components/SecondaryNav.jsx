import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import menu from "../menuData";
import { useGetProductTagsQuery } from "../store/product-api";
import ActiveFilter from "./ActiveFilter";
import { categoryData, colors, priceRanges, sortOptions } from "../filterData";

const SecondaryNav = ({
  onCategoryHandler,
  onClearCategoryHandler,
  onSortFilterHandler,
  onClearSortHandler,
  onPriceFilterHandler,
  onPriceClearHandler,
  onTagHandler,
  onClearTagHandler,
  onColorFilterHandler,
  onClearHandler,
  query,
}) => {
  const [searchParams, setSearchParms] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useGetProductTagsQuery();

  const onFilterHandler = () => {
    setIsFilterOpen((prv) => !prv);
  };

  return (
    <div className="secondaryNav">
      <div className="secondaryNav-head-wrapper">
        <div className="categoryWrapper">
          <div className="head">Categories</div>
          <div className="category-items">
            <div
              className={`categoryname ${
                searchParams.get("category") ? "" : "active"
              }`}
              onClick={() => {
                onClearCategoryHandler();
              }}
            >
              All
              <span className="seprator">/</span>
            </div>
            {categoryData.map((subMenu) => (
              <div
                className={`categoryname ${
                  searchParams.get("category") === subMenu.url ? "active" : ""
                }`}
                onClick={() => {
                  onCategoryHandler(subMenu.url);
                }}
                key={subMenu.url}
              >
                {subMenu.text}
                <span className="seprator">/</span>
              </div>
            ))}
          </div>
        </div>
        <div className="filter">
          <div className="filterWrapper">
            <div onClick={onFilterHandler} className="head">
              Filter
            </div>
          </div>
          <span className="seprator">/</span>
          <div className="search">
            Search <SearchOutlined className="icon" />
          </div>
        </div>
      </div>
      {isFilterOpen && (
        <>
          <div className="filter-items">
            <div className="filter-item">
              <div className="head">Sort By</div>
              <div className="items">
                <div className="sort">
                  <span
                    className={`sortItem 
              
              ${searchParams.get("orderby") ? "" : "active"}
              `}
                    onClick={() => {
                      onClearSortHandler();
                    }}
                  >
                    Default
                  </span>
                </div>
                {sortOptions.map((item) => (
                  <div className="sort" key={item.paramValue}>
                    <span
                      className={`sortItem 
              
              ${searchParams.get("orderby") === item.paramValue ? "active" : ""}
              `}
                      onClick={() => {
                        onSortFilterHandler(item.paramValue);
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-item">
              <div className="head">Price</div>
              <div className="items">
                <span
                  className={`priceItem ${
                    searchParams.get("min_price") ? "" : "active"
                  }`}
                  onClick={onPriceClearHandler}
                >
                  All
                </span>
                {priceRanges.map((price) => (
                  <div className="price" key={price.label}>
                    <span
                      className={`priceItem  ${
                        Number(searchParams.get("min_price")) ===
                          price.min_price &&
                        Number(searchParams.get("max_price")) ===
                          price.max_price
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        onPriceFilterHandler(price.min_price, price.max_price);
                      }}
                    >
                      {price.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-item">
              <div className="head">Color</div>
              <div className="items colors">
                {colors.map((color) => (
                  <div
                    onClick={() => {
                      onColorFilterHandler(color.name);
                    }}
                    className="color-wrapper"
                    key={color.name}
                  >
                    <span
                      className="color"
                      style={{ backgroundColor: `${color.color}` }}
                    ></span>
                    <span
                      className={`name ${
                        searchParams.get("color") === color.name ? "active" : ""
                      }`}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
                <div></div>
              </div>
            </div>
            {
              <div className="filter-item tags">
                <div className="head">Tags</div>
                <div className="items tags">
                  {isSuccess &&
                    data.tags &&
                    data.tags.map((tag) => (
                      <span
                        className={`tag ${
                          searchParams.get("tag") === tag ? "active" : ""
                        }`}
                        key={tag}
                        onClick={() => {
                          onTagHandler(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            }
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
        </>
      )}
    </div>
  );
};

export default SecondaryNav;
