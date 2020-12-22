const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const changePasswordController = require("../controller/changePassword");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });

router.post("/", authMiddleware(), changePasswordController.changePassword);

module.exports = router;
