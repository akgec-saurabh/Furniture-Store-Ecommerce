const express = require("express");
const {
  getAllProducts,
  getProductById,
  getProductByCategoryName,
  getProductCategory,
  getProductTag,
  getProductByTagName,
} = require("../controllers/product-controller");

const router = express.Router();

router.get("/products", getAllProducts);

// To get All Category of Product
router.get("/category", getProductCategory);
// To get product of specific Category
router.get("/products/category/:categoryname", getProductByCategoryName);

// To get All Tag of Product
router.get("products/tag", getProductTag);
// To get product of specific Tag
router.get("products/tag/:tagname", getProductByTagName);

// for product by id
router.get("/product/:pid", getProductById);

module.exports = router;
