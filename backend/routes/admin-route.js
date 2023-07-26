const express = require("express");
const { addProduct } = require("../controllers/admin-controller");

const router = express.Router();

router.post("/admin/product", addProduct);

module.exports = router;
