const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const httpError = require("./models/http-error");
const adminRoute = require("./routes/admin-route");
const productRoute = require("./routes/product-route");
const authRoute = require("./routes/auth-route");
const cartRoute = require("./routes/cart-route");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/", adminRoute);

app.use("/", productRoute);

app.use("/auth", authRoute);

app.use("/", cartRoute);

//Catch all routes that doesn't exist
app.use("/", (req, res, next) => {
  next(httpError("Could not find this route", 404));
});

//Error Middleware
app.use((error, req, res, next) => {
  if (error.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({
    message: error.message || "An unknown error occured on the server side",
  });
});

mongoose
  .connect(
    "mongodb+srv://akgecsaurabh:g5tzlptwM2bFFS06@cluster0.mc4o4uu.mongodb.net/"
  )
  .then(() => {
    app.listen(5000);

    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });
