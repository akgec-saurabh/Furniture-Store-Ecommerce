const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//for https
const https = require("https");
const fs = require("fs");
require("dotenv").config(); // Load environment variables from .env file

const cors = require("cors");

const httpError = require("./models/http-error");
const adminRoute = require("./routes/admin-route");
const productRoute = require("./routes/product-route");
const authRoute = require("./routes/auth-route");
const cartRoute = require("./routes/cart-route");
const stripeRoute = require("./routes/stripe-route");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/", adminRoute);

app.use("/", productRoute);

app.use("/auth", authRoute);

app.use("/", cartRoute);

//STRIPE ROUTE
app.use("/payment", stripeRoute);

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
  .connect(process.env.TASK_MONGO_URI)
  .then(() => {
    app.listen(5000);

    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Read the SSL certificate and key files
// const options = {
//   key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
//   cert: fs.readFileSync(process.env.PRIVATE_CERTIFICATE_PATH),
// };
//Connecting to DataBase
// mongoose
//   .connect(process.env.TASK_MONGO_URI)
//   .then(() => {
//     https.createServer(options, app).listen(5000);
//     console.log("Express server with HTTPS is running on port 5000");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
