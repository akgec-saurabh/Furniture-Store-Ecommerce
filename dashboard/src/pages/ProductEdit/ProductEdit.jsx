import React from "react";
import classes from "./ProductEdit.module.css";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../store/product-api";

function ProductEdit() {
  const params = useParams();

  const { data, isSuccess } = useGetProductByIdQuery(params.productId);

  return (
    <div className={classes.container}>
      {isSuccess && data.product.name}
      {data.product.color.map((color) => (
        <div>
          <select name="colors" id="colors">
            <option value={color.color}>{color.color}</option>
          </select>
          <div>Color : {color.color}</div>
          {color.images.map((image) => (
            <img src={image} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProductEdit;
