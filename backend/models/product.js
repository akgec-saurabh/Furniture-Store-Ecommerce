const mongoose = require("mongoose");
const Review = require("./review");

// Define the schema for the color variant sub-document
const colorVariantSchema = new mongoose.Schema({
  images: [String],
  color: String,
  colorCode: String,
});

// Define the main product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
  },
  tag: [{ type: String }],

  variant: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  mainImage: {
    type: String,
    required: true,
  },
  hoverImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  colorVariant: [colorVariantSchema], // Array of color variants using the colorVariantSchema
  shortDescription: String,
  longDescription: String,
  additionalInformation: {
    weightInKg: Number,
    dimensions: String,
    materials: String,
    otherInfo: String,
    size: String,
    reviews: [], // Array of reviews using the reviewSchema
  },
});

// Create and export the Mongoose model for the product schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
