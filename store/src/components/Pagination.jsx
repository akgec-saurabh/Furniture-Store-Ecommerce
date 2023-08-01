import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Pagination({ maxPageRange = 5 }) {
  const [searchParams, setSearchParms] = useSearchParams();
  const [pageRange, setPageRange] = useState(1);
  //Setting the active page from searchParms if it is avaliable else setting it to 1
  const page =parseInt(searchParams.get('page')||1)
  const [pageActive, setPageActive] = useState(page);


  const onPageClickedHandler = (pageNum) => {
    setPageActive(pageNum);
  };

  const onIncreasePageRange = () => {
    if (pageRange === maxPageRange) {
      return;
    }
    setPageRange((prv) => {
      setPageActive(1 + prv * 5);

      return prv + 1;
    });
  };
  const onDecreasePageRange = () => {
    if (pageRange === 1) {
      return;
    }
    setPageRange((prv) => {
      setPageActive((prv - 1) * 5 - 4);
      return prv - 1;
    });
  };

  //To dispatch activePage as soon as active Page Changes
  useEffect(() => {
    setSearchParms({ page: pageActive });
  }, [pageActive]);

  console.log(pageActive,'pageActive === i ? "active" : ""')

  const renderPage = () => {
    const pages = [];
    for (let i = 1 + (pageRange - 1) * 5; i <= pageRange * 5; i++) {
      pages.push(
        <span
          onClick={() => onPageClickedHandler(i)}
          className={`pageNum ${pageActive === i ? "active" : ""}`}
        >
          {i}
        </span>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="paginationWrapper">
        <CaretLeftOutlined
          onClick={onDecreasePageRange}
          className={`icon ${pageRange === 1 ? "disable" : ""}`}
        />

        {renderPage()}

        <CaretRightOutlined
          onClick={onIncreasePageRange}
          className={`icon ${pageRange === maxPageRange ? "disable" : ""}`}
        />
      </div>
    </div>
  );
}

export default Pagination;
