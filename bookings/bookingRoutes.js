const express = require("express");
const router = express.Router();
const { bookPlace, getBookings } = require("./bookingController");
const { getBookingDetails } = require("./bookingController");

router.post("/bookPlace", bookPlace);
router.get("/getBookings", getBookings);
router.get("/getBookingDetails", getBookingDetails);

module.exports = router;
