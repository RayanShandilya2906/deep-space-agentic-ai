const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const controller = require("../controllers/analysisController");

console.log("Controller:", controller);
console.log("analyzeImage:", controller.analyzeImage);

const { analyzeImage } = controller;

const router = express.Router();

router.post(
  "/analyze",
  upload.single("image"),
  analyzeImage
);

module.exports = router;