const httpError = require("../models/http-error");
const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({});
  } catch (error) {
    return next(httpError("Unable to find the Products", 404));
  }
  res.status(200).json({
    message: "Fetched Products Successfully",
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await Product.findById(productId).exec();
  } catch (error) {
    console.log(error);
    return next(httpError("Error occured while finding product", 404));
  }
  if (product) {
    res.status(200).json({
      message: "Product Fetched",
      product: product.toObject({ getters: true }),
    });
  } else {
    res.status(404).json({ message: "Unable to find product" });
  }
};

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
