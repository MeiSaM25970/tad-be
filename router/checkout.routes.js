const express = require("express");
const router = express.Router();
const checkoutController = require("../controller/payment");

router.post("/", checkoutController.create);

module.exports = router;
