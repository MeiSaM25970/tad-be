const express = require("express");
const router = express.Router();
const mainController = require("../controller/main/index");

router.get("/", mainController.get);

module.exports = router;
