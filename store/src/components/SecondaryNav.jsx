import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import menu from "../menuData";
import { useGetProductTagsQuery } from "../store/product-api";
import ActiveFilter from "./ActiveFilter";

const colors = [
  { color: "#0000FF", name: "Blue" },
  { color: "#A52A2A", name: "Brown" },
  { color: "#808080", name: "Gray" },
  { color: "#008000", name: "Green" },
  { color: "#FFA500", name: "Orange" },
  { color: "#FFFFFF", name: "White" },
];

const SecondaryNav = () => {
  const [searchParams, setSearchParms] = useSearchParams();
  const location = useLocation();

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
  //ON COLOR FILTER HANDLER
  const onColorFilterHandler = (colorname) => {
    setSearchParms({ ...query, color: colorname });
  };

  //ON CLEAR HANDLER
  const onClearHandler = () => {
    // urlquery.d;
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
            <div className="sort">
              <span>Default</span>
            </div>
            <div className="sort">
              <span>Popularity</span>
            </div>
            <div className="sort">
              <span>Average rating</span>
            </div>
            <div className="sort">
              <span>Newness</span>
            </div>
            <div className="sort">
              <span>Price: Low to High</span>
            </div>
            <div className="sort">
              <span>Price: High to Low</span>
            </div>
          </div>
        </div>
        <div className="filter-item">
          <div className="head">Price</div>
          <div className="items">
            <div className="price">
              <span>All</span>
            </div>
            <div className="price">
              <span>$0 - $50</span>
            </div>
            <div className="price">
              <span>$50 - $100</span>
            </div>
            <div className="price">
              <span>$100 - $150</span>
            </div>
            <div className="price">
              <span>$150 - $200</span>
            </div>
            <div className="price">
              <span>$200+</span>
            </div>
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
      </div>
    </div>
  );
};

export default SecondaryNav;
