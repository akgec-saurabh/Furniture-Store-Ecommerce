const Cart = require("../models/cart");
const httpError = require("../models/http-error");
const User = require("../models/user");
const { findOneAndUpdate, find, findOne } = require("../models/user");

//ADD ITEM TO CART
const addItemToCart = async (req, res, next) => {
  const { userId, productId, qty } = req.body;
  //finding userCart
  let cart;
  try {
    cart = await Cart.findOne({ userId });
  } catch (error) {
    console.log(error);
    return next(httpError("Unable to find User Cart", 500));
  }
  if (cart) {
    // FIND INDEX OF PRODUCT
    const productIndex = cart.products.findIndex(
      (product) => product.productId === productId
    );

    if (productIndex !== -1) {
      //  UDPATE QUANTITY

      cart.products[productIndex].quantity += Number(qty);
    } else {
      console.log("Product does not exist");
      cart.products.push({ productId, quantity: Number(qty) });
    }
  } else {
    return next(httpError("Not able to find cart", 500));
  }

  try {
    await cart.save();
  } catch (error) {
    console.log(error);
    return next(httpError("Not able to Save to cart", 500));
  }
  const populatedCart = await cart.populate("products.productId");

  // cart.push()
  res.status(201).json({
    message: "Product Added",
    cart: populatedCart,
  });
};

//REMOVE ITEM FROM CART
const removeItemFromCart = async (req, res, next) => {
  const { userId } = req.body;

  const productId = req.params.productId;

  let cart;
  try {
    cart = await Cart.findOne({ userId });
  } catch (error) {
    console.log(error);
    return next(httpError("Some error occured while finding cart", 500));
  }

  cart.products = cart.products.filter(
    (product) => product.productId !== productId
  );

  try {
    await cart.save();
  } catch (error) {
    console.log(error);
    return next(httpError("Could not save the updated cart", 500));
  }

  const populatedCart = await cart.populate("products.productId");

  res.status(201).json({
    message: "Product Removed",
    cart:populatedCart,
  });
};

// UPDATE ITEM QUANTITY
const updateItemCart = async (req, res, next) => {
  const query = req.query.qty || "increase";
  const { userId, productId } = req.body;
  //finding userCart
  let UPDATE_QTY = 1;
  if (query === "decrease") {
    UPDATE_QTY = -1;
  }
  let cart;
  try {
    cart = await Cart.findOne({ userId });
  } catch (error) {
    console.log(error);
    return next(httpError("Unable to find User Cart", 500));
  }

  // FIND INDEX OF PRODUCT
  const productIndex = cart.products.findIndex(
    (product) => product.productId === productId
  );

  let myresponse = { status: 201, message: "Cart Updated" };
  if (productIndex !== -1) {
    // IF CART HAS ONE QUANTITY REMOVED THE PRODUCT
    if (cart.products[productIndex].quantity === 1) {
      console.log("removing product");
      cart.products = cart.products.filter(
        (product) => product.productId !== productId
      );
      //UPDATING STATUS TO 201
      myresponse.status = 201;
      myresponse.message = "Product Removed";
    } else {
      //  UDPATE QUANTITY
      cart.products[productIndex].quantity += UPDATE_QTY;
      myresponse.status = 201;
      myresponse.message = "Prodcut Quantity Updated";
    }
  } else {
    console.log("Product does not exist");
  }

  try {
    await cart.save();
  } catch (error) {
    console.log(error);
    return next(httpError("Not able to Save to cart", 500));
  }

  const populatedCart = await cart.populate("products.productId");


  res.status(myresponse.status).json({
    message: myresponse.message,
    cart:populatedCart,
  });
};

// //old cart controller
// const addToCart = async (req, res, next) => {
//   const { userId, products } = req.body;
//   console.log(userId, products);

//   //finding the user

//   //finding if it is first time

//   const user = await User.findById(userId);
//   console.log("user", user);

//   let existingCart;
//   try {
//     existingCart = await Cart.findOne({ userId }).exec();
//   } catch (error) {
//     return next(httpError("Some error occured", 500));
//   }

//   if (!existingCart) {
//     //create cart
//     let newCart;
//     try {
//       newCart = await Cart.create({ userId: user._id });
//       console.log("newCartCreated");
//     } catch (error) {
//       console.log(error);
//       return next(httpError("Some error Occured while creating Cart", 500));
//     }

//     //Saving

//     newCart.products = products;

//     await newCart.save();

//     console.log(newCart);
//   } else {
//     // const productIndex = existingCart.products.findIndex(
//     //   (product) => product.productId === productId
//     // );

//     // if (productIndex !== -1) {
//     //   existingCart.products[productIndex].quantity = quantity;
//     // } else {
//     //   existingCart.products.push({ productId, quantity });
//     // }
//     existingCart.products = products;

//     try {
//       await existingCart.save();
//     } catch (error) {
//       return next(
//         httpError("Some error occured while saving cart to database", 500)
//       );
//     }
//   }
//   res.status(201).json({ message: "Cart updated", cart: existingCart });
// };

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
exports.addItemToCart = addItemToCart;
exports.removeItemFromCart = removeItemFromCart;
exports.updateItemCart = updateItemCart;
