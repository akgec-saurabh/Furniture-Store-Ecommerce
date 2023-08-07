const express = require("express");
const {
  getCartByUser,
  addToCart,
  addItemToCart,
  removeItemFromCart,
  updateItemCart,
} = require("../controllers/cart-controller");

const router = express.Router();

// this also need to be protected route
// router.post("/cart", addToCart);

router.get("/cart", getCartByUser);
router.post("/cart", addItemToCart);
router.patch("/cart", updateItemCart);
router.patch("/cart/:productId", removeItemFromCart);

module.exports = router;
