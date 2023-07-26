import React from "react";
import classes from "./Homepage.module.css";
import NewProduct from "../NewProduct/NewProduct";
import { useSelector } from "react-redux";
import AddVariantPage from "../AddVariantPage/AddVariantPage";

const Homepage = () => {
  const page = useSelector((state) => state.page.page);
  return (
    <div className={classes.container}>
      {page === 1 && <NewProduct />}
      {page === 2 && <AddVariantPage />}
    </div>
  );
};

export default Homepage;
