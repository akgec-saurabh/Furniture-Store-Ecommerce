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

router.post("/cart", addItemToCart);
router.patch("/cart", updateItemCart);
router.patch("/cart/:productId", removeItemFromCart);

//this routes should be protected because if not authorized user can also create empty cart
router.get("/cart", getCartByUser);

module.exports = router;
