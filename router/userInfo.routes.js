const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const userInfoController = require("../controller/userInfo");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });
router.post(
  "/editProfile",
  authMiddleware(),
  userInfoController.updateUserInfo
);
router.get(
  "/:username",
  authMiddleware(),
  userInfoController.fetchUserInfoById
);

module.exports = router;
