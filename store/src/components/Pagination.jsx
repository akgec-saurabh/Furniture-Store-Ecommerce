import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function Pagination({ maxPageRange = 5 }) {
  const [searchParams, setSearchParms] = useSearchParams();
  const [pageRange, setPageRange] = useState(maxPageRange);
  //Setting the active page from searchParms if it is avaliable else setting it to 1
  const page = parseInt(searchParams.get("page") || 1);
  // const [pageActive, setPageActive] = useState(page);

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

  const onPageClickedHandler = (pageNum) => {
    // setPageActive(pageNum);
    setSearchParms({ ...query, page: pageNum });
  };

  // const onIncreasePageRange = () => {
  //   if (pageRange === maxPageRange) {
  //     return;
  //   }
  //   setPageRange((prv) => {
  //     setPageActive(1 + prv);

  //     return prv + 1;
  //   });
  //   setSearchParms({ ...query, page: pageActive });
  // };
  // const onDecreasePageRange = () => {
  //   if (pageRange === 1) {
  //     return;
  //   }
  //   setPageRange((prv) => {
  //     setPageActive((prv - 1) * 5 - 4);
  //     return prv - 1;
  //   });
  // };

  // useEffect(() => {
  //   if (searchParams.get("page")) {
  //     if (pageActive === 1) {
  //       delete query.page;
  //       setSearchParms(query);
  //     } else {
  //       setSearchParms({ ...query, page: pageActive });
  //     }
  //   }
  // }, [pageActive]);

  // const renderPage = () => {
  //   const pages = [];
  //   for (let i = 1; i <= pageRange; i++) {
  //     pages.push(
  //       <span
  //         onClick={() => onPageClickedHandler(i)}
  //         className={`pageNum ${pageActive === i ? "active" : ""}`}
  //       >
  //         {i}
  //       </span>
  //     );
  //   }

  return (
    <div className="pagination">
      <div className="paginationWrapper">
        <CaretLeftOutlined
          // onClick={onDecreasePageRange}
          className={`icon ${page === 1 ? "disable" : ""}`}
        />

        {/* {renderPage()} */}
        {[...Array(maxPageRange)].map((o, i) => (
          <span
            onClick={() => onPageClickedHandler(i + 1)}
            className={`pageNum ${page === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </span>
        ))}

        <CaretRightOutlined
          // onClick={onIncreasePageRange}
          className={`icon ${pageRange === maxPageRange ? "disable" : ""}`}
        />
      </div>
    </div>
  );
}

export default Pagination;
