const express =
require("express");

const {
  compare
} = require(
  "../controllers/compareController"
);

const router =
express.Router();

router.get(
  "/:a/:b",
  compare
);

module.exports =
router;