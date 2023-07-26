const mongoose = require("mongoose");

// Define the schema for the review sub-document
const reviewSchema = new mongoose.Schema({
  name: String,
  date: String, // You might want to change this to a Date type if you store dates
  review: String,
  star: Number,
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
