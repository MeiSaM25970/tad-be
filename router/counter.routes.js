const express = require("express");
const router = express.Router();
const logMiddleware = require("../middleware/log");
const counterController = require("../controller/count");
const expressJWT = require("express-jwt");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });
router.get("/", authMiddleware(), counterController.fetch);
router.post("/", counterController.create);

module.exports = router;
