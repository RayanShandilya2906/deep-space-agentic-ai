const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/analyze",
  upload.single("image"),
  (req, res) => {

    console.log("UPLOAD ROUTE HIT");
    console.log(req.file);
    res.json({
      message: "Image uploaded successfully",
      filename: req.file.filename
    });

  }
);

module.exports = router;