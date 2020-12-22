const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const contactController = require("../controller/contact");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });
router.post("/", contactController.create);
router.post("/:id", authMiddleware(), contactController.update);
router.get("/", authMiddleware(), contactController.fetchAll);
router.get("/:id", authMiddleware(), contactController.findById);
router.delete("/:id", authMiddleware(), contactController.delete);

module.exports = router;
