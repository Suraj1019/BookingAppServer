const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId },
  title: {
    type: String,
    required: [true, "Place title is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  photos: {
    type: [String],
    required: [true, "At least one photo is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  perks: {
    type: [String],
    required: [true, "Please select at least one perk"],
  },
  extraInfo: {
    type: String,
    required: [true, "Extra information is required"],
  },
  checkIn: {
    type: Number,
    required: [true, "Check-in time is required"],
  },
  checkOut: {
    type: Number,
    required: [true, "Check-out time is required"],
  },
  maxGuests: {
    type: Number,
    required: [true, "Maximum number of guests is required"],
  },
  price: {
    type: Number,
    required: [true, "Price per night is required"],
  },
});

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;
