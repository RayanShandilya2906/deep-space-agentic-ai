console.log("ANALYSIS ROUTES VERSION 2 LOADED");

const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const analyzeSpaceImage = require("../services/geminiService");
console.log("TYPE:", typeof analyzeSpaceImage);
console.log(analyzeSpaceImage);
const router = express.Router();

router.post(
  "/analyze",
  upload.single("image"),
  async (req, res) => {

    try {

      console.log("GEMINI ROUTE EXECUTED");

      const aiResponse =
        await analyzeSpaceImage(req.file.path);

      console.log(aiResponse);

      res.json({
        marker: "GEMINI_TEST_123",
        success: true,
        aiResponse
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message: "AI analysis failed"
      });

    }

  }
);

module.exports = router;