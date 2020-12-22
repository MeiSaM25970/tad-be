const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const aboutController = require("../controller/about");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });

router.get("/", aboutController.fetchAll);
router.post("/", authMiddleware(), aboutController.create);
router.post("/:id", authMiddleware(), aboutController.update);

module.exports = router;
