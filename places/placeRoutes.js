const express = require("express");
const router = express.Router();
const {
  addPlace,
  getPlaces,
  getPlace,
  updatePlace,
  getPlacesByUserId,
} = require("./placeController");
const auth = require("../auth");

router.post("/addPlace", auth, addPlace);
router.get("/getPlaces", auth, getPlacesByUserId);
router.get("/getPlace", getPlace);
router.post("/update", auth, updatePlace);
router.get("/", getPlaces);

module.exports = router;
