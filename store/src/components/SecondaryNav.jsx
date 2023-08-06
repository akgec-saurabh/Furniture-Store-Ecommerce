import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import menu from "../menuData";
import { useGetProductTagsQuery } from "../store/product-api";
import ActiveFilter from "./ActiveFilter";
import { colors, priceRanges, sortOptions } from "../filterData";

const SecondaryNav = () => {
  const [searchParams, setSearchParms] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useGetProductTagsQuery();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const urlquery = new URLSearchParams(location.search);
  const [query, setQuery] = useState({});

  useEffect(() => {
    // Convert searchParams to an object
    const paramsObj = {};
    for (let [key, value] of urlquery) {
      paramsObj[key] = value;
    }
    console.log(paramsObj);
    setQuery(paramsObj);
  }, [location]);

  const onCategoryHandler = (url) => {
    if (url !== "") {
      setSearchParms({
        ...query,
        category: url,
      });
    }
    console.log(searchParams.get("category"));
  };
  const onTagHandler = (url) => {
    if (query.tag === url) {
      delete query.tag;

      setSearchParms(query);
    } else {
      setSearchParms({
        ...query,
        tag: url,
      });
    }
  };

  //ON SORT FILTER HANDLER
  const onSortFilterHandler = (sortname) => {
    setSearchParms({ ...query, orderby: sortname });
  };

  //ON PRICE FILTER HANDLER
  const onPriceFilterHandler = (min_price, max_price) => {
    console.log("adding price filter");
    console.log(searchParams.get("min_price"));
    setSearchParms({ ...query, min_price: min_price, max_price: max_price });
  };

  //ON COLOR FILTER HANDLER
  const onColorFilterHandler = (colorname) => {
    setSearchParms({ ...query, color: colorname });
  };

  //ON CLEAR HANDLER
  const onClearHandler = () => {
    console.log("clearing filter");
    navigate("/");
  };

  //ON CLEAR TAG HANDLER
  const onClearTagHandler = () => {
    console.log("clearing tag");
    delete query.tag;
    setSearchParms(query);
  };

  return (
    <div className="secondaryNav">
      <div className="secondaryNav-head-wrapper">
        <div className="categoryWrapper">
          <div className="head">Category</div>
          <div className="category-items">
            {menu[1].subMenu.map((subMenu) => (
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
            <div className="head">Filter</div>
          </div>
          <span className="seprator">/</span>
          <div className="search">
            Search <SearchOutlined className="icon" />
          </div>
        </div>
      </div>
      <div className="filter-items">
        <div className="filter-item">
          <div className="head">Sort By</div>
          <div className="items">
            {sortOptions.map((item) => (
              <div className="sort">
                <span
                  className={`sortItem 
                
                ${
                  searchParams.get("orderby") === item.paramValue
                    ? "active"
                    : ""
                }
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
            {priceRanges.map((price) => (
              <div className="price">
                <span
                  className={`priceItem  ${
                    Number(searchParams.get("min_price")) === price.min_price &&
                    Number(searchParams.get("max_price")) === price.max_price
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
        {!isFilterOpen && (
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
        )}
      </div>

      <div className="activeFilterWrapper">
        <ActiveFilter
          onClear={onClearHandler}
          text="(1)"
          label="Filter active"
        />
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
};

export default SecondaryNav;
