const express = require("express");
const router = express.Router();
const orderController = require("../controller/orders");

router.post("/", orderController.create);

module.exports = router;
