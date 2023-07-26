import React, { useState } from "react";
import classes from "./AddVariant.module.css";
import { Button, ColorPicker, Input } from "antd";
import { useDispatch } from "react-redux";
import { productSliceActions } from "../../store/product-slice";
function AddVariant({ num, onAdd }) {
  const [cv, setCv] = useState({
    images: [],
    color: "",
    colorCode: "",
  });

  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Image1") {
      setCv((prv) => {
        return { ...prv, images: [value, prv.images[1], prv.images[2]] };
      });
    }
    if (name === "Image2") {
      setCv((prv) => {
        return { ...prv, images: [prv.images[0], value, prv.images[2]] };
      });
    }
    if (name === "Image3") {
      setCv((prv) => {
        return { ...prv, images: [prv.images[0], prv.images[1], value] };
      });
    }

    if (name === "color") {
      setCv((prv) => {
        return { ...prv, color: value };
      });
    }
  };

  const addVariantHandler = () => {
    dispatch(productSliceActions.addVariant(cv));
    setDisable(true);
  };
  const handleInputColorChange = (color, hex) => {
    setCv((prv) => {
      return { ...prv, colorCode: hex };
    });
  };
  return (
    <div className={classes.container}>
      <h2>Variant {num}</h2>
      <div className={classes.field}>
        <label htmlFor="mainImage">Image1</label>
        <Input
          disabled={disable}
          placeholder="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-ceramic-watch.jpg"
          id="Image1"
          type="text"
          name="Image1"
          value={cv.images[0]}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="mainImage">Image2</label>
        <Input
          disabled={disable}
          placeholder="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-ceramic-watch.jpg"
          id="Image2"
          type="text"
          name="Image2"
          value={cv.images[1]}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.field}>
        <label htmlFor="mainImage">Image3</label>
        <Input
          disabled={disable}
          placeholder="https://savoy.nordicmade.com/wp-content/uploads/2015/08/product-ceramic-watch.jpg"
          id="Image3"
          type="text"
          name="Image3"
          value={cv.images[2]}
          onChange={handleInputChange}
        />
      </div>

      <div className={classes.field}>
        <label htmlFor="mainImage">Color</label>
        <div className={classes.inputColor}>
          <ColorPicker
            disabled={disable}
            onChange={handleInputColorChange}
            showText
          />
        </div>
      </div>

      <div className={classes.field}>
        <label htmlFor="color">Color Name</label>
        <Input
          disabled={disable}
          placeholder="Green"
          id="color"
          type="text"
          name="color"
          value={cv.color}
          onChange={handleInputChange}
        />
      </div>
      <Button onClick={addVariantHandler} type="primary">
        Add Variant
      </Button>
    </div>
  );
}

export default AddVariant;
