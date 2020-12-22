const express = require("express");
const router = express.Router();
const categoriesController = require("../controller/categories");
const expressJWT = require("express-jwt");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });

router.get("/", categoriesController.fetchAll);
router.get("/:id", categoriesController.findById);
router.post("/", authMiddleware(), categoriesController.create);
router.put("/:id", authMiddleware(), categoriesController.update);
router.delete("/:id", authMiddleware(), categoriesController.delete);

module.exports = router;
