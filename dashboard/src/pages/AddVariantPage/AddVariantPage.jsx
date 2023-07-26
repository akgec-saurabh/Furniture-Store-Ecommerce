import React from "react";
import classes from "./AddVariantPage.module.css";
import { useSelector } from "react-redux";
import AddVariant from "../../components/AddVariant/AddVariant";
import { Button } from "antd";

function AddVariantPage() {
  const variant = useSelector((state) => state.product.variant);

  const onAddProductHandler = (e) => {
    console.log(e);
    // TODO Fetch and post this to api
  };

  const renderVariant = () => {
    let temp = [];
    for (let i = 1; i <= variant; i++) {
      temp.push(<AddVariant onAdd={onAddProductHandler} key={i} num={i} />);
    }
    return temp;
  };

  return (
    <div className={classes.container}>
      {renderVariant()}
      <Button onClick={onAddProductHandler}>Add Product</Button>
    </div>
  );
}

export default AddVariantPage;
