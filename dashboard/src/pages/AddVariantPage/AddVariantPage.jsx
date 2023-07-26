import React from "react";
import classes from "./AddVariantPage.module.css";
import { useSelector } from "react-redux";
import AddVariant from "../../components/AddVariant/AddVariant";
import { Button, message } from "antd";

function AddVariantPage() {
  const [messageApi, contextHolder] = message.useMessage();

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

      if (!response.ok) {
        throw new Error("Not able to save Product");
      } else {
        messageApi.open({
          type: "success",
          content: "Product Saved",
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Not able to save Product",
      });
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
      {contextHolder}
      {renderVariant()}
      <Button onClick={onAddProductHandler}>Add Product</Button>
    </div>
  );
}

export default AddVariantPage;
