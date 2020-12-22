const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const imageSave = require("../controller/uploadImage/index");
const uploadUserImage = require("../controller/uploadUserImage");
const uploadWeblogImage = require("../controller/uploadWeblogImg");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });

router.post("/", authMiddleware(), imageSave);
router.post("/userImage", authMiddleware(), uploadUserImage);
router.post("/weblog", authMiddleware(), uploadWeblogImage);
module.exports = router;
