const express = require("express");
const router = express.Router();
const managePageAController = require("../controller/managePageA/index");

router.post("/", managePageAController.create);
router.get("/", managePageAController.fetchAll);
router.delete("/", managePageAController.delete);
router.put("/", managePageAController.update);
router.get("/:id", managePageAController.findById);
module.exports = router;
