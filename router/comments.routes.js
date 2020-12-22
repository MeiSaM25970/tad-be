const express = require("express");
const router = express.Router();
const expressJWT = require("express-jwt");
const commentsController = require("../controller/comments");

const authMiddleware = () =>
  expressJWT({
    secret: "JUWEURfdryd65&^@$$&&*r-==-rs",
    credentialsRequired: true,
    algorithms: ["sha1", "RS256", "HS256"],
  });
router.get("/", commentsController.fetchAll);
router.get("/comment/:id", authMiddleware(), commentsController.findById);
router.get("/:id", commentsController.filterByWeblogId);
router.post("/", commentsController.create);
router.put("/:id", authMiddleware(), commentsController.update);
router.delete("/:id", authMiddleware(), commentsController.delete);

module.exports = router;
