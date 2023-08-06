const httpError = require("../models/http-error");
const Product = require("../models/product");

const getAllProducts = async (req, res, next) => {
  const categoryquery = req.query.category;
  const tag = req.query.tag;

  console.log(categoryquery, tag);
  let search_query = {};

  if (categoryquery) {
    search_query.category = categoryquery;
  }
  if (tag) {
    search_query.tag = tag;
  }

  console.log(search_query);

  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  let products;
  let total_count = 0;
  try {
    total_count = (await Product.find(search_query)).length;
    products = await Product.find(search_query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  } catch (error) {
    return next(httpError("Unable to find the Products", 404));
  }
  res.status(200).json({
    message: "Fetched Products Successfully",
    total_count,
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

//Get Category of Product
const getProductCategory = async (req, res, next) => {
  let category;
  try {
    category = (await Product.find({})).map((product) => product.category);
  } catch (error) {
    console.log(error);
    return next(
      httpError("Some Error Occured while finding the product by Category,500")
    );
  }

  res.status(200).json({
    message: "Fetched All Categories of Product",
    category: [...new Set(category)],
  });
};

//Get Product by CategoryName
const getProductByCategoryName = async (req, res, next) => {
  const categoryName = req.params.categoryname;
  const decodedCategoryName = decodeURIComponent(categoryName);

  console.log(decodedCategoryName);

  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;

  let products;
  let total_count;

  try {
    total_count = (
      await Product.find({
        category: decodedCategoryName,
      })
    ).length;

    products = await Product.find({
      category: decodedCategoryName,
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  } catch (error) {
    console.log(error);
    return next(
      httpError("Some Error Occured while finding the product by Category,500")
    );
  }

  if (products.length === 0) {
    return next(httpError("No product found for the specified Category", 404));
  }

  res.status(200).json({
    message: "Successfully Fetched Product by Category " + categoryName,
    products,
    total_count,
  });
};

//Fetch all the tag of Product
const getProductTag = async (req, res, next) => {
  let tags = [];
  try {
    (await Product.find({})).map((product) => {
      product.tag;
      tags.push(...product.tag);
    });
  } catch (error) {
    console.log(error);
    return next(httpError("Could not fetch tag", 500));
  }

  res.status(200).json({
    message: "Fetch Tag Successfully",
    tags: [...new Set(tags)],
  });
};

//Fetch Product by tagName
const getProductByTagName = async (req, res, next) => {
  const tagname = req.params.tagname;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  let products;
  let total_count;
  try {
    total_count = (await Product.find({ tag: tagname })).length;
    products = await Product.find({ tag: tagname })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  } catch (error) {
    console.log(error);
    return next(httpError("Could not find the product with tagname", 404));
  }
  if (products.length === 0) {
    return next(httpError("No product found for the specified Tag", 404));
  }

  res.status(200).json({
    message: "Fetch Successfully by tag " + tagname,
    products,
    total_count,
  });
};

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductCategory = getProductCategory;
exports.getProductByCategoryName = getProductByCategoryName;
exports.getProductTag = getProductTag;
exports.getProductByTagName = getProductByTagName;
