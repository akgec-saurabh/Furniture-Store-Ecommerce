const jwt = require("jsonwebtoken");
const httpError = require("../models/http-error");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authorization failed");
    }
    const decodedtoken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedtoken);
    req.userData = decodedtoken;
    next();
  } catch (error) {
    return next(httpError("Authorization failed", 404));
  }
};
