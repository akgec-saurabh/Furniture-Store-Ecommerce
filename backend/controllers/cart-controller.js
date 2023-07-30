const Cart = require("../models/cart");
const httpError = require("../models/http-error");
const User = require("../models/user");
const { findOneAndUpdate, find, findOne } = require("../models/user");

const addToCart = async (req, res, next) => {
  const { userId, products } = req.body;
  console.log(userId, products);

  //finding the user

  //finding if it is first time

  const user = await User.findById(userId);
  console.log("user", user);

  let existingCart;
  try {
    existingCart = await Cart.findOne({ userId }).exec();
  } catch (error) {
    return next(httpError("Some error occured", 500));
  }

  if (!existingCart) {
    //create cart
    let newCart;
    try {
      newCart = await Cart.create({ userId: user._id });
      console.log("newCartCreated");
    } catch (error) {
      console.log(error);
      return next(httpError("Some error Occured while creating Cart", 500));
    }

    //Saving

    newCart.products = products;

    await newCart.save();

    console.log(newCart);
  } else {
    // const productIndex = existingCart.products.findIndex(
    //   (product) => product.productId === productId
    // );

    // if (productIndex !== -1) {
    //   existingCart.products[productIndex].quantity = quantity;
    // } else {
    //   existingCart.products.push({ productId, quantity });
    // }
    existingCart.products = products;

    try {
      await existingCart.save();
    } catch (error) {
      return next(
        httpError("Some error occured while saving cart to database", 500)
      );
    }
  }
  res.status(201).json({ message: "Cart updated", cart: existingCart });
};

const getCartByUser = async (req, res, next) => {
  const { userId } = req.body;

  let existingCart;
  try {
    existingCart = await Cart.findOne({ userId }).exec();
  } catch (error) {
    console.log(error);
    return next(httpError("Some error occured while getting Cart", 500));
  }

  if (!existingCart) {
    //create cart
    try {
      await Cart.create({ userId });
    } catch (error) {
      return next(httpError("Some error Occured while creating Cart", 500));
    }
  }

  res.status(200).json({ message: "Cart Fetched", existingCart });
};

exports.getCartByUser = getCartByUser;
exports.addToCart = addToCart;
