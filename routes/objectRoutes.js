const express = require("express");
const { getObjectInfo } = require("../controllers/objectController");

const router = express.Router();

router.get("/:name", getObjectInfo);

module.exports = router;