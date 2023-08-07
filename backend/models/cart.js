const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");

const cartSchema = new mongoose.Schema({
  userId: { type: String, ref: User, required: true },
  shipping: { type: Number },
  total: { type: Number },
  products: [
    {
      productId: { type: String, ref: Product },
      quantity: { type: Number },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
