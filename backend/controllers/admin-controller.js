const Product = require("../models/product");

const addProduct = async (req, res, next) => {
  const {
    name,
    price,
    variant,
    discount,
    mainImage,
    hoverImage,
    shortDescription,
    longDescription,
    additionalInformation,
    colorVariant,
  } = req.body;

  const newProduct = new Product({
    name,
    price,
    variant,
    discount,
    mainImage,
    hoverImage,
    shortDescription,
    longDescription,
    additionalInformation,
    colorVariant,
  });

  console.log("req.body", req);

  try {
    await newProduct.save();
  } catch (err) {
    console.log(err);
  }

  res.json({ message: "product added", addedProduct: newProduct });
};

exports.addProduct = addProduct;
