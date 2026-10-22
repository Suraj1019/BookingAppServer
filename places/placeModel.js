const mongoose = require("mongoose");

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/; // HH:MM, 24-hour

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId },
  title: {
    type: String,
    trim: true,
    required: [true, "Place title is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Address is required"],
  },
  photos: {
    type: [String],
    validate: {
      validator: (arr) => Array.isArray(arr) && arr.length > 0,
      message: "At least one photo is required",
    },
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  perks: {
    type: [String],
    default: [],
  },
  extraInfo: {
    type: String,
    required: [true, "Extra Info is required"],
  },
  checkIn: {
    type: String,
    required: [true, "Check-in time is required"],
    match: [TIME_REGEX, "Check-in time must be in HH:MM format"],
  },
  checkOut: {
    type: String,
    required: [true, "Check-out time is required"],
    match: [TIME_REGEX, "Check-out time must be in HH:MM format"],
  },
  maxGuests: {
    type: Number,
    required: [true, "Maximum number of guests is required"],
    min: [1, "At least 1 guest is required"],
  },
  price: {
    type: Number,
    required: [true, "Price per night is required"],
    min: [1, "Price must be greater than 0"],
  },
});

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;
