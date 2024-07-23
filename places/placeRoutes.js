const express = require("express");
const router = express.Router();
const {
  addPlace,
  getPlaces,
  getPlace,
  updatePlace,
  getPlacesByUserId,
} = require("./placeController");

router.post("/addPlace", addPlace);
router.get("/getPlaces", getPlacesByUserId);
router.get("/getPlace", getPlace);
router.post("/update", updatePlace);
router.get("/", getPlaces);

module.exports = router;
