const express = require("express");

const {
  timeline
} = require("../controllers/timelineController");

const router = express.Router();

router.get(
  "/:object",
  timeline
);

module.exports = router;