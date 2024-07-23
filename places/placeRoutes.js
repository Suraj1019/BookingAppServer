const express = require("express");
const router = express.Router();
const {
  addPlace,
  getPlaces,
  getPlace,
  updatePlace,
} = require("./placeController");

router.post("/addPlace", addPlace);
router.get("/getPlaces", getPlaces);
router.get("/getPlace", getPlace);
router.post("/update", updatePlace);

module.exports = router;
