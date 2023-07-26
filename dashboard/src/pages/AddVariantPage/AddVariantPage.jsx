import React from "react";
import classes from "./AddVariantPage.module.css";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import AddVariant from "../../components/AddVariant/AddVariant";
import { Button } from "antd";

function AddVariantPage() {
  const variant = useSelector((state) => state.product.variant);

  const product = useSelector((state) => state.product);

  const onAddProductHandler = async (e) => {
    console.log(product);

    // TODO Fetch and post this to api

    try {
      const response = await fetch("http://localhost:5000/admin/product", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("saved", product);
      }
    } catch (error) {
      console.log(error);
    }
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
