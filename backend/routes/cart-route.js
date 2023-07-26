const express = require("express");
const { getCartByUser, addToCart } = require("../controllers/cart-controller");

const router = express.Router();

// this also need to be protected route
router.post("/cart", addToCart);

//this routes should be protected because if not authorized user can also create empty cart
router.get("/cart", getCartByUser);

module.exports = router;
