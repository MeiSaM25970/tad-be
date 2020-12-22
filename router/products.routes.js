const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");

const productsController = require("../controller/products/index");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });

router.post("/", authMiddleware(), productsController.create);
router.get("/", productsController.fetchAll);
router.delete("/:id", authMiddleware(), productsController.delete);
router.put("/:id", authMiddleware(), productsController.update);
router.get("/:id", productsController.findById);
module.exports = router;
