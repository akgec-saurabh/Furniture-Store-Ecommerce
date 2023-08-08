import React, { useEffect, useState } from "react";
import MobileFilter from "../components/MobileFilter";
import SecondaryNav from "../components/SecondaryNav";
import { useGetProductTagsQuery } from "../store/product-api";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function FilterNavbar() {
  const isMobile = window.matchMedia("(max-width:960px)").matches;
  const [searchParams, setSearchParms] = useSearchParams();
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useGetProductTagsQuery();

  const location = useLocation();
  const urlquery = new URLSearchParams(location.search);
  const [query, setQuery] = useState({});

  useEffect(() => {
    if (urlquery) {
      // Convert searchParams to an object
      const paramsObj = {};
      for (let [key, value] of urlquery) {
        paramsObj[key] = value;
      }
      setQuery(paramsObj);
    }
  }, [location]);

  // ON CATEGORY HANDLER
  const onCategoryHandler = (url) => {
    if (query.category === url) {
      delete query.category;
      delete query.page;
      setSearchParms(query);
    } else if (url !== "") {
      setSearchParms({
        ...query,
        category: url,
      });
    }
  };
  // ON CLEAR CATEGORY HANDLER
  const onClearCategoryHandler = () => {
    delete query.category;
    //DELETE page if exist
    delete query.page;
    setSearchParms(query);
  };

  const onTagHandler = (url) => {
    if (query.tag === url) {
      delete query.tag;
      //DELETE page if exist
      delete query.page;

      setSearchParms(query);
    } else {
      //DELETE page if exist
      delete query.page;
      setSearchParms({
        ...query,
        tag: url,
      });
    }
  };

  //ON SORT FILTER HANDLER
  const onSortFilterHandler = (sortname) => {
    console.log(sortname);
    if (query.orderby === sortname) {
      delete query.orderby;
      delete query.page;
      setSearchParms(query);
    } else {
      //DELETE page if exist
      delete query.page;
      setSearchParms({ ...query, orderby: sortname });
    }
  };

  // ON CLEAR SORT HANDLER
  const onClearSortHandler = () => {
    delete query.orderby;
    setSearchParms(query);
  };

  //ON PRICE FILTER HANDLER
  const onPriceFilterHandler = (min_price, max_price) => {
    if (query.min_price === String(min_price)) {
      delete query.min_price;
      delete query.max_price;
      delete query.page;
      setSearchParms(query);
    } else {
      //DELETE page if exist
      delete query.page;
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
    if (query.color === colorname) {
      delete query.color;
      delete query.page;

      setSearchParms(query);
    } else {
      //DELETE page if exist
      delete query.page;
      setSearchParms({ ...query, color: colorname });
    }
  };

  //ON CLEAR HANDLER
  const onClearHandler = () => {
    navigate("/");
  };

  //ON CLEAR TAG HANDLER
  const onClearTagHandler = () => {
    delete query.tag;
    setSearchParms(query);
  };
  return (
    <div className="filterNavbar">
      {!isMobile && (
        <SecondaryNav
          onCategoryHandler={onCategoryHandler}
          onClearCategoryHandler={onClearCategoryHandler}
          onSortFilterHandler={onSortFilterHandler}
          onClearSortHandler={onClearSortHandler}
          onPriceFilterHandler={onPriceFilterHandler}
          onPriceClearHandler={onPriceClearHandler}
          onTagHandler={onTagHandler}
          onClearTagHandler={onClearTagHandler}
          onColorFilterHandler={onColorFilterHandler}
          onClearHandler={onClearHandler}
          query={query}
        />
      )}
      {isMobile && (
        <MobileFilter
          onCategoryHandler={onCategoryHandler}
          onClearCategoryHandler={onClearCategoryHandler}
          onSortFilterHandler={onSortFilterHandler}
          onClearSortHandler={onClearSortHandler}
          onPriceFilterHandler={onPriceFilterHandler}
          onPriceClearHandler={onPriceClearHandler}
          onTagHandler={onTagHandler}
          onClearTagHandler={onClearTagHandler}
          onClearHandler={onClearHandler}
          onColorFilterHandler={onColorFilterHandler}
          query={query}
        />
      )}
    </div>
  );
}

export default FilterNavbar;
