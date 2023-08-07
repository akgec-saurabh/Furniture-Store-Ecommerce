import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import menu from "../menuData";
import { useGetProductTagsQuery } from "../store/product-api";
import ActiveFilter from "./ActiveFilter";
import { categoryData, colors, priceRanges, sortOptions } from "../filterData";

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
    console.log("This is the query object", paramsObj);
    setQuery(paramsObj);
  }, [location]);

  // ON CATEGORY HANDLER
  const onCategoryHandler = (url) => {
    if (url !== "") {
      setSearchParms({
        ...query,
        category: url,
      });
    }
    console.log(searchParams.get("category"));
  };
  // ON CLEAR CATEGORY HANDLER
  const onClearCategoryHandler = () => {
    delete query.category;
    setSearchParms(query);
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

  // ON CLEAR SORT HANDLER
  const onClearSortHandler = () => {
    delete query.orderby;
    setSearchParms(query);
  };

  //ON PRICE FILTER HANDLER
  const onPriceFilterHandler = (min_price, max_price) => {
    console.log("adding price filter");
    console.log(searchParams.get("min_price"));
    if (min_price === 0 && max_price === "Infinity") {
      console.log("all s");
      setSearchParms({ ...query });
    } else {
      setSearchParms({ ...query, min_price: min_price, max_price: max_price });
    }
  };
  //ON PRICE CLEAR HANDLER (ALL:CLICK)
  const onPriceClearHandler = () => {
    delete query.min_price;
    delete query.max_price;
    setSearchParms(query);
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
};

export default SecondaryNav;
