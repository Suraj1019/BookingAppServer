const express = require("express");
const router = express.Router();
const { addPlace } = require("./placeController");

router.post("/addPlace", addPlace);

module.exports = router;
