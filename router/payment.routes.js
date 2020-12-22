const express = require("express");
const router = express.Router();
const checkoutController = require("../controller/payment");
const expressJWT = require("express-jwt");
const orderDetailController = require("../controller/order");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });
router.get("/verify", checkoutController.verify);
router.get("/", authMiddleware(), orderDetailController.fetchAll);

module.exports = router;
