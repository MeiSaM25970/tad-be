const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const weblogController = require("../controller/weblogController");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });

router.get("/", weblogController.fetchAll);
router.get("/categories/:id", weblogController.filterByCategoriesId);
router.get("/:id", weblogController.findById);
router.post("/", authMiddleware(), weblogController.create);
router.put("/:id", authMiddleware(), weblogController.update);
router.delete("/:id", authMiddleware(), weblogController.delete);

module.exports = router;
