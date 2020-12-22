const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const orderDetailController = require("../controller/order");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });
router.get("/:id", authMiddleware(), orderDetailController.findById);
router.put("/:id", authMiddleware(), orderDetailController.update);
router.delete("/:id", authMiddleware(), orderDetailController.delete);

module.exports = router;
