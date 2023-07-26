const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/product-controller");

const router = express.Router();

router.get("/products", getAllProducts);

//for product by id
router.get("/product/:pid", getProductById);

module.exports = router;
