const express = require("express");
const router = express.Router();
const trackingController = require("../controller/tracking");

router.get("/", trackingController.search);

module.exports = router;
