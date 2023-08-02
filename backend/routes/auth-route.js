const express = require("express");
const {
  register,
  login,
  guestLogin,
} = require("../controllers/auth-controller");

const router = express.Router();

router.post("/auth/register", register);

router.post("/auth/login", login);

router.get("/auth/guest", guestLogin);

module.exports = router;
