import React, { useReducer } from "react";
import classes from "./NewProduct.module.css";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { productSliceActions } from "../../store/product-slice";
import { pageSliceActions } from "../../store/page-slice";

function NewProduct() {
  const formData = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const onSetDefault = () => {};

  const onSubmitHandler = () => {
    // dispatch(productSliceActions.addProduct(formData));
    dispatch(pageSliceActions.goToVariantPage());
  };

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    dispatch(productSliceActions.productChange({ name, value }));
  };

  return (
    <div className={classes.container}>
      <h1>Add New Product</h1>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.field}>
          <label htmlFor="name">Name</label>
          <Input
            placeholder="Ceramic Watch"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="price">Price</label>
          <Input
            placeholder="259"
            min={100}
            addonBefore="$"
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="variant">variant</label>
          <Input
            min={1}
            placeholder="2"
            id="variant"
            type="number"
            name="variant"
            value={formData.variant}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.field}>
          <label htmlFor="discount">discount</label>
          <Input
            min={0}
            defaultValue={0}
            max={100}
            addonAfter="%"
            id="discount"
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="mainImage">mainImage</label>
          <Input
            placeholder="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-ceramic-watch.jpg"
            id="mainImage"
            type="text"
            name="mainImage"
            value={formData.mainImage}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="hoverImage">hoverImage</label>
          <Input
            placeholder="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-ceramic-watch.jpg"
            id="hoverImage"
            type="text"
            name="hoverImage"
            value={formData.hoverImage}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="shortDescription">shortDescription</label>
          <Input
            placeholder="Designed for simplicity and made from high quality materials. Its sleek geometry and material combinations creates a modern personalized look."
            id="shortDescription"
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="longDescription">longDescription</label>
          <Input
            id="longDescription"
            type="text"
            name="longDescription"
            placeholder="Authentic keffiyeh master cleanse. Fingerstache semiotics PBR quinoa. Pop-up Godard kale chips, trust fund Neutra fingerstache paleo Wes Anderson. Deep v single-origin coffee cred Thundercats beard. Mumblecore before they sold out roof party biodiesel. Banksy swag Portland readymade synth messenger bag cliche."
            value={formData.longDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="weightInKg">weightInKg</label>
          <Input
            min={1}
            placeholder="1.73"
            id="weightInKg"
            type="number"
            name="weightInKg"
            value={formData.weightInKg}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="dimensions">dimensions</label>
          <Input
            id="dimensions"
            placeholder="100 x 37 x 100 cm"
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="materials">materials</label>
          <Input
            placeholder="80% cotton, 20% linen"
            id="materials"
            type="text"
            name="materials"
            value={formData.materials}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="otherInfo">otherInfo</label>
          <Input
            placeholder="American heirloom jean shorts pug seitan letterpress."
            id="otherInfo"
            type="text"
            name="otherInfo"
            value={formData.otherInfo}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="size">size</label>
          <Input
            placeholder="One Size, XL, L, M, S"
            id="size"
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <Button
        className={classes.nextbtn}
        onClick={onSubmitHandler}
        type="primary"
      >
        Next
      </Button>
      <Button className={classes.clearbtn} danger type="primary">
        Clear
      </Button>
      <Button className={classes.default}>Set Default</Button>
    </div>
  );
}

export default NewProduct;
