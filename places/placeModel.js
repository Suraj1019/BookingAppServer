const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { Type: mongoose.Types.ObjectId },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: { type: [String], required: true },
  description: { type: String, required: true },
  perks: { type: [String], required: true },
  extraInfo: { type: String, required: true },
  checkIn: { type: Number, required: true },
  checkOut: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
});

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;
