const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpError = require("../models/http-error");
const User = require("../models/user");
const Guest = require("../models/guest");
const random = require("randomstring");

const register = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(req.body);

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(httpError("Some Error occured on Server", 500));
  }

  if (existingUser) {
    return next(httpError("User Already Exist", 422));
  }
  let hashPassword;
  try {
    const salt = await bcryptjs.genSalt(10);
    hashPassword = await bcryptjs.hash(password, salt);
  } catch (error) {
    return next("Some error occured", 500);
  }

  const newUser = User({
    name: {
      firstname,
      lastname,
    },
    email,
    password: hashPassword,
  });

  try {
    newUser.save();
  } catch (error) {
    return next("Unable to save User", 500);
  }

  let token;
  try {
    token = jwt.sign(
      { name: { firstname, lastname }, email, userId: newUser.userId },
      process.env.JWT_KEY,
      {
        expiresIn: "4h",
      }
    );
  } catch (error) {
    console.log(error);
    return next(httpError("Some error occured on server", 500));
  }

  res.status(201).json({
    message: "User registerd",
    firstname,
    email,
    token,
  });
};

//LOGIN
const login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email);

  let existingUser;
  try {
    existingUser = await User.findOne({ email }).exec();
  } catch (error) {
    return next("Some error occured while finding User", 500);
  }

  if (!existingUser) {
    return next(httpError("User does not exist", 404));
  }

  let validatePassword = false;
  try {
    validatePassword = await bcryptjs.compare(password, existingUser.password);
  } catch (error) {
    return next(httpError("Some error occured", 500));
  }
  console.log(validatePassword);

  if (!validatePassword) {
    return next(httpError("Please check your credentials", 401));
  }

  let token;
  try {
    token = jwt.sign(
      { name: existingUser.name, email, id: existingUser.id },
      "secret$key",
      { expiresIn: "4h" }
    );
  } catch (error) {
    return next(httpError("Some error occured on server", 500));
  }

  res.status(201).json({
    message: "User logged in",
    email,
    firstname: existingUser.name.firstname,
    token,
  });
};

//GUEST LOGIN

const guestLogin = (req, res, next) => {
  //Creating random firstname lastname and email password

  const firstname = random.generate(7);
  const lastname = random.generate(7);
  const email = `${random.generate(7)}@guest.com`;

  const newUser = Guest({
    name: {
      firstname,
      lastname,
    },
    email,
    password: "guestpassword",
  });

  try {
    newUser.save();
  } catch (error) {
    return next("Unable to save User", 500);
  }

  let token;
  try {
    token = jwt.sign(
      { name: { firstname, lastname }, email, userId: newUser.userId },
      process.env.JWT_KEY,
      {
        expiresIn: "4h",
      }
    );
  } catch (error) {
    console.log(error);
    return next(httpError("Some error occured on server", 500));
  }

  res.status(201).json({
    message: "User registerd",
    firstname,
    email,
    token,
  });
};

exports.login = login;
exports.register = register;
exports.guestLogin = guestLogin;
